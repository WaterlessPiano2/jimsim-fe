// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

let data
if (req.query.graphtimeframe ){
  if(req.query.graphtimeframe==='7d'){
    try{

      data = await prisma.defi_pool_metrics_ui_7day_view.findMany({
orderBy:{txn_time:'asc'}
    })
  
if(!data || data.length <1){
   res.status(500).json({message:'7d graph empty'})
  }else{  res.status(200).json(data)
  }

}catch(e){
  console.log('7d error on db', e)
   res.status(500).json(e)
}}
  else if(req.query.graphtimeframe==='24h')
  {  

    try{

      data = await prisma.defi_pool_metrics_ui_24h_view.findMany({
orderBy:{txn_time:'asc'}
    })

    if(!data || data.length <1){
       res.status(500).json({message:'24 h graph empty'})
        }else{  res.status(200).json(data)
    }
  }catch(e){
    console.log('24h error on db', e)
     res.status(500).json(e)
  }}
  
}else{

  const data = await prisma.defi_pool_metrics_ui_view.findMany({  distinct: ['pool_name'], orderBy:{txn_time:'desc'}})
  res.status(200).json(data)
}
}
