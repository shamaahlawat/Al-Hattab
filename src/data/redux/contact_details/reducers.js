import actionTypes from '../action_types';
import states from './states';
import dotProp from 'dot-prop-immutable';

export default function contact_details(state = states.contact_details, action) {
    switch (action.type) {
        case actionTypes.UPDATE_CONTACT_DETAILS:
            return dotProp.set(state, action.path, action.payload);
        // case actionTypes.SUBMIT_CONTACT_REQUEST:
        //     return Object.assign({}, states.contact_details);
        default:
            return state;
    }
}
