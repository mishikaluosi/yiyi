'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _discover = require('./../components/discover.js');

var _discover2 = _interopRequireDefault(_discover);

var _bomb_screen = require('./../components/bomb_screen.js');

var _bomb_screen2 = _interopRequireDefault(_bomb_screen);

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

var Home = function (_wepy$page) {
  _inherits(Home, _wepy$page);

  function Home() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Home);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '素洁服装厂'
    }, _this.$repeat = {}, _this.$props = { "discover": { "xmlns:v-bind": "", "v-bind:list.sync": "discoverList" }, "bottomLoadMore": { "v-bind:show.sync": "showLoading", "message": "正在加载" }, "placeholder": { "v-bind:show.sync": "is_empty", "message": "暂无发现数据" }, "bombscreen": { "v-bind:types.sync": "tps", "v-bind:show.sync": "is_show_alert", "xmlns:v-on": "" } }, _this.$events = { "bombscreen": { "v-on:close": "closeAlert", "v-on:callback": "alertCallback" } }, _this.components = {
      discover: _discover2.default,
      bottomLoadMore: _bottomLoadMore2.default,
      placeholder: _placeholder2.default,
      bombscreen: _bomb_screen2.default
    }, _this.data = {

      imgUrls: ['../images/image_demo.png'],
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      indicatorActiveColor: "#fff",
      discoverList: [],
      //是否有数据
      is_empty: false,
      //当前页面
      currentPage: 1,
      //总页数
      page_total: 0,
      //是否显示 底部loading
      showLoading: true,
      //防止重复加载
      preventRepeatReuqest: false,
      //广告列表
      adList: [],
      tps: 0,
      is_show_alert: true
    }, _this.computed = {}, _this.methods = {
      goToAdvert: function goToAdvert(url) {
        console.log("url===" + url);
        if (url.length == 0) {
          return;
        }
        _wepy2.default.navigateTo({
          url: url
        });
      },

      onShareAppMessage: function onShareAppMessage(res) {
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target);
        }
        return {
          title: '素洁服装厂',
          path: '/pages/home',
          success: function success(res) {
            // 转发成功
          },
          fail: function fail(res) {
            // 转发失败
          }
        };
      },
      alertCallback: function alertCallback() {
        _tip2.default.alert('跳转');
      },
      closeAlert: function closeAlert() {
        _tip2.default.alert('关闭');
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Home, [{
    key: 'getDiscoverList',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(currentPage, size) {
        var that, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                _context.next = 3;
                return _api2.default.getHomeDisvocerList({
                  query: {
                    page: currentPage || 1,
                    size: size || 10
                  }
                });

              case 3:
                json = _context.sent;

                if (json.data.code == 0) {
                  that.discoverList = [].concat(_toConsumableArray(that.discoverList), _toConsumableArray(json.data.list));

                  if (json.data.page_total) {
                    // 后台的数据不再返回page_total
                    that.page_total = json.data.page_total;
                  };
                  if (json.data.page_total == 0) {
                    //暂无数据
                    that.is_empty = true;
                  }
                  that.$apply();
                } else {
                  _tip2.default.error(json.data.msg);
                }
                that.showLoading = false;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getDiscoverList(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return getDiscoverList;
    }()
  }, {
    key: 'getAdList',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var json;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _api2.default.getAdList({
                  query: {}
                });

              case 2:
                json = _context2.sent;

                if (json.data.code == 0) {
                  this.adList = json.data.list;
                  this.$apply();
                } else {}

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAdList() {
        return _ref3.apply(this, arguments);
      }

      return getAdList;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      this.discoverList = [];
      that.getDiscoverList();
      this.getAdList();
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
        that.getDiscoverList(that.currentPage);
        that.preventRepeatReuqest = false;
      } else {
        that.showLoading = false;
      }
    }
  }]);

  return Home;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/home'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJkaXNjb3ZlciIsImJvdHRvbUxvYWRNb3JlIiwicGxhY2Vob2xkZXIiLCJib21ic2NyZWVuIiwiZGF0YSIsImltZ1VybHMiLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiaW5kaWNhdG9yQWN0aXZlQ29sb3IiLCJkaXNjb3Zlckxpc3QiLCJpc19lbXB0eSIsImN1cnJlbnRQYWdlIiwicGFnZV90b3RhbCIsInNob3dMb2FkaW5nIiwicHJldmVudFJlcGVhdFJldXFlc3QiLCJhZExpc3QiLCJ0cHMiLCJpc19zaG93X2FsZXJ0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ29Ub0FkdmVydCIsInVybCIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJuYXZpZ2F0ZVRvIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJyZXMiLCJmcm9tIiwidGFyZ2V0IiwidGl0bGUiLCJwYXRoIiwic3VjY2VzcyIsImZhaWwiLCJhbGVydENhbGxiYWNrIiwiYWxlcnQiLCJjbG9zZUFsZXJ0IiwiZXZlbnRzIiwic2l6ZSIsInRoYXQiLCJnZXRIb21lRGlzdm9jZXJMaXN0IiwicXVlcnkiLCJwYWdlIiwianNvbiIsImNvZGUiLCJsaXN0IiwiJGFwcGx5IiwiZXJyb3IiLCJtc2ciLCJnZXRBZExpc3QiLCJnZXREaXNjb3Zlckxpc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxZQUFX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LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSc7XG5pbXBvcnQgdGlwIGZyb20gJy4uL3V0aWxzL3RpcCdcbmltcG9ydCBEaXNjb3ZlciBmcm9tICcuLi9jb21wb25lbnRzL2Rpc2NvdmVyJ1xuaW1wb3J0IEJvbWJzY3JlZW4gZnJvbSAnLi4vY29tcG9uZW50cy9ib21iX3NjcmVlbidcbmltcG9ydCBCb3R0b21Mb2FkTW9yZSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb21tb24vYm90dG9tTG9hZE1vcmVcIlxuaW1wb3J0IFBsYWNlaG9sZGVyIGZyb20gXCIuLi9jb21wb25lbnRzL2NvbW1vbi9wbGFjZWhvbGRlclwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfntKDmtIHmnI3oo4XljoInLFxuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJkaXNjb3ZlclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bGlzdC5zeW5jXCI6XCJkaXNjb3Zlckxpc3RcIn0sXCJib3R0b21Mb2FkTW9yZVwiOntcInYtYmluZDpzaG93LnN5bmNcIjpcInNob3dMb2FkaW5nXCIsXCJtZXNzYWdlXCI6XCLmraPlnKjliqDovb1cIn0sXCJwbGFjZWhvbGRlclwiOntcInYtYmluZDpzaG93LnN5bmNcIjpcImlzX2VtcHR5XCIsXCJtZXNzYWdlXCI6XCLmmoLml6Dlj5HnjrDmlbDmja5cIn0sXCJib21ic2NyZWVuXCI6e1widi1iaW5kOnR5cGVzLnN5bmNcIjpcInRwc1wiLFwidi1iaW5kOnNob3cuc3luY1wiOlwiaXNfc2hvd19hbGVydFwiLFwieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcImJvbWJzY3JlZW5cIjp7XCJ2LW9uOmNsb3NlXCI6XCJjbG9zZUFsZXJ0XCIsXCJ2LW9uOmNhbGxiYWNrXCI6XCJhbGVydENhbGxiYWNrXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgZGlzY292ZXI6IERpc2NvdmVyLFxuICAgIGJvdHRvbUxvYWRNb3JlOiBCb3R0b21Mb2FkTW9yZSxcbiAgICBwbGFjZWhvbGRlcjogUGxhY2Vob2xkZXIsXG4gICAgYm9tYnNjcmVlbjogQm9tYnNjcmVlblxuICB9XG4gIGRhdGEgPSB7XG5cbiAgICBpbWdVcmxzOiBbXG4gICAgICAnLi4vaW1hZ2VzL2ltYWdlX2RlbW8ucG5nJyxcbiAgICBdLFxuICAgIGluZGljYXRvckRvdHM6IHRydWUsXG4gICAgYXV0b3BsYXk6IHRydWUsXG4gICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgZHVyYXRpb246IDEwMDAsXG4gICAgaW5kaWNhdG9yQWN0aXZlQ29sb3I6IFwiI2ZmZlwiLFxuICAgIGRpc2NvdmVyTGlzdDogW10sXG4gICAgLy/mmK/lkKbmnInmlbDmja5cbiAgICBpc19lbXB0eTogZmFsc2UsXG4gICAgLy/lvZPliY3pobXpnaJcbiAgICBjdXJyZW50UGFnZTogMSxcbiAgICAvL+aAu+mhteaVsFxuICAgIHBhZ2VfdG90YWw6IDAsXG4gICAgLy/mmK/lkKbmmL7npLog5bqV6YOobG9hZGluZ1xuICAgIHNob3dMb2FkaW5nOiB0cnVlLFxuICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XG4gICAgcHJldmVudFJlcGVhdFJldXFlc3Q6IGZhbHNlLFxuICAgIC8v5bm/5ZGK5YiX6KGoXG4gICAgYWRMaXN0OiBbXSxcbiAgICB0cHM6IDAsXG4gICAgaXNfc2hvd19hbGVydDogdHJ1ZVxuICB9XG4gIGFzeW5jIGdldERpc2NvdmVyTGlzdChjdXJyZW50UGFnZSwgc2l6ZSkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldEhvbWVEaXN2b2Nlckxpc3Qoe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgcGFnZTogY3VycmVudFBhZ2UgfHwgMSxcbiAgICAgICAgc2l6ZTogc2l6ZSB8fCAxMFxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICB0aGF0LmRpc2NvdmVyTGlzdCA9IFsuLi50aGF0LmRpc2NvdmVyTGlzdCwgLi4uanNvbi5kYXRhLmxpc3RdO1xuXG4gICAgICBpZiAoanNvbi5kYXRhLnBhZ2VfdG90YWwpIHsgLy8g5ZCO5Y+w55qE5pWw5o2u5LiN5YaN6L+U5ZuecGFnZV90b3RhbFxuICAgICAgdGhhdC5wYWdlX3RvdGFsID0ganNvbi5kYXRhLnBhZ2VfdG90YWxcbiAgICAgIH07XG4gICAgICBpZiAoanNvbi5kYXRhLnBhZ2VfdG90YWwgPT0gMCkge1xuICAgICAgICAvL+aaguaXoOaVsOaNrlxuICAgICAgICB0aGF0LmlzX2VtcHR5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKTtcbiAgICB9XG4gICAgdGhhdC5zaG93TG9hZGluZyA9IGZhbHNlO1xuICB9XG4gIGFzeW5jIGdldEFkTGlzdCgpIHtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldEFkTGlzdCh7XG4gICAgICBxdWVyeToge31cbiAgICB9KTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgdGhpcy5hZExpc3QgPSBqc29uLmRhdGEubGlzdDtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSBlbHNlIHt9XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICB0aGlzLmRpc2NvdmVyTGlzdCA9IFtdO1xuICAgIHRoYXQuZ2V0RGlzY292ZXJMaXN0KCk7XG4gICAgdGhpcy5nZXRBZExpc3QoKTtcbiAgfVxuICBjb21wdXRlZCA9IHt9XG4gIG1ldGhvZHMgPSB7XG4gICAgZ29Ub0FkdmVydCh1cmwpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwidXJsPT09XCIgKyB1cmwpO1xuICAgICAgaWYgKHVybC5sZW5ndGggPT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IHVybFxuICAgICAgfSlcbiAgICB9LFxuICAgIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgIGlmIChyZXMuZnJvbSA9PT0gJ2J1dHRvbicpIHtcbiAgICAgICAgLy8g5p2l6Ieq6aG16Z2i5YaF6L2s5Y+R5oyJ6ZKuXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXJnZXQpXG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogJ+e0oOa0geacjeijheWOgicsXG4gICAgICAgIHBhdGg6ICcvcGFnZXMvaG9tZScsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAvLyDovazlj5HlpLHotKVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxlcnRDYWxsYmFjaygpIHtcbiAgICAgIHRpcC5hbGVydCgn6Lez6L2sJyk7XG4gICAgfSxcbiAgICBjbG9zZUFsZXJ0KCkge1xuICAgICAgdGlwLmFsZXJ0KCflhbPpl60nKTtcbiAgICB9XG4gIH1cbiAgZXZlbnRzID0ge31cbiAgLy/liqDovb3mm7TlpJpcbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgdGhhdC5zaG93TG9hZGluZyA9IHRydWU7XG4gICAgY29uc29sZS5sb2codGhhdC5wYWdlX3RvdGFsICsgXCI9PT1cIiArIHRoYXQuY3VycmVudFBhZ2UpO1xuICAgIC8v5Yik5pat5oC76aG15pWw5piv5ZCm5aSn5LqO57+76aG15pWwXG4gICAgaWYgKCh0aGF0LnBhZ2VfdG90YWwpID4gdGhhdC5jdXJyZW50UGFnZSkge1xuICAgICAgLy/pmLLmraLph43lpI3liqDovb1cbiAgICAgIGlmICh0aGF0LnByZXZlbnRSZXBlYXRSZXVxZXN0KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgdGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCA9IHRydWU7XG4gICAgICB0aGF0LmN1cnJlbnRQYWdlKys7XG4gICAgICB0aGF0LmdldERpc2NvdmVyTGlzdCh0aGF0LmN1cnJlbnRQYWdlKTtcbiAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5zaG93TG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfTtcbn1cblxuIl19