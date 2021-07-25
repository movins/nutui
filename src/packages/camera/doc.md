# Camera 对话框

照相对话框，在浮层中显示，引导用户进行相关操作。

## 基本用法

```javascript
this.$camera({
  title: "确定删除此订单？",
  content: "删除后将从你的记录里消失，无法找回"
});
```
## 直接关闭当前camera
```javascript
this.$camera.closed()  //可以直接关闭当前camera
```

## ID

同一个页面中，id相同的Camera的DOM只会同时存在一个，不指定id时，id的默认值为**nut-camera-default-id**。

```javascript
this.$camera({
  id:'my-camera',
  title: "确定删除此订单？",
  content: "删除后将从你的记录里消失，无法找回"
});
```
> 如果希望同时弹出多个Camera，请给不同的Camera设置不同的id。

## 事件
```javascript
this.$camera({
        closeBtn:true,  //显式右上角关闭按钮
        onCloseBtn(event) { //右上角关闭按钮点击事件
          alert("closeBtn");
          //return false;  //阻止默认“关闭对话框”的行为
        },
        closeCallback(target) {
          alert("will close");  //对话框关闭回调函数，无论通过何种方式关闭都会触发
        }
});
        
```
## 关闭camera不销毁实例
```javascript
 this.$camera({
        animation: false, //禁用弹出动效
        canDestroy:false
      });
        
```
## 页面滚动锁定

**lockBgScroll** 值设为 **true** 时，可在弹窗出现时锁定页面滚动，且不影响窗体内部滚动。

```javascript
this.$camera({
        lockBgScroll:true,
});
```

## 标签式写法

如果Camera内容有复杂交互，可使用Camera的标签式用法。注意标签使用的时候，属性不建议使用驼峰，推荐使用如下写法

```html
<nut-camera title="标签形式调用" :visible="cameraShow" @ok-btn-click="cameraShow=false" @cancel-btn-click="cameraShow=false" @close="cameraShow=false">
    <a href="javascript:;" @click="cameraShow=false" :noCancelBtn="true">点我可以直接关闭对话框</a>
</nut-camera>
```

```javascript
export default {
  data() {
    return {
      cameraShow: false
    };
  }
}
```

## prop

| 字段 | 说明 | 类型 | 默认值
|----- | ----- | ----- | ----- 
| id | 标识符，相同者共享一个实例 | String/Number | nut-camera-default-id
| canDestroy | 是否关闭弹窗时销毁实例 | Boolean | true
| customClass | 增加一个自定义class | String | -
| animation | 是否开启默认动效 | Boolean | true
| closeOnPopstate | 是否在页面回退时自动关闭 | Boolean | false
| lockBgScroll | 锁定遮罩层滚动，不影响弹窗内部滚动（实验性质）会给body添加posotion:fix属性，注意 | Boolean | false


## 事件

| 字段 | 说明 | 类型 | 默认值
|----- | ----- | ----- | ----- 
| onCloseBtn | 关闭按钮回调 | Function | -
| closeCallback | 关闭回调，任何情况关闭弹窗都会触发 | Function | -
| closed | 关闭camera | Function | -