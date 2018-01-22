'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _constant = require('./../utils/constant.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Register = function (_wepy$page) {
  _inherits(Register, _wepy$page);

  function Register() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Register);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Register.__proto__ || Object.getPrototypeOf(Register)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '绑定手机'
    }, _this.components = {}, _this.data = {
      phone: "",
      sendMsgDisabled: false,
      time: 60
    }, _this.computed = {}, _this.methods = {
      phoneInput: function phoneInput(e) {
        this.phone = e.detail.value;
      },
      sendCode: function sendCode(e) {
        if (this.phone == "") {
          _tip2.default.alert("输入手机号码");
          return false;
        }
        this.sendVerifyCode();
        var that = this;
        that.sendMsgDisabled = true;
        var interval = setInterval(function () {
          if (that.time-- <= 0) {
            that.time = 10;
            that.sendMsgDisabled = false;
            clearInterval(interval);
            that.$apply();
          }
          that.$apply();
        }, 1000);
      },
      formSubmit: function formSubmit(e) {
        var that = this;
        var phone = e.detail.value.phone;
        var code = e.detail.value.code;
        if (phone == "") {
          _tip2.default.alert("输入手机号码");
          return false;
        }
        if (code == "") {
          _tip2.default.alert("输入验证码");
          return false;
        }
        that.registerUser(phone, code);
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Register, [{
    key: 'sendVerifyCode',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _api2.default.sendRandCode({
                  query: {
                    phone: this.phone
                  }
                });

              case 2:
                json = _context.sent;

                if (json.data.code == 0) {
                  _tip2.default.success("发送成功!");
                  that.$apply();
                } else {
                  _tip2.default.error(json.data.msg);
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function sendVerifyCode() {
        return _ref2.apply(this, arguments);
      }

      return sendVerifyCode;
    }()
  }, {
    key: 'registerUser',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(phone, code) {
        var that, userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context2.next = 5;
                return _api2.default.registerUser({
                  query: {
                    openId: openId,
                    mobile: phone,
                    verificationCode: code
                  }
                });

              case 5:
                json = _context2.sent;


                if (json.data.code == 0) {
                  // that.list = json.data.list;
                  _wepy2.default.navigateBack();
                  console.log("绑定成功.....");

                  that.$apply();
                } else {
                  _tip2.default.error(json.data.msg);
                }
                that.showLoading = false;

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function registerUser(_x, _x2) {
        return _ref3.apply(this, arguments);
      }

      return registerUser;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
    }
  }]);

  return Register;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Register , 'pages/register'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdGVyLmpzIl0sIm5hbWVzIjpbIlJlZ2lzdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJkYXRhIiwicGhvbmUiLCJzZW5kTXNnRGlzYWJsZWQiLCJ0aW1lIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwicGhvbmVJbnB1dCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInNlbmRDb2RlIiwiYWxlcnQiLCJzZW5kVmVyaWZ5Q29kZSIsInRoYXQiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIiRhcHBseSIsImZvcm1TdWJtaXQiLCJjb2RlIiwicmVnaXN0ZXJVc2VyIiwiY29uc29sZSIsImxvZyIsInNlbmRSYW5kQ29kZSIsInF1ZXJ5IiwianNvbiIsInN1Y2Nlc3MiLCJlcnJvciIsIm1zZyIsInVzZXJTcGVjaWFsSW5mbyIsImdldFN0b3JhZ2VTeW5jIiwib3BlbklkIiwib3BlbmlkIiwibW9iaWxlIiwidmVyaWZpY2F0aW9uQ29kZSIsIm5hdmlnYXRlQmFjayIsInNob3dMb2FkaW5nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUtxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPO0FBQ0xDLGFBQVEsRUFESDtBQUVMQyx1QkFBaUIsS0FGWjtBQUdMQyxZQUFNO0FBSEQsSyxRQWtEUEMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxDQURILEVBQ007QUFDWixhQUFLTixLQUFMLEdBQWFNLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdEI7QUFDRCxPQUhPO0FBSVJDLGNBSlEsb0JBSUNILENBSkQsRUFJSTtBQUNWLFlBQUksS0FBS04sS0FBTCxJQUFjLEVBQWxCLEVBQXNCO0FBQ3BCLHdCQUFJVSxLQUFKLENBQVUsUUFBVjtBQUNBLGlCQUFPLEtBQVA7QUFDRDtBQUNELGFBQUtDLGNBQUw7QUFDQSxZQUFJQyxPQUFPLElBQVg7QUFDQUEsYUFBS1gsZUFBTCxHQUF1QixJQUF2QjtBQUNBLFlBQUlZLFdBQVdDLFlBQVksWUFBTTtBQUMvQixjQUFLRixLQUFLVixJQUFMLEVBQUQsSUFBaUIsQ0FBckIsRUFBd0I7QUFDdEJVLGlCQUFLVixJQUFMLEdBQVksRUFBWjtBQUNBVSxpQkFBS1gsZUFBTCxHQUF1QixLQUF2QjtBQUNBYywwQkFBY0YsUUFBZDtBQUNBRCxpQkFBS0ksTUFBTDtBQUNEO0FBQ0RKLGVBQUtJLE1BQUw7QUFDRCxTQVJjLEVBUVosSUFSWSxDQUFmO0FBU0QsT0FyQk87QUFzQlJDLGdCQXRCUSxzQkFzQkdYLENBdEJILEVBc0JNO0FBQ1osWUFBSU0sT0FBTyxJQUFYO0FBQ0EsWUFBSVosUUFBUU0sRUFBRUMsTUFBRixDQUFTQyxLQUFULENBQWVSLEtBQTNCO0FBQ0EsWUFBSWtCLE9BQU9aLEVBQUVDLE1BQUYsQ0FBU0MsS0FBVCxDQUFlVSxJQUExQjtBQUNBLFlBQUlsQixTQUFTLEVBQWIsRUFBaUI7QUFDZix3QkFBSVUsS0FBSixDQUFVLFFBQVY7QUFDQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFJUSxRQUFRLEVBQVosRUFBZ0I7QUFDZCx3QkFBSVIsS0FBSixDQUFVLE9BQVY7QUFDQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDREUsYUFBS08sWUFBTCxDQUFrQm5CLEtBQWxCLEVBQXdCa0IsSUFBeEI7QUFDQUUsZ0JBQVFDLEdBQVIsQ0FBWSx3QkFBWixFQUFzQ2YsRUFBRUMsTUFBRixDQUFTQyxLQUEvQztBQUNEO0FBcENPLEs7Ozs7Ozs7Ozs7Ozs7dUJBOUNXLGNBQUljLFlBQUosQ0FBaUI7QUFDbENDLHlCQUFPO0FBQ0x2QiwyQkFBTyxLQUFLQTtBQURQO0FBRDJCLGlCQUFqQixDOzs7QUFBYndCLG9COztBQUtOLG9CQUFJQSxLQUFLekIsSUFBTCxDQUFVbUIsSUFBVixJQUFrQixDQUF0QixFQUF5QjtBQUN2QixnQ0FBSU8sT0FBSixDQUFZLE9BQVo7QUFDQWIsdUJBQUtJLE1BQUw7QUFDRCxpQkFIRCxNQUdPO0FBQ0wsZ0NBQUlVLEtBQUosQ0FBVUYsS0FBS3pCLElBQUwsQ0FBVTRCLEdBQXBCO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEZBR2dCM0IsSyxFQUFNa0IsSTs7Ozs7O0FBQ2ZOLG9CLEdBQU8sSTtBQUNQZ0IsK0IsR0FBa0IsZUFBS0MsY0FBTCxrQ0FBMkMsRTtBQUM3REMsc0IsR0FBU0YsZ0JBQWdCRyxNOzt1QkFDVixjQUFJWixZQUFKLENBQWlCO0FBQ2xDSSx5QkFBTztBQUNMTyw0QkFBUUEsTUFESDtBQUVMRSw0QkFBT2hDLEtBRkY7QUFHTGlDLHNDQUFpQmY7QUFIWjtBQUQyQixpQkFBakIsQzs7O0FBQWJNLG9COzs7QUFRTixvQkFBSUEsS0FBS3pCLElBQUwsQ0FBVW1CLElBQVYsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDdkI7QUFDQSxpQ0FBS2dCLFlBQUw7QUFDQWQsMEJBQVFDLEdBQVIsQ0FBWSxXQUFaOztBQUVBVCx1QkFBS0ksTUFBTDtBQUNELGlCQU5ELE1BTU87QUFDTCxnQ0FBSVUsS0FBSixDQUFVRixLQUFLekIsSUFBTCxDQUFVNEIsR0FBcEI7QUFDRDtBQUNEZixxQkFBS3VCLFdBQUwsR0FBbUIsS0FBbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFJRztBQUNQLFVBQUl2QixPQUFPLElBQVg7QUFHRDs7OztFQXZEbUMsZUFBS3dCLEk7O2tCQUF0QnpDLFEiLCJmaWxlIjoicmVnaXN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGFwaSBmcm9tICcuLi9hcGkvYXBpJztcbmltcG9ydCB0aXAgZnJvbSAnLi4vdXRpbHMvdGlwJ1xuaW1wb3J0IHtcbiAgVVNFUl9TUEVDSUNBTF9JTkZPXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50JztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWdpc3RlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57uR5a6a5omL5py6JyxcbiAgfVxuICBjb21wb25lbnRzID0ge31cblxuICBkYXRhID0ge1xuICAgIHBob25lIDogXCJcIixcbiAgICBzZW5kTXNnRGlzYWJsZWQ6IGZhbHNlLFxuICAgIHRpbWU6IDYwXG4gIH1cblxuICBhc3luYyBzZW5kVmVyaWZ5Q29kZSgpIHtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLnNlbmRSYW5kQ29kZSh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBwaG9uZTogdGhpcy5waG9uZVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICB0aXAuc3VjY2VzcyhcIuWPkemAgeaIkOWKnyFcIik7XG4gICAgICB0aGF0LiRhcHBseSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLm1zZylcbiAgICB9XG4gIH1cblxuICBhc3luYyByZWdpc3RlclVzZXIocGhvbmUsY29kZSkge1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgICAgIGxldCBvcGVuSWQgPSB1c2VyU3BlY2lhbEluZm8ub3BlbmlkO1xuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLnJlZ2lzdGVyVXNlcih7XG4gICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgIG9wZW5JZDogb3BlbklkLFxuICAgICAgICAgICAgbW9iaWxlOnBob25lLFxuICAgICAgICAgICAgdmVyaWZpY2F0aW9uQ29kZTpjb2RlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgICAgIC8vIHRoYXQubGlzdCA9IGpzb24uZGF0YS5saXN0O1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCLnu5HlrprmiJDlip8uLi4uLlwiKTtcblxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5tc2cpXG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5zaG93TG9hZGluZyA9IGZhbHNlO1xuICAgICAgfVxuXG5cbiAgb25Mb2FkKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcblxuXG4gIH1cbiAgY29tcHV0ZWQgPSB7XG5cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHBob25lSW5wdXQoZSkge1xuICAgICAgdGhpcy5waG9uZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgIH0sXG4gICAgc2VuZENvZGUoZSkge1xuICAgICAgaWYgKHRoaXMucGhvbmUgPT0gXCJcIikge1xuICAgICAgICB0aXAuYWxlcnQoXCLovpPlhaXmiYvmnLrlj7fnoIFcIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VuZFZlcmlmeUNvZGUoKTtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuc2VuZE1zZ0Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKCh0aGF0LnRpbWUtLSkgPD0gMCkge1xuICAgICAgICAgIHRoYXQudGltZSA9IDEwO1xuICAgICAgICAgIHRoYXQuc2VuZE1zZ0Rpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSxcbiAgICBmb3JtU3VibWl0KGUpIHtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIGxldCBwaG9uZSA9IGUuZGV0YWlsLnZhbHVlLnBob25lO1xuICAgICAgbGV0IGNvZGUgPSBlLmRldGFpbC52YWx1ZS5jb2RlO1xuICAgICAgaWYgKHBob25lID09IFwiXCIpIHtcbiAgICAgICAgdGlwLmFsZXJ0KFwi6L6T5YWl5omL5py65Y+356CBXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoY29kZSA9PSBcIlwiKSB7XG4gICAgICAgIHRpcC5hbGVydChcIui+k+WFpemqjOivgeeggVwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhhdC5yZWdpc3RlclVzZXIocGhvbmUsY29kZSk7XG4gICAgICBjb25zb2xlLmxvZygnZm9ybeWPkeeUn+S6hnN1Ym1pdOS6i+S7tu+8jOaQuuW4puaVsOaNruS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxuICAgIH1cbiAgfVxufVxuXG4iXX0=