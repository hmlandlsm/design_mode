    
    // 展示标签内容
    // 支持pickposition方法 && 点击的是实体 && 实体有名称（区分是否为标签实体）
    // if (
    //   scene.pickPositionSupported &&
    //   Cesium.defined(pickedObject) &&
    //   pickedObject.id &&
    //   pickedObject.id._name !== 'label'
    // ) {
    //   // 循环修改图标
    //   const entityList = this._surroundLayer?.entityCollection?._entities?._array || []
    //   entityList.forEach((el) => {
    //     if (!el.description) return;
    //     if (el._id === pickedObject.id._id) {
    //       el.billboard.image = urlObjA[el.description]
    //     } else {
    //       el.billboard.image = urlObj[el.description]
    //     }
    //   });
    //   const cartesian = scene.pickPosition(position);
    //   if (Cesium.defined(cartesian)) {
    //     const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    //     this._activeEntity.position = cartesian;
    //     this._activeEntity.show = true;
    //     this._activeEntity
    //     .label.text = `我的id是${pickedObject.id._id},名字是${pickedObject.id._name}`;
    //     this._activeEntity.label.eyeOffset = new Cesium.Cartesian3(
    //       0.0,
    //       0.0,
    //       -cartographic.height *
    //         (scene.mode === Cesium.SceneMode.SCENE2D ? 1.5 : 1.0)
    //     );

    //     this._activeEntity.show = true;
    //   }
    // } else {
    //   this._activeEntity.show = false;
    // }