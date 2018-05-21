import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import page_details from './page_details/reducers';
import user_details from './user_details/reducers';
import company_details from './company_details/reducers';
import contact_details from './contact_details/reducers';

const rootReducer = combineReducers({
    page_details,
    user_details,
    company_details,
    contact_details,
    routing: routerReducer
});

export default rootReducer;
