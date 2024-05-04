import { useUserStore } from '@/stores';
import monitor from '@/utils/monitor/alipayLogger';
// 请求基地址
const baseURL = import.meta.env.VITE_BASE_API;

// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  // eslint-disable-next-line no-undef
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url;
    }
    // 2. 请求超时 30s
    options.timeout = 30000;
    // 3. 添加小程序端请求头标识
    options.header = {
      ...options.header,
      osType: 'ALIPAY_MINI',
    };
    // 4. 添加 token 请求头标识
    const userStore = useUserStore();
    const accessToken = userStore.accessToken;
    if (accessToken) {
      options.header.Authorization = accessToken;
    }
  },
};

// 拦截 request 请求
uni.addInterceptor('request', httpInterceptor);
// 拦截 uploadFile 文件上传
uni.addInterceptor('uploadFile', httpInterceptor);

/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象，用于处理返回值类型
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */
type Data<T> = {
  rtnCode: string;
  rtnMessage: string;
  data: T;
};
interface IRequestOptions extends UniApp.RequestOptions {
  showError?: boolean;
}
// 2.2 添加类型，支持泛型
// eslint-disable-next-line no-undef
export const request = <T>(options: IRequestOptions) => {
  // 1. 返回 Promise 对象
  if (!['/card/rideCode/qrcodeApply', '/card/rideCode/qrcodeStatusQuery'].includes(options.url)) {
    uni.showLoading({
      title: '正在请求数据...',
    });
  }
  return new Promise<[T | undefined, undefined | Error]>((resolve) => {
    uni.request({
      ...options,
      // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300 && (res.data as any).rtnCode == '10000') {
          // 2.1 提取核心数据 res.data
          resolve([res.data as T, undefined]);
        } else if (res.statusCode === 401) {
          // 401错误  -> 重定向至首页
          my.switchTab({
            url: '/pages/index/index',
          });
        } else {
          // API  异常日志监控
          monitor.report('service_monitor', {
            api: options.url,
            // @ts-ignore
            msg: res?.data?.rtnMessage || '',
            success: false,
            statusCode: res?.statusCode || '',
            // @ts-ignore
            code: res?.data.rtnCode || '',
          });

          // 其他错误 -> 根据后端错误信息轻提示
          if (options.showError) {
            my.showToast({
              icon: 'none',
              title: (res.data as Data<T>).rtnMessage || '请求错误',
            });
          }
          resolve([undefined, res.data as Error]);
        }
      },
      // 响应失败
      fail(err) {
        monitor.report('service_monitor', {
          api: options.url,
          msg: 'http 请求异常',
          success: false,
          statusCode: '',
          code: 'HTTP_ERROR',
        });

        if (options.showError) {
          my.showToast({
            icon: 'none',
            title: '网络错误，换个网络试试',
          });
        }
        resolve([undefined, err as any]);
      },
      complete() {
        uni.hideLoading();
      },
    });
  });
};
