import React from 'react'

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {Link} from "@nextui-org/link";

import OauthLogin from './auth/oauth-login';


type TCardWrapperProps = {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

const CardWrapper: React.FC<TCardWrapperProps> = ({
  children,
  backButtonHref,
  headerLabel,
  backButtonLabel,
  showSocial
}) => {
  return (
    <Card className='w-[400px]'>
      <CardHeader className='justify-center'>
        <h1 className='text-center'>{headerLabel}</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        {children}
      </CardBody>
      {showSocial && (
        <>
          <Divider />
          <CardFooter>
            <OauthLogin />
          </CardFooter>
        </>
      )}
      <CardFooter>
        <Link 
          underline='hover'
          href={backButtonHref}
          className='mx-auto text-sm'
        >
          {backButtonLabel}
        </Link>
      </CardFooter>
    </Card>
  )
}

export default CardWrapper