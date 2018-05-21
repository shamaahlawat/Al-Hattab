import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col } from 'antd';
import PropTypes from 'prop-types';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';

import './index.scss';
import MediaSection from './components/media_section';
import CategoryHeader from '../../components/category_header';
import CarousalSection from '../../components/background_carousel';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        company_details: state.company_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions), dispatch)
    };
}

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            tabs: [
                { id: 0, title: "NEWS", active: true },
                { id: 1, title: "EVENTS", active: false }
            ],
            current_tab: 0,
            animation_class: 'zoomIn'
        };
    }

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.HOME);
    }

    onTabChange = (curr_tab) => {
        this.setState({
            animation_class: 'zoomOut'
        }, () => {
            setTimeout(() => {
                this.setState({
                    tabs: this.state.tabs.map(tab => {
                        tab.active = (tab.id === curr_tab.id);
                        return tab;
                    }),
                    current_tab: curr_tab.id,
                    animation_class: 'zoomIn'
                });
            }, 700);
        });
    }

    render() {
        const { company_details } = this.props;
        const main_company_details = company_details.main_company.company_details;
        const medias = this.state.current_tab === 0 ? main_company_details.news : main_company_details.events;

        return (
            <div className="full-flex flex-column pageContainer homeContainer">
                <Col xs={24}>
                    <CarousalSection type="home" company_details={main_company_details} />
                </Col>
                <Col xs={24} className="mediaSection tb-pad-50">
                    <Col xs={{ span: 22, offset: 1}}>
                        <CategoryHeader title="Media Center" tabs={this.state.tabs} onClickFn={this.onTabChange} />
                        <MediaSection className={`animated ${this.state.animation_class}`} medias={medias} />
                    </Col>
                </Col>
            </div>
        );
    }
}

HomePage.propTypes = {
    actions: PropTypes.object,
    company_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
