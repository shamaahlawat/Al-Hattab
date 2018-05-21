import React, { Component } from 'react';
import { Col } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

export default class PageHeader extends Component {
    render() {
        const { image } = this.props;
        return (
            <Col xs={24} className="full-flex flex-column flex-jfe pageHeader" style={{ backgroundImage: `url(${image})` }} />
        );
    }
}

PageHeader.propTypes = {
    actions: PropTypes.object,
    title: PropTypes.object,
    image: PropTypes.string,
};

