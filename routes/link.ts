import Router from 'koa-router'
import { customAlphabet } from 'nanoid'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = new Router()
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)

router.post('/', async (ctx) => {
  if (!ctx.request.body) return (ctx.status = 400)
  const { url } = ctx.request.body

  const result = await prisma.link.create({
    data: {
      id: nanoid(),
      url
    }
  })

  ctx.body = result
})

router.get('/:id', async (ctx) => {
  const { id } = ctx.params

  if (!id) {
    return (ctx.status = 400)
  } else {
    const result = await prisma.link.findUnique({
      where: {
        id
      }
    })
    if (result) {
      ctx.redirect(result?.url)
    } else {
      ctx.status = 404
    }
  }
})

export default router
