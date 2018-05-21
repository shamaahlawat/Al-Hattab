import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';

import * as CONSTANTS from '../../data/config/constants';
import { icons } from '../../data/assets/assetsurl';
import * as pageActions from '../../data/redux/page_details/actions';
import * as companyActions from '../../data/redux/company_details/actions';

import './index.scss';
import PageHeader from '../../components/page_header';
import CategoryHeader from '../../components/category_header';

function mapStateToProps(state) {
    return {
        company_details: state.company_details,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, companyActions), dispatch)
    };
}

class OurCompanies extends Component {
    constructor() {
        super();
        this.company_refs = [];
    }

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.OUR_COMPANIES);
    }

    loadPath = (path) => {
        this.props.history.push(`/company_page/${path}`);
    };

    mouseEnter = (index) => {
        this.company_refs[index].style.backgroundColor = this.props.company_details.main_company.companies[index].background_color;
    }

    render() {
        const { company_details } = this.props;
        const companies = company_details.main_company.companies;

        return (
            <div className="full-flex flex-column pageContainer ourCompaniesContainer">
                <PageHeader image={icons.strategy} />
                <Col xs={{ span: 22, offset: 1 }} className="l-mrgn-20 tb-pad-50">
                    <CategoryHeader title={CONSTANTS.appPages.OUR_COMPANIES} />
                     <Row gutter={16}>
                        {companies.map((company, index) => {
                            return (
                                <Col xs={24} sm={12} md={8} lg={6} className="companyList" key={company.id}>
                                    <div className="company is-relative flex-column flex-center tb-mrgn-10 is-cursor-ptr" onMouseEnter={() => this.mouseEnter(index)} onClick={() => this.loadPath(company.channel_name)}>
                                        <img src={company.logo} className="companyImage" alt="" />
                                        <div className="flex-row flex-center overlay" ref={ref => this.company_refs[index] = ref}>
                                            <span className="knowMore">KNOW MORE</span>
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
            </div>
        );
    }
}

OurCompanies.propTypes = {
    actions: PropTypes.object,
    company_details: PropTypes.object,
    history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(OurCompanies);
