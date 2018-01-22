'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _constant = require('./../utils/constant.js');

var _wepyAreaPicker = require('./common/wepy-area-picker.js');

var _wepyAreaPicker2 = _interopRequireDefault(_wepyAreaPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddressAdd = function (_wepy$component) {
  _inherits(AddressAdd, _wepy$component);

  function AddressAdd() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AddressAdd);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AddressAdd.__proto__ || Object.getPrototypeOf(AddressAdd)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      isDefult: false,
      province: '',
      city: '',
      area: '',
      provinceCode: '',
      cityCode: '',
      areaCode: ''
    }, _this.$repeat = {}, _this.$props = { "areaPicker": { "xmlns:v-on": "" } }, _this.$events = { "areaPicker": { "v-on:areaArray": "areaPickerArray" } }, _this.components = {
      areaPicker: _wepyAreaPicker2.default
    }, _this.methods = {
      changeCheckBoxState: function changeCheckBoxState() {
        this.isDefult = !this.isDefult;
      },
      up: function up() {
        this.$emit('upup', 'hehe'); //主动触发upup方法，'hehe'为向父组件传递的数据
      },
      formSubmit: function formSubmit(e) {

        var receiverName = e.detail.value.receiverName;
        var mobile = e.detail.value.mobile;
        var addressDetail = e.detail.value.addressDetail;

        if (receiverName == "") {
          _tip2.default.alert("输入收件人姓名");
          return false;
        }
        if (mobile == "") {
          _tip2.default.alert("输入联系电话");
          return false;
        }
        if (addressDetail == "") {
          _tip2.default.alert("输入详细地址");
          return false;
        }
        this.addAddress(e.detail.value);
      },
      openAddressPicker: function openAddressPicker() {
        this.$invoke('areaPicker', 'openAddressPicker');
      },
      areaPickerArray: function areaPickerArray(province, city, area) {
        console.log("ddddddddd11111111");
        this.province = province;
        this.city = city;
        this.area = area;

        this.provinceCode = province.code;
        this.cityCode = city.code;
        this.areaCode = area.code;
        console.log(this.provinceCode);
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AddressAdd, [{
    key: 'addAddress',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(address) {
        var that, userSpecialInfo, isDefult, openId, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;

                console.log("=======province=======");
                console.log(that.province);
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                isDefult = 0;

                if (this.isDefult) {
                  isDefult = 1;
                }
                openId = userSpecialInfo.openid;

                console.log("address:");
                console.log(address);
                _context.next = 11;
                return _api2.default.saveAddress({
                  query: {
                    openId: openId,
                    address: address,
                    isDef: isDefult,
                    province: that.provinceCode,
                    city: that.cityCode,
                    area: that.areaCode
                  }
                });

              case 11:
                json = _context.sent;

                if (json.data.code == 0) {
                  //0 列表 1新增 2编辑 (显示列表)
                  this.$emit('currentPage', 0);
                  this.$emit('refreshAddList', 'hehe');
                } else {
                  _tip2.default.error(json.data.msg);
                }
                that.showLoading = false;

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addAddress(_x) {
        return _ref2.apply(this, arguments);
      }

      return addAddress;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return AddressAdd;
}(_wepy2.default.component);

exports.default = AddressAdd;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3NfYWRkLmpzIl0sIm5hbWVzIjpbIkFkZHJlc3NBZGQiLCJkYXRhIiwiaXNEZWZ1bHQiLCJwcm92aW5jZSIsImNpdHkiLCJhcmVhIiwicHJvdmluY2VDb2RlIiwiY2l0eUNvZGUiLCJhcmVhQ29kZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImFyZWFQaWNrZXIiLCJtZXRob2RzIiwiY2hhbmdlQ2hlY2tCb3hTdGF0ZSIsInVwIiwiJGVtaXQiLCJmb3JtU3VibWl0IiwiZSIsInJlY2VpdmVyTmFtZSIsImRldGFpbCIsInZhbHVlIiwibW9iaWxlIiwiYWRkcmVzc0RldGFpbCIsImFsZXJ0IiwiYWRkQWRkcmVzcyIsIm9wZW5BZGRyZXNzUGlja2VyIiwiJGludm9rZSIsImFyZWFQaWNrZXJBcnJheSIsImNvbnNvbGUiLCJsb2ciLCJjb2RlIiwiJGFwcGx5IiwiYWRkcmVzcyIsInRoYXQiLCJ1c2VyU3BlY2lhbEluZm8iLCJnZXRTdG9yYWdlU3luYyIsIm9wZW5JZCIsIm9wZW5pZCIsInNhdmVBZGRyZXNzIiwicXVlcnkiLCJpc0RlZiIsImpzb24iLCJlcnJvciIsIm1zZyIsInNob3dMb2FkaW5nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsSSxHQUFPO0FBQ0xDLGdCQUFVLEtBREw7QUFFTEMsZ0JBQVUsRUFGTDtBQUdMQyxZQUFNLEVBSEQ7QUFJTEMsWUFBTSxFQUpEO0FBS0xDLG9CQUFjLEVBTFQ7QUFNTEMsZ0JBQVUsRUFOTDtBQU9MQyxnQkFBVTtBQVBMLEssUUFVUkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsY0FBYSxFQUFDLGNBQWEsRUFBZCxFQUFkLEUsUUFDVEMsTyxHQUFVLEVBQUMsY0FBYSxFQUFDLGtCQUFpQixpQkFBbEIsRUFBZCxF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LHFCQUFLVyxXQUFMLEdBQW1CLEtBQW5COzs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBK0NPLENBRVI7Ozs7RUFqR3FDLGVBQUtDLFM7O2tCQUF4Qi9DLFUiLCJmaWxlIjoiYWRkcmVzc19hZGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHRpcCBmcm9tICcuLi91dGlscy90aXAnO1xuaW1wb3J0IGFwaSBmcm9tIFwiLi4vYXBpL2FwaVwiO1xuaW1wb3J0IHtcbiAgVVNFUl9TUEVDSUNBTF9JTkZPXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50JztcbmltcG9ydCBBcmVhUGlja2VyIGZyb20gXCIuL2NvbW1vbi93ZXB5LWFyZWEtcGlja2VyXCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3NBZGQgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIGRhdGEgPSB7XG4gICAgaXNEZWZ1bHQ6IGZhbHNlLFxuICAgIHByb3ZpbmNlOiAnJyxcbiAgICBjaXR5OiAnJyxcbiAgICBhcmVhOiAnJyxcbiAgICBwcm92aW5jZUNvZGU6ICcnLFxuICAgIGNpdHlDb2RlOiAnJyxcbiAgICBhcmVhQ29kZTogJydcbiAgfVxuXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJhcmVhUGlja2VyXCI6e1wieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcImFyZWFQaWNrZXJcIjp7XCJ2LW9uOmFyZWFBcnJheVwiOlwiYXJlYVBpY2tlckFycmF5XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgYXJlYVBpY2tlcjogQXJlYVBpY2tlclxuICB9XG5cbiAgYXN5bmMgYWRkQWRkcmVzcyhhZGRyZXNzKSB7XG5cbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgY29uc29sZS5sb2coXCI9PT09PT09cHJvdmluY2U9PT09PT09XCIpO1xuICAgIGNvbnNvbGUubG9nKHRoYXQucHJvdmluY2UpO1xuICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgbGV0IGlzRGVmdWx0ID0gMDtcbiAgICBpZiAodGhpcy5pc0RlZnVsdCkge1xuICAgICAgaXNEZWZ1bHQgPSAxO1xuICAgIH1cbiAgICBsZXQgb3BlbklkID0gdXNlclNwZWNpYWxJbmZvLm9wZW5pZDtcbiAgICBjb25zb2xlLmxvZyhcImFkZHJlc3M6XCIpO1xuICAgIGNvbnNvbGUubG9nKGFkZHJlc3MpO1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuc2F2ZUFkZHJlc3Moe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgIGlzRGVmOiBpc0RlZnVsdCxcbiAgICAgICAgcHJvdmluY2U6dGhhdC5wcm92aW5jZUNvZGUsXG4gICAgICAgIGNpdHk6dGhhdC5jaXR5Q29kZSxcbiAgICAgICAgYXJlYTp0aGF0LmFyZWFDb2RlXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgIC8vMCDliJfooaggMeaWsOWiniAy57yW6L6RICjmmL7npLrliJfooagpXG4gICAgICB0aGlzLiRlbWl0KCdjdXJyZW50UGFnZScsIDApO1xuICAgICAgdGhpcy4kZW1pdCgncmVmcmVzaEFkZExpc3QnLCAnaGVoZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLm1zZylcbiAgICB9XG4gICAgdGhhdC5zaG93TG9hZGluZyA9IGZhbHNlO1xuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgY2hhbmdlQ2hlY2tCb3hTdGF0ZSgpIHtcbiAgICAgIHRoaXMuaXNEZWZ1bHQgPSAhdGhpcy5pc0RlZnVsdDtcbiAgICB9LFxuICAgIHVwKCkge1xuICAgICAgdGhpcy4kZW1pdCgndXB1cCcsICdoZWhlJyk7IC8v5Li75Yqo6Kem5Y+RdXB1cOaWueazle+8jCdoZWhlJ+S4uuWQkeeItue7hOS7tuS8oOmAkueahOaVsOaNrlxuICAgIH0sXG4gICAgZm9ybVN1Ym1pdChlKSB7XG5cbiAgICAgIGxldCByZWNlaXZlck5hbWUgPSBlLmRldGFpbC52YWx1ZS5yZWNlaXZlck5hbWU7XG4gICAgICBsZXQgbW9iaWxlID0gZS5kZXRhaWwudmFsdWUubW9iaWxlO1xuICAgICAgbGV0IGFkZHJlc3NEZXRhaWwgPSBlLmRldGFpbC52YWx1ZS5hZGRyZXNzRGV0YWlsO1xuXG4gICAgICBpZiAocmVjZWl2ZXJOYW1lID09IFwiXCIpIHtcbiAgICAgICAgdGlwLmFsZXJ0KFwi6L6T5YWl5pS25Lu25Lq65aeT5ZCNXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAobW9iaWxlID09IFwiXCIpIHtcbiAgICAgICAgdGlwLmFsZXJ0KFwi6L6T5YWl6IGU57O755S16K+dXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIH1cbiAgICAgIGlmIChhZGRyZXNzRGV0YWlsID09IFwiXCIpIHtcbiAgICAgICAgdGlwLmFsZXJ0KFwi6L6T5YWl6K+m57uG5Zyw5Z2AXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLmFkZEFkZHJlc3MoZS5kZXRhaWwudmFsdWUpO1xuICAgIH0sXG4gICAgb3BlbkFkZHJlc3NQaWNrZXIoKSB7XG4gICAgICB0aGlzLiRpbnZva2UoJ2FyZWFQaWNrZXInLCAnb3BlbkFkZHJlc3NQaWNrZXInKTtcbiAgICB9LFxuICAgIGFyZWFQaWNrZXJBcnJheShwcm92aW5jZSwgY2l0eSwgYXJlYSkge1xuICAgICAgY29uc29sZS5sb2coXCJkZGRkZGRkZGQxMTExMTExMVwiKTtcbiAgICAgIHRoaXMucHJvdmluY2UgPSBwcm92aW5jZTtcbiAgICAgIHRoaXMuY2l0eSA9IGNpdHk7XG4gICAgICB0aGlzLmFyZWEgPSBhcmVhO1xuXG4gICAgICB0aGlzLnByb3ZpbmNlQ29kZSA9IHByb3ZpbmNlLmNvZGU7XG4gICAgICB0aGlzLmNpdHlDb2RlID0gY2l0eS5jb2RlO1xuICAgICAgdGhpcy5hcmVhQ29kZSA9IGFyZWEuY29kZTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvdmluY2VDb2RlKTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9XG5cbiAgb25Mb2FkKCkge1xuXG4gIH1cbn1cblxuIl19