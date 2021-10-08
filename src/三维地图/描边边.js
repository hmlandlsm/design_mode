var viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider: Cesium.createWorldTerrain(),
});
viewer.scene.globe.depthTestAgainstTerrain = true;
var initialPosition = Cesium.Cartesian3.fromDegrees(
  -74.01881302800248,
  40.69114333714821,
  753
);
var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(
  21.27879878293835,
  -21.34390550872461,
  0.0716951918898415
);
viewer.scene.camera.setView({
  destination: initialPosition,
  orientation: initialOrientation,
  endTransform: Cesium.Matrix4.IDENTITY,
});
var tileset = new Cesium.Cesium3DTileset({
  url: Cesium.IonResource.fromAssetId(75343),
});
viewer.scene.primitives.add(tileset);
var nameOverlay = document.createElement("div");
viewer.container.appendChild(nameOverlay);
nameOverlay.className = "backdrop";
nameOverlay.style.display = "none";
nameOverlay.style.position = "absolute";
nameOverlay.style.bottom = "0";
nameOverlay.style.left = "0";
nameOverlay.style["pointer-events"] = "none";
nameOverlay.style.padding = "4px";
nameOverlay.style.backgroundColor = "black";
var selected = {
  feature: undefined,
  originalColor: new Cesium.Color(),
};
var selectedEntity = new Cesium.Entity();
if (
  Cesium.PostProcessStageLibrary.isSilhouetteSupported(viewer.scene)
) {
  var silhouetteBlue = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
  silhouetteBlue.uniforms.color = Cesium.Color.BLUE;
  silhouetteBlue.uniforms.length = 0.01;
  silhouetteBlue.selected = [];

  var silhouetteGreen = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
  silhouetteGreen.uniforms.color = Cesium.Color.LIME;
  silhouetteGreen.uniforms.length = 0.01;
  silhouetteGreen.selected = [];

  viewer.scene.postProcessStages.add(
    Cesium.PostProcessStageLibrary.createSilhouetteStage([
      silhouetteBlue,
      silhouetteGreen,
    ])
  );
  viewer.screenSpaceEventHandler.setInputAction(function onMouseMove (
    movement
  ) {
    silhouetteBlue.selected = [];
    var pickedFeature = viewer.scene.pick(movement.endPosition);
    if (!Cesium.defined(pickedFeature)) {
      nameOverlay.style.display = "none";
      return;
    }
    nameOverlay.style.display = "block";
    nameOverlay.style.bottom =
      viewer.canvas.clientHeight - movement.endPosition.y + "px";
    nameOverlay.style.left = movement.endPosition.x + "px";
    var name = pickedFeature.getProperty("BIN");
    nameOverlay.textContent = name;
    if (pickedFeature !== selected.feature) {
      silhouetteBlue.selected = [pickedFeature];
    }
  },
    Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  viewer.screenSpaceEventHandler.setInputAction(function onLeftClick (
    movement
  ) {
    silhouetteGreen.selected = [];
    // Select the feature if it's not already selected
    if (silhouetteGreen.selected[0] === pickedFeature) {
      return;
    }

    // Save the selected feature's original color
    var highlightedFeature = silhouetteBlue.selected[0];
    if (pickedFeature === highlightedFeature) {
      silhouetteBlue.selected = [];
    }

    // Highlight newly selected feature
    silhouetteGreen.selected = [pickedFeature];

    // Set feature infobox description
    var featureName = pickedFeature.getProperty("name");
    selectedEntity.name = featureName;
    selectedEntity.description =
      'Loading <div class="cesium-infoBox-loading"></div>';
    viewer.selectedEntity = selectedEntity;
    selectedEntity.description =
      '<table class="cesium-infoBox-defaultTable"><tbody>' +
      "<tr><th>BIN</th><td>" +
      pickedFeature.getProperty("BIN") +
      "</td></tr>" +
      "<tr><th>DOITT ID</th><td>" +
      pickedFeature.getProperty("DOITT_ID") +
      "</td></tr>" +
      "<tr><th>SOURCE ID</th><td>" +
      pickedFeature.getProperty("SOURCE_ID") +
      "</td></tr>" +
      "</tbody></table>";
  },
    Cesium.ScreenSpaceEventType.LEFT_CLICK);
} else {
  // Silhouettes are not supported. Instead, change the feature color.

  // Information about the currently highlighted feature
  var highlighted = {
    feature: undefined,
    originalColor: new Cesium.Color(),
  };

  // Color a feature yellow on hover.
  viewer.screenSpaceEventHandler.setInputAction(function onMouseMove (
    movement
  ) {
    // If a feature was previously highlighted, undo the highlight
    if (Cesium.defined(highlighted.feature)) {
      highlighted.feature.color = highlighted.originalColor;
      highlighted.feature = undefined;
    }
    // Pick a new feature
    var pickedFeature = viewer.scene.pick(movement.endPosition);
    if (!Cesium.defined(pickedFeature)) {
      nameOverlay.style.display = "none";
      return;
    }
    // A feature was picked, so show it's overlay content
    nameOverlay.style.display = "block";
    nameOverlay.style.bottom =
      viewer.canvas.clientHeight - movement.endPosition.y + "px";
    nameOverlay.style.left = movement.endPosition.x + "px";
    var name = pickedFeature.getProperty("name");
    if (!Cesium.defined(name)) {
      name = pickedFeature.getProperty("id");
    }
    nameOverlay.textContent = name;
    // Highlight the feature if it's not already selected.
    if (pickedFeature !== selected.feature) {
      highlighted.feature = pickedFeature;
      Cesium.Color.clone(
        pickedFeature.color,
        highlighted.originalColor
      );
      pickedFeature.color = Cesium.Color.YELLOW;
    }
  },
    Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  // Color a feature on selection and show metadata in the InfoBox.
  viewer.screenSpaceEventHandler.setInputAction(function onLeftClick (
    movement
  ) {
    // If a feature was previously selected, undo the highlight
    if (Cesium.defined(selected.feature)) {
      selected.feature.color = selected.originalColor;
      selected.feature = undefined;
    }

    // Select the feature if it's not already selected
    if (selected.feature === pickedFeature) {
      return;
    }
    selected.feature = pickedFeature;
    // Save the selected feature's original color
    if (pickedFeature === highlighted.feature) {
      Cesium.Color.clone(
        highlighted.originalColor,
        selected.originalColor
      );
      highlighted.feature = undefined;
    } else {
      Cesium.Color.clone(pickedFeature.color, selected.originalColor);
    }
    // Highlight newly selected feature
    pickedFeature.color = Cesium.Color.LIME;
    // Set feature infobox description
    var featureName = pickedFeature.getProperty("name");
    selectedEntity.name = featureName;
    selectedEntity.description =
      'Loading <div class="cesium-infoBox-loading"></div>';
    viewer.selectedEntity = selectedEntity;
  },
    Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

