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
        <section className="filter-category">
            <h3 className="filter-type">{props.filterDisplayName}</h3>
            <div className="filter-values">
                {filterItems}
            </div>
        </section>
    );
}

export default FilterCategory;