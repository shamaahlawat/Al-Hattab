import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Icon, Row, Tooltip } from 'antd';
import PropTypes from 'prop-types';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as companyActions from '../../data/redux/company_details/actions';

import './index.scss';
import CarousalSection from '../../components/background_carousel';

// import MediaSection from './components/media_section';
import CategoryHeader from '../../components/category_header';
import ContactContainer from '../contact_us/contact_container';
// import CompaniesImageComponent from '../../components/companiesImageComponent';
import ImageGrid from '../../components/image_grid';


function mapStateToProps(state) {
    return {
        company_details: state.company_details,
        page_details: state.page_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, companyActions), dispatch)
    };
}

class CompanyPage extends Component {
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.COMPANY_PAGE);
        this.props.actions.getSubCompanyDetails({channel_name: this.props.match.params.company_id});
    }

    render() {
        const { company_details, page_details } = this.props;
        if (company_details.loaders.get_subcompany_details === CONSTANTS.statuses.LOADING) {
            return (
               <div className="full-flex full-height flex-column flex-center pageContainer companyPageContainer">
                    <Icon type="loading" className="font-xl"/>
                </div>
            );
        } else if (company_details.loaders.get_subcompany_details === CONSTANTS.statuses.LOAD_ERR) {
            return (
               <div className="full-flex full-height flex-column flex-center pageContainer companyPageContainer">
                    <h1>Error loading page. Please reload!</h1>
                </div>
            );
        } else if (company_details.sub_company) {
            const { sub_company } = company_details;            
            return (
                <div className="full-flex flex-column pageContainer companyPageContainer">
                    {sub_company.company_sliders.length && 
                        <Col xs={{ span: 24 }}>
                            <CarousalSection type="sub" company_details={sub_company} />
                        </Col>
                    }
                    <Col xs={{ span: 22, offset: 1 }}>
                        {sub_company.gallery && sub_company.gallery.length && 
                            <Col xs={24}>
                                <CategoryHeader title="Our Works" />
                                <ImageGrid images={sub_company.gallery} view={page_details.device_data.screen_type}/>
                            </Col>
                        }
                        {sub_company.clients && sub_company.clients.length && 
                            <Col xs={24}>
                                <CategoryHeader title="Our Clients" />
                                <Row gutter={16}>
                                    {sub_company.clients.map((client, index) => {
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
                        }
                        {sub_company.cerificate && sub_company.cerificate.id && 
                            <Col xs={24} className="l-mrgn-20 tb-pad-50" >
                                <CategoryHeader title="Certificate" />
                                <Col xs={24} className="certificate">
                                    <Col xs={12} className="certificateText r-pad-10">{sub_company.cerificate.detail}</Col>
                                    <Col xs={{ span: 11, offset: 1 }} className="flex-row flex-center">
                                        {sub_company.cerificate.images.map(image => {
                                            return(
                                                <div key={image.id} className="certificateImage mrgn-5">
                                                    <img src={image.url} alt="" />
                                                </div>
                                            );
                                        })}
                                    </Col>
                                </Col>
                            </Col>
                        }
                    </Col>
                    <Col xs={24} className="bg-white">
                        <Col xs={{ span: 22, offset: 1 }}>
                            <CategoryHeader title="Contact Us" />
                            <ContactContainer />
                        </Col>
                    </Col>    
                </div>
            );
        } else {
            return(null);
        }
    }
}

CompanyPage.propTypes = {
    actions: PropTypes.object,
    match: PropTypes.object,
    company_details: PropTypes.object,
    page_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage);
