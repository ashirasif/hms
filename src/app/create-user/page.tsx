"use client"
import { signIn } from 'next-auth/react'
import React, { ReactEventHandler, useEffect } from 'react'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { useToast } from '~/components/ui/use-toast'

import { ROLES } from '~/utils/roles'
import {z} from 'zod'
import { api } from '~/trpc/react'

const Page = () => {
  
  const createUser  = api.user.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User created",
      })
      setPassword('')
      setEmail('')
      setName('')
      setPermissions([])
      setConfirmPassword('')
      const checkboxes = document.getElementsByClassName('permission-checkbox')
      for (let i = 0; i < checkboxes.length; i++) {
        // @ts-ignore
        checkboxes[i].checked = false
      }
    },
    onError: (e) => {
      toast({
        title: "Error",
        description: e.message,
      })
    }
  })

  const {toast} = useToast();

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [permissions, setPermissions] = React.useState<string[]>([])
  const [confirmPassword, setConfirmPassword] = React.useState('')
  
  const handleLogin = () => {

    const schema = z.object({
      name: z.string().min(3, 'Name must be at least 3 characters'),
      email: z.string().email('Invalid Email'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      permissions: z.array(z.string()).min(1,'Please select at least one permission'),
    })

    try {
      schema.parse({
        name,
        email,
        password,
        permissions
      })
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.errors[0].message,
      })
      console.log(e.errors)
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
      })
      return
    }

    createUser.mutateAsync({
      name,
      email,
      password,
      permissions
    })
  }
  

  const handlePermissions = (e: string | boolean, permission: string) =>  {
    if (e) {
      // @ts-ignore
      setPermissions([...permissions, permission])
    } else {
      setPermissions(permissions.filter((perm) => perm !== permission))
    }
  }

  return (
    <div className='flex flex-col items-center h-full justify-center gap-4'>
      <h2 className='text-2xl font-black'>Create A New User.</h2>
      <div className='max-w-lg p-8 border-white border rounded-xl flex flex-col gap-4'>
        <Input required placeholder='Name' value={name} type='text' onChange={(e) => setName(e.currentTarget.value)} />
        <Input required placeholder='Email' value={email} type='Email' onChange={(e) => setEmail(e.currentTarget.value)} />
        <Input type='password' placeholder='Password' value={password} required onChange={(e) => setPassword(e.currentTarget.value) }/>
        <Input required type='password' value={confirmPassword} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.currentTarget.value) }/>
        <div className='flex flex-col gap-2'>
          <p>Permissions</p>
          {
            ROLES.map((permission, i) => (
              <div className="flex items-center space-x-2" key={i}>
                <Checkbox id="terms" className='permission-checkbox' onCheckedChange={(e) => {
                  handlePermissions(e, permission)
                }} value={permission} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {permission}
                </label>
              </div>
            ))  
          }
        </div>
        <input type='submit' value='Create User' className='bg-white text-black rounded-md p-2 cursor-pointer' onClick={handleLogin} />
      </div>
    </div>
  )
}

export default Page
