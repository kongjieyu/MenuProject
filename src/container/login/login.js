import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'
import Background from '/Users/may/Desktop/reactLearningPath/src/component/img/background/backgroundImg.png';

var w = window.innerWidth;
var h = window.innerHeight;

var sectionStyle = {
    header: {
        width: w,
        //   height: "400px",
            height: h,
        alignUtem: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${Background})`
    },
    content: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    }

};

@connect(
    //要的state属性，和方法都通过connect放到props里
    state=>state.user,
    {login}
)
@imoocForm
class Login extends React.Component{
   constructor(props) {
        super(props);
        // this.state = {
        //     user: '',
        //     pwd: ''
        // }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    //因为是个路由组件，可以直接使用this.props.history.push()
    register(){
        console.log(this.props)
        this.props.history.push('/register')
    }

    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    handleLogin(){
        this.props.login(this.props.state)
        console.log(this.props.state)
    }

    render(){
        return(
            <div className='mainPage' style={sectionStyle.header}>
                <div style={sectionStyle.content}>
                {(this.props.redirectTo&&this.props.redireactTo!=='/login')? <Redirect to={this.props.redirectTo} />:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {/* 报错信息  */}
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        {/*InputItem是蚂蚁UI封装过的表单，原装React表单还是 <label>和<input>  */}
                        <InputItem
                            onChange={(v) => { this.props.handleChange('user', v)}}
                        >用户</InputItem>
                        <InputItem
                            type='password'
                            onChange={(v) => { this.props.handleChange('pwd', v)}}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.handleLogin} type='primary'>登陆</Button>
                        <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>

                </WingBlank>
                </div>
            </div>
        )
    }
}
export default Login