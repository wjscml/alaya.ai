import React from 'react';
import './common/style/normal.styl';
import cx from 'classnames';
import { SlideContainer, SlidePage } from "react-slidepage";
import { pageList, caseList, serveList, basicList } from "./data/index";
// import Slider from 'react-slider-light';
require('react-slidepage/lib/index.css');

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.initPage = 1
        this.state = {
            list: pageList,
            caseList: caseList,
            serveList: serveList,
            curPage: this.initPage,
            showFooter: null,
            imgHide: false
        }
    }
    onBefore (origin, direction, target) {  
        this.setState({curPage: target})
        if (target === 6) {
            this.setState({showFooter: true})
        }
    }
    closeFooter = () => {
        this.setState({showFooter: false})
    }
    prevPage() {
        this.refs['SlideContainer'].slidePrev()
    }
    nextPage() {
        this.refs['SlideContainer'].slideNext()      
    }
    slideTo(page) {   
        this.refs['SlideContainer'].slideTo(page)
        this.setState({curPage: page})
        
    }
    addPage() {
        const list = this.state.list
        list.push({name: 'Page' + (list.length+1) + ' - 删除最后Page', class: 'page4', isRemove: true})
        this.setState({list: list}, () => {
          this.refs['SlideContainer'].update()
        })
    }
    removePage() {
        const list = this.state.list
        // 每次删除最后一个page
        list.splice(list.length - 1, 1);
        this.setState({
          list: list,
          // 当删除到当前位置的page则自动跳转到第一个page，没有删除当前page则保持当前位置
          curPage: this.state.curPage === (list.length + 1) ? 1 : this.state.curPage
        }, () => {
          this.refs['SlideContainer'].update()
        })
    }
    goAigis () {
        window.open('https://aigis.leadfintech.com')
    }
    render() {  
        var bgClass = cx({
            'main': true,
            'bg1': this.state.curPage == 1 || this.state.curPage == 2 || this.state.curPage == 7,           
            'bg3': this.state.curPage == 3 || this.state.curPage == 4,
            'bg5': this.state.curPage == 5 || this.state.curPage == 6
        });
        return (
            <div className={bgClass}>
                <SlideContainer page={this.initPage} ref="SlideContainer" before={this.onBefore.bind(this)}>  
                    {
                    this.state.list.map((item, index) => {
                        return (
                        <SlidePage className={item.class} key={index}>
                            {
                                index == 0 &&
                                <div className="top">                                
                                    <div className="logo">
                                        <img className="logo-img" src="./assets/image/logo.png" alt="logo" />
                                        {/* <span>Alaya.ai</span> */}
                                    </div>
                                </div>
                            }
                            {
                                index == 0 &&
                                <div className="content">
                                    <div className="text-box">
                                        <div className="title-primary">第八识</div>
                                        <div className="title">第三方决策数据研究机构</div>
                                        <div className="sub-title">山东第八识智能科技有限公司，是一家金融科技创新企业，通过可验证的量化算法模型，提供从国际贸易结算、大宗商品采购、供应链金融，到基金管理的一系列金融科技服务。</div>
                                    </div>
                                </div> 
                            }
                            {
                                index == 1 &&
                                <div className="content">
                                    <div className="text-box">
                                        <div className="title">埃癸斯(Aigis)风险控制系统</div>
                                        <div className="sub-title">Alaya.ai专攻于基于系统化投资(Systematic investment) 研究，对长期、连续、公开的数据流进行统计建模和数学分析。基于程序对趋势的分析，而非人的主观臆断，因此可以避免情绪化导致不稳定的投资表现，以此实现非常有吸引力的风险调整后收益(risk-adjusted returns)。</div>
                                        <div className="aigis-btn">
                                            <div className="title-primary" onClick={this.goAigis}>试用Aigis</div>
                                            <div className="app-download">
                                                <span>下载APP</span>
                                                <div className="download">
                                                    <img src="./assets/download.svg" alt="example" />
                                                    <div className="pulldown-bg"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            }
                            {
                                index == 2 &&
                                <div className="content">
                                    <div className="left">
                                        {
                                            basicList.map((column, index) => 
                                                <div className="column" key={index}>
                                                    <div className="title">{column.title}</div>
                                                    <div className="sub-title">
                                                        {
                                                            column.subTitle.map((item, a) =>
                                                                <span key={a}>{item}</span>
                                                            )
                                                        }
                                                    </div>                                                
                                                    <ul className={cx({
                                                        "list": true,
                                                        "list-row": index === 2
                                                    })}>
                                                        {
                                                            column.info.map((item, b) =>
                                                                <li key={b}>{item}</li>
                                                            )
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        }   
                                    </div>
                                    <div className={cx({
                                        'right': true,
                                        'active3': this.state.curPage === 3
                                    })}>
                                        <img className="pic" src="./assets/image/group-10.png" alt="" />
                                    </div>
                                </div> 
                            }
                            {
                                index == 3 &&
                                <div className="content">
                                    <div className="tips">服务概述</div>
                                    <div className="title">第八识助您在行业中保持领先地位</div>
                                    <div className="serve-container">
                                        {
                                            this.state.serveList.map((item, index) => 
                                                <div className="serve-column" key={index}>
                                                    <div className={cx({
                                                        'image-block': true,
                                                        'block1': index == 0,
                                                        'block2': index == 1,
                                                        'block3': index == 2,
                                                        'block4': index == 3
                                                    })}></div>
                                                    <div className="column-title">{item.title}</div>
                                                    <p className="column-text">{item.info}</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            }
                            {
                                index == 4 &&
                                <div className="content">
                                    <div className="tips">共塑未来</div>
                                    <div className="title">合作伙伴及客户</div>                                 
                                    <Swipe autoPlay={true} interval={3000}></Swipe>                                
                                </div>
                            }
                            {
                                index == 5 &&
                                <div className="content">                                 
                                    <div className="title">客户服务案例</div>  
                                    <ServeSlider data={this.state.caseList} autoPlay={true} interval={8000}></ServeSlider>                        
                                </div>
                            }
                            {/*
                                index == 5 &&                                
                                <div className={cx({
                                    "footer": true,
                                    "footer-show": this.state.showFooter
                                })}>                                   
                                    <img className="logo-img" src="./assets/image/logo.png" alt="logo" />
                                    <p className="email"><span>电子邮箱:</span> alaya@leadfintech.com</p>   
                                    <div className="close" onClick={this.closeFooter}>关闭</div>                               
                                </div>
                            */}
                            {
                                index == 6 &&
                                <div className="content">                               
                                    <div className="title">联系我们</div>
                                    <p className="email">电子邮箱： alaya@leadfintech.com</p>
                                </div>
                            }
                        </SlidePage>
                        )
                    })
                    }
                </SlideContainer>              
                {
                    this.state.curPage < 4 &&
                    <div className={cx({
                        'img-box': true,
                        'active2': this.state.curPage == 2,
                        'active3': this.state.curPage == 3,
                        'img-hide': this.state.imgHide
                    })}>
                        <img className="pic pic1" src="./assets/image/Tealscreen.png" alt="" />
                        <img className="pic pic2" src="./assets/image/Chart.png" alt="" />
                        <img className="pic pic3" src="./assets/image/Chart2.png" alt="" />
                        <img className="pic pic4" src="./assets/image/LeftRail.png" alt="" />
                    </div>
                }
                <div className='pagination'>
                    <div className='prev-page' onClick={this.prevPage.bind(this)}>&Lambda;</div>
                    {
                        this.state.list.map((item, index) => {
                        return <span key={index}
                            onClick={this.slideTo.bind(this,index+1)}
                            className={cx({'active': this.state.curPage === index+1})}></span>
                        })
                    }
                    <div className='next-page' onClick={this.nextPage.bind(this)}>V</div>
                </div>        
            </div>       
        );
    }
}
class ServeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowLocal: 0
        };
    }
    componentDidMount() {
        this.goPlay()
    }
    handleArrowClick = (option) => {
        this.turn(option)
    }
    turn(n) {
        var _n = this.state.nowLocal + n;
        if(_n < 0) {
          _n = _n + this.props.data.length;
        }
        if(_n >= this.props.data.length) {
          _n = _n - this.props.data.length;
        }
        this.setState({nowLocal: _n});
    }
    goPlay = () => {
        if(this.props.autoPlay) {
            this.autoPlayFlag = setInterval(() => {
                this.turn(1)
            }, this.props.interval)
        }
    }
    pausePlay = () => {
        clearInterval(this.autoPlayFlag)
    }
    render() {
        return (
            <div className="container">
                <div className="turn-btn left-btn" onClick={()=>this.handleArrowClick(-1)}></div>
                <div className="turn-btn right-btn" onClick={()=>this.handleArrowClick(1)}></div>                           
                <ul className="slide-box"
                    onMouseEnter={this.pausePlay}
                    onMouseLeave={this.goPlay}
                    style={{
                        left: -100 * this.state.nowLocal + '%'
                }}>
                    {
                        this.props.data.map((item, index) =>
                            <li className="serve-box" key={index}>
                                <p className="tips">{item.tips}</p>
                                <div className="image-box">
                                    <img src={item.src} alt="" />
                                    <div className="info">
                                    {
                                        item.info.map((info, i) =>
                                            <p key={i}>{info}</p>
                                        )
                                    }
                                    </div>                            
                                </div>  
                            </li>
                        )
                    }
                </ul>
            </div>
        )   
    }
}
class Swipe extends React.Component {
    state = {
        card: [
            {
                a: './assets/image/partner11.png',
                b: './assets/image/partner12.png'
            },
            {
                a: './assets/image/partner01.png',
                b: './assets/image/partner02.png'
            },
            {
                a: './assets/image/partner03.png',
                b: './assets/image/partner04.png'
            },
            {
                a: './assets/image/partner05.png',
                b: './assets/image/partner06.png'
            },
            {
                a: './assets/image/partner07.png',
                b: './assets/image/partner08.png'
            },
            {
                a: './assets/image/partner09.png',
                b: './assets/image/partner10.png'
            }
        ],
        active: null,
        antiActive: null
    }
    componentDidMount() {
        this.autoPlay()
    }
    componentWillUnmount() {
        clearInterval(this.timeOuter)
    }
    stateMouseenter = () => {
        clearInterval(this.timeOuter)
    }
    stateMouseleave = () => {
        this.autoPlay()
    }
    autoPlay() {
        if (this.props.autoPlay) {  
            this.timeOuter = setInterval(this.play, this.props.interval)
        }
    }
    play = () => {
        this.setState({
            active: true
        })
        setTimeout(()=>{
            let data = this.state.card
            let first = data.shift()
            data.push(first)
            this.setState({
                card: data,
                active: false
            })
        }, 1000)
    }
    antiPlay = () => {
        this.setState({
            antiActive: true
        })
        setTimeout(()=>{
            let data = this.state.card
            let last = data.pop()
            data.unshift(last)
            this.setState({
                card: data,
                antiActive: false
            })
        }, 1000)
    }
    render() {        
        return (
            <div className="container"
                onMouseEnter={this.stateMouseenter}
                onMouseLeave={this.stateMouseleave}
            >
                <div className="turn-btn left-btn" onClick={this.antiPlay}></div>
                <div className="turn-btn right-btn" onClick={this.play}></div> 
                <div className="card-swipe" >
                    <div className="card-slide" >
                        {
                            this.state.card.length && this.state.card.map((item, index) => 
                            <div key={index} 
                                
                                className={cx({
                                    'card-list': true,
                                    'active': this.state.active,
                                    'antiActive': this.state.antiActive
                                })}
                            >
                                <div className="image-box" style={{backgroundImage:`url(${item.a})`}}></div>
                                <div className="image-box" style={{backgroundImage:`url(${item.b})`}}></div>
                            </div>)
                        }
                    </div>
                </div> 
            </div>
        );
    }
}