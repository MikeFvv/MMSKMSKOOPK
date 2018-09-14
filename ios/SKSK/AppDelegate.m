/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import "AbcMMSDK.h"
#import "IQKeyboardManager.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  NSURL *jsCodeLocation;
//
//
//    #ifdef DEBUG
//        jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//    #else
//        jsCodeLocation = [CodePush bundleURL];
//    #endif
//
//  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
//                                                      moduleName:@"SKSK"
//                                               initialProperties:nil
//                                                   launchOptions:launchOptions];
//  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
//
//  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//  UIViewController *rootViewController = [UIViewController new];
//  rootViewController.view = rootView;
//  self.window.rootViewController = rootViewController;
//  [self.window makeKeyAndVisible];
//  return YES;
  
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  
  // 这个键盘第三方需要添加一下，彩票需要使用 注意：如果壳的代码不需要这个第三方， 可以自己判断一下，只要调用了这个就可以
  [self configureBoardManager];
  
  // 这个是项目是Demo ,仅作为参考 ， 集成需要按照文档来
  // 1. SDK没有推送功能，需要自己写， 需要自己调用推送功能。 也需要测试好，推送Key写死在代码
  // 2. libAbcMMSDK-Debug-5.6.a 是测试模拟器使用,   libAbcMMSDK-5.6.a 上架和真机必须使用这个
  // 3. client1.sg04.com  这个是测试用的域名， 里面的彩票界面不用管是谁的，只要看到彩票界面就OK
  // 4. switchRoute 上架的时候这个参数必须改成 0
  // 5. 想测试更新彩票  可以在项目里面 Build 改为 0.0.1   上架时不能为 0.0.1， 可以随意写
  [[AbcMMSDK sharedManager] initMMSDKLaunchOptions:launchOptions window:self.window rootController:[self rootController] switchRoute:1 userUrl:@"client1.sg04.com" dateStr:@"2017-08-01"];
  
  [self.window makeKeyAndVisible];
  return YES;
  
}

- (UIViewController *)rootController {
  UIViewController *vc = [[UIViewController alloc] init];
  vc.view.backgroundColor = [UIColor greenColor];
  return vc;
}

// 键盘第三方
-(void)configureBoardManager
{
  IQKeyboardManager *manager = [IQKeyboardManager sharedManager];
  manager.enable = YES;
  manager.shouldResignOnTouchOutside = YES;
  manager.keyboardDistanceFromTextField = 10;
  manager.enableAutoToolbar = YES;
}


@end
