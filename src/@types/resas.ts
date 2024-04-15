export type ResasApiResponse<T> = {
  message: string
  result: T
}

export type Pref = {
  prefCode: number
  prefName: string
}