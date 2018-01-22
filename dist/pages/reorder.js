'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tab = require('./../components/tab.js');

var _tab2 = _interopRequireDefault(_tab);

var _constant = require('./../utils/constant.js');

var _order_item = require('./../components/order_item.js');

var _order_item2 = _interopRequireDefault(_order_item);

var _bottomLoadMore = require('./../components/common/bottomLoadMore.js');

var _bottomLoadMore2 = _interopRequireDefault(_bottomLoadMore);

var _placeholder = require('./../components/common/placeholder.js');

var _placeholder2 = _interopRequireDefault(_placeholder);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Order = function (_wepy$page) {
  _inherits(Order, _wepy$page);

  function Order() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Order);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Order.__proto__ || Object.getPrototypeOf(Order)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: "补货订单"
    }, _this.$repeat = {}, _this.$props = { "tab": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:tabList.sync": "tabList", "v-bind:currentTab.sync": "currentTab" }, "orderItem": { "xmlns:v-bind": "", "v-bind:orderList.sync": "orderList" }, "bottomLoadMore": { "v-bind:show.sync": "showLoading", "message": "正在加载" }, "placeholder": { "v-bind:show.sync": "is_empty", "message": "暂无发现数据" } }, _this.$events = { "tab": { "v-on:currentTab": "getCurrentTab" } }, _this.components = {
      tab: _tab2.default,
      orderItem: _order_item2.default,
      bottomLoadMore: _bottomLoadMore2.default,
      placeholder: _placeholder2.default
    }, _this.data = {
      winHeight: 0,
      totalCount: 0,
      tabList: ["全部", "待处理", "待收货", "已完成"],
      orderList: [],
      currentPage: 1,
      is_empty: false,
      orderStatus: "",
      currentTab: 0,
      flag: 0,
      //是否显示 底部loading
      showLoading: true,
      //防止重复加载
      preventRepeatReuqest: false,
      //待付款
      pendingPayCount: 0,
      //待发货
      backrdersCount: 0,
      //待收货
      shippedCount: 0,

      receiveFlg: 0
    }, _this.computed = {}, _this.methods = {
      getCurrentTab: function getCurrentTab(cur, evt) {
        this.currentPage = 1;
        this.page_total = 0;
        this.orderList = [];

        var that = this;
        that.currentTab = cur;
        console.log("cur");
        console.log(cur);
        if (cur == 0) {
          console.log("所有订单类型");
          that.orderStatus = "";
          that.getMyOrder();
        } else if (cur == 1) {
          console.log("未付款订单类型");
          that.orderStatus = 0;
          that.getMyOrder();
        } else if (cur == 2) {
          console.log("待收货订单类型");
          that.orderStatus = 2;
          that.receiveFlg = 2;
          that.getMyOrder();
        } else if (cur == 3) {

          console.log("已完成订单类型");
          that.orderStatus = 4;
          that.receiveFlg = 4;
          that.getMyOrder();
        }
        that.$apply();
      },

      /**
       * 滑动切换tab
       */
      bindChange: function bindChange(e) {

        var that = this;
        that.currentTab = e.detail.current;
        console.log("change tab...." + e.detailcurrent);
        that.$apply();
      }
    }, _this.events = {
      refreshOrderList: function refreshOrderList(msg) {
        console.log("msg值:" + msg);
        if (msg == 3) {
          this.currentTab = 3;
          this.$apply();
          this.orderStatus = 4;
        }
        this.getMyOrder(1, 10, 1);
      }
    }, _this.watch = {
      currentTab: function currentTab(val) {
        console.log("====" + val);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Order, [{
    key: 'getMyOrder',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(currentPage, size, refresh) {
        var that, userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:

                console.log("refresh值：" + refresh);
                that = this;

                console.log("orderStatus值");
                console.log("orderStatus值" + that.orderStatus);
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context.next = 8;
                return _api2.default.getMyOrderList({
                  query: {
                    openId: openId,
                    orderStatus: that.orderStatus,
                    receiveFlg: that.receiveFlg,
                    page: currentPage || 1,
                    size: size || 10,
                    type: 2 //补货单
                  }
                });

              case 8:
                json = _context.sent;

                if (json.data.code == 0) {
                  console.log("json.data.list");
                  console.log(json.data.list);
                  if (refresh) {
                    that.orderList = json.data.list;
                  } else {
                    that.orderList = [].concat(_toConsumableArray(that.orderList), _toConsumableArray(json.data.list));
                  }
                  that.page_total = json.data.page_total;
                  that.totalCount = json.data.totalCount;
                  console.log("条目数：" + that.totalCount);
                  if (json.data.page_total == 0) {
                    //暂无数据
                    that.is_empty = true;
                  } else {
                    that.is_empty = false;
                  }
                  that.getMyOrderSize();
                  console.log("list返回数据");
                  console.log(that.orderList);
                } else {
                  tip.error(json.data.msg);
                }
                that.showLoading = false;
                that.$apply();

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMyOrder(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return getMyOrder;
    }()
  }, {
    key: 'getMyOrderSize',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var that, userSpecialInfo, openId, json, dotList;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log("订单数量统计");
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context2.next = 6;
                return _api2.default.getMyOrderSize({
                  query: {
                    openId: openId,
                    type: 2
                  }
                });

              case 6:
                json = _context2.sent;

                if (json.data.code == 0) {
                  //待付款
                  that.pendingPayCount = json.data.pendingPayCount;
                  //待发货
                  that.backrdersCount = json.data.backrdersCount;
                  //待收货
                  that.shippedCount = json.data.shippedCount;

                  //重写list
                  dotList = ["全部", { name: "待处理", dotNum: that.pendingPayCount }, { name: "待收货", dotNum: that.backrdersCount }, "已完成"];

                  this.$invoke("tab", "changeList", dotList);
                  that.$apply();
                }

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getMyOrderSize() {
        return _ref3.apply(this, arguments);
      }

      return getMyOrderSize;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad(opts) {
      var that = this;
      var title = "";
      that.orderList = [];
      that.currentTab = opts.type;
      that.getMyOrder();
      //设置滚动高度
      var systemInfo = _wepy2.default.getStorageSync(_constant.SYSTEM_INFO);
      that.winHeight = systemInfo.windowHeight;
      that.$apply();
    }
  }, {
    key: 'onReachBottom',


    //加载更多
    value: function onReachBottom() {
      console.log("加载更多");
      var that = this;
      that.showLoading = true;
      console.log(that.page_total + "232===" + that.currentPage);
      //判断总页数是否大于翻页数
      if (that.page_total > that.currentPage) {
        //防止重复加载
        if (that.preventRepeatReuqest) {
          return true;
        }
        that.preventRepeatReuqest = true;
        that.currentPage++;
        console.log(this.currentTab);
        if (this.currentTab == 0) {
          console.log("所有订单类型");
          that.getMyOrder(that.currentPage);
        } else if (this.currentTab == 1) {
          console.log("未付款订单类型");
          that.orderStatus = 0;
          that.getMyOrder(that.currentPage);
        } else if (this.currentTab == 2) {
          console.log("待发货订单类型");
          that.orderStatus = 1;
          that.receiveFlg = 1;
          that.getMyOrder(that.currentPage);
        } else if (this.currentTab == 3) {
          console.log("已完成订单类型");
          that.orderStatus = 4;
          that.getMyOrder(that.currentPage);
        }
        that.preventRepeatReuqest = false;
      } else {
        that.showLoading = false;
      }
    }
  }]);

  return Order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/reorder'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlb3JkZXIuanMiXSwibmFtZXMiOlsiT3JkZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidGFiIiwib3JkZXJJdGVtIiwiYm90dG9tTG9hZE1vcmUiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJ3aW5IZWlnaHQiLCJ0b3RhbENvdW50IiwidGFiTGlzdCIsIm9yZGVyTGlzdCIsImN1cnJlbnRQYWdlIiwiaXNfZW1wdHkiLCJvcmRlclN0YXR1cyIsImN1cnJlbnRUYWIiLCJmbGFnIiwic2hvd0xvYWRpbmciLCJwcmV2ZW50UmVwZWF0UmV1cWVzdCIsInBlbmRpbmdQYXlDb3VudCIsImJhY2tyZGVyc0NvdW50Iiwic2hpcHBlZENvdW50IiwicmVjZWl2ZUZsZyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdldEN1cnJlbnRUYWIiLCJjdXIiLCJldnQiLCJwYWdlX3RvdGFsIiwidGhhdCIsImNvbnNvbGUiLCJsb2ciLCJnZXRNeU9yZGVyIiwiJGFwcGx5IiwiYmluZENoYW5nZSIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiZGV0YWlsY3VycmVudCIsImV2ZW50cyIsInJlZnJlc2hPcmRlckxpc3QiLCJtc2ciLCJ3YXRjaCIsInZhbCIsInNpemUiLCJyZWZyZXNoIiwidXNlclNwZWNpYWxJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJvcGVuSWQiLCJvcGVuaWQiLCJnZXRNeU9yZGVyTGlzdCIsInF1ZXJ5IiwicGFnZSIsInR5cGUiLCJqc29uIiwiY29kZSIsImxpc3QiLCJnZXRNeU9yZGVyU2l6ZSIsInRpcCIsImVycm9yIiwiZG90TGlzdCIsIm5hbWUiLCJkb3ROdW0iLCIkaW52b2tlIiwib3B0cyIsInRpdGxlIiwic3lzdGVtSW5mbyIsIndpbmRvd0hlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxPQUFNLEVBQUMsY0FBYSxFQUFkLEVBQWlCLGdCQUFlLEVBQWhDLEVBQW1DLHVCQUFzQixTQUF6RCxFQUFtRSwwQkFBeUIsWUFBNUYsRUFBUCxFQUFpSCxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIseUJBQXdCLFdBQTNDLEVBQTdILEVBQXFMLGtCQUFpQixFQUFDLG9CQUFtQixhQUFwQixFQUFrQyxXQUFVLE1BQTVDLEVBQXRNLEVBQTBQLGVBQWMsRUFBQyxvQkFBbUIsVUFBcEIsRUFBK0IsV0FBVSxRQUF6QyxFQUF4USxFLFFBQ1RDLE8sR0FBVSxFQUFDLE9BQU0sRUFBQyxtQkFBa0IsZUFBbkIsRUFBUCxFLFFBQ1RDLFUsR0FBYTtBQUNWQyx3QkFEVTtBQUVWQyxxQ0FGVTtBQUdWQyw4Q0FIVTtBQUlWQztBQUpVLEssUUFNWkMsSSxHQUFPO0FBQ0xDLGlCQUFXLENBRE47QUFFTEMsa0JBQVksQ0FGUDtBQUdMQyxlQUFTLENBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxLQUFkLEVBQXFCLEtBQXJCLENBSEo7QUFJTEMsaUJBQVcsRUFKTjtBQUtMQyxtQkFBYSxDQUxSO0FBTUxDLGdCQUFVLEtBTkw7QUFPTEMsbUJBQWEsRUFQUjtBQVFMQyxrQkFBWSxDQVJQO0FBU0xDLFlBQU0sQ0FURDtBQVVMO0FBQ0FDLG1CQUFhLElBWFI7QUFZTDtBQUNBQyw0QkFBc0IsS0FiakI7QUFjTDtBQUNBQyx1QkFBa0IsQ0FmYjtBQWdCTDtBQUNBQyxzQkFBaUIsQ0FqQlo7QUFrQkw7QUFDQUMsb0JBQWUsQ0FuQlY7O0FBcUJMQyxrQkFBYTtBQXJCUixLLFFBMkdQQyxRLEdBQVcsRSxRQUdYQyxPLEdBQVU7QUFDUkMsbUJBRFEseUJBQ01DLEdBRE4sRUFDV0MsR0FEWCxFQUNnQjtBQUN0QixhQUFLZixXQUFMLEdBQW1CLENBQW5CO0FBQ0EsYUFBS2dCLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxhQUFLakIsU0FBTCxHQUFpQixFQUFqQjs7QUFFQSxZQUFJa0IsT0FBTyxJQUFYO0FBQ0FBLGFBQUtkLFVBQUwsR0FBa0JXLEdBQWxCO0FBQ0FJLGdCQUFRQyxHQUFSLENBQVksS0FBWjtBQUNBRCxnQkFBUUMsR0FBUixDQUFZTCxHQUFaO0FBQ0EsWUFBSUEsT0FBTyxDQUFYLEVBQWM7QUFDWkksa0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0FGLGVBQUtmLFdBQUwsR0FBbUIsRUFBbkI7QUFDQWUsZUFBS0csVUFBTDtBQUNELFNBSkQsTUFJTyxJQUFJTixPQUFPLENBQVgsRUFBYztBQUNuQkksa0JBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0FGLGVBQUtmLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQWUsZUFBS0csVUFBTDtBQUNELFNBSk0sTUFJQSxJQUFJTixPQUFPLENBQVgsRUFBYztBQUNuQkksa0JBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0FGLGVBQUtmLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQWUsZUFBS1AsVUFBTCxHQUFnQixDQUFoQjtBQUNBTyxlQUFLRyxVQUFMO0FBQ0QsU0FMTSxNQUtBLElBQUlOLE9BQU8sQ0FBWCxFQUFjOztBQUVuQkksa0JBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0FGLGVBQUtmLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQWUsZUFBS1AsVUFBTCxHQUFnQixDQUFoQjtBQUNBTyxlQUFLRyxVQUFMO0FBQ0Q7QUFDREgsYUFBS0ksTUFBTDtBQUNELE9BL0JPOztBQWdDUjs7O0FBR0FDLGdCQW5DUSxzQkFtQ0dDLENBbkNILEVBbUNNOztBQUVaLFlBQUlOLE9BQU8sSUFBWDtBQUNBQSxhQUFLZCxVQUFMLEdBQWtCb0IsRUFBRUMsTUFBRixDQUFTQyxPQUEzQjtBQUNBUCxnQkFBUUMsR0FBUixDQUFZLG1CQUFtQkksRUFBRUcsYUFBakM7QUFDQVQsYUFBS0ksTUFBTDtBQUNEO0FBekNPLEssUUEyQ1ZNLE0sR0FBUztBQUNQQyxzQkFETyw0QkFDVUMsR0FEVixFQUNjO0FBQ25CWCxnQkFBUUMsR0FBUixDQUFZLFVBQVFVLEdBQXBCO0FBQ0EsWUFBR0EsT0FBSyxDQUFSLEVBQVU7QUFDUixlQUFLMUIsVUFBTCxHQUFnQixDQUFoQjtBQUNBLGVBQUtrQixNQUFMO0FBQ0EsZUFBS25CLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRDtBQUNELGFBQUtrQixVQUFMLENBQWdCLENBQWhCLEVBQWtCLEVBQWxCLEVBQXFCLENBQXJCO0FBQ0Q7QUFUTSxLLFFBV1RVLEssR0FBUTtBQUNOM0IsZ0JBRE0sc0JBQ0s0QixHQURMLEVBQ1U7QUFDZGIsZ0JBQVFDLEdBQVIsQ0FBWSxTQUFTWSxHQUFyQjtBQUNEO0FBSEssSzs7Ozs7OzJGQTVJUy9CLFcsRUFBYWdDLEksRUFBS0MsTzs7Ozs7OztBQUVqQ2Ysd0JBQVFDLEdBQVIsQ0FBWSxjQUFZYyxPQUF4QjtBQUNJaEIsb0IsR0FBTyxJOztBQUNYQyx3QkFBUUMsR0FBUixDQUFZLGNBQVo7QUFDQUQsd0JBQVFDLEdBQVIsQ0FBWSxpQkFBaUJGLEtBQUtmLFdBQWxDO0FBQ0lnQywrQixHQUFrQixlQUFLQyxjQUFMLGtDQUEyQyxFO0FBQzdEQyxzQixHQUFTRixnQkFBZ0JHLE07O3VCQUNWLGNBQUlDLGNBQUosQ0FBbUI7QUFDcENDLHlCQUFPO0FBQ0xILDRCQUFRQSxNQURIO0FBRUxsQyxpQ0FBYWUsS0FBS2YsV0FGYjtBQUdMUSxnQ0FBYU8sS0FBS1AsVUFIYjtBQUlMOEIsMEJBQU14QyxlQUFlLENBSmhCO0FBS0xnQywwQkFBTUEsUUFBUSxFQUxUO0FBTUxTLDBCQUFNLENBTkQsQ0FNRztBQU5IO0FBRDZCLGlCQUFuQixDOzs7QUFBYkMsb0I7O0FBVU4sb0JBQUlBLEtBQUsvQyxJQUFMLENBQVVnRCxJQUFWLElBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCekIsMEJBQVFDLEdBQVIsQ0FBWSxnQkFBWjtBQUNBRCwwQkFBUUMsR0FBUixDQUFZdUIsS0FBSy9DLElBQUwsQ0FBVWlELElBQXRCO0FBQ0Esc0JBQUlYLE9BQUosRUFBYTtBQUNYaEIseUJBQUtsQixTQUFMLEdBQWlCMkMsS0FBSy9DLElBQUwsQ0FBVWlELElBQTNCO0FBQ0QsbUJBRkQsTUFFTztBQUNMM0IseUJBQUtsQixTQUFMLGdDQUFxQmtCLEtBQUtsQixTQUExQixzQkFBd0MyQyxLQUFLL0MsSUFBTCxDQUFVaUQsSUFBbEQ7QUFDRDtBQUNEM0IsdUJBQUtELFVBQUwsR0FBa0IwQixLQUFLL0MsSUFBTCxDQUFVcUIsVUFBNUI7QUFDQUMsdUJBQUtwQixVQUFMLEdBQWtCNkMsS0FBSy9DLElBQUwsQ0FBVUUsVUFBNUI7QUFDQXFCLDBCQUFRQyxHQUFSLENBQVksU0FBU0YsS0FBS3BCLFVBQTFCO0FBQ0Esc0JBQUk2QyxLQUFLL0MsSUFBTCxDQUFVcUIsVUFBVixJQUF3QixDQUE1QixFQUErQjtBQUM3QjtBQUNBQyx5QkFBS2hCLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRCxtQkFIRCxNQUdPO0FBQ0xnQix5QkFBS2hCLFFBQUwsR0FBZ0IsS0FBaEI7QUFDRDtBQUNEZ0IsdUJBQUs0QixjQUFMO0FBQ0EzQiwwQkFBUUMsR0FBUixDQUFZLFVBQVo7QUFDQUQsMEJBQVFDLEdBQVIsQ0FBWUYsS0FBS2xCLFNBQWpCO0FBQ0QsaUJBcEJELE1Bb0JPO0FBQ0wrQyxzQkFBSUMsS0FBSixDQUFVTCxLQUFLL0MsSUFBTCxDQUFVa0MsR0FBcEI7QUFDRDtBQUNEWixxQkFBS1osV0FBTCxHQUFtQixLQUFuQjtBQUNBWSxxQkFBS0ksTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBSCx3QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDSUYsb0IsR0FBTyxJO0FBQ1BpQiwrQixHQUFrQixlQUFLQyxjQUFMLGtDQUEyQyxFO0FBQzdEQyxzQixHQUFTRixnQkFBZ0JHLE07O3VCQUNWLGNBQUlRLGNBQUosQ0FBbUI7QUFDcENOLHlCQUFPO0FBQ0xILDRCQUFRQSxNQURIO0FBRUxLLDBCQUFNO0FBRkQ7QUFENkIsaUJBQW5CLEM7OztBQUFiQyxvQjs7QUFNTixvQkFBSUEsS0FBSy9DLElBQUwsQ0FBVWdELElBQVYsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDdkI7QUFDQTFCLHVCQUFLVixlQUFMLEdBQXVCbUMsS0FBSy9DLElBQUwsQ0FBVVksZUFBakM7QUFDQTtBQUNBVSx1QkFBS1QsY0FBTCxHQUFzQmtDLEtBQUsvQyxJQUFMLENBQVVhLGNBQWhDO0FBQ0E7QUFDQVMsdUJBQUtSLFlBQUwsR0FBb0JpQyxLQUFLL0MsSUFBTCxDQUFVYyxZQUE5Qjs7QUFFQTtBQUNJdUMseUJBVG1CLEdBU1QsQ0FBQyxJQUFELEVBQU8sRUFBRUMsTUFBTSxLQUFSLEVBQWVDLFFBQVFqQyxLQUFLVixlQUE1QixFQUFQLEVBQXNELEVBQUUwQyxNQUFNLEtBQVIsRUFBZUMsUUFBUWpDLEtBQUtULGNBQTVCLEVBQXRELEVBQW9HLEtBQXBHLENBVFM7O0FBVXZCLHVCQUFLMkMsT0FBTCxDQUFhLEtBQWIsRUFBb0IsWUFBcEIsRUFBa0NILE9BQWxDO0FBQ0EvQix1QkFBS0ksTUFBTDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJBSUkrQixJLEVBQU07QUFDWCxVQUFJbkMsT0FBTyxJQUFYO0FBQ0EsVUFBSW9DLFFBQVEsRUFBWjtBQUNBcEMsV0FBS2xCLFNBQUwsR0FBaUIsRUFBakI7QUFDQWtCLFdBQUtkLFVBQUwsR0FBa0JpRCxLQUFLWCxJQUF2QjtBQUNBeEIsV0FBS0csVUFBTDtBQUNBO0FBQ0EsVUFBSWtDLGFBQWEsZUFBS25CLGNBQUwsdUJBQWpCO0FBQ0FsQixXQUFLckIsU0FBTCxHQUFpQjBELFdBQVdDLFlBQTVCO0FBQ0F0QyxXQUFLSSxNQUFMO0FBQ0Q7Ozs7O0FBZ0VEO29DQUNnQjtBQUNkSCxjQUFRQyxHQUFSLENBQVksTUFBWjtBQUNBLFVBQUlGLE9BQU8sSUFBWDtBQUNBQSxXQUFLWixXQUFMLEdBQW1CLElBQW5CO0FBQ0FhLGNBQVFDLEdBQVIsQ0FBWUYsS0FBS0QsVUFBTCxHQUFrQixRQUFsQixHQUE2QkMsS0FBS2pCLFdBQTlDO0FBQ0E7QUFDQSxVQUFLaUIsS0FBS0QsVUFBTixHQUFvQkMsS0FBS2pCLFdBQTdCLEVBQTBDO0FBQ3hDO0FBQ0EsWUFBSWlCLEtBQUtYLG9CQUFULEVBQStCO0FBQzdCLGlCQUFPLElBQVA7QUFDRDtBQUNEVyxhQUFLWCxvQkFBTCxHQUE0QixJQUE1QjtBQUNBVyxhQUFLakIsV0FBTDtBQUNBa0IsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLaEIsVUFBakI7QUFDQSxZQUFJLEtBQUtBLFVBQUwsSUFBbUIsQ0FBdkIsRUFBMEI7QUFDeEJlLGtCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNBRixlQUFLRyxVQUFMLENBQWdCSCxLQUFLakIsV0FBckI7QUFDRCxTQUhELE1BR08sSUFBSSxLQUFLRyxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQy9CZSxrQkFBUUMsR0FBUixDQUFZLFNBQVo7QUFDQUYsZUFBS2YsV0FBTCxHQUFtQixDQUFuQjtBQUNBZSxlQUFLRyxVQUFMLENBQWdCSCxLQUFLakIsV0FBckI7QUFDRCxTQUpNLE1BSUEsSUFBSSxLQUFLRyxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQy9CZSxrQkFBUUMsR0FBUixDQUFZLFNBQVo7QUFDQUYsZUFBS2YsV0FBTCxHQUFtQixDQUFuQjtBQUNBZSxlQUFLUCxVQUFMLEdBQWdCLENBQWhCO0FBQ0FPLGVBQUtHLFVBQUwsQ0FBZ0JILEtBQUtqQixXQUFyQjtBQUNELFNBTE0sTUFLQSxJQUFJLEtBQUtHLFVBQUwsSUFBbUIsQ0FBdkIsRUFBMEI7QUFDL0JlLGtCQUFRQyxHQUFSLENBQVksU0FBWjtBQUNBRixlQUFLZixXQUFMLEdBQW1CLENBQW5CO0FBQ0FlLGVBQUtHLFVBQUwsQ0FBZ0JILEtBQUtqQixXQUFyQjtBQUNEO0FBQ0RpQixhQUFLWCxvQkFBTCxHQUE0QixLQUE1QjtBQUNELE9BMUJELE1BMEJPO0FBQ0xXLGFBQUtaLFdBQUwsR0FBbUIsS0FBbkI7QUFDRDtBQUNGOzs7O0VBM05nQyxlQUFLbUMsSTs7a0JBQW5CeEQsSyIsImZpbGUiOiJyZW9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBUYWIgZnJvbSAnLi4vY29tcG9uZW50cy90YWInXG5pbXBvcnQge1xuICBTWVNURU1fSU5GTyxcbiAgVVNFUl9TUEVDSUNBTF9JTkZPXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50JztcbmltcG9ydCBPcmRlckl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcl9pdGVtJ1xuaW1wb3J0IEJvdHRvbUxvYWRNb3JlIGZyb20gXCIuLi9jb21wb25lbnRzL2NvbW1vbi9ib3R0b21Mb2FkTW9yZVwiXG5pbXBvcnQgUGxhY2Vob2xkZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvY29tbW9uL3BsYWNlaG9sZGVyXCJcbmltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuihpei0p+iuouWNlVwiLFxuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ0YWJcIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6dGFiTGlzdC5zeW5jXCI6XCJ0YWJMaXN0XCIsXCJ2LWJpbmQ6Y3VycmVudFRhYi5zeW5jXCI6XCJjdXJyZW50VGFiXCJ9LFwib3JkZXJJdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOlwib3JkZXJMaXN0XCJ9LFwiYm90dG9tTG9hZE1vcmVcIjp7XCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJzaG93TG9hZGluZ1wiLFwibWVzc2FnZVwiOlwi5q2j5Zyo5Yqg6L29XCJ9LFwicGxhY2Vob2xkZXJcIjp7XCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJpc19lbXB0eVwiLFwibWVzc2FnZVwiOlwi5pqC5peg5Y+R546w5pWw5o2uXCJ9fTtcclxuJGV2ZW50cyA9IHtcInRhYlwiOntcInYtb246Y3VycmVudFRhYlwiOlwiZ2V0Q3VycmVudFRhYlwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHRhYjogVGFiLFxuICAgIG9yZGVySXRlbTogT3JkZXJJdGVtLFxuICAgIGJvdHRvbUxvYWRNb3JlOiBCb3R0b21Mb2FkTW9yZSxcbiAgICBwbGFjZWhvbGRlcjogUGxhY2Vob2xkZXJcbiAgfVxuICBkYXRhID0ge1xuICAgIHdpbkhlaWdodDogMCxcbiAgICB0b3RhbENvdW50OiAwLFxuICAgIHRhYkxpc3Q6IFtcIuWFqOmDqFwiLCBcIuW+heWkhOeQhlwiLCBcIuW+heaUtui0p1wiLCBcIuW3suWujOaIkFwiXSxcbiAgICBvcmRlckxpc3Q6IFtdLFxuICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgIGlzX2VtcHR5OiBmYWxzZSxcbiAgICBvcmRlclN0YXR1czogXCJcIixcbiAgICBjdXJyZW50VGFiOiAwLFxuICAgIGZsYWc6IDAsXG4gICAgLy/mmK/lkKbmmL7npLog5bqV6YOobG9hZGluZ1xuICAgIHNob3dMb2FkaW5nOiB0cnVlLFxuICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XG4gICAgcHJldmVudFJlcGVhdFJldXFlc3Q6IGZhbHNlLFxuICAgIC8v5b6F5LuY5qy+XG4gICAgcGVuZGluZ1BheUNvdW50IDogMCxcbiAgICAvL+W+heWPkei0p1xuICAgIGJhY2tyZGVyc0NvdW50IDogMCxcbiAgICAvL+W+heaUtui0p1xuICAgIHNoaXBwZWRDb3VudCA6IDAsXG5cbiAgICByZWNlaXZlRmxnIDogMFxuICB9XG5cbiAgYXN5bmMgZ2V0TXlPcmRlcihjdXJyZW50UGFnZSwgc2l6ZSxyZWZyZXNoKSB7XG5cbiAgICBjb25zb2xlLmxvZyhcInJlZnJlc2jlgLzvvJpcIityZWZyZXNoKTtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgY29uc29sZS5sb2coXCJvcmRlclN0YXR1c+WAvFwiKTtcbiAgICBjb25zb2xlLmxvZyhcIm9yZGVyU3RhdHVz5YC8XCIgKyB0aGF0Lm9yZGVyU3RhdHVzKTtcbiAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8pIHx8IHt9O1xuICAgIGxldCBvcGVuSWQgPSB1c2VyU3BlY2lhbEluZm8ub3BlbmlkO1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0TXlPcmRlckxpc3Qoe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgIG9yZGVyU3RhdHVzOiB0aGF0Lm9yZGVyU3RhdHVzLFxuICAgICAgICByZWNlaXZlRmxnIDogdGhhdC5yZWNlaXZlRmxnLFxuICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSB8fCAxLFxuICAgICAgICBzaXplOiBzaXplIHx8IDEwLFxuICAgICAgICB0eXBlOiAyIC8v6KGl6LSn5Y2VXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwianNvbi5kYXRhLmxpc3RcIik7XG4gICAgICBjb25zb2xlLmxvZyhqc29uLmRhdGEubGlzdCk7XG4gICAgICBpZiAocmVmcmVzaCkge1xuICAgICAgICB0aGF0Lm9yZGVyTGlzdCA9IGpzb24uZGF0YS5saXN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5vcmRlckxpc3QgPSBbLi4udGhhdC5vcmRlckxpc3QsIC4uLmpzb24uZGF0YS5saXN0XTtcbiAgICAgIH1cbiAgICAgIHRoYXQucGFnZV90b3RhbCA9IGpzb24uZGF0YS5wYWdlX3RvdGFsO1xuICAgICAgdGhhdC50b3RhbENvdW50ID0ganNvbi5kYXRhLnRvdGFsQ291bnQ7XG4gICAgICBjb25zb2xlLmxvZyhcIuadoeebruaVsO+8mlwiICsgdGhhdC50b3RhbENvdW50KTtcbiAgICAgIGlmIChqc29uLmRhdGEucGFnZV90b3RhbCA9PSAwKSB7XG4gICAgICAgIC8v5pqC5peg5pWw5o2uXG4gICAgICAgIHRoYXQuaXNfZW1wdHkgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5pc19lbXB0eSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhhdC5nZXRNeU9yZGVyU2l6ZSgpO1xuICAgICAgY29uc29sZS5sb2coXCJsaXN06L+U5Zue5pWw5o2uXCIpO1xuICAgICAgY29uc29sZS5sb2codGhhdC5vcmRlckxpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLm1zZylcbiAgICB9XG4gICAgdGhhdC5zaG93TG9hZGluZyA9IGZhbHNlO1xuICAgIHRoYXQuJGFwcGx5KCk7XG4gIH1cblxuICBhc3luYyBnZXRNeU9yZGVyU2l6ZSgpIHtcbiAgICBjb25zb2xlLmxvZyhcIuiuouWNleaVsOmHj+e7n+iuoVwiKTtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldE15T3JkZXJTaXplKHtcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIG9wZW5JZDogb3BlbklkLFxuICAgICAgICB0eXBlOiAyXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgIC8v5b6F5LuY5qy+XG4gICAgICB0aGF0LnBlbmRpbmdQYXlDb3VudCA9IGpzb24uZGF0YS5wZW5kaW5nUGF5Q291bnQ7XG4gICAgICAvL+W+heWPkei0p1xuICAgICAgdGhhdC5iYWNrcmRlcnNDb3VudCA9IGpzb24uZGF0YS5iYWNrcmRlcnNDb3VudDtcbiAgICAgIC8v5b6F5pS26LSnXG4gICAgICB0aGF0LnNoaXBwZWRDb3VudCA9IGpzb24uZGF0YS5zaGlwcGVkQ291bnQ7XG5cbiAgICAgIC8v6YeN5YaZbGlzdFxuICAgICAgdmFyIGRvdExpc3QgPSBbXCLlhajpg6hcIiwgeyBuYW1lOiBcIuW+heWkhOeQhlwiLCBkb3ROdW06IHRoYXQucGVuZGluZ1BheUNvdW50IH0sIHsgbmFtZTogXCLlvoXmlLbotKdcIiwgZG90TnVtOiB0aGF0LmJhY2tyZGVyc0NvdW50IH0sIFwi5bey5a6M5oiQXCJdO1xuICAgICAgdGhpcy4kaW52b2tlKFwidGFiXCIsIFwiY2hhbmdlTGlzdFwiLCBkb3RMaXN0KTtcbiAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgfVxuICB9XG5cblxuICBvbkxvYWQob3B0cykge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBsZXQgdGl0bGUgPSBcIlwiO1xuICAgIHRoYXQub3JkZXJMaXN0ID0gW107XG4gICAgdGhhdC5jdXJyZW50VGFiID0gb3B0cy50eXBlO1xuICAgIHRoYXQuZ2V0TXlPcmRlcigpO1xuICAgIC8v6K6+572u5rua5Yqo6auY5bqmXG4gICAgbGV0IHN5c3RlbUluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFNZU1RFTV9JTkZPKTtcbiAgICB0aGF0LndpbkhlaWdodCA9IHN5c3RlbUluZm8ud2luZG93SGVpZ2h0O1xuICAgIHRoYXQuJGFwcGx5KCk7XG4gIH1cbiAgY29tcHV0ZWQgPSB7XG5cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGdldEN1cnJlbnRUYWIoY3VyLCBldnQpIHtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSAxO1xuICAgICAgdGhpcy5wYWdlX3RvdGFsID0gMDtcbiAgICAgIHRoaXMub3JkZXJMaXN0ID0gW107XG5cbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuY3VycmVudFRhYiA9IGN1cjtcbiAgICAgIGNvbnNvbGUubG9nKFwiY3VyXCIpO1xuICAgICAgY29uc29sZS5sb2coY3VyKTtcbiAgICAgIGlmIChjdXIgPT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuaJgOacieiuouWNleexu+Wei1wiKTtcbiAgICAgICAgdGhhdC5vcmRlclN0YXR1cyA9IFwiXCI7XG4gICAgICAgIHRoYXQuZ2V0TXlPcmRlcigpO1xuICAgICAgfSBlbHNlIGlmIChjdXIgPT0gMSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuacquS7mOasvuiuouWNleexu+Wei1wiKTtcbiAgICAgICAgdGhhdC5vcmRlclN0YXR1cyA9IDA7XG4gICAgICAgIHRoYXQuZ2V0TXlPcmRlcigpO1xuICAgICAgfSBlbHNlIGlmIChjdXIgPT0gMikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuW+heaUtui0p+iuouWNleexu+Wei1wiKTtcbiAgICAgICAgdGhhdC5vcmRlclN0YXR1cyA9IDI7XG4gICAgICAgIHRoYXQucmVjZWl2ZUZsZz0yO1xuICAgICAgICB0aGF0LmdldE15T3JkZXIoKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VyID09IDMpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIuW3suWujOaIkOiuouWNleexu+Wei1wiKTtcbiAgICAgICAgdGhhdC5vcmRlclN0YXR1cyA9IDQ7XG4gICAgICAgIHRoYXQucmVjZWl2ZUZsZz00O1xuICAgICAgICB0aGF0LmdldE15T3JkZXIoKTtcbiAgICAgIH1cbiAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDmu5HliqjliIfmjaJ0YWJcbiAgICAgKi9cbiAgICBiaW5kQ2hhbmdlKGUpIHtcblxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5jdXJyZW50VGFiID0gZS5kZXRhaWwuY3VycmVudDtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlIHRhYi4uLi5cIiArIGUuZGV0YWlsY3VycmVudCk7XG4gICAgICB0aGF0LiRhcHBseSgpO1xuICAgIH0sXG4gIH1cbiAgZXZlbnRzID0ge1xuICAgIHJlZnJlc2hPcmRlckxpc3QobXNnKXtcbiAgICAgIGNvbnNvbGUubG9nKFwibXNn5YC8OlwiK21zZyk7XG4gICAgICBpZihtc2c9PTMpe1xuICAgICAgICB0aGlzLmN1cnJlbnRUYWI9MztcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgdGhpcy5vcmRlclN0YXR1cyA9IDQ7XG4gICAgICB9XG4gICAgICB0aGlzLmdldE15T3JkZXIoMSwxMCwxKTtcbiAgICB9XG4gIH1cbiAgd2F0Y2ggPSB7XG4gICAgY3VycmVudFRhYih2YWwpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiPT09PVwiICsgdmFsKVxuICAgIH1cbiAgfVxuXG4gIC8v5Yqg6L295pu05aSaXG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgY29uc29sZS5sb2coXCLliqDovb3mm7TlpJpcIik7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHRoYXQuc2hvd0xvYWRpbmcgPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKHRoYXQucGFnZV90b3RhbCArIFwiMjMyPT09XCIgKyB0aGF0LmN1cnJlbnRQYWdlKTtcbiAgICAvL+WIpOaWreaAu+mhteaVsOaYr+WQpuWkp+S6jue/u+mhteaVsFxuICAgIGlmICgodGhhdC5wYWdlX3RvdGFsKSA+IHRoYXQuY3VycmVudFBhZ2UpIHtcbiAgICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XG4gICAgICBpZiAodGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSB0cnVlO1xuICAgICAgdGhhdC5jdXJyZW50UGFnZSsrO1xuICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50VGFiKTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRUYWIgPT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuaJgOacieiuouWNleexu+Wei1wiKTtcbiAgICAgICAgdGhhdC5nZXRNeU9yZGVyKHRoYXQuY3VycmVudFBhZ2UpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRUYWIgPT0gMSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuacquS7mOasvuiuouWNleexu+Wei1wiKTtcbiAgICAgICAgdGhhdC5vcmRlclN0YXR1cyA9IDA7XG4gICAgICAgIHRoYXQuZ2V0TXlPcmRlcih0aGF0LmN1cnJlbnRQYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VGFiID09IDIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCLlvoXlj5HotKforqLljZXnsbvlnotcIik7XG4gICAgICAgIHRoYXQub3JkZXJTdGF0dXMgPSAxO1xuICAgICAgICB0aGF0LnJlY2VpdmVGbGc9MTtcbiAgICAgICAgdGhhdC5nZXRNeU9yZGVyKHRoYXQuY3VycmVudFBhZ2UpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRUYWIgPT0gMykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuW3suWujOaIkOiuouWNleexu+Wei1wiKTtcbiAgICAgICAgdGhhdC5vcmRlclN0YXR1cyA9IDQ7XG4gICAgICAgIHRoYXQuZ2V0TXlPcmRlcih0aGF0LmN1cnJlbnRQYWdlKTtcbiAgICAgIH1cbiAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5zaG93TG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxufVxuXG4iXX0=