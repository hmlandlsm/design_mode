// 提供代码组织为一个逻辑单元的手段
// 这个逻辑单元中的代码可以通过单一变量进行访问

// 优点：

// 1、可以用来划分命名空间，减少全局变量数量
// 2、代码组织地更为一致，使代码容易阅读和维护
// 3、可以被实例化，且实例化一次



function CreateDiv (html) {
  this.html = html;
  this.init();
}

// 创建div的方法
CreateDiv.prototype.init = function () {
  let div = document.createElement("div");
  document.body.appendChild(div);
  div.innerHTML = '11'
  div.innerText = '22'
  console.log(div)
}


// 代理实现单例模式
let ProxyMode = (function () {
  let instance;
  return function (html) {
    if (!instance) {
      instance = new CreateDiv()
    }
    return instance;
  }
})()

let a = new ProxyMode('aaaa');
let b = new ProxyMode('bbbb');
console.log(a);
console.log(b);
console.log(a === b)


handler.setInputAction(function (movement) {
  let foundPosition = false;
  var scene = viewer.scene;
  if (scene.mode !== Cesium.SceneMode.MORPHING) {
    var pickedObject = scene.pick(movement.endPosition);
    if (scene.pickPositionSupported && Cesium.defined(pickedObject) && pickedObject.id === modelEntity) {
      var cartesian = viewer.scene.pickPosition(movement.endPosition);
      if (Cesium.defined(cartesian)) {
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
        labelEntity.position = cartesian;
        labelEntity.label.show = true;
        labelEntity.label.text =
          "玛卡马卡 " + +
          "\u00B0" +
          "鬓鬓鬓鬓 " +
          ("   " + latitudeString).slice(-7) +
          "\u00B0" +
          "\nAlt: ";

        labelEntity.label.eyeOffset = new Cesium.Cartesian3(
          0.0,
          0.0,
          -cartographic.height *
          (scene.mode === Cesium.SceneMode.SCENE2D ? 1.5 : 1.0)
        );

        foundPosition = true;
      }
    }
  }
  if (!foundPosition) {
    labelEntity.label.show = false;
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);