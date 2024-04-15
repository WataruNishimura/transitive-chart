import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'

export default async function (req: VercelRequest, res: VercelResponse) {
  const result = await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures').then((res) =>
    res.json(),
  )
  res.json(result)
}