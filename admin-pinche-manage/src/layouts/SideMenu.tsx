import React from "react";
import { Menu } from "antd";
import {
  AlibabaOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { SubMenu } = Menu;

const MainMenu: React.FunctionComponent<any> = (props) => {
	const [ isAuth, ] = React.useState(localStorage.getItem("isAuth"));
  const location = useLocation();
  return (
    <Menu theme='dark' mode='inline' selectedKeys={[location.pathname]}>
      <Menu.Item key='/index'>
        <Link to='/index'>
          <AlibabaOutlined />
          <span>首页 </span>
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="/index/certification">
				<Link to="/index/certification">
					<Icon type="user" />
					<span>实名认证 </span>
				</Link>
			</Menu.Item> */}
      {isAuth === 'root' ? <Menu.Item key='/index/ownerCertification'>
        <Link to='/index/ownerCertification'>
          <UserOutlined />
          <span>车主认证 </span>
        </Link>
      </Menu.Item> : null}
      <Menu.Item key='/index/wayRemmend'>
        <Link to='/index/wayRemmend'>
          <ArrowRightOutlined />
          <span>路线推荐 </span>
        </Link>
      </Menu.Item>

			{isAuth === 'root' ? <Menu.Item key='/index/areaManager'>
        <Link to='/index/areaManager'>
          <UsergroupAddOutlined />
          <span>负责人 </span>
        </Link>
      </Menu.Item> : null}

      {/* <SubMenu
        key='/index/areaManager'
        icon={<UsergroupAddOutlined />}
        title='区域负责人'
      >
        <Menu.Item key='/index/areaManager/city'>
          <Link to='/index/areaManager/city'>
            <ArrowRightOutlined />
            <span>市域负责人 </span>
          </Link>
        </Menu.Item>
        <Menu.Item key='/index/areaManager/antd'>
          <Link to='/index/areaManager/antd'>
            <ArrowRightOutlined />
            <span>县/区负责人 </span>
          </Link>
        </Menu.Item>
      </SubMenu> */}
      {/* <Menu.Item key="/index/passenger">
				<Link to="/index/passenger">
					<Icon type="user" />
					<span>乘客预约 </span>
				</Link>
			</Menu.Item> */}
    </Menu>
  );
};

export default MainMenu;
