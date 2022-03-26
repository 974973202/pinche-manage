import React from 'react';
import { Layout } from 'antd';
import {UserOutlined} from '@ant-design/icons'
import './LayoutMaster.css';
import SideMenu from './SideMenu';
import { Outlet, useNavigate } from "react-router-dom";


const LayoutMaster: React.FunctionComponent = () => {
  const navigate = useNavigate();

	const [ collapsed, setCollapsed ] = React.useState(false);
	const { Header, Sider, Footer } = Layout;
	return (
		<Layout className="components-layout-demo-custom-trigger" style={{ minHeight: '100vh' }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="logo" >拼车小程序管理后台</div>
				<SideMenu />
			</Sider>
			<Layout>
				<Header style={{ background: '#fff', padding: 0 }}>
					<UserOutlined 
						className="trigger"
						// type={collapsed ? 'menu-unfold' : 'menu-fold'}
						// onClick={() => setCollapsed(!collapsed)}
					/>
					{localStorage.getItem("phone") || '未识别用户'}
					<span style={{marginLeft: 20}} onClick={() => {
						localStorage.removeItem("token");
						localStorage.removeItem("phone");
						localStorage.removeItem("province");
						localStorage.removeItem("city");
						localStorage.removeItem("antd");
						navigate("/");
					}}>退出登陆</span>

				</Header>
				<div style={{minHeight: 500}}>
					<Outlet/>

				</div>
				<Footer style={{ textAlign: 'center' }}>拼车小程序管理后台</Footer>
			</Layout>
		</Layout>
	);
};

export default LayoutMaster;