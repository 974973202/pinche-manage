import React from 'react';
import { Menu } from 'antd';
import Icon from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom';

const SideMenu: React.FunctionComponent<any> = (props) => {
	const location = useLocation()
	return (
		<Menu theme="dark" mode="inline" selectedKeys={[ location.pathname ]}>
			<Menu.Item key="/">
				<Link to="/">
					<Icon type="user" />
					<span>首页 </span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/certification">
				<Link to="/certification">
					<Icon type="user" />
					<span>实名认证 </span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/ownerCertification">
				<Link to="/ownerCertification">
					<Icon type="user" />
					<span>车主认证 </span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/wayRemmend">
				<Link to="/wayRemmend">
					<Icon type="user" />
					<span>路线推荐 </span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/passenger">
				<Link to="/passenger">
					<Icon type="user" />
					<span>乘客预约 </span>
				</Link>
			</Menu.Item>
		</Menu>
	);
};

export default SideMenu;
