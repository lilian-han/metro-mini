const { generateService } = require('@umijs/openapi');

generateService({
  // 请求工具路径，按实际项目更改
  requestLibPath: "import request from '@/utils/request'",
  // 后端提供的apifox json 文件 ps：这里使用相对路径存在问题，没有解决。使用绝对路径、远程路径可以
  schemaPath: 'http://127.0.0.1:4523/export/openapi/10?version=2.0',
  // 生成servers的路径
  serversPath: './src/servers',
});
