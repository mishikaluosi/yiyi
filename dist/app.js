'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _constant = require('./utils/constant.js');

var _api = require('./api/api.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/home', 'pages/home_detail', 'pages/classify', 'pages/shop_cart', 'pages/info',
      //'pages/search',
      'pages/test', 'pages/sign_in', 'pages/exchange_goods', 'pages/wholesale', 'pages/replenishment_goods', 'pages/register', 'pages/order', 'pages/reorder', 'pages/pay_success', 'pages/points', 'pages/points_more', 'pages/points_rule', 'pages/collection', 'pages/messages', 'pages/setting', 'pages/goods_detail', 'pages/comfire_order', 'pages/address', 'pages/order_detail', 'pages/filter', 'pages/logistics', 'pages/comment', 'pages/comment_add'],
      window: {
        backgroundTextStyle: 'dark',
        navigationBarBackgroundColor: '#FFFFFF',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black',
        enablePullDownRefresh: false,
        backgroundColor: '#EFEFEF'

      },
      "tabBar": {
        "color": "#999999",
        "selectedColor": "#ff6a3c",
        "backgroundColor": "#ffffff",
        "borderStyle": "black",
        "list": [{
          "pagePath": "pages/home",
          "text": "首页",
          "iconPath": "images/icon_home.png",
          "selectedIconPath": "images/icon_home_active.png"
        }, {
          "pagePath": "pages/classify",
          "text": "分类",
          "iconPath": "images/icon_classify.png",
          "selectedIconPath": "images/icon_classify_active.png"
          // {
          //   "pagePath": "pages/shop_cart",
          //   "text": "购物车",
          //   "iconPath": "images/icon_shop_cart.png",
          //   "selectedIconPath": "images/icon_shop_cart_active.png"
          // }, 
          // {
          //   "pagePath": "pages/info",
          //   "text": "我",
          //   "iconPath": "images/icon_info.png",
          //   "selectedIconPath": "images/icon_info_active.png"
          // }
        }]
      }
    };
    _this.globalData = {
      userInfo: null,
      appid: 'wx6b121941b200ea50',
      secret: '36a76b0682bd2c3f1541fd012fac66f5'
    };

    _this.use('requestfix');
    _this.use('promisify');

    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var that, userSpecialInfo, userInfo, res, d, c, systemInfo, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                //用户信息

                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};

                // 用户普通信息

                userInfo = _wepy2.default.getStorageSync(_constant.USER_INFO) || {};

                //如果信息过期

                if (!((!userSpecialInfo.openid || (userSpecialInfo.expires_in || Date.now()) < Date.now() + 600) && !userInfo.nickName)) {
                  _context.next = 20;
                  break;
                }

                _context.next = 6;
                return _wepy2.default.login();

              case 6:
                res = _context.sent;

                if (!res.code) {
                  _context.next = 19;
                  break;
                }

                d = that.globalData; //这里存储了appid、secret、token串    
                //存储userInfo 

                _context.next = 11;
                return _wepy2.default.getUserInfo();

              case 11:
                c = _context.sent;

                _wepy2.default.setStorageSync(_constant.USER_INFO, c.userInfo);

                //存储系统信息 
                systemInfo = _wepy2.default.getSystemInfoSync();

                _wepy2.default.setStorageSync(_constant.SYSTEM_INFO, systemInfo);

                (0, _api.wxJsCode2Session)({
                  query: {
                    jsCode: res.code,
                    nickName: c.userInfo.nickName
                  }
                }).then(function (resp) {
                  var rlt = resp.data;
                  console.log("wxJsCode2Session..." + JSON.stringify(rlt));
                  if (rlt.result) {
                    var data = rlt.data;
                    if (data.openid) {
                      var obj = {};
                      obj.openid = data.openid;
                      obj.expires_in = Date.now() + data.expires_in;
                      //存储openid 
                      _wepy2.default.setStorageSync(_constant.USER_SPECICAL_INFO, obj);
                    }
                  } else {
                    var _obj = {};
                    _obj.openid = "oeuj50KHMqsh5kYZYWQJuwmY5yG0";
                    _obj.expires_in = "7200";
                    //存储openid 
                    _wepy2.default.setStorageSync(_constant.USER_SPECICAL_INFO, _obj);
                  }
                });

                url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';

                /* let b = await wepy.request({
                     url: url,
                     data: {},
                     method: 'POST',
                     header: {
                         'content-Type': 'application/x-www-form-urlencoded'
                     }
                 });
                 if (b.data.openid) {
                     let obj = {};
                     obj.openid = b.data.openid;
                     obj.expires_in = Date.now() + b.data.expires_in;
                      //存储openid 
                     wepy.setStorageSync(USER_SPECICAL_INFO, obj);
                      //存储userInfo 
                     let c = await wepy.getUserInfo();
                     wepy.setStorageSync(USER_INFO, c.userInfo);
                      //存储系统信息 
                     let systemInfo = await wepy.getSystemInfoSync();
                     wepy.setStorageSync(SYSTEM_INFO, systemInfo);
                     console.log(b, '登陆成功')
                 }*/

                _context.next = 20;
                break;

              case 19:
                console.log('获取用户登录态失败！' + res.errMsg);

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLaunch() {
        return _ref.apply(this, arguments);
      }

      return onLaunch;
    }()
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJiYWNrZ3JvdW5kQ29sb3IiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJhcHBpZCIsInNlY3JldCIsInVzZSIsInRoYXQiLCJ1c2VyU3BlY2lhbEluZm8iLCJnZXRTdG9yYWdlU3luYyIsIm9wZW5pZCIsImV4cGlyZXNfaW4iLCJEYXRlIiwibm93Iiwibmlja05hbWUiLCJsb2dpbiIsInJlcyIsImNvZGUiLCJkIiwiZ2V0VXNlckluZm8iLCJjIiwic2V0U3RvcmFnZVN5bmMiLCJzeXN0ZW1JbmZvIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJxdWVyeSIsImpzQ29kZSIsInRoZW4iLCJybHQiLCJyZXNwIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwicmVzdWx0Iiwib2JqIiwidXJsIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7QUF1RkUsc0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxVQWpGZEEsTUFpRmMsR0FqRkw7QUFDUEMsYUFBTyxDQUNMLFlBREssRUFFTCxtQkFGSyxFQUdMLGdCQUhLLEVBSUwsaUJBSkssRUFLTCxZQUxLO0FBTUw7QUFDQSxrQkFQSyxFQVFMLGVBUkssRUFTTCxzQkFUSyxFQVVMLGlCQVZLLEVBV0wsMkJBWEssRUFZTCxnQkFaSyxFQWFMLGFBYkssRUFjTCxlQWRLLEVBZUwsbUJBZkssRUFnQkwsY0FoQkssRUFpQkwsbUJBakJLLEVBa0JMLG1CQWxCSyxFQW1CTCxrQkFuQkssRUFvQkwsZ0JBcEJLLEVBcUJM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LG1CLEdBQU0sd0RBQXdEbEIsRUFBRWQsS0FBMUQsR0FBa0UsVUFBbEUsR0FBK0VjLEVBQUViLE1BQWpGLEdBQTBGLFdBQTFGLEdBQXdHVyxJQUFJQyxJQUE1RyxHQUFtSCxnQzs7QUFFN0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQWEsd0JBQVFDLEdBQVIsQ0FBWSxlQUFlZixJQUFJcUIsTUFBL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFyS3FCLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcbmltcG9ydCB7XG4gIFVTRVJfU1BFQ0lDQUxfSU5GTyxcbiAgVVNFUl9JTkZPLFxuICBTWVNURU1fSU5GTyxcbiAgQUREUkVTU19JRCxcbiAgU0VMX0NMQVNTX0NPREVcbn0gZnJvbSBcIi4vdXRpbHMvY29uc3RhbnRcIjtcbmltcG9ydCB7XG4gIHd4SnNDb2RlMlNlc3Npb24sXG4gIHVzZXIyc2Vzc2lvblxufSBmcm9tICcuL2FwaS9hcGknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvaG9tZScsXG4gICAgICAncGFnZXMvaG9tZV9kZXRhaWwnLFxuICAgICAgJ3BhZ2VzL2NsYXNzaWZ5JyxcbiAgICAgICdwYWdlcy9zaG9wX2NhcnQnLFxuICAgICAgJ3BhZ2VzL2luZm8nLFxuICAgICAgLy8ncGFnZXMvc2VhcmNoJyxcbiAgICAgICdwYWdlcy90ZXN0JyxcbiAgICAgICdwYWdlcy9zaWduX2luJyxcbiAgICAgICdwYWdlcy9leGNoYW5nZV9nb29kcycsXG4gICAgICAncGFnZXMvd2hvbGVzYWxlJyxcbiAgICAgICdwYWdlcy9yZXBsZW5pc2htZW50X2dvb2RzJyxcbiAgICAgICdwYWdlcy9yZWdpc3RlcicsXG4gICAgICAncGFnZXMvb3JkZXInLFxuICAgICAgJ3BhZ2VzL3Jlb3JkZXInLFxuICAgICAgJ3BhZ2VzL3BheV9zdWNjZXNzJyxcbiAgICAgICdwYWdlcy9wb2ludHMnLFxuICAgICAgJ3BhZ2VzL3BvaW50c19tb3JlJyxcbiAgICAgICdwYWdlcy9wb2ludHNfcnVsZScsXG4gICAgICAncGFnZXMvY29sbGVjdGlvbicsXG4gICAgICAncGFnZXMvbWVzc2FnZXMnLFxuICAgICAgJ3BhZ2VzL3NldHRpbmcnLFxuICAgICAgJ3BhZ2VzL2dvb2RzX2RldGFpbCcsXG4gICAgICAncGFnZXMvY29tZmlyZV9vcmRlcicsXG4gICAgICAncGFnZXMvYWRkcmVzcycsXG4gICAgICAncGFnZXMvb3JkZXJfZGV0YWlsJyxcbiAgICAgICdwYWdlcy9maWx0ZXInLFxuICAgICAgJ3BhZ2VzL2xvZ2lzdGljcycsXG4gICAgICAncGFnZXMvY29tbWVudCcsXG4gICAgICAncGFnZXMvY29tbWVudF9hZGQnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRUZFRkVGJ1xuXG4gICAgfSxcbiAgICBcInRhYkJhclwiOiB7XG4gICAgICBcImNvbG9yXCI6IFwiIzk5OTk5OVwiLFxuICAgICAgXCJzZWxlY3RlZENvbG9yXCI6IFwiI2ZmNmEzY1wiLFxuICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICBcImJvcmRlclN0eWxlXCI6IFwiYmxhY2tcIixcbiAgICAgIFwibGlzdFwiOiBbXG4gICAgICAgICAge1xuICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9ob21lXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwi6aaW6aG1XCIsXG4gICAgICAgICAgXCJpY29uUGF0aFwiOiBcImltYWdlcy9pY29uX2hvbWUucG5nXCIsXG4gICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25faG9tZV9hY3RpdmUucG5nXCJcbiAgICAgICAgfSwgXG4gICAgICAgIHtcbiAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvY2xhc3NpZnlcIixcbiAgICAgICAgICBcInRleHRcIjogXCLliIbnsbtcIixcbiAgICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25fY2xhc3NpZnkucG5nXCIsXG4gICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25fY2xhc3NpZnlfYWN0aXZlLnBuZ1wiXG4gICAgICAgIH1cbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9zaG9wX2NhcnRcIixcbiAgICAgICAgLy8gICBcInRleHRcIjogXCLotK3nianovaZcIixcbiAgICAgICAgLy8gICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25fc2hvcF9jYXJ0LnBuZ1wiLFxuICAgICAgICAvLyAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9pY29uX3Nob3BfY2FydF9hY3RpdmUucG5nXCJcbiAgICAgICAgLy8gfSwgXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvaW5mb1wiLFxuICAgICAgICAvLyAgIFwidGV4dFwiOiBcIuaIkVwiLFxuICAgICAgICAvLyAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvaWNvbl9pbmZvLnBuZ1wiLFxuICAgICAgICAvLyAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9pY29uX2luZm9fYWN0aXZlLnBuZ1wiXG4gICAgICAgIC8vIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIGFwcGlkOiAnd3g2YjEyMTk0MWIyMDBlYTUwJyxcbiAgICBzZWNyZXQ6ICczNmE3NmIwNjgyYmQyYzNmMTU0MWZkMDEyZmFjNjZmNScsXG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKTtcblxuICB9XG5cbiAgYXN5bmMgb25MYXVuY2goKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIC8v55So5oi35L+h5oGvXG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcblxuICAgIC8vIOeUqOaIt+aZrumAmuS/oeaBr1xuICAgIGxldCB1c2VySW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9JTkZPKSB8fCB7fTtcblxuICAgIC8v5aaC5p6c5L+h5oGv6L+H5pyfXG4gICAgaWYgKCghdXNlclNwZWNpYWxJbmZvLm9wZW5pZCB8fCAodXNlclNwZWNpYWxJbmZvLmV4cGlyZXNfaW4gfHwgRGF0ZS5ub3coKSkgPCAoRGF0ZS5ub3coKSArIDYwMCkpICYmICghdXNlckluZm8ubmlja05hbWUpKSB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgd2VweS5sb2dpbigpO1xuICAgICAgaWYgKHJlcy5jb2RlKSB7XG4gICAgICAgIGxldCBkID0gdGhhdC5nbG9iYWxEYXRhOyAvL+i/memHjOWtmOWCqOS6hmFwcGlk44CBc2VjcmV044CBdG9rZW7kuLLCoMKgwqDCoFxuICAgICAgICAvL+WtmOWCqHVzZXJJbmZvwqBcbiAgICAgICAgbGV0IGMgPSBhd2FpdCB3ZXB5LmdldFVzZXJJbmZvKCk7XG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoVVNFUl9JTkZPLCBjLnVzZXJJbmZvKTtcblxuICAgICAgICAvL+WtmOWCqOezu+e7n+S/oeaBr8KgXG4gICAgICAgIGxldCBzeXN0ZW1JbmZvID0gd2VweS5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFNZU1RFTV9JTkZPLCBzeXN0ZW1JbmZvKTtcblxuICAgICAgICB3eEpzQ29kZTJTZXNzaW9uKHtcbiAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAganNDb2RlOiByZXMuY29kZSxcbiAgICAgICAgICAgIG5pY2tOYW1lOiBjLnVzZXJJbmZvLm5pY2tOYW1lXG4gICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKHJlc3AgPT4ge1xuICAgICAgICAgIHZhciBybHQgPSByZXNwLmRhdGE7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJ3eEpzQ29kZTJTZXNzaW9uLi4uXCIgKyBKU09OLnN0cmluZ2lmeShybHQpKTtcbiAgICAgICAgICBpZiAocmx0LnJlc3VsdCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBybHQuZGF0YTtcbiAgICAgICAgICAgIGlmIChkYXRhLm9wZW5pZCkge1xuICAgICAgICAgICAgICBsZXQgb2JqID0ge307XG4gICAgICAgICAgICAgIG9iai5vcGVuaWQgPSBkYXRhLm9wZW5pZDtcbiAgICAgICAgICAgICAgb2JqLmV4cGlyZXNfaW4gPSBEYXRlLm5vdygpICsgZGF0YS5leHBpcmVzX2luO1xuICAgICAgICAgICAgICAvL+WtmOWCqG9wZW5pZMKgXG4gICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPLCBvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgb2JqID0ge307XG4gICAgICAgICAgICBvYmoub3BlbmlkID0gXCJvZXVqNTBLSE1xc2g1a1laWVdRSnV3bVk1eUcwXCI7XG4gICAgICAgICAgICBvYmouZXhwaXJlc19pbiA9IFwiNzIwMFwiO1xuICAgICAgICAgICAgLy/lrZjlgqhvcGVuaWTCoFxuICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8sIG9iaik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdXJsID0gJ2h0dHBzOi8vYXBpLndlaXhpbi5xcS5jb20vc25zL2pzY29kZTJzZXNzaW9uP2FwcGlkPScgKyBkLmFwcGlkICsgJyZzZWNyZXQ9JyArIGQuc2VjcmV0ICsgJyZqc19jb2RlPScgKyByZXMuY29kZSArICcmZ3JhbnRfdHlwZT1hdXRob3JpemF0aW9uX2NvZGUnO1xuXG4gICAgICAgIC8qIGxldCBiID0gYXdhaXQgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgJ2NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgICAgICBpZiAoYi5kYXRhLm9wZW5pZCkge1xuICAgICAgICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgICAgICBvYmoub3BlbmlkID0gYi5kYXRhLm9wZW5pZDtcbiAgICAgICAgICAgICBvYmouZXhwaXJlc19pbiA9IERhdGUubm93KCkgKyBiLmRhdGEuZXhwaXJlc19pbjtcblxuICAgICAgICAgICAgIC8v5a2Y5YKob3BlbmlkwqBcbiAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTywgb2JqKTtcblxuICAgICAgICAgICAgIC8v5a2Y5YKodXNlckluZm/CoFxuICAgICAgICAgICAgIGxldCBjID0gYXdhaXQgd2VweS5nZXRVc2VySW5mbygpO1xuICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoVVNFUl9JTkZPLCBjLnVzZXJJbmZvKTtcblxuICAgICAgICAgICAgIC8v5a2Y5YKo57O757uf5L+h5oGvwqBcbiAgICAgICAgICAgICBsZXQgc3lzdGVtSW5mbyA9IGF3YWl0IHdlcHkuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFNZU1RFTV9JTkZPLCBzeXN0ZW1JbmZvKTtcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhiLCAn55m76ZmG5oiQ5YqfJylcbiAgICAgICAgIH0qL1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W55So5oi355m75b2V5oCB5aSx6LSl77yBJyArIHJlcy5lcnJNc2cpXG4gICAgICB9XG5cbiAgICB9XG4gIH1cbn1cblxuIl19