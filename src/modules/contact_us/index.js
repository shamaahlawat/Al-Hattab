import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col } from 'antd';
import PropTypes from 'prop-types';

import { icons } from '../../data/assets/assetsurl';
import * as pageActions from '../../data/redux/page_details/actions';
import * as companyActions from '../../data/redux/company_details/actions';

import './index.scss';
import PageHeader from '../../components/page_header';
import ContactContainer from './contact_container';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, companyActions), dispatch)
    };
}

function mapStateToProps(state) {
    return {
        companies_details: state.companies_details,
    };
}

class ContactUs extends Component {
    // componentWillMount() {
    //     this.props.actions.pageChanged(CONSTANTS.appPages.ABOUT, CONSTANTS.appPages.ABOUT);
    //     this.props.actions.getCompanyDetails();
    // }

    render() {
        return (
            <div className="full-flex flex-column contactUsContainer">
                <PageHeader image={icons.strategy} />
                <Col xs={{ span: 22, offset: 1 }} className="l-mrgn-20 tb-pad-50">
                    <ContactContainer />
                </Col>
            </div>
        );
    }
}

ContactUs.propTypes = {
    actions: PropTypes.object,
    companies_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
