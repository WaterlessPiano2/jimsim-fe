// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

const data = await prisma.defi_product_master.findMany({where:{staus:'active'}, orderBy:{product_id:'asc'}})

  res.status(200).json(data)

}
