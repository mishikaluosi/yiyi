'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _constant = require('./../utils/constant.js');

var _wepySwipeDelete = require('./common/wepy-swipe-delete.js');

var _wepySwipeDelete2 = _interopRequireDefault(_wepySwipeDelete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shopCart = function (_wepy$component) {
  _inherits(shopCart, _wepy$component);

  function shopCart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, shopCart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = shopCart.__proto__ || Object.getPrototypeOf(shopCart)).call.apply(_ref, [this].concat(args))), _this), _this.$repeat = { "list": { "com": "swipeDelete", "props": "swipeData" } }, _this.$props = { "swipeDelete": { "xmlns:v-bind": { "value": "", "for": "list", "item": "item", "index": "index", "key": "index" }, "v-bind:swipeData.once": { "value": "item", "type": "item", "for": "list", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "list", "item": "item", "index": "index", "key": "index" } } }, _this.$events = { "swipeDelete": { "v-on:delItem": "handleDelItem" } }, _this.components = {
      swipeDelete: _wepySwipeDelete2.default
    }, _this.data = {
      list: [],
      noSelect: false,
      saveHidden: true,
      totalPrice: 0,
      operating: false,
      allChecked: true
      //获取购物车商品列表
    }, _this.computed = {}, _this.methods = {
      handleDelItem: function handleDelItem(itemData) {
        this.deleteGoods(itemData);
      },
      selectTap: function selectTap(e) {
        var id = e.currentTarget.dataset.id;
        var index = parseInt(e.currentTarget.dataset.index);
        var ischecked = this.list[index].ischecked;
        this.checkGoods(id, index, ischecked);
      },
      selectAll: function selectAll() {
        console.log("sele....");
        this.checkAllGoods();
      },
      getCartListMethod: function getCartListMethod() {
        this.getCartList();
      },
      jianBtnTap: function jianBtnTap(e) {
        if (this.operating) {
          return;
        }
        this.operating = true;
        var id = e.currentTarget.dataset.id;
        var index = parseInt(e.currentTarget.dataset.index);
        var num = this.list[index].num;
        // 如果只有1件了，就不允许再减了
        if (num > 1) {
          num--;
        } else {
          return;
        }
        this.reduceGoodNum(id, num, index);
      },
      jiaBtnTap: function jiaBtnTap(e) {
        if (this.operating) {
          return;
        }
        this.operating = true;
        var id = e.currentTarget.dataset.id;
        var index = parseInt(e.currentTarget.dataset.index);
        var num = this.list[index].num;
        // 自增
        num++;
        this.addGoodNum(id, num, index);
      },
      toPayOrder: function toPayOrder() {
        var purType = 1,
            prePurType = 1;
        var bOneType = true;
        var index = 0;
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].ischecked) {
            purType = this.list[i].type;
            if (index > 0) {
              if (purType != prePurType) {
                bOneType = false;
                break;
              }
            }
            prePurType = purType;
            index++;
          }
        }
        if (!bOneType) {
          _tip2.default.alert("先把补货的商品结算!");
          return;
        }
        _wepy2.default.navigateTo({
          url: "/pages/comfire_order?purchasetype=" + purType
        });
      },
      goIndex: function goIndex() {
        _wepy2.default.switchTab({
          url: "/pages/home"
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(shopCart, [{
    key: 'getCartList',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var that, userSpecialInfo, openId, json, data, i;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context.next = 5;
                return _api2.default.cartList({
                  query: {
                    openId: openId
                  }
                });

              case 5:
                json = _context.sent;

                if (!(json.data.code == 0)) {
                  _context.next = 20;
                  break;
                }

                data = json.data;

                this.list = data.list;
                this.totalPrice = data.totalPrice;
                i = 0;

              case 11:
                if (!(i < this.list.length)) {
                  _context.next = 18;
                  break;
                }

                if (this.list[i].ischecked) {
                  _context.next = 15;
                  break;
                }

                this.allChecked = false;
                return _context.abrupt('break', 18);

              case 15:
                i++;
                _context.next = 11;
                break;

              case 18:
                _context.next = 21;
                break;

              case 20:
                _tip2.default.error(json.data.msg);

              case 21:
                that.$apply();

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCartList() {
        return _ref2.apply(this, arguments);
      }

      return getCartList;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      this.operating = false;
      //that.list = bb.result.products;
      //console.log(bb.result.products)
      //that.getCartList();
    }
  }, {
    key: 'checkGoods',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, index, ischecked) {
        var userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context2.next = 4;
                return _api2.default.cartCheck({
                  query: {
                    openId: openId,
                    id: id
                  }
                });

              case 4:
                json = _context2.sent;

                if (json.data.code == 0) {
                  // 购物车数据
                  this.list[index].ischecked = !ischecked;
                  if (this.list[index].ischecked) {
                    this.totalPrice += parseInt(this.list[index].priceSubtotal);
                  } else {
                    this.totalPrice -= parseInt(this.list[index].priceSubtotal);
                  }
                } else {
                  _tip2.default.error(json.data.msg);
                }
                this.$apply();

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkGoods(_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return checkGoods;
    }()
  }, {
    key: 'reduceGoodNum',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, num, index) {
        var userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context3.next = 4;
                return _api2.default.cartUpdateNum({
                  query: {
                    openId: openId,
                    id: id,
                    num: num
                  }
                });

              case 4:
                json = _context3.sent;

                if (json.data.code == 0) {
                  // 购物车数据
                  this.list[index].num = num;
                  this.totalPrice = this.totalPrice - this.list[index].price;
                  this.operating = false;
                } else {
                  _tip2.default.error(json.data.msg);
                }
                this.$apply();

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function reduceGoodNum(_x4, _x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return reduceGoodNum;
    }()
  }, {
    key: 'addGoodNum',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, num, index) {
        var userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context4.next = 4;
                return _api2.default.cartUpdateNum({
                  query: {
                    openId: openId,
                    id: id,
                    num: num
                  }
                });

              case 4:
                json = _context4.sent;

                if (json.data.code == 0) {
                  // 购物车数据
                  this.list[index].num = num;
                  this.totalPrice = parseInt(this.totalPrice) + parseInt(this.list[index].price);
                  this.operating = false;
                } else {
                  _tip2.default.error(json.data.msg);
                }
                this.$apply();

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function addGoodNum(_x7, _x8, _x9) {
        return _ref5.apply(this, arguments);
      }

      return addGoodNum;
    }()
  }, {
    key: 'deleteGoods',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(itemData) {
        var id, userSpecialInfo, openId, json, retList, i;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = itemData.id;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context5.next = 5;
                return _api2.default.cartDel({
                  query: {
                    openId: openId,
                    cartIdList: [id]
                  }
                });

              case 5:
                json = _context5.sent;

                if (!(json.data.code == 0)) {
                  _context5.next = 22;
                  break;
                }

                // 购物车数据
                retList = [];
                i = 0;

              case 9:
                if (!(i < this.list.length)) {
                  _context5.next = 19;
                  break;
                }

                if (!(this.list[i].id == id)) {
                  _context5.next = 15;
                  break;
                }

                if (this.list[i].ischecked) {
                  this.totalPrice -= parseInt(this.list[i].priceSubtotal);
                }
                return _context5.abrupt('continue', 16);

              case 15:
                retList.push(this.list[i]);

              case 16:
                i++;
                _context5.next = 9;
                break;

              case 19:
                this.list = retList;
                _context5.next = 23;
                break;

              case 22:
                _tip2.default.error(json.data.msg);

              case 23:
                this.$apply();

              case 24:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteGoods(_x10) {
        return _ref6.apply(this, arguments);
      }

      return deleteGoods;
    }()
  }, {
    key: 'checkAllGoods',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var userSpecialInfo, openId, check, json, i;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                check = 0;

                if (!this.allChecked) {
                  //原来未选中
                  check = 1;
                }
                _context6.next = 6;
                return _api2.default.cartCheckAll({
                  query: {
                    openId: openId,
                    check: check
                  }
                });

              case 6:
                json = _context6.sent;

                if (json.data.code == 0) {
                  this.totalPrice = 0;
                  for (i = 0; i < this.list.length; i++) {
                    this.list[i].ischecked = !this.allChecked;
                    if (!this.allChecked) {
                      this.totalPrice += parseInt(this.list[i].priceSubtotal);
                    }
                  }
                  this.allChecked = !this.allChecked;
                } else {
                  _tip2.default.error(json.data.msg);
                }
                this.$apply();

              case 9:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function checkAllGoods() {
        return _ref7.apply(this, arguments);
      }

      return checkAllGoods;
    }()
  }]);

  return shopCart;
}(_wepy2.default.component);

