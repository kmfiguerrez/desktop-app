import React from 'react'

import { FcGoogle } from "react-icons/fc"
import { FaDiscord } from "react-icons/fa"

import {Button} from "@nextui-org/button";
import { Link } from '@nextui-org/link';

const OauthLogin = () => {
  return (
    <div className='flex flex-col w-full gap-y-3'>
      <Button
        variant='flat'
        radius='sm'
        as={Link}
        href="http://192.168.100.165:3005/api/auth/google/login"
        className='w-full'

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