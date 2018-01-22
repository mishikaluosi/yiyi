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

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _constant = require('./../utils/constant.js');

var _points_detail = require('./../components/points_detail.js');

var _points_detail2 = _interopRequireDefault(_points_detail);

var _points_rule = require('./../components/points_rule.js');

var _points_rule2 = _interopRequireDefault(_points_rule);

var _wepySignTime = require('./../components/common/wepy-sign-time.js');

var _wepySignTime2 = _interopRequireDefault(_wepySignTime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignIn = function (_wepy$page) {
  _inherits(SignIn, _wepy$page);

  function SignIn() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SignIn);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SignIn.__proto__ || Object.getPrototypeOf(SignIn)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '签到有礼'
    }, _this.$repeat = {}, _this.$props = { "tab": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:currentTab.sync": "currentTab", "v-bind:tabList.sync": "tabList" }, "pointsDetail": { "v-bind:is_empty.sync": "is_empty", "v-bind:list.sync": "signList" }, "pointsRule": {} }, _this.$events = { "tab": { "v-on:currentTab": "getCurrentTab" } }, _this.components = {
      tab: _tab2.default,
      pointsDetail: _points_detail2.default,
      pointsRule: _points_rule2.default,
      wepySignTime: _wepySignTime2.default
    }, _this.data = {
      currentTab: 0,
      winHeight: 0,
      tabList: ["积分规则", "获得记录"],
      signed: false,
      score: 0,
      conDays: 0,
      signList: [],
      is_empty: false,
      signing: false
    }, _this.computed = {}, _this.methods = {
      getCurrentTab: function getCurrentTab(cur, evt) {
        var that = this;
        that.currentTab = cur;
        that.$apply();
      },

      /**
       * 滑动切换tab
       */
      bindChange: function bindChange(e) {
        var that = this;
        that.currentTab = e.detail.current;
        that.$apply();
      },
      sign: function sign() {
        var that = this;
        if (that.signed) {
          _tip2.default.alert("你今天已签过了!");
        } else {
          that.doSign();
        }
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SignIn, [{
    key: 'getUserSign',
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
                return _api2.default.userSginInfo({
                  query: {
                    openId: openId
                  }
                });

              case 5:
                json = _context.sent;

                if (json.data.code == 0) {
                  that.signed = json.data.hasSign;
                  that.conDays = json.data.conDays;
                  that.signList = json.data.list;
                  that.score = json.data.score;
                  console.log("jefe==", that.signList);
                  that.$apply();
                } else {
                  _tip2.default.error(json.data.msg);
                }
                that.showLoading = false;

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getUserSign() {
        return _ref2.apply(this, arguments);
      }

      return getUserSign;
    }()
  }, {
    key: 'doSign',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var that, userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = this;

                if (!that.signing) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt('return');

              case 3:
                that.signing = true;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context2.next = 8;
                return _api2.default.doSign({
                  query: {
                    openId: openId
                  }
                });

              case 8:
                json = _context2.sent;

                if (json.data.code == 0) {
                  _tip2.default.success("恭喜获得10积分!", 3000);
                  that.signed = true;
                  that.conDays = that.conDays + 1;
                  that.siging = false;
                  this.getUserSign();
                  this.$invoke("wepySignTime", "refreshList", "");
                  that.$apply();
                } else {
                  _wepy2.default.showToast({
                    title: json.data.msg,
                    images: '../images/error.png',
                    duration: 5000
                  });
                }

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function doSign() {
        return _ref3.apply(this, arguments);
      }

      return doSign;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      var systemInfo = _wepy2.default.getStorageSync(_constant.SYSTEM_INFO);
      console.log("." + systemInfo.windowHeight);
      that.winHeight = systemInfo.windowHeight;
      that.getUserSign();
      that.$apply();
    }
  }]);

  return SignIn;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(SignIn , 'pages/sign_in'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZ25faW4uanMiXSwibmFtZXMiOlsiU2lnbkluIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInRhYiIsInBvaW50c0RldGFpbCIsInBvaW50c1J1bGUiLCJ3ZXB5U2lnblRpbWUiLCJkYXRhIiwiY3VycmVudFRhYiIsIndpbkhlaWdodCIsInRhYkxpc3QiLCJzaWduZWQiLCJzY29yZSIsImNvbkRheXMiLCJzaWduTGlzdCIsImlzX2VtcHR5Iiwic2lnbmluZyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdldEN1cnJlbnRUYWIiLCJjdXIiLCJldnQiLCJ0aGF0IiwiJGFwcGx5IiwiYmluZENoYW5nZSIsImUiLCJkZXRhaWwiLCJjdXJyZW50Iiwic2lnbiIsImFsZXJ0IiwiZG9TaWduIiwiZXZlbnRzIiwidXNlclNwZWNpYWxJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJvcGVuSWQiLCJvcGVuaWQiLCJ1c2VyU2dpbkluZm8iLCJxdWVyeSIsImpzb24iLCJjb2RlIiwiaGFzU2lnbiIsImxpc3QiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJtc2ciLCJzaG93TG9hZGluZyIsInN1Y2Nlc3MiLCJzaWdpbmciLCJnZXRVc2VyU2lnbiIsIiRpbnZva2UiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImltYWdlcyIsImR1cmF0aW9uIiwic3lzdGVtSW5mbyIsIndpbmRvd0hlaWdodCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsT0FBTSxFQUFDLGNBQWEsRUFBZCxFQUFpQixnQkFBZSxFQUFoQyxFQUFtQywwQkFBeUIsWUFBNUQsRUFBeUUsdUJBQXNCLFNBQS9GLEVBQVAsRUFBaUgsZ0JBQWUsRUFBQyx3QkFBdUIsVUFBeEIsRUFBbUMsb0JBQW1CLFVBQXRELEVBQWhJLEVBQWtNLGNBQWEsRUFBL00sRSxRQUNUQyxPLEdBQVUsRUFBQyxPQUFNLEVBQUMsbUJBQWtCLGVBQW5CLEVBQVAsRSxRQUNUQyxVLEdBQWE7QUFDUkMsd0JBRFE7QUFFUkMsMkNBRlE7QUFHUkMsdUNBSFE7QUFJUkM7QUFKUSxLLFFBTVZDLEksR0FBTztBQUNMQyxrQkFBWSxDQURQO0FBRUxDLGlCQUFXLENBRk47QUFHTEMsZUFBUyxDQUFDLE1BQUQsRUFBUyxNQUFULENBSEo7QUFJTEMsY0FBUSxLQUpIO0FBS0xDLGFBQU8sQ0FMRjtBQU1MQyxlQUFTLENBTko7QUFPTEMsZ0JBQVUsRUFQTDtBQVFMQyxnQkFBVSxLQVJMO0FBU0xDLGVBQVM7QUFUSixLLFFBcUVQQyxRLEdBQVcsRSxRQUNYQyxPLEdBQVU7QUFDUkMsbUJBRFEseUJBQ01DLEdBRE4sRUFDV0MsR0FEWCxFQUNnQjtBQUN0QixZQUFJQyxPQUFPLElBQVg7QUFDQUEsYUFBS2QsVUFBTCxHQUFrQlksR0FBbEI7QUFDQUUsYUFBS0MsTUFBTDtBQUNELE9BTE87O0FBTVI7OztBQUdBQyxnQkFUUSxzQkFTR0MsQ0FUSCxFQVNNO0FBQ1osWUFBSUgsT0FBTyxJQUFYO0FBQ0FBLGFBQUtkLFVBQUwsR0FBa0JpQixFQUFFQyxNQUFGLENBQVNDLE9BQTNCO0FBQ0FMLGFBQUtDLE1BQUw7QUFDRCxPQWJPO0FBY1JLLFVBZFEsa0JBY0Q7QUFDTCxZQUFJTixPQUFPLElBQVg7QUFDQSxZQUFJQSxLQUFLWCxNQUFULEVBQWlCO0FBQ2Ysd0JBQUlrQixLQUFKLENBQVUsVUFBVjtBQUNELFNBRkQsTUFFTztBQUNMUCxlQUFLUSxNQUFMO0FBQ0Q7QUFDRjtBQXJCTyxLLFFBdUJWQyxNLEdBQVMsRTs7Ozs7Ozs7Ozs7O0FBakZIVCxvQixHQUFPLEk7QUFDUFUsK0IsR0FBa0IsZUFBS0MsY0FBTCxrQ0FBMkMsRTtBQUM3REMsc0IsR0FBU0YsZ0JBQWdCRyxNOzt1QkFDVixjQUFJQyxZQUFKLENBQWlCO0FBQ2xDQyx5QkFBTztBQUNMSCw0QkFBUUE7QUFESDtBQUQyQixpQkFBakIsQzs7O0FBQWJJLG9COztBQUtOLG9CQUFJQSxLQUFLL0IsSUFBTCxDQUFVZ0MsSUFBVixJQUFrQixDQUF0QixFQUF5QjtBQUN2QmpCLHVCQUFLWCxNQUFMLEdBQWMyQixLQUFLL0IsSUFBTCxDQUFVaUMsT0FBeEI7QUFDQWxCLHVCQUFLVCxPQUFMLEdBQWV5QixLQUFLL0IsSUFBTCxDQUFVTSxPQUF6QjtBQUNBUyx1QkFBS1IsUUFBTCxHQUFnQndCLEtBQUsvQixJQUFMLENBQVVrQyxJQUExQjtBQUNBbkIsdUJBQUtWLEtBQUwsR0FBYTBCLEtBQUsvQixJQUFMLENBQVVLLEtBQXZCO0FBQ0E4QiwwQkFBUUMsR0FBUixDQUFZLFFBQVosRUFBc0JyQixLQUFLUixRQUEzQjtBQUNBUSx1QkFBS0MsTUFBTDtBQUNELGlCQVBELE1BT087QUFDTCxnQ0FBSXFCLEtBQUosQ0FBVU4sS0FBSy9CLElBQUwsQ0FBVXNDLEdBQXBCO0FBQ0Q7QUFDRHZCLHFCQUFLd0IsV0FBTCxHQUFtQixLQUFuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdJeEIsb0IsR0FBTyxJOztxQkFDUEEsS0FBS04sTzs7Ozs7Ozs7QUFHVE0scUJBQUtOLE9BQUwsR0FBZSxJQUFmO0FBQ0lnQiwrQixHQUFrQixlQUFLQyxjQUFMLGtDQUEyQyxFO0FBQzdEQyxzQixHQUFTRixnQkFBZ0JHLE07O3VCQUNWLGNBQUlMLE1BQUosQ0FBVztBQUM1Qk8seUJBQU87QUFDTEgsNEJBQVFBO0FBREg7QUFEcUIsaUJBQVgsQzs7O0FBQWJJLG9COztBQUtOLG9CQUFJQSxLQUFLL0IsSUFBTCxDQUFVZ0MsSUFBVixJQUFrQixDQUF0QixFQUF5QjtBQUN2QixnQ0FBSVEsT0FBSixDQUFZLFdBQVosRUFBeUIsSUFBekI7QUFDQXpCLHVCQUFLWCxNQUFMLEdBQWMsSUFBZDtBQUNBVyx1QkFBS1QsT0FBTCxHQUFlUyxLQUFLVCxPQUFMLEdBQWUsQ0FBOUI7QUFDQVMsdUJBQUswQixNQUFMLEdBQWMsS0FBZDtBQUNBLHVCQUFLQyxXQUFMO0FBQ0EsdUJBQUtDLE9BQUwsQ0FBYSxjQUFiLEVBQTRCLGFBQTVCLEVBQTJDLEVBQTNDO0FBQ0E1Qix1QkFBS0MsTUFBTDtBQUNELGlCQVJELE1BUU87QUFDTCxpQ0FBSzRCLFNBQUwsQ0FBZTtBQUNiQywyQkFBT2QsS0FBSy9CLElBQUwsQ0FBVXNDLEdBREo7QUFFYlEsNEJBQVEscUJBRks7QUFHYkMsOEJBQVU7QUFIRyxtQkFBZjtBQUtEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBRU07QUFDUCxVQUFJaEMsT0FBTyxJQUFYO0FBQ0EsVUFBSWlDLGFBQWEsZUFBS3RCLGNBQUwsdUJBQWpCO0FBQ0FTLGNBQVFDLEdBQVIsQ0FBWSxNQUFNWSxXQUFXQyxZQUE3QjtBQUNBbEMsV0FBS2IsU0FBTCxHQUFpQjhDLFdBQVdDLFlBQTVCO0FBQ0FsQyxXQUFLMkIsV0FBTDtBQUNBM0IsV0FBS0MsTUFBTDtBQUNEOzs7O0VBakZpQyxlQUFLa0MsSTs7a0JBQXBCN0QsTSIsImZpbGUiOiJzaWduX2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgYXBpIGZyb20gJy4uL2FwaS9hcGknO1xuICBpbXBvcnQgVGFiIGZyb20gJy4uL2NvbXBvbmVudHMvdGFiJ1xuICBpbXBvcnQgdGlwIGZyb20gJy4uL3V0aWxzL3RpcCdcbiAgaW1wb3J0IHtcbiAgICBTWVNURU1fSU5GTyxcbiAgICBVU0VSX1NQRUNJQ0FMX0lORk9cbiAgfSBmcm9tICcuLi91dGlscy9jb25zdGFudCc7XG4gIGltcG9ydCBQb2ludHNEZXRhaWwgZnJvbSAnLi4vY29tcG9uZW50cy9wb2ludHNfZGV0YWlsJ1xuICBpbXBvcnQgUG9pbnRzUnVsZSBmcm9tICcuLi9jb21wb25lbnRzL3BvaW50c19ydWxlJ1xuICBpbXBvcnQgV2VweVNpZ25UaW1lIGZyb20gJy4uL2NvbXBvbmVudHMvY29tbW9uL3dlcHktc2lnbi10aW1lJztcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lnbkluIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn562+5Yiw5pyJ56S8JyxcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYlwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpjdXJyZW50VGFiLnN5bmNcIjpcImN1cnJlbnRUYWJcIixcInYtYmluZDp0YWJMaXN0LnN5bmNcIjpcInRhYkxpc3RcIn0sXCJwb2ludHNEZXRhaWxcIjp7XCJ2LWJpbmQ6aXNfZW1wdHkuc3luY1wiOlwiaXNfZW1wdHlcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcInNpZ25MaXN0XCJ9LFwicG9pbnRzUnVsZVwiOnt9fTtcclxuJGV2ZW50cyA9IHtcInRhYlwiOntcInYtb246Y3VycmVudFRhYlwiOlwiZ2V0Q3VycmVudFRhYlwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgdGFiOiBUYWIsXG4gICAgICBwb2ludHNEZXRhaWw6IFBvaW50c0RldGFpbCxcbiAgICAgIHBvaW50c1J1bGU6IFBvaW50c1J1bGUsXG4gICAgICB3ZXB5U2lnblRpbWU6IFdlcHlTaWduVGltZVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIHRhYkxpc3Q6IFtcIuenr+WIhuinhOWImVwiLCBcIuiOt+W+l+iusOW9lVwiXSxcbiAgICAgIHNpZ25lZDogZmFsc2UsXG4gICAgICBzY29yZTogMCxcbiAgICAgIGNvbkRheXM6IDAsXG4gICAgICBzaWduTGlzdDogW10sXG4gICAgICBpc19lbXB0eTogZmFsc2UsXG4gICAgICBzaWduaW5nOiBmYWxzZVxuICAgIH1cbiAgICBhc3luYyBnZXRVc2VyU2lnbigpIHtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkudXNlclNnaW5JbmZvKHtcbiAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICBvcGVuSWQ6IG9wZW5JZFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICAgIHRoYXQuc2lnbmVkID0ganNvbi5kYXRhLmhhc1NpZ247XG4gICAgICAgIHRoYXQuY29uRGF5cyA9IGpzb24uZGF0YS5jb25EYXlzO1xuICAgICAgICB0aGF0LnNpZ25MaXN0ID0ganNvbi5kYXRhLmxpc3Q7XG4gICAgICAgIHRoYXQuc2NvcmUgPSBqc29uLmRhdGEuc2NvcmU7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiamVmZT09XCIsIHRoYXQuc2lnbkxpc3QpO1xuICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5tc2cpXG4gICAgICB9XG4gICAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIGFzeW5jIGRvU2lnbigpIHtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIGlmICh0aGF0LnNpZ25pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhhdC5zaWduaW5nID0gdHJ1ZTtcbiAgICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZG9TaWduKHtcbiAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICBvcGVuSWQ6IG9wZW5JZFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICAgIHRpcC5zdWNjZXNzKFwi5oGt5Zac6I635b6XMTDnp6/liIYhXCIsIDMwMDApO1xuICAgICAgICB0aGF0LnNpZ25lZCA9IHRydWU7XG4gICAgICAgIHRoYXQuY29uRGF5cyA9IHRoYXQuY29uRGF5cyArIDE7XG4gICAgICAgIHRoYXQuc2lnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2V0VXNlclNpZ24oKTtcbiAgICAgICAgdGhpcy4kaW52b2tlKFwid2VweVNpZ25UaW1lXCIsXCJyZWZyZXNoTGlzdFwiLCBcIlwiKTtcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZToganNvbi5kYXRhLm1zZyxcbiAgICAgICAgICBpbWFnZXM6ICcuLi9pbWFnZXMvZXJyb3IucG5nJyxcbiAgICAgICAgICBkdXJhdGlvbjogNTAwMFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQoKSB7XG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICBsZXQgc3lzdGVtSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoU1lTVEVNX0lORk8pO1xuICAgICAgY29uc29sZS5sb2coXCIuXCIgKyBzeXN0ZW1JbmZvLndpbmRvd0hlaWdodCk7XG4gICAgICB0aGF0LndpbkhlaWdodCA9IHN5c3RlbUluZm8ud2luZG93SGVpZ2h0O1xuICAgICAgdGhhdC5nZXRVc2VyU2lnbigpO1xuICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7fVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnZXRDdXJyZW50VGFiKGN1ciwgZXZ0KSB7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhhdC5jdXJyZW50VGFiID0gY3VyO1xuICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog5ruR5Yqo5YiH5o2idGFiXG4gICAgICAgKi9cbiAgICAgIGJpbmRDaGFuZ2UoZSkge1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoYXQuY3VycmVudFRhYiA9IGUuZGV0YWlsLmN1cnJlbnQ7XG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICB9LFxuICAgICAgc2lnbigpIHtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICBpZiAodGhhdC5zaWduZWQpIHtcbiAgICAgICAgICB0aXAuYWxlcnQoXCLkvaDku4rlpKnlt7Lnrb7ov4fkuoYhXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoYXQuZG9TaWduKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZXZlbnRzID0ge31cbiAgfVxuIl19