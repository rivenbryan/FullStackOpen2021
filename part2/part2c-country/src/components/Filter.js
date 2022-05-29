import React from 'react';

const Filter = ({getFilter}) => {
    return (
        <p>Input countries: <input type="text" placeholder='Filter...' onChange={e=>getFilter(e.target.value)} /> </p>
    )
}

export default Filter