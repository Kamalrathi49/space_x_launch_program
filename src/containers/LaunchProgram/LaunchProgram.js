import React from 'react';
import LaunchFilters from '../../components/LaunchFilters/LaunchFilters';
import LauchList from '../../components/LaunchList/LaunchList';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux';
import { fetchLaunchData } from '../../redux/actions';
import { getParam, setParam } from '../../utils/utils';
import './LaunchProgram.css';


export class LaunchProgram extends React.Component {

    state = {
        filterData: [{
            type: "launch_year",
            displayName: "Launch Year",
            data: new Array((new Date().getFullYear() - 2005)).fill().map((a, i) => 2006 + i),
            activeItem: this.props.query["launch_year"] && parseInt(this.props.query["launch_year"])
        },
        {
            type: "launch_success",
            displayName: "Successful Launch",
            data: ["true", "false"],
            activeItem: this.props.query["launch_success"]
        },
        {
            type: "land_success",
            displayName: "Successful Landing",
            data: ["true", "false"],
            activeItem: this.props.query["land_success"]
        }],
        queryString: setParam(this.props.query),
        dataLimit: 50
    }

    componentDidMount() {
        this.props.fetchLaunchData(`?limit=${this.state.dataLimit}${this.state.queryString && "&" + this.state.queryString}`);
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.queryString !== this.state.queryString) || (prevState.dataLimit !== this.state.dataLimit)) {
            this.props.fetchLaunchData(`?limit=${this.state.dataLimit}${this.state.queryString && "&" + this.state.queryString}`);
        }
    }

    fetchMoreData = () => {
        this.setState((prevState) => {
            return {
                dataLimit: prevState.dataLimit + 50
            }
        })
    }

    onFilterApply = (category, value) => {
        const currentQueries = getParam(this.state.queryString);
        const currentCategory = { ...this.state.filterData.find(filterCategory => filterCategory.type === category) };

        if (currentCategory.activeItem && currentCategory.activeItem === value) {
            currentQueries[category] = null;
            currentCategory.activeItem = null;
        }
        else {
            currentCategory.activeItem = value;
            currentQueries[category] = value;
        }
        const queryString = setParam(currentQueries);

        this.props.history.push("?" + queryString);
        this.setState(prevState => {
            return {
                filterData: prevState.filterData.map(filterCategory => filterCategory.type === category ? currentCategory : filterCategory),
                queryString: queryString
            }
        })
    }

    render() {
        let launchList = <div></div>;

        if (this.props.launchProgram.success) {
            launchList =
                <LauchList
                    launchData={this.props.launchProgram.launchData}
                    dataLimit={this.state.dataLimit}
                    fetchMoreData={this.fetchMoreData} />
        }
        else if (this.props.launchProgram.error) {
            launchList = <div className="no-data"><h2>Error occurred while fetching data</h2></div>
        }

        return <>
            <ErrorBoundary>
                <LaunchFilters filterData={this.state.filterData} onFilterApply={this.onFilterApply} />
            </ErrorBoundary>
            <ErrorBoundary>
                {launchList}
                {this.props.launchProgram.loading && <Spinner />}
            </ErrorBoundary>
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        launchProgram: state.launchProgram
    }
}
export default connect(mapStateToProps, { fetchLaunchData })(LaunchProgram)