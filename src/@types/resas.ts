export type ResasApiResponse<T> = {
  message: string
  result: T
}

export type Pref = {
  prefCode: number
  prefName: string
}

export type PopulationCompositionPerYearResult = {
  boundaryYear: number
  data: PopulationCompositionPerYear[]
}

export type PopulationCompositionPerYear = {
  label: "総人口" | "年少人口" | "生産年齢人口" | "老年人口"
  data: PopulationComposition[]
}

export type PopulationComposition = {
  year: number
  value: number
  rate?: number
}