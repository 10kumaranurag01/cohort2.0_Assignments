let fs = require("fs")

function readFromFile() {
    return new Promise(function (resolve) {
        fs.readFile("a.txt", "utf-8", function (err, data) {
            resolve(data)
        })
    })
}

function writeToFile(data) {
    return new Promise(function (resolve) {
        let fs = require("fs")
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

async function cleanFile() {
    let d = await readFromFile()

    let f = d.split(" ").filter(element => {
        if (Object.keys(element).length !== 0) {
            return true;
        }

        return false;
    })


    let finalData = []
    f.forEach(element => {
        finalData.push(element)
        finalData.push(" ")
    });
    let finalDataInString = finalData.join("")
    let writeNow = await writeToFile(finalDataInString)
}


async function printFile() {
    let data = await readFromFile()
    console.log(data)
}

async function startCleaningFile() {
    console.log("Before removing unwanted spaces:")
    let stepOne = await printFile()
    let stepTwo = await cleanFile()
    console.log("After removing unwanted spaces:")
    let stepThree = await printFile()
}

startCleaningFile()