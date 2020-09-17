import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LaunchProgram } from './LaunchProgram';
import LauchList from '../../components/LaunchList/LaunchList';
import LaunchFilters from '../../components/LaunchFilters/LaunchFilters';
import Spinner from '../../components/UI/Spinner/Spinner'

configure({ adapter: new Adapter() });

let wrapper

describe('<LaunchProgram/>', () => {
    beforeEach(() => {
        wrapper = shallow(<LaunchProgram fetchLaunchData={() => { }} query={{}} launchProgram={{ loading: true }} />);
    })
    it('should render <LauchList/> when receiving launchData', () => {
        wrapper.setProps({ launchProgram: { success: true, launchData:[{},{}] } })
        expect(wrapper.containsMatchingElement(<LauchList launchData={[{},{}]}/>)).toEqual(true);
    })
    it('should render an error message in case of error', () => {
        wrapper.setProps({ launchProgram: { error: true } })
        expect(wrapper.containsMatchingElement(<div className="no-data"><h2>Error occurred while fetching data</h2></div>)).toEqual(true);
    })
    it('should render <Spinner/> when loading', () => {
        wrapper.setProps({ launchProgram: { loading: true } })
        expect(wrapper.containsMatchingElement(<Spinner/>)).toEqual(true);
    })
    it('should render <LaunchFilters/>', () => {
        expect(wrapper.containsMatchingElement(<LaunchFilters/>)).toEqual(true);
    })
})
