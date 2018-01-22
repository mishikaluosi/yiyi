'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _constant = require('./../utils/constant.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShopItemList = function (_wepy$component) {
  _inherits(ShopItemList, _wepy$component);

  function ShopItemList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ShopItemList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShopItemList.__proto__ || Object.getPrototypeOf(ShopItemList)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      goodsList: {
        default: []
      },
      list: []
    }, _this.events = {
      // 'index-broadcast': (...args) => {
      //   let $event = args[args.length - 1]
      //   console.log(`${this.$name} receive ${$event.name} from ${$event.source.name}`)
      // }
    }, _this.methods = {
      refreshList: function refreshList(val) {
        if (val == undefined) return;
        console.log("val.....", val);
        this.list = val;
        this.$apply();
      },
      refund: function refund(e) {
        var itemId = e.currentTarget.dataset.id;
        var that = this;
        wx.showModal({
          title: '提示',
          content: '确定要退货吗?',
          success: function success(res) {
            if (res.confirm) {
              that.applyRefund(itemId);
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShopItemList, [{
    key: 'applyRefund',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(itemId) {
        var userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context.next = 4;
                return _api2.default.refundApply({
                  query: {
                    openId: openId,
                    orderItemId: itemId
                  }
                });

              case 4:
                json = _context.sent;

                if (json.data.code == 0) {
                  wx.showModal({
                    title: '提示',
                    content: '你的退货申请已提交,等待审批!',
                    showCancel: false,
                    success: function success(res) {
                      if (res.confirm) {} else if (res.cancel) {}
                    }
                  });
                } else {
                  _tip2.default.error(json.data.msg);
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function applyRefund(_x) {
        return _ref2.apply(this, arguments);
      }

      return applyRefund;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.list = [];
      console.log("加载list============");
      console.log(this.list);
    }
  }]);

  return ShopItemList;
}(_wepy2.default.component);

exports.default = ShopItemList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BfaXRlbV9saXN0LmpzIl0sIm5hbWVzIjpbIlNob3BJdGVtTGlzdCIsInByb3BzIiwiZ29vZHNMaXN0IiwiZGVmYXVsdCIsImxpc3QiLCJldmVudHMiLCJtZXRob2RzIiwicmVmcmVzaExpc3QiLCJ2YWwiLCJ1bmRlZmluZWQiLCJjb25zb2xlIiwibG9nIiwiJGFwcGx5IiwicmVmdW5kIiwiZSIsIml0ZW1JZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJ0aGF0Iiwid3giLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImFwcGx5UmVmdW5kIiwiY2FuY2VsIiwidXNlclNwZWNpYWxJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJvcGVuSWQiLCJvcGVuaWQiLCJyZWZ1bmRBcHBseSIsInF1ZXJ5Iiwib3JkZXJJdGVtSWQiLCJqc29uIiwiZGF0YSIsImNvZGUiLCJzaG93Q2FuY2VsIiwiZXJyb3IiLCJtc2ciLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFLcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXO0FBQ1RDLGlCQUFTO0FBREEsT0FETDtBQUlOQyxZQUFLO0FBSkMsSyxRQU9SQyxNLEdBQVM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUpPLEssUUFpQ1RDLE8sR0FBVTtBQUNSQyxpQkFEUSx1QkFDSUMsR0FESixFQUNRO0FBQ2QsWUFBSUEsT0FBS0MsU0FBVCxFQUFvQjtBQUNwQkMsZ0JBQVFDLEdBQVIsQ0FBWSxVQUFaLEVBQXVCSCxHQUF2QjtBQUNBLGFBQUtKLElBQUwsR0FBWUksR0FBWjtBQUNBLGFBQUtJLE1BQUw7QUFDRCxPQU5PO0FBT1JDLFlBUFEsa0JBT0RDLENBUEMsRUFPRTtBQUNSLFlBQUlDLFNBQVNELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxFQUFyQztBQUNBLFlBQUlDLE9BQU8sSUFBWDtBQUNBQyxXQUFHQyxTQUFILENBQWE7QUFDWEMsaUJBQU8sSUFESTtBQUVYQyxtQkFBUyxTQUZFO0FBR1hDLG1CQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckIsZ0JBQUlBLElBQUlDLE9BQVIsRUFBaUI7QUFDZlAsbUJBQUtRLFdBQUwsQ0FBaUJaLE1BQWpCO0FBQ0QsYUFGRCxNQUVPLElBQUlVLElBQUlHLE1BQVIsRUFBZ0I7QUFDckJsQixzQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDtBQUNGO0FBVFUsU0FBYjtBQVdEO0FBckJPLEs7Ozs7OzsyRkExQlFJLE07Ozs7OztBQUNaYywrQixHQUFrQixlQUFLQyxjQUFMLGtDQUEyQyxFO0FBQzdEQyxzQixHQUFTRixnQkFBZ0JHLE07O3VCQUVWLGNBQUlDLFdBQUosQ0FBZ0I7QUFDakNDLHlCQUFNO0FBQ0pILDRCQUFRQSxNQURKO0FBRUpJLGlDQUFhcEI7QUFGVDtBQUQyQixpQkFBaEIsQzs7O0FBQWJxQixvQjs7QUFNTixvQkFBSUEsS0FBS0MsSUFBTCxDQUFVQyxJQUFWLElBQWdCLENBQXBCLEVBQXVCO0FBQ3JCbEIscUJBQUdDLFNBQUgsQ0FBYTtBQUNYQywyQkFBTyxJQURJO0FBRVhDLDZCQUFTLGlCQUZFO0FBR1hnQixnQ0FBWSxLQUhEO0FBSVhmLDZCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckIsMEJBQUlBLElBQUlDLE9BQVIsRUFBaUIsQ0FDaEIsQ0FERCxNQUNPLElBQUlELElBQUlHLE1BQVIsRUFBZ0IsQ0FDdEI7QUFDRjtBQVJVLG1CQUFiO0FBVUQsaUJBWEQsTUFXTztBQUNMLGdDQUFJWSxLQUFKLENBQVVKLEtBQUtDLElBQUwsQ0FBVUksR0FBcEI7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQTJCTTtBQUNQLFdBQUtyQyxJQUFMLEdBQVUsRUFBVjtBQUNBTSxjQUFRQyxHQUFSLENBQVksb0JBQVo7QUFDQUQsY0FBUUMsR0FBUixDQUFZLEtBQUtQLElBQWpCO0FBQ0Q7Ozs7RUFyRXVDLGVBQUtzQyxTOztrQkFBMUIxQyxZIiwiZmlsZSI6InNob3BfaXRlbV9saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHRpcCBmcm9tICcuLi91dGlscy90aXAnO1xuaW1wb3J0IGFwaSBmcm9tICcuLi9hcGkvYXBpJztcbmltcG9ydCB7XG4gIFNZU1RFTV9JTkZPLFxuICBVU0VSX1NQRUNJQ0FMX0lORk9cbn0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wSXRlbUxpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIGdvb2RzTGlzdDoge1xuICAgICAgZGVmYXVsdDogW11cbiAgICB9LFxuICAgIGxpc3Q6W11cbiAgfVxuXG4gIGV2ZW50cyA9IHtcbiAgICAvLyAnaW5kZXgtYnJvYWRjYXN0JzogKC4uLmFyZ3MpID0+IHtcbiAgICAvLyAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cbiAgICAvLyAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UubmFtZX1gKVxuICAgIC8vIH1cbiAgfVxuXG4gIGFzeW5jIGFwcGx5UmVmdW5kKGl0ZW1JZCkge1xuICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgbGV0IG9wZW5JZCA9IHVzZXJTcGVjaWFsSW5mby5vcGVuaWQ7XG5cbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLnJlZnVuZEFwcGx5KHtcbiAgICAgIHF1ZXJ5OntcbiAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgIG9yZGVySXRlbUlkOiBpdGVtSWRcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGU9PTApIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgY29udGVudDogJ+S9oOeahOmAgOi0p+eUs+ivt+W3suaPkOS6pCznrYnlvoXlrqHmibkhJyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5tc2cpO1xuICAgIH1cbiAgfVxuXG4gIG1ldGhvZHMgPSB7XG4gICAgcmVmcmVzaExpc3QodmFsKXtcbiAgICAgIGlmICh2YWw9PXVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgY29uc29sZS5sb2coXCJ2YWwuLi4uLlwiLHZhbCk7XG4gICAgICB0aGlzLmxpc3QgPSB2YWw7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0sXG4gICAgcmVmdW5kKGUpIHtcbiAgICAgIGxldCBpdGVtSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZDtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgY29udGVudDogJ+ehruWumuimgemAgOi0p+WQlz8nLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHRoYXQuYXBwbHlSZWZ1bmQoaXRlbUlkKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMubGlzdD1bXTtcbiAgICBjb25zb2xlLmxvZyhcIuWKoOi9vWxpc3Q9PT09PT09PT09PT1cIik7XG4gICAgY29uc29sZS5sb2codGhpcy5saXN0KVxuICB9XG59XG5cbiJdfQ==