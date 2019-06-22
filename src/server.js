import Koa from 'koa'
import fs from 'fs'
import path from 'path'
import serve from 'koa-static'
import React from 'react'
import Router from 'koa-router'
import { promisify } from 'util'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './components/App.jsx'

const conf = {
  PORT: 4321,
}
const readFilePromise = promisify(fs.readFile)
const generateHtmlStr = async (rNode) => {
  const templatePath = path.resolve(__dirname, '../index.template.html')
  const template = await readFilePromise(templatePath, 'utf-8')

  // 这里的代码需要升级
  // 1. js 代码的添加不应该直接写死, 但是我不知道应该咋写
  const htmlStr = template.replace(/<!-- reactDom -->/, rNode)
    .replace(/<!-- script slot -->/, '<script src="/dist/bundle.js"></script>')
  return Promise.resolve(htmlStr)
}

const app = new Koa()
const router = new Router()
app.use(serve(path.resolve(__dirname, '../')))

router.get('*', async (ctx) => {
  const context = { }
  const rNode = renderToString(
    <StaticRouter context={context} location={ctx.req.url}>
      <App />
    </StaticRouter>,
  )
  const domString = await generateHtmlStr(rNode)
  ctx.body = domString
})

app.use(router.routes(), router.allowedMethods())

app.listen(conf.PORT, () => {
  console.log(`the server is listening on ${conf.PORT} enjoy it~`)
})
