import React from 'react';
import FilterItem from '../FilterItem/FilterItem';
import './FilterCategory.css';

const FilterCategory = (props) => {

    const onFilterClick = (value) => {
        props.onFilterApply(props.filerType, value);
    }

    const filterItems = props.filterValues.map((filter) =>
        <FilterItem
            value={filter}
            key={filter}
            isActive={filter === props.activeItem}
            onClick={onFilterClick} />
    )

    return (
        <div className="filter-category">
            <h4 className="filter-type">{props.filterDisplayName}:</h4>
            <div className="filter-values">
                {filterItems}
            </div>
        </div>
    );
}

export default FilterCategory;