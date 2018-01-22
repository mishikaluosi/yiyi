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

var exchangeGoods = function (_wepy$page) {
  _inherits(exchangeGoods, _wepy$page);

  function exchangeGoods() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, exchangeGoods);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = exchangeGoods.__proto__ || Object.getPrototypeOf(exchangeGoods)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '组件测试'
    }, _this.data = {
      list: [],
      aways: 0
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(exchangeGoods, [{
    key: 'onLoad',
    value: function onLoad() {
      var arry = {
        days: [{
          is_sign: true
        }, {
          is_sign: false
        }, {
          is_sign: false
        }, {
          is_sign: false
        }, {
          is_sign: false
        }, {
          is_sign: false
        }, {
          is_sign: false
        }],
        aways: 3
        // this.list = arry;
      };console.log(arry);
      this.list = arry.days;
      this.aways = arry.aways;
    }
  }]);

  return exchangeGoods;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(exchangeGoods , 'pages/test'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsiZXhjaGFuZ2VHb29kcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibGlzdCIsImF3YXlzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnRzIiwiYXJyeSIsImRheXMiLCJpc19zaWduIiwiY29uc29sZSIsImxvZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFDcUJBLGE7Ozs7Ozs7Ozs7Ozs7O29NQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxZQUFNLEVBREQ7QUFFTEMsYUFBTztBQUZGLEssUUFtQ1BDLFEsR0FBVyxFLFFBQ1hDLE8sR0FBVSxFLFFBQ1ZDLE0sR0FBUyxFOzs7Ozs2QkFqQ0E7QUFDUCxVQUFJQyxPQUFPO0FBQ1RDLGNBQU0sQ0FBQztBQUNIQyxtQkFBUztBQUROLFNBQUQsRUFHSjtBQUNFQSxtQkFBUztBQURYLFNBSEksRUFNSjtBQUNFQSxtQkFBUztBQURYLFNBTkksRUFTSjtBQUNFQSxtQkFBUztBQURYLFNBVEksRUFZSjtBQUNFQSxtQkFBUztBQURYLFNBWkksRUFlSjtBQUNFQSxtQkFBUztBQURYLFNBZkksRUFrQko7QUFDRUEsbUJBQVM7QUFEWCxTQWxCSSxDQURHO0FBdUJUTixlQUFPO0FBRVQ7QUF6QlcsT0FBWCxDQTBCQU8sUUFBUUMsR0FBUixDQUFZSixJQUFaO0FBQ0EsV0FBS0wsSUFBTCxHQUFZSyxLQUFLQyxJQUFqQjtBQUNBLFdBQUtMLEtBQUwsR0FBYUksS0FBS0osS0FBbEI7QUFDRDs7OztFQXRDd0MsZUFBS1MsSTs7a0JBQTNCZCxhIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4Y2hhbmdlR29vZHMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnu4Tku7bmtYvor5UnLFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgbGlzdDogW10sXG4gICAgICBhd2F5czogMFxuICAgIH1cbiAgICBvbkxvYWQoKSB7XG4gICAgICBsZXQgYXJyeSA9IHtcbiAgICAgICAgZGF5czogW3tcbiAgICAgICAgICAgIGlzX3NpZ246IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlzX3NpZ246IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpc19zaWduOiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaXNfc2lnbjogZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlzX3NpZ246IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpc19zaWduOiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaXNfc2lnbjogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGF3YXlzOiAzXG4gICAgICB9XG4gICAgICAvLyB0aGlzLmxpc3QgPSBhcnJ5O1xuICAgICAgY29uc29sZS5sb2coYXJyeSlcbiAgICAgIHRoaXMubGlzdCA9IGFycnkuZGF5cztcbiAgICAgIHRoaXMuYXdheXMgPSBhcnJ5LmF3YXlzO1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHt9XG4gICAgbWV0aG9kcyA9IHt9XG4gICAgZXZlbnRzID0ge31cbiAgfVxuIl19