'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _shop_item_list = require('./../components/shop_item_list.js');

var _shop_item_list2 = _interopRequireDefault(_shop_item_list);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _constant = require('./../utils/constant.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderDetail = function (_wepy$page) {
  _inherits(OrderDetail, _wepy$page);

  function OrderDetail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, OrderDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderDetail.__proto__ || Object.getPrototypeOf(OrderDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '订单详情'
    }, _this.data = {
      obj: {},
      orderNo: "",
      flag: "",
      list: [],
      orderExpress: {},
      expressFlowInfo: {}
    }, _this.$repeat = {}, _this.$props = { "shopItemList": { "xmlns:v-bind": "", "v-bind:goodsList.sync": "list" } }, _this.$events = {}, _this.components = {
      shopItemList: _shop_item_list2.default
    }, _this.computed = {}, _this.methods = {
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
      goLogistics: function goLogistics() {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _tip2.default.confirm('查看物流');

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this4);
        }))();
      },
      payMoney: function payMoney(e) {
        var _this5 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var tradeNo, userSpecialInfo, openId, pay;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  tradeNo = e.currentTarget.dataset.tradeno;
                  userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                  openId = userSpecialInfo.openid;
                  _context4.next = 5;
                  return _api2.default.toPay({
                    query: {
                      openId: openId,
                      orderNo: tradeNo
                    }
                  });

                case 5:
                  pay = _context4.sent;

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

                case 7:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this5);
        }))();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(OrderDetail, [{
    key: 'getOrderInfo',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(currentPage, size) {
        var that, userSpecialInfo, json;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                _context5.next = 4;
                return _api2.default.getOrderInfo({
                  query: {
                    orderNo: this.orderNo
                  }
                });

              case 4:
                json = _context5.sent;

                if (json.data.code == 0) {
                  this.obj = json.data.obj;
                  that.list = [];
                  that.list = [].concat(_toConsumableArray(that.list), _toConsumableArray(json.data.obj.orderItemList));
                  that.$invoke('shopItemList', 'refreshList', that.list);

                  console.log("========list返回数据========");
                  console.log(that.list);
                  console.log(json.data.obj.orderItemList);
                } else {
                  _tip2.default.error(json.data.msg);
                }

                that.$apply();

              case 7:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getOrderInfo(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return getOrderInfo;
    }()
  }, {
    key: 'editOrderInfo',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(orderNo, flag) {
        var that, userSpecialInfo, json;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                _context6.next = 4;
                return _api2.default.editOrderInfo({
                  query: {
                    orderNo: orderNo,
                    flag: flag
                  }
                });

              case 4:
                json = _context6.sent;

                if (json.data.code == 0) {
                  console.log("===========lzz返回数据=========");
                  console.log(json.data.errerTips);
                  /*that.list = [...that.list, ...json.data.errerTips.orderItemList];
                  that.$invoke('shopItemList', 'refreshList', that.list);
                  console.log(json.data.errerTips.orderItemList);
                  console.log(that.list);*/
                  if (this.flag == 2) {//删除

                  }
                } else {
                  _tip2.default.error(json.data.msg);
                }
                that.$apply();

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function editOrderInfo(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return editOrderInfo;
    }()
  }, {
    key: 'getOrderExpressInfo',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var that, userSpecialInfo, json;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                console.log("orderNo");
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                _context7.next = 5;
                return _api2.default.orderExpressInfo({
                  query: {
                    orderNo: this.orderNo
                  }
                });

              case 5:
                json = _context7.sent;

                if (json.data.code == 0) {
                  that.orderExpress = json.data.orderExpress;
                  that.expressFlowInfo = json.data.expressFlowInfo;
                  console.log("========list返回数据========");
                  console.log(that.list);
                } else {
                  _tip2.default.error(json.data.msg);
                }

                that.$apply();

              case 8:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getOrderExpressInfo() {
        return _ref4.apply(this, arguments);
      }

      return getOrderExpressInfo;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      var that = this;
      //that.list = bb.result.products;
      this.orderNo = options.orderNo;
      that.getOrderInfo();
      that.getOrderExpressInfo();
      console.log(bb.result.products);
      console.log("=========options==========");
      console.log(options.id);
    }
  }]);

  return OrderDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderDetail , 'pages/order_detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyX2RldGFpbC5qcyJdLCJuYW1lcyI6WyJPcmRlckRldGFpbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwib2JqIiwib3JkZXJObyIsImZsYWciLCJsaXN0Iiwib3JkZXJFeHByZXNzIiwiZXhwcmVzc0Zsb3dJbmZvIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic2hvcEl0ZW1MaXN0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZGVsT3JkZXIiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsImNvbmZpcm0iLCJjb25zb2xlIiwibG9nIiwiZWRpdE9yZGVySW5mbyIsImNvbXBsZXRpb24iLCJnb0xvZ2lzdGljcyIsInBheU1vbmV5IiwidHJhZGVObyIsInRyYWRlbm8iLCJ1c2VyU3BlY2lhbEluZm8iLCJnZXRTdG9yYWdlU3luYyIsIm9wZW5JZCIsIm9wZW5pZCIsInRvUGF5IiwicXVlcnkiLCJwYXkiLCJjb2RlIiwid3giLCJyZXF1ZXN0UGF5bWVudCIsImFwcElkIiwidGltZVN0YW1wIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwic2lnblR5cGUiLCJwYXlTaWduIiwic3VjY2VzcyIsInJlcyIsInNldFRpbWVvdXQiLCJsb2FkZWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZmFpbCIsImFsZXJ0IiwiZXZlbnRzIiwiY3VycmVudFBhZ2UiLCJzaXplIiwidGhhdCIsImdldE9yZGVySW5mbyIsImpzb24iLCJvcmRlckl0ZW1MaXN0IiwiJGludm9rZSIsImVycm9yIiwibXNnIiwiJGFwcGx5IiwiZXJyZXJUaXBzIiwib3JkZXJFeHByZXNzSW5mbyIsIm9wdGlvbnMiLCJnZXRPcmRlckV4cHJlc3NJbmZvIiwiYmIiLCJyZXN1bHQiLCJwcm9kdWN0cyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7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ekQsSUFBTCxDQUFVSyxZQUE1QjtBQUNBa0QsdUJBQUtqRCxlQUFMLEdBQXFCbUQsS0FBS3pELElBQUwsQ0FBVU0sZUFBL0I7QUFDQWMsMEJBQVFDLEdBQVIsQ0FBWSwwQkFBWjtBQUNBRCwwQkFBUUMsR0FBUixDQUFZa0MsS0FBS25ELElBQWpCO0FBQ0QsaUJBTEQsTUFLTztBQUNMLGdDQUFJd0QsS0FBSixDQUFVSCxLQUFLekQsSUFBTCxDQUFVNkQsR0FBcEI7QUFDRDs7QUFFRE4scUJBQUtPLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkFTS0csTyxFQUFTO0FBQ2QsVUFBSVYsT0FBTyxJQUFYO0FBQ0E7QUFDQSxXQUFLckQsT0FBTCxHQUFhK0QsUUFBUS9ELE9BQXJCO0FBQ0FxRCxXQUFLQyxZQUFMO0FBQ0FELFdBQUtXLG1CQUFMO0FBQ0E5QyxjQUFRQyxHQUFSLENBQVk4QyxHQUFHQyxNQUFILENBQVVDLFFBQXRCO0FBQ0FqRCxjQUFRQyxHQUFSLENBQVksNEJBQVo7QUFDQUQsY0FBUUMsR0FBUixDQUFZNEMsUUFBUS9DLEVBQXBCO0FBQ0Q7Ozs7RUFsR3NDLGVBQUtvRCxJOztrQkFBekJ6RSxXIiwiZmlsZSI6Im9yZGVyX2RldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgdGlwIGZyb20gJy4uL3V0aWxzL3RpcCdcbmltcG9ydCBTaG9wSXRlbUxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9zaG9wX2l0ZW1fbGlzdCdcbmltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSdcbmltcG9ydCB7XG4gIFNZU1RFTV9JTkZPLFxuICBVU0VSX1NQRUNJQ0FMX0lORk9cbn0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnQnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleivpuaDhScsXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBvYmo6IHt9LFxuICAgIG9yZGVyTm86XCJcIixcbiAgICBmbGFnOlwiXCIsXG4gICAgbGlzdDpbXSxcbiAgICBvcmRlckV4cHJlc3M6e30sXG4gICAgZXhwcmVzc0Zsb3dJbmZvOnt9XG4gIH1cblxuICBhc3luYyBnZXRPcmRlckluZm8oY3VycmVudFBhZ2Usc2l6ZSkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8pIHx8IHt9O1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0T3JkZXJJbmZvKHtcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIG9yZGVyTm86IHRoaXMub3JkZXJOb1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICB0aGlzLm9iaj1qc29uLmRhdGEub2JqO1xuICAgICAgdGhhdC5saXN0PVtdO1xuICAgICAgdGhhdC5saXN0ID0gWy4uLnRoYXQubGlzdCwgLi4uanNvbi5kYXRhLm9iai5vcmRlckl0ZW1MaXN0XTtcbiAgICAgIHRoYXQuJGludm9rZSgnc2hvcEl0ZW1MaXN0JywgJ3JlZnJlc2hMaXN0JywgdGhhdC5saXN0KTtcblxuICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PWxpc3Tov5Tlm57mlbDmja49PT09PT09PVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoYXQubGlzdCk7XG4gICAgICBjb25zb2xlLmxvZyhqc29uLmRhdGEub2JqLm9yZGVySXRlbUxpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLm1zZylcbiAgICB9XG5cbiAgICB0aGF0LiRhcHBseSgpO1xuICB9XG5cbiAgYXN5bmMgZWRpdE9yZGVySW5mbyhvcmRlck5vLGZsYWcpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmVkaXRPcmRlckluZm8oe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgb3JkZXJObzogb3JkZXJObyxcbiAgICAgICAgZmxhZzpmbGFnXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT1senrov5Tlm57mlbDmja49PT09PT09PT1cIilcbiAgICAgIGNvbnNvbGUubG9nKGpzb24uZGF0YS5lcnJlclRpcHMpO1xuICAgICAgLyp0aGF0Lmxpc3QgPSBbLi4udGhhdC5saXN0LCAuLi5qc29uLmRhdGEuZXJyZXJUaXBzLm9yZGVySXRlbUxpc3RdO1xuICAgICAgdGhhdC4kaW52b2tlKCdzaG9wSXRlbUxpc3QnLCAncmVmcmVzaExpc3QnLCB0aGF0Lmxpc3QpO1xuICAgICAgY29uc29sZS5sb2coanNvbi5kYXRhLmVycmVyVGlwcy5vcmRlckl0ZW1MaXN0KTtcbiAgICAgIGNvbnNvbGUubG9nKHRoYXQubGlzdCk7Ki9cbiAgICAgIGlmICh0aGlzLmZsYWc9PTIpIHsvL+WIoOmZpFxuXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKVxuICAgIH1cbiAgICB0aGF0LiRhcHBseSgpO1xuICB9XG5cbiAgYXN5bmMgZ2V0T3JkZXJFeHByZXNzSW5mbygpIHtcbiAgICBjb25zb2xlLmxvZyhcIm9yZGVyTm9cIilcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLm9yZGVyRXhwcmVzc0luZm8oe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgb3JkZXJObzogdGhpcy5vcmRlck5vXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgIHRoYXQub3JkZXJFeHByZXNzPWpzb24uZGF0YS5vcmRlckV4cHJlc3M7XG4gICAgICB0aGF0LmV4cHJlc3NGbG93SW5mbz1qc29uLmRhdGEuZXhwcmVzc0Zsb3dJbmZvO1xuICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PWxpc3Tov5Tlm57mlbDmja49PT09PT09PVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoYXQubGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKVxuICAgIH1cblxuICAgIHRoYXQuJGFwcGx5KCk7XG4gIH1cblxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wic2hvcEl0ZW1MaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpnb29kc0xpc3Quc3luY1wiOlwibGlzdFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgc2hvcEl0ZW1MaXN0OiBTaG9wSXRlbUxpc3RcbiAgfVxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAvL3RoYXQubGlzdCA9IGJiLnJlc3VsdC5wcm9kdWN0cztcbiAgICB0aGlzLm9yZGVyTm89b3B0aW9ucy5vcmRlck5vO1xuICAgIHRoYXQuZ2V0T3JkZXJJbmZvKCk7XG4gICAgdGhhdC5nZXRPcmRlckV4cHJlc3NJbmZvKCk7XG4gICAgY29uc29sZS5sb2coYmIucmVzdWx0LnByb2R1Y3RzKVxuICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09b3B0aW9ucz09PT09PT09PT1cIik7XG4gICAgY29uc29sZS5sb2cob3B0aW9ucy5pZCk7XG4gIH1cbiAgY29tcHV0ZWQgPSB7XG5cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGFzeW5jIGRlbE9yZGVyKGUpIHtcbiAgICAgIHRoaXMuZmxhZz0yO1xuICAgICAgdGhpcy5vcmRlck5vID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQ7XG4gICAgICBhd2FpdCB0aXAuY29uZmlybSgn5piv5ZCm5Yig6Zmk6K6i5Y2VJyk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmZsYWcpO1xuICAgICAgdGhpcy5lZGl0T3JkZXJJbmZvKHRoaXMub3JkZXJObyx0aGlzLmZsYWcpO1xuICAgICAgY29uc29sZS5sb2coXCLliKDpmaTmiJDlip9cIilcbiAgICB9LFxuICAgIGFzeW5jIGNvbXBsZXRpb24oZSkge1xuICAgICAgdGhpcy5mbGFnPTM7XG4gICAgICB0aGlzLm9yZGVyTm8gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZDtcbiAgICAgIGF3YWl0IHRpcC5jb25maXJtKCfmmK/lkKbnoa7orqTmlLbotKcnKTtcbiAgICAgIHRoaXMuZWRpdE9yZGVySW5mbyh0aGlzLm9yZGVyTm8sdGhpcy5mbGFnKTtcbiAgICAgIGNvbnNvbGUubG9nKFwi5a6M5oiQXCIpXG4gICAgfSxcbiAgICBhc3luYyBnb0xvZ2lzdGljcygpIHtcbiAgICAgIHRpcC5jb25maXJtKCfmn6XnnIvnianmtYEnKTtcbiAgICB9LFxuICAgIGFzeW5jIHBheU1vbmV5KGUpIHtcbiAgICAgIGxldCB0cmFkZU5vID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudHJhZGVubztcbiAgICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcblxuICAgICAgY29uc3QgcGF5ID0gYXdhaXQgYXBpLnRvUGF5KHtcbiAgICAgICAgcXVlcnk6e1xuICAgICAgICAgIG9wZW5JZDogb3BlbklkLFxuICAgICAgICAgIG9yZGVyTm86IHRyYWRlTm9cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocGF5LmRhdGEuY29kZT09MCkge1xuICAgICAgICAvL+S7peS4i+aYr+W+ruS/oeaUr+S7mFxuICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgYXBwSWQ6IHBheS5kYXRhLmFwcElkLFxuICAgICAgICAgIHRpbWVTdGFtcDogcGF5LmRhdGEudGltZVN0YW1wLFxuICAgICAgICAgIG5vbmNlU3RyOiBwYXkuZGF0YS5ub25jZVN0cixcbiAgICAgICAgICBwYWNrYWdlOiBwYXkuZGF0YS5wYWNrYWdlLFxuICAgICAgICAgIHNpZ25UeXBlOiAnTUQ1JyxcbiAgICAgICAgICBwYXlTaWduOiBwYXkuZGF0YS5wYXlTaWduLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXknLCByZXMpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgLy/mlK/ku5jmiJDlip8g5YWz6ZetbG9hZGRpbmcg6Lez6L2s5Yiw5pSv5LuY5oiQ5Yqf6aG16Z2iXG4gICAgICAgICAgICAgIHRpcC5sb2FkZWQoKTtcbiAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6IFwiL3BhZ2VzL3BheV9zdWNjZXNzP29yZGVyTm89XCIrdHJhZGVOb1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSwgMjAwMClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIHRpcC5hbGVydCgn5pSv5LuY5aSx6LSlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGlwLmFsZXJ0KCfmlK/ku5jlpLHotKUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBldmVudHMgPSB7XG5cbiAgfVxuXG59XG5cbiJdfQ==