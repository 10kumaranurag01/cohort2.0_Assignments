// Done this using setInterval()

setInterval(() => {
    let d = new Date();
    let hours = d.getHours()
    let minutes = d.getMinutes()
    let seconds = d.getSeconds()

    console.log(`${hours}:${minutes}:${seconds}`)
}, 1000);