exports.default = shopCart;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BfY2FydC5qcyJdLCJuYW1lcyI6WyJzaG9wQ2FydCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInN3aXBlRGVsZXRlIiwiZGF0YSIsImxpc3QiLCJub1NlbGVjdCIsInNhdmVIaWRkZW4iLCJ0b3RhbFByaWNlIiwib3BlcmF0aW5nIiwiYWxsQ2hlY2tlZCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImhhbmRsZURlbEl0ZW0iLCJpdGVtRGF0YSIsImRlbGV0ZUdvb2RzIiwic2VsZWN0VGFwIiwiZSIsImlkIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsInBhcnNlSW50IiwiaXNjaGVja2VkIiwiY2hlY2tHb29kcyIsInNlbGVjdEFsbCIsImNvbnNvbGUiLCJsb2ciLCJjaGVja0FsbEdvb2RzIiwiZ2V0Q2FydExpc3RNZXRob2QiLCJnZXRDYXJ0TGlzdCIsImppYW5CdG5UYXAiLCJudW0iLCJyZWR1Y2VHb29kTnVtIiwiamlhQnRuVGFwIiwiYWRkR29vZE51bSIsInRvUGF5T3JkZXIiLCJwdXJUeXBlIiwicHJlUHVyVHlwZSIsImJPbmVUeXBlIiwiaSIsImxlbmd0aCIsInR5cGUiLCJhbGVydCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0luZGV4Iiwic3dpdGNoVGFiIiwiZXZlbnRzIiwidGhhdCIsInVzZXJTcGVjaWFsSW5mbyIsImdldFN0b3JhZ2VTeW5jIiwib3BlbklkIiwib3BlbmlkIiwiY2FydExpc3QiLCJxdWVyeSIsImpzb24iLCJjb2RlIiwiZXJyb3IiLCJtc2ciLCIkYXBwbHkiLCJjYXJ0Q2hlY2siLCJwcmljZVN1YnRvdGFsIiwiY2FydFVwZGF0ZU51bSIsInByaWNlIiwiY2FydERlbCIsImNhcnRJZExpc3QiLCJyZXRMaXN0IiwicHVzaCIsImNoZWNrIiwiY2FydENoZWNrQWxsIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFD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QUwsQ0FBVXVELEdBQXBCO0FBQ0Q7QUFDRCxxQkFBS0MsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXJLa0MsZUFBS1csUzs7a0JBQXRCekUsUSIsImZpbGUiOiJzaG9wX2NhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSc7XG4gIGltcG9ydCB0aXAgZnJvbSAnLi4vdXRpbHMvdGlwJztcbiAgaW1wb3J0IHtcbiAgICBVU0VSX1NQRUNJQ0FMX0lORk9cbiAgfSBmcm9tICcuLi91dGlscy9jb25zdGFudCc7XG4gIGltcG9ydCBzd2lwZURlbGV0ZSBmcm9tICcuL2NvbW1vbi93ZXB5LXN3aXBlLWRlbGV0ZSdcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2hvcENhcnQgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAkcmVwZWF0ID0ge1wibGlzdFwiOntcImNvbVwiOlwic3dpcGVEZWxldGVcIixcInByb3BzXCI6XCJzd2lwZURhdGFcIn19O1xyXG4kcHJvcHMgPSB7XCJzd2lwZURlbGV0ZVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwibGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnN3aXBlRGF0YS5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwibGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwibGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fX07XHJcbiRldmVudHMgPSB7XCJzd2lwZURlbGV0ZVwiOntcInYtb246ZGVsSXRlbVwiOlwiaGFuZGxlRGVsSXRlbVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgc3dpcGVEZWxldGVcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGxpc3Q6IFtdLFxuICAgICAgbm9TZWxlY3Q6IGZhbHNlLFxuICAgICAgc2F2ZUhpZGRlbjogdHJ1ZSxcbiAgICAgIHRvdGFsUHJpY2U6IDAsXG4gICAgICBvcGVyYXRpbmc6IGZhbHNlLFxuICAgICAgYWxsQ2hlY2tlZDogdHJ1ZVxuICAgIH1cbiAgICAvL+iOt+WPlui0reeJqei9puWVhuWTgeWIl+ihqFxuICAgIGFzeW5jIGdldENhcnRMaXN0KCkge1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICAgIGxldCBvcGVuSWQgPSB1c2VyU3BlY2lhbEluZm8ub3BlbmlkO1xuICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5jYXJ0TGlzdCh7XG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgb3BlbklkOiBvcGVuSWRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgICBsZXQgZGF0YSA9IGpzb24uZGF0YTtcbiAgICAgICAgdGhpcy5saXN0ID0gZGF0YS5saXN0O1xuICAgICAgICB0aGlzLnRvdGFsUHJpY2UgPSBkYXRhLnRvdGFsUHJpY2U7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmxpc3RbaV0uaXNjaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmFsbENoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5tc2cpXG4gICAgICB9XG4gICAgICB0aGF0LiRhcHBseSgpO1xuICAgIH1cbiAgICBvbkxvYWQoKSB7XG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICB0aGlzLm9wZXJhdGluZyA9IGZhbHNlO1xuICAgICAgLy90aGF0Lmxpc3QgPSBiYi5yZXN1bHQucHJvZHVjdHM7XG4gICAgICAvL2NvbnNvbGUubG9nKGJiLnJlc3VsdC5wcm9kdWN0cylcbiAgICAgIC8vdGhhdC5nZXRDYXJ0TGlzdCgpO1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHt9XG4gICAgYXN5bmMgY2hlY2tHb29kcyhpZCwgaW5kZXgsIGlzY2hlY2tlZCkge1xuICAgICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICAgIGxldCBvcGVuSWQgPSB1c2VyU3BlY2lhbEluZm8ub3BlbmlkO1xuICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5jYXJ0Q2hlY2soe1xuICAgICAgICBxdWVyeToge1xuICAgICAgICAgIG9wZW5JZDogb3BlbklkLFxuICAgICAgICAgIGlkOiBpZFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICAgIC8vIOi0reeJqei9puaVsOaNrlxuICAgICAgICB0aGlzLmxpc3RbaW5kZXhdLmlzY2hlY2tlZCA9ICFpc2NoZWNrZWQ7XG4gICAgICAgIGlmICh0aGlzLmxpc3RbaW5kZXhdLmlzY2hlY2tlZCkge1xuICAgICAgICAgIHRoaXMudG90YWxQcmljZSArPSBwYXJzZUludCh0aGlzLmxpc3RbaW5kZXhdLnByaWNlU3VidG90YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudG90YWxQcmljZSAtPSBwYXJzZUludCh0aGlzLmxpc3RbaW5kZXhdLnByaWNlU3VidG90YWwpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLm1zZylcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIGFzeW5jIHJlZHVjZUdvb2ROdW0oaWQsIG51bSwgaW5kZXgpIHtcbiAgICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuY2FydFVwZGF0ZU51bSh7XG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgIG51bTogbnVtXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgICAgLy8g6LSt54mp6L2m5pWw5o2uXG4gICAgICAgIHRoaXMubGlzdFtpbmRleF0ubnVtID0gbnVtO1xuICAgICAgICB0aGlzLnRvdGFsUHJpY2UgPSB0aGlzLnRvdGFsUHJpY2UgLSB0aGlzLmxpc3RbaW5kZXhdLnByaWNlO1xuICAgICAgICB0aGlzLm9wZXJhdGluZyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5tc2cpXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgICBhc3luYyBhZGRHb29kTnVtKGlkLCBudW0sIGluZGV4KSB7XG4gICAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8pIHx8IHt9O1xuICAgICAgbGV0IG9wZW5JZCA9IHVzZXJTcGVjaWFsSW5mby5vcGVuaWQ7XG4gICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmNhcnRVcGRhdGVOdW0oe1xuICAgICAgICBxdWVyeToge1xuICAgICAgICAgIG9wZW5JZDogb3BlbklkLFxuICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICBudW06IG51bVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICAgIC8vIOi0reeJqei9puaVsOaNrlxuICAgICAgICB0aGlzLmxpc3RbaW5kZXhdLm51bSA9IG51bTtcbiAgICAgICAgdGhpcy50b3RhbFByaWNlID0gcGFyc2VJbnQodGhpcy50b3RhbFByaWNlKSArIHBhcnNlSW50KHRoaXMubGlzdFtpbmRleF0ucHJpY2UpO1xuICAgICAgICB0aGlzLm9wZXJhdGluZyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5tc2cpXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgICBhc3luYyBkZWxldGVHb29kcyhpdGVtRGF0YSkge1xuICAgICAgdmFyIGlkID0gaXRlbURhdGEuaWQ7XG4gICAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8pIHx8IHt9O1xuICAgICAgbGV0IG9wZW5JZCA9IHVzZXJTcGVjaWFsSW5mby5vcGVuaWQ7XG4gICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmNhcnREZWwoe1xuICAgICAgICBxdWVyeToge1xuICAgICAgICAgIG9wZW5JZDogb3BlbklkLFxuICAgICAgICAgIGNhcnRJZExpc3Q6IFtpZF0sXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgICAgLy8g6LSt54mp6L2m5pWw5o2uXG4gICAgICAgIGxldCByZXRMaXN0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMubGlzdFtpXS5pZCA9PSBpZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdFtpXS5pc2NoZWNrZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy50b3RhbFByaWNlIC09IHBhcnNlSW50KHRoaXMubGlzdFtpXS5wcmljZVN1YnRvdGFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXRMaXN0LnB1c2godGhpcy5saXN0W2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0ID0gcmV0TGlzdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG5cbiAgICBhc3luYyBjaGVja0FsbEdvb2RzKCkge1xuICAgICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICAgIGxldCBvcGVuSWQgPSB1c2VyU3BlY2lhbEluZm8ub3BlbmlkO1xuICAgICAgbGV0IGNoZWNrID0gMDtcbiAgICAgIGlmICghdGhpcy5hbGxDaGVja2VkKSB7Ly/ljp/mnaXmnKrpgInkuK1cbiAgICAgICAgY2hlY2sgPSAxO1xuICAgICAgfVxuICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5jYXJ0Q2hlY2tBbGwoe1xuICAgICAgICBxdWVyeToge1xuICAgICAgICAgIG9wZW5JZDogb3BlbklkLFxuICAgICAgICAgIGNoZWNrOiBjaGVja1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICAgIHRoaXMudG90YWxQcmljZSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5saXN0W2ldLmlzY2hlY2tlZCA9ICF0aGlzLmFsbENoZWNrZWQ7XG4gICAgICAgICAgaWYgKCF0aGlzLmFsbENoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMudG90YWxQcmljZSArPSBwYXJzZUludCh0aGlzLmxpc3RbaV0ucHJpY2VTdWJ0b3RhbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWxsQ2hlY2tlZCA9ICF0aGlzLmFsbENoZWNrZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLm1zZylcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuXG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgaGFuZGxlRGVsSXRlbShpdGVtRGF0YSkge1xuICAgICAgICB0aGlzLmRlbGV0ZUdvb2RzKGl0ZW1EYXRhKTtcbiAgICAgIH0sXG4gICAgICBzZWxlY3RUYXAoZSkge1xuICAgICAgICB2YXIgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZDtcbiAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgpO1xuICAgICAgICB2YXIgaXNjaGVja2VkID0gdGhpcy5saXN0W2luZGV4XS5pc2NoZWNrZWQ7XG4gICAgICAgIHRoaXMuY2hlY2tHb29kcyhpZCwgaW5kZXgsIGlzY2hlY2tlZCk7XG4gICAgICB9LFxuICAgICAgc2VsZWN0QWxsKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNlbGUuLi4uXCIpO1xuICAgICAgICB0aGlzLmNoZWNrQWxsR29vZHMoKTtcbiAgICAgIH0sXG4gICAgICBnZXRDYXJ0TGlzdE1ldGhvZCgpIHtcbiAgICAgICAgdGhpcy5nZXRDYXJ0TGlzdCgpO1xuICAgICAgfSxcbiAgICAgIGppYW5CdG5UYXAoZSkge1xuICAgICAgICBpZiAodGhpcy5vcGVyYXRpbmcpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcGVyYXRpbmcgPSB0cnVlO1xuICAgICAgICB2YXIgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZDtcbiAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgpO1xuICAgICAgICB2YXIgbnVtID0gdGhpcy5saXN0W2luZGV4XS5udW07XG4gICAgICAgIC8vIOWmguaenOWPquaciTHku7bkuobvvIzlsLHkuI3lhYHorrjlho3lh4/kuoZcbiAgICAgICAgaWYgKG51bSA+IDEpIHtcbiAgICAgICAgICBudW0tLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWR1Y2VHb29kTnVtKGlkLCBudW0sIGluZGV4KTtcbiAgICAgIH0sXG4gICAgICBqaWFCdG5UYXAoZSkge1xuICAgICAgICBpZiAodGhpcy5vcGVyYXRpbmcpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcGVyYXRpbmcgPSB0cnVlO1xuICAgICAgICB2YXIgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZDtcbiAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgpO1xuICAgICAgICB2YXIgbnVtID0gdGhpcy5saXN0W2luZGV4XS5udW07XG4gICAgICAgIC8vIOiHquWinlxuICAgICAgICBudW0rKztcbiAgICAgICAgdGhpcy5hZGRHb29kTnVtKGlkLCBudW0sIGluZGV4KTtcbiAgICAgIH0sXG4gICAgICB0b1BheU9yZGVyKCkge1xuICAgICAgICBsZXQgcHVyVHlwZSA9IDEsXG4gICAgICAgICAgcHJlUHVyVHlwZSA9IDE7XG4gICAgICAgIGxldCBiT25lVHlwZSA9IHRydWU7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMubGlzdFtpXS5pc2NoZWNrZWQpIHtcbiAgICAgICAgICAgIHB1clR5cGUgPSB0aGlzLmxpc3RbaV0udHlwZTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgaWYgKHB1clR5cGUgIT0gcHJlUHVyVHlwZSkge1xuICAgICAgICAgICAgICAgIGJPbmVUeXBlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZVB1clR5cGUgPSBwdXJUeXBlO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFiT25lVHlwZSkge1xuICAgICAgICAgIHRpcC5hbGVydChcIuWFiOaKiuihpei0p+eahOWVhuWTgee7k+eulyFcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiBcIi9wYWdlcy9jb21maXJlX29yZGVyP3B1cmNoYXNldHlwZT1cIiArIHB1clR5cGVcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0luZGV4KCkge1xuICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiBcIi9wYWdlcy9ob21lXCJcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZXZlbnRzID0ge31cbiAgfVxuIl19