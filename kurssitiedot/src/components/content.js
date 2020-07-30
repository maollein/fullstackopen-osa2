import React from 'react';
import Part from './part';

const Content = ({course}) => {
    
    const getParts = () => {
        return course.parts.map(part => {
            return <Part name={part.name} exercises={part.exercises} key={part.id}/>;
        });
    }
    
    return (
        <div>
            {getParts()}
        </div>
    );
}

export default Content;