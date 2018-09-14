import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
    Platform,
    Modal,
    TextInput,
    NetInfo,
} from 'react-native';
import React, { Component } from 'react';

import CodePush from 'react-native-code-push';

import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';


import './component/Global'
import BaseNetwork from './component/BaseNetwork'
import GetSetStorge from './component/GetSetStorge';
import SwitchURLRoot from "./component/TestSwitchURL";

import App from './App.js';
import LocalImgs from './res/img';


let { height, width } = Dimensions.get('window');

if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        error: () => {
        },
    };
}



export default class Root extends Component {

    constructor(props) {
        super(props);
        this.checkUpdate = this.checkUpdate.bind(this)
        this.state = {
            finished: false,
            finishedPage: false,
            syncMessage: '正在检测更新',
            lauchImgUri: '',
            type: 0,
            isShowEnterUrlPage: false,
            waiting: false,
            enterMessage: '',
        };
        if (Platform.OS === 'ios') {

            if (!GLOBALisRNParameters) {
                global.GlobalRNmmStatus = this.props['mmStatus'];
                if (global.GlobalRNmmStatus == 5) {
                    SwitchRoute = 0;
                } else {
                    SwitchRoute = 1;
                }
            }

        }
        // 1 避免过快跳转到 Conversion页面  2 延缓进入主界面 等待数据加载
        this.time = "";
        this.isLoadData = false;
        this.isUpdate = false;
        global.LaunchImageUrl = "";
        this.requestNum = 5;

        this.lineIPIndex1 = 0;
        this.isLineSwitch = false;
        this.LaunchImageUrlArray = [global.LaunchImageUrl];
        this.NewOldVersion = false;   // true 新版  false 旧的方式
        this.plistIndex = 0;
        this.domainNameMm = '';
        this.baseURLStr = '';
        this.firstMrak = false;
        this.lineIPRequestMax = 10;
        this.lineIPArray = [];

    }

    componentWillMount() {

        if (GLOBALisRNParameters == false) {

            global.RouterIndex = this.props['router'];
            let codeURL = this.props['mmUrl'];
            var arrURL = codeURL.split("|");
            if (arrURL.length > 1) {
                global.invCode = arrURL[2];
            }
            this.baseURLStr = arrURL[0];
            this.domainNameMm = arrURL[0];
            global.GLOBALmmRainbow = this.props['mmRainbow'];

        }

        // ios才需要查询
        this._getLauchImg();
        this._delayedOpen();
        this.checkUpdate()
    }

    _getLauchImg() {

        //获取启动图
        AsyncStorage.getItem("welcomeImg", (error, result) => {
            if (!error) {
                if (result !== '' && result !== null) {
                    global.LaunchImageUrl = result;
                    this.setState({
                        lauchImgUri: result,
                    });
                }
            }
        });

    }


    _getWelcomeImg() {

        let params = new FormData();
        params.append("ac", "getApiWelcome");
        var promise = BaseNetwork.sendNetworkRequest(params);
        promise
            .then(response => {
                //请求成功
                if (response.msg == 0) {
                    let welcomeUrl = '';
                    let imgarray = response.data;
                    if (imgarray && imgarray.length > 0) {
                        for (let i = 0; i < imgarray.length; i++) {
                            let img = imgarray[0];
                            let imgurl = img.banner;
                            welcomeUrl = imgurl;
                        }
                        var keyName = 'welcomeImg';
                        var keyValue = welcomeUrl;
                        AsyncStorage.setItem(keyName, keyValue, function (errs) {});
                    }
                } else {
                    console.log(" 请求引导图片失败");
                }
            })
            .catch(err => {
                console.log("  err: " + err.toString());
            });
    }

    componentDidMount() {
        //监听网络链接变化事件
        NetInfo.isConnected.addEventListener('connectionChange', this._handleIsConnectedChange);
    }

    componentWillUnmount() {
        //移除监听
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleIsConnectedChange);

