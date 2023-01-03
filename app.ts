import Koa from 'koa'
import logger from 'koa-logger'
import { koaBody } from 'koa-body'

import link from './routes/link.js'

export const app = new Koa()

const PORT = process.env.PORT || 8080

app
  .use(koaBody())
  .use(logger())
  .use(link.routes())
  .use(link.allowedMethods())

app.listen(PORT, () =>
  console.log('Server is up on ' + PORT)
)
