'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _constant = require('./../utils/constant.js');

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _wxParse = require('./../plugins/wxParse/wxParse.js');

var _wxParse2 = _interopRequireDefault(_wxParse);

var _comment_list = require('./../components/comment_list.js');

var _comment_list2 = _interopRequireDefault(_comment_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var goodsDetail = function (_wepy$page) {
  _inherits(goodsDetail, _wepy$page);

  function goodsDetail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, goodsDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = goodsDetail.__proto__ || Object.getPrototypeOf(goodsDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '商品详情'
    }, _this.data = {
      winWidth: 0,
      winHeight: '100%',
      goodsId: 0,
      detail: {},
      good_bigimg: [],
      //订单活动开始时间（格式yy-mm-dd 或者 yy/mm/dd ）
      //startTime: "2017-07-15 16:00:00",
      startTime: "",
      //订单活动结束时间（格式yy-mm-dd 或者 yy/mm/dd ）
      //endTime: "2017-07-21 16:04:00"
      endTime: "",
      hidden: true,
      //动画效果
      animationData: "",
      //购买方式:1-加购物车,2-立即购买
      orderType: 1,
      //购买数量
      orderNum: 1,
      //是否收藏
      isFavorite: false,
      isValidDate: true,
      canOrder: true, //是否能下单
      purchasetype: 1, //1-正常购买;2-补货
      purchaseText: "立即购买",
      special: 0, ////0-正常入库;1-特价专区和换货专区,
      commentList: [{
        url: "../images/icon_nav_01_new.png",
        name: "浪子天涯",
        time: "2017-10-01 10:10",
        content: "东西收到,很满意!!真的是超级好的卖家,解答疑问不厌其烦,细致认真,关键是东西好,而且货物发得超快,包装仔细,值得信赖!",
        start: 4.5,
        children: [{
          content: "跟你交易次次都这么成功和开心的．．希望我们以后有更多的交易吧．．．哈哈"
        }]
      }, {
        url: "../images/icon_nav_02_new.png",
        name: "勇闯天下",
        time: "2017-10-01 10:10",
        content: "太感谢了，衣服很漂亮，朋友很喜欢，最主要的是买家太好了~~~大大的赞一个。。。 衣服，很合身",
        start: 4,
        children: []
      }],
      commentList1: []
    }, _this.$repeat = {}, _this.$props = { "commentList": { "xmlns:v-bind": "", "v-bind:list.sync": "commentList" } }, _this.$events = {}, _this.components = {
      commentList: _comment_list2.default
    }, _this.computed = {}, _this.events = {}, _this.methods = {
      // issus : https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-navigate.html#wxrelaunchobject
      homePage: function homePage() {
        _wepy2.default.switchTab({
          url: '/pages/home'
        });
        // wx.switchTab({
        //   url: '/pages/home'
        // })
        // console.log(wepy)
        // console.log(wx)
      },
      moreComment: function moreComment() {
        _wepy2.default.navigateTo({
          url: "/pages/comment"
        });
      },
      previewImage: function previewImage(e) {
        var current = e.target.dataset.src;
        var imageArry = [];
        var obj = this.detail.photoList;
        Object.keys(obj).forEach(function (item) {
          imageArry.push(obj[item].photo);
        });
        wx.previewImage({
          current: current, // 当前显示图片的http链接
          urls: imageArry // 需要预览的图片http链接列表
        });
      },
      bindOrderNumInput: function bindOrderNumInput(e) {
        this.orderNum = e.detail.value;
      },
      takeOrder: function takeOrder() {
        if (!this.canOrder) {
          return;
        }
        this.showConfirmData();
        this.orderType = 2;
        //this.doTakeOrder();
      },
      takeCart: function takeCart() {
        if (!this.canOrder) {
          return;
        }
        this.showConfirmData();
        this.orderType = 1;
        //this.doTakeCart();
      },
      takeFavorite: function takeFavorite() {
        if (this.isFavorite == true) {
          this.goodsUnFavorite();
          console.log("取消收藏");
          console.log(this.isFavorite);
        } else {
          this.goodsFavorite();
          console.log("收藏");
        }
      },
      closeModel: function closeModel() {
        var _this2 = this;

        this.winHeight = "100%";
        this.animation.height(0).step();
        this.setData({
          animationData: this.animation.export()
        });
        setTimeout(function () {
          _this2.hidden = true;
          _this2.$apply();
        }, 100);
      },
      confirmTake: function confirmTake() {
        //确定购物车或者直接购买
        if (this.orderType == 1) {
          this.doTakeCart();
        } else if (this.orderType == 2) {
          this.doTakeOrder();
        }
      },
      jiaBtnTap: function jiaBtnTap(e) {
        this.orderNum++;
      },
      jianBtnTap: function jianBtnTap() {
        if (this.orderNum > 1) {
          this.orderNum--;
        }
      },
      selAttr: function selAttr(e) {
        var id = e.currentTarget.dataset.id;
        var nameid = e.currentTarget.dataset.nameid;
        var index = e.currentTarget.dataset.index;
        for (var i = 0; i < this.detail.goodsSkuNameList.length; i++) {
          var skuValList = this.detail.goodsSkuNameList[i].skuValList;
          for (var j = 0; j < skuValList.length; j++) {
            var skuVal = skuValList[j];
            if (skuVal.skuNameId == nameid) {
              skuVal.current = false;
              if (skuVal.skuValId == id) {
                skuVal.current = true;
                this.detail.goodsSkuValIds[index] = id;
                for (var k = 0; k < this.detail.goodsSkuList.length; k++) {
                  var skuValIds = JSON.parse(this.detail.goodsSkuList[k].skuValIds).toArray;
                  console.log("goodskuids..." + this.detail.goodsSkuList[k].skuValIds);
                  console.log("this goodskuids..." + this.detail.goodsSkuValIds);
                  if ("[" + this.detail.goodsSkuValIds.toString() + "]" === this.detail.goodsSkuList[k].skuValIds) {
                    console.log("goodskuids equals...");
                    this.detail.stockNum = this.detail.goodsSkuList[k].stockNum;
                    this.detail.price = this.detail.goodsSkuList[k].price;
                    this.$apply();
                    break;
                  }
                }
              }
            }
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
          path: '/pages/goods_detail?id=' + this.goodsId,
          success: function success(res) {
            // 转发成功
          },
          fail: function fail(res) {
            // 转发失败
          }
        };
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(goodsDetail, [{
    key: 'onLoad',
    value: function onLoad(option) {
      var that = this;
      this.orderNum = 1;
      this.purchasetype = 1;
      this.isFavorite = false;
      this.isValidDate = true;
      this.canOrder = true;
      this.hidden = true;
      this.winHeight = "100%";
      that.detail = {};
      that.$apply();
      //接收上一个页面传过来的参数
      that.goodsId = option.id;
      if (option.purchasetype != undefined) {
        this.purchasetype = option.purchasetype;
      }
      if (this.purchasetype == 2) {
        this.purchaseText = "申请补货";
      } else {
        this.purchaseText = "立即购买";
      }
      if (option.special != undefined) {
        this.special = option.special;
      }
      that.getGoodsDetail();
      that.addUserBrowser();
      console.log("special===" + this.special);
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.goodsIsFavorite();
      //创建动画
      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 200,
        timingFunction: "linear",
        delay: 0
      });
      this.animation = animation;
    }
  }, {
    key: 'wxParseImgLoad',
    value: function wxParseImgLoad(e) {}
  }, {
    key: 'wxParseImgTap',
    value: function wxParseImgTap(e) {
      var that = this;
      var nowImgUrl = e.target.dataset.src;
      var tagFrom = e.target.dataset.from;
      if (typeof tagFrom != 'undefined' && tagFrom.length > 0) {
        wx.previewImage({
          current: nowImgUrl, // 当前显示图片的http链接
          // urls: that.data[tagFrom].imageUrls // 需要预览的图片http链接列表
          urls: that.bindData[tagFrom].imageUrls // 注释掉上面的 换着一行 (http://blog.csdn.net/zhuming3834/article/details/74380079)
        });
      }
    }
    /*onReachBottom() {
      let that = this;
      if (that.good_bigimg.length == 0) {
        that.good_bigimg = that.detail.good_bigimg;
        that.$apply();
      }
    }*/

  }, {
    key: 'getGoodsDetail',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var that, json, time, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                //const json = await api.getGoodsDetail({

                _context.next = 3;
                return _api2.default.goodsDetail({
                  query: {
                    id: that.goodsId
                  }
                });

              case 3:
                json = _context.sent;
                time = {};

                if (json.data.code == 0) {
                  data = json.data.data;

                  that.detail = data;
                  _wxParse2.default.wxParse('detailInfo', 'html', that.detail.detailInfo, this);
                  time.endTime = that.detail.validEndTime;
                  time.startTime = that.detail.startTime;
                  /*time.startTime ="2017-07-15 16:00:00";
                  time.endTime = "2017-07-21 16:04:00";*/
                  if (json.data.validDate == "0") {
                    that.isValidDate = false;
                    if (this.purchasetype == 1 && this.special != 1) {
                      this.canOrder = false;
                    }
                  }
                } else {
                  if (json.data.msg) {
                    _tip2.default.error(json.data.msg);
                  } else {
                    _tip2.default.error('查看商品失败');
                  }
                }
                that.$apply();
                //this.$invoke('timer', 'initTimer', time);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getGoodsDetail() {
        return _ref2.apply(this, arguments);
      }

      return getGoodsDetail;
    }()
  }, {
    key: 'addUserBrowser',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var that, userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context2.next = 5;
                return _api2.default.addBrowser({
                  query: {
                    goodsId: that.goodsId,
                    openId: openId
                  }
                });

              case 5:
                json = _context2.sent;

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addUserBrowser() {
        return _ref3.apply(this, arguments);
      }

      return addUserBrowser;
    }()
  }, {
    key: 'doTakeCart',

    //加入购物车
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this3 = this;

        var that, userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context3.next = 5;
                return _api2.default.addCart({
                  query: {
                    openId: openId,
                    goodsId: that.goodsId,
                    goodsSkuId: this.detail.goodsSkuValIds,
                    purchaseType: this.purchasetype,
                    num: this.orderNum
                  }
                });

              case 5:
                json = _context3.sent;

                if (json.data.code == 0) {
                  this.winHeight = "100%";
                  this.animation.height(0).step();
                  this.setData({
                    animationData: this.animation.export()
                  });
                  setTimeout(function () {
                    _this3.hidden = true;
                    _this3.$apply();
                  }, 100);
                  _tip2.default.success("成功加入购物车");
                } else {
                  if (json.data.msg) {
                    _tip2.default.error(json.data.msg);
                  } else {
                    _tip2.default.error('无法加入购物车');
                  }
                }

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function doTakeCart() {
        return _ref4.apply(this, arguments);
      }

      return doTakeCart;
    }()
    //立即购买

  }, {
    key: 'doTakeOrder',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this4 = this;

        var that, userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context4.next = 5;
                return _api2.default.addCart({
                  query: {
                    openId: openId,
                    goodsId: that.goodsId,
                    goodsSkuId: this.detail.goodsSkuValIds,
                    purchaseType: this.purchasetype,
                    num: this.orderNum
                  }
                });

              case 5:
                json = _context4.sent;

                if (json.data.code == 0) {
                  this.winHeight = "100%";
                  this.animation.height(0).step();
                  this.setData({
                    animationData: this.animation.export()
                  });
                  setTimeout(function () {
                    _this4.hidden = true;
                    _this4.$apply();
                  }, 100);
                  _wepy2.default.navigateTo({
                    url: "/pages/comfire_order?goodsId=" + that.goodsId + "&purchasetype=" + that.purchasetype
                  });
                } else {
                  if (json.data.msg) {
                    _tip2.default.error(json.data.msg);
                  } else {
                    _tip2.default.error('无法立刻购买');
                  }
                }

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function doTakeOrder() {
        return _ref5.apply(this, arguments);
      }

      return doTakeOrder;
    }()
  }, {
    key: 'showConfirmData',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this5 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.animation.height('783rpx').step();
                this.setData({
                  animationData: this.animation.export()
                });
                setTimeout(function () {
                  _this5.hidden = false;
                  var systemInfo = _wepy2.default.getStorageSync(_constant.SYSTEM_INFO);
                  _this5.winHeight = systemInfo.windowHeight;
                  _this5.$apply();
                }, 100);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function showConfirmData() {
        return _ref6.apply(this, arguments);
      }

      return showConfirmData;
    }()
    //查看商品收藏状态

  }, {
    key: 'goodsIsFavorite',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var that, userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context6.next = 5;
                return _api2.default.goodsIsFavorite({
                  query: {
                    openId: openId,
                    goodsId: that.goodsId
                  }
                });

              case 5:
                json = _context6.sent;

                if (json.data.code == 0) {
                  if (json.data.isFavorite == 1) {
                    this.isFavorite = true;
                    console.log(this.isFavorite);
                  } else {
                    this.isFavorite = false;
                  }
                } else {
                  console.log('查看商品收藏失败');
                  if (json.data.msg) {
                    _tip2.default.error(json.data.msg);
                  } else {
                    _tip2.default.error('查看商品收藏失败');
                  }
                }
                that.$apply();

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function goodsIsFavorite() {
        return _ref7.apply(this, arguments);
      }

      return goodsIsFavorite;
    }()
    //商品收藏

  }, {
    key: 'goodsFavorite',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var that, userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context7.next = 5;
                return _api2.default.goodsFavorite({
                  query: {
                    openId: openId,
                    goodsId: that.goodsId
                  }
                });

              case 5:
                json = _context7.sent;

                if (json.data.code == 0) {
                  console.log("===========商品收藏成功=========");
                  this.isFavorite = true;
                  _tip2.default.toast("收藏成功");
                } else {
                  console.log(json.data);
                  _tip2.default.error('收藏失败');
                }
                that.$apply();

              case 8:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function goodsFavorite() {
        return _ref8.apply(this, arguments);
      }

      return goodsFavorite;
    }()
    //商品取消收藏

  }, {
    key: 'goodsUnFavorite',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var that, userSpecialInfo, openId, json;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                openId = userSpecialInfo.openid;
                _context8.next = 5;
                return _api2.default.goodsUnFavorite({
                  query: {
                    openId: openId,
                    goodsId: that.goodsId
                  }
                });

              case 5:
                json = _context8.sent;

                if (json.data.code == 0) {
                  console.log("===========商品取消收藏成功=========");
                  _tip2.default.toast("取消收藏成功");
                  this.isFavorite = false;
                } else {
                  console.log(json.data);
                  _tip2.default.error('取消收藏失败');
                }
                that.$apply();

              case 8:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function goodsUnFavorite() {
        return _ref9.apply(this, arguments);
      }

      return goodsUnFavorite;
    }()
  }]);

  return goodsDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(goodsDetail , 'pages/goods_detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzX2RldGFpbC5qcyJdLCJuYW1lcyI6WyJnb29kc0RldGFpbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwid2luV2lkdGgiLCJ3aW5IZWlnaHQiLCJnb29kc0lkIiwiZGV0YWlsIiwiZ29vZF9iaWdpbWciLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiaGlkZGVuIiwiYW5pbWF0aW9uRGF0YSIsIm9yZGVyVHlwZSIsIm9yZGVyTnVtIiwiaXNGYXZvcml0ZSIsImlzVmFsaWREYXRlIiwiY2FuT3JkZXIiLCJwdXJjaGFzZXR5cGUiLCJwdXJjaGFzZVRleHQiLCJzcGVjaWFsIiwiY29tbWVudExpc3QiLCJ1cmwiLCJuYW1lIiwidGltZSIsImNvbnRlbnQiLCJzdGFydCIsImNoaWxkcmVuIiwiY29tbWVudExpc3QxIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiY29tcHV0ZWQiLCJldmVudHMiLCJtZXRob2RzIiwiaG9tZVBhZ2UiLCJzd2l0Y2hUYWIiLCJtb3JlQ29tbWVudCIsIm5hdmlnYXRlVG8iLCJwcmV2aWV3SW1hZ2UiLCJlIiwiY3VycmVudCIsInRhcmdldCIsImRhdGFzZXQiLCJzcmMiLCJpbWFnZUFycnkiLCJvYmoiLCJwaG90b0xpc3QiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsIml0ZW0iLCJwdXNoIiwicGhvdG8iLCJ3eCIsInVybHMiLCJiaW5kT3JkZXJOdW1JbnB1dCIsInZhbHVlIiwidGFrZU9yZGVyIiwic2hvd0NvbmZpcm1EYXRhIiwidGFrZUNhcnQiLCJ0YWtlRmF2b3JpdGUiLCJnb29kc1VuRmF2b3JpdGUiLCJjb25zb2xlIiwibG9nIiwiZ29vZHNGYXZvcml0ZSIsImNsb3NlTW9kZWwiLCJhbmltYXRpb24iLCJoZWlnaHQiLCJzdGVwIiwic2V0RGF0YSIsImV4cG9ydCIsInNldFRpbWVvdXQiLCIkYXBwbHkiLCJjb25maXJtVGFrZSIsImRvVGFrZUNhcnQiLCJkb1Rha2VPcmRlciIsImppYUJ0blRhcCIsImppYW5CdG5UYXAiLCJzZWxBdHRyIiwiaWQiLCJjdXJyZW50VGFyZ2V0IiwibmFtZWlkIiwiaW5kZXgiLCJpIiwiZ29vZHNTa3VOYW1lTGlzdCIsImxlbmd0aCIsInNrdVZhbExpc3QiLCJqIiwic2t1VmFsIiwic2t1TmFtZUlkIiwic2t1VmFsSWQiLCJnb29kc1NrdVZhbElkcyIsImsiLCJnb29kc1NrdUxpc3QiLCJza3VWYWxJZHMiLCJKU09OIiwicGFyc2UiLCJ0b0FycmF5IiwidG9TdHJpbmciLCJzdG9ja051bSIsInByaWNlIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJyZXMiLCJmcm9tIiwidGl0bGUiLCJwYXRoIiwic3VjY2VzcyIsImZhaWwiLCJvcHRpb24iLCJ0aGF0IiwidW5kZWZpbmVkIiwiZ2V0R29vZHNEZXRhaWwiLCJhZGRVc2VyQnJvd3NlciIsImdvb2RzSXNGYXZvcml0ZSIsImNyZWF0ZUFuaW1hdGlvbiIsInRyYW5zZm9ybU9yaWdpbiIsImR1cmF0aW9uIiwidGltaW5nRnVuY3Rpb24iLCJkZWxheSIsIm5vd0ltZ1VybCIsInRhZ0Zyb20iLCJiaW5kRGF0YSIsImltYWdlVXJscyIsInF1ZXJ5IiwianNvbiIsImNvZGUiLCJ3eFBhcnNlIiwiZGV0YWlsSW5mbyIsInZhbGlkRW5kVGltZSIsInZhbGlkRGF0ZSIsIm1zZyIsImVycm9yIiwidXNlclNwZWNpYWxJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJvcGVuSWQiLCJvcGVuaWQiLCJhZGRCcm93c2VyIiwiYWRkQ2FydCIsImdvb2RzU2t1SWQiLCJwdXJjaGFzZVR5cGUiLCJudW0iLCJzeXN0ZW1JbmZvIiwid2luZG93SGVpZ2h0IiwidG9hc3QiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FB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TixvQkFBSUEsS0FBSzNILElBQUwsQ0FBVTRILElBQVYsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDdkIvRCwwQkFBUUMsR0FBUixDQUFZLDhCQUFaO0FBQ0EsZ0NBQUlnRixLQUFKLENBQVUsUUFBVjtBQUNBLHVCQUFLbEksVUFBTCxHQUFrQixLQUFsQjtBQUNELGlCQUpELE1BSU87QUFDTGlELDBCQUFRQyxHQUFSLENBQVk2RCxLQUFLM0gsSUFBakI7QUFDQSxnQ0FBSWtJLEtBQUosQ0FBVSxRQUFWO0FBQ0Q7QUFDRHRCLHFCQUFLckMsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTdUcUMsZUFBS3dFLEk7O2tCQUF6QmxKLFciLCJmaWxlIjoiZ29vZHNfZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHtcbiAgU1lTVEVNX0lORk8sXG4gIFVTRVJfU1BFQ0lDQUxfSU5GT1xufSBmcm9tICcuLi91dGlscy9jb25zdGFudCc7XG5pbXBvcnQgdGlwIGZyb20gJy4uL3V0aWxzL3RpcCdcbmltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSc7XG5pbXBvcnQgV3hQYXJzZSBmcm9tIFwiLi4vcGx1Z2lucy93eFBhcnNlL3d4UGFyc2VcIjtcbmltcG9ydCBDb21tZW50TGlzdCBmcm9tIFwiLi4vY29tcG9uZW50cy9jb21tZW50X2xpc3RcIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ29vZHNEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhSdcbiAgfVxuICBkYXRhID0ge1xuICAgIHdpbldpZHRoOiAwLFxuICAgIHdpbkhlaWdodDogJzEwMCUnLFxuICAgIGdvb2RzSWQ6IDAsXG4gICAgZGV0YWlsOiB7fSxcbiAgICBnb29kX2JpZ2ltZzogW10sXG4gICAgLy/orqLljZXmtLvliqjlvIDlp4vml7bpl7TvvIjmoLzlvI95eS1tbS1kZCDmiJbogIUgeXkvbW0vZGQg77yJXG4gICAgLy9zdGFydFRpbWU6IFwiMjAxNy0wNy0xNSAxNjowMDowMFwiLFxuICAgIHN0YXJ0VGltZTogXCJcIixcbiAgICAvL+iuouWNlea0u+WKqOe7k+adn+aXtumXtO+8iOagvOW8j3l5LW1tLWRkIOaIluiAhSB5eS9tbS9kZCDvvIlcbiAgICAvL2VuZFRpbWU6IFwiMjAxNy0wNy0yMSAxNjowNDowMFwiXG4gICAgZW5kVGltZTogXCJcIixcbiAgICBoaWRkZW46IHRydWUsXG4gICAgLy/liqjnlLvmlYjmnpxcbiAgICBhbmltYXRpb25EYXRhOiBcIlwiLFxuICAgIC8v6LSt5Lmw5pa55byPOjEt5Yqg6LSt54mp6L2mLDIt56uL5Y2z6LSt5LmwXG4gICAgb3JkZXJUeXBlOiAxLFxuICAgIC8v6LSt5Lmw5pWw6YePXG4gICAgb3JkZXJOdW06IDEsXG4gICAgLy/mmK/lkKbmlLbol49cbiAgICBpc0Zhdm9yaXRlOiBmYWxzZSxcbiAgICBpc1ZhbGlkRGF0ZTogdHJ1ZSxcbiAgICBjYW5PcmRlcjogdHJ1ZSwgLy/mmK/lkKbog73kuIvljZVcbiAgICBwdXJjaGFzZXR5cGU6IDEsIC8vMS3mraPluLjotK3kubA7Mi3ooaXotKdcbiAgICBwdXJjaGFzZVRleHQ6IFwi56uL5Y2z6LSt5LmwXCIsXG4gICAgc3BlY2lhbDogMCwgLy8vLzAt5q2j5bi45YWl5bqTOzEt54m55Lu35LiT5Yy65ZKM5o2i6LSn5LiT5Yy6LFxuICAgIGNvbW1lbnRMaXN0OiBbXG5cbiAgICAgIHtcbiAgICAgICAgdXJsOiBcIi4uL2ltYWdlcy9pY29uX25hdl8wMV9uZXcucG5nXCIsXG4gICAgICAgIG5hbWU6IFwi5rWq5a2Q5aSp5ravXCIsXG4gICAgICAgIHRpbWU6IFwiMjAxNy0xMC0wMSAxMDoxMFwiLFxuICAgICAgICBjb250ZW50OiBcIuS4nOilv+aUtuWIsCzlvojmu6HmhI8hIeecn+eahOaYr+i2hee6p+WlveeahOWNluWutizop6PnrZTnlpHpl67kuI3ljozlhbbng6Ys57uG6Ie06K6k55yfLOWFs+mUruaYr+S4nOilv+WlvSzogIzkuJTotKfnianlj5HlvpfotoXlv6ss5YyF6KOF5LuU57uGLOWAvOW+l+S/oei1liFcIixcbiAgICAgICAgc3RhcnQ6IDQuNSxcbiAgICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICAgY29udGVudDogXCLot5/kvaDkuqTmmJPmrKHmrKHpg73ov5nkuYjmiJDlip/lkozlvIDlv4PnmoTvvI7vvI7luIzmnJvmiJHku6zku6XlkI7mnInmm7TlpJrnmoTkuqTmmJPlkKfvvI7vvI7vvI7lk4jlk4hcIlxuICAgICAgICB9XVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdXJsOiBcIi4uL2ltYWdlcy9pY29uX25hdl8wMl9uZXcucG5nXCIsXG4gICAgICAgIG5hbWU6IFwi5YuH6Zev5aSp5LiLXCIsXG4gICAgICAgIHRpbWU6IFwiMjAxNy0xMC0wMSAxMDoxMFwiLFxuICAgICAgICBjb250ZW50OiBcIuWkquaEn+iwouS6hu+8jOiho+acjeW+iOa8guS6ru+8jOaci+WPi+W+iOWWnOasou+8jOacgOS4u+imgeeahOaYr+S5sOWutuWkquWlveS6hn5+fuWkp+Wkp+eahOi1nuS4gOS4quOAguOAguOAgiDooaPmnI3vvIzlvojlkIjouqtcIixcbiAgICAgICAgc3RhcnQ6IDQsXG4gICAgICAgIGNoaWxkcmVuOiBbXVxuICAgICAgfVxuXG5cbiAgICBdLFxuICAgIGNvbW1lbnRMaXN0MTogW10sXG4gIH1cblxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiY29tbWVudExpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwiY29tbWVudExpc3RcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIGNvbW1lbnRMaXN0OiBDb21tZW50TGlzdFxuICB9XG4gIG9uTG9hZChvcHRpb24pIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgdGhpcy5vcmRlck51bSA9IDE7XG4gICAgdGhpcy5wdXJjaGFzZXR5cGUgPSAxO1xuICAgIHRoaXMuaXNGYXZvcml0ZSA9IGZhbHNlO1xuICAgIHRoaXMuaXNWYWxpZERhdGUgPSB0cnVlO1xuICAgIHRoaXMuY2FuT3JkZXIgPSB0cnVlO1xuICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcbiAgICB0aGlzLndpbkhlaWdodCA9IFwiMTAwJVwiO1xuICAgIHRoYXQuZGV0YWlsID0ge307XG4gICAgdGhhdC4kYXBwbHkoKTtcbiAgICAvL+aOpeaUtuS4iuS4gOS4qumhtemdouS8oOi/h+adpeeahOWPguaVsFxuICAgIHRoYXQuZ29vZHNJZCA9IG9wdGlvbi5pZDtcbiAgICBpZiAob3B0aW9uLnB1cmNoYXNldHlwZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMucHVyY2hhc2V0eXBlID0gb3B0aW9uLnB1cmNoYXNldHlwZTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHVyY2hhc2V0eXBlID09IDIpIHtcbiAgICAgIHRoaXMucHVyY2hhc2VUZXh0ID0gXCLnlLPor7fooaXotKdcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wdXJjaGFzZVRleHQgPSBcIueri+WNs+i0reS5sFwiO1xuICAgIH1cbiAgICBpZiAob3B0aW9uLnNwZWNpYWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNwZWNpYWwgPSBvcHRpb24uc3BlY2lhbDtcbiAgICB9XG4gICAgdGhhdC5nZXRHb29kc0RldGFpbCgpO1xuICAgIHRoYXQuYWRkVXNlckJyb3dzZXIoKTtcbiAgICBjb25zb2xlLmxvZyhcInNwZWNpYWw9PT1cIiArIHRoaXMuc3BlY2lhbCk7XG4gIH1cbiAgb25TaG93KCkge1xuICAgIHRoaXMuZ29vZHNJc0Zhdm9yaXRlKCk7XG4gICAgLy/liJvlu7rliqjnlLtcbiAgICB2YXIgYW5pbWF0aW9uID0gd3guY3JlYXRlQW5pbWF0aW9uKHtcbiAgICAgIHRyYW5zZm9ybU9yaWdpbjogXCI1MCUgNTAlXCIsXG4gICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgdGltaW5nRnVuY3Rpb246IFwibGluZWFyXCIsXG4gICAgICBkZWxheTogMFxuICAgIH0pXG4gICAgdGhpcy5hbmltYXRpb24gPSBhbmltYXRpb247XG4gIH1cbiAgd3hQYXJzZUltZ0xvYWQoZSkge1xuICB9XG5cbiAgd3hQYXJzZUltZ1RhcChlKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyIG5vd0ltZ1VybCA9IGUudGFyZ2V0LmRhdGFzZXQuc3JjXG4gICAgdmFyIHRhZ0Zyb20gPSBlLnRhcmdldC5kYXRhc2V0LmZyb21cbiAgICBpZiAodHlwZW9mICh0YWdGcm9tKSAhPSAndW5kZWZpbmVkJyAmJiB0YWdGcm9tLmxlbmd0aCA+IDApIHtcbiAgICAgIHd4LnByZXZpZXdJbWFnZSh7XG4gICAgICAgIGN1cnJlbnQ6IG5vd0ltZ1VybCwgLy8g5b2T5YmN5pi+56S65Zu+54mH55qEaHR0cOmTvuaOpVxuICAgICAgICAvLyB1cmxzOiB0aGF0LmRhdGFbdGFnRnJvbV0uaW1hZ2VVcmxzIC8vIOmcgOimgemihOiniOeahOWbvueJh2h0dHDpk77mjqXliJfooahcbiAgICAgICAgdXJsczogdGhhdC5iaW5kRGF0YVt0YWdGcm9tXS5pbWFnZVVybHMgIC8vIOazqOmHiuaOieS4iumdoueahCDmjaLnnYDkuIDooYwgKGh0dHA6Ly9ibG9nLmNzZG4ubmV0L3podW1pbmczODM0L2FydGljbGUvZGV0YWlscy83NDM4MDA3OSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIC8qb25SZWFjaEJvdHRvbSgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgaWYgKHRoYXQuZ29vZF9iaWdpbWcubGVuZ3RoID09IDApIHtcbiAgICAgIHRoYXQuZ29vZF9iaWdpbWcgPSB0aGF0LmRldGFpbC5nb29kX2JpZ2ltZztcbiAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgfVxuICB9Ki9cbiAgYXN5bmMgZ2V0R29vZHNEZXRhaWwoKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIC8vY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRHb29kc0RldGFpbCh7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nb29kc0RldGFpbCh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBpZDogdGhhdC5nb29kc0lkXG4gICAgICB9XG4gICAgfSk7XG4gICAgbGV0IHRpbWUgPSB7fTtcbiAgICBpZiAoanNvbi5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgbGV0IGRhdGEgPSBqc29uLmRhdGEuZGF0YTtcbiAgICAgIHRoYXQuZGV0YWlsID0gZGF0YTtcbiAgICAgIFd4UGFyc2Uud3hQYXJzZSgnZGV0YWlsSW5mbycsICdodG1sJywgdGhhdC5kZXRhaWwuZGV0YWlsSW5mbywgdGhpcyk7XG4gICAgICB0aW1lLmVuZFRpbWUgPSB0aGF0LmRldGFpbC52YWxpZEVuZFRpbWU7XG4gICAgICB0aW1lLnN0YXJ0VGltZSA9IHRoYXQuZGV0YWlsLnN0YXJ0VGltZTtcbiAgICAgIC8qdGltZS5zdGFydFRpbWUgPVwiMjAxNy0wNy0xNSAxNjowMDowMFwiO1xuICAgICAgdGltZS5lbmRUaW1lID0gXCIyMDE3LTA3LTIxIDE2OjA0OjAwXCI7Ki9cbiAgICAgIGlmIChqc29uLmRhdGEudmFsaWREYXRlID09IFwiMFwiKSB7XG4gICAgICAgIHRoYXQuaXNWYWxpZERhdGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMucHVyY2hhc2V0eXBlID09IDEgJiYgdGhpcy5zcGVjaWFsICE9IDEpIHtcbiAgICAgICAgICB0aGlzLmNhbk9yZGVyID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGpzb24uZGF0YS5tc2cpIHtcbiAgICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5tc2cpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aXAuZXJyb3IoJ+afpeeci+WVhuWTgeWksei0pScpXG4gICAgICB9XG4gICAgfVxuICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgLy90aGlzLiRpbnZva2UoJ3RpbWVyJywgJ2luaXRUaW1lcicsIHRpbWUpO1xuICB9XG4gIGFzeW5jIGFkZFVzZXJCcm93c2VyKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8pIHx8IHt9O1xuICAgIGxldCBvcGVuSWQgPSB1c2VyU3BlY2lhbEluZm8ub3BlbmlkO1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuYWRkQnJvd3Nlcih7XG4gICAgICBxdWVyeToge1xuICAgICAgICBnb29kc0lkOiB0aGF0Lmdvb2RzSWQsXG4gICAgICAgIG9wZW5JZDogb3BlbklkXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgY29tcHV0ZWQgPSB7fVxuICBldmVudHMgPSB7fVxuICAvL+WKoOWFpei0reeJqei9plxuICBhc3luYyBkb1Rha2VDYXJ0KCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8pIHx8IHt9O1xuICAgIGxldCBvcGVuSWQgPSB1c2VyU3BlY2lhbEluZm8ub3BlbmlkO1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuYWRkQ2FydCh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBvcGVuSWQ6IG9wZW5JZCxcbiAgICAgICAgZ29vZHNJZDogdGhhdC5nb29kc0lkLFxuICAgICAgICBnb29kc1NrdUlkOiB0aGlzLmRldGFpbC5nb29kc1NrdVZhbElkcyxcbiAgICAgICAgcHVyY2hhc2VUeXBlOiB0aGlzLnB1cmNoYXNldHlwZSxcbiAgICAgICAgbnVtOiB0aGlzLm9yZGVyTnVtXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgIHRoaXMud2luSGVpZ2h0ID0gXCIxMDAlXCI7XG4gICAgICB0aGlzLmFuaW1hdGlvbi5oZWlnaHQoMCkuc3RlcCgpO1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgYW5pbWF0aW9uRGF0YTogdGhpcy5hbmltYXRpb24uZXhwb3J0KClcbiAgICAgIH0pXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSwgMTAwKVxuICAgICAgdGlwLnN1Y2Nlc3MoXCLmiJDlip/liqDlhaXotK3nianovaZcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChqc29uLmRhdGEubXNnKSB7XG4gICAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGlwLmVycm9yKCfml6Dms5XliqDlhaXotK3nianovaYnKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvL+eri+WNs+i0reS5sFxuICBhc3luYyBkb1Rha2VPcmRlcigpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmFkZENhcnQoe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgIGdvb2RzSWQ6IHRoYXQuZ29vZHNJZCxcbiAgICAgICAgZ29vZHNTa3VJZDogdGhpcy5kZXRhaWwuZ29vZHNTa3VWYWxJZHMsXG4gICAgICAgIHB1cmNoYXNlVHlwZTogdGhpcy5wdXJjaGFzZXR5cGUsXG4gICAgICAgIG51bTogdGhpcy5vcmRlck51bVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICB0aGlzLndpbkhlaWdodCA9IFwiMTAwJVwiO1xuICAgICAgdGhpcy5hbmltYXRpb24uaGVpZ2h0KDApLnN0ZXAoKTtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGFuaW1hdGlvbkRhdGE6IHRoaXMuYW5pbWF0aW9uLmV4cG9ydCgpXG4gICAgICB9KVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sIDEwMClcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogXCIvcGFnZXMvY29tZmlyZV9vcmRlcj9nb29kc0lkPVwiICsgdGhhdC5nb29kc0lkICsgXCImcHVyY2hhc2V0eXBlPVwiICsgdGhhdC5wdXJjaGFzZXR5cGVcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChqc29uLmRhdGEubXNnKSB7XG4gICAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGlwLmVycm9yKCfml6Dms5Xnq4vliLvotK3kubAnKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBhc3luYyBzaG93Q29uZmlybURhdGEoKSB7XG4gICAgdGhpcy5hbmltYXRpb24uaGVpZ2h0KCc3ODNycHgnKS5zdGVwKCk7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGFuaW1hdGlvbkRhdGE6IHRoaXMuYW5pbWF0aW9uLmV4cG9ydCgpXG4gICAgfSlcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG4gICAgICBsZXQgc3lzdGVtSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoU1lTVEVNX0lORk8pO1xuICAgICAgdGhpcy53aW5IZWlnaHQgPSBzeXN0ZW1JbmZvLndpbmRvd0hlaWdodDtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSwgMTAwKVxuICB9XG4gIC8v5p+l55yL5ZWG5ZOB5pS26JeP54q25oCBXG4gIGFzeW5jIGdvb2RzSXNGYXZvcml0ZSgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdvb2RzSXNGYXZvcml0ZSh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBvcGVuSWQ6IG9wZW5JZCxcbiAgICAgICAgZ29vZHNJZDogdGhhdC5nb29kc0lkXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgIGlmIChqc29uLmRhdGEuaXNGYXZvcml0ZSA9PSAxKSB7XG4gICAgICAgIHRoaXMuaXNGYXZvcml0ZSA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaXNGYXZvcml0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzRmF2b3JpdGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ+afpeeci+WVhuWTgeaUtuiXj+Wksei0pScpXG4gICAgICBpZiAoanNvbi5kYXRhLm1zZykge1xuICAgICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLm1zZylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpcC5lcnJvcign5p+l55yL5ZWG5ZOB5pS26JeP5aSx6LSlJylcbiAgICAgIH1cbiAgICB9XG4gICAgdGhhdC4kYXBwbHkoKTtcbiAgfVxuICAvL+WVhuWTgeaUtuiXj1xuICBhc3luYyBnb29kc0Zhdm9yaXRlKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8pIHx8IHt9O1xuICAgIGxldCBvcGVuSWQgPSB1c2VyU3BlY2lhbEluZm8ub3BlbmlkO1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ29vZHNGYXZvcml0ZSh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBvcGVuSWQ6IG9wZW5JZCxcbiAgICAgICAgZ29vZHNJZDogdGhhdC5nb29kc0lkXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT3llYblk4HmlLbol4/miJDlip89PT09PT09PT1cIilcbiAgICAgIHRoaXMuaXNGYXZvcml0ZSA9IHRydWU7XG4gICAgICB0aXAudG9hc3QoXCLmlLbol4/miJDlip9cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKGpzb24uZGF0YSlcbiAgICAgIHRpcC5lcnJvcign5pS26JeP5aSx6LSlJylcbiAgICB9XG4gICAgdGhhdC4kYXBwbHkoKTtcbiAgfVxuICAvL+WVhuWTgeWPlua2iOaUtuiXj1xuICBhc3luYyBnb29kc1VuRmF2b3JpdGUoKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgbGV0IG9wZW5JZCA9IHVzZXJTcGVjaWFsSW5mby5vcGVuaWQ7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nb29kc1VuRmF2b3JpdGUoe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgIGdvb2RzSWQ6IHRoYXQuZ29vZHNJZFxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT095ZWG5ZOB5Y+W5raI5pS26JeP5oiQ5YqfPT09PT09PT09XCIpXG4gICAgICB0aXAudG9hc3QoXCLlj5bmtojmlLbol4/miJDlip9cIik7XG4gICAgICB0aGlzLmlzRmF2b3JpdGUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coanNvbi5kYXRhKVxuICAgICAgdGlwLmVycm9yKCflj5bmtojmlLbol4/lpLHotKUnKVxuICAgIH1cbiAgICB0aGF0LiRhcHBseSgpO1xuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgLy8gaXNzdXMgOiBodHRwczovL21wLndlaXhpbi5xcS5jb20vZGVidWcvd3hhZG9jL2Rldi9hcGkvdWktbmF2aWdhdGUuaHRtbCN3eHJlbGF1bmNob2JqZWN0XG4gICAgaG9tZVBhZ2UoKSB7XG4gICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogJy9wYWdlcy9ob21lJ1xuICAgICAgfSlcbiAgICAgIC8vIHd4LnN3aXRjaFRhYih7XG4gICAgICAvLyAgIHVybDogJy9wYWdlcy9ob21lJ1xuICAgICAgLy8gfSlcbiAgICAgIC8vIGNvbnNvbGUubG9nKHdlcHkpXG4gICAgICAvLyBjb25zb2xlLmxvZyh3eClcbiAgICB9LFxuICAgIG1vcmVDb21tZW50KCkge1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBcIi9wYWdlcy9jb21tZW50XCJcbiAgICAgIH0pXG4gICAgfSxcbiAgICBwcmV2aWV3SW1hZ2UoZSkge1xuICAgICAgbGV0IGN1cnJlbnQgPSBlLnRhcmdldC5kYXRhc2V0LnNyYztcbiAgICAgIGxldCBpbWFnZUFycnkgPSBbXTtcbiAgICAgIGxldCBvYmogPSB0aGlzLmRldGFpbC5waG90b0xpc3Q7XG4gICAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaW1hZ2VBcnJ5LnB1c2gob2JqW2l0ZW1dLnBob3RvKVxuICAgICAgfSk7XG4gICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xuICAgICAgICBjdXJyZW50OiBjdXJyZW50LCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXG4gICAgICAgIHVybHM6IGltYWdlQXJyeSwgLy8g6ZyA6KaB6aKE6KeI55qE5Zu+54mHaHR0cOmTvuaOpeWIl+ihqFxuICAgICAgfSlcbiAgICB9LFxuICAgIGJpbmRPcmRlck51bUlucHV0KGUpIHtcbiAgICAgIHRoaXMub3JkZXJOdW0gPSBlLmRldGFpbC52YWx1ZTtcbiAgICB9LFxuICAgIHRha2VPcmRlcigpIHtcbiAgICAgIGlmICghdGhpcy5jYW5PcmRlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnNob3dDb25maXJtRGF0YSgpO1xuICAgICAgdGhpcy5vcmRlclR5cGUgPSAyO1xuICAgICAgLy90aGlzLmRvVGFrZU9yZGVyKCk7XG4gICAgfSxcbiAgICB0YWtlQ2FydCgpIHtcbiAgICAgIGlmICghdGhpcy5jYW5PcmRlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnNob3dDb25maXJtRGF0YSgpO1xuICAgICAgdGhpcy5vcmRlclR5cGUgPSAxO1xuICAgICAgLy90aGlzLmRvVGFrZUNhcnQoKTtcbiAgICB9LFxuICAgIHRha2VGYXZvcml0ZSgpIHtcbiAgICAgIGlmICh0aGlzLmlzRmF2b3JpdGUgPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmdvb2RzVW5GYXZvcml0ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIuWPlua2iOaUtuiXj1wiKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pc0Zhdm9yaXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZ29vZHNGYXZvcml0ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIuaUtuiXj1wiKVxuICAgICAgfVxuICAgIH0sXG4gICAgY2xvc2VNb2RlbCgpIHtcbiAgICAgIHRoaXMud2luSGVpZ2h0ID0gXCIxMDAlXCI7XG4gICAgICB0aGlzLmFuaW1hdGlvbi5oZWlnaHQoMCkuc3RlcCgpO1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgYW5pbWF0aW9uRGF0YTogdGhpcy5hbmltYXRpb24uZXhwb3J0KClcbiAgICAgIH0pXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSwgMTAwKVxuICAgIH0sXG4gICAgY29uZmlybVRha2UoKSB7IC8v56Gu5a6a6LSt54mp6L2m5oiW6ICF55u05o6l6LSt5LmwXG4gICAgICBpZiAodGhpcy5vcmRlclR5cGUgPT0gMSkge1xuICAgICAgICB0aGlzLmRvVGFrZUNhcnQoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlclR5cGUgPT0gMikge1xuICAgICAgICB0aGlzLmRvVGFrZU9yZGVyKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBqaWFCdG5UYXAoZSkge1xuICAgICAgdGhpcy5vcmRlck51bSsrO1xuICAgIH0sXG4gICAgamlhbkJ0blRhcCgpIHtcbiAgICAgIGlmICh0aGlzLm9yZGVyTnVtID4gMSkge1xuICAgICAgICB0aGlzLm9yZGVyTnVtLS07XG4gICAgICB9XG4gICAgfSxcbiAgICBzZWxBdHRyKGUpIHtcbiAgICAgIHZhciBpZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkO1xuICAgICAgdmFyIG5hbWVpZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVpZDtcbiAgICAgIHZhciBpbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRldGFpbC5nb29kc1NrdU5hbWVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBza3VWYWxMaXN0ID0gdGhpcy5kZXRhaWwuZ29vZHNTa3VOYW1lTGlzdFtpXS5za3VWYWxMaXN0O1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNrdVZhbExpc3QubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgc2t1VmFsID0gc2t1VmFsTGlzdFtqXTtcbiAgICAgICAgICBpZiAoc2t1VmFsLnNrdU5hbWVJZCA9PSBuYW1laWQpIHtcbiAgICAgICAgICAgIHNrdVZhbC5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoc2t1VmFsLnNrdVZhbElkID09IGlkKSB7XG4gICAgICAgICAgICAgIHNrdVZhbC5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy5kZXRhaWwuZ29vZHNTa3VWYWxJZHNbaW5kZXhdID0gaWQ7XG4gICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5kZXRhaWwuZ29vZHNTa3VMaXN0Lmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNrdVZhbElkcyA9IEpTT04ucGFyc2UodGhpcy5kZXRhaWwuZ29vZHNTa3VMaXN0W2tdLnNrdVZhbElkcykudG9BcnJheTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdvb2Rza3VpZHMuLi5cIiArIHRoaXMuZGV0YWlsLmdvb2RzU2t1TGlzdFtrXS5za3VWYWxJZHMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcyBnb29kc2t1aWRzLi4uXCIgKyB0aGlzLmRldGFpbC5nb29kc1NrdVZhbElkcyk7XG4gICAgICAgICAgICAgICAgaWYgKFwiW1wiICsgdGhpcy5kZXRhaWwuZ29vZHNTa3VWYWxJZHMudG9TdHJpbmcoKSArIFwiXVwiID09PSB0aGlzLmRldGFpbC5nb29kc1NrdUxpc3Rba10uc2t1VmFsSWRzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdvb2Rza3VpZHMgZXF1YWxzLi4uXCIpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWwuc3RvY2tOdW0gPSB0aGlzLmRldGFpbC5nb29kc1NrdUxpc3Rba10uc3RvY2tOdW07XG4gICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbC5wcmljZSA9IHRoaXMuZGV0YWlsLmdvb2RzU2t1TGlzdFtrXS5wcmljZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgIGlmIChyZXMuZnJvbSA9PT0gJ2J1dHRvbicpIHtcbiAgICAgICAgLy8g5p2l6Ieq6aG16Z2i5YaF6L2s5Y+R5oyJ6ZKuXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXJnZXQpXG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogdGhpcy5kZXRhaWwubmFtZSxcbiAgICAgICAgcGF0aDogJy9wYWdlcy9nb29kc19kZXRhaWw/aWQ9JyArIHRoaXMuZ29vZHNJZCxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbiJdfQ==