/**
    Author Ward
    Created by on 2017-10-30 16:45
    dec 新版加入购物车弹窗
**/

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    Modal,
    FlatList,
    Animated
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast'  //土司视图

export default class ShopContentAlertView extends Component {

    constructor(props){
      super(props);

      this.state = ({
        isShow:false,
        ballSourceArr:[],
          ballSourceArrOne:[],
        zhuShuNum:props.pickZhuShu,  //总的注数
        currentQiShu:props.qiShuNum, //当前期数
        currentGameName:props.caiZhongName, //当前彩种名称
        subTotalPrice:0.00,  //总的金额
        willWinPrice:0.00,  //预计盈利金额
        moneyText: '', // 当前文本框显示的文本
        defaultMoneyText: `请输入购买金额(余额: ${global.UserLoginObject.TotalMoney})`,
        isShowKeyboardView: true, // 是否显示键盘
        currentJsTag:props.jstag, //当前玩法tag
        caculateType:0,      //计算盈利类型 0 最大赔率， 1  逐行单注, 每行中一注,最多中N注， 2 单行多注, 限制最大注数.
      })
    }

    componentWillReceiveProps(nextProps) {

      if (nextProps.dataArr.length != 0 && nextProps.playData.wanfa && nextProps.jstag != null){
          // nextProps.dataArr
          let wanFaNameStr = null;
          if(nextProps.dataArr[0].isMultiple){
              wanFaNameStr = nextProps.dataArr[0].value.wanfa+": ";
              for(let i = 0; i < nextProps.dataArr.length;i++){
                  let str = nextProps.dataArr[i].value.xiangqing;
                  if(str.includes('(')&&str.includes(')')) {
                      wanFaNameStr += str.substring(str.indexOf('(') + 1, str.indexOf(')')) + '  ';
                  }else if(str.includes('：')){
                      wanFaNameStr += str.substring(str.indexOf('：') + 1, str.length) + '  ';
                  }else{
                      if(nextProps.caiZhongName == '香港⑥合彩'&&(nextProps.dataArr[i].value.wanfa == '三中二/三'||nextProps.dataArr[i].value.wanfa == '二全中'||nextProps.dataArr[i].value.wanfa == '三全中'||nextProps.dataArr[i].value.wanfa == '二中特'||nextProps.dataArr[i].value.wanfa == '特串'||nextProps.dataArr[i].value.wanfa == '4码全中')){
                          if (i == nextProps.dataArr.length -1){
                              wanFaNameStr += str ;
                          }else {
                              wanFaNameStr += str + ',   ';
                          }
                      }else {
                          wanFaNameStr += str + '   ';
                      }
                        }
              }
          }else {
              wanFaNameStr = nextProps.dataArr[0].value.xiangqing;
          }
           wanFaNames = [];

          wanFaNames.push({wanFaNameStr:wanFaNameStr,key:1});

        this.setState({
            isShow:nextProps.visiable,
            ballSourceArr:nextProps.dataArr,
            ballSourceArrOne:wanFaNames,
            zhuShuNum:nextProps.pickZhuShu,
            currentQiShu:nextProps.qiShuNum,
            currentGameName:nextProps.caiZhongName,
            currentPlayData:nextProps.playData,
            moneyText: '', // 当前文本框显示的文本
            defaultMoneyText: `请输入购买金额(余额: ${global.UserLoginObject.TotalMoney})`,
            isShowKeyboardView: true, // 是否显示键盘
            currentJsTag:nextProps.jstag,
        });

        this._caculateSubTotal(nextProps.dataArr, nextProps.playData, nextProps.jstag, nextProps.jstag == 'lhc' ? 0 : 2);
      }
    else if (nextProps.visiable == false) {//自动关闭后

        this.setState({
              isShow:nextProps.visiable,
              isShowKeyboardView: false, // 是否显示键盘
          })
     }
   }

