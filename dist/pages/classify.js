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
      changeCate: function changeCate(e) {
        var pid = e.currentTarget.dataset.id; //获取当前行中 data-id属性的值
        this.getChildCate(pid);
        _wepy2.default.setStorageSync(_constant.SEL_CLASS_CODE, pid);
        //设置一级分类的选中状态
        for (var i = 0; i < this.rootcateList.length; i++) {
          var rootCate = this.rootcateList[i];
          rootCate.active = false;
          if (rootCate.id == pid) {
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
                    selCode = wx.getStorageSync(_constant.SEL_CLASS_CODE); //高亮的cateid

                    selRottCateCode = this.rootcateList[0].id; // cateID
                    //没有selCode,默认为第一个分类选中

                    if (selCode.length == 0) {
                      this.rootcateList[0].active = true; //active属性为当前选中的哪个(默认为第一个)
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzaWZ5LmpzIl0sIm5hbWVzIjpbIkNsYXNzaWZ5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJkYXRhIiwic2Nyb2xsVG9wIiwid2luZG93SGVpZ2h0IiwibGlzdCIsInJvb3RjYXRlTGlzdCIsImNoaWxkY2F0ZUxpc3QiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJjaGFuZ2VDYXRlIiwiZSIsInBpZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJnZXRDaGlsZENhdGUiLCJzZXRTdG9yYWdlU3luYyIsImkiLCJsZW5ndGgiLCJyb290Q2F0ZSIsImFjdGl2ZSIsIm9uU2hhcmVBcHBNZXNzYWdlIiwicmVzIiwiZnJvbSIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXQiLCJ0aXRsZSIsImRldGFpbCIsIm5hbWUiLCJwYXRoIiwic3VjY2VzcyIsImZhaWwiLCJldmVudHMiLCJyb290Q2F0ZUNvZGUiLCJjaGlsZEdvb2RzQ2F0ZXRvcnlMaXN0IiwicXVlcnkiLCJwYXJlbnRDYXRlZ29yeUlEIiwianNvbiIsImNvZGUiLCJlcnJvciIsIiRhcHBseSIsInJvb3RDdGVnb3J5TGlzdCIsInNlbENvZGUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwic2VsUm90dENhdGVDb2RlIiwidGhhdCIsInN5c3RlbUluZm8iLCJnZXRSb290Q2F0ZVRvcExldmVsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUtBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFJYkMsSSxHQUFPO0FBQ0xDLGlCQUFXLEdBRE47QUFFTEMsb0JBQWMsQ0FGVDtBQUdMQyxZQUFNLEVBSEQ7QUFJTDtBQUNBQyxvQkFBYyxFQUxUO0FBTUw7QUFDQUMscUJBQWU7QUFQVixLLFFBb0VQQyxR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RUQseUJBQUtMLFlBQUwsQ0FBa0IrQixlQUFsQjtBQUNEO0FBQ0YsaUJBcEJELE1Bb0JPO0FBQ0wsZ0NBQUlOLEtBQUosQ0FBVUYsS0FBS3JDLElBQUwsQ0FBVXVDLEtBQXBCO0FBQ0Q7QUFDRCxxQkFBS0MsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQUdPO0FBQ1AsVUFBSU0sT0FBTyxJQUFYO0FBQ0E7QUFDQSxVQUFJQyxhQUFhSixHQUFHQyxjQUFILHVCQUFqQjtBQUNBLFdBQUsxQyxZQUFMLEdBQW9CNkMsV0FBVzdDLFlBQS9CO0FBQ0EsV0FBS3NDLE1BQUw7QUFDRDs7OzZCQUVRO0FBQ1AsV0FBS1EsbUJBQUw7QUFDRDs7OztFQTFFbUMsZUFBS0MsSTs7a0JBQXRCckQsUSIsImZpbGUiOiJjbGFzc2lmeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaS9hcGknO1xuaW1wb3J0IHtcbiAgU1lTVEVNX0lORk8sXG4gIFNFTF9DTEFTU19DT0RFXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50JztcblxuaW1wb3J0IHRpcCBmcm9tICcuLi91dGlscy90aXAnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsYXNzaWZ5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfliIbnsbsnLFxuICB9XG4gIGNvbXBvbmVudHMgPSB7XG5cbiAgfVxuXG4gIGRhdGEgPSB7XG4gICAgc2Nyb2xsVG9wOiAxMDAsXG4gICAgd2luZG93SGVpZ2h0OiAwLFxuICAgIGxpc3Q6IHt9LFxuICAgIC8v5LiA57qn5YiG57G75pWw5o2uXG4gICAgcm9vdGNhdGVMaXN0OiB7fSxcbiAgICAvL+S6jOe6p+S4iee6p+WIhuexu+aVsOaNrlxuICAgIGNoaWxkY2F0ZUxpc3Q6IHt9XG4gIH1cblxuICBhc3luYyBnZXRDaGlsZENhdGUocm9vdENhdGVDb2RlKSB7XG4gICAgLy/moLnmja7niLbnsbtpZOiOt+WPluWtkOWIhuexu1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuY2hpbGRHb29kc0NhdGV0b3J5TGlzdCh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBwYXJlbnRDYXRlZ29yeUlEOiByb290Q2F0ZUNvZGVcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgdGhpcy5jaGlsZGNhdGVMaXN0ID0ganNvbi5kYXRhLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEuZXJyb3IpO1xuICAgIH1cbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG5cbi8v5byC5q2l6I635Y+W6aG257qn5YiG57G7XG4gIGFzeW5jIGdldFJvb3RDYXRlVG9wTGV2ZWwoKSB7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5yb290Q3RlZ29yeUxpc3Qoe1xuICAgICAgcXVlcnk6IHt9XG4gICAgfSk7XG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgIHRoaXMucm9vdGNhdGVMaXN0ID0ganNvbi5kYXRhLmRhdGE7XG4gICAgICBpZiAodGhpcy5yb290Y2F0ZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgc2VsQ29kZSA9IHd4LmdldFN0b3JhZ2VTeW5jKFNFTF9DTEFTU19DT0RFKTsgIC8v6auY5Lqu55qEY2F0ZWlkXG4gICAgICAgIHZhciBzZWxSb3R0Q2F0ZUNvZGUgPSB0aGlzLnJvb3RjYXRlTGlzdFswXS5pZDsgICAgLy8gY2F0ZUlEXG4gICAgICAgIC8v5rKh5pyJc2VsQ29kZSzpu5jorqTkuLrnrKzkuIDkuKrliIbnsbvpgInkuK1cbiAgICAgICAgaWYgKHNlbENvZGUubGVuZ3RoPT0wKSB7XG4gICAgICAgICAgdGhpcy5yb290Y2F0ZUxpc3RbMF0uYWN0aXZlID0gdHJ1ZTsgICAgIC8vYWN0aXZl5bGe5oCn5Li65b2T5YmN6YCJ5Lit55qE5ZOq5LiqKOm7mOiupOS4uuesrOS4gOS4qilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucm9vdGNhdGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2VsQ29kZSA9PSB0aGlzLnJvb3RjYXRlTGlzdFtpXS5pZCkge1xuICAgICAgICAgICAgICAvL+WmguaenGlkPXNlbENvZGUs5YiZ6YCJ5Lit6K+l5YiG57G7XG4gICAgICAgICAgICAgIHNlbFJvdHRDYXRlQ29kZSA9IHRoaXMucm9vdGNhdGVMaXN0W2ldLmlkO1xuICAgICAgICAgICAgICB0aGlzLnJvb3RjYXRlTGlzdFtpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0Q2hpbGRDYXRlKHNlbFJvdHRDYXRlQ29kZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEuZXJyb3IpO1xuICAgIH1cbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAvL3RoaXMubGlzdCA9IGFhLmRhdGE7XG4gICAgbGV0IHN5c3RlbUluZm8gPSB3eC5nZXRTdG9yYWdlU3luYyhTWVNURU1fSU5GTyk7XG4gICAgdGhpcy53aW5kb3dIZWlnaHQgPSBzeXN0ZW1JbmZvLndpbmRvd0hlaWdodDtcbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG5cbiAgb25TaG93KCkge1xuICAgIHRoaXMuZ2V0Um9vdENhdGVUb3BMZXZlbCgpO1xuICB9XG5cbiAgY29tcHV0ZWQgPSB7XG5cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGNoYW5nZUNhdGUoZSkge1xuICAgICAgbGV0IHBpZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkOyAgIC8v6I635Y+W5b2T5YmN6KGM5LitIGRhdGEtaWTlsZ7mgKfnmoTlgLxcbiAgICAgIHRoaXMuZ2V0Q2hpbGRDYXRlKHBpZCk7XG4gICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFNFTF9DTEFTU19DT0RFLCBwaWQpO1xuICAgICAgLy/orr7nva7kuIDnuqfliIbnsbvnmoTpgInkuK3nirbmgIFcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yb290Y2F0ZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHJvb3RDYXRlID0gdGhpcy5yb290Y2F0ZUxpc3RbaV07XG4gICAgICAgIHJvb3RDYXRlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZiAocm9vdENhdGUuaWQgPT0gcGlkKSB7XG4gICAgICAgICAgcm9vdENhdGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIGlmIChyZXMuZnJvbSA9PT0gJ2J1dHRvbicpIHtcbiAgICAgICAgLy8g5p2l6Ieq6aG16Z2i5YaF6L2s5Y+R5oyJ6ZKuXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXJnZXQpXG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogdGhpcy5kZXRhaWwubmFtZSxcbiAgICAgICAgcGF0aDogJy9wYWdlcy9jbGFzc2lmeScsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAvLyDovazlj5HlpLHotKVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBldmVudHMgPSB7XG5cbiAgfVxufVxuXG4iXX0=