"use client"

import React from 'react'

import { useSession } from '@/hooks/use-session'

import {User} from "@nextui-org/user";


const UserInfo = () => {
  const { session } = useSession()

  return (
    <User   
      name={session?.user.name}
      description="Product Designer"
      avatarProps={{
        src: session?.user.image ?? "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }}
    />
  )
}

export default UserInfo