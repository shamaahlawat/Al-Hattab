import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Row, Tooltip } from 'antd';

import * as CONSTANTS from '../../data/config/constants';
import { icons } from '../../data/assets/assetsurl';
import * as pageActions from '../../data/redux/page_details/actions';

import PageHeader from '../../components/page_header';
import CategoryHeader from '../../components/category_header';

//css clubed with ourCompaniesContainer as both have same layout

function mapStateToProps(state) {
    return {
        company_details: state.company_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions), dispatch)
    };
}

class OurClients extends Component {
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.OUR_CLIENTS);
    }

    loadPath = (path) => {
        window.open(path);
    };


    render() {
        const { company_details } = this.props;
        const clients = company_details.main_company.company_details.clients;

        return (
            <div className="full-flex flex-column pageContainer ourClientsContainer">
                <PageHeader image={icons.strategy} />
                <Col xs={{ span: 22, offset: 1 }} className="l-mrgn-20 tb-pad-50">
                    <CategoryHeader title={CONSTANTS.appPages.OUR_CLIENTS} />
                     <Row gutter={16}>
                        {clients.map((client, index) => {
                            return (
                                <Tooltip title={client.name} key={index}>
                                    <Col xs={24} sm={12} md={8} lg={6} className="companyList" key={client.id}>
                                        <div className="company is-relative flex-column flex-center mrgn-10 is-cursor-ptr" onClick={() => this.loadPath(client.link)}>
                                            <img src={client.logo} className="companyImage" alt="" />
                                        </div>
                                    </Col>
                                </Tooltip>
                            );
                        })}
                    </Row>
                </Col>
            </div>
        );
    }
}

OurClients.propTypes = {
    actions: PropTypes.object,
    company_details: PropTypes.object,
    history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(OurClients);
