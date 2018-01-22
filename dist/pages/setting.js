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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      navigationBarTitleText: '设置'
    }, _this.components = {}, _this.data = {
      userInfo: {},
      winHeight: 0
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Messages, [{
    key: 'getUserInfo',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(phone, code) {
        var that, userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context.next = 5;
                return _api2.default.getUserInfo({
                  query: {
                    openId: openId
                  }
                });

              case 5:
                json = _context.sent;

                if (json.data.code == 0) {
                  this.userInfo = json.data.user;
                  console.log("===================");
                  console.log(that.userInfo);
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

      function getUserInfo(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return getUserInfo;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var that = this;

      //设置滚动高度
      var systemInfo = _wepy2.default.getStorageSync(_constant.SYSTEM_INFO);
      that.winHeight = systemInfo.windowHeight;
      this.getUserInfo();
    }
  }]);

  return Messages;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Messages , 'pages/setting'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsiTWVzc2FnZXMiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJ1c2VySW5mbyIsIndpbkhlaWdodCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsInBob25lIiwiY29kZSIsInRoYXQiLCJ1c2VyU3BlY2lhbEluZm8iLCJnZXRTdG9yYWdlU3luYyIsIm9wZW5JZCIsIm9wZW5pZCIsImdldFVzZXJJbmZvIiwicXVlcnkiLCJqc29uIiwidXNlciIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJ0aXAiLCJlcnJvciIsIm1zZyIsInNob3dMb2FkaW5nIiwic3lzdGVtSW5mbyIsIndpbmRvd0hlaWdodCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBSXFCQSxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUdiQyxJLEdBQU87QUFDTEMsZ0JBQVUsRUFETDtBQUVMQyxpQkFBVztBQUZOLEssUUErQlBDLFEsR0FBVyxFLFFBR1hDLE8sR0FBVSxFLFFBSVZDLE0sR0FBUyxFOzs7Ozs7MkZBbENTQyxLLEVBQU1DLEk7Ozs7OztBQUNsQkMsb0IsR0FBTyxJO0FBQ1BDLCtCLEdBQWtCLGVBQUtDLGNBQUwsa0NBQTJDLEU7QUFDN0RDLHNCLEdBQVNGLGdCQUFnQkcsTTs7dUJBQ1YsY0FBSUMsV0FBSixDQUFnQjtBQUNqQ0MseUJBQU87QUFDTEgsNEJBQVFBO0FBREg7QUFEMEIsaUJBQWhCLEM7OztBQUFiSSxvQjs7QUFLTixvQkFBSUEsS0FBS2YsSUFBTCxDQUFVTyxJQUFWLElBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCLHVCQUFLTixRQUFMLEdBQWNjLEtBQUtmLElBQUwsQ0FBVWdCLElBQXhCO0FBQ0FDLDBCQUFRQyxHQUFSLENBQVkscUJBQVo7QUFDQUQsMEJBQVFDLEdBQVIsQ0FBWVYsS0FBS1AsUUFBakI7QUFDQU8sdUJBQUtXLE1BQUw7QUFDRCxpQkFMRCxNQUtPO0FBQ0xDLHNCQUFJQyxLQUFKLENBQVVOLEtBQUtmLElBQUwsQ0FBVXNCLEdBQXBCO0FBQ0Q7QUFDRGQscUJBQUtlLFdBQUwsR0FBbUIsS0FBbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFFTztBQUNQLFVBQUlmLE9BQU8sSUFBWDs7QUFFQTtBQUNBLFVBQUlnQixhQUFhLGVBQUtkLGNBQUwsdUJBQWpCO0FBQ0FGLFdBQUtOLFNBQUwsR0FBaUJzQixXQUFXQyxZQUE1QjtBQUNBLFdBQUtaLFdBQUw7QUFDRDs7OztFQXJDbUMsZUFBS2EsSTs7a0JBQXRCOUIsUSIsImZpbGUiOiJzZXR0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSc7XG5pbXBvcnQge1xuICBTWVNURU1fSU5GTyxcbiAgVVNFUl9TUEVDSUNBTF9JTkZPXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforr7nva4nLFxuICB9XG4gIGNvbXBvbmVudHMgPSB7XG5cbiAgfVxuICBkYXRhID0ge1xuICAgIHVzZXJJbmZvOiB7fSxcbiAgICB3aW5IZWlnaHQ6IDBcbiAgfVxuICBhc3luYyBnZXRVc2VySW5mbyhwaG9uZSxjb2RlKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgbGV0IG9wZW5JZCA9IHVzZXJTcGVjaWFsSW5mby5vcGVuaWQ7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRVc2VySW5mbyh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBvcGVuSWQ6IG9wZW5JZFxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICB0aGlzLnVzZXJJbmZvPWpzb24uZGF0YS51c2VyO1xuICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09XCIpXG4gICAgICBjb25zb2xlLmxvZyh0aGF0LnVzZXJJbmZvKTtcbiAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKVxuICAgIH1cbiAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgIC8v6K6+572u5rua5Yqo6auY5bqmXG4gICAgbGV0IHN5c3RlbUluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFNZU1RFTV9JTkZPKTtcbiAgICB0aGF0LndpbkhlaWdodCA9IHN5c3RlbUluZm8ud2luZG93SGVpZ2h0O1xuICAgIHRoaXMuZ2V0VXNlckluZm8oKTtcbiAgfVxuICBjb21wdXRlZCA9IHtcblxuICB9XG4gIG1ldGhvZHMgPSB7XG5cblxuICB9XG4gIGV2ZW50cyA9IHtcblxuICB9XG5cbn1cblxuIl19