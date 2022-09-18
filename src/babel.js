async function start() {
    return await Promise.resolve('Promise');
}


start().then((data) => {
    console.log(data)
})

class Util {
    static id = Date.now();
}

console.log(Util.id)