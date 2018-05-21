import actionTypes from '../action_types';
import * as API from '../../../data/config/api';

export function updateContactDetails(path, data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_CONTACT_DETAILS,
            payload: data,
            path: path
        });
    };
}

export function submitContactDetails(data) {
    return function (dispatch) {
        API.submitContactDetails(data).then((res) => {
            dispatch({
                type: actionTypes.SUBMIT_CONTACT_REQUEST,
                payload: res
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.SUBMIT_CONTACT_REQUEST_ERROR,
            });
        });
    };
}



