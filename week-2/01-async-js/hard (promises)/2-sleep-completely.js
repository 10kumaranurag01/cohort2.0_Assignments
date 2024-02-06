/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function wait(n) {

    return new Promise(function (resolve) {
        setTimeout(resolve, n)
    })

}

async function sleep(milliseconds) {

    let d = await wait(milliseconds)
    console.log("Hoooooooo")

}

sleep(2000)
