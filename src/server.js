import Koa from 'koa'
import React from 'react'
import Router from 'koa-router'
import { renderToString } from 'react-dom/server'
import App from './components/App.jsx'

const conf = {
  PORT: 4321,
}

const generateHtmlStr = reactDom => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ssr</title>
</head>
<body>

  <div id="app">${reactDom}</div>
</body>
</html>
`
const app = new Koa()
const router = new Router()

router.get('*', (ctx) => {
  // eslint-disable-next-line
  const rNode = renderToString(<App />)
  const domString = generateHtmlStr(rNode)
  ctx.body = domString
})

app.use(router.routes(), router.allowedMethods())

app.listen(conf.PORT, () => {
  console.log(`the server is listening on ${conf.PORT} enjoy it~`)
})
