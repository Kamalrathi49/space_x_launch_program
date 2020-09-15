import React from 'react';
import LaunchItem from './LaunchItem/LaunchItem'
import './LaunchList.css';

class LauchList extends React.Component {

    state = {
        slicedList: this.props.launchData.slice(0, 12),
    }
    lastElement = React.createRef(null);
    observer = null;

    componentDidMount() {
        if (this.state.slicedList.length < this.props.launchData.length) {
            this.createIntersectionObserver();
        }
    }
    componentDidUpdate() {
        if (this.state.slicedList.length < this.props.launchData.length && !this.observer) {
            this.createIntersectionObserver();
        }
    }
    componentWillUnmount() {
        this.observer && this.observer.disconnect();
    }

    createIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const { isIntersecting } = entry;
                if (isIntersecting) {
                    if (this.state.slicedList.length < this.props.launchData.length) {
                        this.lastElement = React.createRef(null);
                        this.observer = this.observer.disconnect();
                        this.setState((prevState) => {
                            return {
                                slicedList: this.props.launchData.slice(0, prevState.slicedList.length + 12)
                            }
                        })
                    }
                }
            })
        },
            {
                rootMargin: '0px 0px 1000px 0px',
            });
        this.observer.observe(this.lastElement.current);
    }

    render() {

        const launchItems = this.state.slicedList.map((data, i) => {
            return <LaunchItem
                mission_patch_small={data.mission_patch_small}
                mission_name={data.mission_name}
                mission_id={data.mission_id}
                launch_year={data.launch_year}
                launch_success={data.launch_success}
                landing_success={data.landing_success}
                flight_number={data.flight_number}
                key={data.flight_number}
                {...(this.state.slicedList.length && { ref: this.lastElement })}
            />
        }
        )
        return (
            <div className="launch-list" >
                { launchItems}
            </div>
        );
    }
}

export default LauchList;