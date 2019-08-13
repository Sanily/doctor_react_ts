import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store from './store';
import './assets/style/index.scss';
import DoctorHome from './views/DoctorManage/DoctorHome';
import * as serviceWorker from './serviceWorker';

store.subscribe(() => {
    console.log(store.getState());
});

const render = () => {
    document.title = '医生工具云平台';
    return (
        ReactDOM.render((
                <div className="app-container">
                    <HashRouter>
                        <Switch>
                            {/*exact 访问其他路由时不访问Login组件*/}
                            <Route path="/" component={DoctorHome} exact={true} />
                            <Route path="/doctorHome" component={DoctorHome} />
                        </Switch>
                    </HashRouter>
                </div>
            ), document.getElementById('root') as HTMLElement
        )
    );
};

store.subscribe(render);

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
