// const CryptoJS = require('crypto-js');
import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('Bangdao01bangdao'); //密钥
const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); //偏移量
const mode = CryptoJS.mode.CBC; //加密模式
const padding = CryptoJS.pad.Pkcs7; //填充模式

/**
 * 加密
 * @param text 加密内容
 * @returns
 */
export const encrypt = (text: string): string => {
  return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), key, {
    iv,
    mode,
    padding,
  }).toString();
};

/**
 * 解密
 * @param text 需要解密的内容
 * @returns
 */
export function decrypt(text: string) {
  //这里可以不用对解密参数text进行转码,直接使用
  let decryptedata = CryptoJS.AES.decrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  //转化出来的参数为一个对象，需要转化成字符串，CryptoJS.enc.Utf8为转化成utf-8编码格式的字符串形式，不然看不懂！
  return decryptedata.toString(CryptoJS.enc.Utf8);
}

/**
 * 将传入的日期字符串转换为日期对象和格式化后的日期字符串
 * @param date 日期字符串，格式为"yyyy-mm-dd hh:mm:ss"
 * @returns 包含日期对象和格式化后的日期字符串的对象
 */
export function formatDate(date: any): { date: Date; dateStr: string } {
  if (!date) {
    return {
      date: new Date(),
      dateStr: '',
    };
  }
  // 解析年份
  let dateObj = new Date(
    date.slice(0, 4) as number, // 年份
    date.slice(4, 6) - 1, // 月份（注意：月份是从0开始的，所以需要减1）
    date.slice(6, 8), // 日
    date.slice(8, 10), // 时
    date.slice(10, 12), // 分
    date.slice(12, 14) // 秒
  );
  // 格式化日期字符串
  let dateStr = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)} ${date.slice(8, 10)}:${date.slice(
    10,
    12
  )}:${date.slice(12, 14)}`;
  // 返回包含日期对象和格式化后的日期字符串的对象
  return {
    date: dateObj,
    dateStr: dateStr,
  };
}

export function formatDateRange(str: any) {
  const today = new Date();

  // 将输入的字符串转换为日期对象
  const inputDate = new Date(str.replace(/-/g, '/'));

  // 判断输入的日期是否在当前年份之后
  if (inputDate.getFullYear() < today.getFullYear()) {
    // 如果是，则按照年月日的格式返回日期字符串
    return `${inputDate.getFullYear()}-${('0' + (inputDate.getMonth() + 1)).slice(-2)}-${(
      '0' + inputDate.getDate()
    ).slice(-2)}`;
  }
  // 判断输入的日期是否与当前日期相同
  else if (inputDate.getMonth() === today.getMonth() && inputDate.getDate() === today.getDate()) {
    // 如果是，则按照时分的格式返回日期字符串
    return `${inputDate.getHours()}:${('0' + inputDate.getMinutes()).slice(-2)}`;
  } else {
    // 如果输入的日期在当前年份之内，则按照月日的格式返回日期字符串
    return `${('0' + inputDate.getMonth() + 1).slice(-2)}-${('0' + inputDate.getDate()).slice(-2)}`;
  }
}
