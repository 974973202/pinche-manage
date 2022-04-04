import React, { useState, useEffect } from "react";
import { Cascader, Card, Button, message } from "antd";
import { getWayInfoList, updateWayInfoList } from "../../utils/request";
import {
  antdOptions,
  cityData,
  provinceData,
} from "@heerey525/china-division-data";
import { PlusCircleOutlined, FormOutlined } from "@ant-design/icons";

interface wayInfoObj {
  startRegion?: Array<string>;
  endRegion?: [];
}

function WayRemmend() {
  const [wayInfo, setWayInfo] = useState<Array<wayInfoObj>>([]);
  const [type, setType] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>({
    province: localStorage.getItem("province"),
    city: localStorage.getItem("city"),
    antd: localStorage.getItem("antd"),
    isAuth: localStorage.getItem("isAuth") || '',
  });

  const getListData = async (params: any) => {
    const {data = []} = await getWayInfoList(params);
    if(data.length > 0) {
      setWayInfo(data);
    }
  };

  useEffect(() => {
    const { province, city, antd, isAuth } = userInfo;
    let params: any = {
      type: isAuth,
      root: 'root'
    }
    setType(isAuth)
    if(antd) { params = {antd: antd, type: 'antd'}; setType(antd); }
    if(city) { params = {city: city, type: 'city'}; setType(city); }
    if(province) { params = {province: province, type: 'province'}; setType(province); }
    getListData(params);
  }, []);

  function onChange(e: any, i: number, type: string) {
    wayInfo.forEach((ele, index) => {
      if (i == index) {
        if (type === "startRegion") ele.startRegion = e;
        if (type === "endRegion") ele.endRegion = e;
      }
    });
    setWayInfo(wayInfo);
  }
  function onDelete(i: number) {
    const w = wayInfo.filter((ele, index) => index !== i);
    setWayInfo(w);
  }
  async function onSave() {
    const {errmsg} = await updateWayInfoList({
      [type]: wayInfo
    });
    if (errmsg === 'ok') {
      message.success('保存成功')
    } else {
      message.error(errmsg)
    }
  }
  return (
    <Card
      title={
        <>
          <Button
            onClick={() => setWayInfo([...wayInfo, {}])}
            type='primary'
            icon={<PlusCircleOutlined />}
          >
            添加
          </Button>
          <Button
            style={{ marginLeft: 20 }}
            type='primary'
            icon={<FormOutlined />}
            onClick={onSave}
          >
            保存
          </Button>
        </>
      }
      bordered={false}
      style={{ width: "100%" }}
    >
      {wayInfo.map((ele, index) => {
        return (
          <div style={{ marginBottom: 18 }} key={index}>
            起始点：
            <Cascader
              defaultValue={ele.startRegion}
              value={ele.startRegion}
              options={antdOptions}
              onChange={(e: any) => onChange(e, index, "startRegion")}
              placeholder='请选择起始点'
              style={{ width: 300 }}
            />{" "}
            {"————>"}
            目的地：
            <Cascader
              defaultValue={ele.endRegion}
              value={ele.endRegion}
              options={antdOptions}
              onChange={(e: any) => onChange(e, index, "endRegion")}
              placeholder='请选择目的地'
              style={{ width: 300 }}
            />
            <Button
              onClick={() => onDelete(index)}
              style={{ marginLeft: 30 }}
              danger
              type='primary'
            >
              删除
            </Button>
          </div>
        );
      })}
    </Card>
  );
}

export default WayRemmend;
