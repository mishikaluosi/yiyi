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

var AddressEdit = function (_wepy$component) {
  _inherits(AddressEdit, _wepy$component);

  function AddressEdit() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AddressEdit);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AddressEdit.__proto__ || Object.getPrototypeOf(AddressEdit)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      isDefult: false,
      isCheck: false,
      editInfo: {
        default: {},
        type: Object
      },
      id: '',
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
        this.isCheck = !this.isCheck;
        this.isDefult = !this.isDefult;
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
        this.editAddress(e.detail.value);
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
      },
      refresh: function refresh(val) {
        console.log(val);
        if (val == undefined) return;
        console.log("val.....", val);
        this.editInfo = val;
        console.log(this.editInfo);
        this.id = this.editInfo.id;
        if (this.editInfo.isDef == 1) {
          this.isDefult = true;
        }
        console.log("==========ee=========");
        console.log(this.isDefult);
        this.province = { code: this.editInfo.provinceCode, name: this.editInfo.provinceName };
        this.city = { code: this.editInfo.areaCode, name: this.editInfo.areaName };
        this.area = { code: this.editInfo.cityCode, name: this.editInfo.cityName };

        this.$apply();
      },
      openAddressPicker: function openAddressPicker() {
        this.$invoke('areaPicker', 'openAddressPicker');
      },
      areaPickerArray: function areaPickerArray(province, city, area) {
        this.province = province;
        this.city = city;
        this.area = area;

        this.provinceCode = province.code;
        this.cityCode = city.code;
        this.areaCode = area.code;
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AddressEdit, [{
    key: 'editAddress',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(address) {
        var that, userSpecialInfo, isDefult, openId, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("保存");
                that = this;
                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                isDefult = 0;

                if (this.isDefult) {
                  isDefult = 1;
                }
                openId = userSpecialInfo.openid;

                console.log("address:");
                console.log(this.id);
                _context.next = 10;
                return _api2.default.saveAddress({
                  query: {
                    openId: openId,
                    id: this.id,
                    address: address,
                    isDef: isDefult,
                    province: that.provinceCode,
                    city: that.cityCode,
                    area: that.areaCode
                  }
                });

              case 10:
                json = _context.sent;

                if (json.data.code == 0) {
                  //0 列表 1新增 2编辑 (显示列表)
                  this.$emit('currentPage', 0);
                  this.$emit('refreshAddList', 'hehe');
                } else {
                  _tip2.default.error(json.data.msg);
                }
                that.showLoading = false;

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function editAddress(_x) {
        return _ref2.apply(this, arguments);
      }

      return editAddress;
    }()
  }, {
    key: 'onShow',
    value: function onShow() {
      console.log("========editInfo==========");

      this.province = { code: '120000', name: '天津市' };
      this.city = { code: '120100', name: '天津市' };
      this.area = { code: '120101', name: '和平区' };
      this.$invoke('areaPicker', 'setAddressPickerValue', this.province, this.city, this.area);
    }
  }]);

  return AddressEdit;
}(_wepy2.default.component);