        if (typeof (this.subscription4) == 'object') {
            this.subscription4 && this.subscription4.remove();
        }
    }


    // 网络监听方法
    _handleIsConnectedChange = (isConnected) => {

        if (!isConnected) {
            global.isFirstNetwork = false;

            if (this.state.finishedPage == false) {
                this.isLoadData = true;
                this.isUpdate = true;
                // 进入App
                this.inAppPage()

                this.setState({
                    finishedPage: true,
                });
            }
        } else {
            if (global.GlobalRNmmStatus == 1 || global.GlobalRNmmStatus >= 5) {
                this.checkUpdate()
            }

        }
    }


    _setLauchImg() {
        //缓存启动图片的uri,延时是为了避免请求并发
        setTimeout(() => {
            this._getWelcomeImg();
        }, 3000);
    }

    // 获取域名请求
    _getDomainNameRequest() {
        if (SwitchRoute == 0) {  // 自动判断=>真页面或者输入域名页面
            GlobalFixed = true;
            this._getEnterUrlData();
        } else if (SwitchRoute == 1) {  // 真页面

            if (Platform.OS === 'ios') {
                if (GLOBALisRNParameters) {
                    let url = SwitchURLRoot(SwitchURLIndex);
                    this.domainNameMm = url;

                    this._getSysInfo(url);
                    // this._getByInterfaceReturnDomainName(url);
                    return;
                }

                if (global.GlobalRNmmStatus == 1 || (this.baseURLStr && this.baseURLStr.length > 0)) {

                    if (global.isFirstNetwork == false) {
                        return;
                    }
                    this._getByInterfaceReturnDomainName(this.baseURLStr);
                } else {
                    this._switchURLRequest();
                }

            }

        } else {   // 马甲页面  or  用户输入域名页面
            this.isLoadData = true;
            // 进入App
            this.inAppPage()
        }
    }

    // 获取业主的URL
    _switchURLRequest() {

        if (Platform.OS === 'ios') {

            let url = SwitchURLRoot(SwitchURLIndex);
            this.domainNameMm = url;
            // this._getSysInfo(url);
            this._getByInterfaceReturnDomainName(url);

        }

    }


    // 获取用户本地存储的RUL ， 没有就跳转到输入域名页面
    _getEnterUrlData() {
        let key = 'USERBASEURL';
        AsyncStorage.getItem(key, (error, result) => {
            if (!error) {
                if (result !== '' && result !== null) {

                    let userEnterURL = JSON.parse(result);


                    // let userURLOk = this._replaceOldDomainName(userURL);
                    // 需要每次启动更新这里的信息 ，里面包含邀请码设置
                    // this._getSysInfo(userURLOk);
                    this._getByInterfaceReturnDomainName(userEnterURL)

                } else {
                    this.setState({
                        isShowEnterUrlPage: true,
                    });
                }
            } else {
                this.setState({
                    isShowEnterUrlPage: true,
                });
            }
        });

    }


    // 获取用户本地存储的RUL 和 信息
    _getLocallySaveUrlData() {

        //获取系统配置信息的key, 比如图片拼接基本路径,是否填写邀请码，等等
        let systemKey = 'SysInfo';
        AsyncStorage.getItem(systemKey, (error, result) => {
            if (!error) {
                if (result !== '' && result !== null) {

                    let userData = JSON.parse(result);
                    GlobalConfig.userData = userData;
                }
            }
        });

        let key = 'LINEURL';
        AsyncStorage.getItem(key, (error, result) => {
            if (!error) {
                if (result !== '' && result !== null) {
                    let userURL = JSON.parse(result);
                    GlobalConfig.baseURL = userURL;  // 保存url
                    this.setState({ syncMessage: '正在加载数据...' })
                } else {
                    this.isLoadData = true;
                    // 进入App
                    this.inAppPage()
                }
            } else {
                this.isLoadData = true;
                // 进入App
                this.inAppPage()
            }
        });

    }

    isContains(str, substr) {
        return str.indexOf(substr) >= 0;
    }


    // 验证 url 是否正确
    _getSysInfo(userEnterUrl) {

        var arrHttp = userEnterUrl.split("|");

        if (arrHttp.length > 1) {
            global.invCode = arrHttp[2];
        }
        userEnterUrl = arrHttp[0];

        setTimeout(() => {
            if (!this.isLoadData) {
                this.setState({ syncMessage: '正在重试获取系统数据, 请耐心等待...' })
            }
        }, 5000)

        //请求参数
        let params = new FormData();
        params.append("ac", "getSysInfo");
        // params.append("enom", userEnterUrl);
        params.append("enom", this.domainNameMm ? this.domainNameMm : userEnterUrl);


        let baseURL = '';
        // 用户输入带http:// 或者不带http:// 都可以
        if (!this.isContains(userEnterUrl, 'http')) {
            baseURL = 'http://' + userEnterUrl;
        } else {
            baseURL = userEnterUrl;
        }
        let phoneApiUrl = baseURL + '/request';
        var promise = GlobalBaseNetwork.sendNetworkRequest(params, null, phoneApiUrl);
        promise
            .then(response => {
                if (response.msg == 0) {

                    // Alert.alert('验证成功');

                    if (this.state.isShowEnterUrlPage == true) {
                        this.setState({
                            waiting: true,
                            enterMessage: '验证通过， 请等待数据加载...'
                        })
                    }

                    GetSetStorge.setStorgeAsync('LINEURL', JSON.stringify(baseURL))
                    GetSetStorge.setStorgeAsync('SysInfo', JSON.stringify(response.data))

                    if (this.NewOldVersion == false) {
    

                        GlobalConfig.baseURL = baseURL;  // 保存url
                        this.lineIPArray.splice(0, 0, baseURL);
                        GlobalConfig.lineIPArray.splice(0, 0, baseURL);
                    }

                    GlobalConfig.userData = response.data;  // 保存系统信息


                    GetSetStorge.setStorgeAsync('iSNeedInviteCode', JSON.stringify(response.data.bind_param));

                    this.setState({ syncMessage: '正在加载数据...' })
                    // DataRequest.init(true, rootCallBack = (data) => {
                        this.getDataRequestReturnData(true)
                    // })

                } else if (response.msg == 45000) {

                    if (this.NewOldVersion == false) {
                        GlobalConfig.baseURL = baseURL;  // 保存url
                    }

                    GlobalConfig.userData = response.data;  // 保存系统信息
                    if (response.data.etime != undefined) {
                        SystemTime = response.data.btime + '—' + response.data.etime;
                    }
                    isSystemMaintain = true;

                    this.getDataRequestReturnData(false)

                } else {
                    if (this.state.isShowEnterUrlPage == true) {
                        this.setState({
                            enterMessage: ''
                        })
                        Alert.alert('验证网址没有通过,请重新输入');
                    } else {

                        this.isLineSwitch = true;
                        // 请求少于lineIPRequestMax次 继续请求
                        if (this.lineIPIndex1 < this.lineIPRequestMax) {
                            this.lineIPIndex1++;
                            this.setState({ syncMessage: '正在第' + this.lineIPIndex1 + '次切换线路' })
                            let resultIndex = this.lineIPIndex1 % this.lineIPArray.length;
                            this._getSysInfo(this.lineIPArray[resultIndex]);
                        } else {
                            this.lineIPIndex1 = 0;
                            this._getLocallySaveUrlData();
                        }
                    }
                }
            })
            .catch(err => {
                {
                    if (this.state.isShowEnterUrlPage == true) {
                        this.setState({
                            enterMessage: ''
                        })
                        if (err.message = 'Network request failed') {
                            Alert.alert('请求失败');
                        } else {
                            Alert.alert(err.message ? err.message : '请求失败');
                        }
                    } else {

                        this.isLineSwitch = true;
                        // 请求少于GlobalLineIPRequestMax次 继续请求
                        if (this.lineIPIndex1 < this.lineIPRequestMax) {
                            this.lineIPIndex1++;
                            this.setState({ syncMessage: '正在第' + this.lineIPIndex1 + '次切换线路' })
                            let resultIndex = this.lineIPIndex1 % this.lineIPArray.length;
                            this._getSysInfo(this.lineIPArray[resultIndex]);
                        } else {
                            this.lineIPIndex1 = 0;
                            this._getLocallySaveUrlData();
                        }

                    }
                }
            });
    }


    //接收的数据
    getDataRequestReturnData = (data) => {
        this.setState({ waiting: false, syncMessage: '正在进入..' })
        //this.setState({waiting: false})

        this._setLauchImg();

        this.isLoadData = true;
        // 进入App
        this.inAppPage()
    }


    codePushStatusDidChange(syncStatus) {
        let isStart = false
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.setState({
                    syncMessage: '正在检查新配置'
                })
                break
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                break
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                break
            case CodePush.SyncStatus.UP_TO_DATE:
                this.setState({
                    syncMessage: '正在加载配置'
                })
                isStart = true;
                break
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                this.setState({
                    syncMessage: '应用更新完成,重启中...'
                })
                break
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                this.setState({
                    syncMessage: "应用更新出错,请退出程序重新启动!"
                });
                isStart = true;
                break;
        }

        isStart ? this.isUpdate = true : this.isUpdate = false;
        isStart ? this.inAppPage() : false;
        // isStart ? null : this._delayedOpen();
    }

    // 经过最大延时后，不管有没有数据都需要进入
    _delayedOpen() {
        setTimeout(() => {
            if (!this.isLoadData) {
                if (this.state.isShowEnterUrlPage == false) {
                    this.isLoadData = true;
                }

                this.setState({
                    syncMessage: "数据请求超时,正在进入"
                });
                this.inAppPage();
            }

        }, 20000)

        setTimeout(() => {

            if (!this.isUpdate) {
                this.isUpdate = true;
                this.setState({
                    syncMessage: "网络太慢, 请退出程序，重新启动"
                });
                this.inAppPage();
            }

        }, 150000)
    }

    inAppPage() {

        if (this.isUpdate == true && this.firstMrak == false) {
            this.firstMrak = true;
            this._getDomainNameRequest();
        }

        if (this.isLoadData == true && this.isUpdate == true) {

            if (this.state.finishedPage)
                return;

            if (this.state.isShowEnterUrlPage) {
                this.setState({
                    isShowEnterUrlPage: false,
                    finished: true,
                });
            } else {
                this.setState({
                    finished: true,
                });
            }

            setTimeout(() => {
                this.setState({
                    finishedPage: true,
                });
            }, 1000)

        }
    }


    //下载资源包
    codePushDownloadDidProgress(progress) {
        this.setState({
            syncMessage: `正在下载新配置${(progress.receivedBytes / progress.totalBytes * 100.001).toFixed(2)}%`
        })
    }


    /** U更新被静默下载，并在重新启动（推荐） */
    // 后台更新
    checkUpdate() {
        CodePush.checkForUpdate().then((update) => {

            //console.log('update', update)
            if (!update) {

                if (this.isLineSwitch == false) {
                    this.setState({ syncMessage: '当前是最新配置' })
                }

                this.isUpdate = true;

                this.inAppPage();
            } else {
                CodePush.sync(
                    { installMode: CodePush.InstallMode.IMMEDIATE },
                    this.codePushStatusDidChange.bind(this),
                    this.codePushDownloadDidProgress.bind(this)
                ).catch((e) => {
                    console.log(e)
                    this.isUpdate = true;
                    this.inAppPage();
                })
            }
        }).catch((err) => {
            // console.log(err)
            this.isUpdate = true;
            this.inAppPage();
        })
        CodePush.notifyAppReady()
    }

    _onEnterDomainNamViewClose() {
        this.setState({ isShowEnterUrlPage: false })
    }


    // 解码方法
    // textCode 加密字符串
    // pass  解密字符
    _decode(textCode, pass) {

        if (!textCode) {
            return;
        }

        let result = '';
        let codes = [];

        for (let i = 0; i < pass.length; i++) {
            let objStr = parseInt(pass.charCodeAt(i));  //返回指定位置的Unicode编码
            codes.push(objStr);
        }

        //获取两个十六进制，并转换为十进制
        for (let i = 0; i < textCode.length; i += 2) {

            let hex = parseInt(textCode.substring(i, i + 2), 16);
            let inte = parseInt(hex.toString(10), 10);
            for (let j = pass.length; j > 0; j--) {
                let val = inte - (codes[j - 1]) * j;
                if (val < 0) {
                    inte = 256 - (Math.abs(val) % 256);
                } else {
                    inte = val % 256;
                }
            }
            result += String.fromCharCode(inte);//转换成ascii，并拼接到字符串中
        }
        return result;

    }

    //  点击按钮确认输入域名
    _userEnterConfirmBtn() {

        if (this.userEnterUrl === undefined || this.userEnterUrl === '' || this.userEnterUrl === null) {
            Alert.alert('请输入域名！');
        } else {
            this.setState({ enterMessage: '正在验证域名, 请等待...' })
            CPYuMingShuRu = 1;
            this.userEnterUrl = this._mmTrim(this.userEnterUrl);
            // 替换域名
            this._replaceDomainName();
            this._getByInterfaceReturnDomainName(this.userEnterUrl);
        }
    }

    _mmTrim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }


    _getByInterfaceReturnDomainName(urlPath) {

        let arrPlist = ['http://plist.aotubangfen.com', 'http://plist.gotoguxiang.com', 'http://plist.xmfn14.com'];

        let rmIndex = Math.floor(Math.random() * arrPlist.length);


        var arrHttpMM = urlPath.split("http://");
        let noHttpStr;

        if (arrHttpMM.length > 1) {
            noHttpStr = arrHttpMM[1];
        } else {
            noHttpStr = arrHttpMM[0];
        }
        urlPath = noHttpStr;

        // 正式站  plistIndex
        let urlPathPlist = arrPlist[rmIndex] + '/index.php/AppApi/request?ac=getUrlInfo&client_type=3&key=d20a1bf73c288b4ad4ddc8eb3fc59274704a0495&domain=' + urlPath;


        let messString = '正在重试获取域名, 请耐心等待...' + this.requestNum;
        var request = new XMLHttpRequest();
        var isTimeOut = false;

        var timer = setTimeout(() => {
            isTimeOut = true;
            request.abort();
            this.isLoadData = true;
            this.inAppPage();
        }, 20000);

        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }
            if (isTimeOut) return;
            clearTimeout(timer);
            if (request.status === 200) {

                var responseData = JSON.parse(request.responseText);

                if (!responseData['data']) {
                    this.NewOldVersion = false;
                    this._getSysInfo(urlPath);
                    return;
                }

                let decodeStr = JSON.parse(this._decode(responseData['data'], 'bxvip588'));

                if (!decodeStr) {
                    this.NewOldVersion = false;
                    this._getSysInfo(urlPath);
                    return;
                }
                this.NewOldVersion = true;

                let urlsStr = decodeStr['url'];
                var arrUrl = urlsStr.split(";");

                // let versionJudgment = decodeStr['version'];

                let enomStr = decodeStr['enom'];

                if (enomStr.length > 0) {
                    this.domainNameMm = enomStr;
                    GetSetStorge.setStorgeAsync('USERBASEURL', JSON.stringify(enomStr))
                }

                if (arrUrl.length > 0) {

                    let AddHttpIPArry = [];

                    for (let index = 0; index < arrUrl.length; index++) {
                        // 用户输入带http:// 或者不带http:// 都可以
                        let ipUrl = arrUrl[index];
                        if (!this.isContains(ipUrl, 'http')) {
                            AddHttpIPArry.push('http://' + ipUrl);
                        } else {
                            AddHttpIPArry.push(ipUrl);
                        }
                    }

                    this.lineIPArray = AddHttpIPArry;
                    GlobalConfig.lineIPArray = AddHttpIPArry;

                    let resultIndex = Math.floor(Math.random() * AddHttpIPArry.length);
                    GlobalConfig.baseURL = AddHttpIPArry[resultIndex];
                    global.GlobalLineIPIndex = resultIndex;

                    this._getSysInfo(arrUrl[0]);

                } else {
                    this.isLoadData = true;
                    this.inAppPage()
                }

            } else {

                this.plistIndex++;
                if (this.plistIndex > arrPlist.length - 1) {
                    this.plistIndex = 0;
                    this._getLocallySaveUrlData();
                } else {
                    this.setState({ syncMessage: messString })
                    this._getByInterfaceReturnDomainName(urlPath)
                }
            }
        };
        request.open('GET', urlPathPlist);
        request.send();
    }

    // 输入域名页面
    _isShowEnterDomainNamView() {
        let versionIDStr;
        if (global.GLOBALmmRainbow && global.GLOBALmmRainbow['id']) {
            versionIDStr = VersionNum + '  ID:' + global.GLOBALmmRainbow['id'];
        } else {
            versionIDStr = VersionNum;
        }

        return (

            <View style={styles.eNameViewContainer}>
                <ImageBackground style={styles.eNameImageStyle}
                    source={LocalImgs.ic_bg_urlback}
                >

                    <View style={styles.enter_urlbg_container}>
                        <Text style={styles.enterMessageStyle}>{this.state.enterMessage || ""}</Text>

                        <View style={styles.enter_container}>
                            <View style={styles.url_TitleViewStyle}>
                                <Text style={styles.eNametitleStyle}>域名</Text>
                            </View>
                            <TextInput
                                autoCapitalize='none'
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                style={styles.eNameInputTextStyle}
                                placeholder='请输入域名'
                                onChangeText={(text) => this.userEnterUrl = text}
                            />
                        </View>


                        <TouchableOpacity
                            disabled={this.state.waiting}
                            style={styles.confirmBtnStyle}
                            activeOpacity={0.5}
                            onPress={() => {
                                this._userEnterConfirmBtn();
                            }}
                        >
                            <ImageBackground style={styles.urlbtn_imgStyle}
                                source={LocalImgs.ic_urlbtn}>

                                <Text style={styles.confirmBtnText}>确认</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
                <Text style={styles.enter_VersionNumStyle}>{versionIDStr}</Text>
            </View>
        )
    }

    //需要Base64见：http://www.webtoolkit.info/javascript-base64.html  
    _make_base_auth(user, password) {
        var tok = user + ':' + pass;
        var hash = Base64.encode(tok);
        return "Basic " + hash;
    }


    // 获取地区 判断IP 地址
    _getIPArea() {

        let appcode = "078f9af041fa4d1684b1f5d7f10d2b51";
        let host = "https://dm-81.data.aliyun.com";
        let path = "/rest/160601/ip/getIpInfo.json";
        let method = "GET";
        let querys = "?ip=103.17.198.17";
        let url = host + path + querys;

        let auth = 'APPCODE ' + appcode;
        var request = new XMLHttpRequest();
        var isTimeOut = false;

        var timer = setTimeout(() => {
            isTimeOut = true;
            request.abort();
            this.isLoadData = true;
            this.inAppPage();
        }, 20000);

        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }
            if (isTimeOut) return;
            clearTimeout(timer);

            if (request.status === 200) {
                var responseData = JSON.parse(request.responseText);
                console.log('结果=====' + responseData);
            } else {

            }
        };
        request.open(method, url);
        request.setRequestHeader('Authorization', auth);
        request.send();

    }



    render() {

        let versionIDStr;
        if (global.GLOBALmmRainbow && global.GLOBALmmRainbow['id']) {
            versionIDStr = VersionNum + '  ID:' + global.GLOBALmmRainbow['id'];
        } else {
            versionIDStr = VersionNum;
        }

        return <View style={styles.container}>

            {this.state.finished ? <App /> : null}
            {
                this.state.finishedPage ? null :
                    (this.state.lauchImgUri == '' ? (
                        <ImageBackground style={styles.imageBackStyle}
                            source={LocalImgs.ic_public_launchImage}>
                            <Text style={styles.messages}>{'' + this.state.syncMessage || ""}</Text>

                            <Text style={styles.VersionNumCodeStyle}>{versionIDStr}</Text>

                        </ImageBackground>
                    ) : (
                            <View style={styles.imageBackStyle}>

                                <ImageCacheProvider
                                    urlsToPreload={this.LaunchImageUrlArray}
                                    onPreloadComplete={() => console.log('hey there')}>
                                    <CachedImage source={{ uri: this.state.lauchImgUri }} style={styles.CachedImageStyle} />
                                </ImageCacheProvider>


                                <Text style={styles.messages}>{'' + this.state.syncMessage || ""}</Text>
                                <Text style={styles.VersionNumCodeStyle}>{versionIDStr}</Text>
                            </View>

                        )
                    )
            }


            <Modal
                visible={this.state.isShowEnterUrlPage}
                //显示是的动画默认none
                //从下面向上滑动slide
                //慢慢显示fade
                animationType={'none'}
                //是否透明默认是不透明 false
                transparent={true}
                //关闭时调用
                onRequestClose={() => this._onEnterDomainNamViewClose()}
            >{this._isShowEnterDomainNamView()}</Modal>

        </View>


    }



    // iOS 暂用替代方法
    _iOSXMLHttpRequest(urlPath) {
        let messString = '正在重试获取域名, 请耐心等待...' + this.requestNum;
        var request = new XMLHttpRequest();
        var isTimeOut = false;
        var timer = setTimeout(() => {
            isTimeOut = true;
            request.abort();
            this.isLoadData = true;
            this.inAppPage();
        }, 20000);
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }
            if (isTimeOut) return;
            clearTimeout(timer);
            if (request.status === 200) {
                console.log('success', request.responseText);
                let httpUrl = this._decode(request.responseText, 'bxvip588');
                var arr = httpUrl.split("|");//http://bxvip588.com=355656|0
                // console.log(httpUrl);
                if (arr.length > 0) {
                    if (arr.length >= 4) {
                        global.invCode = arr[3];
                    }
                    this._getSysInfo(arr[0]);
                } else {
                    this.isLoadData = true;
                    this.inAppPage()
                }
            } else {
                if (this.requestNum > 0) {
                    this.setState({ syncMessage: messString })
                    this.requestNum--;
                    this._iOSXMLHttpRequest(urlPath)
                } else {
                    this._getLocallySaveUrlData();
                }
            }
        };
        request.open('GET', urlPath);
        request.send();
    }



    // 获取http 原生fetch 
    _xMLHttpRequest(urlPath) {

        let messString = '正在重试获取域名, 请耐心等待...' + this.requestNum;

        console.log('urlPath--->', urlPath);

        fetch(urlPath, {
            method: 'GET',
            timeout: 15,
        })
            .then((response) => {

                if (response.status === 200) {
                    let httpUrl = this._decode(response._bodyText, 'bxvip588');
                    var arr = httpUrl.split("|");//http://bxvip588.com=355656|0|rcode|12|ip|12.12.121.2;12.132.12.1
                    if (arr.length > 0) {

                        if (arr.length >= 4) {
                            global.invCode = arr[3];
                        }
                        this._getSysInfo(arr[0]);
                    } else {
                        this.isLoadData = true;
                        // 进入App
                        this.inAppPage()
                    }

                } else {
                    if (this.requestNum > 0) {
                        this.setState({ syncMessage: messString })
                        this.requestNum--;
                        this._xMLHttpRequest(urlPath)
                    } else {
                        this._getLocallySaveUrlData();
                    }
                }
            })
            .catch((err) => {

                if (this.requestNum > 0) {
                    this.setState({ syncMessage: messString })
                    this.requestNum--;
                    this._xMLHttpRequest(urlPath)
                } else {
                    this._getLocallySaveUrlData();
                }
            });
    }


};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackStyle: {
        position: 'absolute',
        flexDirection: "column",
        alignItems: 'center',
        top: 0,
        left: 0,
        width: width,
        height: height,
    },

    CachedImageStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
    },

    messages: {
        position: 'absolute',
        marginTop: height - 50,
        textAlign: "center",
        color: '#515151',
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    VersionNumCodeStyle: {
        position: 'absolute',
        marginTop: height - 30,
        textAlign: "center",
        color: '#515151',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fontSize: 12,
    },

    enter_VersionNumStyle: {
        position: 'absolute',
        marginTop: height - 30,
        textAlign: "center",
        width: SCREEN_WIDTH,
        color: '#515151',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fontSize: 14,
    },


    // 输入域名
    eNameViewContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    eNameImageStyle: {
        position: 'absolute',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    enter_urlbg_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -120,
    },

    enterMessageStyle: {
        height: 25,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fontSize: 20,
        color: 'blue',
        marginTop: 60,
    },

    enter_container: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        width: width - 30 * 2,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dfdfea',
    },
    url_TitleViewStyle: {
        width: 70,
        borderRightWidth: 1,
        borderColor: '#dfdfea',
        height: 49,
        justifyContent: 'center',
        alignItems: 'center',
    },

    eNametitleStyle: {
        color: '#474849',
        fontSize: 16,
    },
    eNameInputTextStyle: {
        flex: 1,
        height: 32,
        paddingLeft: 5,
        textAlign: 'left',
        color: 'black',
        fontSize: 14,
        padding: 0,
        marginLeft: 5,
    },

    // 例：详情
    remarks_style: {},
    remarks_text: {
        color: '#ebebeb',
    },

    confirmBtnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },

    urlbtn_imgStyle: {
        width: 462 / 2,
        height: 99 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    confirmBtnText: {
        color: '#010a00',
        fontSize: 20,
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },


});

console.disableYellowBox = true;