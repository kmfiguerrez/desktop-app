"use client"

import { useSession } from '@/hooks/use-session'
import { useRouter } from 'next/navigation'
import React from 'react'

const DashboardPage = () => {
  const router = useRouter()
  const { session } = useSession()
  const sessionData = session!
  console.log("session data: ", sessionData)
  return (
    <div>
      DashboardPageNigga
      <button onClick={() => router.push("/login")}>
        Back to home nigga
      </button>
      <br />

    </div>
  )
}

export default DashboardPage