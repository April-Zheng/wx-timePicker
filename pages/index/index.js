//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        items: [{ name: '日期选择', value: 'date', checked: 'true' }, { name: '时间选择', value: 'time' }, { name: '日期时间选择', value: 'dateTime' }],
        mode: 'date'
    },
    onPickerChange(e) {

        console.log("onPickerChange", e)
    },
    radioChange: function(e) {
        console.log(e)
        this.setData({
            mode: e.detail.value
        })
    },

    onLoad: function() {

    },

})