import React, { useEffect, useState } from "react";
import { Button, Tag, message, Modal } from "antd";
import { getList, updateList } from "../../utils/request";
import TablleCompoent from "../../components/Table";

function Certification(props: any) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState({
    show: false,
    url: "",
  });

  const getListData = async (params: {} | undefined) => {
    const data = await getList(params);
    console.log(data);
    setLoading(false);
    setList(data);
  };

  async function handleUpdate(record: any, status: number) {
    setLoading(true);
    await updateList({
      _id: record._id,
      status: status,
    });
    getListData({
      start: 0,
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
      title: "身份证正面照",
      dataIndex: "zmSfzImage",
      key: "zmSfzImage",
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
      title: "身份证反面照",
      dataIndex: "fmSfzImage",
      key: "fmSfzImage",
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
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text: string | number) => (
        <Tag color='#2db7f5'>
          {
            // eslint-disable-next-line eqeqeq
            text == 0 ? "审核中" : text == 1 ? "审核通过" : "审核不通过"
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
            disabled={record.status != 0}
            size='small'
            style={{ marginLeft: "10px" }}
          >
            通过
          </Button>
          <Button
            onClick={() => handleUpdate(record, 2)}
            disabled={record.status != 0}
            size='small'
            style={{ marginLeft: "10px" }}
          >
            不通过
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

  useEffect(() => {
    getListData({
      start: 0,
      count: 10,
    });
  }, []);

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
        footer={null}
        visible={showModal.show}
      >
        <img style={{width: '100%', height: '100%'}} src={showModal.url} alt='' />
      </Modal>
    </>
  );
}

export default Certification;
