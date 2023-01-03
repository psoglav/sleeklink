import { PrismaClient, Prisma } from '@prisma/client'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8)

const prisma = new PrismaClient()

const links: Prisma.LinkCreateInput[] = [
  {
    id: nanoid(),
    url: 'https://instagram.com/psoglav'
  },
  {
    id: nanoid(),
    url: 'https://vk.com/psxglxv'
  },
  {
    id: nanoid(),
    url: 'https://github.com/psoglav'
  }
]

async function main() {
  console.log('Start seeding...')
  for (const data of links) {
    const link = await prisma.link.create({
      data
    })
    console.log(`Created a link with id: ${link.id}`)
  }
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
