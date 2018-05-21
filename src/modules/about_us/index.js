import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col } from 'antd';

import * as CONSTANTS from '../../data/config/constants';
import { icons } from '../../data/assets/assetsurl';
import * as pageActions from '../../data/redux/page_details/actions';

import './index.scss';
import PageHeader from '../../components/page_header';
import CategoryHeader from '../../components/category_header';

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

class AboutUs extends Component {
    constructor(props) {
        super(props);
        const { company_details } = props;
        const main_company_details = company_details.main_company.company_details;

        this.state = {
            curr_tab: 0,
            tabs: main_company_details.about_us.length ? main_company_details.about_us.map((tab, index) => {
                return {
                    id: index,
                    team: false,
                    title: tab.category_title,
                    active: index === 0
                };
            }) : [],
            animation_class: "zoomIn"
        };

        if (main_company_details.team.length > 0) {
            this.state.tabs.push({
                id: this.state.tabs.length,
                team: true,
                title: "Our Team",
                active: false
            });
        }
    }

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.ABOUT_US);
    }

    onTabClick = (curr_tab) => {
        this.setState({
            animation_class: 'zoomOut',
        }, () => {
            setTimeout(() => {
                this.setState({
                    curr_tab: curr_tab.id,
                    tabs: this.state.tabs.map(tab => {
                        tab.active = tab.id === curr_tab.id;
                        return tab;
                    }),
                    animation_class: "zoomIn"
                });
            }, 700);
        });
    }

    render() {
        const { page_details, company_details } = this.props;
        const { curr_tab, tabs, animation_class } = this.state;
        const desktop_view = (page_details.device_data.screen_type !== 'xs');
        const main_company_details = company_details.main_company.company_details;
        const current_tab = tabs[curr_tab];
        const current_tab_details = main_company_details.about_us[curr_tab];

        return (
            <div className="full-flex flex-column pageContainer aboutContainer">
                <PageHeader image={icons.strategy} />
                <Col xs={{ span: 22, offset: 1 }}>
                    <CategoryHeader title={CONSTANTS.appPages.ABOUT_US} tabs={tabs} onClickFn={this.onTabClick} />
                    <Col xs={24} className={`tabContentContainer flex-center b-pad-50 animated ${animation_class} ${!current_tab.team && 'flex-column'} ${desktop_view ? 'desktop' : 'mobile'}`}>
                        {!current_tab.team && current_tab_details.category_info[0].map((info, index) => {
                            return (
                                <div key={index} className={`tb-pad-30 flex tabContentRow ${index % 2 == 0 ? 'left-align' : 'right-align'}`}>
                                    <div className="imageContainer">
                                        {info.type === 'image' && <img src={info.image} />}
                                        {info.type === 'video' && <img src={info.thumb} />}
                                    </div>
                                    <div className={`textContainer full-flex ${info.description.length < 200 ? 'font-xl' : 'font-md'}`}>{info.description}</div>
                                </div>
                            );
                        })}
                        {current_tab.team && main_company_details.team.map((team, index) => {
                            return (
                                <Col xs={24} sm={12} md={8} lg={6} key={index} className="pad-10 teamContainer">
                                    <div className="flex-column team bg-white">
                                        <div className="imageContainer" style={{ backgroundImage: `url(${team.image})` }}>&nbsp;</div>
                                        <div className="pad-10 detailsContainer flex-column">
                                            <span className="name tb-pad-10 is-font-bold font-md">{team.name}</span>
                                            <span className="designation font-sm is-font-bold">{team.designation}</span>
                                            <span className="description font-sm">{team.description}</span>
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Col>
                </Col>
            </div>
        );
    }
}

AboutUs.propTypes = {
    actions: PropTypes.object,
    page_details: PropTypes.object,
    company_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
