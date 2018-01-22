'use strict';

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

var PointsRule = function (_wepy$component) {
  _inherits(PointsRule, _wepy$component);

  function PointsRule() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PointsRule);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PointsRule.__proto__ || Object.getPrototypeOf(PointsRule)).call.apply(_ref, [this].concat(args))), _this), _this.data = {}, _this.events = {
      // 'index-broadcast': (...args) => {
      //   let $event = args[args.length - 1]
      //   console.log(`${this.$name} receive ${$event.name} from ${$event.source.name}`)
      // }
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PointsRule, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return PointsRule;
}(_wepy2.default.component);

exports.default = PointsRule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvaW50c19ydWxlLmpzIl0sIm5hbWVzIjpbIlBvaW50c1J1bGUiLCJkYXRhIiwiZXZlbnRzIiwibWV0aG9kcyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxJLEdBQU8sRSxRQUlQQyxNLEdBQVM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUpPLEssUUFPVEMsTyxHQUFVLEU7Ozs7OzZCQUlELENBQUU7Ozs7RUFoQjJCLGVBQUtDLFM7O2tCQUF4QkosVSIsImZpbGUiOiJwb2ludHNfcnVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnRzUnVsZSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgZGF0YSA9IHtcblxuICB9XG5cbiAgZXZlbnRzID0ge1xuICAgIC8vICdpbmRleC1icm9hZGNhc3QnOiAoLi4uYXJncykgPT4ge1xuICAgIC8vICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxuICAgIC8vICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS5uYW1lfWApXG4gICAgLy8gfVxuICB9XG5cbiAgbWV0aG9kcyA9IHtcblxuICB9XG5cbiAgb25Mb2FkKCkge31cbn1cblxuIl19