function SelfVue (data, el, exp) {
    // data指的是传给vue对象的数据对象
    // el指的是该vue对象所要渲染的节点
    // exp指的是当前需要更改的值（即el上的赋值）
    var self = this;
    this.data = data;  // {name:'hello'}

    Object.keys(data).forEach(function(key) {
        self.proxyKeys(key);
    });

    observe(data);
    el.innerHTML = this.data[exp];  // 初始化模板数据的值
    new Watcher(this, exp, function (value) {
        el.innerHTML = value;
    });
    return this;
}

SelfVue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        // 监听对象的值，写入和读取
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function proxyGetter() {
                return self.data[key];
            },
            set: function proxySetter(newVal) {
                self.data[key] = newVal;
            }
        });
    }
}
