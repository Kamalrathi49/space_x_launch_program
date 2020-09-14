import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilterCategory from './FilterCategory';
import FilterItem from '../FilterItem/FilterItem';

configure({ adapter: new Adapter() });

const numberOfYears = new Date().getFullYear() - 2005;

let wrapper

describe('<FilterCategory/>', () => {
    beforeEach(() => {
        wrapper = shallow(<FilterCategory filterValues={[]} />);
    })
    it('should render 2 <FilterItem/> elements', () => {
        wrapper.setProps({ filterValues: ["true", "false"] })
        expect(wrapper.find(FilterItem)).toHaveLength(2);
    })
    it(`should render ${numberOfYears} <FilterItem/> elements`, () => {
        wrapper.setProps({ filterValues: new Array(numberOfYears).fill(1) })
        expect(wrapper.find(FilterItem)).toHaveLength(numberOfYears);
    })

    it('should render a <FilterItem/> element in active state', () => {
        wrapper.setProps({ filterValues: ["true", "false"], activeItem: "true" })
        expect(wrapper.containsMatchingElement(<FilterItem value="true" isActive={true} />)).toEqual(true);
    })
})
