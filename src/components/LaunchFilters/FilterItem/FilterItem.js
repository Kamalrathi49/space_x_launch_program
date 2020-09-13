import React from 'react';
import './FilterItem.css';

const FilterItem = (props) => {
    return (
        <button className={"filter-item" + (props.isActive ? " active" : "")}
            role="filter"
            aria-label={props.value}
            aria-selected={props.isActive}
            onClick={() => { props.onClick(props.value) }}>
            {props.value}
        </button>
    );
}

export default FilterItem;