    //计算总金额和盈利
    _caculateSubTotal(dataSource, playData, js_tag, price){


        let totalPrice = 0;  //投注总金额
        let winPrice = 0;    //预计盈利 = 预计中奖金额 - 投注金额
        let moreZhuShu = 1;  //最大注数
        let dxdsPeilv = 0;   //快三和值赔率
        let backupPeilv = 0; // 备胎赔率 。 pcdd混合那样的 用到。
        let playid = playData.playid;

        //时时彩特殊的,其他彩种不能使用这个方法，会出问题
        if (js_tag == 'ssc'){

            if (playData.peilv.includes('|') &&  playid != '71') {

                let peilvArr = playData.peilv.split('|');
                
                // SSC 五星、四星、三星的 所有组合。因为中的赔率不一样的。所以直接算赔率相加 不算注数了。
                if (playData.playname.includes('组合')) {
                  
                  for (pl of peilvArr) {
                    backupPeilv += (Number.parseFloat || parseFloat)(pl, 10);
                  }
                  
                } else if (playData.playname.includes('特殊号')) {
                  // 三星-特殊号；如果全买，最高中能顺子+对子。如果单买 则单中。因为赔率不同，所以也直接算赔率相加。
                  if (dataSource.length == 1) {
                    let dataPeilvArr = dataSource[0].value.peilv.split(':');
                    backupPeilv = (Number.parseFloat || parseFloat)(dataPeilvArr[1], 10);

                  } else {
                    
                    let allBall = '';
                    for (a of dataSource) {
                      allBall += `${a.value.balls}`;
                    }

                    for (va of dataSource) {
                      // va.value.peilv ---> "豹子:90.000"
                      let peilvAr = va.value.peilv.split(':');
                      let peilvInt = (Number.parseFloat || parseFloat)(peilvAr[1], 10);

                      if (va.value.balls == 0) {
                          backupPeilv += peilvInt;

                      } else if (va.value.balls == 1 && !allBall.includes(0)) {
                          backupPeilv += peilvInt;
                          
                      } else if (va.value.balls == 2 && (!allBall.includes(1) || allBall.includes(0))) {
                          backupPeilv += peilvInt;
                      }
                    }
                  }
                }

            } else {

              // 任二 - 直选和值 || 组选复式 || 组选和值
              let r2zxhz = playid == '59' || playid == '60' || playid == '62';
              // 任三 - 直选和值 || 组三复式 || 组六复式 || 组选和值
              let r3zxhz = playid == '65' || playid == '66' || playid == '68' || playid == '71';
              // 任四 - 组选24
              let r4zxhz = playid == '74';

              if (r2zxhz || r3zxhz) {
                // 直接判断选择的位置个数。得到最高可以中的注数。
                let postStr = dataSource[0].value.xiangqing.split('(')[0];
                let postNum = postStr.split(' ').length;
                
                if (postNum == 2) {
                  moreZhuShu = 1;
                } else if (postNum == 3) {
                  moreZhuShu = r2zxhz ? 4 : 1;
                } else if (postNum == 4) {
                  moreZhuShu = r2zxhz ? 6 : (r4zxhz ? 1 : 4);
                } else if (postNum == 5) {
                  moreZhuShu = r4zxhz ? 5 : 10;
                }
              }

            }
        }
        else if (js_tag == 'k3'){

            //k3 和值

            if (playData.wanfa == '三星和值' || playData.wanfa == '和值大小单双' ){

                let dxdsNum = 0;
                //快三和值
                for (k3SumModel of dataSource) {

                    if (k3SumModel.value.balls == '19' || k3SumModel.value.balls == '20'){
                        dxdsNum = 1;
                        dxdsPeilv = k3SumModel.value.peilv;
                    }
                    else if (k3SumModel.value.balls == '21' || k3SumModel.value.balls == '22'){

                        dxdsPeilv = k3SumModel.value.peilv;
                        if (dxdsNum == 0){
                            dxdsNum = 1;
                        }
                        else {
                            dxdsNum = 2;
                        }
                    }
                }

                //记住单个大小单双的赔率，再判断大小 和 单双 出现的次数 计算出赔率
                dxdsPeilv = dxdsPeilv * dxdsNum;
            }

        }
        else if (js_tag == 'pcdd') {
          
          if (playid == 3) {
            // 混合。因为赔率不一样的。所以直接算赔率 不算注数了。
            let allBall = '';
            for (let a = 0; a < dataSource.length; a++) {
              allBall += `${dataSource[a].value.balls}`;
            }

            for (let b = 0; b < dataSource.length; b++) {
              let balls = dataSource[b].value.balls;
              let peilvs = (Number.parseFloat || parseFloat)(dataSource[b].value.peilv, 10);

              if ((balls == 0) || (balls == 1 && !allBall.includes('0'))) {
                backupPeilv += peilvs;
              }

              if ((balls == 2) || (balls == 3 && !allBall.includes('2'))) {
                backupPeilv += peilvs;
              }

              if ((balls == 4) 
              || (balls == 5 && !(allBall.includes('4') || allBall.includes('6') || allBall.includes('7'))) 
              || (balls == 6 && !(allBall.includes('4') || allBall.includes('5') || allBall.includes('7')))
              || (balls == 7 && !(allBall.includes('4') || allBall.includes('5') || allBall.includes('6')))) {
                backupPeilv += peilvs;
              }

              if ((balls == 8) || (balls == 9 && !allBall.includes('8'))) {
                backupPeilv += peilvs;
              }

            }
          }
        }
        else if (js_tag == '3d'){
            if(playData.wanfa == '龙虎斗'){
                let lhballs = dataSource[0].value.balls.split(' ');


                let total = lhballs.length ;
                for(let i = 0 ; i< lhballs.length;i++){


                    for(let j = i+1; j < lhballs.length ; j++)
                    {

                        if (lhballs[i].charAt(0) == lhballs[j].charAt(2) && lhballs[i].charAt(2) == lhballs[j].charAt(0)) {
                            total--;

                        }

                    }
                }

                moreZhuShu = total;
            }



        }
        else if (js_tag == 'pk10'){

          if (playData.wanfa == '总前三特选'){

              let dxdsNum = 0;
              //快三和值
              for (k3SumModel of dataSource) {

                  if (k3SumModel.value.balls == '19' || k3SumModel.value.balls == '20'){
                      dxdsNum = 1;
                      dxdsPeilv = k3SumModel.value.peilv;
                  }
                  else if (k3SumModel.value.balls == '21' || k3SumModel.value.balls == '22'){

                      dxdsPeilv = k3SumModel.value.peilv;
                      if (dxdsNum == 0){
                          dxdsNum = 1;
                      }
                      else {
                          dxdsNum = 2;
                      }
                  }
              }

              //记住单个大小单双的赔率，再判断大小 和 单双 出现的次数 计算出赔率
              dxdsPeilv = dxdsPeilv * dxdsNum;

              let txXiangqing = dataSource[0].value.xiangqing;

              let txZhushu = dataSource[0].value.zhushu;
              if(txXiangqing.includes('全大')&&txXiangqing.includes('全小')){
                  txZhushu--;
              }

              if(txXiangqing.includes('全单')&&txXiangqing.includes('全双')){
                  txZhushu--;
              }

              moreZhuShu = txZhushu;
          
          }else if(playData.wanfa == '龙虎斗'){
              let lhballs = dataSource[0].value.balls.split(' ');


              let total = lhballs.length ;
              for(let i = 0 ; i< lhballs.length;i++){


                  for(let j = i+1; j < lhballs.length ; j++)
                  {

                      if (lhballs[i].charAt(0) == lhballs[j].charAt(2) && lhballs[i].charAt(2) == lhballs[j].charAt(0)) {
                          total--;

                      }

                  }
              }

              moreZhuShu = total;
          }

        }
        else if (js_tag == '11x5'){

        }
        else if (js_tag == 'lhc'){

        }

          //定位胆玩法
        if (playData.wanfa == '定位胆'){

            let balls = dataSource[0].value.xiangqing.split(' ');
            moreZhuShu = balls.length;  //根据详情对空格拆分拿到总共多少行，计算最多中多少钱.
        }

        // 定位大小单双
        if (playData.wanfa != '和值大小单双') {

          if (playData.wanfa.includes('大小单双')) {

              let balls = dataSource[0].value.xiangqing.split(' ');
              moreZhuShu = 0;

              for (let a = 0; a < balls.length; a++) {
                  let ballStr = balls[a];
                  let dxdsN = 0;
                  if (ballStr.includes('大') || ballStr.includes('小')) {
                      dxdsN = 1;
                  }
                  if (ballStr.includes('单') || ballStr.includes('双')) {
                      dxdsN = dxdsN == 0 ? 1 : 2;
                  }
                  moreZhuShu += dxdsN;
              }
          }
        }

        //时时彩大小PK modify by Allen
        if(playData.wanfa == '大小PK'){
            let sscballs = dataSource[0].value.balls.split(' ');


            let total = sscballs.length ;
            for(let i = 0 ; i< sscballs.length;i++){


                for(let j = i+1; j < sscballs.length ; j++)
                {

                    if (sscballs[i].charAt(0) == sscballs[j].charAt(2) && sscballs[i].charAt(2) == sscballs[j].charAt(0)) {
                        total--;

                    }

                }
            }

            moreZhuShu = total;
        }
      

        //拼接字符串的赔率, 特殊的赔率  && 备用赔率没有算
        if (playData.jiangjin_tip.length > 0 && backupPeilv <= 0) {

                //赔率是单个对应的，不能相加
                if (playData.playname == '特殊号'){

                    for (let i = 0; i < dataSource.length; i ++){

                        let shopcarModel = dataSource[i];

                        let newPeilv = 0.0;

                        //判断是否解析过了,输入价格时还是会判断
                        if (typeof(shopcarModel.value.peilv) == 'string'){
                           newPeilv = shopcarModel.value.peilv.split(':')[1];
                          //  shopcarModel.value.peilv = Number.parseFloat(newPeilv);
                        }
                        else{
                           newPeilv = shopcarModel.value.peilv;
                        }


                        totalPrice += shopcarModel.value.singlePrice * shopcarModel.value.zhushu * 1 * 1;
                        winPrice += shopcarModel.value.singlePrice * shopcarModel.value.zhushu * newPeilv;
                    }
                }
                else {

                    let totalPeilv = 0.0;
                    let peilvArr = playData.peilv.split('|');
                    // SSC 三星-组选包胆。 预算最大的。
                    if (playData.playname == "组选包胆" || playid == '71') {

                      totalPeilv = peilvArr[0];
                      for (let i = 0 ; i < dataSource.length; i ++) {
                        let shopcarModel = dataSource[i];
                        totalPrice += shopcarModel.value.singlePrice * shopcarModel.value.zhushu * 1 * 1;
                        winPrice += shopcarModel.value.singlePrice * (playid == '71' ? moreZhuShu : 1) * totalPeilv;
                      }

                    } else {

                      for (peilv of peilvArr){
                        totalPeilv += (Number.parseFloat || parseFloat)(peilv, 10);
                      }

                      for (let i = 0 ; i < dataSource.length; i ++){
                          let shopcarModel = dataSource[i];
                          totalPrice += shopcarModel.value.singlePrice * shopcarModel.value.zhushu * 1 * 1;
                          winPrice += shopcarModel.value.singlePrice * shopcarModel.value.zhushu * totalPeilv;
                      }
                    }
                }
        }
        else {

            for (let i = 0; i < dataSource.length; i++) {

                let shopcarModel = dataSource[i];
                totalPrice += shopcarModel.value.singlePrice * shopcarModel.value.zhushu * 1 * 1;
            }

            if (price == 0){
                winPrice = 0.00;
                totalPrice = 0.00;
            }
            else {

                let highPeiLv = 0;
                if (backupPeilv > 0) {
                  highPeiLv = backupPeilv;
                }
                else if (dataSource.length == 1){

                    if (playData.peilv.includes('|')){

                        highPeiLv = dataSource[0].value.peilv.split('|')[0];  //多个赔率的。
                        this.state.caculateType = 1;

                    }
                    else {
                        highPeiLv = dataSource[0].value.peilv;
                        this.state.caculateType = 0;
                    }

                }
                else {
                    //冒泡排序法拿到最高的peilv
                    for (let i = 0; i < dataSource.length - 1; i ++){
                        for (let j = 0; j< dataSource.length - i - 1; j++){
                            if ((Number.parseFloat || parseFloat)(dataSource[j].value.peilv, 10) > (Number.parseFloat || parseFloat)(dataSource[j + 1].value.peilv, 10)){
                                let temp = dataSource[j];
                                dataSource[j] = dataSource[j + 1];
                                dataSource[j + 1] = temp;
                            }
                        }
                    }

                    highPeiLv = dataSource[dataSource.length - 1].value.peilv;
                    this.state.caculateType = 0;

                }

                highPeiLv = (Number.parseFloat || parseFloat)(highPeiLv, 10);

                if (playData.wanfa == '三星和值'){

                    if (highPeiLv > 2){
                        highPeiLv += dxdsPeilv;  //选了大小单双之外的号码
                    }
                    else {
                        highPeiLv = dxdsPeilv;  //用户只选了大小单双四个中的号码
                    }
                }
                else if (playData.wanfa == '总前三特选'){
                    if(js_tag != 'pk10') {

                        highPeiLv = dxdsPeilv;
                    }
                }

                // console.log(moreZhuShu);

                winPrice = price * highPeiLv * moreZhuShu;  //逐行单注
            }

        }

        totalPrice = totalPrice.toFixed(2);
        winPrice = winPrice.toFixed(2);

        this.setState({
          subTotalPrice:totalPrice,
          willWinPrice:winPrice,
        })
    }


