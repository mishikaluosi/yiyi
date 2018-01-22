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
      navigationBarTitleText: "我的订单"
    }, _this.$repeat = {}, _this.$props = { "tab": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:tabList.sync": "tabList", "v-bind:currentTab.sync": "currentTab" }, "orderItem": { "xmlns:v-bind": "", "v-bind:orderList.sync": "orderList" }, "bottomLoadMore": { "v-bind:show.sync": "showLoading", "message": "正在加载" }, "placeholder": { "v-bind:show.sync": "is_empty", "message": "暂无发现数据" } }, _this.$events = { "tab": { "v-on:currentTab": "getCurrentTab" } }, _this.components = {
      tab: _tab2.default,
      orderItem: _order_item2.default,
      bottomLoadMore: _bottomLoadMore2.default,
      placeholder: _placeholder2.default
    }, _this.data = {
      winHeight: 0,
      totalCount: 0,
      tabList: ["全部订单", "待支付", "待收货", "已完成"],
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
                    type: 1 //正常单
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
                    openId: openId
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
                  dotList = ["全部订单", { name: "待支付", dotNum: that.pendingPayCount }, { name: "待收货", dotNum: that.backrdersCount }, "已完成"];

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
          that.orderStatus = 2;
          that.receiveFlg = 2;
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInRhYiIsIm9yZGVySXRlbSIsImJvdHRvbUxvYWRNb3JlIiwicGxhY2Vob2xkZXIiLCJkYXRhIiwid2luSGVpZ2h0IiwidG90YWxDb3VudCIsInRhYkxpc3QiLCJvcmRlckxpc3QiLCJjdXJyZW50UGFnZSIsImlzX2VtcHR5Iiwib3JkZXJTdGF0dXMiLCJjdXJyZW50VGFiIiwiZmxhZyIsInNob3dMb2FkaW5nIiwicHJldmVudFJlcGVhdFJldXFlc3QiLCJwZW5kaW5nUGF5Q291bnQiLCJiYWNrcmRlcnNDb3VudCIsInNoaXBwZWRDb3VudCIsInJlY2VpdmVGbGciLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnZXRDdXJyZW50VGFiIiwiY3VyIiwiZXZ0IiwicGFnZV90b3RhbCIsInRoYXQiLCJjb25zb2xlIiwibG9nIiwiZ2V0TXlPcmRlciIsIiRhcHBseSIsImJpbmRDaGFuZ2UiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsImRldGFpbGN1cnJlbnQiLCJldmVudHMiLCJyZWZyZXNoT3JkZXJMaXN0IiwibXNnIiwid2F0Y2giLCJ2YWwiLCJzaXplIiwicmVmcmVzaCIsInVzZXJTcGVjaWFsSW5mbyIsImdldFN0b3JhZ2VTeW5jIiwib3BlbklkIiwib3BlbmlkIiwiZ2V0TXlPcmRlckxpc3QiLCJxdWVyeSIsInBhZ2UiLCJ0eXBlIiwianNvbiIsImNvZGUiLCJsaXN0IiwiZ2V0TXlPcmRlclNpemUiLCJ0aXAiLCJlcnJvciIsImRvdExpc3QiLCJuYW1lIiwiZG90TnVtIiwiJGludm9rZSIsIm9wdHMiLCJ0aXRsZSIsInN5c3RlbUluZm8iLCJ3aW5kb3dIZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFJQTs7OztBQUNBOzs7O0FB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dCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IFRhYiBmcm9tICcuLi9jb21wb25lbnRzL3RhYidcbmltcG9ydCB7XG4gIFNZU1RFTV9JTkZPLFxuICBVU0VSX1NQRUNJQ0FMX0lORk9cbn0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnQnO1xuaW1wb3J0IE9yZGVySXRlbSBmcm9tICcuLi9jb21wb25lbnRzL29yZGVyX2l0ZW0nXG5pbXBvcnQgQm90dG9tTG9hZE1vcmUgZnJvbSBcIi4uL2NvbXBvbmVudHMvY29tbW9uL2JvdHRvbUxvYWRNb3JlXCJcbmltcG9ydCBQbGFjZWhvbGRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9jb21tb24vcGxhY2Vob2xkZXJcIlxuaW1wb3J0IGFwaSBmcm9tICcuLi9hcGkvYXBpJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi5oiR55qE6K6i5Y2VXCIsXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYlwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDp0YWJMaXN0LnN5bmNcIjpcInRhYkxpc3RcIixcInYtYmluZDpjdXJyZW50VGFiLnN5bmNcIjpcImN1cnJlbnRUYWJcIn0sXCJvcmRlckl0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm9yZGVyTGlzdC5zeW5jXCI6XCJvcmRlckxpc3RcIn0sXCJib3R0b21Mb2FkTW9yZVwiOntcInYtYmluZDpzaG93LnN5bmNcIjpcInNob3dMb2FkaW5nXCIsXCJtZXNzYWdlXCI6XCLmraPlnKjliqDovb1cIn0sXCJwbGFjZWhvbGRlclwiOntcInYtYmluZDpzaG93LnN5bmNcIjpcImlzX2VtcHR5XCIsXCJtZXNzYWdlXCI6XCLmmoLml6Dlj5HnjrDmlbDmja5cIn19O1xyXG4kZXZlbnRzID0ge1widGFiXCI6e1widi1vbjpjdXJyZW50VGFiXCI6XCJnZXRDdXJyZW50VGFiXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgdGFiOiBUYWIsXG4gICAgb3JkZXJJdGVtOiBPcmRlckl0ZW0sXG4gICAgYm90dG9tTG9hZE1vcmU6IEJvdHRvbUxvYWRNb3JlLFxuICAgIHBsYWNlaG9sZGVyOiBQbGFjZWhvbGRlclxuICB9XG4gIGRhdGEgPSB7XG4gICAgd2luSGVpZ2h0OiAwLFxuICAgIHRvdGFsQ291bnQ6IDAsXG4gICAgdGFiTGlzdDogW1wi5YWo6YOo6K6i5Y2VXCIsIFwi5b6F5pSv5LuYXCIsIFwi5b6F5pS26LSnXCIsIFwi5bey5a6M5oiQXCJdLFxuICAgIG9yZGVyTGlzdDogW10sXG4gICAgY3VycmVudFBhZ2U6IDEsXG4gICAgaXNfZW1wdHk6IGZhbHNlLFxuICAgIG9yZGVyU3RhdHVzOiBcIlwiLFxuICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgZmxhZzogMCxcbiAgICAvL+aYr+WQpuaYvuekuiDlupXpg6hsb2FkaW5nXG4gICAgc2hvd0xvYWRpbmc6IHRydWUsXG4gICAgLy/pmLLmraLph43lpI3liqDovb1cbiAgICBwcmV2ZW50UmVwZWF0UmV1cWVzdDogZmFsc2UsXG4gICAgLy/lvoXku5jmrL5cbiAgICBwZW5kaW5nUGF5Q291bnQgOiAwLFxuICAgIC8v5b6F5Y+R6LSnXG4gICAgYmFja3JkZXJzQ291bnQgOiAwLFxuICAgIC8v5b6F5pS26LSnXG4gICAgc2hpcHBlZENvdW50IDogMCxcblxuICAgIHJlY2VpdmVGbGcgOiAwXG4gIH1cblxuICBhc3luYyBnZXRNeU9yZGVyKGN1cnJlbnRQYWdlLCBzaXplLHJlZnJlc2gpIHtcblxuICAgIGNvbnNvbGUubG9nKFwicmVmcmVzaOWAvO+8mlwiK3JlZnJlc2gpO1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBjb25zb2xlLmxvZyhcIm9yZGVyU3RhdHVz5YC8XCIpO1xuICAgIGNvbnNvbGUubG9nKFwib3JkZXJTdGF0dXPlgLxcIiArIHRoYXQub3JkZXJTdGF0dXMpO1xuICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgbGV0IG9wZW5JZCA9IHVzZXJTcGVjaWFsSW5mby5vcGVuaWQ7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRNeU9yZGVyTGlzdCh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBvcGVuSWQ6IG9wZW5JZCxcbiAgICAgICAgb3JkZXJTdGF0dXM6IHRoYXQub3JkZXJTdGF0dXMsXG4gICAgICAgIHJlY2VpdmVGbGcgOiB0aGF0LnJlY2VpdmVGbGcsXG4gICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlIHx8IDEsXG4gICAgICAgIHNpemU6IHNpemUgfHwgMTAsXG4gICAgICAgIHR5cGU6IDEgLy/mraPluLjljZVcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgY29uc29sZS5sb2coXCJqc29uLmRhdGEubGlzdFwiKTtcbiAgICAgIGNvbnNvbGUubG9nKGpzb24uZGF0YS5saXN0KTtcbiAgICAgIGlmIChyZWZyZXNoKSB7XG4gICAgICAgIHRoYXQub3JkZXJMaXN0ID0ganNvbi5kYXRhLmxpc3Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0Lm9yZGVyTGlzdCA9IFsuLi50aGF0Lm9yZGVyTGlzdCwgLi4uanNvbi5kYXRhLmxpc3RdO1xuICAgICAgfVxuICAgICAgdGhhdC5wYWdlX3RvdGFsID0ganNvbi5kYXRhLnBhZ2VfdG90YWw7XG4gICAgICB0aGF0LnRvdGFsQ291bnQgPSBqc29uLmRhdGEudG90YWxDb3VudDtcbiAgICAgIGNvbnNvbGUubG9nKFwi5p2h55uu5pWw77yaXCIgKyB0aGF0LnRvdGFsQ291bnQpO1xuICAgICAgaWYgKGpzb24uZGF0YS5wYWdlX3RvdGFsID09IDApIHtcbiAgICAgICAgLy/mmoLml6DmlbDmja5cbiAgICAgICAgdGhhdC5pc19lbXB0eSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LmlzX2VtcHR5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGF0LmdldE15T3JkZXJTaXplKCk7XG4gICAgICBjb25zb2xlLmxvZyhcImxpc3Tov5Tlm57mlbDmja5cIik7XG4gICAgICBjb25zb2xlLmxvZyh0aGF0Lm9yZGVyTGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKVxuICAgIH1cbiAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XG4gICAgdGhhdC4kYXBwbHkoKTtcbiAgfVxuXG4gIGFzeW5jIGdldE15T3JkZXJTaXplKCkge1xuICAgIGNvbnNvbGUubG9nKFwi6K6i5Y2V5pWw6YeP57uf6K6hXCIpO1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8pIHx8IHt9O1xuICAgIGxldCBvcGVuSWQgPSB1c2VyU3BlY2lhbEluZm8ub3BlbmlkO1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0TXlPcmRlclNpemUoe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgb3BlbklkOiBvcGVuSWRcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgLy/lvoXku5jmrL5cbiAgICAgIHRoYXQucGVuZGluZ1BheUNvdW50ID0ganNvbi5kYXRhLnBlbmRpbmdQYXlDb3VudDtcbiAgICAgIC8v5b6F5Y+R6LSnXG4gICAgICB0aGF0LmJhY2tyZGVyc0NvdW50ID0ganNvbi5kYXRhLmJhY2tyZGVyc0NvdW50O1xuICAgICAgLy/lvoXmlLbotKdcbiAgICAgIHRoYXQuc2hpcHBlZENvdW50ID0ganNvbi5kYXRhLnNoaXBwZWRDb3VudDtcblxuICAgICAgLy/ph43lhplsaXN0XG4gICAgICB2YXIgZG90TGlzdCA9IFtcIuWFqOmDqOiuouWNlVwiLCB7IG5hbWU6IFwi5b6F5pSv5LuYXCIsIGRvdE51bTogdGhhdC5wZW5kaW5nUGF5Q291bnQgfSwgeyBuYW1lOiBcIuW+heaUtui0p1wiLCBkb3ROdW06IHRoYXQuYmFja3JkZXJzQ291bnQgfSwgXCLlt7LlrozmiJBcIl07XG4gICAgICB0aGlzLiRpbnZva2UoXCJ0YWJcIiwgXCJjaGFuZ2VMaXN0XCIsIGRvdExpc3QpO1xuICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICB9XG4gIH1cblxuXG4gIG9uTG9hZChvcHRzKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCB0aXRsZSA9IFwiXCI7XG4gICAgdGhhdC5vcmRlckxpc3QgPSBbXTtcbiAgICB0aGF0LmN1cnJlbnRUYWIgPSBvcHRzLnR5cGU7XG4gICAgdGhhdC5nZXRNeU9yZGVyKCk7XG4gICAgLy/orr7nva7mu5rliqjpq5jluqZcbiAgICBsZXQgc3lzdGVtSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoU1lTVEVNX0lORk8pO1xuICAgIHRoYXQud2luSGVpZ2h0ID0gc3lzdGVtSW5mby53aW5kb3dIZWlnaHQ7XG4gICAgdGhhdC4kYXBwbHkoKTtcbiAgfVxuICBjb21wdXRlZCA9IHtcblxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgZ2V0Q3VycmVudFRhYihjdXIsIGV2dCkge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDE7XG4gICAgICB0aGlzLnBhZ2VfdG90YWwgPSAwO1xuICAgICAgdGhpcy5vcmRlckxpc3QgPSBbXTtcblxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5jdXJyZW50VGFiID0gY3VyO1xuICAgICAgY29uc29sZS5sb2coXCJjdXJcIik7XG4gICAgICBjb25zb2xlLmxvZyhjdXIpO1xuICAgICAgaWYgKGN1ciA9PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5omA5pyJ6K6i5Y2V57G75Z6LXCIpO1xuICAgICAgICB0aGF0Lm9yZGVyU3RhdHVzID0gXCJcIjtcbiAgICAgICAgdGhhdC5nZXRNeU9yZGVyKCk7XG4gICAgICB9IGVsc2UgaWYgKGN1ciA9PSAxKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5pyq5LuY5qy+6K6i5Y2V57G75Z6LXCIpO1xuICAgICAgICB0aGF0Lm9yZGVyU3RhdHVzID0gMDtcbiAgICAgICAgdGhhdC5nZXRNeU9yZGVyKCk7XG4gICAgICB9IGVsc2UgaWYgKGN1ciA9PSAyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5b6F5pS26LSn6K6i5Y2V57G75Z6LXCIpO1xuICAgICAgICB0aGF0Lm9yZGVyU3RhdHVzID0gMjtcbiAgICAgICAgdGhhdC5yZWNlaXZlRmxnPTI7XG4gICAgICAgIHRoYXQuZ2V0TXlPcmRlcigpO1xuICAgICAgfSBlbHNlIGlmIChjdXIgPT0gMykge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5bey5a6M5oiQ6K6i5Y2V57G75Z6LXCIpO1xuICAgICAgICB0aGF0Lm9yZGVyU3RhdHVzID0gNDtcbiAgICAgICAgdGhhdC5yZWNlaXZlRmxnPTQ7XG4gICAgICAgIHRoYXQuZ2V0TXlPcmRlcigpO1xuICAgICAgfVxuICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOa7keWKqOWIh+aNonRhYlxuICAgICAqL1xuICAgIGJpbmRDaGFuZ2UoZSkge1xuXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmN1cnJlbnRUYWIgPSBlLmRldGFpbC5jdXJyZW50O1xuICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2UgdGFiLi4uLlwiICsgZS5kZXRhaWxjdXJyZW50KTtcbiAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgfSxcbiAgfVxuICBldmVudHMgPSB7XG4gICAgcmVmcmVzaE9yZGVyTGlzdChtc2cpe1xuICAgICAgY29uc29sZS5sb2coXCJtc2flgLw6XCIrbXNnKTtcbiAgICAgIGlmKG1zZz09Myl7XG4gICAgICAgIHRoaXMuY3VycmVudFRhYj0zO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB0aGlzLm9yZGVyU3RhdHVzID0gNDtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ2V0TXlPcmRlcigxLDEwLDEpO1xuICAgIH1cbiAgfVxuICB3YXRjaCA9IHtcbiAgICBjdXJyZW50VGFiKHZhbCkge1xuICAgICAgY29uc29sZS5sb2coXCI9PT09XCIgKyB2YWwpXG4gICAgfVxuICB9XG5cbiAgLy/liqDovb3mm7TlpJpcbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBjb25zb2xlLmxvZyhcIuWKoOi9veabtOWkmlwiKTtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgdGhhdC5zaG93TG9hZGluZyA9IHRydWU7XG4gICAgY29uc29sZS5sb2codGhhdC5wYWdlX3RvdGFsICsgXCIyMzI9PT1cIiArIHRoYXQuY3VycmVudFBhZ2UpO1xuICAgIC8v5Yik5pat5oC76aG15pWw5piv5ZCm5aSn5LqO57+76aG15pWwXG4gICAgaWYgKCh0aGF0LnBhZ2VfdG90YWwpID4gdGhhdC5jdXJyZW50UGFnZSkge1xuICAgICAgLy/pmLLmraLph43lpI3liqDovb1cbiAgICAgIGlmICh0aGF0LnByZXZlbnRSZXBlYXRSZXVxZXN0KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgdGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCA9IHRydWU7XG4gICAgICB0aGF0LmN1cnJlbnRQYWdlKys7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRUYWIpO1xuICAgICAgaWYgKHRoaXMuY3VycmVudFRhYiA9PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5omA5pyJ6K6i5Y2V57G75Z6LXCIpO1xuICAgICAgICB0aGF0LmdldE15T3JkZXIodGhhdC5jdXJyZW50UGFnZSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFRhYiA9PSAxKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5pyq5LuY5qy+6K6i5Y2V57G75Z6LXCIpO1xuICAgICAgICB0aGF0Lm9yZGVyU3RhdHVzID0gMDtcbiAgICAgICAgdGhhdC5nZXRNeU9yZGVyKHRoYXQuY3VycmVudFBhZ2UpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRUYWIgPT0gMikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuW+heWPkei0p+iuouWNleexu+Wei1wiKTtcbiAgICAgICAgdGhhdC5vcmRlclN0YXR1cyA9IDI7XG4gICAgICAgIHRoYXQucmVjZWl2ZUZsZz0yO1xuICAgICAgICB0aGF0LmdldE15T3JkZXIodGhhdC5jdXJyZW50UGFnZSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFRhYiA9PSAzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5bey5a6M5oiQ6K6i5Y2V57G75Z6LXCIpO1xuICAgICAgICB0aGF0Lm9yZGVyU3RhdHVzID0gNDtcbiAgICAgICAgdGhhdC5nZXRNeU9yZGVyKHRoYXQuY3VycmVudFBhZ2UpO1xuICAgICAgfVxuICAgICAgdGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9O1xuXG59XG5cbiJdfQ==