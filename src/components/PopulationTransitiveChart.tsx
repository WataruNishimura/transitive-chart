import { useSuspenseQueries } from "@tanstack/react-query";
import { PopulationComposition, Pref, ResasApiResponse } from "../@types/resas";
import LineCharts, { Data as ChartData } from "./LineChart";

export type PopulationTransitiveChartProps = {
  prefs: Pref[];
};

const API_URL =
  (import.meta.env.VITE_VERCEL_API_ENDPOINT as string) ??
  "http://localhost:3000/api";

export type PolulationChartDatum = {
  year: string;
  value: number;
};

export default function PopulationTransitiveChart({
  prefs,
}: PopulationTransitiveChartProps) {
  if (prefs.length === 0) {
    return <p>都道府県が選択されていません</p>;
  }

  const queries = useSuspenseQueries({
    queries: prefs.map((pref) => {
      return {
        queryKey: ["resas", pref.prefCode],
        queryFn: async () => {
          const searchParams = new URLSearchParams();
          searchParams.set("prefCode", pref.prefCode.toString());
          const response = await fetch(
            `${API_URL}/totalPopulationPerYear?${searchParams.toString()}`,
          );
          const { result } = (await response.json()) as ResasApiResponse<
            PopulationComposition[]
          >;
          return {
            label: pref.prefName,
            data: result.map((composition) => {
              return {
                year: composition.year,
                value: composition.value,
              };
            }),
          };
        },
      };
    }),
  });

  const Chart = ({ data }: { data: ChartData<PolulationChartDatum> }) =>
    LineCharts<PolulationChartDatum>({ data });

  const normalizedData: ChartData<PolulationChartDatum> = queries.map(
    (query) => {
      return {
        label: query.data.label,
        data: query.data.data.map((datum) => {
          return {
            year: datum.year.toString(),
            value: datum.value,
          };
        }),
      };
    },
  );

  return (
    <div>
      <Chart data={normalizedData} />
    </div>
  );
}
