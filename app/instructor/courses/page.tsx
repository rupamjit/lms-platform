"use client"
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/nextjs'
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const Courses = () => {

    const {isSignedIn} = useAuth();

    if(!isSignedIn){
        return redirect("/sign-in")
    }

  return (
    <div>
        <Link href={'/instructor/create-course'}>
        <Button variant={"default"} className='cursor-pointer  font-semibold text-sm'><Plus/>Create Course</Button>
        </Link>
    </div>
  )
}

export default Courses