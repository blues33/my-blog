import Ids from '../model/ids'

export default class BaseComponent {
	constructor() {
		this.idList = ['userId', 'articleId']
	}
	
	getId(type) {
		if (!this.idList.includes(type)) {
			console.log('id类型错误')
			throw new Error('id类型错误')
			return
		}
		// try{
		const idData = Ids.findOne()
		console.log(idData)
		idData[type]++
		console.log(idData[type])
		idData.save()
		return idData[type]
		// }catch(err){
		// 	console.log('获取ID数据失败')
		// 	throw new Error(err)
		// }
	}
}