"use client"
import { useEffect, useState } from "react"

export default function Page() {
  const [data, setData] = useState()
  useEffect(() => {
    ; (async () => {
      const res = await fetch("/api/protected")
      const json = await res.json()
      setData(json)
    })()
  }, [])
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Route Handler Usage</h1>
      <p>
        This page fetches data from an API{" "}
        <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers">
          Route Handler
        </a>
        . The API is protected using the universal{" "}
        <a href="https://nextjs.authjs.dev#auth">
          <code>auth()</code>
        </a>{" "}
        method.
      </p>
      <div className="flex flex-col rounded-md bg-neutral-100">
        <div className="p-4 font-bold rounded-t-md bg-neutral-200">
          Data from API Route
        </div>
        <pre className="py-6 px-4 whitespace-pre-wrap break-all">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  )
}
