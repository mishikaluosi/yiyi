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

var Rate = function (_wepy$component) {
  _inherits(Rate, _wepy$component);

  function Rate() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Rate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Rate.__proto__ || Object.getPrototypeOf(Rate)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      readonly: {
        default: false
      },
      key: {
        default: 0
      }
    }, _this.data = {
      stars: [0, 1, 2, 3, 4],
      normalSrc: '../images/normal.png',
      selectedSrc: '../images/selected.png',
      halfSrc: '../images/half.png'
    }, _this.events = {}, _this.methods = {
      //点击右边,半颗星
      selectLeft: function selectLeft(e) {
        var key = e.currentTarget.dataset.key;
        if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
          //只有一颗星的时候,再次点击,变为0颗
          this.key = 0;
        }
        this.key = key;
        this.$emit("change", this.key);
      },
      //点击左边,整颗星
      selectRight: function selectRight(e) {
        var key = e.currentTarget.dataset.key;
        this.key = key;
        this.$emit("change", this.key);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Rate, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Rate;
}(_wepy2.default.component);

exports.default = Rate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJhdGUuanMiXSwibmFtZXMiOlsiUmF0ZSIsInByb3BzIiwicmVhZG9ubHkiLCJkZWZhdWx0Iiwia2V5IiwiZGF0YSIsInN0YXJzIiwibm9ybWFsU3JjIiwic2VsZWN0ZWRTcmMiLCJoYWxmU3JjIiwiZXZlbnRzIiwibWV0aG9kcyIsInNlbGVjdExlZnQiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCIkZW1pdCIsInNlbGVjdFJpZ2h0IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLEssR0FBUTtBQUNOQyxnQkFBVTtBQUNSQyxpQkFBUztBQURELE9BREo7QUFJTkMsV0FBSztBQUNIRCxpQkFBUztBQUROO0FBSkMsSyxRQVFSRSxJLEdBQU87QUFDTEMsYUFBTyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLENBREY7QUFFTEMsaUJBQVcsc0JBRk47QUFHTEMsbUJBQWEsd0JBSFI7QUFJTEMsZUFBUztBQUpKLEssUUFPUEMsTSxHQUFTLEUsUUFHVEMsTyxHQUFVO0FBQ1I7QUFDQUMsa0JBQVksb0JBQVNDLENBQVQsRUFBWTtBQUN0QixZQUFJVCxNQUFNUyxFQUFFQyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QlgsR0FBbEM7QUFDQSxZQUFJLEtBQUtDLElBQUwsQ0FBVUQsR0FBVixJQUFpQixHQUFqQixJQUF3QlMsRUFBRUMsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JYLEdBQXhCLElBQStCLEdBQTNELEVBQWdFO0FBQzlEO0FBQ0EsZUFBS0EsR0FBTCxHQUFXLENBQVg7QUFDRDtBQUNELGFBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUNBLGFBQUtZLEtBQUwsQ0FBVyxRQUFYLEVBQXFCLEtBQUtaLEdBQTFCO0FBQ0QsT0FWTztBQVdSO0FBQ0FhLG1CQUFhLHFCQUFTSixDQUFULEVBQVk7QUFDdkIsWUFBSVQsTUFBTVMsRUFBRUMsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JYLEdBQWxDO0FBQ0EsYUFBS0EsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsYUFBS1ksS0FBTCxDQUFXLFFBQVgsRUFBcUIsS0FBS1osR0FBMUI7QUFDRDtBQWhCTyxLOzs7Ozs2QkFtQkQsQ0FFUjs7OztFQXhDK0IsZUFBS2MsUzs7a0JBQWxCbEIsSSIsImZpbGUiOiJyYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdGUgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIHJlYWRvbmx5OiB7XG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAga2V5OiB7XG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcbiAgfVxuICBkYXRhID0ge1xuICAgIHN0YXJzOiBbMCwgMSwgMiwgMywgNF0sXG4gICAgbm9ybWFsU3JjOiAnLi4vaW1hZ2VzL25vcm1hbC5wbmcnLFxuICAgIHNlbGVjdGVkU3JjOiAnLi4vaW1hZ2VzL3NlbGVjdGVkLnBuZycsXG4gICAgaGFsZlNyYzogJy4uL2ltYWdlcy9oYWxmLnBuZycsXG4gIH1cblxuICBldmVudHMgPSB7XG5cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIC8v54K55Ye75Y+z6L65LOWNiumil+aYn1xuICAgIHNlbGVjdExlZnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBrZXkgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5rZXk7XG4gICAgICBpZiAodGhpcy5kYXRhLmtleSA9PSAwLjUgJiYgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQua2V5ID09IDAuNSkge1xuICAgICAgICAvL+WPquacieS4gOmil+aYn+eahOaXtuWAmSzlho3mrKHngrnlh7ss5Y+Y5Li6MOmil1xuICAgICAgICB0aGlzLmtleSA9IDA7XG4gICAgICB9XG4gICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgdGhpcy5rZXkpXG4gICAgfSxcbiAgICAvL+eCueWHu+W3pui+uSzmlbTpopfmmJ9cbiAgICBzZWxlY3RSaWdodDogZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIGtleSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmtleTtcbiAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgdGhpcy4kZW1pdChcImNoYW5nZVwiLCB0aGlzLmtleSlcbiAgICB9XG4gIH1cblxuICBvbkxvYWQoKSB7XG5cbiAgfVxufVxuXG4iXX0=