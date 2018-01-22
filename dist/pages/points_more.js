'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _constant = require('./../utils/constant.js');

var _points_detail = require('./../components/points_detail.js');

var _points_detail2 = _interopRequireDefault(_points_detail);

var _bottomLoadMore = require('./../components/common/bottomLoadMore.js');

var _bottomLoadMore2 = _interopRequireDefault(_bottomLoadMore);

var _placeholder = require('./../components/common/placeholder.js');

var _placeholder2 = _interopRequireDefault(_placeholder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PointsMore = function (_wepy$page) {
  _inherits(PointsMore, _wepy$page);

  function PointsMore() {
    var _ref, _this$data;

    var _temp, _this, _ret;

    _classCallCheck(this, PointsMore);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PointsMore.__proto__ || Object.getPrototypeOf(PointsMore)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '查看更多'
    }, _this.$repeat = {}, _this.$props = { "pointsDetail": { "xmlns:v-bind": "", "v-bind:is_empty.sync": "is_empty", "v-bind:list.sync": "list" }, "bottomLoadMore": { "v-bind:show.sync": "showLoading", "message": "正在加载" }, "placeholder": { "v-bind:show.sync": "is_empty", "message": "暂无发现数据" } }, _this.$events = {}, _this.components = {
      pointsDetail: _points_detail2.default,
      bottomLoadMore: _bottomLoadMore2.default,
      placeholder: _placeholder2.default
    }, _this.data = (_this$data = {
      winHeight: 0,
      list: [],
      is_empty: false,
      showLoading: false,
      //当前页面
      currentPage: 1,
      //总页数
      page_total: 0
    }, _defineProperty(_this$data, 'showLoading', true), _defineProperty(_this$data, 'preventRepeatReuqest', false), _this$data), _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PointsMore, [{
    key: 'getUserPoint',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(currentPage, size) {
        var that, userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context.next = 5;
                return _api2.default.pointInfo({
                  query: {
                    openId: openId,
                    page: currentPage || 1,
                    size: size || 10
                  }
                });

              case 5:
                json = _context.sent;

                if (json.data.code == 0) {
                  that.list = [].concat(_toConsumableArray(that.list), _toConsumableArray(json.data.list));
                  that.page_total = json.data.page_total;
                  that.$apply();
                } else {
                  tip.error(json.data.msg);
                }
                that.showLoading = false;

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getUserPoint(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return getUserPoint;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      that.list = [];
      var systemInfo = _wepy2.default.getStorageSync(_constant.SYSTEM_INFO);
      that.winHeight = systemInfo.windowHeight;
      that.getUserPoint();
      that.$apply();
    }
  }, {
    key: 'onReachBottom',

    //加载更多
    value: function onReachBottom() {
      console.log("ddddddddddddddd");
      var that = this;
      that.showLoading = true;
      console.log(that.page_total + "===" + that.currentPage);
      //判断总页数是否大于翻页数
      if (that.page_total > that.currentPage) {
        console.log(" //判断总页数是否大于翻页数");
        //防止重复加载
        if (that.preventRepeatReuqest) {
          return true;
        }
        that.preventRepeatReuqest = true;
        that.currentPage++;
        that.getUserPoint(that.currentPage);
        that.preventRepeatReuqest = false;
      } else {
        that.showLoading = false;
      }
    }
  }]);

  return PointsMore;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PointsMore , 'pages/points_more'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvaW50c19tb3JlLmpzIl0sIm5hbWVzIjpbIlBvaW50c01vcmUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicG9pbnRzRGV0YWlsIiwiYm90dG9tTG9hZE1vcmUiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJ3aW5IZWlnaHQiLCJsaXN0IiwiaXNfZW1wdHkiLCJzaG93TG9hZGluZyIsImN1cnJlbnRQYWdlIiwicGFnZV90b3RhbCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsInNpemUiLCJ0aGF0IiwidXNlclNwZWNpYWxJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJvcGVuSWQiLCJvcGVuaWQiLCJwb2ludEluZm8iLCJxdWVyeSIsInBhZ2UiLCJqc29uIiwiY29kZSIsIiRhcHBseSIsInRpcCIsImVycm9yIiwibXNnIiwic3lzdGVtSW5mbyIsIndpbmRvd0hlaWdodCIsImdldFVzZXJQb2ludCIsImNvbnNvbGUiLCJsb2ciLCJwcmV2ZW50UmVwZWF0UmV1cWVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxVOzs7Ozs7Ozs7Ozs7Ozs4TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxnQkFBZSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHdCQUF1QixVQUExQyxFQUFxRCxvQkFBbUIsTUFBeEUsRUFBaEIsRUFBZ0csa0JBQWlCLEVBQUMsb0JBQW1CLGFBQXBCLEVBQWtDLFdBQVUsTUFBNUMsRUFBakgsRUFBcUssZUFBYyxFQUFDLG9CQUFtQixVQUFwQixFQUErQixXQUFVLFFBQXpDLEVBQW5MLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLDJDQURVO0FBRVZDLDhDQUZVO0FBR1ZDO0FBSFUsSyxRQU1aQyxJO0FBQ0VDLGlCQUFXLEM7QUFDWEMsWUFBTSxFO0FBQ05DLGdCQUFVLEs7QUFDVkMsbUJBQWEsSztBQUNiO0FBQ0FDLG1CQUFhLEM7QUFDYjtBQUNBQyxrQkFBWTtrREFFQyxJLHVEQUVTLEssc0JBZ0N4QkMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVLEUsUUFHVkMsTSxHQUFTLEU7Ozs7OzsyRkFuQ1VKLFcsRUFBYUssSTs7Ozs7O0FBQzFCQyxvQixHQUFPLEk7QUFDUEMsK0IsR0FBa0IsZUFBS0MsY0FBTCxrQ0FBMkMsRTtBQUM3REMsc0IsR0FBU0YsZ0JBQWdCRyxNOzt1QkFDVixjQUFJQyxTQUFKLENBQWM7QUFDL0JDLHlCQUFPO0FBQ0xILDRCQUFRQSxNQURIO0FBRUxJLDBCQUFNYixlQUFlLENBRmhCO0FBR0xLLDBCQUFNQSxRQUFRO0FBSFQ7QUFEd0IsaUJBQWQsQzs7O0FBQWJTLG9COztBQU9OLG9CQUFJQSxLQUFLbkIsSUFBTCxDQUFVb0IsSUFBVixJQUFrQixDQUF0QixFQUF5QjtBQUN2QlQsdUJBQUtULElBQUwsZ0NBQWdCUyxLQUFLVCxJQUFyQixzQkFBOEJpQixLQUFLbkIsSUFBTCxDQUFVRSxJQUF4QztBQUNBUyx1QkFBS0wsVUFBTCxHQUFrQmEsS0FBS25CLElBQUwsQ0FBVU0sVUFBNUI7QUFDQUssdUJBQUtVLE1BQUw7QUFDRCxpQkFKRCxNQUlPO0FBQ0xDLHNCQUFJQyxLQUFKLENBQVVKLEtBQUtuQixJQUFMLENBQVV3QixHQUFwQjtBQUNEO0FBQ0RiLHFCQUFLUCxXQUFMLEdBQW1CLEtBQW5COzs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBR087QUFDUCxVQUFJTyxPQUFPLElBQVg7QUFDQUEsV0FBS1QsSUFBTCxHQUFVLEVBQVY7QUFDQSxVQUFJdUIsYUFBYSxlQUFLWixjQUFMLHVCQUFqQjtBQUNBRixXQUFLVixTQUFMLEdBQWlCd0IsV0FBV0MsWUFBNUI7QUFDQWYsV0FBS2dCLFlBQUw7QUFDQWhCLFdBQUtVLE1BQUw7QUFDRDs7OztBQVVEO29DQUNnQjtBQUNkTyxjQUFRQyxHQUFSLENBQVksaUJBQVo7QUFDQSxVQUFJbEIsT0FBTyxJQUFYO0FBQ0FBLFdBQUtQLFdBQUwsR0FBbUIsSUFBbkI7QUFDQXdCLGNBQVFDLEdBQVIsQ0FBWWxCLEtBQUtMLFVBQUwsR0FBa0IsS0FBbEIsR0FBMEJLLEtBQUtOLFdBQTNDO0FBQ0E7QUFDQSxVQUFLTSxLQUFLTCxVQUFOLEdBQW9CSyxLQUFLTixXQUE3QixFQUEwQztBQUN4Q3VCLGdCQUFRQyxHQUFSLENBQVksaUJBQVo7QUFDQTtBQUNBLFlBQUlsQixLQUFLbUIsb0JBQVQsRUFBK0I7QUFDN0IsaUJBQU8sSUFBUDtBQUNEO0FBQ0RuQixhQUFLbUIsb0JBQUwsR0FBNEIsSUFBNUI7QUFDQW5CLGFBQUtOLFdBQUw7QUFDQU0sYUFBS2dCLFlBQUwsQ0FBa0JoQixLQUFLTixXQUF2QjtBQUNBTSxhQUFLbUIsb0JBQUwsR0FBNEIsS0FBNUI7QUFDRCxPQVZELE1BVU87QUFDTG5CLGFBQUtQLFdBQUwsR0FBbUIsS0FBbkI7QUFDRDtBQUNGOzs7O0VBdEZxQyxlQUFLYyxJOztrQkFBeEI1QixVIiwiZmlsZSI6InBvaW50c19tb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSc7XG5pbXBvcnQge1xuICBTWVNURU1fSU5GTyxcbiAgVVNFUl9TUEVDSUNBTF9JTkZPXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50JztcbmltcG9ydCBQb2ludHNEZXRhaWwgZnJvbSAnLi4vY29tcG9uZW50cy9wb2ludHNfZGV0YWlsJ1xuaW1wb3J0IEJvdHRvbUxvYWRNb3JlIGZyb20gXCIuLi9jb21wb25lbnRzL2NvbW1vbi9ib3R0b21Mb2FkTW9yZVwiXG5pbXBvcnQgUGxhY2Vob2xkZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvY29tbW9uL3BsYWNlaG9sZGVyXCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50c01vcmUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+afpeeci+abtOWkmicsXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInBvaW50c0RldGFpbFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6aXNfZW1wdHkuc3luY1wiOlwiaXNfZW1wdHlcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcImxpc3RcIn0sXCJib3R0b21Mb2FkTW9yZVwiOntcInYtYmluZDpzaG93LnN5bmNcIjpcInNob3dMb2FkaW5nXCIsXCJtZXNzYWdlXCI6XCLmraPlnKjliqDovb1cIn0sXCJwbGFjZWhvbGRlclwiOntcInYtYmluZDpzaG93LnN5bmNcIjpcImlzX2VtcHR5XCIsXCJtZXNzYWdlXCI6XCLmmoLml6Dlj5HnjrDmlbDmja5cIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHBvaW50c0RldGFpbDogUG9pbnRzRGV0YWlsLFxuICAgIGJvdHRvbUxvYWRNb3JlOiBCb3R0b21Mb2FkTW9yZSxcbiAgICBwbGFjZWhvbGRlcjogUGxhY2Vob2xkZXJcbiAgfVxuXG4gIGRhdGEgPSB7XG4gICAgd2luSGVpZ2h0OiAwLFxuICAgIGxpc3Q6IFtdLFxuICAgIGlzX2VtcHR5OiBmYWxzZSxcbiAgICBzaG93TG9hZGluZzogZmFsc2UsXG4gICAgLy/lvZPliY3pobXpnaJcbiAgICBjdXJyZW50UGFnZTogMSxcbiAgICAvL+aAu+mhteaVsFxuICAgIHBhZ2VfdG90YWw6IDAsXG4gICAgLy/mmK/lkKbmmL7npLog5bqV6YOobG9hZGluZ1xuICAgIHNob3dMb2FkaW5nOiB0cnVlLFxuICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XG4gICAgcHJldmVudFJlcGVhdFJldXFlc3Q6IGZhbHNlXG4gIH1cblxuICBhc3luYyBnZXRVc2VyUG9pbnQoY3VycmVudFBhZ2UsIHNpemUpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLnBvaW50SW5mbyh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBvcGVuSWQ6IG9wZW5JZCxcbiAgICAgICAgcGFnZTogY3VycmVudFBhZ2UgfHwgMSxcbiAgICAgICAgc2l6ZTogc2l6ZSB8fCAxMFxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICB0aGF0Lmxpc3QgPSBbLi4udGhhdC5saXN0LCAuLi5qc29uLmRhdGEubGlzdF07XG4gICAgICB0aGF0LnBhZ2VfdG90YWwgPSBqc29uLmRhdGEucGFnZV90b3RhbDtcbiAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKVxuICAgIH1cbiAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XG4gIH1cblxuICBvbkxvYWQoKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHRoYXQubGlzdD1bXTtcbiAgICBsZXQgc3lzdGVtSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoU1lTVEVNX0lORk8pO1xuICAgIHRoYXQud2luSGVpZ2h0ID0gc3lzdGVtSW5mby53aW5kb3dIZWlnaHQ7XG4gICAgdGhhdC5nZXRVc2VyUG9pbnQoKTtcbiAgICB0aGF0LiRhcHBseSgpO1xuICB9XG4gIGNvbXB1dGVkID0ge1xuXG4gIH1cbiAgbWV0aG9kcyA9IHtcblxuICB9XG4gIGV2ZW50cyA9IHtcblxuICB9XG4gIC8v5Yqg6L295pu05aSaXG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgY29uc29sZS5sb2coXCJkZGRkZGRkZGRkZGRkZGRcIik7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHRoYXQuc2hvd0xvYWRpbmcgPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKHRoYXQucGFnZV90b3RhbCArIFwiPT09XCIgKyB0aGF0LmN1cnJlbnRQYWdlKTtcbiAgICAvL+WIpOaWreaAu+mhteaVsOaYr+WQpuWkp+S6jue/u+mhteaVsFxuICAgIGlmICgodGhhdC5wYWdlX3RvdGFsKSA+IHRoYXQuY3VycmVudFBhZ2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiIC8v5Yik5pat5oC76aG15pWw5piv5ZCm5aSn5LqO57+76aG15pWwXCIpO1xuICAgICAgLy/pmLLmraLph43lpI3liqDovb1cbiAgICAgIGlmICh0aGF0LnByZXZlbnRSZXBlYXRSZXVxZXN0KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgdGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCA9IHRydWU7XG4gICAgICB0aGF0LmN1cnJlbnRQYWdlKys7XG4gICAgICB0aGF0LmdldFVzZXJQb2ludCh0aGF0LmN1cnJlbnRQYWdlKTtcbiAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5zaG93TG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfTtcbn1cblxuIl19