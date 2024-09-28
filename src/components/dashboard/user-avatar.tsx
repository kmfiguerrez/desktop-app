"use client"

import React from 'react'

import {User} from "@nextui-org/user";

import { useSession } from '@/hooks/use-session';


const UserAvatar = () => {
  const { session } = useSession()
  const sessionData = session!

  return (
    <User   
      name={sessionData.data.user.name}
      description="Programmer"
      avatarProps={{
        src: sessionData.data.user.image!
      }}
    />
  )
}

export default UserAvatar