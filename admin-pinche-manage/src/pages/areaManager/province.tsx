import React, { useEffect, useState } from "react";
import {
  Button,
  Tag,
  message,
  Modal,
  Card,
  Table,
  Select,
  Cascader,
  Form,
  Input,
} from "antd";
import { getProvinceList, updateProvinceList } from "../../utils/request";
import TablleCompoent from "../../components/Table";
import Search from "./Search";
import {
  antdOptions,
  cityData,
  provinceData,
} from "@heerey525/china-division-data";
import { useCityData } from "../../utils/utils";

const { Option } = Select;

const { useForm } = Form;

function Province() {
  const [form] = useForm();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [treeData] = useCityData(cityData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editData, setEditData] = useState();
  const [userInfo, setUserInfo] = useState<any>({
    province: localStorage.getItem("province"),
    city: localStorage.getItem("city"),
    antd: localStorage.getItem("antd"),
    isAuth: localStorage.getItem("isAuth") || "",
  });

  useEffect(() => {
    let region = "";
    const { province, city, antd } = userInfo;
    if (antd) {
      region = antd.toString();
    }
    if (city) {
      region = city.toString();
    }
    if (province) {
      region = province.toString();
    }
    getListData({
      start: 0,
      region,
      count: 10,
    });
  }, []);

  const getListData = async (params: {} | undefined) => {
    const {data} = await getProvinceList(params);
    console.log(data, 'dddd');
    setLoading(false);
    setList(data);
  };


  const onChange = (e: Event, type: string) => {
    console.log(e, type);
  };

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "密码",
      dataIndex: "pwd",
      key: "pwd",
      align: "center",
    },
    {
      title: "省域",
      dataIndex: "province",
      key: "province",
      align: "center",
    },
    {
      title: "市区",
      dataIndex: "city",
      key: "city",
      align: "center",
    },
    {
      title: "县/区",
      dataIndex: "antd",
      key: "antd",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: (text: any, record: any) => (
        <>
          <Button
            onClick={() => {
              console.log(record, "record");
              form.setFieldsValue({ ...record });
              setIsModalVisible(true);
            }}
            size='small'
            style={{ marginLeft: "10px" }}
          >
            编辑
          </Button>
        </>
      ),
    },
  ];

  function handleStandardTableChange(pagination: any) {
    getListData({
      start: (pagination.current - 1) * 10,
      count: pagination.pageSize,
    });
  }

  return (
    <Card>
      <Search getListData={getListData} />
      <TablleCompoent
        columns={columns}
        rowKey={(record: { _id: any }) => record._id}
        data={list}
        loading={loading}
        onChange={() => handleStandardTableChange(list)}
        style={{ minHeight: 500 }}
        size='middle'
      />
      <Modal
        width='80%'
        maskClosable={false}
        onCancel={() => {
          form.resetFields()
          setIsModalVisible(false);
        }}
        footer={null}
        title='编辑区域负责人'
        visible={isModalVisible}
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={() =>
            form.validateFields().then(async (values: any) => {
             const {data: { errcode }} = await updateProvinceList(values)
              if(errcode ===0) {
                getListData({
                  start: 0,
                  count: 10,
                });
                form.resetFields()
                setIsModalVisible(false);
                message.success('修改成功')
              } else{
                message.success('修改失败')
              }
            })
          }
          autoComplete='off'
        >
          <Form.Item label='_id' name='_id'>
            <Input disabled />
          </Form.Item>
          <Form.Item label='手机号' name='phone'>
            <Input disabled />
          </Form.Item>
          <Form.Item label='姓名' name='name'>
            <Input disabled />
          </Form.Item>
          <Form.Item
            label='密码'
            name='pwd'
            rules={[
              { required: true, message: "请输入设置密码" },
              { min: 6, max: 18, message: "密码位数最少6位，最多18位" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label='省域' name='province'>
            <Select
              // defaultValue={text}
              style={{ width: 300 }}
              onChange={(e: any) => onChange(e, "province")}
            >
              <Option value={""}>无</Option>
              {provinceData.map((ele: any) => {
                return (
                  <Option key={ele.id} value={ele.name}>
                    {ele.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item name='city' label='市区'>
            <Cascader
              // defaultValue={text}
              // value={text}
              options={treeData}
              onChange={(e: any) => onChange(e, "city")}
              placeholder='选择负责市区'
              style={{ width: 300 }}
            />
          </Form.Item>

          <Form.Item name='antd' label='县/区'>
            <Cascader
              // defaultValue={text}
              // value={text}
              options={antdOptions}
              onChange={(e: any) => onChange(e, "antd")}
              placeholder='选择负责市区'
              style={{ width: 300 }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default Province;
