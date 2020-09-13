import * as actions from './types'

export const launchDataFetchStart = () => {
    return {
        type: actions.LAUNCH_DATA_FETCH_START
    }
}

export const launchDataFetchError = () => {
    return {
        type: actions.LAUNCH_DATA_FETCH_ERROR
    }
}

export const launchDataFetchSuccess = (data) => {
    return {
        type: actions.LAUNCH_DATA_FETCH_SUCCESS,
        payload: data
    }
}


export const fetchLaunchData = (url) => {
    return (dispatch) => {
        dispatch(launchDataFetchStart());
        fetch("https://api.spaceXdata.com/v3/launches" + url)
            .then(response => response.json())
            .then(data => {
                dispatch(launchDataFetchSuccess(data));
            })
            .catch(error => {
                console.log("Error received", error)
                dispatch(launchDataFetchError());
            })
    }
}