import { Button } from '@/components/ui/button';
import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const Courses = async  () => {

    const {userId} = await auth();

    if(!userId){
        return redirect("/sign-in")
    }

    const courses = await db.course.findMany({
      where:{
        instructorId:userId
      },
      orderBy:{
        createdAt:"desc"
      }
    })

  return (
    <div>
        <Link href={'/instructor/create-course'}>
        <Button variant={"default"} className='cursor-pointer  font-semibold text-sm'><Plus/>Create Course</Button>
        </Link>
        <div className='mt-10'>
        {
          courses && courses.map((course,_idx)=>{
            return (
              <Link key={_idx} href={`/instructor/courses/${course.id}/basic`}>{course.title}</Link>
            )
          })
        }
        </div>
    </div>
  )
}

export default Courses