'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _bottomLoadMore = require('./../components/common/bottomLoadMore.js');

var _bottomLoadMore2 = _interopRequireDefault(_bottomLoadMore);

var _placeholder = require('./../components/common/placeholder.js');

var _placeholder2 = _interopRequireDefault(_placeholder);

var _constant = require('./../utils/constant.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Messages = function (_wepy$page) {
  _inherits(Messages, _wepy$page);

  function Messages() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Messages);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Messages.__proto__ || Object.getPrototypeOf(Messages)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的消息'
    }, _this.$repeat = {}, _this.$props = { "bottomLoadMore": { "xmlns:v-bind": "", "v-bind:show.sync": "showLoading", "message": "正在加载" }, "placeholder": { "v-bind:show.sync": "is_empty", "message": "暂无消息" } }, _this.$events = {}, _this.components = {
      bottomLoadMore: _bottomLoadMore2.default,
      placeholder: _placeholder2.default
    }, _this.data = {
      list: [],
      winHeight: 0,
      //当前页面
      currentPage: 1,
      //总页数
      page_total: 0,
      //是否显示 底部loading
      showLoading: true,
      //防止重复加载
      preventRepeatReuqest: false,
      is_empty: false
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Messages, [{
    key: 'getUserMessage',
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
                return _api2.default.messageInfo({
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
                  if (json.data.page_total == 0) {
                    //暂无数据
                    that.is_empty = true;
                  }
                } else {
                  tip.error(json.data.msg);
                }
                that.showLoading = false;
                that.$apply();

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getUserMessage(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return getUserMessage;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      this.list = [];
      //设置滚动高度
      var systemInfo = _wepy2.default.getStorageSync(_constant.SYSTEM_INFO);
      that.winHeight = systemInfo.windowHeight;
      that.getUserMessage();
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
        that.getUserMessage(that.currentPage);
        that.preventRepeatReuqest = false;
      } else {
        that.showLoading = false;
      }
    }
  }]);

  return Messages;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Messages , 'pages/messages'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2VzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImJvdHRvbUxvYWRNb3JlIiwicGxhY2Vob2xkZXIiLCJkYXRhIiwibGlzdCIsIndpbkhlaWdodCIsImN1cnJlbnRQYWdlIiwicGFnZV90b3RhbCIsInNob3dMb2FkaW5nIiwicHJldmVudFJlcGVhdFJldXFlc3QiLCJpc19lbXB0eSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsInNpemUiLCJ0aGF0IiwidXNlclNwZWNpYWxJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJvcGVuSWQiLCJvcGVuaWQiLCJtZXNzYWdlSW5mbyIsInF1ZXJ5IiwicGFnZSIsImpzb24iLCJjb2RlIiwidGlwIiwiZXJyb3IiLCJtc2ciLCIkYXBwbHkiLCJzeXN0ZW1JbmZvIiwid2luZG93SGVpZ2h0IiwiZ2V0VXNlck1lc3NhZ2UiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUlxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsa0JBQWlCLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsb0JBQW1CLGFBQXRDLEVBQW9ELFdBQVUsTUFBOUQsRUFBbEIsRUFBd0YsZUFBYyxFQUFDLG9CQUFtQixVQUFwQixFQUErQixXQUFVLE1BQXpDLEVBQXRHLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLDhDQURVO0FBRVZDO0FBRlUsSyxRQUlaQyxJLEdBQU87QUFDTEMsWUFBTSxFQUREO0FBRUxDLGlCQUFXLENBRk47QUFHTDtBQUNBQyxtQkFBYSxDQUpSO0FBS0w7QUFDQUMsa0JBQVksQ0FOUDtBQU9MO0FBQ0FDLG1CQUFhLElBUlI7QUFTTDtBQUNBQyw0QkFBc0IsS0FWakI7QUFXTEMsZ0JBQVU7QUFYTCxLLFFBK0NQQyxRLEdBQVcsRSxRQUdYQyxPLEdBQVUsRSxRQUlWQyxNLEdBQVMsRTs7Ozs7OzJGQXhDYVAsVyxFQUFhUSxJOzs7Ozs7QUFDN0JDLG9CLEdBQU8sSTtBQUNQQywrQixHQUFrQixlQUFLQyxjQUFMLGtDQUEyQyxFO0FBQzdEQyxzQixHQUFTRixnQkFBZ0JHLE07O3VCQUNWLGNBQUlDLFdBQUosQ0FBZ0I7QUFDakNDLHlCQUFPO0FBQ0xILDRCQUFRQSxNQURIO0FBRUxJLDBCQUFNaEIsZUFBZSxDQUZoQjtBQUdMUSwwQkFBTUEsUUFBUTtBQUhUO0FBRDBCLGlCQUFoQixDOzs7QUFBYlMsb0I7O0FBT04sb0JBQUlBLEtBQUtwQixJQUFMLENBQVVxQixJQUFWLElBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCVCx1QkFBS1gsSUFBTCxnQ0FBZ0JXLEtBQUtYLElBQXJCLHNCQUE4Qm1CLEtBQUtwQixJQUFMLENBQVVDLElBQXhDO0FBQ0FXLHVCQUFLUixVQUFMLEdBQWtCZ0IsS0FBS3BCLElBQUwsQ0FBVUksVUFBNUI7QUFDQSxzQkFBSWdCLEtBQUtwQixJQUFMLENBQVVJLFVBQVYsSUFBd0IsQ0FBNUIsRUFBK0I7QUFDN0I7QUFDQ1EseUJBQUtMLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRjtBQUNGLGlCQVBELE1BT087QUFDTGUsc0JBQUlDLEtBQUosQ0FBVUgsS0FBS3BCLElBQUwsQ0FBVXdCLEdBQXBCO0FBQ0Q7QUFDRFoscUJBQUtQLFdBQUwsR0FBbUIsS0FBbkI7QUFDQ08scUJBQUthLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFFTTtBQUNQLFVBQUliLE9BQU8sSUFBWDtBQUNBLFdBQUtYLElBQUwsR0FBWSxFQUFaO0FBQ0E7QUFDQSxVQUFJeUIsYUFBYSxlQUFLWixjQUFMLHVCQUFqQjtBQUNBRixXQUFLVixTQUFMLEdBQWlCd0IsV0FBV0MsWUFBNUI7QUFDQWYsV0FBS2dCLGNBQUw7QUFFRDs7OztBQVdEO29DQUNnQjtBQUNkQyxjQUFRQyxHQUFSLENBQVksaUJBQVo7QUFDQSxVQUFJbEIsT0FBTyxJQUFYO0FBQ0FBLFdBQUtQLFdBQUwsR0FBbUIsSUFBbkI7QUFDQXdCLGNBQVFDLEdBQVIsQ0FBWWxCLEtBQUtSLFVBQUwsR0FBa0IsS0FBbEIsR0FBMEJRLEtBQUtULFdBQTNDO0FBQ0E7QUFDQSxVQUFLUyxLQUFLUixVQUFOLEdBQW9CUSxLQUFLVCxXQUE3QixFQUEwQztBQUN4QzBCLGdCQUFRQyxHQUFSLENBQVksaUJBQVo7QUFDQTtBQUNBLFlBQUlsQixLQUFLTixvQkFBVCxFQUErQjtBQUM3QixpQkFBTyxJQUFQO0FBQ0Q7QUFDRE0sYUFBS04sb0JBQUwsR0FBNEIsSUFBNUI7QUFDQU0sYUFBS1QsV0FBTDtBQUNBUyxhQUFLZ0IsY0FBTCxDQUFvQmhCLEtBQUtULFdBQXpCO0FBQ0FTLGFBQUtOLG9CQUFMLEdBQTRCLEtBQTVCO0FBQ0QsT0FWRCxNQVVPO0FBQ0xNLGFBQUtQLFdBQUwsR0FBbUIsS0FBbkI7QUFDRDtBQUNGOzs7O0VBeEZtQyxlQUFLYyxJOztrQkFBdEI1QixRIiwiZmlsZSI6Im1lc3NhZ2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSc7XG5pbXBvcnQgQm90dG9tTG9hZE1vcmUgZnJvbSBcIi4uL2NvbXBvbmVudHMvY29tbW9uL2JvdHRvbUxvYWRNb3JlXCJcbmltcG9ydCBQbGFjZWhvbGRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9jb21tb24vcGxhY2Vob2xkZXJcIlxuaW1wb3J0IHtcbiAgU1lTVEVNX0lORk8sXG4gIFVTRVJfU1BFQ0lDQUxfSU5GT1xufSBmcm9tICcuLi91dGlscy9jb25zdGFudCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE5raI5oGvJyxcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYm90dG9tTG9hZE1vcmVcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNob3cuc3luY1wiOlwic2hvd0xvYWRpbmdcIixcIm1lc3NhZ2VcIjpcIuato+WcqOWKoOi9vVwifSxcInBsYWNlaG9sZGVyXCI6e1widi1iaW5kOnNob3cuc3luY1wiOlwiaXNfZW1wdHlcIixcIm1lc3NhZ2VcIjpcIuaaguaXoOa2iOaBr1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgYm90dG9tTG9hZE1vcmU6IEJvdHRvbUxvYWRNb3JlLFxuICAgIHBsYWNlaG9sZGVyOiBQbGFjZWhvbGRlclxuICB9XG4gIGRhdGEgPSB7XG4gICAgbGlzdDogW10sXG4gICAgd2luSGVpZ2h0OiAwLFxuICAgIC8v5b2T5YmN6aG16Z2iXG4gICAgY3VycmVudFBhZ2U6IDEsXG4gICAgLy/mgLvpobXmlbBcbiAgICBwYWdlX3RvdGFsOiAwLFxuICAgIC8v5piv5ZCm5pi+56S6IOW6lemDqGxvYWRpbmdcbiAgICBzaG93TG9hZGluZzogdHJ1ZSxcbiAgICAvL+mYsuatoumHjeWkjeWKoOi9vVxuICAgIHByZXZlbnRSZXBlYXRSZXVxZXN0OiBmYWxzZSxcbiAgICBpc19lbXB0eTogZmFsc2VcbiAgfVxuXG4gICBhc3luYyBnZXRVc2VyTWVzc2FnZShjdXJyZW50UGFnZSwgc2l6ZSkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8pIHx8IHt9O1xuICAgIGxldCBvcGVuSWQgPSB1c2VyU3BlY2lhbEluZm8ub3BlbmlkO1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkubWVzc2FnZUluZm8oe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlIHx8IDEsXG4gICAgICAgIHNpemU6IHNpemUgfHwgMTBcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgdGhhdC5saXN0ID0gWy4uLnRoYXQubGlzdCwgLi4uanNvbi5kYXRhLmxpc3RdO1xuICAgICAgdGhhdC5wYWdlX3RvdGFsID0ganNvbi5kYXRhLnBhZ2VfdG90YWw7XG4gICAgICBpZiAoanNvbi5kYXRhLnBhZ2VfdG90YWwgPT0gMCkge1xuICAgICAgICAvL+aaguaXoOaVsOaNrlxuICAgICAgICAgdGhhdC5pc19lbXB0eSA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKVxuICAgIH1cbiAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XG4gICAgIHRoYXQuJGFwcGx5KCk7XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICB0aGlzLmxpc3QgPSBbXTtcbiAgICAvL+iuvue9rua7muWKqOmrmOW6plxuICAgIGxldCBzeXN0ZW1JbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhTWVNURU1fSU5GTyk7XG4gICAgdGhhdC53aW5IZWlnaHQgPSBzeXN0ZW1JbmZvLndpbmRvd0hlaWdodDtcbiAgICB0aGF0LmdldFVzZXJNZXNzYWdlKCk7XG5cbiAgfVxuICBjb21wdXRlZCA9IHtcblxuICB9XG4gIG1ldGhvZHMgPSB7XG5cblxuICB9XG4gIGV2ZW50cyA9IHtcblxuICB9XG4gIC8v5Yqg6L295pu05aSaXG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgY29uc29sZS5sb2coXCJkZGRkZGRkZGRkZGRkZGRcIik7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHRoYXQuc2hvd0xvYWRpbmcgPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKHRoYXQucGFnZV90b3RhbCArIFwiPT09XCIgKyB0aGF0LmN1cnJlbnRQYWdlKTtcbiAgICAvL+WIpOaWreaAu+mhteaVsOaYr+WQpuWkp+S6jue/u+mhteaVsFxuICAgIGlmICgodGhhdC5wYWdlX3RvdGFsKSA+IHRoYXQuY3VycmVudFBhZ2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiIC8v5Yik5pat5oC76aG15pWw5piv5ZCm5aSn5LqO57+76aG15pWwXCIpO1xuICAgICAgLy/pmLLmraLph43lpI3liqDovb1cbiAgICAgIGlmICh0aGF0LnByZXZlbnRSZXBlYXRSZXVxZXN0KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgdGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCA9IHRydWU7XG4gICAgICB0aGF0LmN1cnJlbnRQYWdlKys7XG4gICAgICB0aGF0LmdldFVzZXJNZXNzYWdlKHRoYXQuY3VycmVudFBhZ2UpO1xuICAgICAgdGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuXG4iXX0=