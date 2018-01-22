"use strict";

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

var Timer = function (_wepy$component) {
  _inherits(Timer, _wepy$component);

  function Timer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Timer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Timer.__proto__ || Object.getPrototypeOf(Timer)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      startTime: {
        default: ""
      },
      endTime: {
        default: ""
      }
    }, _this.data = {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      totalDay: 0,
      isShow: false,
      interval: {},
      endTxt: "\n00:00:00"
    }, _this.methods = {
      initTimer: function initTimer(val) {
        var _this2 = this;

        console.log(val);
        var date = new Date();
        this.startTime = val.startTime;
        this.endTime = val.endTime;
        //开始时间(.replace(/(-)/g, '/')解决ios 不兼容问题)
        var startDay = new Date(this.startTime.replace(/(-)/g, '/'));
        //结束时间
        var endDay = new Date(this.endTime.replace(/(-)/g, '/'));

        //总共时间(单位s)
        var totalDay = Math.floor((endDay - startDay) / 1000);

        // 计算时会发生隐式转换，调用valueOf()方法，转化成时间戳的形式
        var days = (endDay - date) / 1000 / 3600 / 24;

        //计算是当前时间是否在区间内
        if (startDay < date && date < endDay) {
          this.isShow = true;
        }

        var day = Math.floor(days);
        var hours = (days - day) * 24;
        var hour = Math.floor(hours);
        var minutes = (hours - hour) * 60;
        var minute = Math.floor(minutes);
        var seconds = (minutes - minute) * 60;
        var second = Math.floor(seconds);

        //赋值
        this.day = day;
        //this.hour = day * 24 + hour;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.totalDay = totalDay;

        this.interval = setInterval(function () {
          if (--_this2.second < 0) {
            _this2.minute--;
            _this2.second = 59;
            _this2.$apply();
          }

          if (_this2.minute < 0) {
            _this2.hour--;
            _this2.minute = 59;
            _this2.$apply();
          }
          if (_this2.hour < 0) {
            _this2.minute = 0;
            _this2.second = 0;
            _this2.isShow = false;
            _this2.$apply();
            clearInterval(_this2.interval);
          }
          _this2.$apply();
        }, 1000);

        this.$apply();
      }
    }, _this.computed = {
      strD: function strD() {
        return this.day;
      },
      strH: function strH() {
        return this.hour < 10 ? "0" + this.hour : this.hour;
      },
      strM: function strM() {
        return this.minute < 10 ? "0" + this.minute : this.minute;
      },
      strS: function strS() {
        return this.second < 10 ? "0" + this.second : this.second;
      },
      total: function total() {
        return this.hour * 60 * 60 + this.minute * 60 + this.second;
      },
      rotate1: function rotate1() {
        var a = 360 - 360 / this.totalDay * this.total;
        return a < 180 ? a : 180;
      },
      rotate2: function rotate2() {
        var b = 360 - 360 / this.totalDay * this.total;
        return b > 180 ? b - 180 : 0;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Timer, [{
    key: "onLoad",
    value: function onLoad() {
      this.isShow = false;
      this.day = 0;
      this.hour = 0;
      this.minute = 0;
      this.second = 0;
      this.totalDay = 0;
      this.startTime = "";
      this.endTime = "";
      clearInterval(this.interval);
    }
  }, {
    key: "onUnload",
    value: function onUnload() {
      console.log("onUnload....");
      clearInterval(this.interval);
    }
  }, {
    key: "onHide",
    value: function onHide() {
      console.log("onHide....");
      clearInterval(this.interval);
    }
  }]);

  return Timer;
}(_wepy2.default.component);

