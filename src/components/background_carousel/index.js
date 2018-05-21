import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Carousel } from 'antd';

import './index.scss';

export default class CarousalSection extends Component {
    render() {
        let { company_details, type } = this.props;
        return (
            <Col xs={24} className="full-flex CarousalSectionContainer is-relative">
                <Col xs={22} md={12} lg={10} className="flex-column color-white is-absolute contentContainer">
                    <div className="flex-row flex-ac content">
                        {type === 'sub' && company_details.logo &&
                            <Col xs={14} sm={12} md={10} lg={8} className="flex-row flex-center">
                                <img className="logo" src={company_details.logo} alt="" />
                            </Col>
                        }
                        <div className="text full-flex flex-column flex-jsb pad-20">
                            <span className="elementHeading font-28 is-font-bolder color-white">{company_details.tagline}</span>
                            <span className="elementText full-flex font-md tb-pad-20">{company_details.description}</span>
                            {type !== 'sub' && 
                                <div className="buttonContainer">
                                    <Button className="bg-transparent is-font-bold lr-pad-20 tb-pad-10">KNOW MORE</Button>
                                </div>
                            }
                        </div>
                    </div>
                </Col>

                <Carousel autoplay>
                    {company_details.company_sliders.map((company_slider, index) => {
                        return (
                            <div className="full-flex flex-column carouselContainer" key={index}>
                                <div className="flex-column coverImage flex-jsa" style={{ backgroundImage: "url(" + company_slider.background_image + ")" }}
                                >&nbsp;</div>
                            </div>
                        );
                    })}
                </Carousel>
            </Col>
        );
    }
}

CarousalSection.propTypes = {
    type: PropTypes.string,
    company_details: PropTypes.object
};
