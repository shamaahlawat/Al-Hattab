import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col } from 'antd';
import PropTypes from 'prop-types';

import * as pageActions from '../../../data/redux/page_details/actions';
import * as contactPageActions from '../../../data/redux/contact_details/actions';

import './index.scss';
import ContactForm from '../contact_form';

function mapStateToProps(state) {
    return {
        contact_details: state.contact_details,
        page_details: state.page_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, contactPageActions), dispatch)
    };
}

class ContactContainer extends Component {
    // componentWillMount() {
    //     this.props.actions.pageChanged(CONSTANTS.appPages.ABOUT, CONSTANTS.appPages.ABOUT);
    //     this.props.actions.getCompanyDetails();
    // }

    render() {

        //     className = {`aboutYoga tb-mrgn-10 flex-column ${desktop_view ? '' : 'is-text-center'}`
        // }
        const desktop_view = (this.props.page_details.device_data.screen_type !== 'xs');

        return (
            <div className="contactContainer">
                <Col md={24} sm={24}
                    // className="flex-row"
                    className={`t-mrgn-10 ${desktop_view ? 'flex-row' : 'flex-column'}`
                    }
                >
                    <Col xs={24} md={12} sm={12}>
                        <div className="subheading t-pad-50 b-pad-10">ANY QUESTIONS?</div>
                        <div className="blueBorder" />
                        <ContactForm actions={this.props.actions} contact_details={this.props.contact_details} />
                    </Col>
                    <Col xs={24} md={12} sm={12}>
                        <div className="subheading t-pad-50 b-pad-10">ADDRESS</div>
                        <div className="blueBorder" />
                        <div className="t-pad-30 addressDetails">
                            {/* {
                            companies_details.company_details.address.split("\n").map((address) => {
                                return (
                                    address
                                );
                            })
                        } */}
                            Doha – Qatar<br />
                            Tel: +974 44775848<br />
                            Fax: +974 44775849<br />
                            C.R No: 3932,<br />
                            PO Box: 4810<br />
                            email:info@alahligroup.com
                        </div>
                        <div className="subheading t-pad-30 b-pad-10">LOCATION</div>
                        <div className="blueBorder" />
                        <div className="t-pad-50">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.759844474596!2d72.1971944145864!3d22.774292085079345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395eb8f1c08348f3%3A0x847ac8e924b075ec!2siCreate!5e0!3m2!1sen!2sin!4v1521295793159" width="398" height="271" />
                        </div>
                    </Col>
                </Col>
            </div>
        );
    }
}

ContactContainer.propTypes = {
    actions: PropTypes.object,
    companies_details: PropTypes.object,
    contact_details: PropTypes.object,
    page_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer);
