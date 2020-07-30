import React from 'react';
import Header from './header';
import Content from './content';
import Total from './total';

const Course = ({course}) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total parts={course.parts} />
        </>
    );
}

export default Course;