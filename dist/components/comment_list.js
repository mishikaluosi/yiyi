'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _constant = require('./../utils/constant.js');

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _rate = require('./rate.js');

var _rate2 = _interopRequireDefault(_rate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentList = function (_wepy$component) {
  _inherits(CommentList, _wepy$component);

  function CommentList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CommentList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CommentList.__proto__ || Object.getPrototypeOf(CommentList)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      list: {
        type: Object,
        default: []
      }
    }, _this.data = {
      readonly: true
    }, _this.$repeat = { "list": { "com": "rate", "props": "" } }, _this.$props = { "rate": { "xmlns:v-bind": { "value": "", "for": "list", "item": "item", "index": "index", "key": "key" }, "v-bind:readonly.once": { "value": "readonly", "for": "list", "item": "item", "index": "index", "key": "key" }, "v-bind:key.once": { "value": "item.start", "for": "list", "item": "item", "index": "index", "key": "key" } } }, _this.$events = {}, _this.components = {
      rate: _rate2.default
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CommentList, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return CommentList;
}(_wepy2.default.component);

exports.default = CommentList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnRfbGlzdC5qcyJdLCJuYW1lcyI6WyJDb21tZW50TGlzdCIsInByb3BzIiwibGlzdCIsInR5cGUiLCJPYmplY3QiLCJkZWZhdWx0IiwiZGF0YSIsInJlYWRvbmx5IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmF0ZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFJQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsSyxHQUFRO0FBQ05DLFlBQU07QUFDSkMsY0FBTUMsTUFERjtBQUVKQyxpQkFBUztBQUZMO0FBREEsSyxRQU1SQyxJLEdBQU87QUFDTEMsZ0JBQVU7QUFETCxLLFFBR1JDLE8sR0FBVSxFQUFDLFFBQU8sRUFBQyxPQUFNLE1BQVAsRUFBYyxTQUFRLEVBQXRCLEVBQVIsRSxRQUNYQyxNLEdBQVMsRUFBQyxRQUFPLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLE1BQWxCLEVBQXlCLFFBQU8sTUFBaEMsRUFBdUMsU0FBUSxPQUEvQyxFQUF1RCxPQUFNLEtBQTdELEVBQWhCLEVBQW9GLHdCQUF1QixFQUFDLFNBQVEsVUFBVCxFQUFvQixPQUFNLE1BQTFCLEVBQWlDLFFBQU8sTUFBeEMsRUFBK0MsU0FBUSxPQUF2RCxFQUErRCxPQUFNLEtBQXJFLEVBQTNHLEVBQXVMLG1CQUFrQixFQUFDLFNBQVEsWUFBVCxFQUFzQixPQUFNLE1BQTVCLEVBQW1DLFFBQU8sTUFBMUMsRUFBaUQsU0FBUSxPQUF6RCxFQUFpRSxPQUFNLEtBQXZFLEVBQXpNLEVBQVIsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkM7QUFEVSxLLFFBUVpDLFEsR0FBVyxFLFFBTVhDLE8sR0FBVSxFLFFBR1ZDLE0sR0FBUyxFOzs7Ozs2QkFiQSxDQUdSOzs7O0VBcEJzQyxlQUFLQyxTOztrQkFBekJoQixXIiwiZmlsZSI6ImNvbW1lbnRfbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQge1xuICBTWVNURU1fSU5GTyxcbiAgVVNFUl9TUEVDSUNBTF9JTkZPXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50JztcbmltcG9ydCB0aXAgZnJvbSAnLi4vdXRpbHMvdGlwJ1xuaW1wb3J0IFJhdGUgZnJvbSAnLi9yYXRlJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWVudExpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIGxpc3Q6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHQ6IFtdXG4gICAgfVxuICB9XG4gIGRhdGEgPSB7XG4gICAgcmVhZG9ubHk6IHRydWVcbiAgfVxuICRyZXBlYXQgPSB7XCJsaXN0XCI6e1wiY29tXCI6XCJyYXRlXCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wicmF0ZVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwibGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpyZWFkb25seS5vbmNlXCI6e1widmFsdWVcIjpcInJlYWRvbmx5XCIsXCJmb3JcIjpcImxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6a2V5Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5zdGFydFwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgcmF0ZTogUmF0ZVxuICB9XG5cbiAgb25Mb2FkKCkge1xuXG5cbiAgfVxuICBjb21wdXRlZCA9IHtcblxuICB9XG5cblxuXG4gIG1ldGhvZHMgPSB7XG5cbiAgfVxuICBldmVudHMgPSB7XG5cbiAgfVxufVxuXG4iXX0=