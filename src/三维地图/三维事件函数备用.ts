// 飞去指定位置
  /* eslint-disable */
const Cesium:any;
export default class Service {
  private _viewer:any;
  private _billboards: any;
  private _list: any;
  constructor () {
    
  };
   // 根据id返回实体
   searchById(id: string): any {
    const index = this._list.findIndex((item) => {
      return item.id === id;
    });
    return this._billboards.get(index);
  }
  // 返回项
  searchItem(id: string): any {
    return this._list.find((el: any) => {
      return el.id === id;
    });
  }
    // 飞去指定位置
  flyEntity(ent: any): void {
    // const position = entity._actualPosition
    console.log('飞咯', ent);
    // 飞实体，不能飞集合点
    // this._viewer.zoomTo(entity);
    // 飞实体，不能飞集合点
    // this._billboards.flyTo(entity, {
    //   duration: 2,
    //   offset: {
    //     heading: Cesium.Math.toRadians(0.0),
    //     pitch: Cesium.Math.toRadians(-10),
    //     range: 100
    //   }
    // });
  }
  // 飞指定坐标
  flyItem({ lng, lat, height }): void {
    // 把坐标拆出来飞
    this._viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(lng, lat, height),
      orientation: {
        heading: Cesium.Math.toRadians(20.0),
        pitch: Cesium.Math.toRadians(-25.0),
        roll: 0.0
      }
    });
  }
  // test方法
  test(): void {
    // const entity = this._viewer.entities.add({
    //   position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    //   billboard: {
    //     image: this._options.iconUrl
    //     // sizeInMeters: true,
    //   },
    // });
    // this._viewer.zoomTo(entity);
    const item = {
      lng: 119.729993,
      lat: 26.827139,
      alt: 500.0,
      heading: 20.0,
      pitch: -25.0
    };
    this._viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(item.lng, item.lat, item.alt),
      orientation: {
        heading: Cesium.Math.toRadians(item.heading),
        pitch: Cesium.Math.toRadians(item.pitch),
        roll: 0.0
      }
    });
  }
}