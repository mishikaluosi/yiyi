'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _shop_item_list = require('./shop_item_list.js');

var _shop_item_list2 = _interopRequireDefault(_shop_item_list);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _constant = require('./../utils/constant.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var orderItem = function (_wepy$component) {
  _inherits(orderItem, _wepy$component);

  function orderItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, orderItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = orderItem.__proto__ || Object.getPrototypeOf(orderItem)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      orderList: {
        default: [],
        flag: "",
        orderNo: "",
        list: []
      }
    }, _this.$repeat = { "orderList": { "com": "shopItemList", "props": "" } }, _this.$props = { "shopItemList": { "xmlns:v-bind": { "value": "", "for": "orderList", "item": "item", "index": "index", "key": "key" }, "v-bind:list.sync": { "value": "item.orderItemList", "for": "orderList", "item": "item", "index": "index", "key": "key" } } }, _this.$events = {}, _this.components = {
      shopItemList: _shop_item_list2.default
    }, _this.events = {}, _this.methods = {
      delOrder: function delOrder(e) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this2.flag = 2;
                  _this2.orderNo = e.currentTarget.dataset.id;
                  _context.next = 4;
                  return _tip2.default.confirm('是否删除订单');

                case 4:
                  console.log(_this2.flag);
                  _this2.editOrderInfo(_this2.orderNo, _this2.flag);
                  console.log("删除成功");

                case 7:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }))();
      },
      completion: function completion(e) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _this3.flag = 3;
                  _this3.orderNo = e.currentTarget.dataset.id;
                  _context2.next = 4;
                  return _tip2.default.confirm('是否确认收货');

                case 4:
                  _this3.editOrderInfo(_this3.orderNo, _this3.flag);
                  console.log("完成");

                case 6:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this3);
        }))();
      },
      payMoney: function payMoney(e) {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var tradeNo, userSpecialInfo, openId, pay;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _this4.orderNo = e.currentTarget.dataset.id;
                  tradeNo = e.currentTarget.dataset.tradeno;
                  userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                  openId = userSpecialInfo.openid;
                  _context3.next = 6;
                  return _api2.default.toPay({
                    query: {
                      openId: openId,
                      orderNo: tradeNo
                    }
                  });

                case 6:
                  pay = _context3.sent;

                  if (pay.data.code == 0) {
                    //以下是微信支付
                    wx.requestPayment({
                      appId: pay.data.appId,
                      timeStamp: pay.data.timeStamp,
                      nonceStr: pay.data.nonceStr,
                      package: pay.data.package,
                      signType: 'MD5',
                      paySign: pay.data.paySign,
                      success: function success(res) {
                        console.log('pay', res);
                        setTimeout(function () {
                          //支付成功 关闭loadding 跳转到支付成功页面
                          _tip2.default.loaded();
                          _wepy2.default.navigateTo({
                            url: "/pages/pay_success?orderNo=" + tradeNo
                          });
                        }, 2000);
                      },
                      fail: function fail(res) {
                        _tip2.default.alert('支付失败');
                      }
                    });
                  } else {
                    _tip2.default.alert('支付失败');
                  }

                case 8:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this4);
        }))();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(orderItem, [{
    key: 'editOrderInfo',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(orderNo, flag) {
        var that, userSpecialInfo, json;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log("调用方法");
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                _context4.next = 5;
                return _api2.default.editOrderInfo({
                  query: {
                    orderNo: orderNo,
                    flag: flag
                  }
                });

              case 5:
                json = _context4.sent;

                if (json.data.code == 0) {

                  this.$emit('refreshOrderList', that.flag);
                } else {
                  _tip2.default.error(json.data.errerTips);
                }
                that.$apply();

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function editOrderInfo(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return editOrderInfo;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {
      console.log("===========lzz返回数据lzz=========");
      console.log(this.orderList);
    }
  }]);

  return orderItem;
}(_wepy2.default.component);

exports.default = orderItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyX2l0ZW0uanMiXSwibmFtZXMiOlsib3JkZXJJdGVtIiwicHJvcHMiLCJvcmRlckxpc3QiLCJkZWZhdWx0IiwiZmxhZyIsIm9yZGVyTm8iLCJsaXN0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic2hvcEl0ZW1MaXN0IiwiZXZlbnRzIiwibWV0aG9kcyIsImRlbE9yZGVyIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJjb25maXJtIiwiY29uc29sZSIsImxvZyIsImVkaXRPcmRlckluZm8iLCJjb21wbGV0aW9uIiwicGF5TW9uZXkiLCJ0cmFkZU5vIiwidHJhZGVubyIsInVzZXJTcGVjaWFsSW5mbyIsImdldFN0b3JhZ2VTeW5jIiwib3BlbklkIiwib3BlbmlkIiwidG9QYXkiLCJxdWVyeSIsInBheSIsImRhdGEiLCJjb2RlIiwid3giLCJyZXF1ZXN0UGF5bWVudCIsImFwcElkIiwidGltZVN0YW1wIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwic2lnblR5cGUiLCJwYXlTaWduIiwic3VjY2VzcyIsInJlcyIsInNldFRpbWVvdXQiLCJsb2FkZWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZmFpbCIsImFsZXJ0IiwidGhhdCIsImpzb24iLCIkZW1pdCIsImVycm9yIiwiZXJyZXJUaXBzIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFJcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUVuQkMsSyxHQUFRO0FBQ05DLGlCQUFXO0FBQ1RDLGlCQUFTLEVBREE7QUFFVEMsY0FBSyxFQUZJO0FBR1RDLGlCQUFRLEVBSEM7QUFJVEMsY0FBSztBQUpJO0FBREwsSyxRQTJCVEMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLE9BQU0sY0FBUCxFQUFzQixTQUFRLEVBQTlCLEVBQWIsRSxRQUNYQyxNLEdBQVMs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RHJCLDJCQUFoQjtBQUdELHlCQU5ELEVBTUcsSUFOSDtBQU9ELHVCQWhCZTtBQWlCaEJ5Qiw0QkFBTSxjQUFVTCxHQUFWLEVBQWU7QUFDbkIsc0NBQUlNLEtBQUosQ0FBVSxNQUFWO0FBQ0Q7QUFuQmUscUJBQWxCO0FBcUJELG1CQXZCRCxNQXVCTztBQUNMLGtDQUFJQSxLQUFKLENBQVUsTUFBVjtBQUNEOztBQXJDZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXNDakI7QUF4RE8sSzs7Ozs7OzRGQTdCVTlDLE8sRUFBUUQsSTs7Ozs7O0FBQzFCZ0Isd0JBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0krQixvQixHQUFPLEk7QUFDUHpCLCtCLEdBQWtCLGVBQUtDLGNBQUwsa0NBQTJDLEU7O3VCQUM5QyxjQUFJTixhQUFKLENBQWtCO0FBQ25DVSx5QkFBTztBQUNMM0IsNkJBQVNBLE9BREo7QUFFTEQsMEJBQUtBO0FBRkE7QUFENEIsaUJBQWxCLEM7OztBQUFiaUQsb0I7O0FBTU4sb0JBQUlBLEtBQUtuQixJQUFMLENBQVVDLElBQVYsSUFBa0IsQ0FBdEIsRUFBeUI7O0FBRXZCLHVCQUFLbUIsS0FBTCxDQUFXLGtCQUFYLEVBQStCRixLQUFLaEQsSUFBcEM7QUFDRCxpQkFIRCxNQUdPO0FBQ0wsZ0NBQUltRCxLQUFKLENBQVVGLEtBQUtuQixJQUFMLENBQVVzQixTQUFwQjtBQUNEO0FBQ0RKLHFCQUFLSyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBd0VPO0FBQ1ByQyxjQUFRQyxHQUFSLENBQVksZ0NBQVo7QUFDQUQsY0FBUUMsR0FBUixDQUFZLEtBQUtuQixTQUFqQjtBQUNEOzs7O0VBdEdvQyxlQUFLd0QsUzs7a0JBQXZCMUQsUyIsImZpbGUiOiJvcmRlcl9pdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHRpcCBmcm9tICcuLi91dGlscy90aXAnXG5pbXBvcnQgU2hvcEl0ZW1MaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvc2hvcF9pdGVtX2xpc3QnXG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaS9hcGknXG5pbXBvcnQge1xuICBTWVNURU1fSU5GTyxcbiAgVVNFUl9TUEVDSUNBTF9JTkZPXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG9yZGVySXRlbSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcblxuICBwcm9wcyA9IHtcbiAgICBvcmRlckxpc3Q6IHtcbiAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgZmxhZzpcIlwiLFxuICAgICAgb3JkZXJObzpcIlwiLFxuICAgICAgbGlzdDpbXVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGVkaXRPcmRlckluZm8ob3JkZXJObyxmbGFnKSB7XG4gICAgY29uc29sZS5sb2coXCLosIPnlKjmlrnms5VcIik7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5lZGl0T3JkZXJJbmZvKHtcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIG9yZGVyTm86IG9yZGVyTm8sXG4gICAgICAgIGZsYWc6ZmxhZ1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG5cbiAgICAgIHRoaXMuJGVtaXQoJ3JlZnJlc2hPcmRlckxpc3QnLCB0aGF0LmZsYWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLmVycmVyVGlwcylcbiAgICB9XG4gICAgdGhhdC4kYXBwbHkoKTtcbiAgfVxuICRyZXBlYXQgPSB7XCJvcmRlckxpc3RcIjp7XCJjb21cIjpcInNob3BJdGVtTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcInNob3BJdGVtTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwib3JkZXJMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOmxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLm9yZGVySXRlbUxpc3RcIixcImZvclwiOlwib3JkZXJMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgc2hvcEl0ZW1MaXN0OiBTaG9wSXRlbUxpc3RcbiAgfVxuXG4gIGV2ZW50cyA9IHtcblxuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBhc3luYyBkZWxPcmRlcihlKSB7XG4gICAgICB0aGlzLmZsYWc9MjtcbiAgICAgIHRoaXMub3JkZXJObyA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkO1xuICAgICAgYXdhaXQgdGlwLmNvbmZpcm0oJ+aYr+WQpuWIoOmZpOiuouWNlScpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5mbGFnKTtcbiAgICAgIHRoaXMuZWRpdE9yZGVySW5mbyh0aGlzLm9yZGVyTm8sdGhpcy5mbGFnKTtcbiAgICAgIGNvbnNvbGUubG9nKFwi5Yig6Zmk5oiQ5YqfXCIpXG5cbiAgICB9LFxuICAgICAgYXN5bmMgY29tcGxldGlvbihlKSB7XG4gICAgICB0aGlzLmZsYWc9MztcbiAgICAgIHRoaXMub3JkZXJObyA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkO1xuICAgICAgYXdhaXQgdGlwLmNvbmZpcm0oJ+aYr+WQpuehruiupOaUtui0pycpO1xuICAgICAgdGhpcy5lZGl0T3JkZXJJbmZvKHRoaXMub3JkZXJObyx0aGlzLmZsYWcpO1xuICAgICAgY29uc29sZS5sb2coXCLlrozmiJBcIilcbiAgICB9LFxuXG4gICAgYXN5bmMgcGF5TW9uZXkoZSkge1xuICAgICAgdGhpcy5vcmRlck5vID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQ7XG4gICAgICBsZXQgdHJhZGVObyA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRyYWRlbm87XG4gICAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8pIHx8IHt9O1xuICAgICAgbGV0IG9wZW5JZCA9IHVzZXJTcGVjaWFsSW5mby5vcGVuaWQ7XG5cbiAgICAgIGNvbnN0IHBheSA9IGF3YWl0IGFwaS50b1BheSh7XG4gICAgICAgIHF1ZXJ5OntcbiAgICAgICAgICBvcGVuSWQ6IG9wZW5JZCxcbiAgICAgICAgICBvcmRlck5vOiB0cmFkZU5vXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHBheS5kYXRhLmNvZGU9PTApIHtcbiAgICAgICAgLy/ku6XkuIvmmK/lvq7kv6HmlK/ku5hcbiAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgIGFwcElkOiBwYXkuZGF0YS5hcHBJZCxcbiAgICAgICAgICB0aW1lU3RhbXA6IHBheS5kYXRhLnRpbWVTdGFtcCxcbiAgICAgICAgICBub25jZVN0cjogcGF5LmRhdGEubm9uY2VTdHIsXG4gICAgICAgICAgcGFja2FnZTogcGF5LmRhdGEucGFja2FnZSxcbiAgICAgICAgICBzaWduVHlwZTogJ01ENScsXG4gICAgICAgICAgcGF5U2lnbjogcGF5LmRhdGEucGF5U2lnbixcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGF5JywgcmVzKVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIC8v5pSv5LuY5oiQ5YqfIOWFs+mXrWxvYWRkaW5nIOi3s+i9rOWIsOaUr+S7mOaIkOWKn+mhtemdolxuICAgICAgICAgICAgICB0aXAubG9hZGVkKCk7XG4gICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBcIi9wYWdlcy9wYXlfc3VjY2Vzcz9vcmRlck5vPVwiK3RyYWRlTm9cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sIDIwMDApXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICB0aXAuYWxlcnQoJ+aUr+S7mOWksei0pScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpcC5hbGVydCgn5pSv5LuY5aSx6LSlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT1senrov5Tlm57mlbDmja5seno9PT09PT09PT1cIilcbiAgICBjb25zb2xlLmxvZyh0aGlzLm9yZGVyTGlzdCk7XG4gIH1cbn1cblxuIl19