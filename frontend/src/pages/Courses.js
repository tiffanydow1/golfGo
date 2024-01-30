import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { courseData } from '../data/courses';

const Courses = () => {
  const [courses, setCourses] = useState(courseData);

  // useEffect(() => {
  //   axios.get('http://localhost:4000/courses')
  //     .then(async ({ data: courses }) => {
  //       setCourses(courses);
  //     })
  // }, []);

  console.log(courseData, 'course data');

  return (
    <>
      Courses page
    </>
  );
};

export default Courses;
