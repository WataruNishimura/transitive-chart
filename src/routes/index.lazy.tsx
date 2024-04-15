import { createLazyFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query"
import { Pref, ResasApiResponse } from "../@types/resas";
import { useState } from "react";


const API_URL = import.meta.env.VITE_VERCEL_API_ENDPOINT as string ?? 'http://localhost:3000/api'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { data } = useSuspenseQuery({
    queryKey: ['resas'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/prefectures`)
      return await response.json() as ResasApiResponse<Pref[]>
    }
  })

  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([])

  return (
    

    <div className="p-2">
      <p>selected prefs: {selectedPrefs.join(",")}</p>
      {
        data.result.map((pref) => {
          return (
            <label key={pref.prefCode}>
              <p>{pref.prefName}</p>
              <input className="p-2 border-b" type="checkbox" name={pref.prefCode.toString()} onChange={
                (e) => {
                  if (e.target.checked) {
                    setSelectedPrefs([...selectedPrefs, pref.prefCode])
                  } else {
                    setSelectedPrefs(selectedPrefs.filter((code) => code !== pref.prefCode))
                  }
                }
              } />
            </label>
          )
        })
      }
    </div>
  )
}
