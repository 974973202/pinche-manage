import React, { useEffect, useState } from "react";
import { Button, Tag, message, Modal, Card } from "antd";
import { getRequest, postRequest } from "../../utils/requestApi";
import TablleCompoent from "../../components/Table";
import { List, Typography, Divider } from "antd";

function PeopleManager() {
  const [list, setList] = useState<any[]>([]);
  const [modalData, setModalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({
    province: localStorage.getItem("province"),
    city: localStorage.getItem("city"),
    antd: localStorage.getItem("antd"),
    isAuth: localStorage.getItem("isAuth") || "",
  });
  const [region, setRegion] = useState<string>('');
  const [openid, setOpenid] = useState<string>('');


  useEffect(() => {
    let region = "root";
    const { province, city, antd } = userInfo;
    if (antd) {
      region = antd;
    }
    if (city) {
      region = city;
    }
    if (province) {
      region = province;
    }
    setRegion(region)
    getListData({
      start: 0,
      region,
      count: 10,
    });
  }, []);

  const getListData = async (params: {} | undefined) => {
    const { data } = await getRequest("/areaPublich/list", params);
    setLoading(false);
    setList(data);
  };

  if (userInfo.isAuth === "root") {
  }

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
      title: "注册区域",
      dataIndex: "realRegion",
      key: "realRegion",
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
            onClick={() => handleModal(record._openid)}
            size='small'
            style={{ marginLeft: "10px" }}
          >
            查看订单
          </Button>
        </>
      ),
    },
  ];

  const handleModal = async (_openid: string) => {
    setOpenid(_openid)
    const options = {
      _openid: _openid,
      start: 0,
      count: 10,
    }
    const { data } = await postRequest("/areaPublich/detail", options);
    setModalShow(true);
    setModalData(data)
  };

  function handleStandardTableChange(pagination: any) {
    getListData({
      start: (pagination.pn - 1) * 10,
      region,
      count: pagination.total,
    });
  }

  async function handleModalTableChange(pagination: any) {
    const { data } = await postRequest("/areaPublich/detail", {
      _openid: openid,
      start: (pagination.pn - 1) * 10,
      region,
      count: pagination.total,
    });
    setModalData(data)
  }

  return (
    <Card>
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
          setModalShow(false);
        }}
        footer={null}
        title='订单详情'
        visible={modalShow}
      >
        <TablleCompoent
          columns={[
            {title: '车主姓名', dataIndex: "name", key: "name"},
            {title: '手机号', dataIndex: "phone", key: "phone"},
            {title: '行程信息', dataIndex: "location", key: "location"},
            {title: '日期', dataIndex: "dateIndex", key: "dateIndex"},
          ]}
          rowKey={(record: { _id: any }) => record._id}
          data={modalData}
          onChange={() => handleModalTableChange(modalData)}
          style={{ minHeight: 500 }}
          size='middle'
        />
        {/* <List
          // bordered
          dataSource={modalData}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>
                车主：{item.name}手机号：{item.phone}
              </Typography.Text>
              行程：{item.location}/日期：{item.dateIndex}
            </List.Item>
          )}
        /> */}
      </Modal>
    </Card>
  );
}

export default PeopleManager;
