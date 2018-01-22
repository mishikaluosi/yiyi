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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Points = function (_wepy$page) {
  _inherits(Points, _wepy$page);

  function Points() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Points);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Points.__proto__ || Object.getPrototypeOf(Points)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的积分'
    }, _this.$repeat = {}, _this.$props = { "pointsDetail": { "xmlns:v-bind": "", "v-bind:is_empty.sync": "is_empty", "v-bind:list.sync": "list" } }, _this.$events = {}, _this.components = {
      pointsDetail: _points_detail2.default
    }, _this.data = {
      winHeight: 0,
      list: [],
      is_empty: false,
      avatarUrl: "",
      nickName: "",
      userPoint: 0
    }, _this.events = {
      // 'index-broadcast': (...args) => {
      //   let $event = args[args.length - 1]
      //   console.log(`${this.$name} receive ${$event.name} from ${$event.source.name}`)
      // }
    }, _this.computed = {}, _this.methods = {
      more: function more() {
        _wepy2.default.navigateTo({
          url: '/pages/points_more'
        });
      },
      jfRule: function jfRule() {
        _wepy2.default.navigateTo({
          url: '/pages/points_rule'
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Points, [{
    key: 'getUserPoint',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
                    page: "1",
                    size: "10"
                  }
                });

              case 5:
                json = _context.sent;

                if (json.data.code == 0) {
                  that.list = json.data.list;
                  this.userPoint = json.data.userPoint;
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

      function getUserPoint() {
        return _ref2.apply(this, arguments);
      }

      return getUserPoint;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      var systemInfo = _wepy2.default.getStorageSync(_constant.SYSTEM_INFO);
      var userInfo = _wepy2.default.getStorageSync(_constant.USER_INFO);
      that.avatarUrl = userInfo.avatarUrl;
      that.nickName = userInfo.nickName;
      that.winHeight = systemInfo.windowHeight;
      console.log("winHeight===", that.winHeight);
      that.getUserPoint();
      that.$apply();
    }
  }]);

  return Points;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Points , 'pages/points'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvaW50cy5qcyJdLCJuYW1lcyI6WyJQb2ludHMiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicG9pbnRzRGV0YWlsIiwiZGF0YSIsIndpbkhlaWdodCIsImxpc3QiLCJpc19lbXB0eSIsImF2YXRhclVybCIsIm5pY2tOYW1lIiwidXNlclBvaW50IiwiZXZlbnRzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibW9yZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJqZlJ1bGUiLCJ0aGF0IiwidXNlclNwZWNpYWxJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJvcGVuSWQiLCJvcGVuaWQiLCJwb2ludEluZm8iLCJxdWVyeSIsInBhZ2UiLCJzaXplIiwianNvbiIsImNvZGUiLCIkYXBwbHkiLCJ0aXAiLCJlcnJvciIsIm1zZyIsInNob3dMb2FkaW5nIiwic3lzdGVtSW5mbyIsInVzZXJJbmZvIiwid2luZG93SGVpZ2h0IiwiY29uc29sZSIsImxvZyIsImdldFVzZXJQb2ludCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUtBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsZ0JBQWUsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix3QkFBdUIsVUFBMUMsRUFBcUQsb0JBQW1CLE1BQXhFLEVBQWhCLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDO0FBRFUsSyxRQUlaQyxJLEdBQU87QUFDTEMsaUJBQVcsQ0FETjtBQUVMQyxZQUFNLEVBRkQ7QUFHTEMsZ0JBQVUsS0FITDtBQUlMQyxpQkFBVyxFQUpOO0FBS0xDLGdCQUFVLEVBTEw7QUFNTEMsaUJBQVc7QUFOTixLLFFBNEJQQyxNLEdBQVM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUpPLEssUUFrQlRDLFEsR0FBVyxFLFFBR1hDLE8sR0FBVTtBQUNSQyxVQURRLGtCQUNEO0FBQ0wsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0FMTztBQU1SQyxZQU5RLG9CQU1DO0FBQ1AsdUJBQUtGLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0Q7QUFWTyxLLFFBWVZMLE0sR0FBUyxFOzs7Ozs7Ozs7Ozs7QUFwRERPLG9CLEdBQU8sSTtBQUNQQywrQixHQUFrQixlQUFLQyxjQUFMLGtDQUEyQyxFO0FBQzdEQyxzQixHQUFTRixnQkFBZ0JHLE07O3VCQUNWLGNBQUlDLFNBQUosQ0FBYztBQUMvQkMseUJBQU87QUFDTEgsNEJBQVFBLE1BREg7QUFFTEksMEJBQUssR0FGQTtBQUdMQywwQkFBSztBQUhBO0FBRHdCLGlCQUFkLEM7OztBQUFiQyxvQjs7QUFPTixvQkFBSUEsS0FBS3ZCLElBQUwsQ0FBVXdCLElBQVYsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDdkJWLHVCQUFLWixJQUFMLEdBQVlxQixLQUFLdkIsSUFBTCxDQUFVRSxJQUF0QjtBQUNBLHVCQUFLSSxTQUFMLEdBQWlCaUIsS0FBS3ZCLElBQUwsQ0FBVU0sU0FBM0I7QUFDQVEsdUJBQUtXLE1BQUw7QUFDRCxpQkFKRCxNQUlPO0FBQ0xDLHNCQUFJQyxLQUFKLENBQVVKLEtBQUt2QixJQUFMLENBQVU0QixHQUFwQjtBQUNEO0FBQ0RkLHFCQUFLZSxXQUFMLEdBQW1CLEtBQW5COzs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBU0s7QUFDUCxVQUFJZixPQUFPLElBQVg7QUFDQSxVQUFJZ0IsYUFBYSxlQUFLZCxjQUFMLHVCQUFqQjtBQUNBLFVBQUllLFdBQVcsZUFBS2YsY0FBTCxxQkFBZjtBQUNBRixXQUFLVixTQUFMLEdBQWlCMkIsU0FBUzNCLFNBQTFCO0FBQ0FVLFdBQUtULFFBQUwsR0FBZ0IwQixTQUFTMUIsUUFBekI7QUFDQVMsV0FBS2IsU0FBTCxHQUFpQjZCLFdBQVdFLFlBQTVCO0FBQ0FDLGNBQVFDLEdBQVIsQ0FBWSxjQUFaLEVBQTJCcEIsS0FBS2IsU0FBaEM7QUFDQWEsV0FBS3FCLFlBQUw7QUFDQXJCLFdBQUtXLE1BQUw7QUFDRDs7OztFQXhEaUMsZUFBS0osSTs7a0JBQXBCN0IsTSIsImZpbGUiOiJwb2ludHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGFwaSBmcm9tICcuLi9hcGkvYXBpJztcbmltcG9ydCB7XG4gIFNZU1RFTV9JTkZPLFxuICBVU0VSX1NQRUNJQ0FMX0lORk8sXG4gIFVTRVJfSU5GT1xufSBmcm9tICcuLi91dGlscy9jb25zdGFudCc7XG5pbXBvcnQgUG9pbnRzRGV0YWlsIGZyb20gJy4uL2NvbXBvbmVudHMvcG9pbnRzX2RldGFpbCdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50cyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE56ev5YiGJyxcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicG9pbnRzRGV0YWlsXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDppc19lbXB0eS5zeW5jXCI6XCJpc19lbXB0eVwiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwibGlzdFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcG9pbnRzRGV0YWlsOiBQb2ludHNEZXRhaWxcbiAgfVxuXG4gIGRhdGEgPSB7XG4gICAgd2luSGVpZ2h0OiAwLFxuICAgIGxpc3Q6IFtdLFxuICAgIGlzX2VtcHR5OiBmYWxzZSxcbiAgICBhdmF0YXJVcmw6IFwiXCIsXG4gICAgbmlja05hbWU6IFwiXCIsXG4gICAgdXNlclBvaW50OiAwXG4gIH1cbiAgYXN5bmMgZ2V0VXNlclBvaW50KCkge1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICAgIGxldCBvcGVuSWQgPSB1c2VyU3BlY2lhbEluZm8ub3BlbmlkO1xuICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5wb2ludEluZm8oe1xuICAgICAgICBxdWVyeToge1xuICAgICAgICAgIG9wZW5JZDogb3BlbklkLFxuICAgICAgICAgIHBhZ2U6XCIxXCIsXG4gICAgICAgICAgc2l6ZTpcIjEwXCJcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgICB0aGF0Lmxpc3QgPSBqc29uLmRhdGEubGlzdDtcbiAgICAgICAgdGhpcy51c2VyUG9pbnQgPSBqc29uLmRhdGEudXNlclBvaW50O1xuICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5tc2cpXG4gICAgICB9XG4gICAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICBldmVudHMgPSB7XG4gICAgLy8gJ2luZGV4LWJyb2FkY2FzdCc6ICguLi5hcmdzKSA9PiB7XG4gICAgLy8gICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG4gICAgLy8gICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLm5hbWV9YClcbiAgICAvLyB9XG4gIH1cblxuICBvbkxvYWQoKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCBzeXN0ZW1JbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhTWVNURU1fSU5GTyk7XG4gICAgbGV0IHVzZXJJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX0lORk8pO1xuICAgIHRoYXQuYXZhdGFyVXJsID0gdXNlckluZm8uYXZhdGFyVXJsO1xuICAgIHRoYXQubmlja05hbWUgPSB1c2VySW5mby5uaWNrTmFtZTtcbiAgICB0aGF0LndpbkhlaWdodCA9IHN5c3RlbUluZm8ud2luZG93SGVpZ2h0O1xuICAgIGNvbnNvbGUubG9nKFwid2luSGVpZ2h0PT09XCIsdGhhdC53aW5IZWlnaHQpO1xuICAgIHRoYXQuZ2V0VXNlclBvaW50KCk7XG4gICAgdGhhdC4kYXBwbHkoKTtcbiAgfVxuICBjb21wdXRlZCA9IHtcblxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgbW9yZSgpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy9wYWdlcy9wb2ludHNfbW9yZSdcbiAgICAgIH0pXG4gICAgfSxcbiAgICBqZlJ1bGUoKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcvcGFnZXMvcG9pbnRzX3J1bGUnXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBldmVudHMgPSB7XG5cbiAgfVxufVxuXG4iXX0=