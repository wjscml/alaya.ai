import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
import Admin from './Admin'
import Mobile from './h5'
import Normal from './normal'
import DownLoad from './download/download'

export default class IRouter extends React.Component{
    render () {
        return (
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route exact path='/' component={Admin} />
                        <Route exact path='/index' component={Normal} />
                        <Route exact path='/h5' component={Mobile} />
                        <Route path='/download' component={DownLoad} />

                        <Redirect from="/" to='/' />
                    </Switch>
                </App>
            </BrowserRouter>
        );
    }
}