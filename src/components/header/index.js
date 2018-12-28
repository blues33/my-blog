import React, { Component } from 'react'
import { Input, Menu, Dropdown, Icon, Breadcrumb, Switch, Button, Select } from 'antd';
import { Avatar } from '../ui'
import './header.less'
import history from '../../history'
import { postApi } from "../../assets/js/axios"
import intl from 'react-intl-universal'


const menu = (
	<Menu>
		<Menu.Divider/>
		<Menu.Item key="0">
			<Switch checkedChildren="正常" unCheckedChildren="夜间" defaultChecked/>
		</Menu.Item>
		<Menu.Divider/>
		<Menu.Item key="1">
			<Breadcrumb>
				<Breadcrumb className="Item">
					<Switch checkedChildren="CH" unCheckedChildren="EN" defaultChecked/>
				</Breadcrumb>
			</Breadcrumb>
		</Menu.Item>
	</Menu>
)

class HeaderBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			current: 'home',
			isLogin: false,
			userInfo: {},
			lang: ''
		}
		this.handleVisibleChange = this.handleVisibleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.getUserInfo = this.getUserInfo.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.getdefaultValue = this.getdefaultValue.bind(this)
	}
	
	componentWillMount() {
		this.getdefaultValue()
	}
	
	componentDidMount() {
		this.getUserInfo()
		
	}
	
	handleVisibleChange(flag) {
		this.setState({ visible: flag })
	}
	
	handleClick = (e) => {
		this.setState({
			current: e.key,
		}, () => {
			history.push(`${e.key}`)
		})
	}
	
	getUserInfo() {
		postApi('/user/userInfo', {})
			.then(res => {
				console.log(res)
				if (res.msg === 'success') {
					this.setState({
						isLogin: true,
						userInfo: res.data
					})
				} else {
					this.setState({
						isLogin: false
					})
				}
			})
	}
	
	handleChange(value) {
		localStorage.setItem('lang', value)
		this.setState({
			lang: value
		},()=>{
			window.location.reload()
		})
		// window.location.search = `?lang=${value}`
	}
	
	getdefaultValue() {
		let lang = localStorage.getItem('lang')
		if (!lang) lang = 'zh-CN'
		this.setState({ lang })
	}
	
	render() {
		const { lang } = this.state
		return (
			<div className="header_container">
				<header>
					{/*logo*/}
					<div className="header_logo">LOGO</div>
					<Menu
						onClick={this.handleClick}
						selectedKeys={[history.location.pathname]}
						defaultSelectedKeys={['home']}
						mode="horizontal"
					>
						<Menu.Item key="/">
							<Icon type="smile" theme="twoTone"/>{intl.get('HOME')}
						</Menu.Item>
						<Menu.Item key="/classify">
							<Icon type="appstore"/>{intl.get('MESSAGE')}
						</Menu.Item>
						<Menu.Item key="/about">
							{intl.get('ABOUT')}
						</Menu.Item>
					</Menu>
					{/*搜索*/}
					<div className="header_form">
						<Input type="text" placeholder={intl.get('SEARCH')}/>
					</div>
					{/*发表文章
					  *需要登录
					  * */}
					{
						this.state.isLogin ?
							<Avatar
								src={
									this.state.userInfo.userAvatar ?
										this.state.userInfo.userAvatar :
										'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
								}
								onClick={
									() => {
										history.push('/myPage')
									}
								}
							/> :
							<Button
								onClick={
									() => {
										history.push('/login')
									}
								}
								className="header_login"
								type="primary" ghost>
								登录
							</Button>
					}
					<Select
						defaultValue={lang}
						onChange={this.handleChange}
					>
						<Select.Option value="zh-CN">简体中文</Select.Option>
						<Select.Option value="en-US">English</Select.Option>
						<Select.Option value="ja-JP">日本の</Select.Option>
					</Select>
				</header>
			</div>
		)
	}
}

export default HeaderBar