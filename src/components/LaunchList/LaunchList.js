import React from 'react';
import LaunchItem from './LaunchItem/LaunchItem'
import './LaunchList.css';

const LauchList = (props) => {

    const launchItems = props.launchData.map(data => {
        return <LaunchItem
            mission_patch_small={data.mission_patch_small}
            mission_name={data.mission_name}
            mission_id={data.mission_id}
            launch_year={data.launch_year}
            launch_success={data.launch_success}
            landing_success={data.landing_success}
            flight_number={data.flight_number}
            key={data.flight_number}
        />
    }
    )

    return (
        <div className="launch-list">
            {launchItems}
        </div>
    );
}

export default LauchList;