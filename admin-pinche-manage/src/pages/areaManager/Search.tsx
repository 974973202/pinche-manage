import React, { useState } from "react";
import { Form, Row, Col, Input, Button, Select, Card, message } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const { Option } = Select;

interface State {
  startRegion?: [];
  endRegion?: [];
  status?: number | string;
}

export default function Search(props: any) {
  const [params, setParams] = useState<State>({});
  const [form] = Form.useForm();

  const { getListData } = props;
  // function onChange(e: Event, n: string) {
  //   setParams({ ...params, [n]: e === undefined ? "" : e });
  //   console.log(e, n);
  // }

  function onFinish() {
    form.validateFields().then(async (values: any) => {
      const {data: { errcode }} = await getListData({
        ...values,
        start: 0,
        count: 10,
      })
       if(errcode ===0) {
        //  getListData({
        //    start: 0,
        //    count: 10,
        //  });
         message.success('查询成功')
       } else{
         message.success('查询失败')
       }
     })
  }

  return (
    <Card>
      <Form
        form={form}
        name='advanced_search'
        className='ant-advanced-search-form'
        onFinish={onFinish}
      >
        <Row>
          {/* <Col span={8}>
            <Form.Item
              name={`name`}
              label={`姓名`}
            >
              <Input />
            </Form.Item>
          </Col> */}
          <Col span={8}>
            <Form.Item
              name={`phone`}
              label={`手机号`}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type='primary' htmlType='submit'>
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
