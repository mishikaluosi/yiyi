'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _tab = require('./../components/tab.js');

var _tab2 = _interopRequireDefault(_tab);

var _collection_list = require('./../components/collection_list.js');

var _collection_list2 = _interopRequireDefault(_collection_list);

var _bottomLoadMore = require('./../components/common/bottomLoadMore.js');

var _bottomLoadMore2 = _interopRequireDefault(_bottomLoadMore);

var _constant = require('./../utils/constant.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PointsRules = function (_wepy$page) {
  _inherits(PointsRules, _wepy$page);

  function PointsRules() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PointsRules);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PointsRules.__proto__ || Object.getPrototypeOf(PointsRules)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: ""
    }, _this.$repeat = {}, _this.$props = { "tab": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:currentTab.sync": "currentTab", "v-bind:tabList.sync": "tabList" }, "collectionList": { "v-bind:list.sync": "favorlist", "xmlns:wx": "" } }, _this.$events = { "tab": { "v-on:currentTab": "getCurrentTab" } }, _this.components = {
      tab: _tab2.default,
      collectionList: _collection_list2.default,
      bottomLoadMore: _bottomLoadMore2.default
    }, _this.data = {
      browselist: [],
      favorlist: [],
      tabList: ["我的足迹", "我的收藏"],
      currentTab: 0,
      winHeight: 0,
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
        this.currentPage = 1;
        this.page_total = 0;
        var that = this;
        that.currentTab = cur;
        that.setTitle(cur);
        console.log("cur");
        console.log(cur);
        if (cur == 1) {
          that.getUserFavorite();
          that.favorlist = {};
        } else {
          that.getUserBrowse();
          that.browselist = {};
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
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PointsRules, [{
    key: 'getUserBrowse',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(currentPage, size) {
        var that, userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // console.log("足迹");
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;

                console.log("==========调用aip=======");
                _context.next = 6;
                return _api2.default.browseInfo({
                  query: {
                    openId: openId,
                    page: currentPage || 1,
                    size: size || 10
                  }
                });

              case 6:
                json = _context.sent;

                if (json.data.code == 0) {
                  that.browselist = [].concat(_toConsumableArray(that.browselist), _toConsumableArray(json.data.list));
                  that.page_total = json.data.page_total;
                  console.log("that.browselist");
                  console.log(that.browselist);
                  that.$apply();
                  that.$invoke('collectionList', 'refreshList', that.browselist);
                } else {
                  tip.error(json.data.msg);
                }
                that.showLoading = false;

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getUserBrowse(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return getUserBrowse;
    }()
  }, {
    key: 'getUserFavorite',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(currentPage, size) {
        var that, userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context2.next = 5;
                return _api2.default.favoriteInfo({
                  query: {
                    openId: openId,
                    page: currentPage || 1,
                    size: size || 10
                  }
                });

              case 5:
                json = _context2.sent;


                if (json.data.code == 0) {

                  that.favorlist = [].concat(_toConsumableArray(that.favorlist), _toConsumableArray(json.data.list));
                  that.page_total = json.data.page_total;
                  console.log("==========反正數據=======");
                  console.log(that.favorlist);
                  // console.log((json.data);
                  that.$invoke('collectionList', 'refreshList', that.favorlist);
                  that.$apply();
                } else {
                  tip.error(json.data.msg);
                }
                that.showLoading = false;

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getUserFavorite(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return getUserFavorite;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad(opts) {
      var that = this;
      var title = "";
      that.browselist = {};
      that.favorlist = {};
      that.list = bb.result.products;
      //opts.type 0：我的足迹 ，1：我的收藏
      that.currentTab = opts.type;
      if (opts.type == 0) {
        that.getUserBrowse();
      } else {
        console.log("调用收藏");
        that.getUserFavorite();
      }
      //动态设置标题
      that.setTitle(opts.type);

      //设置滚动高度
      var systemInfo = _wepy2.default.getStorageSync(_constant.SYSTEM_INFO);
      that.winHeight = systemInfo.windowHeight;
      that.$apply();
    }
  }, {
    key: 'setTitle',
    value: function setTitle(cur) {
      _wepy2.default.setNavigationBarTitle({
        title: this.tabList[cur]
      });
    }
  }, {
    key: 'onReachBottom',


    //加载更多
    value: function onReachBottom() {
      console.log("加载更多");
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
        console.log(this.currentTab);
        if (this.currentTab == 0) {
          console.log("下拉收藏");
          that.getUserBrowse(that.currentPage);
        } else {
          that.getUserFavorite(that.currentPage);
        }
        that.preventRepeatReuqest = false;
      } else {
        that.showLoading = false;
      }
    }
  }]);

  return PointsRules;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PointsRules , 'pages/collection'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3Rpb24uanMiXSwibmFtZXMiOlsiUG9pbnRzUnVsZXMiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidGFiIiwiY29sbGVjdGlvbkxpc3QiLCJib3R0b21Mb2FkTW9yZSIsImRhdGEiLCJicm93c2VsaXN0IiwiZmF2b3JsaXN0IiwidGFiTGlzdCIsImN1cnJlbnRUYWIiLCJ3aW5IZWlnaHQiLCJjdXJyZW50UGFnZSIsInBhZ2VfdG90YWwiLCJzaG93TG9hZGluZyIsInByZXZlbnRSZXBlYXRSZXVxZXN0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ2V0Q3VycmVudFRhYiIsImN1ciIsImV2dCIsInRoYXQiLCJzZXRUaXRsZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRVc2VyRmF2b3JpdGUiLCJnZXRVc2VyQnJvd3NlIiwiJGFwcGx5IiwiYmluZENoYW5nZSIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiZGV0YWlsY3VycmVudCIsImV2ZW50cyIsInNpemUiLCJ1c2VyU3BlY2lhbEluZm8iLCJnZXRTdG9yYWdlU3luYyIsIm9wZW5JZCIsIm9wZW5pZCIsImJyb3dzZUluZm8iLCJxdWVyeSIsInBhZ2UiLCJqc29uIiwiY29kZSIsImxpc3QiLCIkaW52b2tlIiwidGlwIiwiZXJyb3IiLCJtc2ciLCJmYXZvcml0ZUluZm8iLCJvcHRzIiwidGl0bGUiLCJiYiIsInJlc3VsdCIsInByb2R1Y3RzIiwidHlwZSIsInN5c3RlbUluZm8iLCJ3aW5kb3dIZWlnaHQiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0Y7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFLcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLE9BQU0sRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMsMEJBQXlCLFlBQTVELEVBQXlFLHVCQUFzQixTQUEvRixFQUFQLEVBQWlILGtCQUFpQixFQUFDLG9CQUFtQixXQUFwQixFQUFnQyxZQUFXLEVBQTNDLEVBQWxJLEUsUUFDVEMsTyxHQUFVLEVBQUMsT0FBTSxFQUFDLG1CQUFrQixlQUFuQixFQUFQLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLHdCQURVO0FBRVZDLCtDQUZVO0FBR1ZDO0FBSFUsSyxRQU1aQyxJLEdBQU87QUFDTEMsa0JBQVksRUFEUDtBQUVMQyxpQkFBVSxFQUZMO0FBR0xDLGVBQVMsQ0FBQyxNQUFELEVBQVMsTUFBVCxDQUhKO0FBSUxDLGtCQUFZLENBSlA7QUFLTEMsaUJBQVcsQ0FMTjtBQU1MO0FBQ0FDLG1CQUFhLENBUFI7QUFRTDtBQUNBQyxrQkFBWSxDQVRQO0FBVUw7QUFDQUMsbUJBQWEsSUFYUjtBQVlMO0FBQ0FDLDRCQUFzQjtBQWJqQixLLFFBNkZQQyxRLEdBQVcsRSxRQUdYQyxPLEdBQVU7QUFDUkMsbUJBRFEseUJBQ01DLEdBRE4sRUFDV0MsR0FEWCxFQUNnQjtBQUN0QixhQUFLUixXQUFMLEdBQW1CLENBQW5CO0FBQ0EsYUFBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFlBQUlRLE9BQU8sSUFBWDtBQUNBQSxhQUFLWCxVQUFMLEdBQWtCUyxHQUFsQjtBQUNBRSxhQUFLQyxRQUFMLENBQWNILEdBQWQ7QUFDQUksZ0JBQVFDLEdBQVIsQ0FBWSxLQUFaO0FBQ0FELGdCQUFRQyxHQUFSLENBQVlMLEdBQVo7QUFDQSxZQUFJQSxPQUFLLENBQVQsRUFBWTtBQUNWRSxlQUFLSSxlQUFMO0FBQ0FKLGVBQUtiLFNBQUwsR0FBZSxFQUFmO0FBQ0QsU0FIRCxNQUdPO0FBQ0xhLGVBQUtLLGFBQUw7QUFDQUwsZUFBS2QsVUFBTCxHQUFnQixFQUFoQjtBQUNEO0FBQ0RjLGFBQUtNLE1BQUw7QUFDRCxPQWpCTzs7QUFrQlI7OztBQUdBQyxnQkFyQlEsc0JBcUJHQyxDQXJCSCxFQXFCTTs7QUFFWixZQUFJUixPQUFPLElBQVg7QUFDQUEsYUFBS1gsVUFBTCxHQUFrQm1CLEVBQUVDLE1BQUYsQ0FBU0MsT0FBM0I7QUFDQVIsZ0JBQVFDLEdBQVIsQ0FBWSxtQkFBaUJLLEVBQUVHLGFBQS9CO0FBQ0FYLGFBQUtNLE1BQUw7QUFDRDtBQTNCTyxLLFFBa0NWTSxNLEdBQVMsRTs7Ozs7OzJGQWxIV3JCLFcsRUFBYXNCLEk7Ozs7OztBQUMvQjtBQUNJYixvQixHQUFPLEk7QUFDUGMsK0IsR0FBa0IsZUFBS0MsY0FBTCxrQ0FBMkMsRTtBQUM3REMsc0IsR0FBU0YsZ0JBQWdCRyxNOztBQUM3QmYsd0JBQVFDLEdBQVIsQ0FBWSx3QkFBWjs7dUJBQ21CLGNBQUllLFVBQUosQ0FBZTtBQUNoQ0MseUJBQU87QUFDTEgsNEJBQVFBLE1BREg7QUFFTEksMEJBQU03QixlQUFlLENBRmhCO0FBR0xzQiwwQkFBTUEsUUFBUTtBQUhUO0FBRHlCLGlCQUFmLEM7OztBQUFiUSxvQjs7QUFPTixvQkFBSUEsS0FBS3BDLElBQUwsQ0FBVXFDLElBQVYsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDdkJ0Qix1QkFBS2QsVUFBTCxnQ0FBc0JjLEtBQUtkLFVBQTNCLHNCQUEwQ21DLEtBQUtwQyxJQUFMLENBQVVzQyxJQUFwRDtBQUNBdkIsdUJBQUtSLFVBQUwsR0FBa0I2QixLQUFLcEMsSUFBTCxDQUFVTyxVQUE1QjtBQUNBVSwwQkFBUUMsR0FBUixDQUFZLGlCQUFaO0FBQ0FELDBCQUFRQyxHQUFSLENBQVlILEtBQUtkLFVBQWpCO0FBQ0FjLHVCQUFLTSxNQUFMO0FBQ0FOLHVCQUFLd0IsT0FBTCxDQUFhLGdCQUFiLEVBQStCLGFBQS9CLEVBQThDeEIsS0FBS2QsVUFBbkQ7QUFDRCxpQkFQRCxNQU9PO0FBQ0x1QyxzQkFBSUMsS0FBSixDQUFVTCxLQUFLcEMsSUFBTCxDQUFVMEMsR0FBcEI7QUFDRDtBQUNEM0IscUJBQUtQLFdBQUwsR0FBbUIsS0FBbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEZBR29CRixXLEVBQWFzQixJOzs7Ozs7QUFDN0JiLG9CLEdBQU8sSTtBQUNQYywrQixHQUFrQixlQUFLQyxjQUFMLGtDQUEyQyxFO0FBQzdEQyxzQixHQUFTRixnQkFBZ0JHLE07O3VCQUNWLGNBQUlXLFlBQUosQ0FBaUI7QUFDbENULHlCQUFPO0FBQ0xILDRCQUFRQSxNQURIO0FBRUxJLDBCQUFNN0IsZUFBZSxDQUZoQjtBQUdMc0IsMEJBQU1BLFFBQVE7QUFIVDtBQUQyQixpQkFBakIsQzs7O0FBQWJRLG9COzs7QUFRTixvQkFBSUEsS0FBS3BDLElBQUwsQ0FBVXFDLElBQVYsSUFBa0IsQ0FBdEIsRUFBeUI7O0FBRXZCdEIsdUJBQUtiLFNBQUwsZ0NBQXFCYSxLQUFLYixTQUExQixzQkFBd0NrQyxLQUFLcEMsSUFBTCxDQUFVc0MsSUFBbEQ7QUFDQXZCLHVCQUFLUixVQUFMLEdBQWtCNkIsS0FBS3BDLElBQUwsQ0FBVU8sVUFBNUI7QUFDQVUsMEJBQVFDLEdBQVIsQ0FBWSx1QkFBWjtBQUNBRCwwQkFBUUMsR0FBUixDQUFZSCxLQUFLYixTQUFqQjtBQUNBO0FBQ0FhLHVCQUFLd0IsT0FBTCxDQUFhLGdCQUFiLEVBQStCLGFBQS9CLEVBQThDeEIsS0FBS2IsU0FBbkQ7QUFDQWEsdUJBQUtNLE1BQUw7QUFDRCxpQkFURCxNQVNPO0FBQ0xtQixzQkFBSUMsS0FBSixDQUFVTCxLQUFLcEMsSUFBTCxDQUFVMEMsR0FBcEI7QUFDRDtBQUNEM0IscUJBQUtQLFdBQUwsR0FBbUIsS0FBbkI7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkFJS29DLEksRUFBTTtBQUNYLFVBQUk3QixPQUFPLElBQVg7QUFDQSxVQUFJOEIsUUFBUSxFQUFaO0FBQ0E5QixXQUFLZCxVQUFMLEdBQWdCLEVBQWhCO0FBQ0FjLFdBQUtiLFNBQUwsR0FBZSxFQUFmO0FBQ0FhLFdBQUt1QixJQUFMLEdBQVlRLEdBQUdDLE1BQUgsQ0FBVUMsUUFBdEI7QUFDQTtBQUNBakMsV0FBS1gsVUFBTCxHQUFrQndDLEtBQUtLLElBQXZCO0FBQ0EsVUFBR0wsS0FBS0ssSUFBTCxJQUFXLENBQWQsRUFBZ0I7QUFDZGxDLGFBQUtLLGFBQUw7QUFDRCxPQUZELE1BRUs7QUFDSEgsZ0JBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0FILGFBQUtJLGVBQUw7QUFDRDtBQUNEO0FBQ0FKLFdBQUtDLFFBQUwsQ0FBYzRCLEtBQUtLLElBQW5COztBQUVBO0FBQ0EsVUFBSUMsYUFBYSxlQUFLcEIsY0FBTCx1QkFBakI7QUFDQWYsV0FBS1YsU0FBTCxHQUFpQjZDLFdBQVdDLFlBQTVCO0FBQ0FwQyxXQUFLTSxNQUFMO0FBRUQ7Ozs2QkFpQ1FSLEcsRUFBSztBQUNaLHFCQUFLdUMscUJBQUwsQ0FBMkI7QUFDekJQLGVBQU8sS0FBSzFDLE9BQUwsQ0FBYVUsR0FBYjtBQURrQixPQUEzQjtBQUdEOzs7OztBQUtEO29DQUNnQjtBQUNkSSxjQUFRQyxHQUFSLENBQVksTUFBWjtBQUNBLFVBQUlILE9BQU8sSUFBWDtBQUNBQSxXQUFLUCxXQUFMLEdBQW1CLElBQW5CO0FBQ0FTLGNBQVFDLEdBQVIsQ0FBWUgsS0FBS1IsVUFBTCxHQUFrQixLQUFsQixHQUEwQlEsS0FBS1QsV0FBM0M7QUFDQTtBQUNBLFVBQUtTLEtBQUtSLFVBQU4sR0FBb0JRLEtBQUtULFdBQTdCLEVBQTBDO0FBQ3hDO0FBQ0EsWUFBSVMsS0FBS04sb0JBQVQsRUFBK0I7QUFDN0IsaUJBQU8sSUFBUDtBQUNEO0FBQ0RNLGFBQUtOLG9CQUFMLEdBQTRCLElBQTVCO0FBQ0FNLGFBQUtULFdBQUw7QUFDQVcsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLZCxVQUFqQjtBQUNBLFlBQUksS0FBS0EsVUFBTCxJQUFpQixDQUFyQixFQUF3QjtBQUN0QmEsa0JBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0FILGVBQUtLLGFBQUwsQ0FBbUJMLEtBQUtULFdBQXhCO0FBQ0QsU0FIRCxNQUdPO0FBQ0xTLGVBQUtJLGVBQUwsQ0FBcUJKLEtBQUtULFdBQTFCO0FBQ0Q7QUFDRFMsYUFBS04sb0JBQUwsR0FBNEIsS0FBNUI7QUFDRCxPQWZELE1BZU87QUFDTE0sYUFBS1AsV0FBTCxHQUFtQixLQUFuQjtBQUNEO0FBQ0Y7Ozs7RUE1S3NDLGVBQUsyQixJOztrQkFBekI3QyxXIiwiZmlsZSI6ImNvbGxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaS9hcGknO1xuaW1wb3J0IFRhYiBmcm9tICcuLi9jb21wb25lbnRzL3RhYidcbmltcG9ydCBDb2xsZWN0aW9uTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL2NvbGxlY3Rpb25fbGlzdCdcbmltcG9ydCBCb3R0b21Mb2FkTW9yZSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb21tb24vYm90dG9tTG9hZE1vcmVcIlxuaW1wb3J0IHtcbiAgU1lTVEVNX0lORk8sXG4gIFVTRVJfU1BFQ0lDQUxfSU5GT1xufSBmcm9tICcuLi91dGlscy9jb25zdGFudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50c1J1bGVzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwiXCIsXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYlwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpjdXJyZW50VGFiLnN5bmNcIjpcImN1cnJlbnRUYWJcIixcInYtYmluZDp0YWJMaXN0LnN5bmNcIjpcInRhYkxpc3RcIn0sXCJjb2xsZWN0aW9uTGlzdFwiOntcInYtYmluZDpsaXN0LnN5bmNcIjpcImZhdm9ybGlzdFwiLFwieG1sbnM6d3hcIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJ0YWJcIjp7XCJ2LW9uOmN1cnJlbnRUYWJcIjpcImdldEN1cnJlbnRUYWJcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICB0YWI6IFRhYixcbiAgICBjb2xsZWN0aW9uTGlzdDogQ29sbGVjdGlvbkxpc3QsXG4gICAgYm90dG9tTG9hZE1vcmU6IEJvdHRvbUxvYWRNb3JlXG4gIH1cblxuICBkYXRhID0ge1xuICAgIGJyb3dzZWxpc3Q6IFtdLFxuICAgIGZhdm9ybGlzdDpbXSxcbiAgICB0YWJMaXN0OiBbXCLmiJHnmoTotrPov7lcIiwgXCLmiJHnmoTmlLbol49cIl0sXG4gICAgY3VycmVudFRhYjogMCxcbiAgICB3aW5IZWlnaHQ6IDAsXG4gICAgLy/lvZPliY3pobXpnaJcbiAgICBjdXJyZW50UGFnZTogMSxcbiAgICAvL+aAu+mhteaVsFxuICAgIHBhZ2VfdG90YWw6IDAsXG4gICAgLy/mmK/lkKbmmL7npLog5bqV6YOobG9hZGluZ1xuICAgIHNob3dMb2FkaW5nOiB0cnVlLFxuICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XG4gICAgcHJldmVudFJlcGVhdFJldXFlc3Q6IGZhbHNlXG4gIH1cblxuICBhc3luYyBnZXRVc2VyQnJvd3NlKGN1cnJlbnRQYWdlLCBzaXplKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCLotrPov7lcIik7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgbGV0IG9wZW5JZCA9IHVzZXJTcGVjaWFsSW5mby5vcGVuaWQ7XG4gICAgY29uc29sZS5sb2coXCI9PT09PT09PT096LCD55SoYWlwPT09PT09PVwiKTtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmJyb3dzZUluZm8oe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlIHx8IDEsXG4gICAgICAgIHNpemU6IHNpemUgfHwgMTBcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgdGhhdC5icm93c2VsaXN0ID0gWy4uLnRoYXQuYnJvd3NlbGlzdCwgLi4uanNvbi5kYXRhLmxpc3RdO1xuICAgICAgdGhhdC5wYWdlX3RvdGFsID0ganNvbi5kYXRhLnBhZ2VfdG90YWw7XG4gICAgICBjb25zb2xlLmxvZyhcInRoYXQuYnJvd3NlbGlzdFwiKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoYXQuYnJvd3NlbGlzdCk7XG4gICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgdGhhdC4kaW52b2tlKCdjb2xsZWN0aW9uTGlzdCcsICdyZWZyZXNoTGlzdCcsIHRoYXQuYnJvd3NlbGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKVxuICAgIH1cbiAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XG4gIH1cblxuICBhc3luYyBnZXRVc2VyRmF2b3JpdGUoY3VycmVudFBhZ2UsIHNpemUpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmZhdm9yaXRlSW5mbyh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBvcGVuSWQ6IG9wZW5JZCxcbiAgICAgICAgcGFnZTogY3VycmVudFBhZ2UgfHwgMSxcbiAgICAgICAgc2l6ZTogc2l6ZSB8fCAxMFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcblxuICAgICAgdGhhdC5mYXZvcmxpc3QgPSBbLi4udGhhdC5mYXZvcmxpc3QsIC4uLmpzb24uZGF0YS5saXN0XTtcbiAgICAgIHRoYXQucGFnZV90b3RhbCA9IGpzb24uZGF0YS5wYWdlX3RvdGFsO1xuICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT095Y+N5q2j5pW45pOaPT09PT09PVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoYXQuZmF2b3JsaXN0KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKChqc29uLmRhdGEpO1xuICAgICAgdGhhdC4kaW52b2tlKCdjb2xsZWN0aW9uTGlzdCcsICdyZWZyZXNoTGlzdCcsIHRoYXQuZmF2b3JsaXN0KTtcbiAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKVxuICAgIH1cbiAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XG4gIH1cblxuXG4gIG9uTG9hZChvcHRzKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCB0aXRsZSA9IFwiXCI7XG4gICAgdGhhdC5icm93c2VsaXN0PXt9O1xuICAgIHRoYXQuZmF2b3JsaXN0PXt9O1xuICAgIHRoYXQubGlzdCA9IGJiLnJlc3VsdC5wcm9kdWN0cztcbiAgICAvL29wdHMudHlwZSAw77ya5oiR55qE6Laz6L+5IO+8jDHvvJrmiJHnmoTmlLbol49cbiAgICB0aGF0LmN1cnJlbnRUYWIgPSBvcHRzLnR5cGU7XG4gICAgaWYob3B0cy50eXBlPT0wKXtcbiAgICAgIHRoYXQuZ2V0VXNlckJyb3dzZSgpO1xuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5sb2coXCLosIPnlKjmlLbol49cIilcbiAgICAgIHRoYXQuZ2V0VXNlckZhdm9yaXRlKCk7XG4gICAgfVxuICAgIC8v5Yqo5oCB6K6+572u5qCH6aKYXG4gICAgdGhhdC5zZXRUaXRsZShvcHRzLnR5cGUpO1xuXG4gICAgLy/orr7nva7mu5rliqjpq5jluqZcbiAgICBsZXQgc3lzdGVtSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoU1lTVEVNX0lORk8pO1xuICAgIHRoYXQud2luSGVpZ2h0ID0gc3lzdGVtSW5mby53aW5kb3dIZWlnaHQ7XG4gICAgdGhhdC4kYXBwbHkoKTtcblxuICB9XG4gIGNvbXB1dGVkID0ge1xuXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBnZXRDdXJyZW50VGFiKGN1ciwgZXZ0KSB7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMTtcbiAgICAgIHRoaXMucGFnZV90b3RhbCA9IDA7XG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmN1cnJlbnRUYWIgPSBjdXI7XG4gICAgICB0aGF0LnNldFRpdGxlKGN1cilcbiAgICAgIGNvbnNvbGUubG9nKFwiY3VyXCIpO1xuICAgICAgY29uc29sZS5sb2coY3VyKTtcbiAgICAgIGlmIChjdXI9PTEpIHtcbiAgICAgICAgdGhhdC5nZXRVc2VyRmF2b3JpdGUoKTtcbiAgICAgICAgdGhhdC5mYXZvcmxpc3Q9e307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LmdldFVzZXJCcm93c2UoKTtcbiAgICAgICAgdGhhdC5icm93c2VsaXN0PXt9O1xuICAgICAgfVxuICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOa7keWKqOWIh+aNonRhYlxuICAgICAqL1xuICAgIGJpbmRDaGFuZ2UoZSkge1xuXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmN1cnJlbnRUYWIgPSBlLmRldGFpbC5jdXJyZW50O1xuICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2UgdGFiLi4uLlwiK2UuZGV0YWlsY3VycmVudCk7XG4gICAgICB0aGF0LiRhcHBseSgpO1xuICAgIH0sXG4gIH1cbiAgc2V0VGl0bGUoY3VyKSB7XG4gICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IHRoaXMudGFiTGlzdFtjdXJdXG4gICAgfSlcbiAgfVxuICBldmVudHMgPSB7XG5cbiAgfVxuXG4gIC8v5Yqg6L295pu05aSaXG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgY29uc29sZS5sb2coXCLliqDovb3mm7TlpJpcIik7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHRoYXQuc2hvd0xvYWRpbmcgPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKHRoYXQucGFnZV90b3RhbCArIFwiPT09XCIgKyB0aGF0LmN1cnJlbnRQYWdlKTtcbiAgICAvL+WIpOaWreaAu+mhteaVsOaYr+WQpuWkp+S6jue/u+mhteaVsFxuICAgIGlmICgodGhhdC5wYWdlX3RvdGFsKSA+IHRoYXQuY3VycmVudFBhZ2UpIHtcbiAgICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XG4gICAgICBpZiAodGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSB0cnVlO1xuICAgICAgdGhhdC5jdXJyZW50UGFnZSsrO1xuICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50VGFiKTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRUYWI9PTApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCLkuIvmi4nmlLbol49cIik7XG4gICAgICAgIHRoYXQuZ2V0VXNlckJyb3dzZSh0aGF0LmN1cnJlbnRQYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoYXQuZ2V0VXNlckZhdm9yaXRlKHRoYXQuY3VycmVudFBhZ2UpO1xuICAgICAgfVxuICAgICAgdGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuXG4iXX0=