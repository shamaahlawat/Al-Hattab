import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

import { icons } from '../../data/assets/assetsurl';
import * as CONSTANTS from '../../data/config/constants';

import './index.scss';

let navItems = [
    { key: 1, title: 'Home', page: CONSTANTS.appPages.HOME, path: '/' },
    { key: 2, title: 'About us', page: CONSTANTS.appPages.ABOUT_US, path: '/about_us' },
    { key: 3, title: 'Our Companies', page: CONSTANTS.appPages.OUR_COMPANIES, path: '/our_companies' },
    { key: 4, title: 'Gallery', page: CONSTANTS.appPages.GALLERY, path: '/gallery' },
    { key: 5, title: 'Our Clients', page: CONSTANTS.appPages.OUR_CLIENTS, path: '/our_clients' },
    { key: 6, title: 'Media', page: CONSTANTS.appPages.MEDIA, path: '/' },
    { key: 7, title: 'Career', page: CONSTANTS.appPages.CAREER, path: '/' },
    { key: 8, title: 'Contact Us', page: CONSTANTS.appPages.CONTACT_US, path: '/contact_us' },
    { key: 9, title: 'Privacy Policy', page: CONSTANTS.appPages.CAREER, path: '/' },
    { key: 10, title: 'Sitemap', page: CONSTANTS.appPages.CONTACT_US, path: '/' }
];

export default class Footer extends Component {
    render() {
        const { company_details, loadPath } = this.props;
        return (
            <div className="appFooterContainer tb-pad-20 color-white">
                <div className="footerBodyContainer tb-pad-5 flex-row b-mrgn-20 t-pad-10 flex-ac flex-wrap">
                    <Col xs={24} md={6} className="tb-pad-15 flex-center flex-column">
                        <div className="b-pad-10">
                            <img src={icons.footer_logo} />
                        </div>
                        <div className="contactContainer text-center">
                            <div className="elementHeading tb-pad-20 color-white ">CONTACT US
                                  <div className="b-border width-40 t-pad-10" />
                            </div>
                            <div className="listItem is-font-bolder"> {company_details.company_details.address}</div>
                        </div>
                    </Col>
                    <Col xs={24} md={18}>
                        <Col xs={24} md={10} className="tb-pad-15 flex-center flex-column">
                            <ul className="footerElements is-cursor-ptr">
                                <div className="elementHeading color-white  tb-pad-20">COMPANY
                                    <div className="b-border width-40 t-pad-10" />
                                </div>
                                {navItems.map(navItem => {
                                    return (
                                        <li key={navItem.key} className="listItem"
                                            onClick={() => { loadPath(navItem.path); }}>{navItem.title}
                                        </li>
                                    );
                                })}
                            </ul>
                        </Col>
                        <Col xs={24} md={14} className="tb-pad-15 flex-column setHeight">
                            <div className="elementHeading tb-pad-20 color-white">
                                OUR COMPANIES
                            <div className="b-border width-20 t-pad-10" />
                            </div>
                            <ul className="footerElements is-cursor-ptr  flex-column flex-wrap">
                                {company_details.companies.map(company => {
                                    return (
                                        <li key={company.id} className="listItem" onClick={() => { loadPath(`/company_page/${company.channel_name}`); }}>{company.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </Col>
                    </Col>
                </div>
                <Col xs={24} className="lr-pad-15 t-pad-20 copyright is-text-center font-12 rights">{new Date().getFullYear()} All Rights Reserved, AL-HATTAB Holding Group</Col>
            </div>
        );
    }
}

Footer.propTypes = {
    company_details: PropTypes.object,
    loadPath: PropTypes.func
};
