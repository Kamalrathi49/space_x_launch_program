import * as actions from '../actions/types'

const initialState = {
    launchData: null,
    loading: false,
    error: false,
    success: false
}

const launchProgramReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LAUNCH_DATA_FETCH_START: {
            return {
                ...state,
                loading: true,
                error: false,
            }
        }
        case actions.LAUNCH_DATA_FETCH_ERROR: {
            return {
                launchData: null,
                loading: false,
                error: true,
                success: false
            }
        }
        case actions.LAUNCH_DATA_FETCH_SUCCESS: {
            return {
                launchData: action.payload.map(data => {
                    return {
                        mission_patch_small: data.links.mission_patch_small,
                        mission_name: data.mission_name,
                        mission_id: data.mission_id,
                        launch_year: data.launch_year,
                        launch_success: data.launch_success + "",
                        flight_number: data.flight_number,
                        landing_success: data.rocket.first_stage.cores.some(core => core.land_success === null) ? "NA"
                            : data.rocket.first_stage.cores.every(core => core.land_success) + ""
                    }
                }),
                loading: false,
                error: false,
                success: true
            }
        }
        default: {
            return state;
        }
    }
}

export default launchProgramReducer