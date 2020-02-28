import React from 'react'

export default class Admin extends React.Component {  
    componentDidMount () {
        this.goH5()
    }
    goH5 = () => {
        // 是PC端
        if (!this.isPC()) {
            console.log('h5')
            window.location.href = './h5'
        } else {
            console.log('pc')
            window.location.href = './index'
        }   
    }
    isPC = () => {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    
    render () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}