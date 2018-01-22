'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Counter = function (_wepy$component) {
  _inherits(Counter, _wepy$component);

  function Counter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Counter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Counter.__proto__ || Object.getPrototypeOf(Counter)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      swipeData: {
        type: Object,
        default: []
      }
    }, _this.data = {
      startX: null,
      moveX: null
    }, _this.methods = {
      ts: function ts(e) {
        if (e.touches.length === 1) {
          this.startX = e.touches[0].clientX;
          this.moveX = e.touches[0].clientX;
        }
      },
      tm: function tm(e) {
        if (e.touches.length === 1) {
          // 手指起始点位置与移动期间的差值
          var distenceX = this.moveX - e.touches[0].clientX;
          this.moveX = e.touches[0].clientX;

          if (this.swipeData.style - distenceX < -140) {
            this.swipeData.style = -140;
          } else if (this.swipeData.style - distenceX > 0) {
            this.swipeData.style = 0;
          } else {
            this.swipeData.style = this.swipeData.style - distenceX;
          }
          this.setData({
            swipeData: this.props.swipeData
          });
        }
      },
      te: function te(e) {
        if (e.changedTouches.length === 1) {
          if (this.swipeData.style <= -70) {
            this.swipeData.style = -140;
          } else {
            this.swipeData.style = 0;
          }
          this.setData({
            swipeData: this.props.swipeData
          });
        }
      },
      handleRightBtnTap: function handleRightBtnTap(item) {
        item = JSON.parse(JSON.stringify(item));
        delete item.style;
        this.$emit('delItem', item);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Counter, [{
    key: 'onLoad',
    value: function onLoad() {
      if (this.swipeData) {
        this.swipeData.style = 0;
      }
    }
  }]);

  return Counter;
}(_wepy2.default.component);

