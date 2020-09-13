import launchProgramReducer from './launchProgramReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    launchProgram: launchProgramReducer
}) 