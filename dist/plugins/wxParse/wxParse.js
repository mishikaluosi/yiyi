'use strict';

var _showdown = require('./showdown.js');

var _showdown2 = _interopRequireDefault(_showdown);

var _html2json = require('./html2json.js');

var _html2json2 = _interopRequireDefault(_html2json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * author: Di (微信小程序开发工程师)
                                                                                                                                                                                                                   * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
                                                                                                                                                                                                                   *               垂直微信小程序开发交流社区
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * github地址: https://github.com/icindy/wxParse
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * for: 微信小程序富文本解析
                                                                                                                                                                                                                   * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
                                                                                                                                                                                                                   */

/**
 * utils函数引入
 **/


/**
 * 配置及公有属性
 **/
var realWindowWidth = 0;
var realWindowHeight = 0;
wx.getSystemInfo({
  success: function success(res) {
    realWindowWidth = res.windowWidth;
    realWindowHeight = res.windowHeight;
  }
});
/**
 * 主函数入口区
 **/
function wxParse() {
  var bindName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'wxParseData';
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'html';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '<div class="color:red;">数据不能为空</div>';
  var target = arguments[3];
  var imagePadding = arguments[4];

  var that = target;
  var transData = {}; //存放转化后的数据
  if (type == 'html') {
    transData = _html2json2.default.html2json(data, bindName);
    console.log(JSON.stringify(transData, ' ', ' '));
  } else if (type == 'md' || type == 'markdown') {
    var converter = new _showdown2.default.Converter();
    var html = converter.makeHtml(data);
    transData = _html2json2.default.html2json(html, bindName);
    console.log(JSON.stringify(transData, ' ', ' '));
  }
  transData.view = {};
  transData.view.imagePadding = 0;
  if (typeof imagePadding != 'undefined') {
    transData.view.imagePadding = imagePadding;
  }
  var bindData = {};
  bindData[bindName] = transData;
  that.setData(bindData);
  that.bindData = bindData; // 增加这一行代码
  that.wxParseImgLoad = wxParseImgLoad;
  that.wxParseImgTap = wxParseImgTap;
}
// 图片点击事件
function wxParseImgTap(e) {
  var that = this;
  var nowImgUrl = e.target.dataset.src;
  var tagFrom = e.target.dataset.from;
  if (typeof tagFrom != 'undefined' && tagFrom.length > 0) {
    wx.previewImage({
      current: nowImgUrl, // 当前显示图片的http链接
      urls: that.data[tagFrom].imageUrls // 需要预览的图片http链接列表
    });
  }
}

/**
 * 图片视觉宽高计算函数区
 **/
function wxParseImgLoad(e) {
  var that = this;
  var tagFrom = e.target.dataset.from;
  var idx = e.target.dataset.idx;
  if (typeof tagFrom != 'undefined' && tagFrom.length > 0) {
    calMoreImageInfo(e, idx, that, tagFrom);
  }
}
// 假循环获取计算图片视觉最佳宽高
function calMoreImageInfo(e, idx, that, bindName) {
  var _that$setData;

  var temData = that.data[bindName];
  if (!temData || temData.images.length == 0) {
    return;
  }
  var temImages = temData.images;
  //因为无法获取view宽度 需要自定义padding进行计算，稍后处理
  var recal = wxAutoImageCal(e.detail.width, e.detail.height, that, bindName);
  // temImages[idx].width = recal.imageWidth;
  // temImages[idx].height = recal.imageheight;
  // temData.images = temImages;
  // var bindData = {};
  // bindData[bindName] = temData;
  // that.setData(bindData);
  var index = temImages[idx].index;
  var key = '' + bindName;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = index.split('.')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      key += '.nodes[' + i + ']';
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var keyW = key + '.width';
  var keyH = key + '.height';
  that.setData((_that$setData = {}, _defineProperty(_that$setData, keyW, recal.imageWidth), _defineProperty(_that$setData, keyH, recal.imageheight), _that$setData));
}

// 计算视觉优先的图片宽高
function wxAutoImageCal(originalWidth, originalHeight, that, bindName) {
  //获取图片的原始长宽
  var windowWidth = 0,
      windowHeight = 0;
  var autoWidth = 0,
      autoHeight = 0;
  var results = {};
  var padding = that.data[bindName].view.imagePadding;
  windowWidth = realWindowWidth - 2 * padding;
  windowHeight = realWindowHeight;
  //判断按照那种方式进行缩放
  // console.log("windowWidth" + windowWidth);
  if (originalWidth > windowWidth) {
    //在图片width大于手机屏幕width时候
    autoWidth = windowWidth;
    // console.log("autoWidth" + autoWidth);
    autoHeight = autoWidth * originalHeight / originalWidth;
    // console.log("autoHeight" + autoHeight);
    results.imageWidth = autoWidth;
    results.imageheight = autoHeight;
  } else {
    //否则展示原来的数据
    results.imageWidth = originalWidth;
    results.imageheight = originalHeight;
  }
  return results;
}

function wxParseTemArray(temArrayName, bindNameReg, total, that) {
  var array = [];
  var temData = that.data;
  var obj = null;
  for (var i = 0; i < total; i++) {
    var simArr = temData[bindNameReg + i].nodes;
    array.push(simArr);
  }

  temArrayName = temArrayName || 'wxParseTemArray';
  obj = JSON.parse('{"' + temArrayName + '":""}');
  obj[temArrayName] = array;
  that.setData(obj);
}

/**
 * 配置emojis
 *
 */

function emojisInit() {
  var reg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var baseSrc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/wxParse/emojis/";
  var emojis = arguments[2];

  _html2json2.default.emojisInit(reg, baseSrc, emojis);
}

module.exports = {
  wxParse: wxParse,
  wxParseTemArray: wxParseTemArray,
  emojisInit: emojisInit
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4UGFyc2UuanMiXSwibmFtZXMiOlsicmVhbFdpbmRvd1dpZHRoIiwicmVhbFdpbmRvd0hlaWdodCIsInd4IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd0hlaWdodCIsInd4UGFyc2UiLCJiaW5kTmFtZSIsInR5cGUiLCJkYXRhIiwidGFyZ2V0IiwiaW1hZ2VQYWRkaW5nIiwidGhhdCIsInRyYW5zRGF0YSIsImh0bWwyanNvbiIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwiY29udmVydGVyIiwiQ29udmVydGVyIiwiaHRtbCIsIm1ha2VIdG1sIiwidmlldyIsImJpbmREYXRhIiwic2V0RGF0YSIsInd4UGFyc2VJbWdMb2FkIiwid3hQYXJzZUltZ1RhcCIsImUiLCJub3dJbWdVcmwiLCJkYXRhc2V0Iiwic3JjIiwidGFnRnJvbSIsImZyb20iLCJsZW5ndGgiLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50IiwidXJscyIsImltYWdlVXJscyIsImlkeCIsImNhbE1vcmVJbWFnZUluZm8iLCJ0ZW1EYXRhIiwiaW1hZ2VzIiwidGVtSW1hZ2VzIiwicmVjYWwiLCJ3eEF1dG9JbWFnZUNhbCIsImRldGFpbCIsIndpZHRoIiwiaGVpZ2h0IiwiaW5kZXgiLCJrZXkiLCJzcGxpdCIsImkiLCJrZXlXIiwia2V5SCIsImltYWdlV2lkdGgiLCJpbWFnZWhlaWdodCIsIm9yaWdpbmFsV2lkdGgiLCJvcmlnaW5hbEhlaWdodCIsImF1dG9XaWR0aCIsImF1dG9IZWlnaHQiLCJyZXN1bHRzIiwicGFkZGluZyIsInd4UGFyc2VUZW1BcnJheSIsInRlbUFycmF5TmFtZSIsImJpbmROYW1lUmVnIiwidG90YWwiLCJhcnJheSIsIm9iaiIsInNpbUFyciIsIm5vZGVzIiwicHVzaCIsInBhcnNlIiwiZW1vamlzSW5pdCIsInJlZyIsImJhc2VTcmMiLCJlbW9qaXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdz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QjtBQUNBSSxRQUFNbkQsS0FBS3VELEtBQUwsQ0FBVyxPQUFNUixZQUFOLEdBQW9CLE9BQS9CLENBQU47QUFDQUksTUFBSUosWUFBSixJQUFvQkcsS0FBcEI7QUFDQXZELE9BQUthLE9BQUwsQ0FBYTJDLEdBQWI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxTQUFTSyxVQUFULEdBQTZEO0FBQUEsTUFBekNDLEdBQXlDLHVFQUFyQyxFQUFxQztBQUFBLE1BQWxDQyxPQUFrQyx1RUFBMUIsa0JBQTBCO0FBQUEsTUFBUEMsTUFBTzs7QUFDMUQsc0JBQVdILFVBQVgsQ0FBc0JDLEdBQXRCLEVBQTBCQyxPQUExQixFQUFrQ0MsTUFBbEM7QUFDRjs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmeEUsV0FBU0EsT0FETTtBQUVmeUQsbUJBQWdCQSxlQUZEO0FBR2ZVLGNBQVdBO0FBSEksQ0FBakIiLCJmaWxlIjoid3hQYXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogYXV0aG9yOiBEaSAo5b6u5L+h5bCP56iL5bqP5byA5Y+R5bel56iL5biIKVxuICogb3JnYW5pemF0aW9uOiBXZUFwcERldijlvq7kv6HlsI/nqIvluo/lvIDlj5HorrrlnZspKGh0dHA6Ly93ZWFwcGRldi5jb20pXG4gKiAgICAgICAgICAgICAgIOWeguebtOW+ruS/oeWwj+eoi+W6j+W8gOWPkeS6pOa1geekvuWMulxuICpcbiAqIGdpdGh1YuWcsOWdgDogaHR0cHM6Ly9naXRodWIuY29tL2ljaW5keS93eFBhcnNlXG4gKlxuICogZm9yOiDlvq7kv6HlsI/nqIvluo/lr4zmlofmnKzop6PmnpBcbiAqIGRldGFpbCA6IGh0dHA6Ly93ZWFwcGRldi5jb20vdC93eHBhcnNlLWFscGhhMC0xLWh0bWwtbWFya2Rvd24vMTg0XG4gKi9cblxuLyoqXG4gKiB1dGlsc+WHveaVsOW8leWFpVxuICoqL1xuaW1wb3J0IHNob3dkb3duIGZyb20gJy4vc2hvd2Rvd24uanMnO1xuaW1wb3J0IEh0bWxUb0pzb24gZnJvbSAnLi9odG1sMmpzb24uanMnO1xuLyoqXG4gKiDphY3nva7lj4rlhazmnInlsZ7mgKdcbiAqKi9cbnZhciByZWFsV2luZG93V2lkdGggPSAwO1xudmFyIHJlYWxXaW5kb3dIZWlnaHQgPSAwO1xud3guZ2V0U3lzdGVtSW5mbyh7XG4gIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICByZWFsV2luZG93V2lkdGggPSByZXMud2luZG93V2lkdGhcbiAgICByZWFsV2luZG93SGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodFxuICB9XG59KVxuLyoqXG4gKiDkuLvlh73mlbDlhaXlj6PljLpcbiAqKi9cbmZ1bmN0aW9uIHd4UGFyc2UoYmluZE5hbWUgPSAnd3hQYXJzZURhdGEnLCB0eXBlPSdodG1sJywgZGF0YT0nPGRpdiBjbGFzcz1cImNvbG9yOnJlZDtcIj7mlbDmja7kuI3og73kuLrnqbo8L2Rpdj4nLCB0YXJnZXQsaW1hZ2VQYWRkaW5nKSB7XG4gIHZhciB0aGF0ID0gdGFyZ2V0O1xuICB2YXIgdHJhbnNEYXRhID0ge307Ly/lrZjmlL7ovazljJblkI7nmoTmlbDmja5cbiAgaWYgKHR5cGUgPT0gJ2h0bWwnKSB7XG4gICAgdHJhbnNEYXRhID0gSHRtbFRvSnNvbi5odG1sMmpzb24oZGF0YSwgYmluZE5hbWUpO1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRyYW5zRGF0YSwgJyAnLCAnICcpKTtcbiAgfSBlbHNlIGlmICh0eXBlID09ICdtZCcgfHwgdHlwZSA9PSAnbWFya2Rvd24nKSB7XG4gICAgdmFyIGNvbnZlcnRlciA9IG5ldyBzaG93ZG93bi5Db252ZXJ0ZXIoKTtcbiAgICB2YXIgaHRtbCA9IGNvbnZlcnRlci5tYWtlSHRtbChkYXRhKTtcbiAgICB0cmFuc0RhdGEgPSBIdG1sVG9Kc29uLmh0bWwyanNvbihodG1sLCBiaW5kTmFtZSk7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodHJhbnNEYXRhLCAnICcsICcgJykpO1xuICB9XG4gIHRyYW5zRGF0YS52aWV3ID0ge307XG4gIHRyYW5zRGF0YS52aWV3LmltYWdlUGFkZGluZyA9IDA7XG4gIGlmKHR5cGVvZihpbWFnZVBhZGRpbmcpICE9ICd1bmRlZmluZWQnKXtcbiAgICB0cmFuc0RhdGEudmlldy5pbWFnZVBhZGRpbmcgPSBpbWFnZVBhZGRpbmdcbiAgfVxuICB2YXIgYmluZERhdGEgPSB7fTtcbiAgYmluZERhdGFbYmluZE5hbWVdID0gdHJhbnNEYXRhO1xuICB0aGF0LnNldERhdGEoYmluZERhdGEpXG4gIHRoYXQuYmluZERhdGEgPSBiaW5kRGF0YSAvLyDlop7liqDov5nkuIDooYzku6PnoIFcbiAgdGhhdC53eFBhcnNlSW1nTG9hZCA9IHd4UGFyc2VJbWdMb2FkO1xuICB0aGF0Lnd4UGFyc2VJbWdUYXAgPSB3eFBhcnNlSW1nVGFwO1xufVxuLy8g5Zu+54mH54K55Ye75LqL5Lu2XG5mdW5jdGlvbiB3eFBhcnNlSW1nVGFwKGUpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgbm93SW1nVXJsID0gZS50YXJnZXQuZGF0YXNldC5zcmM7XG4gIHZhciB0YWdGcm9tID0gZS50YXJnZXQuZGF0YXNldC5mcm9tO1xuICBpZiAodHlwZW9mICh0YWdGcm9tKSAhPSAndW5kZWZpbmVkJyAmJiB0YWdGcm9tLmxlbmd0aCA+IDApIHtcbiAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xuICAgICAgY3VycmVudDogbm93SW1nVXJsLCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXG4gICAgICB1cmxzOiB0aGF0LmRhdGFbdGFnRnJvbV0uaW1hZ2VVcmxzIC8vIOmcgOimgemihOiniOeahOWbvueJh2h0dHDpk77mjqXliJfooahcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICog5Zu+54mH6KeG6KeJ5a696auY6K6h566X5Ye95pWw5Yy6XG4gKiovXG5mdW5jdGlvbiB3eFBhcnNlSW1nTG9hZChlKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIHRhZ0Zyb20gPSBlLnRhcmdldC5kYXRhc2V0LmZyb207XG4gIHZhciBpZHggPSBlLnRhcmdldC5kYXRhc2V0LmlkeDtcbiAgaWYgKHR5cGVvZiAodGFnRnJvbSkgIT0gJ3VuZGVmaW5lZCcgJiYgdGFnRnJvbS5sZW5ndGggPiAwKSB7XG4gICAgY2FsTW9yZUltYWdlSW5mbyhlLCBpZHgsIHRoYXQsIHRhZ0Zyb20pXG4gIH1cbn1cbi8vIOWBh+W+queOr+iOt+WPluiuoeeul+WbvueJh+inhuinieacgOS9s+WuvemrmFxuZnVuY3Rpb24gY2FsTW9yZUltYWdlSW5mbyhlLCBpZHgsIHRoYXQsIGJpbmROYW1lKSB7XG4gIHZhciB0ZW1EYXRhID0gdGhhdC5kYXRhW2JpbmROYW1lXTtcbiAgaWYgKCF0ZW1EYXRhIHx8IHRlbURhdGEuaW1hZ2VzLmxlbmd0aCA9PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciB0ZW1JbWFnZXMgPSB0ZW1EYXRhLmltYWdlcztcbiAgLy/lm6DkuLrml6Dms5Xojrflj5Z2aWV35a695bqmIOmcgOimgeiHquWumuS5iXBhZGRpbmfov5vooYzorqHnrpfvvIznqI3lkI7lpITnkIZcbiAgdmFyIHJlY2FsID0gd3hBdXRvSW1hZ2VDYWwoZS5kZXRhaWwud2lkdGgsIGUuZGV0YWlsLmhlaWdodCx0aGF0LGJpbmROYW1lKTtcbiAgLy8gdGVtSW1hZ2VzW2lkeF0ud2lkdGggPSByZWNhbC5pbWFnZVdpZHRoO1xuICAvLyB0ZW1JbWFnZXNbaWR4XS5oZWlnaHQgPSByZWNhbC5pbWFnZWhlaWdodDtcbiAgLy8gdGVtRGF0YS5pbWFnZXMgPSB0ZW1JbWFnZXM7XG4gIC8vIHZhciBiaW5kRGF0YSA9IHt9O1xuICAvLyBiaW5kRGF0YVtiaW5kTmFtZV0gPSB0ZW1EYXRhO1xuICAvLyB0aGF0LnNldERhdGEoYmluZERhdGEpO1xuICB2YXIgaW5kZXggPSB0ZW1JbWFnZXNbaWR4XS5pbmRleFxuICB2YXIga2V5ID0gYCR7YmluZE5hbWV9YFxuICBmb3IgKHZhciBpIG9mIGluZGV4LnNwbGl0KCcuJykpIGtleSs9YC5ub2Rlc1ske2l9XWBcbiAgdmFyIGtleVcgPSBrZXkgKyAnLndpZHRoJ1xuICB2YXIga2V5SCA9IGtleSArICcuaGVpZ2h0J1xuICB0aGF0LnNldERhdGEoe1xuICAgIFtrZXlXXTogcmVjYWwuaW1hZ2VXaWR0aCxcbiAgICBba2V5SF06IHJlY2FsLmltYWdlaGVpZ2h0LFxuICB9KVxufVxuXG4vLyDorqHnrpfop4bop4nkvJjlhYjnmoTlm77niYflrr3pq5hcbmZ1bmN0aW9uIHd4QXV0b0ltYWdlQ2FsKG9yaWdpbmFsV2lkdGgsIG9yaWdpbmFsSGVpZ2h0LHRoYXQsYmluZE5hbWUpIHtcbiAgLy/ojrflj5blm77niYfnmoTljp/lp4vplb/lrr1cbiAgdmFyIHdpbmRvd1dpZHRoID0gMCwgd2luZG93SGVpZ2h0ID0gMDtcbiAgdmFyIGF1dG9XaWR0aCA9IDAsIGF1dG9IZWlnaHQgPSAwO1xuICB2YXIgcmVzdWx0cyA9IHt9O1xuICB2YXIgcGFkZGluZyA9IHRoYXQuZGF0YVtiaW5kTmFtZV0udmlldy5pbWFnZVBhZGRpbmc7XG4gIHdpbmRvd1dpZHRoID0gcmVhbFdpbmRvd1dpZHRoLTIqcGFkZGluZztcbiAgd2luZG93SGVpZ2h0ID0gcmVhbFdpbmRvd0hlaWdodDtcbiAgLy/liKTmlq3mjInnhafpgqPnp43mlrnlvI/ov5vooYznvKnmlL5cbiAgLy8gY29uc29sZS5sb2coXCJ3aW5kb3dXaWR0aFwiICsgd2luZG93V2lkdGgpO1xuICBpZiAob3JpZ2luYWxXaWR0aCA+IHdpbmRvd1dpZHRoKSB7Ly/lnKjlm77niYd3aWR0aOWkp+S6juaJi+acuuWxj+W5lXdpZHRo5pe25YCZXG4gICAgYXV0b1dpZHRoID0gd2luZG93V2lkdGg7XG4gICAgLy8gY29uc29sZS5sb2coXCJhdXRvV2lkdGhcIiArIGF1dG9XaWR0aCk7XG4gICAgYXV0b0hlaWdodCA9IChhdXRvV2lkdGggKiBvcmlnaW5hbEhlaWdodCkgLyBvcmlnaW5hbFdpZHRoO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiYXV0b0hlaWdodFwiICsgYXV0b0hlaWdodCk7XG4gICAgcmVzdWx0cy5pbWFnZVdpZHRoID0gYXV0b1dpZHRoO1xuICAgIHJlc3VsdHMuaW1hZ2VoZWlnaHQgPSBhdXRvSGVpZ2h0O1xuICB9IGVsc2Ugey8v5ZCm5YiZ5bGV56S65Y6f5p2l55qE5pWw5o2uXG4gICAgcmVzdWx0cy5pbWFnZVdpZHRoID0gb3JpZ2luYWxXaWR0aDtcbiAgICByZXN1bHRzLmltYWdlaGVpZ2h0ID0gb3JpZ2luYWxIZWlnaHQ7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIHd4UGFyc2VUZW1BcnJheSh0ZW1BcnJheU5hbWUsYmluZE5hbWVSZWcsdG90YWwsdGhhdCl7XG4gIHZhciBhcnJheSA9IFtdO1xuICB2YXIgdGVtRGF0YSA9IHRoYXQuZGF0YTtcbiAgdmFyIG9iaiA9IG51bGw7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCB0b3RhbDsgaSsrKXtcbiAgICB2YXIgc2ltQXJyID0gdGVtRGF0YVtiaW5kTmFtZVJlZytpXS5ub2RlcztcbiAgICBhcnJheS5wdXNoKHNpbUFycik7XG4gIH1cblxuICB0ZW1BcnJheU5hbWUgPSB0ZW1BcnJheU5hbWUgfHwgJ3d4UGFyc2VUZW1BcnJheSc7XG4gIG9iaiA9IEpTT04ucGFyc2UoJ3tcIicrIHRlbUFycmF5TmFtZSArJ1wiOlwiXCJ9Jyk7XG4gIG9ialt0ZW1BcnJheU5hbWVdID0gYXJyYXk7XG4gIHRoYXQuc2V0RGF0YShvYmopO1xufVxuXG4vKipcbiAqIOmFjee9rmVtb2ppc1xuICpcbiAqL1xuXG5mdW5jdGlvbiBlbW9qaXNJbml0KHJlZz0nJyxiYXNlU3JjPVwiL3d4UGFyc2UvZW1vamlzL1wiLGVtb2ppcyl7XG4gICBIdG1sVG9Kc29uLmVtb2ppc0luaXQocmVnLGJhc2VTcmMsZW1vamlzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHd4UGFyc2U6IHd4UGFyc2UsXG4gIHd4UGFyc2VUZW1BcnJheTp3eFBhcnNlVGVtQXJyYXksXG4gIGVtb2ppc0luaXQ6ZW1vamlzSW5pdFxufVxuXG5cbiJdfQ==