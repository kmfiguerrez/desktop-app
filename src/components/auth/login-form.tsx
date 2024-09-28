"use client"

import React, { useEffect, useState } from 'react'

import { useSearchParams, useRouter } from 'next/navigation'

import {Input} from "@nextui-org/input";
import { Button } from '@nextui-org/button';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, type TLoginSchema } from '@/lib/zod-schema/login-schema';

import CardWrapper from '../card-wrapper'
import FormError from './form-error';

import { useSession } from '@/hooks/use-session';


const LoginForm = () => {
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const { dispatch } = useSession()
  const searchParams = useSearchParams()

  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit: SubmitHandler<TLoginSchema> = async (loginData) => {
    // Reset runtime messages first.
    setError(null)

    try {
      const response = await fetch("http://192.168.100.165:3005/api/auth/local/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      })

      if (!response.ok) {
        const error = await response.json()
        console.log(error)
        throw new Error(error.message)      
      }

      const session = await response.json()
      
      // dispatch({
      //   type: "signIn",
      //   payload: {
      //     accessToken: session.accessToken,
      //     expires: session.tokenExpiration,
      //     data: {
      //       user: session.user
      //     }
      //   }
      // })

      // router.push("/dashboard")
    } 
    catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  useEffect(() => {
    const queryError = searchParams.get("error")
    const queryErrorMessage = searchParams.get("message")

    if (queryError) {
      if (queryError === "TypeError") {
        // throw new TypeError(queryErrorMessage!)
      }

      setError(searchParams.get("message")!)
    }
    
  }, [searchParams])


  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonLabel="Register with credentials"
      backButtonHref='/register'
      showSocial
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4 my-3'>

        {error && <FormError message={error} />}

        <Controller 
          name='email'
          control={control}
          render={({ field }) => (
            <Input 
              type="email" 
              label="Email"
              size='sm'
              variant='bordered'
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email}
              {...field}
            />              
          )}
        />

        <Controller 
          name='password'
          control={control}
          render={({ field }) => (
            <Input 
              type="password" 
              label="Password"
              size='sm'
              variant='bordered'
              errorMessage={errors.password?.message}
              isInvalid={!!errors.password}
              {...field}
            />           
          )}
        />

        <Button color='primary' variant='ghost' type='submit' radius='sm'>
          Sign In
        </Button>

      </form>
    </CardWrapper>
  )
}

export default LoginForm

