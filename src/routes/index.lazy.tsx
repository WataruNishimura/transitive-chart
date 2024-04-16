import { createLazyFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Pref, ResasApiResponse } from "../@types/resas";
import { Suspense, useState } from "react";
import PopulationTransitiveChart from "../components/PopulationTransitiveChart";
import { styled } from "styled-components";

const GraphIndexPage = styled.div`
  padding: 2rem 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const SelectPrefItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SelectPrefBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
`;

const SelectedPrefsLabel = styled.p`
  margin: 1rem 0%;
  text-align: center;
  font-weight: bold;
`;

const ChartWrapper = styled.div`
  min-width: 100%;
  min-height: 300px;
  display: grid;
  place-items: center;
  margin: 2rem 0;
`;

const ChartLoading = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const API_URL =
  (import.meta.env.VITE_VERCEL_API_ENDPOINT as string) ??
  "http://localhost:3000/api";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: prefData } = useSuspenseQuery({
    queryKey: ["resas"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/prefectures`);
      return (await response.json()) as ResasApiResponse<Pref[]>;
    },
  });

  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);

  return (
    <GraphIndexPage className="p-2">
      <SelectedPrefsLabel>
        選択された都道府県:{" "}
        {prefData.result
          .filter((pref) => selectedPrefs.includes(pref.prefCode))
          .map((pref) => pref.prefName)
          .join(", ")}
      </SelectedPrefsLabel>
      <SelectPrefBox>
        {prefData.result.map((pref) => {
          return (
            <SelectPrefItem key={pref.prefCode}>
              <input
                className="p-2 border-b"
                type="checkbox"
                name={pref.prefCode.toString()}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPrefs([...selectedPrefs, pref.prefCode]);
                  } else {
                    setSelectedPrefs(
                      selectedPrefs.filter((code) => code !== pref.prefCode),
                    );
                  }
                }}
              />
              <p>{pref.prefName}</p>
            </SelectPrefItem>
          );
        })}
      </SelectPrefBox>

      <ChartWrapper>
        <Suspense fallback={<ChartLoading>グラフを読み込み中</ChartLoading>}>
          <PopulationTransitiveChart
            prefs={prefData.result.filter((pref) =>
              selectedPrefs.includes(pref.prefCode),
            )}
          />
        </Suspense>
      </ChartWrapper>
    </GraphIndexPage>
  );
}
