"use client"

import React, { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useSession } from '@/hooks/use-session'

import {Spinner} from "@nextui-org/spinner";


/*
  This page is only used to get the session data when users used oauth
  because this app will be a static app for desktop.
*/
const GetSessionData = () => {
  const { dispatch } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  
  useEffect(() => {
    const getSessionData = async (token: string) => {
      try {
        const response = await fetch("http://192.168.100.165:3005/api/auth/session", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        if (!response.ok) {
          const error = await response.json()
          console.log(error)
          throw new Error(error)
        }

        const session = await response.json()
        console.log(session)

        dispatch({
          type: "signIn", 
          payload: {
            accessToken: session.accessToken,
            expires: session.tokenExpiration,
            data: {
              user: session.user
            }
          }
        })

        router.push("/dashboard")
      } 
      catch (error) {
        console.log(error)
        router.push("/login")
      }      
    }

    const token = searchParams.get("token")
    if (token) {
      getSessionData(token)
    }

  }, [dispatch, router, searchParams])

  return (
    <div className='w-[500px] mx-auto'>
      {/* GetSessionData */}
      <Spinner size="lg" />
    </div>
  )
}

export default GetSessionData