// 监听行为
function observe(value,vm) {
    if(!value || typeof value !== 'object') {
        return;
    }
    return new observer(value);
}

// 监听器
function Observer(data) {
    this.data = data;
    this.walk(data);
}

// 监听器拥有的行为
Observer.prototype = {
    walk:function(data) {
        Object.keys(data).forEach((key) => {
            this.defineRective(data,key,data[key]);
        })
    },
    defineRective:function(data,key,val) {
        var dep = new Dep();
        var childObj = observe(val);
        Object.defineProperty(data,key, {
            enumerable:false,
            configurable:true,
            get:function getter() {
                if(Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set:function setter(newVal) {
                if(newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify();
            }
        })
    }
}

// 
function Dep() {
    this.sub = [];
}

Dep.prototype = {
    addSub:function(sub) {
        this.subs.push(sub);
    },
    notify:function() {
        this.subs.forEach(function(sub) {
            sub.update();
        })
    }
}

Dep.target = null;