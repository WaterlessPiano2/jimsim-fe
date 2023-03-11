// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

 const data = await prisma.defi_pool_fees.findOne()

  res.status(200).json(data)

}
