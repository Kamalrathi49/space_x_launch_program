import React from 'react';
import LaunchItem from './LaunchItem/LaunchItem'
import './LaunchList.css';

class LauchList extends React.Component {

    state = {
        slicedIndex: 12,
    }
    lastElement = React.createRef(null);
    observer = null;

    componentDidMount() {
        if (this.state.slicedIndex < this.props.launchData.length) {
            this.createIntersectionObserver();
        }
    }
    componentDidUpdate() {
        if (this.state.slicedIndex < this.props.launchData.length && !this.observer) {
            this.createIntersectionObserver();
        }
        else if (this.state.slicedIndex >= this.props.dataLimit && this.props.launchData.length === this.props.dataLimit) {
            this.props.fetchMoreData()
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
                    if (this.state.slicedIndex < this.props.launchData.length) {
                        this.lastElement = React.createRef(null);
                        this.observer = this.observer.disconnect();
                        this.setState((prevState) => {
                            return {
                                slicedIndex: prevState.slicedIndex + 12
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
        let launchItems;
        if (this.props.launchData && this.props.launchData.length) {
            launchItems = this.props.launchData.slice(0, this.state.slicedIndex).map((data, i) => {
                return <LaunchItem
                    mission_patch_small={data.mission_patch_small}
                    mission_name={data.mission_name}
                    mission_id={data.mission_id}
                    launch_year={data.launch_year}
                    launch_success={data.launch_success}
                    landing_success={data.landing_success}
                    flight_number={data.flight_number}
                    key={data.flight_number}
                    {...(i === (this.state.slicedIndex - 1) && { ref: this.lastElement })}
                />
            }
            )
        } else {
            launchItems = <div className="no-data"><h2>No data found</h2></div>
        }

        return (
            <div className="launch-list" >
                { launchItems}
            </div>
        );
    }
}

export default LauchList;