import React from 'react';
import ReactDOM from 'react-dom';
import App from './router'
import rootReducer from './redux/reducers/reducer'
import {createStore,applyMiddleware,compose} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// 利用redux-logger打印日志
import {createLogger} from 'redux-logger'
import './index.css';
import './assets/css/reset.less'
import * as serviceWorker from './serviceWorker';


const loggerMiddleware = createLogger()
let redux_devTool = window.devToolsExtension ?
	window.devToolsExtension():
	f => f
const store = createStore(rootReducer, compose(
	applyMiddleware(thunk,loggerMiddleware),
	redux_devTool
))
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
