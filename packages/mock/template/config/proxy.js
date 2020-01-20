const path = require("path");
const mock = require("mockjs");
const fs = require("fs");
// HttpProxyMiddleWareOption类型
// 详见 https://github.com/chimurai/http-proxy-middleware#http-proxy-options
// type Proxy = {
//   [target: string]: HttpProxyMiddleWareOption
// };
const proxySeeting = {
  proxy_target1: {
    "^/api": {
      host: "target_host",
      changeOrigin: true
    }
  }
};
module.exports = function(app, target) {
  // if has no proxy target, we use local mock as default
  if (!target) {
    const staticReg = /^\/.+(?<!\.(html|html|css|js|png|jpg|gif|ico|jpeg|swf|svg|ttf|woff|map))$/;
    app.all(staticReg, (req, res, next) => {
      const mockPath = path.resolve(__dirname, "../", "./mock");
      let fileName = mockPath;
      let url = req.url + "";
      url = url.replace(/^\?+.*$/, "");
      if (/([\w|/|-]*)\/\d+$/.test(url)) {
        url = url.replace(/([\w|/|-]*)(\/\d+)/, "$1");
      }
      fileName += url.replace(/([\w|/|-]*)(\??.*$)/, "$1") + ".js";
      try {
        if (fs.existsSync(fileName)) {
          delete require.cache[require.resolve(fileName)];
          const jsonItem = require(fileName);
          res.send(mock.mock(jsonItem));
        } else {
          res.sendStatus(404);
        }
      } catch (e) {
        console.error(e);
        res.sendStatus(500);
      }
    });
  }
  // if has target, we use http-proxy-middileware to supoort dev proxy
  else {
    const proxyOption = proxySeeting[target];
    if (!proxyOption) {
      console.error(
        "Please check your proxy target, it's not in proxy setting."
      );
      return;
    }
    // add proxy option for this setting
    for (const k in proxyOption) {
      app.use(new RegExp(`^\\${k}`), proxy(proxyOption[k]));
    }
  }
};
