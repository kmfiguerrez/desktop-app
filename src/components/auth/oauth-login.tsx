import React, { useRef } from 'react'

import { useRouter } from 'next/navigation'

import { FcGoogle } from "react-icons/fc"
import { FaDiscord } from "react-icons/fa"

import {Button} from "@nextui-org/button";
import { Link } from '@nextui-org/link';



const OauthLogin = () => {
  const router = useRouter()
  const oauthGoogleButtonRef = useRef<HTMLButtonElement>(null)

  /**
   * Test connectivity to Web API server. Used by oauth logins.
   * 
   * @param url A URL to navigate to after testing the connectivity to the server.
   */
  const pingServer = async (url: string) => {
    try {
      const response = await fetch("http://192.168.100.165:3005/api/auth/ping", {
        headers: {
          "Content-Type": "application/json"
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)      
      }
      
      // const responseMessage = await response.json( )
      window.location.href = url
    } 
    catch (error) {
      console.log(error)
      if (error instanceof TypeError) {
        const queryObject = {
          error: error.name,
          message: "Can't connect to the server.",
        }
        const queryString = new URLSearchParams(queryObject).toString()
        return router.push(`/login?${queryString}`)
      }
    }  
  }

  return (
    <div className='flex flex-col w-full gap-y-3'>
      <Button
        ref={oauthGoogleButtonRef}
        variant='flat'
        radius='sm'
        // as={Link}
        // href="http://192.168.100.165:3005/api/auth/google/login"
        className='w-full'
        onClick={() => pingServer("http://192.168.100.165:3005/api/auth/google/login")}
      >
        <FcGoogle className='h-5 w-5' />
        Sign In with Google
      </Button>

      <Button
        href="http://192.168.100.165:3005/api/auth/discord/login"
        as={Link}
        variant='flat'
        radius='sm'
        className='w-full'
      >
        <FaDiscord className='h-5 w-5' />
        Sign In with Discord
      </Button>      
    </div>
  )
}

export default OauthLogin