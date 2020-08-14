var obj = new Proxy({}, {
    get:function(target,key,receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target,key,receiver);
    },
    set:function(target,key,value,receiver) {
        console.log(`setting${key}!`);
        return Reflect.set(target,key,value,receiver);
    }
})




function timeout(ms) {
    return new Promise(resolve,reject) => {
    setTimeout(resolve,ms,'done');
    });
    }
    timeout(100).then((value) => {
    console.log(value);
    })