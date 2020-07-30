import React from 'react';

const Filter = ({search, changeSearch}) => {
    return (
        <label>filter:
            <input value={search} onChange={changeSearch} />
        </label>
    );
}

export default Filter;