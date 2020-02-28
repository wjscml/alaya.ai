import React from 'react';
import './common/style/h5.styl';
import cx from 'classnames';
import { SlideContainer, SlidePage } from "react-slidepage";
import { caseList, serveList, basicList, menuList } from "./data/index";
// import Slider from 'react-slider-light';
require('react-slidepage/lib/index.css');

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.initPage = 1
        this.state = {
            list: [
                {name: 'Page1', class: 'page1'},
                {name: 'Page2', class: 'page2'},
                {name: 'Page3', class: 'page3'},
                {name: 'Page4', class: 'page4'},
                {name: 'Page5', class: 'page5'},
                {name: 'Page6', class: 'page6'},
                {name: 'Page7', class: 'page7'},
                {name: 'Page8', class: 'page8'},
                {name: 'Page9', class: 'page9'},
                {name: 'Page10', class: 'page10'}
            ],
            caseList: caseList,
            curPage: this.initPage,
            showFooter: null,
            jump: null,
            navOpen: false
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({jump: true})
            setTimeout(()=>{
                this.setState({jump: false})
            }, 1000)
        }, 2000)
    }
    onBefore (origin, direction, target) {  
        this.setState({curPage: target})
        if (target == 9) { // eslint-disable-line
            this.setState({showFooter: true})
        }
    }
    closeFooter = () => {
        this.setState({showFooter: false})
    }
    prevPage() {
        this.refs['SlideContainer'].slidePrev()
    }
    nextPage = () => {
        this.refs['SlideContainer'].slideNext()      
    }
    slideTo = (page) => {   
        if (page === 11) {
            window.open('/download')
            return
        }
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
    reachPage = (page) => {
        this.setState({navOpen: false})
        this.slideTo(page)
    }
    goAigis () {
        window.open('https://aigis.leadfintech.com')
    }
    toggleNav = () => {
        let navOpen = this.state.navOpen
        navOpen = !navOpen
        this.setState({navOpen})
    }
    render () {  
        var bgClass = cx({
            'main-h5': true,
            'bg1-h5': this.state.curPage == 1 || this.state.curPage == 9, // eslint-disable-line
            'bg2-h5': this.state.curPage == 2, // eslint-disable-line
            'bg3-h5': this.state.curPage == 3, // eslint-disable-line
            'bg4-h5': this.state.curPage == 4 || this.state.curPage == 5 || this.state.curPage == 6 || this.state.curPage == 7, // eslint-disable-line
            'bg8-h5': this.state.curPage == 8 // eslint-disable-line
        });
        var serveList01 = serveList[0]
        var serveList02 = serveList[1]
        var serveList03 = serveList[2]
        var serveList04 = serveList[3]
        return (
            <div className={bgClass}>
                <div className="top-h5">                                
                    <div className="logo" onClick={()=>this.slideTo(1)}>
                        <img className="logo-img" src="./assets/image/logo-pri.png" alt="logo" />
                        {/* <span>Alaya.ai</span> */}
                    </div>
                    <div className="mobile-trigger" onClick={this.toggleNav}>
                        <span className={cx({
                            'menuButton': true,
                            'open': this.state.navOpen
                        })}></span>
                    </div>
                </div>
                <div className={cx({
                    "menu-wrapper": true,
                    "open": this.state.navOpen
                })}>
                    <ul>
                        {
                            menuList.map((item, index) => 
                                <li className="menu-item" onClick={()=>this.reachPage(item.page)} key={index}>{item.title}</li>
                            )
                        }                
                    </ul>
                </div>
                {
                    this.state.curPage !== 10 &&
                    <div className={cx({
                            'goDown': true,
                            'active': this.state.jump
                        })} onClick={this.nextPage}
                    >
                        <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
                            <g stroke="#FFF" fill="none" fillRule="evenodd">
                                <path d="M.707 21.92L21.92.707 43.133 21.92 21.92 43.134z"></path>
                                <path fill="#FFF" d="M21.394 15v13.781l-6.267-6.322-.44.436 7.015 7.079 7.084-7.083-.439-.439-6.333 6.334V15z"></path>
                            </g>
                        </svg>
                    </div>
                }
                {
                    this.state.curPage == 3 && // eslint-disable-line
                    <img className="bgImg" src="./assets/image/group-10.png" alt="" />
                }
                <SlideContainer page={this.initPage} ref="SlideContainer" before={this.onBefore.bind(this)}>  
                    {
                    this.state.list.map((item, index) => {
                        return (
                        <SlidePage className={item.class} key={index}> 
                            {
                                index == 0 && // eslint-disable-line
                                <div className="content-h5">
                                    <div className="text-box">
                                        <div className="title-primary">第八识</div>
                                        <div className="title">第三方决策数据研究机构</div>
                                        <div className="sub-title">山东第八识智能科技有限公司，是一家金融科技创新企业，通过可验证的量化算法模型，提供从国际贸易结算、大宗商品采购、供应链金融，到基金管理的一系列金融科技服务。</div>
                                    </div>
                                    <img src="./assets/image/Image-b.png" alt="" />
                                </div> 
                            }
                            {
                                index == 1 && // eslint-disable-line
                                <div className="content-h5">
                                    <div className="text-box">
                                        <div className="title">埃癸斯(Aigis)风险控制系统</div>
                                        <div className="sub-title">Alaya.ai专攻于基于系统化投资(Systematic investment) 研究，对长期、连续、公开的数据流进行统计建模和数学分析。基于程序对趋势的分析，而非人的主观臆断，因此可以避免情绪化导致不稳定的投资表现，以此实现非常有吸引力的风险调整后收益(risk-adjusted returns)。</div>
                                        <div className="title-primary" onClick={this.goAigis}>试用Aigis</div>
                                    </div>
                                </div> 
                            }
                            {
                                index == 2 && // eslint-disable-line
                                <div className="content-h5">
                                    <div className="bg-cover"></div>
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
                                </div> 
                            }
                            {
                                index == 3 && // eslint-disable-line
                                <div className="content-h5">
                                    <div className="tips">服务概述</div>
                                    <div className="title">第八识助您在行业中保持领先地位</div>
                                    <div className="serve-container">
                                        {
                                            <div className="serve-column" >
                                                <div className={cx({
                                                    'image-block': true,
                                                    'block1': true     
                                                })}></div>
                                                <div className="column-title">{serveList01.title}</div>
                                                <p className="column-text">{serveList01.info}</p>
                                            </div> 
                                        }
                                    </div>
                                </div>
                            }
                            {
                                index == 4 && // eslint-disable-line
                                <div className="content-h5">
                                    <div className="serve-container">
                                        {                                           
                                            <div className="serve-column" >
                                                <div className="image-block block2"></div>
                                                <div className="column-title">{serveList02.title}</div>
                                                <p className="column-text">{serveList02.info}</p>
                                            </div>                                         
                                        }
                                    </div>
                                </div>
                            }
                            {
                                index == 5 && // eslint-disable-line
                                <div className="content-h5">
                                    <div className="serve-container">
                                        {                                           
                                            <div className="serve-column" >
                                                <div className="image-block block3"></div>
                                                <div className="column-title">{serveList03.title}</div>
                                                <p className="column-text">{serveList03.info}</p>
                                            </div>                                       
                                        }
                                    </div>
                                </div>
                            }
                            {
                                index == 6 && // eslint-disable-line
                                <div className="content-h5">
                                    <div className="serve-container">
                                        {                                           
                                            <div className="serve-column" >
                                                <div className="image-block block4"></div>
                                                <div className="column-title">{serveList04.title}</div>
                                                <p className="column-text">{serveList04.info}</p>
                                            </div>                                       
                                        }
                                    </div>
                                </div>
                            }
                            {
                                index == 7 && // eslint-disable-line
                                <div className="content-h5">
                                    <div className="tips">共塑未来</div>
                                    <div className="title">合作伙伴及客户</div>                                    
                                    <Swipe autoPlay={true} interval={3000}></Swipe>
                                </div>
                            }
                            {
                                index == 8 && // eslint-disable-line
                                <div className="content-h5">                                 
                                    <div className="title">客户服务案例</div>  
                                    <ServeSlider data={this.state.caseList} autoPlay={true} interval={10000}></ServeSlider>                       
                                </div>
                            }
                            {/* 
                                index == 8 &&                                
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
                                index == 9 && // eslint-disable-line
                                <div className="content-h5">   
                                    <div className="bg-cover"></div>                              
                                    <div className="title">联系我们</div>  
                                    <p className="email"><span>电子邮箱：</span> alaya@leadfintech.com</p>    
                                </div>
                            }
                        </SlidePage>
                        )
                    })
                    }
                </SlideContainer>                               
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
            },
            {
                a: './assets/image/partner11.png',
                b: './assets/image/partner12.png'
            }
        ],
        active: null
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
    render() {        
        return (
            <div className="card-swipe" >
                <div className="card-slide" >
                    {
                        this.state.card.length && this.state.card.map((item, index) => 
                        <div key={index} 
                            onMouseEnter={this.stateMouseenter}
                            onMouseLeave={this.stateMouseleave}
                            className={cx({
                                'card-list': true,
                                'active': this.state.active
                            })}
                        >
                            <div className="image-box" style={{backgroundImage:`url(${item.a})`}}></div>
                            <div className="image-box" style={{backgroundImage:`url(${item.b})`}}></div>
                        </div>)
                    }
                </div>
            </div> 
        );
    }
}