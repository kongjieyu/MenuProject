import React from 'react'
import { Grid,Button,ImagePicker, WingBlank, SegmentedControl  } from 'antd-mobile';
import PropTypes from 'prop-types';
import './avatar-selector.css'
import {storage} from '../firebase/index.js'

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}];

class AvatarSelector extends React.Component {
    static PropTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state = {
            icon:null,
            text:null,
            url:null,
            progress:0,
            files: data,
    multiple: false,
        }
        this.stateGet = this.stateGet.bind(this)
    }
    stateGet(){
        console.log(this.state)
    }

    fileSelectedHandler = event =>{
            console.log('FileSelect')
            console.log(event.target.files[0])

            console.log(this.state)
            console.log(event.target.files[0])
            if(event.target.files[0]){
                const icon = event.target.files[0]
                this.setState({
                    icon: icon,
                    text: icon.name,
                    url:null,
                    progress: null

                })
                // this.props.selectAvatar(icon.text)
            }
        }

    fileUploadHandler = () =>{
        console.log(this.state)
        const {icon} = this.state
        const upLoadTask =  storage.ref(`images/${icon.name}`).put(icon);
        // upLoadTask.on('stage_changed', progress, error, complete)
        upLoadTask.on('state_changed', 
        (snapshot)=>{
            //progress function
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
            this.setState({
                progress:progress
            })
        }, 
        (error)=>{
            //error function
            console.log(error)
        }, 
        ()=>{
            //complete function
            storage.ref('images').child(icon.name).getDownloadURL().then(url=>{
                console.log(url)
                this.setState({
                    icon: url,
                    text: icon.name,
                    url: url
                })
                this.props.selectAvatar(this.state.text,this.state.url)
            })
        })


    }
    onChange = (files, type, index) => {
        console.log('onChange File')
        console.log(files, type, index);
        let icon = null;
        let text = null;

        if(files[0]){
                console.log(files[0].file.name)
                 icon = files[0]['url']
                 text = files[0].file.name
                console.log(files[0])
                console.log(files[0]['url'])
        }


        this.setState({
            icon:icon,
            text:text,
            url:icon,
        files,
        });
  }
    upload=()=>{
        console.log('UPPPPPLOAD')
        console.log(this.state.text)
        console.log(this.state.url)
            this.props.selectAvatar(this.state.text,this.state.url)
                }
    render(){
        const { files } = this.state;
        const avatarList = 'kk,jj,yy,cc,zz,dd'
                            .split(',')
                            //v 是所有图片的名字
                            //map 之后的结果是 => 后面那部分
                            .map (v => ({
                                icon: require(`../img/${v}.png`),
                                text: v
                            }))

        // const avatarList1 = 'kk,jj,yy,cc,zz,dd'
        //                     .split(',')
        //                     //v 是所有图片的名字
        //                     //map 之后的结果是 => 后面那部分
        //                     .map (v => ({
        //                         icon: require(`../img/${v}.png`),
        //                         ele: v
        //                     }))
        
        const gridHeader = this.state.icon
                            ? (<div className="avatar-container">
                                    <span>已选择头像</span>
                                    <div >
                                        <img className="avatar-img" style={{width:60}} src={this.state.icon} alt=""/>
                                    </div>
                                </div>)
                                : <div>'请选择头像'</div>
        
        return (
            <div>
                {gridHeader}
                <Grid 
                    data={avatarList} 
                    columnNum = {3}
                    renderItem={dataItem => (
                        <div style={{ paddingTop: '20%', paddingBottom: '8%'}}>
                            <img src={dataItem.icon} style={{ width: '50%', height: '50%' }} alt="" />
                            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                <span>{dataItem.text}</span>
                            </div>
                        </div>
                    )}
                    onClick = {elm=>{
                        this.setState(elm)
                        this.props.selectAvatar(elm.text,null)
                        console.log('elm')
                        console.log(this.state)
                    }}

                />

                <input type="file" onChange={this.fileSelectedHandler}/>
                <Button onClick={this.fileUploadHandler}>Upload</Button>
                <img src={this.state.url||'https://via.placeholder.com/300'} alt="Upload Picture" height="300px"/>
                <Button onClick={this.stateGet}> 
                    打印state
                </Button>
                <Button onClick={this.upload}>UPPPPPPLOAD</Button>
                {/* 这种写法可以不显示text */}
                {/* <div className="sub-title">Custom GridCell Style</div>
                <Grid 
                    data={avatarList1} 
                    columnNum={3} 
                    itemStyle={{ height: '150px', background: 'rgba(0,0,0,.05)' }}
                    onClick = {elm=>{
                        this.setState(elm)
                        this.props.selectAvatar(elm.ele)
                        console.log('elm')
                    }}
                    /> */}
                    

        {/* <SegmentedControl
          values={['切换到单选', '切换到多选']}
          selectedIndex={this.state.multiple ? 1 : 0}
          onChange={this.onSegChange}
        /> */}
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 5}
          accept="image/gif,image/jpeg,image/jpg,image/png"
        />
            </div>

        )
    }
}

export default AvatarSelector