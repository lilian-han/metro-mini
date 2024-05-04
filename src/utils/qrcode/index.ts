import { QRCode, QRErrorCorrectLevel } from './qrcode';
// import { useUserStore } from '@/stores';
// const userData = useUserStore();
// support Chinese
// function utf16to8(str: string) {
// var out, i, len, c;
// out = '';
// len = str.length;
// for (i = 0; i < len; i++) {
//   c = str.charCodeAt(i);
//   if (c >= 0x0001 && c <= 0x007f) {
//     out += str.charAt(i);
//   } else if (c > 0x07ff) {
//     out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
//     out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
//     out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
//   } else {
//     out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
//     out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
//   }
// }
//   return str;
// }
const defaultConfig = {
  width: 256,
  height: 256,
  x: 0,
  y: 0,
  typeNumber: -1,
  correctLevel: QRErrorCorrectLevel.L,
  background: '#ffffff',
  foreground: '#000000',
  image: {
    imageResource: '',
    dx: 0,
    dy: 0,
    dWidth: 100,
    dHeight: 100,
  },
};

/**
 * utf16编码生成二维码
 * @param {QrcodeUtf16Type} data - 二维码数据类型
 * @param errCall 异常回调
 */
// eslint-disable-next-line no-undef
function qrcodeUtf16(data: QrcodeUtf16Type, errCall: (x: string) => void) {
  const options: any = Object.assign(defaultConfig, data);
  // console.log('options>>>>>>>>>>>', options, options.callback);

  // 检查是否提供了canvasId或ctx
  if (!options.canvasId && !options.ctx) {
    console.warn('请设置canvasId或ctx!');
    return;
  }

  createCanvas();

  /**
   * 创建二维码canvas
   */
  function createCanvas() {
    // 创建二维码本身
    // @ts-ignore
    let qrcode = new QRCode(options.typeNumber, options.correctLevel);
    qrcode.addData(options.text);
    qrcode.make();

    // 获取canvas上下文
    let ctx: any;
    if (options.ctx) {
      ctx = options.ctx;
    } else {
      // @ts-ignore
      ctx = options._this
        ? uni.createCanvasContext && uni.createCanvasContext(options.canvasId, options._this)
        : uni.createCanvasContext && uni.createCanvasContext(options.canvasId);
    }

    // 计算tileW/tileH基于options.width/options.height
    let tileW = options.width / qrcode.getModuleCount();
    let tileH = options.height / qrcode.getModuleCount();

    // 在canvas上绘制二维码
    for (let row = 0; row < qrcode.getModuleCount(); row++) {
      for (let col = 0; col < qrcode.getModuleCount(); col++) {
        let style = qrcode.isDark(row, col) ? options.foreground : options.background;
        ctx.setFillStyle(style);
        let w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
        let h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
        ctx.fillRect(Math.round(col * tileW) + options.x, Math.round(row * tileH) + options.y, w, h);
      }
    }

    // 如果设置了图片，则绘制图片
    if (options.image.imageResource) {
      ctx.drawImage(
        options.image.imageResource,
        options.image.dx,
        options.image.dy,
        options.image.dWidth,
        options.image.dHeight
      );
    }

    // 将绘制好的内容导出为图片并触发回调函数
    ctx.draw(false, (e: any) => {
      // 将图片转成 DataUrl
      // @ts-ignore
      ctx
        .toDataURL({
          x: 0,
          y: 0,
          width: 220,
          height: 220,
          destWidth: 220,
          destHeight: 220,
        })
        .then(
          (dataURL: any) => {
            options.callback && options.callback(dataURL);
          },
          (err: any) => {
            errCall(err);
          }
        );
    });
  }
}

export default qrcodeUtf16;
