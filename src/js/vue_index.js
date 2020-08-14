function selfVue(options) {
    this.data = options.data;  
    this.methods = options.methods;

    Object.keys(this.data).forEach((key) => {
        this.proxyKeys(key);
    })

    // 实时监听data里的值
    observe(this.data);

    // 编译
}

selfVue.prototype = {
    // 处理参数中data的字段
    proxyKeys:function(key) {
        var self = this;
        Object.defineProperty(this,key,{
            enumerable:false,
            configurable:true,
            get:function getter() {
                return self.data[key];
            },
            set:function setter(newVal) {
                self.data[key] = newVal;
            }
        })
    }
}