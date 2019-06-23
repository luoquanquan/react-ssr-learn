import Koa from 'koa'
import fs from 'fs'
import path from 'path'
import serve from 'koa-static'
import React from 'react'
import Router from 'koa-router'
import { promisify } from 'util'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './routes'
import App from './components/App.jsx'
import createStore, { init } from './store'

const conf = {
  PORT: 4321,
}
const readFilePromise = promisify(fs.readFile)
const generateHtmlStr = async (rNode, reduxState) => {
  const templatePath = path.resolve(__dirname, '../index.template.html')
  const template = await readFilePromise(templatePath, 'utf-8')

  // 这里的代码需要升级
  // 1. js 代码的添加不应该直接写死, 但是我不知道应该咋写
  const htmlStr = template.replace(/<!-- reactDom -->/, rNode)
    .replace(/<!-- script slot -->/, '<script src="/dist/bundle.js"></script>')
    .replace(/<!-- redux initData slot -->/, `
      <script>
        window.REDUX_DATA = ${JSON.stringify(reduxState)}
      </script>
    `)
  return Promise.resolve(htmlStr)
}

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
  const domString = await generateHtmlStr(rNode, reduxState)
  ctx.body = domString
})

app.use(router.routes(), router.allowedMethods())

app.listen(conf.PORT, () => {
  console.log(`the server is listening on ${conf.PORT} enjoy it~`)
})
