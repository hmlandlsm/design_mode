// 发送监听事件使用
export default class byEvent {
  Events: { [key: string]: Array<any> };
  constructor() {
    this.Events = {};
  }
  /* eslint-disable */
  /**
   * 发布/ 触发
   * @param eventName
   * @param args
   */
  emit(eventName: string, ...args: any): any {
    const callbackList = this.Events[eventName] || [];
    callbackList.forEach((fn) => fn.apply(this, args));
    return this;
    // 如果用js写，遍历的时候要做一下判断是否是函数，ts 用类型约束，在调用或者编译阶段会检测是否合法
    // callbackList.map(fn=>{
    //     if(typeof fn==="function") fn.apply(this,args)
    // })
  }
  /**
   * 订阅/监听
   * @param eventName
   * @param callback
   */
  on(eventName: string, callback?: any): any {
    // if(!eventName||typeof eventName !=="string") return  ；// 因为用了ts 写，所以这句不用写了，如果是js写，建议加这判断
    const callbackList = this.Events[eventName] || [];
    callback && callbackList.push(callback);
    this.Events[eventName] = callbackList;
    return this;
  }
  /**
   * 只订阅一次/监听一次：
   * @param eventName
   * @param callback
   */
  once(eventName: string, callback?: Function): any {
    // if(!eventName||typeof eventName !=="string") return ；
    const decor = (...args: any[]) => {
      callback && callback.apply(this, args);
      this.off(eventName, decor);
    };
    this.on(eventName, decor);
    return this;
  }
  /**
   * 卸载/取消 某一个回调监听(不是取消eventName的所有回调监听),主要配合once一起,实例单独调用,无意义
   * @param eventName
   * @param callback
   */
  off(eventName: string, callback: Function): any {
    const callbackList = this.Events[eventName] || [];
    const resCallbacks = callbackList.filter((fn) => fn !== callback);
    this.Events[eventName] = resCallbacks;
    return this;
  }
  /**
   * 卸载/取消 指定eventName 的所有订阅/监听
   * @param eventName
   * @param callback
   */
  remove(eventName: string, callback?: Function): any {
    this.Events[eventName] = [];
    callback && callback();
    return this;
  }
}
