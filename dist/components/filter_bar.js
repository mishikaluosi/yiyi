'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _filterSlider = require('./filterSlider.js');

var _filterSlider2 = _interopRequireDefault(_filterSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var filterBar = function (_wepy$component) {
  _inherits(filterBar, _wepy$component);

  function filterBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, filterBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = filterBar.__proto__ || Object.getPrototypeOf(filterBar)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      currentType: "",
      arrowType: "",
      flag: false,
      type: "desc"
    }, _this.components = {
      filterSlider: _filterSlider2.default
    }, _this.methods = {
      filterSearch: function filterSearch() {
        this.$invoke('filterSlider', 'swictchOverlay', true);
      },
      orderBy: function orderBy(e) {
        var that = this;
        if (that.data.currentType == e.target.dataset.current) {
          if (e.target.dataset.current !== "price") {
            return false;
          }
        } else {
          that.currentType = e.target.dataset.current;
        }
        that.priceOrderBy(e.target.dataset.current);
        that.$apply();
      }
    }, _this.watch = {
      currentType: function currentType(newValue) {
        this.$emit("currentType", {
          name: newValue,
          type: 'desc'
        });
      },
      arrowType: function arrowType(newValue, oldValue) {
        if (oldValue !== "" && newValue !== "") {
          this.$emit("currentType", {
            name: "price",
            type: newValue
          });
        }
      }
    }, _this.events = {
      filterSku: function filterSku(sku) {
        console.log("filterBar.sku...." + sku);
        this.setSkuVal(sku);
        /*this.$emit("currentType", {
          name: "sku",
          type: sku
        });*/
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(filterBar, [{
    key: 'priceOrderBy',
    value: function priceOrderBy(orderBy) {
      var that = this;
      if (orderBy == "price") {
        if (that.arrowType === "desc") {
          that.arrowType = "asc";
        } else {
          that.arrowType = "desc";
        }
      } else {
        that.arrowType = "";
      }
    }
  }, {
    key: 'setSkuVal',
    value: function setSkuVal(sku) {
      /*this.type = "sku";
      this.currentType = sku;*/
      this.$emit("currentType", {
        name: "sku",
        type: sku
      });
    }
  }]);

  return filterBar;
}(_wepy2.default.component);

exports.default = filterBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlcl9iYXIuanMiXSwibmFtZXMiOlsiZmlsdGVyQmFyIiwiZGF0YSIsImN1cnJlbnRUeXBlIiwiYXJyb3dUeXBlIiwiZmxhZyIsInR5cGUiLCJjb21wb25lbnRzIiwiZmlsdGVyU2xpZGVyIiwibWV0aG9kcyIsImZpbHRlclNlYXJjaCIsIiRpbnZva2UiLCJvcmRlckJ5IiwiZSIsInRoYXQiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiY3VycmVudCIsInByaWNlT3JkZXJCeSIsIiRhcHBseSIsIndhdGNoIiwibmV3VmFsdWUiLCIkZW1pdCIsIm5hbWUiLCJvbGRWYWx1ZSIsImV2ZW50cyIsImZpbHRlclNrdSIsInNrdSIsImNvbnNvbGUiLCJsb2ciLCJzZXRTa3VWYWwiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxJLEdBQU87QUFDTEMsbUJBQWEsRUFEUjtBQUVMQyxpQkFBVyxFQUZOO0FBR0xDLFlBQU0sS0FIRDtBQUlMQyxZQUFNO0FBSkQsSyxRQU1QQyxVLEdBQWE7QUFDWEM7QUFEVyxLLFFBR2JDLE8sR0FBVTtBQUNSQyxrQkFEUSwwQkFDTztBQUNiLGFBQUtDLE9BQUwsQ0FBYSxjQUFiLEVBQTZCLGdCQUE3QixFQUErQyxJQUEvQztBQUNELE9BSE87QUFJUkMsYUFKUSxtQkFJQUMsQ0FKQSxFQUlHO0FBQ1QsWUFBSUMsT0FBTyxJQUFYO0FBQ0EsWUFBSUEsS0FBS1osSUFBTCxDQUFVQyxXQUFWLElBQXlCVSxFQUFFRSxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDLE9BQTlDLEVBQXVEO0FBQ3JELGNBQUlKLEVBQUVFLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkMsT0FBakIsS0FBNkIsT0FBakMsRUFBMEM7QUFDeEMsbUJBQU8sS0FBUDtBQUNEO0FBQ0YsU0FKRCxNQUlPO0FBQ0xILGVBQUtYLFdBQUwsR0FBbUJVLEVBQUVFLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkMsT0FBcEM7QUFDRDtBQUNESCxhQUFLSSxZQUFMLENBQWtCTCxFQUFFRSxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDLE9BQW5DO0FBQ0FILGFBQUtLLE1BQUw7QUFDRDtBQWZPLEssUUF1Q1ZDLEssR0FBUTtBQUNOakIsaUJBRE0sdUJBQ01rQixRQUROLEVBQ2dCO0FBQ3BCLGFBQUtDLEtBQUwsQ0FBVyxhQUFYLEVBQTBCO0FBQ3hCQyxnQkFBTUYsUUFEa0I7QUFFeEJmLGdCQUFNO0FBRmtCLFNBQTFCO0FBSUQsT0FOSztBQU9ORixlQVBNLHFCQU9JaUIsUUFQSixFQU9jRyxRQVBkLEVBT3dCO0FBQzVCLFlBQUlBLGFBQWEsRUFBYixJQUFtQkgsYUFBYSxFQUFwQyxFQUF3QztBQUN0QyxlQUFLQyxLQUFMLENBQVcsYUFBWCxFQUEwQjtBQUN4QkMsa0JBQU0sT0FEa0I7QUFFeEJqQixrQkFBTWU7QUFGa0IsV0FBMUI7QUFJRDtBQUNGO0FBZEssSyxRQWdCUkksTSxHQUFTO0FBQ1BDLGVBRE8scUJBQ0dDLEdBREgsRUFDUTtBQUNiQyxnQkFBUUMsR0FBUixDQUFZLHNCQUFvQkYsR0FBaEM7QUFDQSxhQUFLRyxTQUFMLENBQWVILEdBQWY7QUFDQTs7OztBQUlEO0FBUk0sSzs7Ozs7aUNBdENJZixPLEVBQVM7QUFDcEIsVUFBSUUsT0FBTyxJQUFYO0FBQ0EsVUFBSUYsV0FBVyxPQUFmLEVBQXdCO0FBQ3RCLFlBQUlFLEtBQUtWLFNBQUwsS0FBbUIsTUFBdkIsRUFBK0I7QUFDN0JVLGVBQUtWLFNBQUwsR0FBaUIsS0FBakI7QUFDRCxTQUZELE1BRU87QUFDTFUsZUFBS1YsU0FBTCxHQUFpQixNQUFqQjtBQUNEO0FBQ0YsT0FORCxNQU1PO0FBQ0xVLGFBQUtWLFNBQUwsR0FBaUIsRUFBakI7QUFDRDtBQUNGOzs7OEJBRVV1QixHLEVBQUs7QUFDZDs7QUFFQSxXQUFLTCxLQUFMLENBQVcsYUFBWCxFQUEwQjtBQUN4QkMsY0FBTSxLQURrQjtBQUV4QmpCLGNBQU1xQjtBQUZrQixPQUExQjtBQUlEOzs7O0VBL0NvQyxlQUFLSSxTOztrQkFBdkI5QixTIiwiZmlsZSI6ImZpbHRlcl9iYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCBGaWx0ZXJTbGlkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9maWx0ZXJTbGlkZXInXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGZpbHRlckJhciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgY3VycmVudFR5cGU6IFwiXCIsXG4gICAgICBhcnJvd1R5cGU6IFwiXCIsXG4gICAgICBmbGFnOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiZGVzY1wiXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICBmaWx0ZXJTbGlkZXI6IEZpbHRlclNsaWRlclxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZmlsdGVyU2VhcmNoKCkge1xuICAgICAgICB0aGlzLiRpbnZva2UoJ2ZpbHRlclNsaWRlcicsICdzd2ljdGNoT3ZlcmxheScsIHRydWUpO1xuICAgICAgfSxcbiAgICAgIG9yZGVyQnkoZSkge1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIGlmICh0aGF0LmRhdGEuY3VycmVudFR5cGUgPT0gZS50YXJnZXQuZGF0YXNldC5jdXJyZW50KSB7XG4gICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuY3VycmVudCAhPT0gXCJwcmljZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoYXQuY3VycmVudFR5cGUgPSBlLnRhcmdldC5kYXRhc2V0LmN1cnJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5wcmljZU9yZGVyQnkoZS50YXJnZXQuZGF0YXNldC5jdXJyZW50KVxuICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBwcmljZU9yZGVyQnkob3JkZXJCeSkge1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKG9yZGVyQnkgPT0gXCJwcmljZVwiKSB7XG4gICAgICAgIGlmICh0aGF0LmFycm93VHlwZSA9PT0gXCJkZXNjXCIpIHtcbiAgICAgICAgICB0aGF0LmFycm93VHlwZSA9IFwiYXNjXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhhdC5hcnJvd1R5cGUgPSBcImRlc2NcIjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5hcnJvd1R5cGUgPSBcIlwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNldFNrdVZhbCAoc2t1KSB7XG4gICAgICAvKnRoaXMudHlwZSA9IFwic2t1XCI7XG4gICAgICB0aGlzLmN1cnJlbnRUeXBlID0gc2t1OyovXG4gICAgICB0aGlzLiRlbWl0KFwiY3VycmVudFR5cGVcIiwge1xuICAgICAgICBuYW1lOiBcInNrdVwiLFxuICAgICAgICB0eXBlOiBza3VcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHdhdGNoID0ge1xuICAgICAgY3VycmVudFR5cGUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy4kZW1pdChcImN1cnJlbnRUeXBlXCIsIHtcbiAgICAgICAgICBuYW1lOiBuZXdWYWx1ZSxcbiAgICAgICAgICB0eXBlOiAnZGVzYydcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgYXJyb3dUeXBlKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2xkVmFsdWUgIT09IFwiXCIgJiYgbmV3VmFsdWUgIT09IFwiXCIpIHtcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiY3VycmVudFR5cGVcIiwge1xuICAgICAgICAgICAgbmFtZTogXCJwcmljZVwiLFxuICAgICAgICAgICAgdHlwZTogbmV3VmFsdWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBldmVudHMgPSB7XG4gICAgICBmaWx0ZXJTa3Uoc2t1KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmlsdGVyQmFyLnNrdS4uLi5cIitza3UpO1xuICAgICAgICB0aGlzLnNldFNrdVZhbChza3UpO1xuICAgICAgICAvKnRoaXMuJGVtaXQoXCJjdXJyZW50VHlwZVwiLCB7XG4gICAgICAgICAgbmFtZTogXCJza3VcIixcbiAgICAgICAgICB0eXBlOiBza3VcbiAgICAgICAgfSk7Ki9cbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==