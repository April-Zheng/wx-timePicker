// components/timePicker/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

        disabled: {
            type: Boolean,
            value: false
        },
        inputHolder: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        pickerArray: [], //日期控件数据list
        pickerIndex: [], //日期控件选择的index
        chooseIndex: [], //日期控件确认选择的index
        chooseArray: [], //日期控件确认选择后的list
        dateString: '' //页面显示日期
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //补零
        formatNumber(n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        },
        _onInit() {
            let date = new Date();
            let pickerArray = this.data.pickerArray;
            //时
            let time = [];
            for (let i = 0; i <= 23; i++) {
                time.push({ id: i, name: this.formatNumber(i) });
            }
            //分
            let division = [];
            for (let i = 0; i <= 59; i++) {
                division.push({ id: i, name: this.formatNumber(i) });
            }
            //秒
            let seconds = [];
            for (let i = 0; i <= 59; i++) {
                seconds.push({ id: i, name: this.formatNumber(i) });
            }

            //选项
            pickerArray[0] = time;
            pickerArray[1] = division;
            pickerArray[2] = seconds;
            let detail = {
                value: this.formatNumber(date.getHours()) +
                    ':' +
                    this.formatNumber(date.getMinutes()) +
                    ':' +
                    this.formatNumber(date.getSeconds())
            };
            this.setData({
                pickerArray,
                pickerIndex: [
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds()
                ],
                dateString: detail.value
            });
            this.chooseIndex = [
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()
            ];
            this.data.chooseArray = pickerArray;
        },

        pickerChange: function(e) {
            let indexArr = e.detail.value;
            const time = this.data.pickerArray[0][indexArr[0]].id;
            const division = this.data.pickerArray[1][indexArr[1]].id;
            const seconds = this.data.pickerArray[2][indexArr[2]].id;
            let detail = {
                value: this.formatNumber(time) +
                    ':' +
                    this.formatNumber(division) +
                    ':' +
                    this.formatNumber(seconds)
            };

            this.data.chooseIndex = e.detail.value;
            this.data.chooseArray = this.data.pickerArray;
            this.setData({
                dateString: detail.value
            })
            this.triggerEvent('onPickerChange', detail);
        },
        pickerColumnChange: function(e) {

        },
        pickerCancel: function(e) {
            this.setData({
                pickerIndex: this.data.chooseIndex,
                pickerArray: this.data.chooseArray
            });
        }
    },

    lifetimes: {
        attached() {
            // 在组件实例进入页面节点树时执行
        },
        detached() {
            // 在组件实例被从页面节点树移除时执行
        },
        ready() {
            this._onInit();
        }
    }
});