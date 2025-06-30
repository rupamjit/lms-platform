"use client"
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@clerk/nextjs'

import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const InstructorLayout = ({children}:{children:ReactNode}) => {

    const {isSignedIn} = useAuth();

    if(!isSignedIn) {
       return redirect("/sign-in")
    }

  return (
    <div>
        {/* <Sidebar/>
        {children} */}


      <div className="flex-1 flex">
        <Sidebar />
        <div className="ml-7 mt-7">{children}</div>
      </div>
    </div>

  )
}

export default InstructorLayout