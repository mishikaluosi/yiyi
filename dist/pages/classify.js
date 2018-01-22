'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _constant = require('./../utils/constant.js');

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Classify = function (_wepy$page) {
  _inherits(Classify, _wepy$page);

  function Classify() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Classify);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Classify.__proto__ || Object.getPrototypeOf(Classify)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '分类'
    }, _this.components = {}, _this.data = {
      scrollTop: 100,
      windowHeight: 0,
      list: {},
      //一级分类数据
      rootcateList: {},
      //二级三级分类数据
      childcateList: {}
    }, _this.computed = {}, _this.methods = {
      //改变分类 此处有问题,获取不到父类id
      changeCate: function changeCate(e) {
        console.log(e);
        var code = e.currentTarget.dataset.id;
        this.getChildCate(code);
        _wepy2.default.setStorageSync(_constant.SEL_CLASS_CODE, code);
        //设置一级分类的选中状态
        for (var i = 0; i < this.rootcateList.length; i++) {
          var rootCate = this.rootcateList[i];
          rootCate.active = false;
          if (rootCate.code == code) {
            rootCate.active = true;
          }
        }
      },

      onShareAppMessage: function onShareAppMessage(res) {
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target);
        }
        return {
          title: this.detail.name,
          path: '/pages/classify',
          success: function success(res) {
            // 转发成功
          },
          fail: function fail(res) {
            // 转发失败
          }
        };
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Classify, [{
    key: 'getChildCate',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(rootCateCode) {
        var json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _api2.default.childGoodsCatetoryList({
                  query: {
                    parentCategoryID: rootCateCode
                  }
                });

              case 2:
                json = _context.sent;

                if (json.data.code == 0) {
                  this.childcateList = json.data.data;
                } else {
                  _tip2.default.error(json.data.error);
                }
                this.$apply();

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getChildCate(_x) {
        return _ref2.apply(this, arguments);
      }

      return getChildCate;
    }()

    //异步获取顶级分类

  }, {
    key: 'getRootCateTopLevel',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var json, selCode, selRottCateCode, i;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _api2.default.rootCtegoryList({
                  query: {}
                });

              case 2:
                json = _context2.sent;

                if (json.data.code == 0) {
                  this.rootcateList = json.data.data;
                  if (this.rootcateList.length > 0) {
                    selCode = wx.getStorageSync(_constant.SEL_CLASS_CODE);
                    selRottCateCode = this.rootcateList[0].id; // cateID  
                    //没有selCode,默认为第一个分类选中

                    if (selCode.length == 0) {
                      this.rootcateList[0].active = true; //active属性为当前选中的哪个
                    } else {
                      for (i = 0; i < this.rootcateList.length; i++) {
                        if (selCode == this.rootcateList[i].id) {
                          //如果id=selCode,则选中该分类
                          selRottCateCode = this.rootcateList[i].id;
                          this.rootcateList[i].active = true;
                        }
                      }
                    }

                    this.getChildCate(selRottCateCode);
                  }
                } else {
                  _tip2.default.error(json.data.error);
                }
                this.$apply();

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getRootCateTopLevel() {
        return _ref3.apply(this, arguments);
      }

      return getRootCateTopLevel;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      //this.list = aa.data;
      var systemInfo = wx.getStorageSync(_constant.SYSTEM_INFO);
      this.windowHeight = systemInfo.windowHeight;
      this.$apply();
      console.log(aa);
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.getRootCateTopLevel();
    }
  }]);

  return Classify;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Classify , 'pages/classify'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzaWZ5LmpzIl0sIm5hbWVzIjpbIkNsYXNzaWZ5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJkYXRhIiwic2Nyb2xsVG9wIiwid2luZG93SGVpZ2h0IiwibGlzdCIsInJvb3RjYXRlTGlzdCIsImNoaWxkY2F0ZUxpc3QiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJjaGFuZ2VDYXRlIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJjb2RlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsImdldENoaWxkQ2F0ZSIsInNldFN0b3JhZ2VTeW5jIiwiaSIsImxlbmd0aCIsInJvb3RDYXRlIiwiYWN0aXZlIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJyZXMiLCJmcm9tIiwidGFyZ2V0IiwidGl0bGUiLCJkZXRhaWwiLCJuYW1lIiwicGF0aCIsInN1Y2Nlc3MiLCJmYWlsIiwiZXZlbnRzIiwicm9vdENhdGVDb2RlIiwiY2hpbGRHb29kc0NhdGV0b3J5TGlzdCIsInF1ZXJ5IiwicGFyZW50Q2F0ZWdvcnlJRCIsImpzb24iLCJlcnJvciIsIiRhcHBseSIsInJvb3RDdGVnb3J5TGlzdCIsInNlbENvZGUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwic2VsUm90dENhdGVDb2RlIiwidGhhdCIsInN5c3RlbUluZm8iLCJhYSIsImdldFJvb3RDYXRlVG9wTGV2ZWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBS0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUliQyxJLEdBQU87QUFDTEMsaUJBQVcsR0FETjtBQUVMQyxvQkFBYyxDQUZUO0FBR0xDLFlBQU0sRUFIRDtBQUlMO0FBQ0FDLG9CQUFjLEVBTFQ7QUFNTDtBQUNBQyxxQkFBZTtBQVBWLEssUUFxRVBDLFEs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O0FBQ0Y7QUFDRjs7QUFFRCx5QkFBS0wsWUFBTCxDQUFrQjRCLGVBQWxCO0FBQ0Q7QUFDRixpQkFwQkQsTUFvQk87QUFDTCxnQ0FBSU4sS0FBSixDQUFVRCxLQUFLckMsSUFBTCxDQUFVc0MsS0FBcEI7QUFDRDtBQUNELHFCQUFLQyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBR087QUFDUCxVQUFJTSxPQUFPLElBQVg7QUFDQTtBQUNBLFVBQUlDLGFBQWFKLEdBQUdDLGNBQUgsdUJBQWpCO0FBQ0EsV0FBS3pDLFlBQUwsR0FBb0I0QyxXQUFXNUMsWUFBL0I7QUFDQSxXQUFLcUMsTUFBTDtBQUNBN0IsY0FBUUMsR0FBUixDQUFZb0MsRUFBWjtBQUNEOzs7NkJBRVE7QUFDUCxXQUFLQyxtQkFBTDtBQUNEOzs7O0VBM0VtQyxlQUFLQyxJOztrQkFBdEJyRCxRIiwiZmlsZSI6ImNsYXNzaWZ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSc7XG5pbXBvcnQge1xuICBTWVNURU1fSU5GTyxcbiAgU0VMX0NMQVNTX0NPREVcbn0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnQnO1xuXG5pbXBvcnQgdGlwIGZyb20gJy4uL3V0aWxzL3RpcCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xhc3NpZnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WIhuexuycsXG4gIH1cbiAgY29tcG9uZW50cyA9IHtcblxuICB9XG5cbiAgZGF0YSA9IHtcbiAgICBzY3JvbGxUb3A6IDEwMCxcbiAgICB3aW5kb3dIZWlnaHQ6IDAsXG4gICAgbGlzdDoge30sXG4gICAgLy/kuIDnuqfliIbnsbvmlbDmja5cbiAgICByb290Y2F0ZUxpc3Q6IHt9LFxuICAgIC8v5LqM57qn5LiJ57qn5YiG57G75pWw5o2uXG4gICAgY2hpbGRjYXRlTGlzdDoge31cbiAgfVxuXG4gIGFzeW5jIGdldENoaWxkQ2F0ZShyb290Q2F0ZUNvZGUpIHtcbiAgICAvL+agueaNrueItuexu2lk6I635Y+W5a2Q5YiG57G7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5jaGlsZEdvb2RzQ2F0ZXRvcnlMaXN0KHtcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIHBhcmVudENhdGVnb3J5SUQ6IHJvb3RDYXRlQ29kZVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICB0aGlzLmNoaWxkY2F0ZUxpc3QgPSBqc29uLmRhdGEuZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5lcnJvcik7XG4gICAgfVxuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH1cblxuLy/lvILmraXojrflj5bpobbnuqfliIbnsbtcbiAgYXN5bmMgZ2V0Um9vdENhdGVUb3BMZXZlbCgpIHtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLnJvb3RDdGVnb3J5TGlzdCh7XG4gICAgICBxdWVyeToge31cbiAgICB9KTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgdGhpcy5yb290Y2F0ZUxpc3QgPSBqc29uLmRhdGEuZGF0YTtcbiAgICAgIGlmICh0aGlzLnJvb3RjYXRlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBzZWxDb2RlID0gd3guZ2V0U3RvcmFnZVN5bmMoU0VMX0NMQVNTX0NPREUpO1xuICAgICAgICB2YXIgc2VsUm90dENhdGVDb2RlID0gdGhpcy5yb290Y2F0ZUxpc3RbMF0uaWQ7ICAgIC8vIGNhdGVJRCAgXG4gICAgICAgIC8v5rKh5pyJc2VsQ29kZSzpu5jorqTkuLrnrKzkuIDkuKrliIbnsbvpgInkuK1cbiAgICAgICAgaWYgKHNlbENvZGUubGVuZ3RoPT0wKSB7XG4gICAgICAgICAgdGhpcy5yb290Y2F0ZUxpc3RbMF0uYWN0aXZlID0gdHJ1ZTsgICAgIC8vYWN0aXZl5bGe5oCn5Li65b2T5YmN6YCJ5Lit55qE5ZOq5LiqXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJvb3RjYXRlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNlbENvZGUgPT0gdGhpcy5yb290Y2F0ZUxpc3RbaV0uaWQpIHtcbiAgICAgICAgICAgICAgLy/lpoLmnpxpZD1zZWxDb2RlLOWImemAieS4reivpeWIhuexu1xuICAgICAgICAgICAgICBzZWxSb3R0Q2F0ZUNvZGUgPSB0aGlzLnJvb3RjYXRlTGlzdFtpXS5pZDtcbiAgICAgICAgICAgICAgdGhpcy5yb290Y2F0ZUxpc3RbaV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldENoaWxkQ2F0ZShzZWxSb3R0Q2F0ZUNvZGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLmVycm9yKTtcbiAgICB9XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuXG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgLy90aGlzLmxpc3QgPSBhYS5kYXRhO1xuICAgIGxldCBzeXN0ZW1JbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoU1lTVEVNX0lORk8pO1xuICAgIHRoaXMud2luZG93SGVpZ2h0ID0gc3lzdGVtSW5mby53aW5kb3dIZWlnaHQ7XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgICBjb25zb2xlLmxvZyhhYSlcbiAgfVxuXG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLmdldFJvb3RDYXRlVG9wTGV2ZWwoKTtcbiAgfVxuXG4gIGNvbXB1dGVkID0ge1xuXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICAvL+aUueWPmOWIhuexuyDmraTlpITmnInpl67popgs6I635Y+W5LiN5Yiw54i257G7aWRcbiAgICBjaGFuZ2VDYXRlKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgbGV0IGNvZGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZDtcbiAgICAgIHRoaXMuZ2V0Q2hpbGRDYXRlKGNvZGUpO1xuICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhTRUxfQ0xBU1NfQ09ERSwgY29kZSk7XG4gICAgICAvL+iuvue9ruS4gOe6p+WIhuexu+eahOmAieS4reeKtuaAgVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJvb3RjYXRlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcm9vdENhdGUgPSB0aGlzLnJvb3RjYXRlTGlzdFtpXTtcbiAgICAgICAgcm9vdENhdGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmIChyb290Q2F0ZS5jb2RlID09IGNvZGUpIHtcbiAgICAgICAgICByb290Q2F0ZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKHJlcykge1xuICAgICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xuICAgICAgICAvLyDmnaXoh6rpobXpnaLlhoXovazlj5HmjInpkq5cbiAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldClcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlOiB0aGlzLmRldGFpbC5uYW1lLFxuICAgICAgICBwYXRoOiAnL3BhZ2VzL2NsYXNzaWZ5JyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGV2ZW50cyA9IHtcblxuICB9XG59XG5cbiJdfQ==