    //每个数据输入统一金额
    _resetSinglePrie(price){

       for (let shopModel  of this.state.ballSourceArr) {
          shopModel.value.singlePrice = (Number.parseFloat || parseFloat)(price, 10);
          shopModel.value.totalPrice = (Number.parseFloat || parseFloat)(price, 10) * shopModel.value.zhushu;
       }

       this._caculateSubTotal(this.state.ballSourceArr, this.state.currentPlayData, this.state.currentJsTag, (Number.parseFloat || parseFloat)(price, 10));
       this.setState({ballSourceArr:this.state.ballSourceArr});
    }

    render() {
      let iphoneX = SCREEN_HEIGHT == 812 ? true : false;
        return (
           <Modal
             visible={this.state.isShow}
             animationType={'slide'}
             transparent={true}
             onRequestClose={() => {}}
             >
              <View
                style = {{flex:1, backgroundColor:'rgba(0,0,0,0.2)', alignItems:'center', justifyContent:'center'}}
                >
                <View style = {{ marginTop:SCREEN_HEIGHT-300-Adaption.Height(300) - (iphoneX?34:0), borderRadius:5, backgroundColor:'#ffffff', height:300, width:SCREEN_WIDTH - 40}}>
                   <View style = {{flexDirection:'row', height:60, borderBottomWidth:1, borderColor:'#e1e2e3'}}>
                     <View style = {{flex:0.9, alignItems:'center'}}>
                        <Text style = {{color:'#171717', fontSize:Adaption.Font(18,15), marginTop:10}}>{this.state.currentGameName}</Text>
                        <Text style = {{color:'#919191', fontSize:Adaption.Font(17,14), marginTop:5}}>第 <Text style = {{color:'#e56664', fontSize: Adaption.Font(16,13)}}>{this.state.currentQiShu}</Text> 期</Text>
                     </View>
                     <TouchableOpacity style = {{flex:0.1, marginTop:10}} activeOpacity={1} onPress = {() => {this.setState({isShow:false}); this.props.closeClick ? this.props.closeClick() : null}}>
                       <Image style = {{width:20, height:20}} source = {require('../../img/ic_buyLotClose.png')}></Image>
                     </TouchableOpacity>
                   </View>
                   <FlatList
                       automaticallyAdjustContentInsets={false}
                       alwaysBounceHorizontal = {false}
                       data = {this.state.ballSourceArrOne ? this.state.ballSourceArrOne : null}
                       renderItem = {(item)=>this._renderItemBallNumberView(item)}>
                   </FlatList>
                   <TouchableOpacity activeOpacity={1} style = {{alignItems:'center', flexDirection:'row', height:40, backgroundColor:'#f6f6f7', marginTop:10}}
                    onPress = {()=> {
                      this.setState({
                        isShowKeyboardView:true,
                      })
                    }}
                   ><AllenFadeInView hasContent={this.state.moneyText.length <= 0 ?false:true}  style={{position:'absolute',left:10,width:2,height:24,top:8,backgroundColor:'#456FEE'}}>

                   </AllenFadeInView>
                     <Text style = {{color:this.state.moneyText.length <= 0 ? '#888' : '#000', marginLeft:15, fontSize:Adaption.Font(16,13), width:SCREEN_WIDTH - 40 - 60}}>
                      {this.state.moneyText.length <= 0 ? this.state.defaultMoneyText : this.state.moneyText}
                     </Text>
                     <Text style = {{color:'#171717', fontSize:Adaption.Font(17,14)}}>元</Text>
                   </TouchableOpacity>
                   <View style = {{height:35, flexDirection:'row', justifyContent:'center', marginLeft:8, marginTop:15}}>
                      <View style = {{flex:0.42}}>
                        <Text style = {{color:'#171717', fontSize:Adaption.Font(15,12)}}>共
                        <Text style = {{color:'#e56664', fontSize: Adaption.Font(15,12)}}>{this.state.zhuShuNum}</Text>注,
                        <Text style = {{color:'#e56664', fontSize: Adaption.Font(15,12)}}> {this.state.subTotalPrice}</Text>元
                        </Text>
                     </View>
                      <View style ={{flex:0.58}}>
                         <Text style = {{color:'#171717', fontSize:Adaption.Font(15,12)}}>预计最高中奖:
                           <Text adjustsFontSizeToFit={true} style = {{color:'#e56664', fontSize: Adaption.Font(15,12)}}>{this.state.willWinPrice}</Text>元
                         </Text>
                      </View>
                   </View>
                   <View style = {{flexDirection:'row', height:50, borderTopWidth:1, borderColor:'#e1e2e3'}}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress = {() =>  {
                          if (this.state.subTotalPrice <= 0) {
                            this.refs.Toast && this.refs.Toast.show('请输入购买金额！', 1000);
                          } else {
                            this.setState({isShow:false});
                            this.props.addToShopCarClick ? this.props.addToShopCarClick(this.state.ballSourceArr) : null;
                          }
                          }}
                        style = {{flex:0.49, justifyContent:'center', alignItems:'center'}}
                        >
                        <CusBaseText style = {{fontSize:Adaption.Font(18,15), color:'#78797a'}}>加入购物车</CusBaseText>
                      </TouchableOpacity>
                      <View style = {{height:50, backgroundColor:'lightgrey', width:1}}></View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress = {() => {
                          if (this.state.subTotalPrice <= 0) {
                            this.refs.Toast && this.refs.Toast.show('请输入购买金额！', 1000);
                          } else {
                            this.setState({isShow:false});
                            this.props.comformBuyClick ? this.props.comformBuyClick(this.state.ballSourceArr) : null
                          }
                        }}
                        style = {{flex:0.49, justifyContent:'center', alignItems:'center'}}>
                        <CusBaseText style = {{fontSize:Adaption.Font(18,15), color:'#0094e7'}}>确定购买</CusBaseText>
                      </TouchableOpacity>
                   </View>
                </View>
                  {this.state.isShowKeyboardView ? this._createKeyboardView() : <View style = {{backgroundColor:'rgba(0,0,0,0)', height:Adaption.Height(300), width:SCREEN_WIDTH}}></View>}
              </View>
              <Toast ref="Toast" position='bottom'/>
           </Modal>
        )
      }


