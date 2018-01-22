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

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var paySuccess = function (_wepy$page) {
  _inherits(paySuccess, _wepy$page);

  function paySuccess() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, paySuccess);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = paySuccess.__proto__ || Object.getPrototypeOf(paySuccess)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '支付成功'
    }, _this.data = {
      orderNo: "",
      totalFee: 0
    }, _this.components = {}, _this.computed = {}, _this.methods = {
      goOrderDetail: function goOrderDetail() {
        _wepy2.default.redirectTo({
          url: "/pages/order"
        });
      },
      goIndex: function goIndex() {
        _wepy2.default.switchTab({
          url: "/pages/home"
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(paySuccess, [{
    key: 'getPayOrderDetail',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var that, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                _context.next = 3;
                return _api2.default.getPayOrderDetail({
                  query: {
                    tradeNo: this.orderNo
                  }
                });

              case 3:
                json = _context.sent;

                if (json.data.code == 0) {
                  this.totalFee = json.data.order.totalFee;
                } else {
                  _tip2.default.error(json.data.msg);
                }

                that.$apply();

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getPayOrderDetail() {
        return _ref2.apply(this, arguments);
      }

      return getPayOrderDetail;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      //tip.success('支付成功,接收的参数为' + option.orderNo);
      this.orderNo = option.orderNo;
      this.getPayOrderDetail();
    }
  }]);

  return paySuccess;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(paySuccess , 'pages/pay_success'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheV9zdWNjZXNzLmpzIl0sIm5hbWVzIjpbInBheVN1Y2Nlc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm9yZGVyTm8iLCJ0b3RhbEZlZSIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnb09yZGVyRGV0YWlsIiwicmVkaXJlY3RUbyIsInVybCIsImdvSW5kZXgiLCJzd2l0Y2hUYWIiLCJldmVudHMiLCJ0aGF0IiwiZ2V0UGF5T3JkZXJEZXRhaWwiLCJxdWVyeSIsInRyYWRlTm8iLCJqc29uIiwiY29kZSIsIm9yZGVyIiwiZXJyb3IiLCJtc2ciLCIkYXBwbHkiLCJvcHRpb24iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBSUE7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxVOzs7Ozs7Ozs7Ozs7Ozs4TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsZUFBVSxFQURMO0FBRUxDLGdCQUFVO0FBRkwsSyxRQUlQQyxVLEdBQWEsRSxRQXVCYkMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVO0FBQ1JDLG1CQURRLDJCQUNRO0FBQ2QsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0FMTztBQU1SQyxhQU5RLHFCQU1FO0FBQ1IsdUJBQUtDLFNBQUwsQ0FBZTtBQUNiRixlQUFLO0FBRFEsU0FBZjtBQUdEO0FBVk8sSyxRQWFWRyxNLEdBQVMsRTs7Ozs7Ozs7Ozs7O0FBbkNIQyxvQixHQUFPLEk7O3VCQUNRLGNBQUlDLGlCQUFKLENBQXNCO0FBQ3ZDQyx5QkFBTztBQUNMQyw2QkFBUyxLQUFLZDtBQURUO0FBRGdDLGlCQUF0QixDOzs7QUFBYmUsb0I7O0FBS04sb0JBQUlBLEtBQUtoQixJQUFMLENBQVVpQixJQUFWLElBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCLHVCQUFLZixRQUFMLEdBQWdCYyxLQUFLaEIsSUFBTCxDQUFVa0IsS0FBVixDQUFnQmhCLFFBQWhDO0FBQ0QsaUJBRkQsTUFFTztBQUNMLGdDQUFJaUIsS0FBSixDQUFVSCxLQUFLaEIsSUFBTCxDQUFVb0IsR0FBcEI7QUFDRDs7QUFFRFIscUJBQUtTLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkFFS0MsTSxFQUFRO0FBQ2I7QUFDQSxXQUFLckIsT0FBTCxHQUFlcUIsT0FBT3JCLE9BQXRCO0FBQ0EsV0FBS1ksaUJBQUw7QUFDRDs7OztFQTlCcUMsZUFBS1UsSTs7a0JBQXhCMUIsVSIsImZpbGUiOiJwYXlfc3VjY2Vzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaS9hcGknO1xuaW1wb3J0IHtcbiAgU1lTVEVNX0lORk8sXG4gIFVTRVJfU1BFQ0lDQUxfSU5GT1xufSBmcm9tICcuLi91dGlscy9jb25zdGFudCc7XG5pbXBvcnQgdGlwIGZyb20gJy4uL3V0aWxzL3RpcCdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHBheVN1Y2Nlc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aUr+S7mOaIkOWKnycsXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBvcmRlck5vIDogXCJcIixcbiAgICB0b3RhbEZlZTogMFxuICB9XG4gIGNvbXBvbmVudHMgPSB7XG5cbiAgfVxuICBhc3luYyBnZXRQYXlPcmRlckRldGFpbCgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRQYXlPcmRlckRldGFpbCh7XG4gICAgICBxdWVyeToge1xuICAgICAgICB0cmFkZU5vOiB0aGlzLm9yZGVyTm9cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgdGhpcy50b3RhbEZlZSA9IGpzb24uZGF0YS5vcmRlci50b3RhbEZlZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5tc2cpXG4gICAgfVxuXG4gICAgdGhhdC4kYXBwbHkoKTtcbiAgfVxuICBvbkxvYWQob3B0aW9uKSB7XG4gICAgLy90aXAuc3VjY2Vzcygn5pSv5LuY5oiQ5YqfLOaOpeaUtueahOWPguaVsOS4uicgKyBvcHRpb24ub3JkZXJObyk7XG4gICAgdGhpcy5vcmRlck5vID0gb3B0aW9uLm9yZGVyTm87XG4gICAgdGhpcy5nZXRQYXlPcmRlckRldGFpbCgpO1xuICB9XG4gIGNvbXB1dGVkID0ge1xuXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBnb09yZGVyRGV0YWlsKCkge1xuICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgdXJsOiBcIi9wYWdlcy9vcmRlclwiXG4gICAgICB9KVxuICAgIH0sXG4gICAgZ29JbmRleCgpIHtcbiAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgdXJsOiBcIi9wYWdlcy9ob21lXCJcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZXZlbnRzID0ge1xuXG4gIH1cblxufVxuXG4iXX0=