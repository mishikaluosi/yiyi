'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _shop_cart = require('./../components/shop_cart.js');

var _shop_cart2 = _interopRequireDefault(_shop_cart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shopCart = function (_wepy$page) {
  _inherits(shopCart, _wepy$page);

  function shopCart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, shopCart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = shopCart.__proto__ || Object.getPrototypeOf(shopCart)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '购物车'
    }, _this.components = {
      shopCart: _shop_cart2.default
    }, _this.data = {}, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(shopCart, [{
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onShow',
    value: function onShow() {
      this.$invoke('shopCart', 'getCartListMethod');
    }
  }]);

  return shopCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(shopCart , 'pages/shop_cart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BfY2FydC5qcyJdLCJuYW1lcyI6WyJzaG9wQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiZGF0YSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsIiRpbnZva2UiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYTtBQUNYSDtBQURXLEssUUFHYkksSSxHQUFPLEUsUUFTUEMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVLEUsUUFHVkMsTSxHQUFTLEU7Ozs7OzZCQVhBLENBQ1I7Ozs2QkFDUTtBQUNQLFdBQUtDLE9BQUwsQ0FBYSxVQUFiLEVBQXlCLG1CQUF6QjtBQUNEOzs7O0VBZm1DLGVBQUtDLEk7O2tCQUF0QlQsUSIsImZpbGUiOiJzaG9wX2NhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IFNob3BDYXJ0IGZyb20gJy4uL2NvbXBvbmVudHMvc2hvcF9jYXJ0J1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2hvcENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i0reeJqei9picsXG4gIH1cbiAgY29tcG9uZW50cyA9IHtcbiAgICBzaG9wQ2FydDogU2hvcENhcnRcbiAgfVxuICBkYXRhID0ge1xuXG4gIH1cblxuICBvbkxvYWQoKSB7XG4gIH1cbiAgb25TaG93KCkge1xuICAgIHRoaXMuJGludm9rZSgnc2hvcENhcnQnLCAnZ2V0Q2FydExpc3RNZXRob2QnKTtcbiAgfVxuICBjb21wdXRlZCA9IHtcblxuICB9XG4gIG1ldGhvZHMgPSB7XG5cbiAgfVxuICBldmVudHMgPSB7XG5cbiAgfVxufVxuXG4iXX0=