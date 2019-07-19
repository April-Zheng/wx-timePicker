// components/timePicker/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        /**
         * 组件类型 date:日期(yyyy-MM-dd) time：时间(hh:mm:ss) dateTime: 日期时间(yyyy-MM-dd hh:mm:ss)
         */
        mode: {
            type: String,
            value: 'date',
            observer: 'modeChange'
        },
        disabled: {
            type: Boolean,
            value: false
        },
        placeholder: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        pickerArray: [], //日期控件数据list
        pickerIndex: [], //日期控件选择的index
        dateString: '' //页面显示日期
    },

    /**
     * 组件的方法列表
     */
    methods: {

        modeChange: function(newVal, oldVal) {
            this.getPickerArray(newVal)
        },
        //补零
        formatNumber(n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        },
        //日期时间格式化
        formateDateTime(arr) {
            let mode = this.data.mode
            switch (mode) {
                case 'date':
                    return arr.map(this.formatNumber).join('-')
                    break;
                case 'time':
                    return arr.map(this.formatNumber).join(':')
                    break;

                case 'dateTime':
                    return arr.slice(0, 3).map(this.formatNumber).join('-') + ' ' + arr.slice(3, 6).map(this.formatNumber).join(':')
                    break;
            }
        },

        /**
         *
         * 获取本月天数
         * @param {number} year
         * @param {number} month
         * @param {number} [day=0] 0为本月0最后一天的
         * @returns number 1-31
         */
        _getNumOfDays(year, month, day = 0) {
            return new Date(year, month, day).getDate();
        },

        //获取pickerArray
        getPickerArray(mode = this.data.mode) {
            let date = new Date();
            let pickerArray = []
                //年
            let year = [];
            for (let i = date.getFullYear() - 5; i <= date.getFullYear() + 5; i++) {
                year.push({ id: i, name: i + '年' });
            }
            let currentYear = date.getFullYear();
            let yearIndex = year.findIndex(item => item.id == currentYear);
            pickerArray.push({
                    picker: 'year',
                    value: year,
                    pickerIndex: yearIndex
                })
                //月
            let month = [];
            for (let i = 1; i <= 12; i++) {
                month.push({ id: i, name: i + '月' });
            }
            pickerArray.push({
                    picker: 'month',
                    value: month,
                    pickerIndex: date.getMonth(),
                })
                //日
            let dayNum = this._getNumOfDays(date.getFullYear(), date.getMonth() + 1);
            let day = [];
            for (let i = 1; i <= dayNum; i++) {
                day.push({ id: i, name: i + '日' });
            }
            pickerArray.push({
                    picker: 'day',
                    value: day,
                    pickerIndex: date.getDate() - 1,
                })
                //时
            let time = [];
            for (let i = 0; i <= 23; i++) {
                time.push({ id: i, name: this.formatNumber(i) });
            }
            pickerArray.push({
                    picker: 'time',
                    value: time,
                    pickerIndex: date.getHours(),
                })
                //分
            let minutes = [];
            for (let i = 0; i <= 59; i++) {
                minutes.push({ id: i, name: this.formatNumber(i) });
            }
            pickerArray.push({
                    picker: 'minutes',
                    value: minutes,
                    pickerIndex: date.getMinutes(),
                })
                //秒
            let seconds = [];
            for (let i = 0; i <= 59; i++) {
                seconds.push({ id: i, name: this.formatNumber(i) });
            }
            pickerArray.push({
                picker: 'seconds',
                value: seconds,
                pickerIndex: date.getSeconds(),
            })

            let pickerIndex = []
                //过滤不同mode的pickerArray keys
            let formatPickerArray = () => {
                    switch (mode) {
                        case 'date':
                            return ['year', 'month', 'day']
                            break;
                        case 'dateTime':
                            return ['year', 'month', 'day', 'time', 'minutes', 'seconds']
                            break;
                        case 'time':
                            return ['time', 'minutes', 'seconds']
                            break;
                    }
                }
                //过滤不同mode的pickerArray values
            let pickerValues = formatPickerArray(mode)
            let formatPickers = []
                // pickerArray.filter(item =>
                //     pickerValues.indexOf(item.picker) >= 0
                // )
                //获取pickers选项和默认选择下标
            pickerArray.map(item => {
                if (pickerValues.indexOf(item.picker) >= 0) {
                    pickerIndex.push(item.pickerIndex)
                    formatPickers.push(item.value)
                }
            })
            this.setData({
                    pickerArray: formatPickers,
                    pickerIndex
                })
                //通过下标获取对应时间
            let currentDate = this.getPickerValue(pickerIndex)
            this.setData({
                dateString: currentDate
            })

        },

        getPickerValue(pickerIndex) {
            let date = this.data.pickerArray.map((item, index) =>
                // console.log(this.data.pickerArray[index][pickerIndex[index]].id, pickerIndex)
                this.data.pickerArray[index][pickerIndex[index]].id
            )
            let dateString = this.formateDateTime(date)

            return dateString
        },
        pickerChange: function(e) {
            let currentDate = this.getPickerValue(e.detail.value)
            this.setData({
                dateString: currentDate
            })
            let detail = {
                value: currentDate
            }
            this.triggerEvent('onPickerChange', detail);
        },
        //月变化时获取当月多少天
        pickerColumnChange: function(e) {
            let value = e.detail
            let year = this.data.pickerArray[0][this.data.pickerIndex[0]].id
            if (this.data.mode !== 'time') {
                if (value.column === 1) {
                    let days = this._getNumOfDays(year, value.value + 1)
                    let day = [];
                    for (let i = 1; i <= days; i++) {
                        day.push({ id: i, name: i + '日' });
                    }
                    this.data.pickerArray[2] = day
                    this.setData({
                        pickerArray: this.data.pickerArray
                    })
                }
            }
        },
        pickerCancel: function(e) {}

    },

    lifetimes: {
        attached() {
            // 在组件实例进入页面节点树时执行
        },
        detached() {
            // 在组件实例被从页面节点树移除时执行
        },
        ready() {
            this.getPickerArray()
        }
    }
});