import launchProgramReducer from './launchProgramReducer';
import * as actions from '../actions/types';

describe('launchProgramReducer', () => {
    it('should return the initial state', () => {
        expect(launchProgramReducer(undefined, {})).toEqual({
            launchData: null,
            loading: false,
            error: false,
            success: false
        })
    })

    it('should set error as true in case of api failure ', () => {
        expect(launchProgramReducer({
            launchData: null,
            loading: false,
            error: false,
            success: false
        }, {
            type: actions.LAUNCH_DATA_FETCH_ERROR,
        })).toEqual({
            launchData: null,
            loading: false,
            error: true,
            success: false
        })
    })
    
    it('should store the response received from api', () => {
        expect(launchProgramReducer({
            launchData: null,
            loading: false,
            error: false,
            success: false
        }, {
            type: actions.LAUNCH_DATA_FETCH_SUCCESS,
            payload: [{
                links: { mission_patch_small: "patch" },
                mission_name: "name",
                mission_id: ["abcd1234"],
                launch_year: "000",
                launch_success: true,
                flight_number: "1",
                rocket: { first_stage: { cores: [{ land_success: true }] } }
            }]
        })).toEqual({
            launchData: [{
                flight_number: "1",
                landing_success: "true",
                launch_success: "true",
                launch_year: "000",
                mission_id: ["abcd1234"],
                mission_name: "name",
                mission_patch_small: "patch"
            }
            ],
            loading: false,
            error: false,
            success: true
        })
    })
})