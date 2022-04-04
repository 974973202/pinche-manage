import React, { useState, useEffect } from "react";
import { Popover, Table, Button, message, Modal } from "antd";
import { getPassengerList, getOnlineDriverList, passengerBindCar } from "../../utils/request";
import TablleCompoent from "../../components/Table";
import Search from "../../components/Search";
import moment from "moment";

function pad2(n: any) {
  return n < 10 ? "0" + n : n;
}

function generateTimeReqestNumber(time: any) {
  var date = new Date(time);
  return (
    date.getFullYear().toString() + "-" +
    pad2(date.getMonth() + 1) + "-" +
    pad2(date.getDate()) + " " + 
    pad2(date.getHours()) + ":" +
    pad2(date.getMinutes())
    // pad2(date.getSeconds())
  );
}

function Passenger() {
  const [list, setList] = useState([]); // 乘客列表
  const [loading, setLoading] = useState(true);
  const [carLoading, setcarLoading] = useState(true); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [CarList, setCarList] = useState([]); // 车主列表
  const [curPas, setCurPas] = useState<any>({}); // 当前待分配乘客列表


  const getListData = async (params: {} | undefined) => {
    const data = await getPassengerList(params);
    console.log(data);
    setLoading(false);
    setList(data);
  };

  const getOnlineDriver = async (params: {}) => {
    setCurPas(params) // 当前待分配乘客列表
    const { data } = await getOnlineDriverList(params);
    if (data.length > 0) {
      setCarList(data)
      setIsModalVisible(true)
      setcarLoading(false)
    } else {
      message.error("暂无当天出行这条路线的车主");
    }
    // setLoading(false);
    // setList(data);
  };

  async function bindPassenger(params:any) {
    const { peopleNumber = 0, userInfo, _id, _openid, exactDate, startLocation, endLocation } = curPas;
    if(params.peopleNumber > peopleNumber) {
      // 修改车主数据: 乘客信息userInfo 剩余人数peopleNumber，车主发布信息id
      // 修改乘客数据：车主信息params.userInfo, 乘客发布信息id
      const data = {
        popenid: _openid,
        puserInfo: userInfo,
        pid: _id,
        exactDate: generateTimeReqestNumber(exactDate),
        startLocation: startLocation.name.slice(0, 20),
        endLocation: endLocation.name.slice(0, 20),

        peopleNumber: params.peopleNumber - peopleNumber,
        cid: params._id,
        cuserInfo: params.userInfo,
        copenid: params._openid,
      }
      const res = await passengerBindCar(data)
      if (res[0].errmsg === 'ok' && res[1].errmsg === 'ok') {
        message.error(`司机${params.userInfo.name}分配成功`)
        setIsModalVisible(false);
        setCarList([]);
        getListData({
          start: 0,
          count: 10,
        });
      }
    } else {
      message.error('司机剩余座位不足')
    }
  };

  const columns = [
    {
      title: "乘客姓名",
      dataIndex: "userInfo",
      key: "userInfo",
      align: "center",
      render: (text: any) => {
        const name = text.name;
        return <div>{name}</div>;
      },
    },
    {
      title: "手机号",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "乘车人数",
      dataIndex: "peopleNumber",
      key: "peopleNumber",
      align: "center",
    },
    {
      title: "出行时间",
      dataIndex: "exactDate",
      key: "exactDate",
      align: "center",
      render: (text: string) => (
        <div>{moment(text).format("YYYY-MM-DD HH:mm")}</div>
      ),
    },
    {
      title: "出行起始",
      dataIndex: "startRegion",
      key: "startRegion",
      align: "center",
    },
    {
      title: "出行目的",
      dataIndex: "endRegion",
      key: "endRegion",
      align: "center",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text: any, record: any) => (
        <>
          {text === 0
            ? "匹配中"
            : text === 1
            ? "已取消"
            : text === 2
            ? "已删除"
            : text === 3
            ? "订单完成"
            : "匹配成功"}
        </>
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
            disabled={record.status !== 0}
            onClick={() => getOnlineDriver(record)}
            size='small'
            style={{ marginLeft: "10px" }}
          >
            查找车主
          </Button>
          {(record.status === 4|| record.status === 3)&& <Popover trigger="click" content={
            <>
              <div>姓名：{record?.carInfo && record?.carInfo[0]?.name}</div>
              <div>手机号：{record?.carInfo && record?.carInfo[0]?.phone}</div>
            </>
          }>
            <Button
              size='small'
              style={{ marginLeft: "10px" }}
            >
              车主信息
            </Button>
          </Popover>}
          
        </>
      ),
    },
  ];

  const CarColumns = [
    {
      title: "车主姓名",
      dataIndex: "userInfo",
      key: "userInfo",
      render: (text: any) => {
        const name = text.name;
        return <div>{name}</div>;
      },
    },
    {
      title: "手机号",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "剩余座位",
      dataIndex: "peopleNumber",
      key: "peopleNumber",
    },
    {
      title: "出行时间",
      dataIndex: "exactDate",
      key: "exactDate",
      render: (text: string) => (
        <div>{moment(text).format("YYYY-MM-DD HH:mm")}</div>
      ),
    },
    {
      title: "出行起始",
      dataIndex: "startRegion",
      key: "startRegion",
    },
    {
      title: "出行目的",
      dataIndex: "endRegion",
      key: "endRegion",
    },
    {
      title: "操作",
      dataIndex: "actions",
      key: "actions",
      render: (text: any, record: any) => (
        <>
          <Button
            onClick={() => bindPassenger(record)}
            size='small'
          >
            分配
          </Button>
        </>
      ),
    },
  ]

  function handleStandardTableChange(pagination: any) {
    getListData({
      start: (pagination.pn - 1) * 10,
      count: pagination.total,
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
      <Search getListData={getListData}/>
      <TablleCompoent
        columns={columns}
        rowKey={(record: { _id: any }) => record._id}
        data={list}
        loading={loading}
        onChange={() => handleStandardTableChange(list)}
        style={{ minHeight: 500 }}
        size='middle'
      />
      <Modal width='80%' maskClosable={false} onCancel={()=>{setIsModalVisible(false);setCarList([])}} footer={null} title='车主信息' visible={isModalVisible}>
        <Table
          columns={CarColumns}
          rowKey={(record: { _id: any }) => record._id}
          dataSource={CarList}
          loading={carLoading}
          size='small'
        />
      </Modal>
    </>
  );
}

export default Passenger;
