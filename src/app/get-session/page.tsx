"use client"

import { useSession } from '@/hooks/use-session'
import { useRouter } from 'next/navigation'

import React, { useEffect } from 'react'

import {Spinner} from "@nextui-org/spinner";


/*
  This page is only used to get the session data through oauth
  because this app will be a static app for desktop.
*/
const GetSessionData = () => {
  const { dispatch } = useSession()
  const router = useRouter()
  
  useEffect(() => {
    const getSessionData = async () => {
      try {
        const response = await fetch("http://192.168.100.165:3005/api/auth/session", {
          credentials: "include"
        })

        if (!response.ok) {
          const error = await response.json()
          console.log(error)
          throw new Error(error)
        }

        const session = await response.json()
        console.log(session)

        dispatch({type: "signIn", payload: session})

        router.push("/dashboard")
      } 
      catch (error) {
        console.log(error)
        router.push("/login")
      }      
    }

    getSessionData()
  }, [dispatch, router])

  return (
    <div className='w-[500px] mx-auto'>
      {/* GetSessionData */}
      <Spinner size="lg" />
    </div>
  )
}

export default GetSessionData