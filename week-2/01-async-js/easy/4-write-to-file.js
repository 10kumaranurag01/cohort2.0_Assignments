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

}

function writeToFile() {
    return new Promise(function (resolve) {
        let fs = require("fs")
        let data = "WRITTEN BY KUMAR ANURAG SAHU <3"
        fs.writeFile("a.txt", data, function (err, data) {
            if (err) {
                console.log(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

async function AfterWriting() {
    let d = await writeToFile()
    console.log("File Written")
    printFile()
}


AfterWriting()
