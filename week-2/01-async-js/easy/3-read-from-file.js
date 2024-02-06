function readFromFile() {
    return new Promise(function (resolve) {
        let fs = require("fs")
        fs.readFile("a.txt", "utf-8", function (err, data) {
            resolve(data)
        })
    })
}

async function printFile() {
    let d = await readFromFile()
    console.log(d)
    console.log("All texts are Printed")
    console.timeEnd("measurement")
}

console.log("Printing...")
console.time("measurement");
printFile()
