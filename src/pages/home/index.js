import React, { Component } from 'react'
import { Card, Icon, List, Row, Col, Carousel, Avatar, Spin, Tag } from 'antd'
import { postApi } from '../../assets/js/axios'
import api from '../../assets/js/axios/api'
import InfiniteScroll from 'react-infinite-scroller'
import './home.less'
import history from "../../history"

const { Meta } = Card;
const IconText = ({ type, text }) => (
	<span>
	    <Icon type={type} style={{ marginRight: 8 }}/>{text}
    </span>
);

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			bannerList: [],
			hasMore: true,
			listData: []
		}
		this.getList = this.getList.bind(this)
	}
	
	componentDidMount() {
		this.getList()
	}
	
	addArticle() {
		postApi(api.addArticle, {})
			.then(res => {
				console.log(res)
			})
	}
	
	getList() {
		postApi(api.GetArticleList, {})
			.then(res => {
				if (res.msg === 'success') {
					const data = res.data
					this.setState({
						listData: data
					})
				}
				
			})
	}
	
	render() {
		const list = this.state.listData
		
		return (
			<Row className="home_container">
				<Col xl={18} lg={24} className="left_content">
					<List
						itemLayout="vertical"
						size="small"
						bordered={true}
						dataSource={list}
						style={{ width: '700px' }}
						renderItem={item => (
							<List.Item
								key={item.articleTitle}
								actions={[
									<Tag color="cyan">{item.articleAuth}</Tag>,
									<IconText type="star-o" text={item.articleCollectedNumber}/>,
									<IconText type="like-o" text={item.articleSupportedNumber}/>,
									<IconText type="message" text={item.articleCommentNumber}/>
								]}
								onClick={()=>{history.push('/article/detail')}}
								extra={
									item.articleThumbnail ?
										<img width={272}
										     alt="logo"
										     src={item.articleThumbnail}/>
										: ''
								}
							>
								<List.Item.Meta
									title={<a href={item.href}>{item.articleTitle}</a>}
									description={item.articleDesc}
								/>
							</List.Item>
						)}
					/>
				</Col>
				<Col xl={6} lg={0} className="right_content">
					<Card
						style={{ width: 240 }}
						actions={[
							<Icon type="setting" onClick={() => this.props.history.push('/settings/user')}/>,
							<Icon type="edit" onClick={this.addArticle}/>,
							<Icon type="ellipsis"/>
						]}
					>
						<Meta
							avatar={<Avatar
								src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
							title="Card title"
							description="This is the description"
						/>
					</Card>
					{/*热门文章*/}
					<div>
						<Card
							title="热门文章"
							style={{ width: 240, marginTop: 20 }}
						>
							<p>热门文章1</p>
							<p>热门文章2</p>
							<p>热门文章3</p>
						</Card>,
					</div>
					{/*banner*/}
					<Carousel autoplay>
						{
							this.state.bannerList.map((k, v) => (
								<div key={v}>
									<img src={k.imgUrl} alt=""/>
								</div>
							))
						}
						<div><h1>1</h1></div>
						<div><h1>2</h1></div>
						<div><h1>3</h1></div>
						<div><h1>4</h1></div>
					</Carousel>
					{/*友情链接*/}
				</Col>
			</Row>
		)
	}
}

export default Home