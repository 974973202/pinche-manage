import React, { useEffect, useState } from "react";
import { Button, Tag, message, Modal } from "antd";
import { getCarList, updateCarList, delCarList } from "../../utils/request";
import TablleCompoent from "../../components/Table";

function OwnerCertification() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState({
    show: false,
    url: "",
  });
  const [userInfo, setUserInfo] = useState<any>({
    province: localStorage.getItem("province"),
    city: localStorage.getItem("city"),
    antd: localStorage.getItem("antd"),
    isAuth: localStorage.getItem("isAuth") || "",
  });
  const [region, setRegion] = useState('')

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
    setRegion(region)
    getListData({
      start: 0,
      region,
      count: 10,
    });
  }, []);

  const getListData = async (params: {} | undefined) => {
    const data = await getCarList(params);
    setLoading(false);
    setList(data);
  };

  async function handleUpdate(record: any, driveStatus: number) {
    setLoading(true);
    await updateCarList({
      _id: record._id,
      driveStatus: driveStatus,
    });
    getListData({
      start: 0,
      region,
      count: 10,
    });
  }

  const handleDelete = async(id: number) => {
    await delCarList(id);
    await getListData({
      start: 0,
      region,
      count: 10,
    });
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
      width: 150,
      // ellipsis: true,
      align: "center",
    },
    {
      title: "个人照片",
      dataIndex: "photo",
      key: "photo",
      align: "center",
      render: (text: string) => (
        <img
          onClick={() => setShowModal({ show: true, url: text })}
          style={{ height: 100 }}
          src={text}
          alt='个人照片'
        />
      ),
    },
    {
      title: "驾驶证正面照",
      dataIndex: "zmJszImage",
      key: "zmJszImage",
      align: "center",
      render: (text: string) => (
        <img
          onClick={() => setShowModal({ show: true, url: text })}
          style={{ height: 100 }}
          src={text}
          alt=''
        />
      ),
    },
    {
      title: "驾驶证反面照",
      dataIndex: "fmJszImage",
      key: "fmJszImage",
      align: "center",
      render: (text: string) => (
        <img
          onClick={() => setShowModal({ show: true, url: text })}
          style={{ height: 100 }}
          src={text}
          alt=''
        />
      ),
    },
    {
      title: "行驶证正面照",
      dataIndex: "zmXszImage",
      key: "zmXszImage",
      align: "center",
      render: (text: string) => (
        <img
          onClick={() => setShowModal({ show: true, url: text })}
          style={{ height: 100 }}
          src={text}
          alt=''
        />
      ),
    },
    {
      title: "行驶证反面照",
      dataIndex: "fmXszImage",
      key: "fmXszImage",
      align: "center",
      render: (text: string) => (
        <img
          onClick={() => setShowModal({ show: true, url: text })}
          style={{ height: 100 }}
          src={text}
          alt=''
        />
      ),
    },
    {
      title: "状态",
      dataIndex: "driveStatus",
      key: "driveStatus",
      align: "center",
      render: (text: string | number) => (
        <Tag color='#2db7f5'>
          {
            // eslint-disable-next-line eqeqeq
            text == 0 ? "审核中" : text == 1 ? "审核通过" : text == 2 ? "审核不通过" : '账号被封'
          }
        </Tag>
      ),
    },
    {
      title: "操作",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: (text: any, record: any) => (
        <>
          <Button
            onClick={() => handleUpdate(record, 1)}
            disabled={record.driveStatus != 0 && record.driveStatus != 3}
            size='small'
            style={{ marginLeft: "10px" }}
          >
            通过
          </Button>
          <Button
            onClick={() => handleUpdate(record, 2)}
            disabled={record.driveStatus != 0 && record.driveStatus != 3}
            size='small'
            style={{ marginLeft: "10px" }}
          >
            不通过
          </Button>
          <Button
            onClick={() => handleUpdate(record, 3)}
            disabled={record.driveStatus != 1}
            size='small'
            style={{ marginLeft: "10px" }}
            danger
          >
            封号
          </Button>
          <Button
            onClick={() => handleDelete(record._id)}
            size='small'
            style={{ marginLeft: "10px" }}
            danger
            ghost
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  function handleStandardTableChange(pagination: any) {
    getListData({
      start: (pagination.pn - 1) * 10,
      region,
      count: pagination.total,
    });
  }

  

  return (
    <>
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
          setShowModal({
            show: false,
            url: "",
          });
        }}
        title="信息展示"
        footer={null}
        visible={showModal.show}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src={showModal.url}
          alt=''
        />
      </Modal>
    </>
  );
}

export default OwnerCertification;