exports.default = Timer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpbWVyLmpzIl0sIm5hbWVzIjpbIlRpbWVyIiwicHJvcHMiLCJzdGFydFRpbWUiLCJkZWZhdWx0IiwiZW5kVGltZSIsImRhdGEiLCJkYXkiLCJob3VyIiwibWludXRlIiwic2Vjb25kIiwidG90YWxEYXkiLCJpc1Nob3ciLCJpbnRlcnZhbCIsImVuZFR4dCIsIm1ldGhvZHMiLCJpbml0VGltZXIiLCJ2YWwiLCJjb25zb2xlIiwibG9nIiwiZGF0ZSIsIkRhdGUiLCJzdGFydERheSIsInJlcGxhY2UiLCJlbmREYXkiLCJNYXRoIiwiZmxvb3IiLCJkYXlzIiwiaG91cnMiLCJtaW51dGVzIiwic2Vjb25kcyIsInNldEludGVydmFsIiwiJGFwcGx5IiwiY2xlYXJJbnRlcnZhbCIsImNvbXB1dGVkIiwic3RyRCIsInN0ckgiLCJzdHJNIiwic3RyUyIsInRvdGFsIiwicm90YXRlMSIsImEiLCJyb3RhdGUyIiwiYiIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxLLEdBQVE7QUFDTkMsaUJBQVc7QUFDVEMsaUJBQVM7QUFEQSxPQURMO0FBSU5DLGVBQVM7QUFDUEQsaUJBQVM7QUFERjtBQUpILEssUUFRUkUsSSxHQUFPO0FBQ0xDLFdBQUssQ0FEQTtBQUVMQyxZQUFNLENBRkQ7QUFHTEMsY0FBUSxDQUhIO0FBSUxDLGNBQVEsQ0FKSDtBQUtMQyxnQkFBVSxDQUxMO0FBTUxDLGNBQVEsS0FOSDtBQU9MQyxnQkFBVSxFQVBMO0FBUUxDLGNBQU87QUFSRixLLFFBdUJQQyxPLEdBQVU7QUFDUkMsZUFEUSxxQkFDRUMsR0FERixFQUNPO0FBQUE7O0FBQ2JDLGdCQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDQSxZQUFJRyxPQUFPLElBQUlDLElBQUosRUFBWDtBQUNBLGFBQUtsQixTQUFMLEdBQWlCYyxJQUFJZCxTQUFyQjtBQUNBLGFBQUtFLE9BQUwsR0FBZVksSUFBSVosT0FB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QUwsR0FBWSxFQUFaLEdBQWlCLEVBQWxCLEdBQXlCLEtBQUtDLE1BQUwsR0FBYyxFQUF2QyxHQUE2QyxLQUFLQyxNQUF6RDtBQUNELE9BZlE7QUFnQlQ4QixhQWhCUyxxQkFnQkM7QUFDUixZQUFJQyxJQUFJLE1BQU8sTUFBTSxLQUFLOUIsUUFBWixHQUF3QixLQUFLNEIsS0FBM0M7QUFDQSxlQUFPRSxJQUFJLEdBQUosR0FBVUEsQ0FBVixHQUFjLEdBQXJCO0FBQ0QsT0FuQlE7QUFvQlRDLGFBcEJTLHFCQW9CQztBQUNSLFlBQUlDLElBQUksTUFBTyxNQUFNLEtBQUtoQyxRQUFaLEdBQXdCLEtBQUs0QixLQUEzQztBQUNBLGVBQU9JLElBQUksR0FBSixHQUFVQSxJQUFJLEdBQWQsR0FBb0IsQ0FBM0I7QUFDRDtBQXZCUSxLOzs7Ozs2QkF4RkY7QUFDUCxXQUFLL0IsTUFBTCxHQUFjLEtBQWQ7QUFDQSxXQUFLTCxHQUFMLEdBQVcsQ0FBWDtBQUNBLFdBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsV0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxXQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFdBQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxXQUFLUixTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsV0FBS0UsT0FBTCxHQUFlLEVBQWY7QUFDQTRCLG9CQUFjLEtBQUtwQixRQUFuQjtBQUNEOzs7K0JBb0VVO0FBQ1RLLGNBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0FjLG9CQUFjLEtBQUtwQixRQUFuQjtBQUNEOzs7NkJBRVE7QUFDUEssY0FBUUMsR0FBUixDQUFZLFlBQVo7QUFDQWMsb0JBQWMsS0FBS3BCLFFBQW5CO0FBQ0Q7Ozs7RUExR2dDLGVBQUsrQixTOztrQkFBbkIzQyxLIiwiZmlsZSI6InRpbWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIHN0YXJ0VGltZToge1xuICAgICAgZGVmYXVsdDogXCJcIlxuICAgIH0sXG4gICAgZW5kVGltZToge1xuICAgICAgZGVmYXVsdDogXCJcIlxuICAgIH1cbiAgfVxuICBkYXRhID0ge1xuICAgIGRheTogMCxcbiAgICBob3VyOiAwLFxuICAgIG1pbnV0ZTogMCxcbiAgICBzZWNvbmQ6IDAsXG4gICAgdG90YWxEYXk6IDAsXG4gICAgaXNTaG93OiBmYWxzZSxcbiAgICBpbnRlcnZhbDoge30sXG4gICAgZW5kVHh0OlwiXFxuMDA6MDA6MDBcIlxuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuaXNTaG93ID0gZmFsc2U7XG4gICAgdGhpcy5kYXkgPSAwO1xuICAgIHRoaXMuaG91ciA9IDA7XG4gICAgdGhpcy5taW51dGUgPSAwO1xuICAgIHRoaXMuc2Vjb25kID0gMDtcbiAgICB0aGlzLnRvdGFsRGF5ID0gMDtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IFwiXCI7XG4gICAgdGhpcy5lbmRUaW1lID0gXCJcIjtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBpbml0VGltZXIodmFsKSB7XG4gICAgICBjb25zb2xlLmxvZyh2YWwpO1xuICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSB2YWwuc3RhcnRUaW1lO1xuICAgICAgdGhpcy5lbmRUaW1lID0gdmFsLmVuZFRpbWU7XG4gICAgICAvL+W8gOWni+aXtumXtCgucmVwbGFjZSgvKC0pL2csICcvJynop6PlhrNpb3Mg5LiN5YW85a656Zeu6aKYKVxuICAgICAgbGV0IHN0YXJ0RGF5ID0gbmV3IERhdGUodGhpcy5zdGFydFRpbWUucmVwbGFjZSgvKC0pL2csICcvJykpO1xuICAgICAgLy/nu5PmnZ/ml7bpl7RcbiAgICAgIGxldCBlbmREYXkgPSBuZXcgRGF0ZSh0aGlzLmVuZFRpbWUucmVwbGFjZSgvKC0pL2csICcvJykpO1xuXG4gICAgICAvL+aAu+WFseaXtumXtCjljZXkvY1zKVxuICAgICAgbGV0IHRvdGFsRGF5ID0gTWF0aC5mbG9vcigoZW5kRGF5IC0gc3RhcnREYXkpIC8gMTAwMCk7XG5cblxuICAgICAgLy8g6K6h566X5pe25Lya5Y+R55Sf6ZqQ5byP6L2s5o2i77yM6LCD55SodmFsdWVPZigp5pa55rOV77yM6L2s5YyW5oiQ5pe26Ze05oiz55qE5b2i5byPXG4gICAgICBsZXQgZGF5cyA9IChlbmREYXkgLSBkYXRlKSAvIDEwMDAgLyAzNjAwIC8gMjQ7XG5cblxuICAgICAgLy/orqHnrpfmmK/lvZPliY3ml7bpl7TmmK/lkKblnKjljLrpl7TlhoVcbiAgICAgIGlmIChzdGFydERheSA8IGRhdGUgJiYgZGF0ZSA8IGVuZERheSkge1xuICAgICAgICB0aGlzLmlzU2hvdyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBkYXkgPSBNYXRoLmZsb29yKGRheXMpO1xuICAgICAgbGV0IGhvdXJzID0gKGRheXMgLSBkYXkpICogMjQ7XG4gICAgICBsZXQgaG91ciA9IE1hdGguZmxvb3IoaG91cnMpO1xuICAgICAgbGV0IG1pbnV0ZXMgPSAoaG91cnMgLSBob3VyKSAqIDYwO1xuICAgICAgbGV0IG1pbnV0ZSA9IE1hdGguZmxvb3IobWludXRlcyk7XG4gICAgICBsZXQgc2Vjb25kcyA9IChtaW51dGVzIC0gbWludXRlKSAqIDYwO1xuICAgICAgbGV0IHNlY29uZCA9IE1hdGguZmxvb3Ioc2Vjb25kcyk7XG5cbiAgICAgIC8v6LWL5YC8XG4gICAgICB0aGlzLmRheSA9IGRheTtcbiAgICAgIC8vdGhpcy5ob3VyID0gZGF5ICogMjQgKyBob3VyO1xuICAgICAgdGhpcy5ob3VyID0gaG91cjtcbiAgICAgIHRoaXMubWludXRlID0gbWludXRlO1xuICAgICAgdGhpcy5zZWNvbmQgPSBzZWNvbmQ7XG4gICAgICB0aGlzLnRvdGFsRGF5ID0gdG90YWxEYXk7XG5cbiAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICgoLS10aGlzLnNlY29uZCkgPCAwKSB7XG4gICAgICAgICAgdGhpcy5taW51dGUtLTtcbiAgICAgICAgICB0aGlzLnNlY29uZCA9IDU5O1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5taW51dGUgPCAwKSB7XG4gICAgICAgICAgdGhpcy5ob3VyLS07XG4gICAgICAgICAgdGhpcy5taW51dGUgPSA1OTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhvdXIgPCAwKSB7XG4gICAgICAgICAgdGhpcy5taW51dGUgPSAwO1xuICAgICAgICAgIHRoaXMuc2Vjb25kID0gMDtcbiAgICAgICAgICB0aGlzLmlzU2hvdyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSwgMTAwMCk7XG5cbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9XG5cbiAgb25VbmxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coXCJvblVubG9hZC4uLi5cIik7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIG9uSGlkZSgpIHtcbiAgICBjb25zb2xlLmxvZyhcIm9uSGlkZS4uLi5cIik7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIGNvbXB1dGVkID0ge1xuICAgIHN0ckQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXk7XG4gICAgfSxcbiAgICBzdHJIKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaG91ciA8IDEwID8gXCIwXCIgKyB0aGlzLmhvdXIgOiB0aGlzLmhvdXI7XG4gICAgfSxcbiAgICBzdHJNKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWludXRlIDwgMTAgPyBcIjBcIiArIHRoaXMubWludXRlIDogdGhpcy5taW51dGU7XG4gICAgfSxcbiAgICBzdHJTKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2Vjb25kIDwgMTAgPyBcIjBcIiArIHRoaXMuc2Vjb25kIDogdGhpcy5zZWNvbmQ7XG4gICAgfSxcbiAgICB0b3RhbCgpIHtcbiAgICAgIHJldHVybiAodGhpcy5ob3VyICogNjAgKiA2MCkgKyAodGhpcy5taW51dGUgKiA2MCkgKyB0aGlzLnNlY29uZDtcbiAgICB9LFxuICAgIHJvdGF0ZTEoKSB7XG4gICAgICBsZXQgYSA9IDM2MCAtICgzNjAgLyB0aGlzLnRvdGFsRGF5KSAqIHRoaXMudG90YWw7XG4gICAgICByZXR1cm4gYSA8IDE4MCA/IGEgOiAxODBcbiAgICB9LFxuICAgIHJvdGF0ZTIoKSB7XG4gICAgICBsZXQgYiA9IDM2MCAtICgzNjAgLyB0aGlzLnRvdGFsRGF5KSAqIHRoaXMudG90YWw7XG4gICAgICByZXR1cm4gYiA+IDE4MCA/IGIgLSAxODAgOiAwXG4gICAgfVxuICB9XG5cbn1cblxuIl19