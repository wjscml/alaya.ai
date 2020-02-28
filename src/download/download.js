import React from 'react'

export default class DownLoad extends React.Component {
    componentDidMount () {
        this.goDownload()
    }
    isWeiXn = () => {
        let ua = window.navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') { // eslint-disable-line
          return true
        } else {
          return false
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
    goDownload = () => {
        var u = navigator.userAgent, app = navigator.appVersion
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        // console.log('isAndroid', isAndroid, 'isIOS', isIOS, 'isWeiXn', this.isWeiXn(), 'isPC', this.isPC())
        // 这里是安卓浏览器
        if (isAndroid) {
          window.location.href = 'https://h5aigis.leadfintech.com/release/aigis-release.apk' // 跳安卓端下载地址
        }
        // 这里是iOS浏览器
        if (isIOS) {
          window.location.href = 'http://itunes.apple.com/cn/app/id1475231419?mt=8' // 跳AppStore下载地址
        }
        // 是微信内部webView
        if (this.isWeiXn()) {
            alert('请点击右上角按钮, 点击使用浏览器打开')
        }
        // 是PC端
        if (this.isPC()) {
            window.location.href = '/'
        }
    }
    
    render () {    
        return (
            <div>                     
            </div>       
        );
    }
}