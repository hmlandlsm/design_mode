var viewer = new Cesium.Viewer("cesiumContainer", {
  selectionIndicator: false,
  infoBox: false,
});

var scene = viewer.scene;
if (!scene.pickPositionSupported) {
  window.alert("This browser does not support pickPosition.");
}
var handler;
Sandcastle.addToolbarButton("Pick Entity", function () {
  var entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    billboard: {
      image: "../images/Cesium_Logo_overlay.png",
    },
  });

  // If the mouse is over the billboard, change its scale and color
  handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  handler.setInputAction(function (movement) {
    var pickedObject = scene.pick(movement.endPosition);
    if (Cesium.defined(pickedObject) && pickedObject.id === entity) {
      entity.billboard.scale = 2.0;
      entity.billboard.color = Cesium.Color.YELLOW;
    } else {
      entity.billboard.scale = 1.0;
      entity.billboard.color = Cesium.Color.WHITE;
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
});

Sandcastle.addToolbarButton("Drill-Down Picking", function () {
  var pickedEntities = new Cesium.EntityCollection();
  var pickColor = Cesium.Color.YELLOW.withAlpha(0.5);
  function makeProperty (entity, color) {
    var colorProperty = new Cesium.CallbackProperty(function (
      time,
      result
    ) {
      if (pickedEntities.contains(entity)) {
        return pickColor.clone(result);
      }
      return color.clone(result);
    },
      false);

    entity.polygon.material = new Cesium.ColorMaterialProperty(
      colorProperty
    );
  }

  var red = viewer.entities.add({
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        -70.0,
        30.0,
        -60.0,
        30.0,
        -60.0,
        40.0,
        -70.0,
        40.0,
      ]),
      height: 0,
    },
  });
  makeProperty(red, Cesium.Color.RED.withAlpha(0));

  var blue = viewer.entities.add({
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        -75.0,
        34.0,
        -63.0,
        34.0,
        -63.0,
        40.0,
        -75.0,
        40.0,
      ]),
      height: 0,
    },
  });
  makeProperty(blue, Cesium.Color.BLUE.withAlpha(0));

  var green = viewer.entities.add({
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        -67.0,
        36.0,
        -55.0,
        36.0,
        -55.0,
        30.0,
        -67.0,
        30.0,
      ]),
      height: 0,
    },
  });
  makeProperty(green, Cesium.Color.GREEN.withAlpha(0));

  // Move the primitive that the mouse is over to the top.
  handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  handler.setInputAction(function (movement) {
    // get an array of all primitives at the mouse position
    var pickedObjects = scene.drillPick(movement.endPosition);
    if (Cesium.defined(pickedObjects)) {
      //Update the collection of picked entities.
      pickedEntities.removeAll();
      for (var i = 0; i < pickedObjects.length; ++i) {
        var entity = pickedObjects[i].id;
        pickedEntities.add(entity);
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
});
Sandcastle.reset = function () {
  viewer.entities.removeAll();
  handler = handler && handler.destroy();
};

// 展示实体
createEntity() {
  this._labelEntity = this._viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(113.00332, 23.000044),
    billboard: {
      image: 'https://dlcdn.cdollar.cn/static/bus-a.png',
      // 处理图标被遮挡问题
      heightReference: Cesium.HeightReference.NONE,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    },
    label: {
      show: false,
      showBackground: true,
      font: '14px monospace',
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(15, 0)
    }
  });
}
hideEntity() {
  this._labelEntity.show = false;
}