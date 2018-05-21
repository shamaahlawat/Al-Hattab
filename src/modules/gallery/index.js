import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col } from 'antd';

import * as CONSTANTS from '../../data/config/constants';
import { icons } from '../../data/assets/assetsurl';
import * as pageActions from '../../data/redux/page_details/actions';

import ImageGrid from '../../components/image_grid';
import PageHeader from '../../components/page_header';
import CategoryHeader from '../../components/category_header';

function mapStateToProps(state) {
    return {
        company_details: state.company_details,
        page_details: state.page_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions), dispatch)
    };
}

class Gallery extends Component {
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.GALLERY);
    }

    render() {
        const { page_details, company_details } = this.props;
        const images = company_details.main_company.company_details.gallery;

        return (
            <div className="full-flex flex-column pageContainer GalleryContainer">
                <PageHeader image={icons.strategy} />
                <Col xs={{ span: 22, offset: 1 }} className="l-mrgn-20">
                    <CategoryHeader title={CONSTANTS.appPages.GALLERY} />
                </Col>
                <ImageGrid images={images} view={page_details.device_data.screen_type}/>
            </div>
        );
    }
}

Gallery.propTypes = {
    actions: PropTypes.object,
    company_details: PropTypes.object,
    page_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);


