"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_wepy$component) {
  _inherits(Filter, _wepy$component);

  function Filter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Filter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Filter.__proto__ || Object.getPrototypeOf(Filter)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      currentTab: {
        default: 0
      },
      tabList: {
        type: Object
      }
    }, _this.methods = {
      /**
       * 点击tab切换
       */
      swichNav: function swichNav(e) {
        var that = this;
        if (this.data.currentTab == e.target.dataset.current) {
          return false;
        } else {
          that.currentTab = e.target.dataset.current;
          that.$apply();
        }
        this.$emit("currentTab", that.currentTab);
      },

      /**
       * 头部红点标识
       * @param  {[type]} dotList [description]
       * @return {[type]}         [description]
       */
      changeList: function changeList(dotList) {
        this.tabList = dotList;
      }
    }, _this.watch = {
      currentTab: function currentTab(newValue, oldValue) {
        console.log("currentTab value: " + oldValue + " -> " + newValue);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Filter, [{
    key: "onLoad",
    value: function onLoad() {
      var that = this;
    }
  }]);

  return Filter;
}(_wepy2.default.component);

exports.default = Filter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYi5qcyJdLCJuYW1lcyI6WyJGaWx0ZXIiLCJwcm9wcyIsImN1cnJlbnRUYWIiLCJkZWZhdWx0IiwidGFiTGlzdCIsInR5cGUiLCJPYmplY3QiLCJtZXRob2RzIiwic3dpY2hOYXYiLCJlIiwidGhhdCIsImRhdGEiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiY3VycmVudCIsIiRhcHBseSIsIiRlbWl0IiwiY2hhbmdlTGlzdCIsImRvdExpc3QiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJjb25zb2xlIiwibG9nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLEssR0FBUTtBQUNOQyxrQkFBWTtBQUNWQyxpQkFBUztBQURDLE9BRE47QUFJTkMsZUFBUztBQUNQQyxjQUFNQztBQURDO0FBSkgsSyxRQVNSQyxPLEdBQVU7QUFDUjs7O0FBR0FDLGNBSlEsb0JBSUNDLENBSkQsRUFJSTtBQUNWLFlBQUlDLE9BQU8sSUFBWDtBQUNBLFlBQUksS0FBS0MsSUFBTCxDQUFVVCxVQUFWLElBQXdCTyxFQUFFRyxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDLE9BQTdDLEVBQXNEO0FBQ3BELGlCQUFPLEtBQVA7QUFDRCxTQUZELE1BRU87QUFDTEosZUFBS1IsVUFBTCxHQUFrQk8sRUFBRUcsTUFBRixDQUFTQyxPQUFULENBQWlCQyxPQUFuQztBQUNBSixlQUFLSyxNQUFMO0FBQ0Q7QUFDRCxhQUFLQyxLQUFMLENBQVcsWUFBWCxFQUF5Qk4sS0FBS1IsVUFBOUI7QUFDRCxPQWJPOztBQWNSOzs7OztBQUtBZSxnQkFuQlEsc0JBbUJHQyxPQW5CSCxFQW1CWTtBQUNsQixhQUFLZCxPQUFMLEdBQWVjLE9BQWY7QUFDRDtBQXJCTyxLLFFBNkJWQyxLLEdBQVE7QUFDTmpCLGdCQURNLHNCQUNLa0IsUUFETCxFQUNlQyxRQURmLEVBQ3lCO0FBQzdCQyxnQkFBUUMsR0FBUix3QkFBaUNGLFFBQWpDLFlBQWdERCxRQUFoRDtBQUNEO0FBSEssSzs7Ozs7NkJBSkM7QUFDUCxVQUFJVixPQUFPLElBQVg7QUFFRDs7OztFQXRDaUMsZUFBS2MsUzs7a0JBQXBCeEIsTSIsImZpbGUiOiJ0YWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbHRlciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgY3VycmVudFRhYjoge1xuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG4gICAgdGFiTGlzdDoge1xuICAgICAgdHlwZTogT2JqZWN0XG4gICAgfVxuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICAvKipcbiAgICAgKiDngrnlh7t0YWLliIfmjaJcbiAgICAgKi9cbiAgICBzd2ljaE5hdihlKSB7XG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAodGhpcy5kYXRhLmN1cnJlbnRUYWIgPT0gZS50YXJnZXQuZGF0YXNldC5jdXJyZW50KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoYXQuY3VycmVudFRhYiA9IGUudGFyZ2V0LmRhdGFzZXQuY3VycmVudDtcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVtaXQoXCJjdXJyZW50VGFiXCIsIHRoYXQuY3VycmVudFRhYilcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOWktOmDqOe6oueCueagh+ivhlxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0gZG90TGlzdCBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBjaGFuZ2VMaXN0KGRvdExpc3QpIHtcbiAgICAgIHRoaXMudGFiTGlzdCA9IGRvdExpc3Q7XG4gICAgfVxuICB9XG5cblxuICBvbkxvYWQoKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gIH1cbiAgd2F0Y2ggPSB7XG4gICAgY3VycmVudFRhYihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50VGFiIHZhbHVlOiAke29sZFZhbHVlfSAtPiAke25ld1ZhbHVlfWApXG4gICAgfVxuICB9XG59XG5cbiJdfQ==