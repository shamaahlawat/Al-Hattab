import actionTypes from '../action_types';
import states from './states';
import { statuses } from '../../config/constants';

export default function company_details(state = states.company_details, action) {
    switch (action.type) {
        case `${actionTypes.GET_COMPANY_DETAILS}_PENDING`: {
            return {
                ...state,
                loaders: {
                    get_company_details: statuses.LOADING
                }
            };
        }

        case `${actionTypes.GET_COMPANY_DETAILS}_FULFILLED`: {
            action.payload = action.payload.data;
            localStorage.setItem('main_company_details', JSON.stringify(action.payload.company_details));
            localStorage.setItem('main_company_companies', JSON.stringify(action.payload.companies));

            return {
                ...state,
                main_company: {
                    company_details: action.payload.company_details,
                    companies: action.payload.companies
                },
                loaders: {
                    get_company_details: statuses.LOADED
                }
            };
        }

        case `${actionTypes.GET_COMPANY_DETAILS}_REJECTED`: {
            return {
                ...state,
                loaders: {
                    get_company_details: statuses.LOAD_ERR
                }
            };
        }

        case `${actionTypes.GET_SUBCOMPANY_DETAILS}_PENDING`: {
            return {
                ...state,
                loaders: {
                    get_subcompany_details: statuses.LOADING
                }
            };
        }

        case `${actionTypes.GET_SUBCOMPANY_DETAILS}_FULFILLED`: {
            action.payload = action.payload.data;
            return {
                ...state,
                sub_company: action.payload.company_details,
                loaders: {
                    get_subcompany_details: statuses.LOADED
                }
            };
        }

        case `${actionTypes.GET_SUBCOMPANY_DETAILS}_REJECTED`: {
            return {
                ...state,
                loaders: {
                    get_subcompany_details: statuses.LOAD_ERR
                }
            };
        }

        default:
            return state;
    }
}
