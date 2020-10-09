import {SAVE_PRODUCT_LIST} from '../action_types.js';
export default function(previousState = null, action){
    let {type, data} = action;
    let newState;
    switch (type) {
        case SAVE_PRODUCT_LIST:
            newState = data;
            return newState;
        default:
            return previousState;
    } 
}