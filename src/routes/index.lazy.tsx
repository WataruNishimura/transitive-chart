import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query"
import { Pref } from "resas";

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ['resas'],
    queryFn: () =>
      fetch('https://opendata.resas-portal.go.jp/').then((res) =>
        res.json(),
      ),
  })

  const prefs: [Pref] = data?.result?.prefs ?? []

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}
