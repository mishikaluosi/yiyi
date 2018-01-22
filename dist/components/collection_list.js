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

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _wepySwipeDelete = require('./common/wepy-swipe-delete.js');

var _wepySwipeDelete2 = _interopRequireDefault(_wepySwipeDelete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollecntionList = function (_wepy$component) {
  _inherits(CollecntionList, _wepy$component);

  function CollecntionList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CollecntionList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CollecntionList.__proto__ || Object.getPrototypeOf(CollecntionList)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      type: {
        default: 0
      },
      list: {
        type: Object,
        default: []
      }
    }, _this.$repeat = { "list": { "com": "swipeDelete", "props": "swipeData" } }, _this.$props = { "swipeDelete": { "xmlns:v-bind": { "value": "", "for": "list", "item": "item", "index": "index", "key": "index" }, "v-bind:swipeData.once": { "value": "item", "type": "item", "for": "list", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "list", "item": "item", "index": "index", "key": "index" } } }, _this.$events = { "swipeDelete": { "v-on:delItem": "handleDelItem" } }, _this.components = {
      swipeDelete: _wepySwipeDelete2.default
    }, _this.computed = {}, _this.methods = {
      handleDelItem: function handleDelItem(itemData) {
        console.log(itemData);
        var objType = itemData.type;
        if (objType == 1) {
          this.delUserBrowser(itemData.goodsId);
        } else if (objType == 2) {
          this.goodsUnFavorite(itemData.goodsId);
        }
      },
      refreshList: function refreshList(val) {
        if (val == undefined) return;
        console.log("val.....", val);
        this.list = val;
        this.$apply();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CollecntionList, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      console.log(that.list);
    }
  }, {
    key: 'goodsUnFavorite',


    //商品取消收藏
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(goodsId) {
        var that, userSpecialInfo, openId, json, retList, i;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context.next = 5;
                return _api2.default.goodsUnFavorite({
                  query: {
                    openId: openId,
                    goodsId: goodsId
                  }
                });

              case 5:
                json = _context.sent;

                if (!(json.data.code == 0)) {
                  _context.next = 22;
                  break;
                }

                console.log("===========商品取消收藏成功=========");
                //tip.toast("取消收藏成功");
                retList = [];
                i = 0;

              case 10:
                if (!(i < this.list.length)) {
                  _context.next = 19;
                  break;
                }

                if (!(this.list[i].goodsId == goodsId)) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt('continue', 16);

              case 15:
                retList.push(this.list[i]);

              case 16:
                i++;
                _context.next = 10;
                break;

              case 19:
                this.list = retList;
                _context.next = 23;
                break;

              case 22:
                _tip2.default.error(json.data.msg);

              case 23:
                that.$apply();

              case 24:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function goodsUnFavorite(_x) {
        return _ref2.apply(this, arguments);
      }

      return goodsUnFavorite;
    }()

    //商品取消收藏

  }, {
    key: 'delUserBrowser',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(goodsId) {
        var that, userSpecialInfo, openId, json, retList, i;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context2.next = 5;
                return _api2.default.delUserBrowser({
                  query: {
                    openId: openId,
                    goodsId: goodsId
                  }
                });

              case 5:
                json = _context2.sent;

                if (!(json.data.code == 0)) {
                  _context2.next = 22;
                  break;
                }

                console.log("===========商品取消收藏成功=========");
                //tip.toast("取消收藏成功");
                retList = [];
                i = 0;

              case 10:
                if (!(i < this.list.length)) {
                  _context2.next = 19;
                  break;
                }

                if (!(this.list[i].goodsId == goodsId)) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt('continue', 16);

              case 15:
                retList.push(this.list[i]);

              case 16:
                i++;
                _context2.next = 10;
                break;

              case 19:
                this.list = retList;
                _context2.next = 23;
                break;

              case 22:
                _tip2.default.error(json.data.msg);

              case 23:
                that.$apply();

              case 24:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function delUserBrowser(_x2) {
        return _ref3.apply(this, arguments);
      }

      return delUserBrowser;
    }()
  }]);

  return CollecntionList;
}(_wepy2.default.component);

