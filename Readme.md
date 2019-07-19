##微信小程序 日期时间选择器

参数

| 参数 | 说明 | 类型 | 默认值 |
|--|--|--|--|
| mode | 选择器类型 | String | date |
| disabled | 是否禁用 | Boolean | false |
| placeholder | 输入框提示文本 | String |  |

事件

| 事件 | 说明 | 返回值 | 
|--|--|--|
| onPickerChange | value改变时触发 | 返回选中的日期/时间(e.detail.value) | 

示例

index.json 

```
"usingComponents": {
        "time-picker": "../../../components/timePicker/index"
    }
```

index.wxml 

```
<time-picker mode="{{mode}}" class="picker" placeholder="请选择时间" bind:onPickerChange="onPickerChange"></time-picker>
```

index.js 

```
onPickerChange(e) {
        console.log("onPickerChange", e)
    },
```
