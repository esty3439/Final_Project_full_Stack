import { useState } from "react"
import { useGetAllCoursesQuery, useDeleteCourseMutation } from '../../course/courseApi'
import CourseCard from "./courseCard"

const CourseList = () => {
  const { data: courses, isLoading, error } = useGetAllCoursesQuery()

  if (isLoading) return <p>loading courses...</p>
  if (error) return <p>{error?.data?.message || "something went wrong"}</p>

  return (
    <div>
      <h2>manage courses</h2>
      <button>➕</button>
      {courses.map((course) => (
        <CourseCard course={course}/>
      ))}
    </div>
  )
}

export default CourseList