// 二维码的容错率设置为四个等级： L 的容错率为 7%，M 容错率为 15%，Q 容错率为 25%，H 容错率为 30%
type QRErrorCorrectLevelType = {
  L: 1;
  M: 0;
  Q: 3;
  H: 2;
};
type MaskPatternType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type ErrorLevelValue = 0 | 1 | 2 | 3;
// qrcode 入参
type QrcodeUtf16Type = {
  canvasId: string;
  text?: string;
  ctx?: any;
  width?: number; // 二维码宽
  height?: number; // 二维码高
  x?: number; // 二维码位置
  y?: number; // 二维码位置
  typeNumber?: number;
  correctLevel?: ErrorLevelValue;
  background?: HexColor; // 二维码背景颜色
  foreground?: HexColor; // 二维码颜色
  image?: QrcodeImg; // 装饰图片
  callback?: (e: any) => void; // 回调
};
type QrcodeImg = {
  imageResource: '';
  dx?: number;
  dy?: number;
  dWidth?: number;
  dHeight?: number;
};
type HexDigit =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F';
type HexColor<T extends string> = T extends `#${HexDigit}${HexDigit}${HexDigit}${infer Rest1}`
  ? Rest1 extends ``
    ? T // three-digit hex color
    : Rest1 extends `${HexDigit}${HexDigit}${HexDigit}`
    ? T // six-digit hex color
    : never
  : never;
