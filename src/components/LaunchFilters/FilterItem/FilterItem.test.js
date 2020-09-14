import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilterItem from './FilterItem';

configure({ adapter: new Adapter() });

let wrapper

describe('<FilterItem/>', () => {
    beforeEach(() => {
        wrapper = shallow(<FilterItem />);
    })
    it(`should render a <button/> element without an active class`, () => {
        wrapper.setProps({ value: "2006", })
        expect(wrapper.containsMatchingElement(<button className="filter-item">2006</button>)).toEqual(true);
    })
    it(`should render a <button/> element having an active class`, () => {
        wrapper.setProps({ value: "2006", isActive: true })
        expect(wrapper.containsMatchingElement(<button className="filter-item active">2006</button>)).toEqual(true);
    })
})
