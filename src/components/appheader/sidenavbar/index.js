import React, { Component } from 'react';
import { slide as Sidebar } from 'react-burger-menu';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from 'antd';

import './index.scss';

export default class SideNavbar extends Component {
    loadPath = (navItem) => {
        this.props.actions.loadPath(navItem);
    }

    render() {
        const { page_details, nav_items } = this.props;
        return (
            <div className="sideNavbarContainer">
                <Sidebar right customBurgerIcon={
                    <span><Icon type="bars" /></span>
                }>
                    <div className="is-relative sideBarContent">
                        <ul className="menulist">
                            {nav_items.map(navItem => {
                                return (
                                    <div key={navItem.key} className={classNames("flex-row flex-center link is-cursor-ptr", { "active": page_details.current_page === navItem.page })} onClick={() => this.loadPath(navItem.path)}>{navItem.title}
                                    </div>
                                );
                            })}
                        </ul>
                    </div>
                </Sidebar>
            </div>
        );
    }
}

SideNavbar.propTypes = {
    logged_in: PropTypes.bool,
    page_details: PropTypes.object,
    nav_items: PropTypes.array,
    actions: PropTypes.object
};
