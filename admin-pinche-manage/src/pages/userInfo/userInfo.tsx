import { useEffect, useState } from "react";
import { Card } from "antd";
import { getRequest } from "../../utils/requestApi";
import TablleCompoent from "../../components/Table";

function UserInfo() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListData({
      start: 0,
      count: 10,
    });
  }, []);

  const getListData = async (params: {} | undefined) => {
    const { data } = await getRequest("/userInfo/list", params);
    setLoading(false);
    setList(data);
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
      title: "注册区域",
      dataIndex: "realRegion",
      key: "realRegion",
      align: "center",
    },
  ];

  function handleStandardTableChange(pagination: any) {
    getListData({
      start: (pagination.pn - 1) * 10,
      count: pagination.total,
    });
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
    </Card>
  );
}

export default UserInfo;
