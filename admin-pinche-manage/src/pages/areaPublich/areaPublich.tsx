import React, { useEffect, useState } from "react";
import { Button, Tag, message, Modal, Card } from "antd";
import { getRequest, postRequest } from "../../utils/requestApi";
import TablleCompoent from "../../components/Table";
import { List, Typography, Divider } from "antd";

function AreaPublich() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>({
    province: localStorage.getItem("province"),
    city: localStorage.getItem("city"),
    antd: localStorage.getItem("antd"),
    isAuth: localStorage.getItem("isAuth") || "",
  });
  const [region, serRegion] = useState("");

  useEffect(() => {
    let region = "root";
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
      count: 10,
    });
    serRegion(region);
  }, []);

  const getListData = async (params: {} | undefined) => {
    const { data } = await getRequest("/peopleManager/list", params);
    setLoading(false);
    setList(data);
  };

  return (
    <Card>
      {region === "root"
        ? Object.entries(list).map((data: [any, any[]], index) => {
            return (
              <div key={index}>
                <Divider orientation='left'>{data[0]}区域</Divider>
                <List
                  bordered
                  dataSource={data[1] || []}
                  renderItem={(item) => (
                    <List.Item
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Typography.Text mark>
                        车主：{item.name}手机号：{item.phone}
                      </Typography.Text>
                      行程：{item.location}/日期：{item.dateIndex}
                    </List.Item>
                  )}
                />
              </div>
            );
          })
        : Object.entries(list).map((data: [any, any[]], index) => {
            return (
              <div key={index}>
                {data[0].includes(region) ? (
                  <>
                    <Divider orientation='left'>{data[0]}区域</Divider>
                    <List
                      bordered
                      dataSource={data[1] || []}
                      renderItem={(item) => (
                        <List.Item
                          style={{
                            display: "flex",
                            justifyContent: "left",
                            alignItems: "center",
                          }}
                        >
                          <Typography.Text mark>
                            车主：{item.name}手机号：{item.phone}
                          </Typography.Text>
                          行程：{item.location}/日期：{item.dateIndex}
                        </List.Item>
                      )}
                    />
                  </>
                ) : null}
              </div>
            );
          })}
    </Card>
  );
}

export default AreaPublich;
