import { VercelRequest, VercelResponse } from "@vercel/node";
import {
  PopulationCompositionPerYearResult,
  ResasApiResponse,
} from "../@types/resas.js";
import { allowCors } from "./utils/allowCors.js";

async function handler(req: VercelRequest, res: VercelResponse) {
  const query = req.query;

  if (!query.prefCode) {
    res.status(400).json({ message: "prefCode is required" });
  }

  const prefCode = query.prefCode as string;
  const prefCodeNumber = parseInt(prefCode);
  const isValidPrefCode = !isNaN(prefCodeNumber);

  if (!isValidPrefCode) {
    res.status(400).json({ message: "prefCode is invalid" });
    return;
  }

  const response: Response = await fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCodeNumber.toString()}&cityCode=-`,
    {
      headers: {
        "X-API-KEY": process.env.RESAS_API_KEY || "",
      },
    },
  );

  const { result } =
    (await response.json()) as ResasApiResponse<PopulationCompositionPerYearResult>;

  const totalPopulationPerYear = result.data.find(
    (composition) => composition.label === "総人口",
  );

  if (!totalPopulationPerYear) {
    res.status(404).json({
      message: "total popluation data of specified prefecture not found",
    });
    return;
  }

  res.json({
    message: null,
    result: totalPopulationPerYear.data,
  });
}

export default allowCors(handler);