      // 弹出的键盘
      _createKeyboardView() {
        return(
          <View style = {{marginTop:Adaption.Height(30), backgroundColor:'#bababf', height:Adaption.Height(270), width:SCREEN_WIDTH}}>
              <View style = {{backgroundColor:'#f6f6f7', flexDirection:'row', height:Adaption.Height(50)}}>
                <View style = {{justifyContent:'center', alignItems:'center', flex:1}}><Text style = {{fontSize:Adaption.Font(17, 15), color:'#999'}}>请输入购买金额</Text></View>
                <TouchableOpacity activeOpacity={1}
                style = {{justifyContent:'center', alignItems:'center', height:Adaption.Height(50), position:'absolute', top:0, left:SCREEN_WIDTH - Adaption.Width(70)}}
                onPress = {()=> {
                  this.setState({
                    isShowKeyboardView: !this.state.isShowKeyboardView,
                  })
                }}
                >
                  <Text allowFontScaling={false} style = {{fontSize:Adaption.Font(17, 15), color:'#000', fontWeight:'900'}}>完成</Text>
                </TouchableOpacity>
              </View>
              <FlatList 
                automaticallyAdjustContentInsets={false}
                alwaysBounceHorizontal = {false}
                data = {this._keyboardTitle()}
                renderItem = {(item)=>this._renderItemView(item)}
                horizontal = {false}
                numColumns = {3}
                scrollEnabled={false}
                >
              </FlatList>
          </View>
        )
      }

