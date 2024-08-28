"use client"

import React, { useEffect, useState, Suspense } from 'react'

import { useSearchParams, useRouter } from 'next/navigation'

import {Input} from "@nextui-org/input";
import { Button } from '@nextui-org/button';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, type TLoginSchema } from '@/lib/zod-schema/login-schema';

import CardWrapper from '../card-wrapper'
import FormError from './form-error';

import { useLogin } from '@/hooks/use-login';
import { useSession } from '@/hooks/use-session';


const LoginForm = () => {
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const { login } = useLogin()
  const { dispatch } = useSession()

  // Why useSearchParams is used like this
  // see: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  const Search = () => {
    const searchParams = useSearchParams()

    useEffect(() => {
    
      if (searchParams.get("errorCode") === "11000") {
        // console.log("query params: ", searchParams.get("errorCode"))
        // console.log("query params: ", searchParams.get("errorMessage"))
        setError(searchParams.get("errorMessage")!)
      }
      
      setError(searchParams.get("errorMessage")!)
  
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
      const session = await login(loginData)
      
      // dispatch({
      //   type: "signIn",
      //   payload: session
      // })

      // router.push("/dashboard")
    } 
    catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  // useEffect(() => {
    
  //   if (searchParams.get("errorCode") === "11000") {
  //     // console.log("query params: ", searchParams.get("errorCode"))
  //     // console.log("query params: ", searchParams.get("errorMessage"))
  //     setError(searchParams.get("errorMessage")!)
  //   }
    
  //   setError(searchParams.get("errorMessage")!)

  // }, [searchParams])


  return (
    // <Suspense>
    //   <CardWrapper
    //     headerLabel='Welcome back'
    //     backButtonLabel="Register with credentials"
    //     backButtonHref='/register'
    //     showSocial
    //   >
    //     <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4 my-3'>

    //       {error && <FormError message={error} />}

    //       <Controller 
    //         name='email'
    //         control={control}
    //         render={({ field }) => (
    //           <Input 
    //             type="email" 
    //             label="Email"
    //             size='sm'
    //             variant='bordered'
    //             errorMessage={errors.email?.message}
    //             isInvalid={!!errors.email}
    //             {...field}
    //           />              
    //         )}
    //       />

    //       <Controller 
    //         name='password'
    //         control={control}
    //         render={({ field }) => (
    //           <Input 
    //             type="password" 
    //             label="Password"
    //             size='sm'
    //             variant='bordered'
    //             errorMessage={errors.password?.message}
    //             isInvalid={!!errors.password}
    //             {...field}
    //           />           
    //         )}
    //       />

    //       <Button color='primary' variant='ghost' type='submit' radius='sm'>
    //         Sign In
    //       </Button>

    //     </form>
    //   </CardWrapper>
    // </Suspense>
    <Suspense>
      <Search />
    </Suspense>
  )
}

export default LoginForm

