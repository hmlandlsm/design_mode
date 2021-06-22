Promise.resolve(Promise.reject('error'))
    .then(console.log())
    .then(console.log())
    .then(console.log())
    .then(console.log())
    .then(console.log())
    .catch(console.log('???'))
    .catch(console.log('!!!'))
    .catch(console.log('...'))
    .catch(e => {
        console.log('a', e)
    })
    .catch(e => {
        console.log('b', e)
    })
    .catch(e => {
        console.log('c', e)
    })
    .catch(e => {
        console.log('d', e)
    })