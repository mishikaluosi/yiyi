'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tab = require('./../components/tab.js');

var _tab2 = _interopRequireDefault(_tab);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _bottomLoadMore = require('./../components/common/bottomLoadMore.js');

var _bottomLoadMore2 = _interopRequireDefault(_bottomLoadMore);

var _placeholder = require('./../components/common/placeholder.js');

var _placeholder2 = _interopRequireDefault(_placeholder);

var _constant = require('./../utils/constant.js');

var _shop_grid_list = require('./../components/shop_grid_list.js');

var _shop_grid_list2 = _interopRequireDefault(_shop_grid_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var replenishmentGoods = function (_wepy$page) {
  _inherits(replenishmentGoods, _wepy$page);

  function replenishmentGoods() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, replenishmentGoods);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = replenishmentGoods.__proto__ || Object.getPrototypeOf(replenishmentGoods)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我要补货'
    }, _this.$repeat = {}, _this.$props = { "tab": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:currentTab.sync": "currentTab", "v-bind:tabList.sync": "tabList" }, "shopGridList": { "xmlns:v-bind": "", "v-bind:purchasetype.sync": "purchasetype", "v-bind:list.sync": "list" }, "bottomLoadMore": { "v-bind:show.sync": "showLoading", "message": "正在加载" }, "placeholder": { "v-bind:show.sync": "is_empty", "message": "暂无待补货数据" } }, _this.$events = { "tab": { "v-on:currentTab": "getCurrentTab" } }, _this.components = {
      tab: _tab2.default,
      shopGridList: _shop_grid_list2.default,
      bottomLoadMore: _bottomLoadMore2.default,
      placeholder: _placeholder2.default
    }, _this.data = {
      purchasetype: 2, //类型:1-商品订单;2-商品补单;
      currentTab: 0,
      winHeight: 0,
      tabList: ["快速补货", "申请记录", "待补货"],
      list: [],
      //是否有数据
      is_empty: false,
      //当前页面
      currentPage: 1,
      //总页数
      page_total: 0,
      //是否显示 底部loading
      showLoading: true,
      //防止重复加载
      preventRepeatReuqest: false
    }, _this.computed = {}, _this.methods = {
      getCurrentTab: function getCurrentTab(cur, evt) {
        var that = this;
        that.currentTab = cur;
        //this.getMyOrderGoodsList();
        that.$apply();
      },

      /**
       * 滑动切换tab
       */
      bindChange: function bindChange(e) {
        var that = this;
        that.currentTab = e.detail.current;
        this.list = [];
        this.currentPage = 1;
        this.page_total = 0;
        this.is_empty = false;
        this.getMyOrderGoodsList();
        that.$apply();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(replenishmentGoods, [{
    key: 'getMyOrderGoodsList',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(currentPage, size) {
        var userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context.next = 4;
                return _api2.default.goodsUserOrderList({
                  query: {
                    page: currentPage || 1,
                    size: size || 4,
                    openId: openId,
                    type: 'finish',
                    doType: this.currentTab
                  }
                });

              case 4:
                json = _context.sent;

                if (json.data.code == 0) {
                  this.list = [].concat(_toConsumableArray(this.list), _toConsumableArray(json.data.list));
                  this.page_total = json.data.page_total;
                  if (json.data.page_total == 0) {
                    //暂无数据
                    this.is_empty = true;
                  }
                } else {
                  _tip2.default.error(json.data.msg);
                }
                this.showLoading = false;
                this.$apply();

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMyOrderGoodsList(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return getMyOrderGoodsList;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      var systemInfo = wx.getStorageSync(_constant.SYSTEM_INFO);
      that.winHeight = systemInfo.windowHeight;
      this.list = [];
      this.is_empty = false;
      this.getMyOrderGoodsList();
      /*that.list = bb.result.products;
      console.log(bb.result.products)*/
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
        this.getMyOrderGoodsList(this.currentPage);
        that.preventRepeatReuqest = false;
      } else {
        that.showLoading = false;
      }
    }
  }]);

  return replenishmentGoods;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(replenishmentGoods , 'pages/replenishment_goods'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcGxlbmlzaG1lbnRfZ29vZHMuanMiXSwibmFtZXMiOlsicmVwbGVuaXNobWVudEdvb2RzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInRhYiIsInNob3BHcmlkTGlzdCIsImJvdHRvbUxvYWRNb3JlIiwicGxhY2Vob2xkZXIiLCJkYXRhIiwicHVyY2hhc2V0eXBlIiwiY3VycmVudFRhYiIsIndpbkhlaWdodCIsInRhYkxpc3QiLCJsaXN0IiwiaXNfZW1wdHkiLCJjdXJyZW50UGFnZSIsInBhZ2VfdG90YWwiLCJzaG93TG9hZGluZyIsInByZXZlbnRSZXBlYXRSZXVxZXN0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ2V0Q3VycmVudFRhYiIsImN1ciIsImV2dCIsInRoYXQiLCIkYXBwbHkiLCJiaW5kQ2hhbmdlIiwiZSIsImRldGFpbCIsImN1cnJlbnQiLCJnZXRNeU9yZGVyR29vZHNMaXN0IiwiZXZlbnRzIiwic2l6ZSIsInVzZXJTcGVjaWFsSW5mbyIsImdldFN0b3JhZ2VTeW5jIiwib3BlbklkIiwib3BlbmlkIiwiZ29vZHNVc2VyT3JkZXJMaXN0IiwicXVlcnkiLCJwYWdlIiwidHlwZSIsImRvVHlwZSIsImpzb24iLCJjb2RlIiwiZXJyb3IiLCJtc2ciLCJzeXN0ZW1JbmZvIiwid3giLCJ3aW5kb3dIZWlnaHQiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7OztJQUNxQkEsa0I7Ozs7Ozs7Ozs7Ozs7OzhNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLE9BQU0sRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMs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WSxFQUFaO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNBLFdBQUtnQixtQkFBTDtBQUNBOztBQUVEOzs7OztBQTZCRDtvQ0FDZ0I7QUFDZG1CLGNBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0EsVUFBSTFCLE9BQU8sSUFBWDtBQUNBQSxXQUFLUCxXQUFMLEdBQW1CLElBQW5CO0FBQ0FnQyxjQUFRQyxHQUFSLENBQVkxQixLQUFLUixVQUFMLEdBQWtCLFFBQWxCLEdBQTZCUSxLQUFLVCxXQUE5QztBQUNBO0FBQ0EsVUFBS1MsS0FBS1IsVUFBTixHQUFvQlEsS0FBS1QsV0FBN0IsRUFBMEM7QUFDeEM7QUFDQSxZQUFJUyxLQUFLTixvQkFBVCxFQUErQjtBQUM3QixpQkFBTyxJQUFQO0FBQ0Q7QUFDRE0sYUFBS04sb0JBQUwsR0FBNEIsSUFBNUI7QUFDQU0sYUFBS1QsV0FBTDtBQUNBa0MsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLeEMsVUFBakI7QUFDQSxhQUFLb0IsbUJBQUwsQ0FBeUIsS0FBS2YsV0FBOUI7QUFDQVMsYUFBS04sb0JBQUwsR0FBNEIsS0FBNUI7QUFDRCxPQVZELE1BVU87QUFDTE0sYUFBS1AsV0FBTCxHQUFtQixLQUFuQjtBQUNEO0FBQ0Y7Ozs7RUFuSDZDLGVBQUtzQixJOztrQkFBaEMxQyxrQiIsImZpbGUiOiJyZXBsZW5pc2htZW50X2dvb2RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBUYWIgZnJvbSAnLi4vY29tcG9uZW50cy90YWInO1xuaW1wb3J0IGFwaSBmcm9tICcuLi9hcGkvYXBpJztcbmltcG9ydCB0aXAgZnJvbSAnLi4vdXRpbHMvdGlwJ1xuaW1wb3J0IEJvdHRvbUxvYWRNb3JlIGZyb20gXCIuLi9jb21wb25lbnRzL2NvbW1vbi9ib3R0b21Mb2FkTW9yZVwiXG5pbXBvcnQgUGxhY2Vob2xkZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvY29tbW9uL3BsYWNlaG9sZGVyXCJcbmltcG9ydCB7XG4gIFNZU1RFTV9JTkZPLFxuICBVU0VSX1NQRUNJQ0FMX0lORk9cbn0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnQnO1xuaW1wb3J0IFNob3BHcmlkTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL3Nob3BfZ3JpZF9saXN0J1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcmVwbGVuaXNobWVudEdvb2RzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHopoHooaXotKcnLFxuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ0YWJcIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y3VycmVudFRhYi5zeW5jXCI6XCJjdXJyZW50VGFiXCIsXCJ2LWJpbmQ6dGFiTGlzdC5zeW5jXCI6XCJ0YWJMaXN0XCJ9LFwic2hvcEdyaWRMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpwdXJjaGFzZXR5cGUuc3luY1wiOlwicHVyY2hhc2V0eXBlXCIsXCJ2LWJpbmQ6bGlzdC5zeW5jXCI6XCJsaXN0XCJ9LFwiYm90dG9tTG9hZE1vcmVcIjp7XCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJzaG93TG9hZGluZ1wiLFwibWVzc2FnZVwiOlwi5q2j5Zyo5Yqg6L29XCJ9LFwicGxhY2Vob2xkZXJcIjp7XCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJpc19lbXB0eVwiLFwibWVzc2FnZVwiOlwi5pqC5peg5b6F6KGl6LSn5pWw5o2uXCJ9fTtcclxuJGV2ZW50cyA9IHtcInRhYlwiOntcInYtb246Y3VycmVudFRhYlwiOlwiZ2V0Q3VycmVudFRhYlwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHRhYjogVGFiLFxuICAgIHNob3BHcmlkTGlzdDogU2hvcEdyaWRMaXN0LFxuICAgIGJvdHRvbUxvYWRNb3JlOiBCb3R0b21Mb2FkTW9yZSxcbiAgICBwbGFjZWhvbGRlcjogUGxhY2Vob2xkZXJcbiAgfVxuICBkYXRhID0ge1xuICAgIHB1cmNoYXNldHlwZSA6IDIsIC8v57G75Z6LOjEt5ZWG5ZOB6K6i5Y2VOzIt5ZWG5ZOB6KGl5Y2VO1xuICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgd2luSGVpZ2h0OiAwLFxuICAgIHRhYkxpc3Q6IFtcIuW/q+mAn+ihpei0p1wiLCBcIueUs+ivt+iusOW9lVwiLCBcIuW+heihpei0p1wiXSxcbiAgICBsaXN0OiBbXSxcbiAgICAvL+aYr+WQpuacieaVsOaNrlxuICAgIGlzX2VtcHR5OiBmYWxzZSxcbiAgICAvL+W9k+WJjemhtemdolxuICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgIC8v5oC76aG15pWwXG4gICAgcGFnZV90b3RhbDogMCxcbiAgICAvL+aYr+WQpuaYvuekuiDlupXpg6hsb2FkaW5nXG4gICAgc2hvd0xvYWRpbmc6IHRydWUsXG4gICAgLy/pmLLmraLph43lpI3liqDovb1cbiAgICBwcmV2ZW50UmVwZWF0UmV1cWVzdDogZmFsc2VcbiAgfVxuXG4gIGFzeW5jIGdldE15T3JkZXJHb29kc0xpc3QoY3VycmVudFBhZ2Usc2l6ZSkge1xuICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgbGV0IG9wZW5JZCA9IHVzZXJTcGVjaWFsSW5mby5vcGVuaWQ7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nb29kc1VzZXJPcmRlckxpc3Qoe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgcGFnZTogY3VycmVudFBhZ2UgfHwgMSxcbiAgICAgICAgc2l6ZTogc2l6ZSB8fCA0LFxuICAgICAgICBvcGVuSWQ6IG9wZW5JZCxcbiAgICAgICAgdHlwZTogJ2ZpbmlzaCcsXG4gICAgICAgIGRvVHlwZTp0aGlzLmN1cnJlbnRUYWJcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgdGhpcy5saXN0ID0gWy4uLnRoaXMubGlzdCwgLi4uanNvbi5kYXRhLmxpc3RdO1xuICAgICAgdGhpcy5wYWdlX3RvdGFsID0ganNvbi5kYXRhLnBhZ2VfdG90YWw7XG4gICAgICBpZiAoanNvbi5kYXRhLnBhZ2VfdG90YWwgPT0gMCkge1xuICAgICAgICAvL+aaguaXoOaVsOaNrlxuICAgICAgICB0aGlzLmlzX2VtcHR5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5tc2cpO1xuICAgIH1cbiAgICB0aGlzLnNob3dMb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuXG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHN5c3RlbUluZm8gPSB3eC5nZXRTdG9yYWdlU3luYyhTWVNURU1fSU5GTyk7XG4gICAgdGhhdC53aW5IZWlnaHQgPSBzeXN0ZW1JbmZvLndpbmRvd0hlaWdodDtcbiAgICB0aGlzLmxpc3QgPSBbXTtcbiAgICB0aGlzLmlzX2VtcHR5ID0gZmFsc2U7XG4gICAgdGhpcy5nZXRNeU9yZGVyR29vZHNMaXN0KCk7XG4gICAgLyp0aGF0Lmxpc3QgPSBiYi5yZXN1bHQucHJvZHVjdHM7XG4gICAgY29uc29sZS5sb2coYmIucmVzdWx0LnByb2R1Y3RzKSovXG4gIH1cbiAgY29tcHV0ZWQgPSB7XG5cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGdldEN1cnJlbnRUYWIoY3VyLCBldnQpIHtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuY3VycmVudFRhYiA9IGN1cjtcbiAgICAgIC8vdGhpcy5nZXRNeU9yZGVyR29vZHNMaXN0KCk7XG4gICAgICB0aGF0LiRhcHBseSgpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICog5ruR5Yqo5YiH5o2idGFiXG4gICAgICovXG4gICAgYmluZENoYW5nZShlKSB7XG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmN1cnJlbnRUYWIgPSBlLmRldGFpbC5jdXJyZW50O1xuICAgICAgdGhpcy5saXN0ID0gW107XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMTtcbiAgICAgIHRoaXMucGFnZV90b3RhbCA9IDA7XG4gICAgICB0aGlzLmlzX2VtcHR5ID0gZmFsc2U7XG4gICAgICB0aGlzLmdldE15T3JkZXJHb29kc0xpc3QoKTtcbiAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgfSxcbiAgfVxuICBldmVudHMgPSB7XG5cbiAgfVxuXG4gIC8v5Yqg6L295pu05aSaXG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgY29uc29sZS5sb2coXCLliqDovb3mm7TlpJpcIik7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHRoYXQuc2hvd0xvYWRpbmcgPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKHRoYXQucGFnZV90b3RhbCArIFwiMjMyPT09XCIgKyB0aGF0LmN1cnJlbnRQYWdlKTtcbiAgICAvL+WIpOaWreaAu+mhteaVsOaYr+WQpuWkp+S6jue/u+mhteaVsFxuICAgIGlmICgodGhhdC5wYWdlX3RvdGFsKSA+IHRoYXQuY3VycmVudFBhZ2UpIHtcbiAgICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XG4gICAgICBpZiAodGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSB0cnVlO1xuICAgICAgdGhhdC5jdXJyZW50UGFnZSsrO1xuICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50VGFiKTtcbiAgICAgIHRoaXMuZ2V0TXlPcmRlckdvb2RzTGlzdCh0aGlzLmN1cnJlbnRQYWdlKTtcbiAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5zaG93TG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxuXG59XG5cbiJdfQ==