      _renderItemView(item) {
        return(
          <TouchableOpacity activeOpacity={0.5} style = {{
            backgroundColor:(item.index == 9 || item.index == 11) ? 'rgba(0,0,0,0)' : '#fff', width:SCREEN_WIDTH * 0.31, height:Adaption.Height(47), justifyContent:'center', alignItems:'center',
            marginLeft:(SCREEN_WIDTH * 0.07)/4, marginTop:Adaption.Height(6.4), borderRadius:5}}
              onPress = {()=> {

                // 限制输入长度为7
                if (this.state.moneyText.length >= 7 && item.index != 11) {
                  return;
                }

                // 限制只有输入一位小数
                if (this.state.moneyText.includes('.')) {
                  let arr = this.state.moneyText.split('.');
                  let lastStr = arr[1];
                  if (lastStr.length >=1 && item.index != 11) {
                    return;
                  }
                }

                let tempMoneyText = this.state.moneyText;
                if (item.index == 9) {
                  // 小数点。
                  // 已经输入了小数点就不能再输入了。 限制长度为6后不能再输入小数点
                  if (!this.state.moneyText.includes('.') && this.state.moneyText.length < 6 && this.state.moneyText.length > 0) {
                    tempMoneyText = this.state.moneyText + item.item.tit;
                  } else {
                    return;
                  }
                } else if (item.index == 11) {
                  // 删除
                  if (this.state.moneyText.length > 0) {
                    tempMoneyText = this.state.moneyText.substr(0, this.state.moneyText.length-1);
                  }
                } else {
                  if (this.state.moneyText.length == 1 && this.state.moneyText == '0' && item.index == 10) {
                    return;
                  } else {
                    if (this.state.moneyText == '0') {
                      tempMoneyText = `${item.item.tit}`;
                    } else {
                      tempMoneyText = this.state.moneyText + item.item.tit;
                    }
                  }
                }

                this.setState({
                    moneyText: tempMoneyText,
                })
                this._resetSinglePrie(tempMoneyText == '' ? 0 : tempMoneyText);

              }}>
            {item.index == 11 
            ? <Image resizeMode={'contain'} style={{width:Adaption.Width(40),height:Adaption.Width(40)}} source={require('../../img/ic_keyboardDelete.png')}/>
            : <Text allowFontScaling={false} style = {{fontSize:Adaption.Font(22, 19), color:'#000'}}>{item.item.tit}</Text>
            }
          </TouchableOpacity>
        )
      }

