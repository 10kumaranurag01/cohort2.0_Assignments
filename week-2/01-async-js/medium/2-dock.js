setInterval(() => {
    let d = new Date();
    let hours = d.getHours()
    let minutes = d.getMinutes()
    let seconds = d.getSeconds()
    let amORpm;
    for (let i = 0; i <= 11; i++) {
        if (hours === i) {
            amORpm = "AM"
        }
    }
    for (let i = 12; i <= 24; i++) {
        if (hours === i) {
            amORpm = "PM"
        }
    }

    console.log(`${hours}:${minutes}:${seconds} ${amORpm}`)
}, 1000);