import qrcodeUtf16 from '@/utils/qrcode';
import monitor from '@/utils/monitor/alipayLogger.js';
interface IAuthCodeRes {
  authCode: string;
}

export interface IResponse<T> {
  data: T;
  rtnCode: string;
  rtnMessage: string;
  subFlag?: string;
  subMsg?: string;
  errMsg?: string;
}

// 获取 authCode
export function getAuthCode(scopes: string): Promise<string> {
  return new Promise((resolve) => {
    my.getAuthCode({
      scopes,
      success: (res: IAuthCodeRes) => {
        const authCode = res?.authCode;
        //获取到authCode，返回authCode，否则返回空值
        if (authCode) {
          resolve(authCode);
        } else {
          resolve('');
        }
      },
      fail: () => {
        resolve('');
      },
    });
  });
}

// 获取状态栏 + 标题栏高度
export function getPaddingTop() {
  return new Promise((resolve) => {
    uni.getSystemInfo({
      success: (res) => {
        const { titleBarHeight = 0, statusBarHeight = 0 } = res;
        const paddingTop = titleBarHeight + statusBarHeight;
        resolve(paddingTop);
      },
      fail: () => {
        resolve(90);
      },
    });
  });
}

export const keepTwoDecimalStr = (num: number) => {
  const result = Number(num.toString().match(/^\d+(?:\.\d{0,2})?/));
  let s = result.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
};

// 设置缓存
export function setStorage(key: string, value: any) {
  return new Promise((resolve) => {
    uni.setStorage({
      key,
      data: value,
      success: () => {
        resolve(true);
      },
      fail: () => {
        resolve(false);
      },
    });
  });
}

// 获取缓存
export function getStorage(key: string) {
  return new Promise((resolve) => {
    uni.getStorage({
      key,
      success: (res) => {
        resolve(res.data);
      },
      fail: () => {
        resolve(null);
      },
    });
  });
}

// 获取屏幕默认亮度
export function getScreenBrightness() {
  return new Promise((resolve) => {
    my.getScreenBrightness({
      success: (res: any) => {
        resolve(res.brightness);
      },
      fail: (error: any) => {
        console.log(error);
      },
    });
  });
}

// 设置屏幕亮度
export function setScreenBrightness(brightness: number = 1) {
  // console.log('SET brightness>>>>>>>>>>>>>', brightness);
  //处理屏幕取值异常情况
  if (brightness < 0.1 || brightness > 1) {
    brightness = 0.7;
  }
  return new Promise((resolve) => {
    my.setScreenBrightness({
      brightness: brightness,
      success: (res: any) => {
        resolve(res);
      },
      fail: (error: any) => {
        console.log(error);
      },
    });
  });
}

// 生成图片二维码
export function generateImageFromCode(str: string, mobile: string, cb: () => void) {
  // 页面加载
  console.log('🚀 ~ generateImageFromCode ~ str:', str);
  let result = my.base64ToArrayBuffer(str);
  console.log('🚀 ~ generateImageFromCode ~ result:', result);
  result = Array.prototype.map.call(new Uint8Array(result), (x) => ('00' + x.toString(16)).slice(-2)).join('');
  console.log('🚀 ~ generateImageFromCode ~ result:', result);
  result = new Uint8Array(result.match(/.{1,2}/g).map((byte: any) => parseInt(byte, 16)));
  console.log('🚀 ~ generateImageFromCode ~ result:', result);
  result = String.fromCharCode.apply(null, result);
  console.log('🚀 ~ generateImageFromCode ~ result:', result);
  qrcodeUtf16(
    {
      width: 220,
      height: 220,
      x: 0,
      y: 0,
      canvasId: 'qrcode',
      text: result,
      callback: cb,
      // v1.0.0+版本支持在二维码上绘制图片
    },
    (err) => {
      monitor.report('qrcode_monitor', {
        step: 'toDataURL',
        msg: err,
        code: '3333',
        success: false,
        mobile,
      });
    }
  );
}