exports.default = Counter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlcHktc3dpcGUtZGVsZXRlLmpzIl0sIm5hbWVzIjpbIkNvdW50ZXIiLCJwcm9wcyIsInN3aXBlRGF0YSIsInR5cGUiLCJPYmplY3QiLCJkZWZhdWx0IiwiZGF0YSIsInN0YXJ0WCIsIm1vdmVYIiwibWV0aG9kcyIsInRzIiwiZSIsInRvdWNoZXMiLCJsZW5ndGgiLCJjbGllbnRYIiwidG0iLCJkaXN0ZW5jZVgiLCJzdHlsZSIsInNldERhdGEiLCJ0ZSIsImNoYW5nZWRUb3VjaGVzIiwiaGFuZGxlUmlnaHRCdG5UYXAiLCJpdGVtIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiJGVtaXQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXO0FBQ1RDLGNBQU1DLE1BREc7QUFFVEMsaUJBQVM7QUFGQTtBQURMLEssUUFPUkMsSSxHQUFPO0FBQ0xDLGNBQVEsSUFESDtBQUVMQyxhQUFPO0FBRkYsSyxRQVdQQyxPLEdBQVU7QUFDUkMsUUFEUSxjQUNMQyxDQURLLEVBQ0Y7QUFDSixZQUFJQSxFQUFFQyxPQUFGLENBQVVDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsZUFBS04sTUFBTCxHQUFjSSxFQUFFQyxPQUFGLENBQVUsQ0FBVixFQUFhRSxPQUEzQjtBQUNBLGVBQUtOLEtBQUwsR0FBYUcsRUFBRUMsT0FBRixDQUFVLENBQVYsRUFBYUUsT0FBMUI7QUFDRDtBQUNGLE9BTk87QUFPUkMsUUFQUSxjQU9MSixDQVBLLEVBT0Y7QUFDSixZQUFJQSxFQUFFQyxPQUFGLENBQVVDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQSxjQUFJRyxZQUFZLEtBQUtSLEtBQUwsR0FBYUcsRUFBRUMsT0FBRixDQUFVLENBQVYsRUFBYUUsT0FBMUM7QUFDQSxlQUFLTixLQUFMLEdBQWFHLEVBQUVDLE9BQUYsQ0FBVSxDQUFWLEVBQWFFLE9BQTFCOztBQUVBLGNBQUssS0FBS1osU0FBTCxDQUFlZSxLQUFmLEdBQXVCRCxTQUF4QixHQUFxQyxDQUFDLEdBQTFDLEVBQStDO0FBQzdDLGlCQUFLZCxTQUFMLENBQWVlLEtBQWYsR0FBdUIsQ0FBQyxHQUF4QjtBQUNELFdBRkQsTUFFTyxJQUFLLEtBQUtmLFNBQUwsQ0FBZWUsS0FBZixHQUF1QkQsU0FBeEIsR0FBcUMsQ0FBekMsRUFBNEM7QUFDakQsaUJBQUtkLFNBQUwsQ0FBZWUsS0FBZixHQUF1QixDQUF2QjtBQUNELFdBRk0sTUFFQTtBQUNMLGlCQUFLZixTQUFMLENBQWVlLEtBQWYsR0FBdUIsS0FBS2YsU0FBTCxDQUFlZSxLQUFmLEdBQXVCRCxTQUE5QztBQUNEO0FBQ0QsZUFBS0UsT0FBTCxDQUFhO0FBQ1hoQix1QkFBVyxLQUFLRCxLQUFMLENBQVdDO0FBRFgsV0FBYjtBQUdEO0FBQ0YsT0F4Qk87QUEwQlJpQixRQTFCUSxjQTBCTFIsQ0ExQkssRUEwQkY7QUFDSixZQUFJQSxFQUFFUyxjQUFGLENBQWlCUCxNQUFqQixLQUE0QixDQUFoQyxFQUFtQztBQUNqQyxjQUFJLEtBQUtYLFNBQUwsQ0FBZWUsS0FBZixJQUF3QixDQUFDLEVBQTdCLEVBQWlDO0FBQy9CLGlCQUFLZixTQUFMLENBQWVlLEtBQWYsR0FBdUIsQ0FBQyxHQUF4QjtBQUNELFdBRkQsTUFFTztBQUNMLGlCQUFLZixTQUFMLENBQWVlLEtBQWYsR0FBdUIsQ0FBdkI7QUFDRDtBQUNELGVBQUtDLE9BQUwsQ0FBYTtBQUNYaEIsdUJBQVcsS0FBS0QsS0FBTCxDQUFXQztBQURYLFdBQWI7QUFHRDtBQUNGLE9BckNPO0FBc0NSbUIsdUJBdENRLDZCQXNDVUMsSUF0Q1YsRUFzQ2dCO0FBQ3RCQSxlQUFPQyxLQUFLQyxLQUFMLENBQVdELEtBQUtFLFNBQUwsQ0FBZUgsSUFBZixDQUFYLENBQVA7QUFDQSxlQUFPQSxLQUFLTCxLQUFaO0FBQ0EsYUFBS1MsS0FBTCxDQUFXLFNBQVgsRUFBc0JKLElBQXRCO0FBQ0Q7QUExQ08sSzs7Ozs7NkJBTkQ7QUFDUCxVQUFJLEtBQUtwQixTQUFULEVBQW9CO0FBQ2xCLGFBQUtBLFNBQUwsQ0FBZWUsS0FBZixHQUF1QixDQUF2QjtBQUNEO0FBQ0Y7Ozs7RUFqQmtDLGVBQUtVLFM7O2tCQUFyQjNCLE8iLCJmaWxlIjoid2VweS1zd2lwZS1kZWxldGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdW50ZXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIHN3aXBlRGF0YToge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgZGVmYXVsdDogW11cbiAgICB9XG4gIH1cblxuICBkYXRhID0ge1xuICAgIHN0YXJ0WDogbnVsbCxcbiAgICBtb3ZlWDogbnVsbFxuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIGlmICh0aGlzLnN3aXBlRGF0YSkge1xuICAgICAgdGhpcy5zd2lwZURhdGEuc3R5bGUgPSAwO1xuICAgIH1cbiAgfVxuXG4gIG1ldGhvZHMgPSB7XG4gICAgdHMoZSkge1xuICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGhpcy5zdGFydFggPSBlLnRvdWNoZXNbMF0uY2xpZW50WFxuICAgICAgICB0aGlzLm1vdmVYID0gZS50b3VjaGVzWzBdLmNsaWVudFhcbiAgICAgIH1cbiAgICB9LFxuICAgIHRtKGUpIHtcbiAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIC8vIOaJi+aMh+i1t+Wni+eCueS9jee9ruS4juenu+WKqOacn+mXtOeahOW3ruWAvFxuICAgICAgICB2YXIgZGlzdGVuY2VYID0gdGhpcy5tb3ZlWCAtIGUudG91Y2hlc1swXS5jbGllbnRYXG4gICAgICAgIHRoaXMubW92ZVggPSBlLnRvdWNoZXNbMF0uY2xpZW50WFxuXG4gICAgICAgIGlmICgodGhpcy5zd2lwZURhdGEuc3R5bGUgLSBkaXN0ZW5jZVgpIDwgLTE0MCkge1xuICAgICAgICAgIHRoaXMuc3dpcGVEYXRhLnN0eWxlID0gLTE0MFxuICAgICAgICB9IGVsc2UgaWYgKCh0aGlzLnN3aXBlRGF0YS5zdHlsZSAtIGRpc3RlbmNlWCkgPiAwKSB7XG4gICAgICAgICAgdGhpcy5zd2lwZURhdGEuc3R5bGUgPSAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zd2lwZURhdGEuc3R5bGUgPSB0aGlzLnN3aXBlRGF0YS5zdHlsZSAtIGRpc3RlbmNlWFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgc3dpcGVEYXRhOiB0aGlzLnByb3BzLnN3aXBlRGF0YVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0ZShlKSB7XG4gICAgICBpZiAoZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaWYgKHRoaXMuc3dpcGVEYXRhLnN0eWxlIDw9IC03MCkge1xuICAgICAgICAgIHRoaXMuc3dpcGVEYXRhLnN0eWxlID0gLTE0MFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3dpcGVEYXRhLnN0eWxlID0gMFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgc3dpcGVEYXRhOiB0aGlzLnByb3BzLnN3aXBlRGF0YVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlUmlnaHRCdG5UYXAoaXRlbSkge1xuICAgICAgaXRlbSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaXRlbSkpXG4gICAgICBkZWxldGUgaXRlbS5zdHlsZVxuICAgICAgdGhpcy4kZW1pdCgnZGVsSXRlbScsIGl0ZW0pXG4gICAgfVxuICB9XG59XG5cbiJdfQ==