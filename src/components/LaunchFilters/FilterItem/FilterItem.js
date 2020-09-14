import React from 'react';
import './FilterItem.css';

const FilterItem = React.memo((props) => {
    return (
        <button className={"filter-item" + (props.isActive ? " active" : "")}
            onClick={() => { props.onClick(props.value) }}>
            {props.value}
        </button>
    );
});

export default FilterItem;