exports.default = AddressEdit;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3NfZWRpdC5qcyJdLCJuYW1lcyI6WyJBZGRyZXNzRWRpdCIsImRhdGEiLCJpc0RlZnVsdCIsImlzQ2hlY2siLCJlZGl0SW5mbyIsImRlZmF1bHQiLCJ0eXBlIiwiT2JqZWN0IiwiaWQiLCJwcm92aW5jZSIsImNpdHkiLCJhcmVhIiwicHJvdmluY2VDb2RlIiwiY2l0eUNvZGUiLCJhcmVhQ29kZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImFyZWFQaWNrZXIiLCJtZXRob2RzIiwiY2hhbmdlQ2hlY2tCb3hTdGF0ZSIsImZvcm1TdWJtaXQiLCJlIiwicmVjZWl2ZXJOYW1lIiwiZGV0YWlsIiwidmFsdWUiLCJtb2JpbGUiLCJhZGRyZXNzRGV0YWlsIiwiYWxlcnQiLCJlZGl0QWRkcmVzcyIsImNvbnNvbGUiLCJsb2ciLCJyZWZyZXNoIiwidmFsIiwidW5kZWZpbmVkIiwiaXNEZWYiLCJjb2RlIiwibmFtZSIsInByb3ZpbmNlTmFtZSIsImFyZWFOYW1lIiwiY2l0eU5hbWUiLCIkYXBwbHkiLCJvcGVuQWRkcmVzc1BpY2tlciIsIiRpbnZva2UiLCJhcmVhUGlja2VyQXJyYXkiLCJhZGRyZXNzIiwidGhhdCIsInVzZXJTcGVjaWFsSW5mbyIsImdldFN0b3JhZ2VTeW5jIiwib3BlbklkIiwib3BlbmlkIiwic2F2ZUFkZHJlc3MiLCJxdWVyeSIsImpzb24iLCIkZW1pdCIsImVycm9yIiwibXNnIiwic2hvd0xvYWRpbmciLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUdBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BRW5CQyxJLEdBQU87QUFDTEMsZ0JBQVUsS0FETDtBQUVMQyxlQUFTLEtBRko7QUFHTEMsZ0JBQVU7QUFDUkMsaUJBQVMsRUFERDtBQUVSQyxjQUFNQztBQUZFLE9BSEw7QUFPTEMsVUFBSSxFQVBDO0FBUUxD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QUFuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQThETztBQUNQM0IsY0FBUUMsR0FBUixDQUFZLDRCQUFaOztBQUVBLFdBQUt2QixRQUFMLEdBQWdCLEVBQUU0QixNQUFNLFFBQVIsRUFBa0JDLE1BQU0sS0FBeEIsRUFBaEI7QUFDQSxXQUFLNUIsSUFBTCxHQUFZLEVBQUUyQixNQUFNLFFBQVIsRUFBa0JDLE1BQU0sS0FBeEIsRUFBWjtBQUNBLFdBQUszQixJQUFMLEdBQVksRUFBRTBCLE1BQU0sUUFBUixFQUFrQkMsTUFBTSxLQUF4QixFQUFaO0FBQ0EsV0FBS00sT0FBTCxDQUFhLFlBQWIsRUFBMkIsdUJBQTNCLEVBQW9ELEtBQUtuQyxRQUF6RCxFQUFtRSxLQUFLQyxJQUF4RSxFQUE4RSxLQUFLQyxJQUFuRjtBQUdEOzs7O0VBN0hzQyxlQUFLZ0QsUzs7a0JBQXpCM0QsVyIsImZpbGUiOiJhZGRyZXNzX2VkaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgdGlwIGZyb20gJy4uL3V0aWxzL3RpcCdcbmltcG9ydCBhcGkgZnJvbSBcIi4uL2FwaS9hcGlcIlxuaW1wb3J0IHtcbiAgVVNFUl9TUEVDSUNBTF9JTkZPXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50JztcbmltcG9ydCBBcmVhUGlja2VyIGZyb20gXCIuL2NvbW1vbi93ZXB5LWFyZWEtcGlja2VyXCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3NFZGl0IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuXG4gIGRhdGEgPSB7XG4gICAgaXNEZWZ1bHQ6IGZhbHNlLFxuICAgIGlzQ2hlY2s6IGZhbHNlLFxuICAgIGVkaXRJbmZvOiB7XG4gICAgICBkZWZhdWx0OiB7fSxcbiAgICAgIHR5cGU6IE9iamVjdFxuICAgIH0sXG4gICAgaWQ6ICcnLFxuICAgIHByb3ZpbmNlOiAnJyxcbiAgICBjaXR5OiAnJyxcbiAgICBhcmVhOiAnJyxcbiAgICBwcm92aW5jZUNvZGU6ICcnLFxuICAgIGNpdHlDb2RlOiAnJyxcbiAgICBhcmVhQ29kZTogJydcbiAgfVxuXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJhcmVhUGlja2VyXCI6e1wieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcImFyZWFQaWNrZXJcIjp7XCJ2LW9uOmFyZWFBcnJheVwiOlwiYXJlYVBpY2tlckFycmF5XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgYXJlYVBpY2tlcjogQXJlYVBpY2tlclxuICB9XG4gIGFzeW5jIGVkaXRBZGRyZXNzKGFkZHJlc3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIuS/neWtmFwiKTtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICBsZXQgaXNEZWZ1bHQgPSAwO1xuICAgIGlmICh0aGlzLmlzRGVmdWx0KSB7XG4gICAgICBpc0RlZnVsdCA9IDE7XG4gICAgfVxuICAgIGxldCBvcGVuSWQgPSB1c2VyU3BlY2lhbEluZm8ub3BlbmlkO1xuICAgIGNvbnNvbGUubG9nKFwiYWRkcmVzczpcIik7XG4gICAgY29uc29sZS5sb2codGhpcy5pZCk7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5zYXZlQWRkcmVzcyh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBvcGVuSWQ6IG9wZW5JZCxcbiAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgIGlzRGVmOiBpc0RlZnVsdCxcbiAgICAgICAgcHJvdmluY2U6dGhhdC5wcm92aW5jZUNvZGUsXG4gICAgICAgIGNpdHk6dGhhdC5jaXR5Q29kZSxcbiAgICAgICAgYXJlYTp0aGF0LmFyZWFDb2RlXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGpzb24uZGF0YS5jb2RlID09IDApIHtcbiAgICAgIC8vMCDliJfooaggMeaWsOWiniAy57yW6L6RICjmmL7npLrliJfooagpXG4gICAgICB0aGlzLiRlbWl0KCdjdXJyZW50UGFnZScsIDApO1xuICAgICAgdGhpcy4kZW1pdCgncmVmcmVzaEFkZExpc3QnLCAnaGVoZScpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEubXNnKVxuICAgIH1cbiAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBjaGFuZ2VDaGVja0JveFN0YXRlKCkge1xuICAgICAgdGhpcy5pc0NoZWNrID0gIXRoaXMuaXNDaGVjaztcbiAgICAgIHRoaXMuaXNEZWZ1bHQgPSAhdGhpcy5pc0RlZnVsdDtcbiAgICB9LFxuICAgIGZvcm1TdWJtaXQoZSkge1xuXG4gICAgICBsZXQgcmVjZWl2ZXJOYW1lID0gZS5kZXRhaWwudmFsdWUucmVjZWl2ZXJOYW1lO1xuICAgICAgbGV0IG1vYmlsZSA9IGUuZGV0YWlsLnZhbHVlLm1vYmlsZTtcbiAgICAgIGxldCBhZGRyZXNzRGV0YWlsID0gZS5kZXRhaWwudmFsdWUuYWRkcmVzc0RldGFpbDtcblxuICAgICAgaWYgKHJlY2VpdmVyTmFtZSA9PSBcIlwiKSB7XG4gICAgICAgIHRpcC5hbGVydChcIui+k+WFpeaUtuS7tuS6uuWnk+WQjVwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKG1vYmlsZSA9PSBcIlwiKSB7XG4gICAgICAgIHRpcC5hbGVydChcIui+k+WFpeiBlOezu+eUteivnVwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICB9XG4gICAgICBpZiAoYWRkcmVzc0RldGFpbCA9PSBcIlwiKSB7XG4gICAgICAgIHRpcC5hbGVydChcIui+k+WFpeivpue7huWcsOWdgFwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy5lZGl0QWRkcmVzcyhlLmRldGFpbC52YWx1ZSk7XG4gICAgICBjb25zb2xlLmxvZygnZm9ybeWPkeeUn+S6hnN1Ym1pdOS6i+S7tu+8jOaQuuW4puaVsOaNruS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxuICAgIH0sXG4gICAgcmVmcmVzaCh2YWwpIHtcbiAgICAgIGNvbnNvbGUubG9nKHZhbCk7XG4gICAgICBpZiAodmFsID09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgY29uc29sZS5sb2coXCJ2YWwuLi4uLlwiLCB2YWwpO1xuICAgICAgdGhpcy5lZGl0SW5mbyA9IHZhbDtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZWRpdEluZm8pO1xuICAgICAgdGhpcy5pZCA9IHRoaXMuZWRpdEluZm8uaWQ7XG4gICAgICBpZih0aGlzLmVkaXRJbmZvLmlzRGVmPT0xKXtcbiAgICAgICAgdGhpcy5pc0RlZnVsdD10cnVlXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT1lZT09PT09PT09PVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuaXNEZWZ1bHQpO1xuICAgICAgdGhpcy5wcm92aW5jZSA9IHsgY29kZTogdGhpcy5lZGl0SW5mby5wcm92aW5jZUNvZGUsIG5hbWU6IHRoaXMuZWRpdEluZm8ucHJvdmluY2VOYW1lIH07XG4gICAgICB0aGlzLmNpdHkgPSB7IGNvZGU6IHRoaXMuZWRpdEluZm8uYXJlYUNvZGUsIG5hbWU6dGhpcy5lZGl0SW5mby5hcmVhTmFtZSB9O1xuICAgICAgdGhpcy5hcmVhID0geyBjb2RlOiB0aGlzLmVkaXRJbmZvLmNpdHlDb2RlLCBuYW1lOiB0aGlzLmVkaXRJbmZvLmNpdHlOYW1lIH07XG5cbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSxcbiAgICBvcGVuQWRkcmVzc1BpY2tlcigpIHtcbiAgICAgIHRoaXMuJGludm9rZSgnYXJlYVBpY2tlcicsICdvcGVuQWRkcmVzc1BpY2tlcicpO1xuICAgIH0sXG4gICAgYXJlYVBpY2tlckFycmF5KHByb3ZpbmNlLCBjaXR5LCBhcmVhKSB7XG4gICAgICB0aGlzLnByb3ZpbmNlID0gcHJvdmluY2U7XG4gICAgICB0aGlzLmNpdHkgPSBjaXR5O1xuICAgICAgdGhpcy5hcmVhID0gYXJlYTtcblxuICAgICAgdGhpcy5wcm92aW5jZUNvZGUgPSBwcm92aW5jZS5jb2RlO1xuICAgICAgdGhpcy5jaXR5Q29kZSA9IGNpdHkuY29kZTtcbiAgICAgIHRoaXMuYXJlYUNvZGUgPSBhcmVhLmNvZGU7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgfVxuXG4gIG9uU2hvdygpIHtcbiAgICBjb25zb2xlLmxvZyhcIj09PT09PT09ZWRpdEluZm89PT09PT09PT09XCIpO1xuXG4gICAgdGhpcy5wcm92aW5jZSA9IHsgY29kZTogJzEyMDAwMCcsIG5hbWU6ICflpKnmtKXluIInIH07XG4gICAgdGhpcy5jaXR5ID0geyBjb2RlOiAnMTIwMTAwJywgbmFtZTogJ+Wkqea0peW4gicgfTtcbiAgICB0aGlzLmFyZWEgPSB7IGNvZGU6ICcxMjAxMDEnLCBuYW1lOiAn5ZKM5bmz5Yy6JyB9O1xuICAgIHRoaXMuJGludm9rZSgnYXJlYVBpY2tlcicsICdzZXRBZGRyZXNzUGlja2VyVmFsdWUnLCB0aGlzLnByb3ZpbmNlLCB0aGlzLmNpdHksIHRoaXMuYXJlYSk7XG5cblxuICB9XG59XG5cbiJdfQ==