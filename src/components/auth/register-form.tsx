"use client"

import React, { useState } from 'react'

import { useRouter } from 'next/navigation';

import { Input } from "@nextui-org/input";
import { Button } from '@nextui-org/button';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import CardWrapper from '../card-wrapper'
import FormError from './form-error';
import FormSucess from './form-success';

import { registerSchema, type TRegisterSchema } from '@/lib/zod-schema/register-schema';
import type { TLoginSchema } from '@/lib/zod-schema/login-schema';

import { useLogin } from '@/hooks/use-login';
import { useSession } from '@/hooks/use-session';
import { getErrorMessage } from '@/lib/error-message';



const RegisterForm = () => {
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { login } = useLogin()
  const { dispatch } = useSession()
  const router = useRouter()


  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit: SubmitHandler<TRegisterSchema> = async (formData) => {
    // Reset runtime messages first.
    setError(null)

    try {
      const response = await fetch("http://192.168.100.165:3005/api/auth/local/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
  
      if (!response.ok) {
        const error = await response.json()
        console.log("From register: ", error)
        throw new Error(error.error)
      }
  
      const data = await response.json()
      console.log(success)
      setSuccess(data.success)


      // router.push("/dashboard")
    } 
    catch (error) {
      console.log("register", error)
      const errorMessage = getErrorMessage(error)
      setError(errorMessage)
    }
  }


  return (
    <CardWrapper
      headerLabel='Create an Account'
      backButtonLabel="Already have an account?"
      backButtonHref='/login'
      showSocial
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4 my-3'>

        {success && <FormSucess message={success} />}
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
          Sign Up
        </Button>

      </form>
    </CardWrapper>
  )
}

export default RegisterForm


