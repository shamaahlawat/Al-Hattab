import React, { Component } from 'react';
import { Col, Tooltip, Modal } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

export default class ImageGrid extends Component {
    constructor() {
        super();
        this.state = {
            show_modal: false,
            current_media: undefined
        };
    }

    showMedia = (current_media) => {
        this.setState({
            show_modal: true,
            current_media
        });
    }

    closeMedia = () => {
        if (this.videoRef) {
            this.videoRef.pause();
        }

        this.setState({
            show_modal: false,
            current_media: undefined
        });
    }

    render() {
        const { images, view } = this.props;
        const { show_modal, current_media } = this.state;

        const columns = (view === 'xs') ? 1 : (view === 'sm') ? 2 : (view === 'md') ? 3 : 4;
        let arr_size = Math.ceil(images.length / columns);
        const img_grid = images.reduce((grid, value, index) => {
            if (index % arr_size == 0 && index !== 0) {
                grid.push([]);
            }
            grid[grid.length - 1].push(value);
            return grid;
        }, [[]]);

        return (
            <Col xs={24} className="full-flex flex-row imageGrid">
                {img_grid.map((grid, col_index) => {
                    return (
                        <div key={col_index} className="imageColumn full-flex flex-column">
                            {grid.map((image) => {
                                return (
                                    <Tooltip key={image.id} title={image.description}>
                                        <img className="mrgn-10 image is-cursor-ptr" onClick={() => { this.showMedia(image); }} src={image.type === 'image' ? image.url : image.thumb} />
                                    </Tooltip>
                                );
                            })}
                        </div>
                    );
                })}
                <Modal wrapClassName="vertical-center-modal" visible={show_modal} onCancel={() => this.closeMedia()} footer={null}>
                    <div className="full-flex modal-content">
                        {current_media &&
                            <div className="mediaContainer flex-column flex-center flex-wrap">
                                <div className="full-flex imageContainer">
                                    {current_media.type === 'image' && <img src={current_media.url} alt="" />}
                                    {current_media.type === 'video' &&
                                        <video preload="metadata" controls autoPlay ref={ref => this.videoRef = ref}>
                                            <source src={`${current_media.url}#t=0.1`} />
                                        </video>
                                    }
                                </div>
                                <Col xs={24} className="tb-pad-10 font-md word-wrap description">{current_media.description}</Col>
                            </div>
                        }
                    </div>
                </Modal>
            </Col>
        );
    }
}

ImageGrid.propTypes = {
    images: PropTypes.array.isRequired,
    view: PropTypes.string
};

