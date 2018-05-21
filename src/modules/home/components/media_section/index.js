import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';

import './index.scss';

export default class MediaSection extends Component {
    render() {
        const { medias, className } = this.props;
        return (
            <Col xs={{ span: 20, offset: 2 }} md={{ span: 22, offset: 1 }} className={`tb-pad-50 mediaContainer ${ className }`}>
                <Row gutter={16}>
                    {medias.map(media => {
                        return (
                            <Col key={media.id} xs={24} sm={12} md={8}>
                                <div className="bg-white cardContent mrgn-10">
                                    <div className="backgroundImage" style={{ backgroundImage: `url(${media.image})`}}/>
                                    <div className="flex-column flex-jsb pad-20 cardTextContainer">
                                        <div className="color-tertiary font-md is-font-bold">{media.title}</div>
                                        <div className="font-sm color-tertiary">{media.description.substring(0, 75)}</div>
                                        <div className="font-sm color-tertiary date">{media.date}</div>
                                        <div className="font-sm t-pad-10 color-primary">Read More</div>
                                    </div>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </Col>
        );
    }
}

MediaSection.propTypes = {
    medias: PropTypes.array,
    className: PropTypes.string
};
