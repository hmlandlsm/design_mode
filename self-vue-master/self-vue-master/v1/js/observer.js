// 定义Observer的构造函数
function Observer(data) {
    this.data = data;
    this.walk(data);
}
Observer.prototype = {
    walk: function(data) {
        var self = this;
        Object.keys(data).forEach(function(key) {
            self.defineReactive(data, key, data[key]);
        });
    },
    // 将数据包装成一个可观测的类型，rective即指的是可观测的类型，包括data和props
    defineReactive: function(data, key, val) {
        var dep = new Dep();
        // 一直嵌套，判断子元素是否仍然是对象
        var childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            // 读取值时，创建关联
            get: function() {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            // 更改值时，通知依赖
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    // value指的是data对象，vm指的是vue本身
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};


// 处理依赖的构造函数
function Dep () {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
Dep.target = null;
