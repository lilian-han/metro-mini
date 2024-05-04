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
