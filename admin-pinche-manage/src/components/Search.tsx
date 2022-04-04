import { Row, Col, Cascader, Select, Card, Button } from "antd";
import { antdOptions } from "@heerey525/china-division-data";
import { useState } from "react";

const { Option } = Select;

interface State {
  startRegion?: [],
  endRegion?: [],
  status?: number | string,
}

export default function Search(props: any) {
  const [params, setParams] = useState<State>({})
  const { getListData } = props;
  function onChange(e: Event, n: string) {
    setParams({...params, [n]: e === undefined ? '' : e})
  }

  function handleSearch() {
    getListData({
      ...params,
      start: 0,
      count: 10,
    })
  }

  return (
    <Card >
    <Row gutter={16}>
      <Col span={6}>
        <Cascader
          options={antdOptions}
          onChange={(e: any) => onChange(e, "startRegion")}
          placeholder='请选择起始点'
        />
      </Col>
      <Col span={6}>
        <Cascader
          disabled={!params.startRegion}
          options={antdOptions}
          onChange={(e: any) => onChange(e, "endRegion")}
          placeholder='请选择目的地'
        />
      </Col>
      <Col span={6}>
        状态：
        <Select
          defaultValue=''
          style={{ width: 120 }}
          onChange={(e: any) => onChange(e, "status")}
        >
          <Option value={''}>全部</Option>
          <Option value={0}>匹配中</Option>
          <Option value={1}>已取消</Option>
          <Option value={2}>已删除</Option>
          <Option value={3}>订单完成</Option>
          <Option value={4}>匹配成功</Option>
        </Select>
      </Col>
      <Col span={6}>
        <Button type="primary" onClick={handleSearch}>查询</Button>
      </Col>
    </Row>
    </Card>
  );
}
