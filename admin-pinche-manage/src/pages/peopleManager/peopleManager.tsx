import React, { useEffect, useState } from "react";
import { Button, Tag, message, Modal, Card } from "antd";
import { getRequest, postRequest } from "../../utils/requestApi";
import TablleCompoent from "../../components/Table";
import { List, Typography, Divider } from "antd";


function Province() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>({
    province: localStorage.getItem("province"),
    city: localStorage.getItem("city"),
    antd: localStorage.getItem("antd"),
    isAuth: localStorage.getItem("isAuth") || "",
  });

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
    getListData({
      start: 0,
      region,
      count: 10,
    });
  }, []);

  const getListData = async (params: {} | undefined) => {
    const { data } = await getRequest("/peopleManager/list", params);
    console.log(data,'data')
    setLoading(false);
    setList([data]);
  };


  return (
    <Card>
      <Divider orientation="left">
        {userInfo.province || userInfo.city || userInfo.antd || '全国'}区域
      </Divider>
      {
        Object.entries(list).map((key, value) => {
          <>
          <div>{JSON.stringify(key)}
            </div>
            <div>

          {JSON.stringify(value)}

            </div>
            {/* <Divider orientation="left">
              {userInfo.province || userInfo.city || userInfo.antd || '全国'}区域
            </Divider>
            <List
              // bordered
              dataSource={list}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text mark>
                    车主：{item.name}手机号：{item.phone}
                  </Typography.Text>
                  行程：{item.location}/日期：{item.dateIndex}
                </List.Item>
              )}
            /> */}
          </>
        })
      }
    </Card>
  );
}

export default Province;
