import { useMemo } from "react";
import ResizableBox from "./ResizableBox";
import { Chart, AxisOptions } from "react-charts";

export type Data<TDatum extends Record<string, unknown>> = {
  label: string;
  data: TDatum[];
}[];

type LineChartProps<T extends Record<string, unknown>> = {
  data: Data<T>;
};

export default function LineCharts<T extends Record<string, unknown>>({
  data,
}: LineChartProps<T>) {
  const primaryAxis = useMemo<AxisOptions<T>>(
    () => ({
      getValue: (datum) => datum[Object.keys(datum)[0]],
      elementType: "line",
    }),
    [],
  );

  const secondaryAxes = useMemo<AxisOptions<T>[]>(
    () => [
      {
        getValue: (datum) => datum[Object.keys(datum)[1]],
        elementType: "line",
      },
    ],
    [],
  );

  return (
    <ResizableBox width={320} height={300}>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </ResizableBox>
  );
}
