"use client"

import React from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from '@/hooks/use-session'
import UserAvatar from '@/components/dashboard/user-avatar'


const DashboardPage = () => {
  const router = useRouter()
  const { session } = useSession()
  const sessionData = session!
  console.log("session data: ", sessionData)
  return (
    <div>
      <UserAvatar />
      
      <button onClick={() => router.push("/login")}>
        Back to home nigga
      </button>
      <br />

    </div>
  )
}

export default DashboardPage