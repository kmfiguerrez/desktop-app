import React from 'react'
import { IoWarning } from "react-icons/io5"



type FormErrorProps = {
  message?: string | null
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null
  
  return (
    <div className='
      bg-red-800/15 p-3 rounded-md flex items-center
      gap-x-2 text-sm text-red-500
    '>
      <IoWarning className='h-5 w-5'/>
      <p>{message}</p>
    </div>
  )
}

export default FormError