exports.default = CollecntionList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3Rpb25fbGlzdC5qcyJdLCJuYW1lcyI6WyJDb2xsZWNudGlvbkxpc3QiLCJwcm9wcyIsInR5cGUiLCJkZWZhdWx0IiwibGlzdCIsIk9iamVjdCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInN3aXBlRGVsZXRlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiaGFuZGxlRGVsSXRlbSIsIml0ZW1EYXRhIiwiY29uc29sZSIsImxvZyIsIm9ialR5cGUiLCJkZWxVc2VyQnJvd3NlciIsImdvb2RzSWQiLCJnb29kc1VuRmF2b3JpdGUiLCJyZWZyZXNoTGlzdCIsInZhbCIsInVuZGVmaW5lZCIsIiRhcHBseSIsImV2ZW50cyIsInRoYXQiLCJ1c2VyU3BlY2lhbEluZm8iLCJnZXRTdG9yYWdlU3luYyIsIm9wZW5JZCIsIm9wZW5pZCIsInF1ZXJ5IiwianNvbiIsImRhdGEiLCJjb2RlIiwicmV0TGlzdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwiZXJyb3IiLCJtc2ciLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsZTs7Ozs7Ozs7Ozs7Ozs7d01BQ25CQyxLLEdBQVE7QUFDTkMsWUFBTztBQUNMQyxpQkFBUztBQURKLE9BREQ7QUFJTkMsWUFBTTtBQUNKRixjQUFNRyxNQURGO0FBRUpGLGlCQUFTO0FBRkw7QUFKQSxLLFFBU1RHLE8sR0FBVSxFQUFDLFFBQU8sRUFBQyxPQUFNLGFBQVAsRUFBcUIsU0FBUSxXQUE3QixFQUFSLEUsUUFDWEMsTSxHQUFTLEVBQUMsZUFBYyxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxNQUFsQixFQUF5QixRQUFPLE1BQWhDLEVBQXVDLFNBQVEsT0FBL0MsRUFBdUQsT0FBTSxPQUE3RCxFQUFoQixFQUFzRix5QkFBd0IsRUFBQyxTQUFRLE1BQVQsRUFBZ0IsUUFBTyxN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QWEsS0FBS2xDLElBQUwsQ0FBVWdDLENBQVYsQ0FBYjs7O0FBSmtDQSxtQjs7Ozs7QUFPdEMscUJBQUtoQyxJQUFMLEdBQVkrQixPQUFaOzs7OztBQUVBLDhCQUFJSSxLQUFKLENBQVVQLEtBQUtDLElBQUwsQ0FBVU8sR0FBcEI7OztBQUVGZCxxQkFBS0YsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWpGeUMsZUFBS2lCLFM7O2tCQUE3QnpDLGUiLCJmaWxlIjoiY29sbGVjdGlvbl9saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7XG4gIFNZU1RFTV9JTkZPLFxuICBVU0VSX1NQRUNJQ0FMX0lORk9cbn0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnQnO1xuaW1wb3J0IHRpcCBmcm9tICcuLi91dGlscy90aXAnXG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaS9hcGknO1xuaW1wb3J0IFN3aXBlRGVsZXRlIGZyb20gJy4vY29tbW9uL3dlcHktc3dpcGUtZGVsZXRlJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjbnRpb25MaXN0IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICB0eXBlIDoge1xuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG4gICAgbGlzdDoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgZGVmYXVsdDogW11cbiAgICB9XG4gIH1cbiAkcmVwZWF0ID0ge1wibGlzdFwiOntcImNvbVwiOlwic3dpcGVEZWxldGVcIixcInByb3BzXCI6XCJzd2lwZURhdGFcIn19O1xyXG4kcHJvcHMgPSB7XCJzd2lwZURlbGV0ZVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwibGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnN3aXBlRGF0YS5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwibGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwibGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fX07XHJcbiRldmVudHMgPSB7XCJzd2lwZURlbGV0ZVwiOntcInYtb246ZGVsSXRlbVwiOlwiaGFuZGxlRGVsSXRlbVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHN3aXBlRGVsZXRlOiBTd2lwZURlbGV0ZVxuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBjb25zb2xlLmxvZyh0aGF0Lmxpc3QpXG5cbiAgfVxuICBjb21wdXRlZCA9IHtcblxuICB9XG5cbiAgLy/llYblk4Hlj5bmtojmlLbol49cbiAgYXN5bmMgZ29vZHNVbkZhdm9yaXRlKGdvb2RzSWQpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdvb2RzVW5GYXZvcml0ZSh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBvcGVuSWQ6IG9wZW5JZCxcbiAgICAgICAgZ29vZHNJZDogZ29vZHNJZFxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT095ZWG5ZOB5Y+W5raI5pS26JeP5oiQ5YqfPT09PT09PT09XCIpXG4gICAgICAvL3RpcC50b2FzdChcIuWPlua2iOaUtuiXj+aIkOWKn1wiKTtcbiAgICAgIGxldCByZXRMaXN0ID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5saXN0W2ldLmdvb2RzSWQgPT0gZ29vZHNJZCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldExpc3QucHVzaCh0aGlzLmxpc3RbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmxpc3QgPSByZXRMaXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLm1zZylcbiAgICB9XG4gICAgdGhhdC4kYXBwbHkoKTtcbiAgfVxuXG4gIC8v5ZWG5ZOB5Y+W5raI5pS26JePXG4gIGFzeW5jIGRlbFVzZXJCcm93c2VyKGdvb2RzSWQpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmRlbFVzZXJCcm93c2VyKHtcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIG9wZW5JZDogb3BlbklkLFxuICAgICAgICBnb29kc0lkOiBnb29kc0lkXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT3llYblk4Hlj5bmtojmlLbol4/miJDlip89PT09PT09PT1cIilcbiAgICAgIC8vdGlwLnRvYXN0KFwi5Y+W5raI5pS26JeP5oiQ5YqfXCIpO1xuICAgICAgbGV0IHJldExpc3QgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RbaV0uZ29vZHNJZCA9PSBnb29kc0lkKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0TGlzdC5wdXNoKHRoaXMubGlzdFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdCA9IHJldExpc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKVxuICAgIH1cbiAgICB0aGF0LiRhcHBseSgpO1xuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBoYW5kbGVEZWxJdGVtKGl0ZW1EYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhpdGVtRGF0YSlcbiAgICAgIGxldCBvYmpUeXBlID0gaXRlbURhdGEudHlwZTtcbiAgICAgIGlmIChvYmpUeXBlPT0xKSB7XG4gICAgICAgIHRoaXMuZGVsVXNlckJyb3dzZXIoaXRlbURhdGEuZ29vZHNJZCk7XG4gICAgICB9IGVsc2UgaWYgKG9ialR5cGU9PTIpIHtcbiAgICAgICAgdGhpcy5nb29kc1VuRmF2b3JpdGUoaXRlbURhdGEuZ29vZHNJZCk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZWZyZXNoTGlzdCh2YWwpe1xuICAgICAgIGlmICh2YWw9PXVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgIGNvbnNvbGUubG9nKFwidmFsLi4uLi5cIix2YWwpO1xuICAgICAgICB0aGlzLmxpc3QgPSB2YWw7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9XG4gIGV2ZW50cyA9IHtcblxuICB9XG59XG5cbiJdfQ==