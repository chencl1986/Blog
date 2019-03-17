//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name: 'lee',
    age: 18,
    arr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    judge: true,
    staffA: { firstName: 'Hulk', lastName: 'Hu' },
    staffB: { firstName: 'Shang', lastName: 'You' },
    staffC: { firstName: 'Gideon', lastName: 'Lin' },
    options: [{ id: 'male', value: 'male', name: '男' }, { id: 'female', value: 'female', name: '女' }],
    pickerSelected: 3
  },
  onTap() {
    this.setData({
      judge: !this.data.judge
    })
  },
  onPickerChange(event) {
    this.setData({
      pickerSelected: event.detail.value
    })
  },
})
