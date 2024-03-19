"use client"
import { signIn } from 'next-auth/react'
import React from 'react'
import { Input } from '~/components/ui/input'

const Page = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  
  const handleLogin = () => {
    signIn('credentials', {
      email,
      password,
      callbackUrl: '/dashboard'
    })
  }

  return (
    <div className='flex flex-col items-center h-full justify-center gap-4'>
      <h2 className='text-2xl font-black'>Login</h2>
      <div className='max-w-lg p-8 border-white border rounded-xl flex flex-col gap-4'>
        <Input placeholder='Email' type='Email' onChange={(e) => setEmail(e.currentTarget.value)} />
        <Input type='password' placeholder='Password' onChange={(e) => setPassword(e.currentTarget.value) }/>
        <input type='submit' value='Login' className='bg-white text-black rounded-md p-2 cursor-pointer' onClick={handleLogin} />
      </div>
    </div>
  )
}

export default Page
