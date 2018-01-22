"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _placeholder = require('./common/placeholder.js');

var _placeholder2 = _interopRequireDefault(_placeholder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PointsDetail = function (_wepy$component) {
  _inherits(PointsDetail, _wepy$component);

  function PointsDetail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PointsDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PointsDetail.__proto__ || Object.getPrototypeOf(PointsDetail)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      list: [],
      is_empty: {
        default: false
      }
    }, _this.$repeat = {}, _this.$props = { "placeholder": { "xmlns:v-bind": "", "v-bind:show.sync": "is_empty", "message": "暂无积分数据" } }, _this.$events = {}, _this.components = {
      placeholder: _placeholder2.default
    }, _this.events = {
      // 'index-broadcast': (...args) => {
      //   let $event = args[args.length - 1]
      //   console.log(`${this.$name} receive ${$event.name} from ${$event.source.name}`)
      // }
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PointsDetail, [{
    key: "onLoad",
    value: function onLoad() {
      // if (this.list.length == 0) {
      //   this.is_empty = true;
      //   this.$apply();

      // }
    }
  }]);

  return PointsDetail;
}(_wepy2.default.component);

exports.default = PointsDetail;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvaW50c19kZXRhaWwuanMiXSwibmFtZXMiOlsiUG9pbnRzRGV0YWlsIiwicHJvcHMiLCJsaXN0IiwiaXNfZW1wdHkiLCJkZWZhdWx0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGxhY2Vob2xkZXIiLCJldmVudHMiLCJtZXRob2RzIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsSyxHQUFRO0FBQ05DLFlBQU0sRUFEQTtBQUVOQyxnQkFBVTtBQUNSQyxpQkFBUztBQUREO0FBRkosSyxRQU1UQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxlQUFjLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsb0JBQW1CLFVBQXRDLEVBQWlELFdBQVUsUUFBM0QsRUFBZixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQztBQURVLEssUUFHWkMsTSxHQUFTO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFKTyxLLFFBT1RDLE8sR0FBVSxFOzs7Ozs2QkFJRDtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNEOzs7O0VBOUJ1QyxlQUFLQyxTOztrQkFBMUJaLFkiLCJmaWxlIjoicG9pbnRzX2RldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBQbGFjZWhvbGRlciBmcm9tIFwiLi9jb21tb24vcGxhY2Vob2xkZXJcIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnRzRGV0YWlsIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBsaXN0OiBbXSxcbiAgICBpc19lbXB0eToge1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9XG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInBsYWNlaG9sZGVyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzaG93LnN5bmNcIjpcImlzX2VtcHR5XCIsXCJtZXNzYWdlXCI6XCLmmoLml6Dnp6/liIbmlbDmja5cIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHBsYWNlaG9sZGVyOiBQbGFjZWhvbGRlclxuICB9XG4gIGV2ZW50cyA9IHtcbiAgICAvLyAnaW5kZXgtYnJvYWRjYXN0JzogKC4uLmFyZ3MpID0+IHtcbiAgICAvLyAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cbiAgICAvLyAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UubmFtZX1gKVxuICAgIC8vIH1cbiAgfVxuXG4gIG1ldGhvZHMgPSB7XG5cbiAgfVxuXG4gIG9uTG9hZCgpIHtcbiAgICAvLyBpZiAodGhpcy5saXN0Lmxlbmd0aCA9PSAwKSB7XG4gICAgLy8gICB0aGlzLmlzX2VtcHR5ID0gdHJ1ZTtcbiAgICAvLyAgIHRoaXMuJGFwcGx5KCk7XG5cbiAgICAvLyB9XG4gIH1cbn1cblxuIl19