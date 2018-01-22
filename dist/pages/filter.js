'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_wepy$page) {
  _inherits(Filter, _wepy$page);

  function Filter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Filter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Filter.__proto__ || Object.getPrototypeOf(Filter)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '筛选'
    }, _this.data = {}, _this.components = {}, _this.computed = {}, _this.methods = {
      SearchFilter: function SearchFilter() {
        console.log("^66666");
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Filter, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Filter;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/filter'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlci5qcyJdLCJuYW1lcyI6WyJGaWx0ZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJTZWFyY2hGaWx0ZXIiLCJjb25zb2xlIiwibG9nIiwiZXZlbnRzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPLEUsUUFHUEMsVSxHQUFhLEUsUUFPYkMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVO0FBQ05DLGtCQURNLDBCQUNRO0FBQ1pDLGdCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNEO0FBSEssSyxRQU1WQyxNLEdBQVMsRTs7Ozs7NkJBWkEsQ0FFUjs7OztFQWJpQyxlQUFLQyxJOztrQkFBcEJYLE0iLCJmaWxlIjoiZmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsdGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnrZvpgIknLFxuICB9XG4gIGRhdGEgPSB7XG5cbiAgfVxuICBjb21wb25lbnRzID0ge1xuXG4gIH1cblxuICBvbkxvYWQoKSB7XG5cbiAgfVxuICBjb21wdXRlZCA9IHtcblxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgICBTZWFyY2hGaWx0ZXIoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJeNjY2NjZcIilcbiAgICAgIH1cbiAgfVxuXG4gIGV2ZW50cyA9IHtcblxuICB9XG5cbn1cblxuIl19