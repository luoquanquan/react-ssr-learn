import Koa from 'koa'
import fs from 'fs'
import path from 'path'
import serve from 'koa-static'
import React from 'react'
import Router from 'koa-router'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'
import routes from './routes'
import App from './components/App.jsx'
import createStore, { init } from './store'

const conf = {
  PORT: 4321,
}

const generateHtmlStr = (rNode, reduxState, helmetData) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      ${helmetData.title.toString()}
      ${helmetData.meta.toString()}
    </head>
    <body>

      <div id="app">${rNode}</div>
      <!-- 初始化 redux init 的插槽一定要在引入 bundle 之前 -->
      <script>
        window.REDUX_DATA = ${JSON.stringify(reduxState)}
      </script>

      <script src="/dist/bundle.js"></script>
    </body>
    </html>
`

const app = new Koa()
const router = new Router()

app.use(serve(path.resolve(__dirname, '../')))

router.get('*', async (ctx) => {
  // 路由上下文
  const context = { }

  // 创建一个 store
  const store = createStore()

  // 初始化 store
  store.dispatch(init())

  // 初始化时候是否访问异步接口
  const dataRequireMents = routes.filter(page => matchPath(ctx.req.url, page))
    .map(page => page.component).filter(comp => comp.serverFetch)
    .map(comp => store.dispatch(comp.serverFetch()))

  // 等待需要加载的异步接口都加载完了再渲染
  if (dataRequireMents.length) await Promise.all(dataRequireMents)

  // 根节点
  const rNode = renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={ctx.req.url}>
        <App />
      </StaticRouter>
    </Provider>,
  )

  // 获取首屏情况下的状态
  const reduxState = store.getState()

  // helmet 配置, 静态文件模板
  const helmetData = Helmet.renderStatic()

  const domString = generateHtmlStr(rNode, reduxState, helmetData)
  ctx.body = domString
})

app.use(router.routes(), router.allowedMethods())

app.listen(conf.PORT, () => {
  console.log(`the server is listening on ${conf.PORT} enjoy it~`)
})
