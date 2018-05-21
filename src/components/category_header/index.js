import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class CategoryHeader extends Component {
    render() {
        const {mobile_view, title, tabs, onClickFn } = this.props;

        return (
            <div className={`full-flex categoryHeader tb-pad-50 flex-wrap ${mobile_view ? 'flex-column' : 'flex-row flex-jsb flex-ac'}`}>
                <div className={`mainHeading ${mobile_view ? 'font-sm' : ''}`}>
                    <div className="mainTitle">{title}</div>
                    <div className="purple-bottom-border" />
                </div>

                <div className={`l-pad-20 t-pad-30 flex-wrap flex-row flex-ac category_elements ${mobile_view ? 'font-xs' : ''}`}>
                    {tabs && tabs.length > 0 && tabs.map((tab, index)=> {
                        return (
                            <div key={index} className={`lr-pad-10 is-uppercase is-cursor-ptr tab lr-mrgn-5 ${tab.active ? 'active' : ''}`} onClick={() => { onClickFn(tab); }}>{tab.title}</div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

CategoryHeader.propTypes = {
    title: PropTypes.string,
    tabs: PropTypes.array,
    onClickFn: PropTypes.func,
    mobile_view: PropTypes.bool,
    page_details: PropTypes.object
};

