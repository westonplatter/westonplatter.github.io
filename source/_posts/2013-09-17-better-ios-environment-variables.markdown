---
layout: post
title: "Better iOS Environment Variables"
date: 2013-09-17 14:54
comments: true
categories: ios solutions
published: false
---

After crossing into iOS development after 18 months of intermediate/complex Rails work, I wanted a __extremely simple__ way to reference iOS app specific constants and variables. I pieced together a couple examples (listed in credits) and came up with an ARC compliant enviroment variable setup. __Feedback is extremely encouraged!__  For example,

    Debug:
      apiUrl:         'http://localhost:3000/api/'
      oauthClientId:  'OAuth 2 Client ID'
      oauthSecret:    'OAuth 2 Secret'
    
    Staging:
      apiUrl:         'http://staging.example.com/api/'
      oauthClientId:  'OAuth 2 Client ID'
      oauthSecret:    'OAuth 2 Secret'
    
    Release:
      apiUrl:         'http://example.com/api/'
      oauthClientId:  'OAuth 2 Client ID'
      oauthSecret:    'OAuth 2 Secret'
      
<br>

### Setting this up for your project:

1. Add any desired envroniments from the XCode project configs (see screenshot).
<img src="/images/posts/better_ios_env_vars-build_create_env.png">


2. add configuration to the plist.  
- screen shot before add
- screen shot after add

3. create env.plist  
https://gist.github.com/westonplatter/6445784#file-env-plist

4. add Evironment.h and Environment.m

```objc Environment.h https://gist.github.com/westonplatter/6445784#file-environment-h/ GitHub Gist
//
//  Environment.h
//
 
#import <Foundation/Foundation.h>
 
@interface Environment : NSObject
 
@property (nonatomic, strong) NSString *apiUrl;
 
+ (Environment *)sharedInstance;
 
@end
```

```objc Enviroment.m https://gist.github.com/westonplatter/6445784#file-environment-m/ GitHub Gist
//
//  Environment.m
//
 
#import "Environment.h"
 
@implementation Environment
 
static Environment *sharedInstance = nil;
 
- (id)init
{
    self = [super init];
    return self;
}
 
- (void)initializeSharedInstance
{
    NSString* configuration = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"Configuration"];
    NSBundle* bundle = [NSBundle mainBundle];
    NSString* envsPListPath = [bundle pathForResource:@"env" ofType:@"plist"];
    NSDictionary* environments = [[NSDictionary alloc] initWithContentsOfFile:envsPListPath];
    NSDictionary* environment = [environments objectForKey:configuration];
    
    _apiUrl = [environment valueForKey:@"apiUrl"];
}
 
+ (Environment *)sharedInstance
{
    @synchronized(self) {
        if (sharedInstance == nil) {
            sharedInstance = [[self alloc] init];
            [sharedInstance initializeSharedInstance];
        }
        return sharedInstance;
    }
}
 
@end
```

5. use in example

```objc Example Usage https://gist.github.com/westonplatter/6445784#file-loginviewcontroller-m/ GitHub Gist
//
//  LoginViewController.m
//
 
#import "LoginViewController.h"
#import "Environment.h"
 
@implementation LoginViewController
 
- (void)viewDidLoad {
    [super viewDidLoad];
    
    Environment *env = [Environment sharedInstance];
    NSString *apiUrl = [env apiUrl];
    NSLog(@"apiUrl = %@", apiUrl);
    
}
 
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}
 

@end
```


## Credits

[Rob Pak's](http://www.carbonfive.com/employee/rob-pak) Carbon Five blog post, "[Managing iOS Configurations per Environment in Xcode 4](http://blog.carbonfive.com/2011/06/20/managing-ios-configurations-per-environment-in-xcode-4/)"
