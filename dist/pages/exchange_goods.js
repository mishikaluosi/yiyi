'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _shop_grid_list = require('./../components/shop_grid_list.js');

var _shop_grid_list2 = _interopRequireDefault(_shop_grid_list);

var _constant = require('./../utils/constant.js');

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _bottomLoadMore = require('./../components/common/bottomLoadMore.js');

var _bottomLoadMore2 = _interopRequireDefault(_bottomLoadMore);

var _placeholder = require('./../components/common/placeholder.js');

var _placeholder2 = _interopRequireDefault(_placeholder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var exchangeGoods = function (_wepy$page) {
  _inherits(exchangeGoods, _wepy$page);

  function exchangeGoods() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, exchangeGoods);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = exchangeGoods.__proto__ || Object.getPrototypeOf(exchangeGoods)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '换货专区'
    }, _this.$repeat = {}, _this.$props = { "shopGridList": { "xmlns:v-bind": "", "v-bind:purchasetype.sync": "purchasetype", "v-bind:special.sync": "special", "v-bind:list.sync": "list" }, "bottomLoadMore": { "xmlns:v-bind": "", "v-bind:show.sync": "showLoading", "message": "正在加载" }, "placeholder": { "xmlns:v-bind": "", "v-bind:show.sync": "is_empty", "message": "暂无发现数据" } }, _this.$events = {}, _this.components = {
      shopGridList: _shop_grid_list2.default,
      bottomLoadMore: _bottomLoadMore2.default,
      placeholder: _placeholder2.default
    }, _this.data = {
      list: [],
      purchasetype: 1,
      special: 1, ////0-正常入库;1-特价专区和换货专区
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
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(exchangeGoods, [{
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
                    size: size || 10,
                    openId: openId,
                    type: 'refund'
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
      this.list = [];
      this.getMyOrderGoodsList();
      /*that.list = bb.result.products;
      console.log(bb.result.products)*/
    }
  }]);

  return exchangeGoods;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(exchangeGoods , 'pages/exchange_goods'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4Y2hhbmdlX2dvb2RzLmpzIl0sIm5hbWVzIjpbImV4Y2hhbmdlR29vZHMiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic2hvcEdyaWRMaXN0IiwiYm90dG9tTG9hZE1vcmUiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJsaXN0IiwicHVyY2hhc2V0eXBlIiwic3BlY2lhbCIsImlzX2VtcHR5IiwiY3VycmVudFBhZ2UiLCJwYWdlX3RvdGFsIiwic2hvd0xvYWRpbmciLCJwcmV2ZW50UmVwZWF0UmV1cWVzdCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsInNpemUiLCJ1c2VyU3BlY2lhbEluZm8iLCJnZXRTdG9yYWdlU3luYyIsIm9wZW5JZCIsIm9wZW5pZCIsImdvb2RzVXNlck9yZGVyTGlzdCIsInF1ZXJ5IiwicGFnZSIsInR5cGUiLCJqc29uIiwiY29kZSIsImVycm9yIiwibXNnIiwiJGFwcGx5IiwiZ2V0TXlPcmRlckdvb2RzTGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxhOzs7Ozs7Ozs7Ozs7OztvTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxnQkFBZSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLDRCQUEyQixjQUE5QyxFQUE2RCx1QkFBc0IsU0FBbkYsRUFBNkYsb0JBQW1CLE1BQWhILEVBQWhCLEVBQXdJLGtCQUFpQixFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLG9CQUFtQixhQUF0QyxFQUFvRCxXQUFVLE1BQTlELEVBQXpKLEVBQStOLGVBQWMsRUFBQyxnQkFBZSxFQUFoQixFQUFtQixvQkFBbUIsVUFBdEMsRUFBaUQsV0FBVSxRQUEzRCxFQUE3TyxFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyw0Q0FEVTtBQUVWQyw4Q0FGVTtBQUdWQztBQUhVLEssUUFLWkMsSSxHQUFPO0FBQ0xDLFlBQU0sRUFERDtBQUVMQyxvQkFBYyxDQUZUO0FBR0xDLGVBQVEsQ0FISCxFQUdNO0FBQ1g7QUFDQUMsZ0JBQVUsS0FMTDtBQU1MO0FBQ0FDLG1CQUFhLENBUFI7QUFRTDtBQUNBQyxrQkFBWSxDQVRQO0FBVUw7QUFDQUMsbUJBQWEsSUFYUjtBQVlMO0FBQ0FDLDRCQUFzQjtBQWJqQixLLFFBZ0RQQyxRLEdBQVcsRSxRQUdYQyxPLEdBQVUsRSxRQUlWQyxNLEdBQVMsRTs7Ozs7OzJGQXZDaUJOLFcsRUFBWU8sSTs7Ozs7O0FBQ2hDQywrQixHQUFrQixlQUFLQyxjQUFMLGtDQUEyQyxFO0FBQzdEQyxzQixHQUFTRixnQkFBZ0JHLE07O3VCQUNWLGNBQUlDLGtCQUFKLENBQXVCO0FBQ3hDQyx5QkFBTztBQUNMQywwQkFBTWQsZUFBZSxDQURoQjtBQUVMTywwQkFBTUEsUUFBUSxFQUZUO0FBR0xHLDRCQUFRQSxNQUhIO0FBSUxLLDBCQUFNO0FBSkQ7QUFEaUMsaUJBQXZCLEM7OztBQUFiQyxvQjs7QUFRTixvQkFBSUEsS0FBS3JCLElBQUwsQ0FBVXNCLElBQVYsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDdkIsdUJBQUtyQixJQUFMLGdDQUFnQixLQUFLQSxJQUFyQixzQkFBOEJvQixLQUFLckIsSUFBTCxDQUFVQyxJQUF4QztBQUNBLHVCQUFLSyxVQUFMLEdBQWtCZSxLQUFLckIsSUFBTCxDQUFVTSxVQUE1QjtBQUNBLHNCQUFJZSxLQUFLckIsSUFBTCxDQUFVTSxVQUFWLElBQXdCLENBQTVCLEVBQStCO0FBQzdCO0FBQ0EseUJBQUtGLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRDtBQUNGLGlCQVBELE1BT087QUFDTCxnQ0FBSW1CLEtBQUosQ0FBVUYsS0FBS3JCLElBQUwsQ0FBVXdCLEdBQXBCO0FBQ0Q7QUFDRCxxQkFBS2pCLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxxQkFBS2tCLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFHTztBQUNQLFdBQUt4QixJQUFMLEdBQVksRUFBWjtBQUNBLFdBQUt5QixtQkFBTDtBQUNBOztBQUdEOzs7O0VBM0R3QyxlQUFLUCxJOztrQkFBM0I3QixhIiwiZmlsZSI6ImV4Y2hhbmdlX2dvb2RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBTaG9wR3JpZExpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9zaG9wX2dyaWRfbGlzdCdcbmltcG9ydCB7XG4gIFNZU1RFTV9JTkZPLFxuICBVU0VSX1NQRUNJQ0FMX0lORk9cbn0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnQnO1xuaW1wb3J0IHRpcCBmcm9tICcuLi91dGlscy90aXAnO1xuaW1wb3J0IGFwaSBmcm9tICcuLi9hcGkvYXBpJztcbmltcG9ydCBCb3R0b21Mb2FkTW9yZSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb21tb24vYm90dG9tTG9hZE1vcmVcIlxuaW1wb3J0IFBsYWNlaG9sZGVyIGZyb20gXCIuLi9jb21wb25lbnRzL2NvbW1vbi9wbGFjZWhvbGRlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4Y2hhbmdlR29vZHMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aNoui0p+S4k+WMuicsXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInNob3BHcmlkTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cHVyY2hhc2V0eXBlLnN5bmNcIjpcInB1cmNoYXNldHlwZVwiLFwidi1iaW5kOnNwZWNpYWwuc3luY1wiOlwic3BlY2lhbFwiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwibGlzdFwifSxcImJvdHRvbUxvYWRNb3JlXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzaG93LnN5bmNcIjpcInNob3dMb2FkaW5nXCIsXCJtZXNzYWdlXCI6XCLmraPlnKjliqDovb1cIn0sXCJwbGFjZWhvbGRlclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJpc19lbXB0eVwiLFwibWVzc2FnZVwiOlwi5pqC5peg5Y+R546w5pWw5o2uXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBzaG9wR3JpZExpc3Q6IFNob3BHcmlkTGlzdCxcbiAgICBib3R0b21Mb2FkTW9yZTogQm90dG9tTG9hZE1vcmUsXG4gICAgcGxhY2Vob2xkZXI6IFBsYWNlaG9sZGVyXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBsaXN0OiBbXSxcbiAgICBwdXJjaGFzZXR5cGU6IDEsXG4gICAgc3BlY2lhbDoxLCAvLy8vMC3mraPluLjlhaXlupM7MS3nibnku7fkuJPljLrlkozmjaLotKfkuJPljLpcbiAgICAvL+aYr+WQpuacieaVsOaNrlxuICAgIGlzX2VtcHR5OiBmYWxzZSxcbiAgICAvL+W9k+WJjemhtemdolxuICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgIC8v5oC76aG15pWwXG4gICAgcGFnZV90b3RhbDogMCxcbiAgICAvL+aYr+WQpuaYvuekuiDlupXpg6hsb2FkaW5nXG4gICAgc2hvd0xvYWRpbmc6IHRydWUsXG4gICAgLy/pmLLmraLph43lpI3liqDovb1cbiAgICBwcmV2ZW50UmVwZWF0UmV1cWVzdDogZmFsc2VcbiAgfVxuXG4gIGFzeW5jIGdldE15T3JkZXJHb29kc0xpc3QoY3VycmVudFBhZ2Usc2l6ZSkge1xuICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgbGV0IG9wZW5JZCA9IHVzZXJTcGVjaWFsSW5mby5vcGVuaWQ7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nb29kc1VzZXJPcmRlckxpc3Qoe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgcGFnZTogY3VycmVudFBhZ2UgfHwgMSxcbiAgICAgICAgc2l6ZTogc2l6ZSB8fCAxMCxcbiAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgIHR5cGU6ICdyZWZ1bmQnXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgIHRoaXMubGlzdCA9IFsuLi50aGlzLmxpc3QsIC4uLmpzb24uZGF0YS5saXN0XTtcbiAgICAgIHRoaXMucGFnZV90b3RhbCA9IGpzb24uZGF0YS5wYWdlX3RvdGFsO1xuICAgICAgaWYgKGpzb24uZGF0YS5wYWdlX3RvdGFsID09IDApIHtcbiAgICAgICAgLy/mmoLml6DmlbDmja5cbiAgICAgICAgdGhpcy5pc19lbXB0eSA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKTtcbiAgICB9XG4gICAgdGhpcy5zaG93TG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH1cblxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5saXN0ID0gW107XG4gICAgdGhpcy5nZXRNeU9yZGVyR29vZHNMaXN0KCk7XG4gICAgLyp0aGF0Lmxpc3QgPSBiYi5yZXN1bHQucHJvZHVjdHM7XG4gICAgY29uc29sZS5sb2coYmIucmVzdWx0LnByb2R1Y3RzKSovXG5cbiAgfVxuICBjb21wdXRlZCA9IHtcblxuICB9XG4gIG1ldGhvZHMgPSB7XG5cblxuICB9XG4gIGV2ZW50cyA9IHtcblxuICB9XG5cbn1cblxuIl19