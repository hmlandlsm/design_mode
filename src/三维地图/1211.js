var viewer = new Cesium.Viewer("cesiumContainer", {
  selectionIndicator: false,
  infoBox: false,
});

var scene = viewer.scene;
if (!scene.pickPositionSupported) {
  window.alert("This browser does not support pickPosition.");
}

var handler;

Sandcastle.addDefaultToolbarButton(
  "Show Cartographic Position on Mouse Over",
  function () {
    var entity = viewer.entities.add({
      label: {
        show: false,
        showBackground: true,
        font: "14px monospace",
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: Cesium.VerticalOrigin.TOP,
        pixelOffset: new Cesium.Cartesian2(15, 0),
      },
    });

    // Mouse over the globe to see the cartographic position
    handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function (movement) {
      var cartesian = viewer.camera.pickEllipsoid(
        movement.endPosition,
        scene.globe.ellipsoid
      );
      if (cartesian) {
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var longitudeString = Cesium.Math.toDegrees(
          cartographic.longitude
        ).toFixed(2);
        var latitudeString = Cesium.Math.toDegrees(
          cartographic.latitude
        ).toFixed(2);

        entity.position = cartesian;
        entity.label.show = true;
        entity.label.text =
          "Lon: " +
          ("   " + longitudeString).slice(-7) +
          "\u00B0" +
          "\nLat: " +
          ("   " + latitudeString).slice(-7) +
          "\u00B0";
      } else {
        entity.label.show = false;
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
);

Sandcastle.addToolbarButton("Pick Entity", function () {
  const list = [
    {
      lng: -75.59777,
      name: 'camera1',
      id: '4',
      lat: 40.03883,
      height: 500
    },
    {
      lng: -80.5,
      name: 'camera17',
      id: '7',
      lat: 35.14,
      height: 500
    },
    {
      lng: -80.12,
      name: 'camera18',
      id: '8',
      lat: 25.46,
      height: 500
    },
    {
      lng: 119.733157,
      name: 'camera2',
      id: '5',
      lat: 29,
      height: 500
    },
    {
      lng: 119,
      name: 'camera3',
      id: '6',
      lat: 38,
      height: 500
    },
    {
      lng: 119.7325,
      name: 'camera1',
      id: '1',
      lat: 26.836877,
      height: 500
    },
    {
      lng: 129.7325,
      name: 'camera2',
      id: '2',
      lat: 26.836877,
      height: 5000
    },
    {
      lng: 119.7325,
      name: 'camera3',
      id: '123',
      lat: 56.836877,
      height: 50000
    }
  ];
  list.forEach(item => {
    item.modelEntity = viewer.entities.add({
      name: "milktruck",
      position: Cesium.Cartesian3.fromDegrees(item.lng, item.lat),
      billboard: {
        image: "../images/Cesium_Logo_overlay.png",
        scale: 1.0,
        color: Cesium.Color.WHITE
      },
    });
  });
  viewer.zoomTo(list[0].modelEntity);

  // If the mouse is over the billboard, change its scale and color
  handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  handler.setInputAction(function (movement) {
    var pick = scene.pick(movement.endPosition);
    list.forEach(item => {
      const entity = item.modelEntity;
      if (Cesium.defined(pick) && pick.id === entity) {
        entity.billboard.scale = 2.0;
        entity.billboard.color = Cesium.Color.YELLOW;
      } else {
        entity.billboard.scale = 1.0;
        entity.billboard.color = Cesium.Color.WHITE;
      }
    });
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
});



Sandcastle.reset = function () {
  viewer.entities.removeAll();
  handler = handler && handler.destroy();
};
