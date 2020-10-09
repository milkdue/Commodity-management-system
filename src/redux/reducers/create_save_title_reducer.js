import {SAVE_TITLE} from '../action_types.js';
export default function(previousState = '', action){
    let {type, data} = action;
    let newState;
    switch (type) {
        case SAVE_TITLE:
            newState = data;
            return newState;
        default:
            return previousState;
    } 
}