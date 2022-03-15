import React, {Component} from 'react';
import {Form, InputNumber, Button} from 'antd';

class SatSettingForm extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 11 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item>

                </Form.Item>
            </Form>
        );
    }
}

const SatSetting = Form.create({name: 'satellite-setting'})(SatSettingForm)
export default SatSetting;