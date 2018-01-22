'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _shop_grid_list = require('./../components/shop_grid_list.js');

var _shop_grid_list2 = _interopRequireDefault(_shop_grid_list);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _bottomLoadMore = require('./../components/common/bottomLoadMore.js');

var _bottomLoadMore2 = _interopRequireDefault(_bottomLoadMore);

var _placeholder = require('./../components/common/placeholder.js');

var _placeholder2 = _interopRequireDefault(_placeholder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wholesale = function (_wepy$page) {
  _inherits(wholesale, _wepy$page);

  function wholesale() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, wholesale);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = wholesale.__proto__ || Object.getPrototypeOf(wholesale)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '特价专区'
    }, _this.$repeat = {}, _this.$props = { "shopGridList": { "xmlns:v-bind": "", "v-bind:purchasetype.sync": "purchasetype", "v-bind:special.sync": "special", "v-bind:list.sync": "list" }, "bottomLoadMore": { "xmlns:v-bind": "", "v-bind:show.sync": "showLoading", "message": "正在加载" }, "placeholder": { "xmlns:v-bind": "", "v-bind:show.sync": "is_empty", "message": "暂无发现数据" } }, _this.$events = {}, _this.components = {
      shopGridList: _shop_grid_list2.default,
      bottomLoadMore: _bottomLoadMore2.default,
      placeholder: _placeholder2.default
    }, _this.data = {
      list: [],
      purchasetype: 1,
      special: 1, ////0-正常入库;1-特价专区和换货专区
      //是否有数据
      is_empty: false,
      //当前页面
      currentPage: 1,
      //总页数
      page_total: 0,
      //是否显示 底部loading
      showLoading: true,
      //防止重复加载
      preventRepeatReuqest: false
    }, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(wholesale, [{
    key: 'getGoodList',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(currentPage, size) {
        var that, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                //const json = await api.getGoodsList({

                _context.next = 3;
                return _api2.default.hostGoodsList({
                  query: {
                    page: currentPage || 1,
                    size: size || 10,
                    locationFlag: 101
                  }
                });

              case 3:
                json = _context.sent;

                if (json.data.code == 0) {
                  that.list = [].concat(_toConsumableArray(that.list), _toConsumableArray(json.data.list));
                  that.page_total = json.data.page_total;
                  if (json.data.page_total == 0) {
                    //暂无数据
                    that.is_empty = true;
                  }
                } else {
                  _tip2.default.error(json.data.msg);
                }
                that.showLoading = false;
                that.$apply();

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getGoodList(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return getGoodList;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      that.list = [];
      //that.list = bb.result.products;
      //console.log(bb.result.products)
      that.getGoodList();
    }
  }, {
    key: 'onReachBottom',


    //加载更多
    value: function onReachBottom() {
      var that = this;
      that.showLoading = true;
      console.log(that.page_total + "===" + that.currentPage);
      //判断总页数是否大于翻页数
      if (that.page_total > that.currentPage) {
        //防止重复加载
        if (that.preventRepeatReuqest) {
          return true;
        }
        that.preventRepeatReuqest = true;
        that.currentPage++;
        that.getGoodList(that.currentPage);
        that.preventRepeatReuqest = false;
      } else {
        that.showLoading = false;
      }
    }
  }]);

  return wholesale;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(wholesale , 'pages/wholesale'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndob2xlc2FsZS5qcyJdLCJuYW1lcyI6WyJ3aG9sZXNhbGUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic2hvcEdyaWRMaXN0IiwiYm90dG9tTG9hZE1vcmUiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJsaXN0IiwicHVyY2hhc2V0eXBlIiwic3BlY2lhbCIsImlzX2VtcHR5IiwiY3VycmVudFBhZ2UiLCJwYWdlX3RvdGFsIiwic2hvd0xvYWRpbmciLCJwcmV2ZW50UmVwZWF0UmV1cWVzdCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsInNpemUiLCJ0aGF0IiwiaG9zdEdvb2RzTGlzdCIsInF1ZXJ5IiwicGFnZSIsImxvY2F0aW9uRmxhZyIsImpzb24iLCJjb2RlIiwiZXJyb3IiLCJtc2ciLCIkYXBwbHkiLCJnZXRHb29kTGlzdCIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsZ0JBQWUsRUFBQyxnQkFBZSxFQUFoQixFQUFtQiw0QkFBMkIsY0FBOUMsRUFBNkQsdUJBQXNCLFNBQW5GLEVBQTZGLG9CQUFtQixNQUFoSCxFQUFoQixFQUF3SSxrQkFBaUIsRUFBQyxnQkFBZSxFQUFoQixFQUFtQixvQkFBbUIsYUFBdEMsRUFBb0QsV0FBVSxNQUE5RCxFQUF6SixFQUErTixlQUFjLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsb0JBQW1CLFVBQXRDLEVBQWlELFdBQVUsUUFBM0QsRUFBN08sRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkMsNENBRFU7QUFFVkMsOENBRlU7QUFHVkM7QUFIVSxLLFFBS1pDLEksR0FBTztBQUNMQyxZQUFNLEVBREQ7QUFFTEMsb0JBQWMsQ0FGVDtBQUdMQyxlQUFRLENBSEgsRUFHTTtBQUNYO0FBQ0FDLGdCQUFVLEtBTEw7QUFNTDtBQUNBQyxtQkFBYSxDQVBSO0FBUUw7QUFDQUMsa0JBQVksQ0FUUDtBQVVMO0FBQ0FDLG1CQUFhLElBWFI7QUFZTDtBQUNBQyw0QkFBc0I7QUFiakIsSyxRQThDTEMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVLEUsUUFJVkMsTSxHQUFTLEU7Ozs7OzsyRkFyQ1NOLFcsRUFBYU8sSTs7Ozs7O0FBQ3pCQyxvQixHQUFPLEk7QUFDWDs7O3VCQUNtQixjQUFJQyxhQUFKLENBQWtCO0FBQ25DQyx5QkFBTztBQUNMQywwQkFBTVgsZUFBZSxDQURoQjtBQUVMTywwQkFBTUEsUUFBUSxFQUZUO0FBR0xLLGtDQUFjO0FBSFQ7QUFENEIsaUJBQWxCLEM7OztBQUFiQyxvQjs7QUFPTixvQkFBSUEsS0FBS2xCLElBQUwsQ0FBVW1CLElBQVYsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDdkJOLHVCQUFLWixJQUFMLGdDQUFnQlksS0FBS1osSUFBckIsc0JBQThCaUIsS0FBS2xCLElBQUwsQ0FBVUMsSUFBeEM7QUFDQVksdUJBQUtQLFVBQUwsR0FBa0JZLEtBQUtsQixJQUFMLENBQVVNLFVBQTVCO0FBQ0Esc0JBQUlZLEtBQUtsQixJQUFMLENBQVVNLFVBQVYsSUFBd0IsQ0FBNUIsRUFBK0I7QUFDN0I7QUFDQU8seUJBQUtULFFBQUwsR0FBZ0IsSUFBaEI7QUFDRDtBQUNGLGlCQVBELE1BT087QUFDTCxnQ0FBSWdCLEtBQUosQ0FBVUYsS0FBS2xCLElBQUwsQ0FBVXFCLEdBQXBCO0FBQ0Q7QUFDRFIscUJBQUtOLFdBQUwsR0FBbUIsS0FBbkI7QUFDQU0scUJBQUtTLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFFTztBQUNMLFVBQUlULE9BQU8sSUFBWDtBQUNBQSxXQUFLWixJQUFMLEdBQVksRUFBWjtBQUNBO0FBQ0E7QUFDQVksV0FBS1UsV0FBTDtBQUNIOzs7OztBQVlIO29DQUNnQjtBQUNkLFVBQUlWLE9BQU8sSUFBWDtBQUNBQSxXQUFLTixXQUFMLEdBQW1CLElBQW5CO0FBQ0FpQixjQUFRQyxHQUFSLENBQVlaLEtBQUtQLFVBQUwsR0FBa0IsS0FBbEIsR0FBMEJPLEtBQUtSLFdBQTNDO0FBQ0E7QUFDQSxVQUFLUSxLQUFLUCxVQUFOLEdBQW9CTyxLQUFLUixXQUE3QixFQUEwQztBQUN4QztBQUNBLFlBQUlRLEtBQUtMLG9CQUFULEVBQStCO0FBQzdCLGlCQUFPLElBQVA7QUFDRDtBQUNESyxhQUFLTCxvQkFBTCxHQUE0QixJQUE1QjtBQUNBSyxhQUFLUixXQUFMO0FBQ0FRLGFBQUtVLFdBQUwsQ0FBaUJWLEtBQUtSLFdBQXRCO0FBQ0FRLGFBQUtMLG9CQUFMLEdBQTRCLEtBQTVCO0FBQ0QsT0FURCxNQVNPO0FBQ0xLLGFBQUtOLFdBQUwsR0FBbUIsS0FBbkI7QUFDRDtBQUNGOzs7O0VBdkZvQyxlQUFLUyxJOztrQkFBdkIxQixTIiwiZmlsZSI6Indob2xlc2FsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgU2hvcEdyaWRMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvc2hvcF9ncmlkX2xpc3QnXG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaS9hcGknO1xuaW1wb3J0IHRpcCBmcm9tICcuLi91dGlscy90aXAnXG5pbXBvcnQgQm90dG9tTG9hZE1vcmUgZnJvbSBcIi4uL2NvbXBvbmVudHMvY29tbW9uL2JvdHRvbUxvYWRNb3JlXCJcbmltcG9ydCBQbGFjZWhvbGRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9jb21tb24vcGxhY2Vob2xkZXJcIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgd2hvbGVzYWxlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnibnku7fkuJPljLonLFxuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJzaG9wR3JpZExpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnB1cmNoYXNldHlwZS5zeW5jXCI6XCJwdXJjaGFzZXR5cGVcIixcInYtYmluZDpzcGVjaWFsLnN5bmNcIjpcInNwZWNpYWxcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcImxpc3RcIn0sXCJib3R0b21Mb2FkTW9yZVwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJzaG93TG9hZGluZ1wiLFwibWVzc2FnZVwiOlwi5q2j5Zyo5Yqg6L29XCJ9LFwicGxhY2Vob2xkZXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNob3cuc3luY1wiOlwiaXNfZW1wdHlcIixcIm1lc3NhZ2VcIjpcIuaaguaXoOWPkeeOsOaVsOaNrlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgc2hvcEdyaWRMaXN0OiBTaG9wR3JpZExpc3QsXG4gICAgYm90dG9tTG9hZE1vcmU6IEJvdHRvbUxvYWRNb3JlLFxuICAgIHBsYWNlaG9sZGVyOiBQbGFjZWhvbGRlclxuICB9XG4gIGRhdGEgPSB7XG4gICAgbGlzdDogW10sXG4gICAgcHVyY2hhc2V0eXBlOiAxLFxuICAgIHNwZWNpYWw6MSwgLy8vLzAt5q2j5bi45YWl5bqTOzEt54m55Lu35LiT5Yy65ZKM5o2i6LSn5LiT5Yy6XG4gICAgLy/mmK/lkKbmnInmlbDmja5cbiAgICBpc19lbXB0eTogZmFsc2UsXG4gICAgLy/lvZPliY3pobXpnaJcbiAgICBjdXJyZW50UGFnZTogMSxcbiAgICAvL+aAu+mhteaVsFxuICAgIHBhZ2VfdG90YWw6IDAsXG4gICAgLy/mmK/lkKbmmL7npLog5bqV6YOobG9hZGluZ1xuICAgIHNob3dMb2FkaW5nOiB0cnVlLFxuICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XG4gICAgcHJldmVudFJlcGVhdFJldXFlc3Q6IGZhbHNlXG4gIH1cblxuICAgIGFzeW5jIGdldEdvb2RMaXN0KGN1cnJlbnRQYWdlLCBzaXplKSB7XG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAvL2NvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0R29vZHNMaXN0KHtcbiAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuaG9zdEdvb2RzTGlzdCh7XG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgcGFnZTogY3VycmVudFBhZ2UgfHwgMSxcbiAgICAgICAgICBzaXplOiBzaXplIHx8IDEwLFxuICAgICAgICAgIGxvY2F0aW9uRmxhZzogMTAxXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgICAgdGhhdC5saXN0ID0gWy4uLnRoYXQubGlzdCwgLi4uanNvbi5kYXRhLmxpc3RdO1xuICAgICAgICB0aGF0LnBhZ2VfdG90YWwgPSBqc29uLmRhdGEucGFnZV90b3RhbDtcbiAgICAgICAgaWYgKGpzb24uZGF0YS5wYWdlX3RvdGFsID09IDApIHtcbiAgICAgICAgICAvL+aaguaXoOaVsOaNrlxuICAgICAgICAgIHRoYXQuaXNfZW1wdHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLm1zZyk7XG4gICAgICB9XG4gICAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGF0LiRhcHBseSgpO1xuICAgIH1cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhhdC5saXN0ID0gW107XG4gICAgICAgIC8vdGhhdC5saXN0ID0gYmIucmVzdWx0LnByb2R1Y3RzO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGJiLnJlc3VsdC5wcm9kdWN0cylcbiAgICAgICAgdGhhdC5nZXRHb29kTGlzdCgpO1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcblxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuXG5cbiAgICB9XG4gICAgZXZlbnRzID0ge1xuXG4gICAgfVxuXG4gIC8v5Yqg6L295pu05aSaXG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHRoYXQuc2hvd0xvYWRpbmcgPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKHRoYXQucGFnZV90b3RhbCArIFwiPT09XCIgKyB0aGF0LmN1cnJlbnRQYWdlKTtcbiAgICAvL+WIpOaWreaAu+mhteaVsOaYr+WQpuWkp+S6jue/u+mhteaVsFxuICAgIGlmICgodGhhdC5wYWdlX3RvdGFsKSA+IHRoYXQuY3VycmVudFBhZ2UpIHtcbiAgICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XG4gICAgICBpZiAodGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSB0cnVlO1xuICAgICAgdGhhdC5jdXJyZW50UGFnZSsrO1xuICAgICAgdGhhdC5nZXRHb29kTGlzdCh0aGF0LmN1cnJlbnRQYWdlKTtcbiAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5zaG93TG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxufVxuIl19