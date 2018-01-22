'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _filter_bar = require('./../components/filter_bar.js');

var _filter_bar2 = _interopRequireDefault(_filter_bar);

var _shop_grid_list = require('./../components/shop_grid_list.js');

var _shop_grid_list2 = _interopRequireDefault(_shop_grid_list);

var _bottomLoadMore = require('./../components/common/bottomLoadMore.js');

var _bottomLoadMore2 = _interopRequireDefault(_bottomLoadMore);

var _placeholder = require('./../components/common/placeholder.js');

var _placeholder2 = _interopRequireDefault(_placeholder);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeDetail = function (_wepy$page) {
  _inherits(HomeDetail, _wepy$page);

  function HomeDetail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HomeDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HomeDetail.__proto__ || Object.getPrototypeOf(HomeDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: ''
    }, _this.data = {
      catCode: "",
      cate: {},
      list: [],
      purchasetype: 1,
      is_empty: false,
      //当前页面
      currentPage: 1,
      //总页数
      page_total: 0,
      //是否显示 底部loading
      showLoading: true,
      //防止重复加载
      preventRepeatReuqest: false,
      sort: 1,
      skuval: ""
    }, _this.$repeat = {}, _this.$props = { "filterBar": { "xmlns:v-on": "" }, "shopGridList": { "xmlns:v-bind": "", "v-bind:purchasetype.sync": "purchasetype", "v-bind:list.sync": "list" }, "bottomLoadMore": { "v-bind:show.sync": "showLoading", "message": "正在加载" }, "placeholder": { "v-bind:show.sync": "is_empty", "message": "暂无发现数据" } }, _this.$events = { "filterBar": { "v-on:currentType": "currentType" } }, _this.components = {
      filterBar: _filter_bar2.default,
      shopGridList: _shop_grid_list2.default,
      bottomLoadMore: _bottomLoadMore2.default,
      placeholder: _placeholder2.default
    }, _this.computed = {}, _this.methods = {
      currentType: function currentType(obj) {
        //tip.success("状态:" + obj);
        var name = obj.name;
        var type = obj.type;
        if (name == "zhonghe") {
          this.sort = -1;
        } else if (name == "sale") {
          this.sort = 3;
        } else if (name == "price") {
          if (type == "desc") {
            this.sort = 2;
          } else if (type == "asc") {
            this.sort = 1;
          }
        } else if (name == "sku") {
          this.skuval = type;
        }
        this.list = [];
        this.showLoading = true;
        this.is_empty = false;
        this.getGoodList();
      },

      onShareAppMessage: function onShareAppMessage(res) {
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target);
        }
        return {
          title: this.cate.name,
          path: '/pages/home_detail?code=' + this.catCode,
          success: function success(res) {
            // 转发成功
          },
          fail: function fail(res) {
            // 转发失败
          }
        };
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HomeDetail, [{
    key: 'getGoodList',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(currentPage, size) {
        var that, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                //const json = await api.getGoodsList({

                _context.next = 3;
                return _api2.default.hostGoodsList({
                  query: {
                    page: currentPage || 1,
                    size: size || 10,
                    cateCode: this.catCode,
                    sort: this.sort,
                    skuval: this.skuval
                  }
                });

              case 3:
                json = _context.sent;

                if (json.data.code == 0) {
                  that.cate = json.data.category;
                  wx.setNavigationBarTitle({ title: that.cate.name });
                  that.list = [].concat(_toConsumableArray(that.list), _toConsumableArray(json.data.list));
                  that.page_total = json.data.page_total;
                  if (json.data.page_total == 0) {
                    //暂无数据
                    that.is_empty = true;
                  }
                } else {
                  _tip2.default.error(json.data.msg);
                }
                that.showLoading = false;
                that.$apply();

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getGoodList(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return getGoodList;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      this.cate = {};
      this.list = [];
      this.skuval = "";
      this.catCode = option.code;
      this.is_empty = false;
      //当前页面
      this.currentPage = 1;
      //总页数
      this.page_total = 0;
      //是否显示 底部loading
      this.showLoading = true;
      //防止重复加载
      this.preventRepeatReuqest = false;
      this.sort = 1;
      console.log("id===" + this.catCode);
      //this.list = bb.result.products;
      //this.$apply();
      this.getGoodList();
    }
  }, {
    key: 'onReachBottom',

    //加载更多
    value: function onReachBottom() {
      var that = this;
      that.showLoading = true;
      console.log(that.page_total + "===" + that.currentPage);
      //判断总页数是否大于翻页数
      if (that.page_total > that.currentPage) {
        //防止重复加载
        if (that.preventRepeatReuqest) {
          return true;
        }
        that.preventRepeatReuqest = true;
        that.currentPage++;
        that.getGoodList(that.currentPage);
        that.preventRepeatReuqest = false;
      } else {
        that.showLoading = false;
      }
    }
  }]);

  return HomeDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(HomeDetail , 'pages/home_detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWVfZGV0YWlsLmpzIl0sIm5hbWVzIjpbIkhvbWVEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNhdENvZGUiLCJjYXRlIiwibGlzdCIsInB1cmNoYXNldHlwZSIsImlzX2VtcHR5IiwiY3VycmVudFBhZ2UiLCJwYWdlX3RvdGFsIiwic2hvd0xvYWRpbmciLCJwcmV2ZW50UmVwZWF0UmV1cWVzdCIsInNvcnQiLCJza3V2YWwiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJmaWx0ZXJCYXIiLCJzaG9wR3JpZExpc3QiLCJib3R0b21Mb2FkTW9yZSIsInBsYWNlaG9sZGVyIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiY3VycmVudFR5cGUiLCJvYmoiLCJuYW1lIiwidHlwZSIsImdldEdvb2RMaXN0Iiwib25TaGFyZUFwcE1lc3NhZ2UiLCJyZXMiLCJmcm9tIiwiY29uc29sZSIsImxvZyIsInRhcmdldCIsInRpdGxlIiwicGF0aCIsInN1Y2Nlc3MiLCJmYWlsIiwiZXZlbnRzIiwic2l6ZSIsInRoYXQiLCJob3N0R29vZHNMaXN0IiwicXVlcnkiLCJwYWdlIiwiY2F0ZUNvZGUiLCJqc29uIiwiY29kZSIsImNhdGVnb3J5Iiwid3giLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJlcnJvciIsIm1zZyIsIiRhcHBseSIsIm9wdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxlQUFTLEVBREo7QUFFTEMsWUFBSyxFQUZBO0FBR0xDLFlBQU0sRUFIRDtBQUlMQyxvQkFBYyxDQUpUO0FBS0xDLGdCQUFVLEtBTEw7QUFNTDtBQUNBQyxt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Z0MsS0FBS2pDLFdBQTdCLEVBQTBDO0FBQ3hDO0FBQ0EsWUFBSWlDLEtBQUs5QixvQkFBVCxFQUErQjtBQUM3QixpQkFBTyxJQUFQO0FBQ0Q7QUFDRDhCLGFBQUs5QixvQkFBTCxHQUE0QixJQUE1QjtBQUNBOEIsYUFBS2pDLFdBQUw7QUFDQWlDLGFBQUtiLFdBQUwsQ0FBaUJhLEtBQUtqQyxXQUF0QjtBQUNBaUMsYUFBSzlCLG9CQUFMLEdBQTRCLEtBQTVCO0FBQ0QsT0FURCxNQVNPO0FBQ0w4QixhQUFLL0IsV0FBTCxHQUFtQixLQUFuQjtBQUNEO0FBQ0Y7Ozs7RUFoSnFDLGVBQUtrQyxJOztrQkFBeEI3QyxVIiwiZmlsZSI6ImhvbWVfZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSc7XG5pbXBvcnQgRmlsdGVyQmFyIGZyb20gXCIuLi9jb21wb25lbnRzL2ZpbHRlcl9iYXJcIlxuaW1wb3J0IFNob3BHcmlkTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL3Nob3BfZ3JpZF9saXN0J1xuaW1wb3J0IEJvdHRvbUxvYWRNb3JlIGZyb20gXCIuLi9jb21wb25lbnRzL2NvbW1vbi9ib3R0b21Mb2FkTW9yZVwiXG5pbXBvcnQgUGxhY2Vob2xkZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvY29tbW9uL3BsYWNlaG9sZGVyXCJcbmltcG9ydCB0aXAgZnJvbSAnLi4vdXRpbHMvdGlwJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICcnLFxuICB9XG4gIGRhdGEgPSB7XG4gICAgY2F0Q29kZTogXCJcIixcbiAgICBjYXRlOnt9LFxuICAgIGxpc3Q6IFtdLFxuICAgIHB1cmNoYXNldHlwZTogMSxcbiAgICBpc19lbXB0eTogZmFsc2UsXG4gICAgLy/lvZPliY3pobXpnaJcbiAgICBjdXJyZW50UGFnZTogMSxcbiAgICAvL+aAu+mhteaVsFxuICAgIHBhZ2VfdG90YWw6IDAsXG4gICAgLy/mmK/lkKbmmL7npLog5bqV6YOobG9hZGluZ1xuICAgIHNob3dMb2FkaW5nOiB0cnVlLFxuICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XG4gICAgcHJldmVudFJlcGVhdFJldXFlc3Q6IGZhbHNlLFxuICAgIHNvcnQ6IDEsXG4gICAgc2t1dmFsOiBcIlwiXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImZpbHRlckJhclwiOntcInhtbG5zOnYtb25cIjpcIlwifSxcInNob3BHcmlkTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cHVyY2hhc2V0eXBlLnN5bmNcIjpcInB1cmNoYXNldHlwZVwiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwibGlzdFwifSxcImJvdHRvbUxvYWRNb3JlXCI6e1widi1iaW5kOnNob3cuc3luY1wiOlwic2hvd0xvYWRpbmdcIixcIm1lc3NhZ2VcIjpcIuato+WcqOWKoOi9vVwifSxcInBsYWNlaG9sZGVyXCI6e1widi1iaW5kOnNob3cuc3luY1wiOlwiaXNfZW1wdHlcIixcIm1lc3NhZ2VcIjpcIuaaguaXoOWPkeeOsOaVsOaNrlwifX07XHJcbiRldmVudHMgPSB7XCJmaWx0ZXJCYXJcIjp7XCJ2LW9uOmN1cnJlbnRUeXBlXCI6XCJjdXJyZW50VHlwZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIGZpbHRlckJhcjogRmlsdGVyQmFyLFxuICAgIHNob3BHcmlkTGlzdDogU2hvcEdyaWRMaXN0LFxuICAgIGJvdHRvbUxvYWRNb3JlOiBCb3R0b21Mb2FkTW9yZSxcbiAgICBwbGFjZWhvbGRlcjogUGxhY2Vob2xkZXJcbiAgfVxuXG4gIGFzeW5jIGdldEdvb2RMaXN0KGN1cnJlbnRQYWdlLCBzaXplKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIC8vY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRHb29kc0xpc3Qoe1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuaG9zdEdvb2RzTGlzdCh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSB8fCAxLFxuICAgICAgICBzaXplOiBzaXplIHx8IDEwLFxuICAgICAgICBjYXRlQ29kZTogdGhpcy5jYXRDb2RlLFxuICAgICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICAgIHNrdXZhbDogdGhpcy5za3V2YWxcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgdGhhdC5jYXRlID0ganNvbi5kYXRhLmNhdGVnb3J5O1xuICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHsgIHRpdGxlOiB0aGF0LmNhdGUubmFtZX0pXG4gICAgICB0aGF0Lmxpc3QgPSBbLi4udGhhdC5saXN0LCAuLi5qc29uLmRhdGEubGlzdF07XG4gICAgICB0aGF0LnBhZ2VfdG90YWwgPSBqc29uLmRhdGEucGFnZV90b3RhbDtcbiAgICAgIGlmIChqc29uLmRhdGEucGFnZV90b3RhbCA9PSAwKSB7XG4gICAgICAgIC8v5pqC5peg5pWw5o2uXG4gICAgICAgIHRoYXQuaXNfZW1wdHkgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLm1zZyk7XG4gICAgfVxuICAgIHRoYXQuc2hvd0xvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGF0LiRhcHBseSgpO1xuICB9XG5cbiAgb25Mb2FkKG9wdGlvbikge1xuICAgIHRoaXMuY2F0ZT17fTtcbiAgICB0aGlzLmxpc3QgPSBbXTtcbiAgICB0aGlzLnNrdXZhbCA9IFwiXCI7XG4gICAgdGhpcy5jYXRDb2RlID0gb3B0aW9uLmNvZGU7XG4gICAgdGhpcy5pc19lbXB0eSA9IGZhbHNlO1xuICAgIC8v5b2T5YmN6aG16Z2iXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IDE7XG4gICAgLy/mgLvpobXmlbBcbiAgICB0aGlzLnBhZ2VfdG90YWwgPSAwO1xuICAgIC8v5piv5ZCm5pi+56S6IOW6lemDqGxvYWRpbmdcbiAgICB0aGlzLnNob3dMb2FkaW5nID0gdHJ1ZTtcbiAgICAvL+mYsuatoumHjeWkjeWKoOi9vVxuICAgIHRoaXMucHJldmVudFJlcGVhdFJldXFlc3QgPSBmYWxzZTtcbiAgICB0aGlzLnNvcnQgPSAxO1xuICAgIGNvbnNvbGUubG9nKFwiaWQ9PT1cIit0aGlzLmNhdENvZGUpO1xuICAgIC8vdGhpcy5saXN0ID0gYmIucmVzdWx0LnByb2R1Y3RzO1xuICAgIC8vdGhpcy4kYXBwbHkoKTtcbiAgICB0aGlzLmdldEdvb2RMaXN0KCk7XG4gIH1cbiAgY29tcHV0ZWQgPSB7XG5cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGN1cnJlbnRUeXBlKG9iaikge1xuICAgICAgLy90aXAuc3VjY2VzcyhcIueKtuaAgTpcIiArIG9iaik7XG4gICAgICB2YXIgbmFtZSA9IG9iai5uYW1lO1xuICAgICAgdmFyIHR5cGUgPSBvYmoudHlwZTtcbiAgICAgIGlmIChuYW1lPT1cInpob25naGVcIikge1xuICAgICAgICB0aGlzLnNvcnQgPSAtMTtcbiAgICAgIH0gZWxzZSBpZiAobmFtZT09XCJzYWxlXCIpIHtcbiAgICAgICAgdGhpcy5zb3J0ID0gMztcbiAgICAgIH0gZWxzZSBpZiAobmFtZT09XCJwcmljZVwiKSB7XG4gICAgICAgIGlmICh0eXBlPT1cImRlc2NcIikge1xuICAgICAgICAgIHRoaXMuc29ydCA9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZT09XCJhc2NcIikge1xuICAgICAgICAgIHRoaXMuc29ydCA9IDE7XG4gICAgICAgIH1cbiAgICAgIH1lbHNlIGlmIChuYW1lID09IFwic2t1XCIpIHtcbiAgICAgICAgdGhpcy5za3V2YWwgPSB0eXBlO1xuICAgICAgfVxuICAgICAgdGhpcy5saXN0ID0gW107XG4gICAgICB0aGlzLnNob3dMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNfZW1wdHkgPSBmYWxzZTtcbiAgICAgIHRoaXMuZ2V0R29vZExpc3QoKTtcbiAgICB9LFxuICAgIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICBpZiAocmVzLmZyb20gPT09ICdidXR0b24nKSB7XG4gICAgICAgIC8vIOadpeiHqumhtemdouWGhei9rOWPkeaMiemSrlxuICAgICAgICBjb25zb2xlLmxvZyhyZXMudGFyZ2V0KVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6IHRoaXMuY2F0ZS5uYW1lLFxuICAgICAgICBwYXRoOiAnL3BhZ2VzL2hvbWVfZGV0YWlsP2NvZGU9Jyt0aGlzLmNhdENvZGUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAvLyDovazlj5HlpLHotKVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGV2ZW50cyA9IHtcblxuICB9XG4gIC8v5Yqg6L295pu05aSaXG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHRoYXQuc2hvd0xvYWRpbmcgPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKHRoYXQucGFnZV90b3RhbCArIFwiPT09XCIgKyB0aGF0LmN1cnJlbnRQYWdlKTtcbiAgICAvL+WIpOaWreaAu+mhteaVsOaYr+WQpuWkp+S6jue/u+mhteaVsFxuICAgIGlmICgodGhhdC5wYWdlX3RvdGFsKSA+IHRoYXQuY3VycmVudFBhZ2UpIHtcbiAgICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XG4gICAgICBpZiAodGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSB0cnVlO1xuICAgICAgdGhhdC5jdXJyZW50UGFnZSsrO1xuICAgICAgdGhhdC5nZXRHb29kTGlzdCh0aGF0LmN1cnJlbnRQYWdlKTtcbiAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5zaG93TG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfTtcbn1cblxuIl19