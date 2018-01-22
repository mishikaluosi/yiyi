'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _points_rule = require('./../components/points_rule.js');

var _points_rule2 = _interopRequireDefault(_points_rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PointsRules = function (_wepy$page) {
  _inherits(PointsRules, _wepy$page);

  function PointsRules() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PointsRules);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PointsRules.__proto__ || Object.getPrototypeOf(PointsRules)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '积分说明'
    }, _this.components = {
      pointsRule: _points_rule2.default
    }, _this.data = {}, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PointsRules, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
    }
  }]);

  return PointsRules;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PointsRules , 'pages/points_rule'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvaW50c19ydWxlLmpzIl0sIm5hbWVzIjpbIlBvaW50c1J1bGVzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJwb2ludHNSdWxlIiwiZGF0YSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsInRoYXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUliQyxJLEdBQU8sRSxRQVNQQyxRLEdBQVcsRSxRQUdYQyxPLEdBQVUsRSxRQUdWQyxNLEdBQVMsRTs7Ozs7NkJBVkE7QUFDUCxVQUFJQyxPQUFPLElBQVg7QUFFRDs7OztFQWhCc0MsZUFBS0MsSTs7a0JBQXpCVixXIiwiZmlsZSI6InBvaW50c19ydWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSc7XG5pbXBvcnQgUG9pbnRzUnVsZSBmcm9tICcuLi9jb21wb25lbnRzL3BvaW50c19ydWxlJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnRzUnVsZXMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+enr+WIhuivtOaYjicsXG4gIH1cbiAgY29tcG9uZW50cyA9IHtcbiAgICBwb2ludHNSdWxlOiBQb2ludHNSdWxlXG4gIH1cblxuICBkYXRhID0ge1xuXG4gIH1cblxuXG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgfVxuICBjb21wdXRlZCA9IHtcblxuICB9XG4gIG1ldGhvZHMgPSB7XG5cbiAgfVxuICBldmVudHMgPSB7XG5cbiAgfVxufVxuXG4iXX0=