      // 键盘显示的文本
      _keyboardTitle() {
        var array = [];
        for (let i = 1; i <= 12; i++) {
          if (i == 10) {
            array.push({key:i, tit:'.'});
          } else if (i == 11) {
            array.push({key:i, tit:'0'});
          } else if (i == 12) {
            array.push({key:i, tit:'delete'});
          } else {
            array.push({key:i, tit:i});
          }
        }
        return array;
      }

      

      //创建号码视图
      _renderItemBallNumberView(item) {

        return (<View  style = {{marginTop:10 , width:SCREEN_WIDTH - 40,  justifyContent:'center', alignItems:'center'}}>
              <Text style={{color: '#919191', fontSize: Adaption.Font(16, 13)}}>{item.item.wanFaNameStr}</Text>
          </View>)

      }

}


// AllenFadeInView.js


class AllenFadeInView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fadeAnim: new Animated.Value(0),          // 透明度初始值设为0
            isStop:false,
            hasContent:props.hasContent,
            hasStart:true
        };
    }
    componentDidMount() {
        this.startAnimation();                             // 开始执行动画
    }

    startAnimation(){
        // console.log("还敢执行吗");
        if(this.state.isStop||this.state.hasContent){
            this.state.hasStart = false;
            return;
        }
        this.state.fadeAnim.setValue(0);
        Animated.timing(                            // 随时间变化而执行的动画类型
            this.state.fadeAnim,                      // 动画中的变量值
            {
                duration: 1000,
                toValue: 1,                             // 透明度最终变为1，即完全不透明
            }
        ).start(()=> this.startAnimation());
    }
    render() {
        return !this.state.hidden ?(
            <Animated.View                            // 可动画化的视图组件
                style={{
                    ...this.props.style,
                    opacity: this.state.fadeAnim,          // 将透明度指定为动画变量值
                }}
            >
                {this.props.children}
            </Animated.View>
        ):null;
    }

    componentWillUnmount() {

        this.state.isStop = true;

    }


    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps",nextProps);
        this.state.hasContent = nextProps.hasContent;
        this.state.hidden =  nextProps.hasContent;

        if(!this.state.hidden&&!this.state.hasStart){

            this.state.hasStart = true;
            this.startAnimation();
        }
    }


}

const styles = StyleSheet.create({

  //图片样式
  newBottomImage:{
    width:Adaption.Width(24),
    height:Adaption.Width(24),
    marginLeft:10,
  },

  //文字颜色
   newBottomText:{
     color:'white',
     fontSize:Adaption.Font(18,16),
     marginLeft:5
   },
})
