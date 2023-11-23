#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SunmiPrinterLibrary, NSObject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
