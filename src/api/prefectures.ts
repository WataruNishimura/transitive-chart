import { VercelRequest, VercelResponse } from '@vercel/node'
import { Pref, ResasApiResponse } from '../@types/resas.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const response: Response = await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
    headers: {
      "X-API-KEY": process.env.RESAS_API_KEY || ""
    }
  })

  const {
    result
  } = await response.json() as ResasApiResponse<Pref[]>

  res.json({result})
}