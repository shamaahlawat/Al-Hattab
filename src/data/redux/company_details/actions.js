import actionTypes from '../action_types';
import * as API from '../../config/api';

export function getCompanyDetails() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.GET_COMPANY_DETAILS,
            payload: API.getCompanyDetails()
        });
    };
}

export function getSubCompanyDetails(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.GET_SUBCOMPANY_DETAILS,
            payload: API.getSubCompanyDetails(data)
        });
    };
}
