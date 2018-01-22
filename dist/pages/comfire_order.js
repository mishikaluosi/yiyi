'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _constant = require('./../utils/constant.js');

var _wepySwipeDelete = require('./../components/common/wepy-swipe-delete.js');

var _wepySwipeDelete2 = _interopRequireDefault(_wepySwipeDelete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ComfireOrder = function (_wepy$page) {
  _inherits(ComfireOrder, _wepy$page);

  function ComfireOrder() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ComfireOrder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ComfireOrder.__proto__ || Object.getPrototypeOf(ComfireOrder)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '确认订单'
    }, _this.$repeat = { "list": { "com": "swipeDelete", "props": "swipeData" } }, _this.$props = { "swipeDelete": { "xmlns:v-bind": { "value": "", "for": "list", "item": "item", "index": "index", "key": "index" }, "v-bind:swipeData.once": { "value": "item", "type": "item", "for": "list", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "list", "item": "item", "index": "index", "key": "index" } } }, _this.$events = { "swipeDelete": { "v-on:delItem": "handleDelItem" } }, _this.components = {
      swipeDelete: _wepySwipeDelete2.default
    }, _this.data = {
      list: [],
      goodsId: "",
      //卖家留言
      sellerMessage: "",

      //是否存在默认地址
      is_exit_address: false,
      address: {},
      //总价
      totalPrice: 0,
      actualPrice: 0,
      purchaseType: 1,
      //总积分
      total_jf_num: 0,
      can_use_score: 0,
      deduScore: 0,
      deduFee: 0,
      //输入抵扣积分
      jf_num: 0,
      reduce_fee: 0,
      operating: false

      //获取订单详情
    }, _this.computed = {}, _this.methods = {
      handleDelItem: function handleDelItem(itemData) {
        this.deleteGoods(itemData);
      },
      bindKeyInput: function bindKeyInput(e) {
        this.sellerMessage = e.detail.value;
        console.log("====" + e.detail.value);
      },
      goPay: function goPay(e) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var fId;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  fId = e.detail.formId;

                  if (_this2.is_exit_address) {
                    _context.next = 6;
                    break;
                  }

                  _context.next = 4;
                  return _tip2.default.confirm('你未设置收货地址，请设置地址');

                case 4:
                  _wepy2.default.navigateTo({
                    url: "/pages/address?type=order"
                  });
                  return _context.abrupt('return', false);

                case 6:
                  _this2.goToPay(fId);

                case 7:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }))();
      },
      setAddress: function setAddress() {
        _wepy2.default.navigateTo({
          url: "/pages/address?type=order"
        });
      },
      jianBtnTap: function jianBtnTap(e) {
        if (this.operating) {
          return;
        }
        this.operating = true;
        var index = parseInt(e.currentTarget.dataset.index);
        var id = e.currentTarget.dataset.id;
        var num = this.list[index].num;
        // 如果只有1件了，就不允许再减了
        if (num > 1) {
          num--;
        } else {
          return;
        }
        // 购物车数据
        //this.list[index].num = num;
        //this.totalPrice = this.totalPrice-this.list[index].price;
        //this.actualPrice = this.totalPrice - this.reduce_fee;
        //this.$apply();
        this.reduceGoodNum(id, num, index);
      },
      jiaBtnTap: function jiaBtnTap(e) {
        if (this.operating) {
          return;
        }
        this.operating = true;
        var index = parseInt(e.currentTarget.dataset.index);
        var num = this.list[index].num;
        var id = e.currentTarget.dataset.id;
        // 自增
        num++;
        // 购物车数据
        /*this.list[index].num = num;
        this.totalPrice = parseInt(this.totalPrice)+parseInt(this.list[index].price);
        this.actualPrice = this.totalPrice - this.reduce_fee;
        this.$apply();*/
        this.addGoodNum(id, num, index);
      },
      jfInput: function jfInput(e) {
        var num = e.detail.value * 10 / 10;
        var reg = /^[0-9]+$/;
        if (!reg.test(num)) {
          _tip2.default.error("输入类型有误");
          this.jf_num = "";
          return {
            value: ""
          };;
        }
        if (this.can_use_score != num && num != 0) {
          this.jf_num = this.can_use_score;
        } /* else if(parseInt(this.jf_num)%this.deduScore) {
           this.jf_num = Math.floor(parseInt(this.jf_num)/this.deduScore)*this.deduScore;
          }*/else {
            this.jf_num = num;
          }
        var beishu = this.jf_num / this.deduScore;
        this.reduce_fee = beishu * this.deduFee;
        this.actualPrice = this.totalPrice - this.reduce_fee;
        return {
          value: this.jf_num
        };
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ComfireOrder, [{
    key: 'getOrderDetailInfo',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var that, userSpecialInfo, openId, json, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context2.next = 5;
                return _api2.default.preOrder({
                  query: {
                    openId: openId,
                    goodsId: that.goodsId
                  }
                });

              case 5:
                json = _context2.sent;

                if (json.data.code == 0) {
                  data = json.data;

                  this.list = data.goodsList;
                  this.totalPrice = data.totalPrice;
                  this.actualPrice = data.actualPrice;
                  this.is_exit_address = data.hasDefaultAddress;
                  this.address = data.defaultAddress;
                  this.total_jf_num = data.userScore;
                  this.can_use_score = data.canUseScore;
                  this.deduScore = data.deduScore;
                  this.deduFee = data.deduFee;
                  this.jf_num = data.canUseScore;
                  this.reduce_fee = data.reduceFee;
                } else {
                  _tip2.default.error(json.data.msg);
                }
                that.$apply();

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getOrderDetailInfo() {
        return _ref2.apply(this, arguments);
      }

      return getOrderDetailInfo;
    }()
  }, {
    key: 'getAddressInfo',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var userSpecialInfo, json;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                _context3.next = 3;
                return _api2.default.receiverInfoById({
                  query: {
                    id: id
                  }
                });

              case 3:
                json = _context3.sent;

                if (json.data.code == 0) {
                  this.is_exit_address = true;
                  this.address = json.data.receiverInfo;
                } else {
                  _tip2.default.error(json.data.msg);
                }

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAddressInfo(_x) {
        return _ref3.apply(this, arguments);
      }

      return getAddressInfo;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      var that = this;
      this.actualPrice = 0;
      this.totalPrice = 0;
      this.total_jf_num = 0;
      this.can_use_score = 0;
      this.deduScore = 0;
      this.deduFee = 0;
      this.jf_num = 0;
      this.reduce_fee = 0;
      this.operating = false;
      that.goodsId = option.goodsId == undefined ? "" : option.goodsId;
      this.purchaseType = option.purchasetype == undefined ? "1" : option.purchasetype;
      /*that.list = bb.result.products;
      console.log(bb.result.products)*/
      that.getOrderDetailInfo();
      var from = option.from == undefined ? "" : option.from;
      if (from == "selAdd") {
        this.getAddressInfo(_wepy2.default.getStorageSync(_constant.ADDRESS_ID));
      }
    }
  }, {
    key: 'goToPay',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(formId) {
        var userSpecialInfo, openId, json, pay;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                //测试调用接口用，可注释
                _tip2.default.loading("提交订单中");
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context4.next = 5;
                return _api2.default.saveByCart({
                  query: {
                    openId: openId,
                    receiverInfoId: this.address.id,
                    businessMessage: this.sellerMessage,
                    formId: formId,
                    reduceScore: this.jf_num
                  }
                });

              case 5:
                json = _context4.sent;

                if (!(json.data.code == 0)) {
                  _context4.next = 17;
                  break;
                }

                if (!(this.purchaseType == 2)) {
                  _context4.next = 11;
                  break;
                }

                //补货
                _tip2.default.success("已提交补货申请!");
                setTimeout(function () {
                  _tip2.default.loaded();
                  _wepy2.default.navigateTo({
                    url: "/pages/reorder"
                  });
                }, 2000);
                return _context4.abrupt('return');

              case 11:
                _context4.next = 13;
                return _api2.default.toPay({
                  query: {
                    openId: openId,
                    orderNo: json.data.tradeNo
                  }
                });

              case 13:
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
                          url: "/pages/pay_success?orderNo=" + json.data.tradeNo
                        });
                      }, 2000);
                    },
                    fail: function fail(res) {
                      _tip2.default.alert('支付失败');
                      setTimeout(function () {
                        //支付成功 关闭loadding 跳转到支付成功页面
                        _tip2.default.loaded();
                        _wepy2.default.navigateTo({
                          url: "/pages/order"
                        });
                      }, 2000);
                    }
                  });
                } else {
                  _tip2.default.alert('支付失败');
                  setTimeout(function () {
                    //支付成功 关闭loadding 跳转到支付成功页面
                    _tip2.default.loaded();
                    _wepy2.default.navigateTo({
                      url: "/pages/order"
                    });
                  }, 2000);
                }
                _context4.next = 18;
                break;

              case 17:
                _tip2.default.error(json.data.msg);

              case 18:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function goToPay(_x2) {
        return _ref4.apply(this, arguments);
      }

      return goToPay;
    }()
  }, {
    key: 'reduceGoodNum',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id, num, index) {
        var userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context5.next = 4;
                return _api2.default.cartUpdateNum({
                  query: {
                    openId: openId,
                    id: id,
                    num: num
                  }
                });

              case 4:
                json = _context5.sent;

                if (json.data.code == 0) {
                  // 购物车数据
                  this.list[index].num = num;
                  this.totalPrice = this.totalPrice - this.list[index].price;
                  this.actualPrice = this.totalPrice - this.reduce_fee;
                  this.operating = false;
                } else {
                  _tip2.default.error(json.data.msg);
                }
                this.$apply();

              case 7:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function reduceGoodNum(_x3, _x4, _x5) {
        return _ref5.apply(this, arguments);
      }

      return reduceGoodNum;
    }()
  }, {
    key: 'addGoodNum',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id, num, index) {
        var userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context6.next = 4;
                return _api2.default.cartUpdateNum({
                  query: {
                    openId: openId,
                    id: id,
                    num: num
                  }
                });

              case 4:
                json = _context6.sent;

                if (json.data.code == 0) {
                  // 购物车数据
                  this.list[index].num = num;
                  this.totalPrice = parseInt(this.totalPrice) + parseInt(this.list[index].price);
                  this.actualPrice = this.totalPrice - this.reduce_fee;
                  this.operating = false;
                } else {
                  _tip2.default.error(json.data.msg);
                }
                this.$apply();

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function addGoodNum(_x6, _x7, _x8) {
        return _ref6.apply(this, arguments);
      }

      return addGoodNum;
    }()
  }, {
    key: 'deleteGoods',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(itemData) {
        var id, userSpecialInfo, openId, json, retList, i;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                id = itemData.id;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context7.next = 5;
                return _api2.default.cartDel({
                  query: {
                    openId: openId,
                    cartIdList: [id]
                  }
                });

              case 5:
                json = _context7.sent;

                if (!(json.data.code == 0)) {
                  _context7.next = 23;
                  break;
                }

                // 购物车数据
                retList = [];
                i = 0;

              case 9:
                if (!(i < this.list.length)) {
                  _context7.next = 20;
                  break;
                }

                if (!(this.list[i].id == id)) {
                  _context7.next = 16;
                  break;
                }

                this.totalPrice -= parseInt(this.list[i].priceSubtotal);
                this.actualPrice = this.totalPrice - this.reduce_fee;
                return _context7.abrupt('continue', 17);

              case 16:
                retList.push(this.list[i]);

              case 17:
                i++;
                _context7.next = 9;
                break;

              case 20:
                this.list = retList;
                _context7.next = 24;
                break;

              case 23:
                _tip2.default.error(json.data.msg);

              case 24:
                this.$apply();

              case 25:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function deleteGoods(_x9) {
        return _ref7.apply(this, arguments);
      }

      return deleteGoods;
    }()
  }]);

  return ComfireOrder;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ComfireOrder , 'pages/comfire_order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbWZpcmVfb3JkZXIuanMiXSwibmFtZXMiOlsiQ29tZmlyZU9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInN3aXBlRGVsZXRlIiwiZGF0YSIsImxpc3QiLCJnb29kc0lkIiwic2VsbGVyTWVzc2FnZSIsImlzX2V4aXRfYWRkcmVzcyIsImFkZHJlc3MiLCJ0b3RhbFByaWNlIiwiYWN0dWFsUHJpY2UiLCJwdXJjaGFzZVR5cGUiLCJ0b3RhbF9qZl9udW0iLCJjYW5fdXNlX3Njb3JlIiwiZGVkdVNjb3JlIiwiZGVkdUZlZSIsImpmX251bSIsInJlZHVjZV9mZWUiLCJvcGVyYXRpbmciLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJoYW5kbGVEZWxJdGVtIiwiaXRlbURhdGEiLCJkZWxldGVHb29kcyIsImJpbmRLZXlJbnB1dCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJnb1BheSIsImZJZCIsImZvcm1JZCIsImNvbmZpcm0iLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29Ub1BheSIsInNldEFkZHJlc3MiLCJqaWFuQnRuVGFwIiwiaW5kZXgiLCJwYXJzZUludCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJudW0iLCJyZWR1Y2VHb29kTnVtIiwiamlhQnRuVGFwIiwiYWRkR29vZE51bSIsImpmSW5wdXQiLCJyZWciLCJ0ZXN0IiwiZXJyb3IiLCJiZWlzaHUiLCJldmVudHMiLCJ0aGF0IiwidXNlclNwZWNpYWxJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJvcGVuSWQiLCJvcGVuaWQiLCJwcmVPcmRlciIsInF1ZXJ5IiwianNvbiIsImNvZGUiLCJnb29kc0xpc3QiLCJoYXNEZWZhdWx0QWRkcmVzcyIsImRlZmF1bHRBZGRyZXNzIiwidXNlclNjb3JlIiwiY2FuVXNlU2NvcmUiLCJyZWR1Y2VGZWUiLCJtc2ciLCIkYXBwbHkiLCJyZWNlaXZlckluZm9CeUlkIiwicmVjZWl2ZXJJbmZvIiwib3B0aW9uIiwidW5kZWZpbmVkIiwicHVyY2hhc2V0eXBlIiwiZ2V0T3JkZXJEZXRhaWxJbmZvIiwiZnJvbSIsImdldEFkZHJlc3NJbmZvIiwibG9hZGluZyIsInNhdmVCeUNhcnQiLCJyZWNlaXZlckluZm9JZCIsImJ1c2luZXNzTWVzc2FnZSIsInJlZHVjZVNjb3JlIiwic3VjY2VzcyIsInNldFRpbWVvdXQiLCJsb2FkZWQiLCJ0b1BheSIsIm9yZGVyTm8iLCJ0cmFkZU5vIiwicGF5Iiwid3giLCJyZXF1ZXN0UGF5bWVudCIsImFwcElkIiwidGltZVN0YW1wIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwic2lnblR5cGUiLCJwYXlTaWduIiwicmVzIiwiZmFpbCIsImFsZXJ0IiwiY2FydFVwZGF0ZU51bSIsInByaWNlIiwiY2FydERlbCIsImNhcnRJZExpc3QiLCJyZXRMaXN0IiwiaSIsImxlbmd0aCIsInByaWNlU3VidG90YWwiLCJwdXNoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBS0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRUFBQyxRQUFPLEVBQUMsT0FBTSxhQUFQLEVBQXFCLFNBQVEsV0FBN0IsRUFBUixFLFFBQ1hDLE0sR0FBUyxFQUFDLGVBQWMsRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sTUFBbEIsRUFBeUIsUUFBTyxNQUFoQyxFQUF1QyxTQUFRLE9BQS9DLEVBQXVELE9BQU0sT0FBN0QsRUFBaEIsRUFBc0YseUJBQXdCLEVBQUMsU0FBUSxNQUFULEVBQWdCLFFBQU8sTUFBdkIsRUFBOEIsT0FBTSxNQUFwQyxFQUEyQyxRQUFPLE1BQWxELEVBQXlELFNBQVEsT0FBakUsRUFBeUUsT0FBTSxPQUEvRSxFQUE5RyxFQUFzTSxjQUFhLEVB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QzdEQyxzQixHQUFTRixnQkFBZ0JHLE07O3VCQUNWLGNBQUk4QyxPQUFKLENBQVk7QUFDN0I1Qyx5QkFBTztBQUNMSCw0QkFBUUEsTUFESDtBQUVMZ0QsZ0NBQVksQ0FBQzlELEVBQUQ7QUFGUDtBQURzQixpQkFBWixDOzs7QUFBYmtCLG9COztzQkFNRkEsS0FBSzFELElBQUwsQ0FBVTJELElBQVYsSUFBa0IsQzs7Ozs7QUFDcEI7QUFDSTRDLHVCLEdBQVUsRTtBQUNMQyxpQixHQUFJLEM7OztzQkFBR0EsSUFBSSxLQUFLdkcsSUFBTCxDQUFVd0csTTs7Ozs7c0JBQ3hCLEtBQUt4RyxJQUFMLENBQVV1RyxDQUFWLEVBQWFoRSxFQUFiLElBQW1CQSxFOzs7OztBQUNyQixxQkFBS2xDLFVBQUwsSUFBbUIrQixTQUFTLEtBQUtwQyxJQUFMLENBQVV1RyxDQUFWLEVBQWFFLGFBQXRCLENBQW5CO0FBQ0EscUJBQUtuRyxXQUFMLEdBQW1CLEtBQUtELFVBQUwsR0FBa0IsS0FBS1EsVUFBMUM7Ozs7QUFHQXlGLHdCQUFRSSxJQUFSLENBQWEsS0FBSzFHLElBQUwsQ0FBVXVHLENBQVYsQ0FBYjs7O0FBTmtDQSxtQjs7Ozs7QUFTdEMscUJBQUt2RyxJQUFMLEdBQVlzRyxPQUFaOzs7OztBQUVBLDhCQUFJdkQsS0FBSixDQUFVVSxLQUFLMUQsSUFBTCxDQUFVa0UsR0FBcEI7OztBQUVGLHFCQUFLQyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBL1BzQyxlQUFLeUMsSTs7a0JBQTFCcEgsWSIsImZpbGUiOiJjb21maXJlX29yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSc7XG5pbXBvcnQgdGlwIGZyb20gJy4uL3V0aWxzL3RpcCc7XG5pbXBvcnQge1xuICBTWVNURU1fSU5GTyxcbiAgVVNFUl9TUEVDSUNBTF9JTkZPLFxuICBBRERSRVNTX0lEXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50JztcbmltcG9ydCBzd2lwZURlbGV0ZSBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1vbi93ZXB5LXN3aXBlLWRlbGV0ZSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbWZpcmVPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56Gu6K6k6K6i5Y2VJyxcbiAgfVxuICRyZXBlYXQgPSB7XCJsaXN0XCI6e1wiY29tXCI6XCJzd2lwZURlbGV0ZVwiLFwicHJvcHNcIjpcInN3aXBlRGF0YVwifX07XHJcbiRwcm9wcyA9IHtcInN3aXBlRGVsZXRlXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6c3dpcGVEYXRhLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHtcInN3aXBlRGVsZXRlXCI6e1widi1vbjpkZWxJdGVtXCI6XCJoYW5kbGVEZWxJdGVtXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgc3dpcGVEZWxldGVcbiAgfVxuXG4gIGRhdGEgPSB7XG4gICAgbGlzdDogW10sXG4gICAgZ29vZHNJZDogXCJcIixcbiAgICAvL+WNluWutueVmeiogFxuICAgIHNlbGxlck1lc3NhZ2U6IFwiXCIsXG5cbiAgICAvL+aYr+WQpuWtmOWcqOm7mOiupOWcsOWdgFxuICAgIGlzX2V4aXRfYWRkcmVzczogZmFsc2UsXG4gICAgYWRkcmVzczoge30sXG4gICAgLy/mgLvku7dcbiAgICB0b3RhbFByaWNlOjAsXG4gICAgYWN0dWFsUHJpY2UgOiAwLFxuICAgIHB1cmNoYXNlVHlwZSA6IDEsXG4gICAgLy/mgLvnp6/liIZcbiAgICB0b3RhbF9qZl9udW06IDAsXG4gICAgY2FuX3VzZV9zY29yZTowLFxuICAgIGRlZHVTY29yZTowLFxuICAgIGRlZHVGZWUgOiAwLFxuICAgIC8v6L6T5YWl5oq15omj56ev5YiGXG4gICAgamZfbnVtOiAwLFxuICAgIHJlZHVjZV9mZWUgOiAwLFxuICAgIG9wZXJhdGluZzogZmFsc2VcbiAgfVxuXG4gIC8v6I635Y+W6K6i5Y2V6K+m5oOFXG4gIGFzeW5jIGdldE9yZGVyRGV0YWlsSW5mbygpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLnByZU9yZGVyKHtcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIG9wZW5JZDogb3BlbklkLFxuICAgICAgICBnb29kc0lkOiB0aGF0Lmdvb2RzSWRcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgbGV0IGRhdGEgPSBqc29uLmRhdGE7XG4gICAgICB0aGlzLmxpc3QgPSBkYXRhLmdvb2RzTGlzdDtcbiAgICAgIHRoaXMudG90YWxQcmljZSA9IGRhdGEudG90YWxQcmljZTtcbiAgICAgIHRoaXMuYWN0dWFsUHJpY2UgPSBkYXRhLmFjdHVhbFByaWNlO1xuICAgICAgdGhpcy5pc19leGl0X2FkZHJlc3MgPSBkYXRhLmhhc0RlZmF1bHRBZGRyZXNzO1xuICAgICAgdGhpcy5hZGRyZXNzID0gZGF0YS5kZWZhdWx0QWRkcmVzcztcbiAgICAgIHRoaXMudG90YWxfamZfbnVtID0gZGF0YS51c2VyU2NvcmU7XG4gICAgICB0aGlzLmNhbl91c2Vfc2NvcmUgPSBkYXRhLmNhblVzZVNjb3JlO1xuICAgICAgdGhpcy5kZWR1U2NvcmUgPSBkYXRhLmRlZHVTY29yZTtcbiAgICAgIHRoaXMuZGVkdUZlZSA9IGRhdGEuZGVkdUZlZTtcbiAgICAgIHRoaXMuamZfbnVtID0gZGF0YS5jYW5Vc2VTY29yZTtcbiAgICAgIHRoaXMucmVkdWNlX2ZlZSA9IGRhdGEucmVkdWNlRmVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLm1zZylcbiAgICB9XG4gICAgdGhhdC4kYXBwbHkoKTtcbiAgfVxuXG4gIGFzeW5jIGdldEFkZHJlc3NJbmZvKGlkKSB7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLnJlY2VpdmVySW5mb0J5SWQoe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgaWQ6IGlkXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgIHRoaXMuaXNfZXhpdF9hZGRyZXNzID0gdHJ1ZTtcbiAgICAgIHRoaXMuYWRkcmVzcz1qc29uLmRhdGEucmVjZWl2ZXJJbmZvO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLm1zZylcbiAgICB9XG4gIH1cblxuICBvbkxvYWQob3B0aW9uKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHRoaXMuYWN0dWFsUHJpY2UgPSAwO1xuICAgIHRoaXMudG90YWxQcmljZSA9IDA7XG4gICAgdGhpcy50b3RhbF9qZl9udW0gPSAwO1xuICAgIHRoaXMuY2FuX3VzZV9zY29yZSA9IDA7XG4gICAgdGhpcy5kZWR1U2NvcmUgPSAwO1xuICAgIHRoaXMuZGVkdUZlZSA9IDA7XG4gICAgdGhpcy5qZl9udW0gPSAwO1xuICAgIHRoaXMucmVkdWNlX2ZlZSA9IDA7XG4gICAgdGhpcy5vcGVyYXRpbmcgPSBmYWxzZTtcbiAgICB0aGF0Lmdvb2RzSWQgPSBvcHRpb24uZ29vZHNJZD09dW5kZWZpbmVkP1wiXCI6b3B0aW9uLmdvb2RzSWQ7XG4gICAgdGhpcy5wdXJjaGFzZVR5cGUgPSBvcHRpb24ucHVyY2hhc2V0eXBlPT11bmRlZmluZWQ/XCIxXCI6b3B0aW9uLnB1cmNoYXNldHlwZTtcbiAgICAvKnRoYXQubGlzdCA9IGJiLnJlc3VsdC5wcm9kdWN0cztcbiAgICBjb25zb2xlLmxvZyhiYi5yZXN1bHQucHJvZHVjdHMpKi9cbiAgICB0aGF0LmdldE9yZGVyRGV0YWlsSW5mbygpO1xuICAgIGxldCBmcm9tID0gb3B0aW9uLmZyb209PXVuZGVmaW5lZD9cIlwiOm9wdGlvbi5mcm9tO1xuICAgIGlmIChmcm9tPT1cInNlbEFkZFwiKSB7XG4gICAgICB0aGlzLmdldEFkZHJlc3NJbmZvKHdlcHkuZ2V0U3RvcmFnZVN5bmMoQUREUkVTU19JRCkpXG4gICAgfVxuICB9XG4gIGNvbXB1dGVkID0ge1xuXG4gIH1cblxuICBhc3luYyBnb1RvUGF5KGZvcm1JZCkge1xuICAgIC8v5rWL6K+V6LCD55So5o6l5Y+j55So77yM5Y+v5rOo6YeKXG4gICAgdGlwLmxvYWRpbmcoXCLmj5DkuqTorqLljZXkuK1cIik7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLnNhdmVCeUNhcnQoe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgIHJlY2VpdmVySW5mb0lkOiB0aGlzLmFkZHJlc3MuaWQsXG4gICAgICAgIGJ1c2luZXNzTWVzc2FnZTogdGhpcy5zZWxsZXJNZXNzYWdlLFxuICAgICAgICBmb3JtSWQ6IGZvcm1JZCxcbiAgICAgICAgcmVkdWNlU2NvcmU6IHRoaXMuamZfbnVtXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgLy/ooaXotKfnm7TmjqXmj5DkuqTliLDlkI7lj7DljrvlrqHmoLhcbiAgICAgIGlmICh0aGlzLnB1cmNoYXNlVHlwZT09Mikgey8v6KGl6LSnXG4gICAgICAgIHRpcC5zdWNjZXNzKFwi5bey5o+Q5Lqk6KGl6LSn55Sz6K+3IVwiKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGlwLmxvYWRlZCgpO1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6IFwiL3BhZ2VzL3Jlb3JkZXJcIlxuICAgICAgICAgIH0pXG4gICAgICAgIH0sIDIwMDApXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8v5L+d5a2Y5oiQ5Yqf5LqG5ZCO6L+b6KGM5b6u5L+h5pSv5LuYXG4gICAgICBjb25zdCBwYXkgPSBhd2FpdCBhcGkudG9QYXkoe1xuICAgICAgICBxdWVyeTp7XG4gICAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgICAgb3JkZXJObzoganNvbi5kYXRhLnRyYWRlTm9cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocGF5LmRhdGEuY29kZT09MCkge1xuICAgICAgICAvL+S7peS4i+aYr+W+ruS/oeaUr+S7mFxuICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgYXBwSWQ6IHBheS5kYXRhLmFwcElkLFxuICAgICAgICAgIHRpbWVTdGFtcDogcGF5LmRhdGEudGltZVN0YW1wLFxuICAgICAgICAgIG5vbmNlU3RyOiBwYXkuZGF0YS5ub25jZVN0cixcbiAgICAgICAgICBwYWNrYWdlOiBwYXkuZGF0YS5wYWNrYWdlLFxuICAgICAgICAgIHNpZ25UeXBlOiAnTUQ1JyxcbiAgICAgICAgICBwYXlTaWduOiBwYXkuZGF0YS5wYXlTaWduLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXknLCByZXMpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgLy/mlK/ku5jmiJDlip8g5YWz6ZetbG9hZGRpbmcg6Lez6L2s5Yiw5pSv5LuY5oiQ5Yqf6aG16Z2iXG4gICAgICAgICAgICAgIHRpcC5sb2FkZWQoKTtcbiAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6IFwiL3BhZ2VzL3BheV9zdWNjZXNzP29yZGVyTm89XCIranNvbi5kYXRhLnRyYWRlTm9cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sIDIwMDApXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICB0aXAuYWxlcnQoJ+aUr+S7mOWksei0pScpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIC8v5pSv5LuY5oiQ5YqfIOWFs+mXrWxvYWRkaW5nIOi3s+i9rOWIsOaUr+S7mOaIkOWKn+mhtemdolxuICAgICAgICAgICAgICB0aXAubG9hZGVkKCk7XG4gICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBcIi9wYWdlcy9vcmRlclwiXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LCAyMDAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpcC5hbGVydCgn5pSv5LuY5aSx6LSlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIC8v5pSv5LuY5oiQ5YqfIOWFs+mXrWxvYWRkaW5nIOi3s+i9rOWIsOaUr+S7mOaIkOWKn+mhtemdolxuICAgICAgICAgIHRpcC5sb2FkZWQoKTtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiBcIi9wYWdlcy9vcmRlclwiXG4gICAgICAgICAgfSlcbiAgICAgICAgfSwgMjAwMClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5tc2cpXG4gICAgfVxuXG4gIH1cblxuICBhc3luYyByZWR1Y2VHb29kTnVtKGlkLCBudW0sIGluZGV4KSB7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmNhcnRVcGRhdGVOdW0oe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgbnVtOiBudW1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgLy8g6LSt54mp6L2m5pWw5o2uXG4gICAgICB0aGlzLmxpc3RbaW5kZXhdLm51bSA9IG51bTtcbiAgICAgIHRoaXMudG90YWxQcmljZSA9IHRoaXMudG90YWxQcmljZSAtIHRoaXMubGlzdFtpbmRleF0ucHJpY2U7XG4gICAgICB0aGlzLmFjdHVhbFByaWNlID0gdGhpcy50b3RhbFByaWNlIC0gdGhpcy5yZWR1Y2VfZmVlO1xuICAgICAgdGhpcy5vcGVyYXRpbmcgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5tc2cpXG4gICAgfVxuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH1cblxuICBhc3luYyBhZGRHb29kTnVtKGlkLCBudW0sIGluZGV4KSB7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmNhcnRVcGRhdGVOdW0oe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgbnVtOiBudW1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgLy8g6LSt54mp6L2m5pWw5o2uXG4gICAgICB0aGlzLmxpc3RbaW5kZXhdLm51bSA9IG51bTtcbiAgICAgIHRoaXMudG90YWxQcmljZSA9IHBhcnNlSW50KHRoaXMudG90YWxQcmljZSkgKyBwYXJzZUludCh0aGlzLmxpc3RbaW5kZXhdLnByaWNlKTtcbiAgICAgIHRoaXMuYWN0dWFsUHJpY2UgPSB0aGlzLnRvdGFsUHJpY2UgLSB0aGlzLnJlZHVjZV9mZWU7XG4gICAgICB0aGlzLm9wZXJhdGluZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLm1zZylcbiAgICB9XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZUdvb2RzKGl0ZW1EYXRhKSB7XG4gICAgdmFyIGlkID0gaXRlbURhdGEuaWQ7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmNhcnREZWwoe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgIGNhcnRJZExpc3Q6IFtpZF0sXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgIC8vIOi0reeJqei9puaVsOaNrlxuICAgICAgbGV0IHJldExpc3QgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RbaV0uaWQgPT0gaWQpIHtcbiAgICAgICAgICB0aGlzLnRvdGFsUHJpY2UgLT0gcGFyc2VJbnQodGhpcy5saXN0W2ldLnByaWNlU3VidG90YWwpO1xuICAgICAgICAgIHRoaXMuYWN0dWFsUHJpY2UgPSB0aGlzLnRvdGFsUHJpY2UgLSB0aGlzLnJlZHVjZV9mZWU7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0TGlzdC5wdXNoKHRoaXMubGlzdFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdCA9IHJldExpc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKVxuICAgIH1cbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBoYW5kbGVEZWxJdGVtKGl0ZW1EYXRhKSB7XG4gICAgICB0aGlzLmRlbGV0ZUdvb2RzKGl0ZW1EYXRhKTtcbiAgICB9LFxuICAgIGJpbmRLZXlJbnB1dChlKSB7XG4gICAgICB0aGlzLnNlbGxlck1lc3NhZ2UgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIGNvbnNvbGUubG9nKFwiPT09PVwiICsgZS5kZXRhaWwudmFsdWUpO1xuICAgIH0sXG4gICAgYXN5bmMgZ29QYXkoZSkge1xuICAgICAgdmFyIGZJZCA9IGUuZGV0YWlsLmZvcm1JZDtcbiAgICAgIGlmICghdGhpcy5pc19leGl0X2FkZHJlc3MpIHtcbiAgICAgICAgYXdhaXQgdGlwLmNvbmZpcm0oJ+S9oOacquiuvue9ruaUtui0p+WcsOWdgO+8jOivt+iuvue9ruWcsOWdgCcpO1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogXCIvcGFnZXMvYWRkcmVzcz90eXBlPW9yZGVyXCJcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy5nb1RvUGF5KGZJZCk7XG4gICAgfSxcbiAgICBzZXRBZGRyZXNzKCkge1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBcIi9wYWdlcy9hZGRyZXNzP3R5cGU9b3JkZXJcIlxuICAgICAgfSlcbiAgICB9LFxuICAgIGppYW5CdG5UYXAoZSkge1xuICAgICAgaWYgKHRoaXMub3BlcmF0aW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMub3BlcmF0aW5nID0gdHJ1ZTtcbiAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4KTtcbiAgICAgIHZhciBpZCA9ICBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZDtcbiAgICAgIHZhciBudW0gPSB0aGlzLmxpc3RbaW5kZXhdLm51bTtcbiAgICAgIC8vIOWmguaenOWPquaciTHku7bkuobvvIzlsLHkuI3lhYHorrjlho3lh4/kuoZcbiAgICAgIGlmIChudW0gPiAxKSB7XG4gICAgICAgIG51bSAtLTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIOi0reeJqei9puaVsOaNrlxuICAgICAgLy90aGlzLmxpc3RbaW5kZXhdLm51bSA9IG51bTtcbiAgICAgIC8vdGhpcy50b3RhbFByaWNlID0gdGhpcy50b3RhbFByaWNlLXRoaXMubGlzdFtpbmRleF0ucHJpY2U7XG4gICAgICAvL3RoaXMuYWN0dWFsUHJpY2UgPSB0aGlzLnRvdGFsUHJpY2UgLSB0aGlzLnJlZHVjZV9mZWU7XG4gICAgICAvL3RoaXMuJGFwcGx5KCk7XG4gICAgICB0aGlzLnJlZHVjZUdvb2ROdW0oaWQsIG51bSwgaW5kZXgpO1xuICAgIH0sXG4gICAgamlhQnRuVGFwKGUpIHtcbiAgICAgIGlmICh0aGlzLm9wZXJhdGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLm9wZXJhdGluZyA9IHRydWU7XG4gICAgICB2YXIgaW5kZXggPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleCk7XG4gICAgICB2YXIgbnVtID0gdGhpcy5saXN0W2luZGV4XS5udW07XG4gICAgICB2YXIgaWQgPSAgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQ7XG4gICAgICAvLyDoh6rlop5cbiAgICAgIG51bSArKztcbiAgICAgIC8vIOi0reeJqei9puaVsOaNrlxuICAgICAgLyp0aGlzLmxpc3RbaW5kZXhdLm51bSA9IG51bTtcbiAgICAgIHRoaXMudG90YWxQcmljZSA9IHBhcnNlSW50KHRoaXMudG90YWxQcmljZSkrcGFyc2VJbnQodGhpcy5saXN0W2luZGV4XS5wcmljZSk7XG4gICAgICB0aGlzLmFjdHVhbFByaWNlID0gdGhpcy50b3RhbFByaWNlIC0gdGhpcy5yZWR1Y2VfZmVlO1xuICAgICAgdGhpcy4kYXBwbHkoKTsqL1xuICAgICAgdGhpcy5hZGRHb29kTnVtKGlkLCBudW0sIGluZGV4KTtcbiAgICB9LFxuICAgIGpmSW5wdXQoZSkge1xuICAgICAgbGV0IG51bSA9IGUuZGV0YWlsLnZhbHVlICogMTAgLyAxMDtcbiAgICAgIGxldCByZWcgPSAvXlswLTldKyQvO1xuICAgICAgaWYgKCFyZWcudGVzdChudW0pKSB7XG4gICAgICAgIHRpcC5lcnJvcihcIui+k+WFpeexu+Wei+acieivr1wiKTtcbiAgICAgICAgdGhpcy5qZl9udW09XCJcIjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogXCJcIlxuICAgICAgICB9OztcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNhbl91c2Vfc2NvcmUgIT0gbnVtICYmIG51bSAhPTAgICkge1xuICAgICAgICB0aGlzLmpmX251bSA9IHRoaXMuY2FuX3VzZV9zY29yZTtcbiAgICAgIH0vKiBlbHNlIGlmKHBhcnNlSW50KHRoaXMuamZfbnVtKSV0aGlzLmRlZHVTY29yZSkge1xuICAgICAgICB0aGlzLmpmX251bSA9IE1hdGguZmxvb3IocGFyc2VJbnQodGhpcy5qZl9udW0pL3RoaXMuZGVkdVNjb3JlKSp0aGlzLmRlZHVTY29yZTtcbiAgICAgIH0qLyBlbHNlIHtcbiAgICAgICAgdGhpcy5qZl9udW0gPSBudW07XG4gICAgICB9XG4gICAgICBsZXQgYmVpc2h1ID0gdGhpcy5qZl9udW0vdGhpcy5kZWR1U2NvcmU7XG4gICAgICB0aGlzLnJlZHVjZV9mZWUgPSBiZWlzaHUgKiB0aGlzLmRlZHVGZWU7XG4gICAgICB0aGlzLmFjdHVhbFByaWNlID0gdGhpcy50b3RhbFByaWNlIC0gdGhpcy5yZWR1Y2VfZmVlO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHRoaXMuamZfbnVtXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBldmVudHMgPSB7XG5cbiAgfVxufVxuXG4iXX0=