import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Input, Button } from 'antd';

import './index.scss';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ContactForm extends Component {

    componentDidMount() {
        this.props.form.validateFields();
    }

    handleInput = (event) => {
        this.props.actions.updateContactDetails(event.target.name, event.target.value);
    };

    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {
                let submit_contact_details = {
                    contact_us_info: {
                        name: this.props.contact_details.name,
                        email: this.props.contact_details.email,
                        phone: this.props.contact_details.phone,
                        message: this.props.contact_details.message,
                    },
                };
                this.props.actions.submitContactDetails(submit_contact_details);
            }
        });
        this.props.form.resetFields();
    };

    render() {
        let { contact_details } = this.props;
        const { getFieldDecorator, getFieldError, getFieldsError, isFieldTouched } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const phoneNumberError = isFieldTouched('phoneNumber') && getFieldError('phoneNumber');
        const emailIdError = isFieldTouched('emailId') && getFieldError('emailId');
        const messageError = isFieldTouched('message') && getFieldError('');

        return (
            <Col xs={{ span: 22 }} md={{ span: 18 }} className="contactFormContainer t-pad-30">
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <FormItem label="Name" validateStatus={userNameError ? "error" : ""} help={userNameError || ''}>
                        {
                            getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    type="text"
                                    required
                                    name="name"
                                    className="form-control inputfield"
                                    placeholder=""
                                    setfieldsvalue={contact_details.name}
                                    onChange={this.handleInput}
                                />
                            )
                        }
                    </FormItem>
                    <FormItem label="Email" validateStatus={emailIdError ? "error" : "null"} help={emailIdError || ''} >
                        {
                            getFieldDecorator('emailId', {
                                rules: [{ required: true, message: "Please enter your Email ID. " }, { type: "email", message: "Enter a valid Email ID" }],
                            })(
                                <Input
                                    type="email"
                                    required
                                    name="email"
                                    className="form-control inputfield"
                                    placeholder=""
                                    setfieldsvalue={contact_details.email}
                                    onChange={this.handleInput}
                                />
                            )
                        }
                    </FormItem>
                    <FormItem label="Phone No" validateStatus={phoneNumberError ? "error" : ""} help={phoneNumberError || ''}>
                        {
                            getFieldDecorator('phoneNumber', {
                                rules: [{ required: true, message: 'Please input your phone number!' }],
                            })(
                                <Input
                                    type="number"
                                    required
                                    name="phone"
                                    className="form-control inputfield"
                                    placeholder=""
                                    setfieldsvalue={contact_details.number}
                                    onChange={this.handleInput}
                                />
                            )
                        }
                    </FormItem>
                    <FormItem label="Message" validateStatus={messageError ? "error" : ""} help={messageError || ''}>
                        {
                            getFieldDecorator('messageError', {
                                rules: [{ required: true, message: 'Please enter your message' }],
                            })(
                                <textarea
                                    required
                                    rows="5"
                                    name="message"
                                    className="textarea inputfield"
                                    placeholder=""
                                    setfieldsvalue={contact_details.message}
                                    onChange={this.handleInput}
                                />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Button className="submitbutton"
                            onClick={this.submit}
                            disabled={hasErrors(getFieldsError())}>Submit
                        </Button>
                    </FormItem>
                </Form>
            </Col>
        );
    }
}

ContactForm.propTypes = {
    form: PropTypes.object,
    actions: PropTypes.object,
    handleCancel: PropTypes.func,
    contact_details: PropTypes.object,
    history: PropTypes.object
};

const ContactDetails = Form.create()(ContactForm);
export default ContactDetails;

