import React from 'react';

const Total = ({parts}) => {
    
    const sum = parts.reduce( (acc, part) => {
        return acc + part.exercises;
    }, 0);

    return (
        <p>Number of exercises {sum}</p>
    );
}

export default Total;