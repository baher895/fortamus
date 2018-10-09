const fs = require('fs')
const moment = require('moment')

let file = ""

const setFileName = (fileName) => {
  const tempFile = `./source/${fileName}`
  if (fs.existsSync(tempFile)) {
    file = tempFile
    console.log(`:> New File Path Set To ${file}`)
  }
  else
    console.log(":> Error: File Name Does Not Exist")
}

const totalLine = () => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err)
      console.error(err)

    const lines = data.split("\n")
    console.log(`\n:> Total Number of Records are ${lines.length}`)
  })
}

const totalLine_Sync = () => {
  const data = fs.readFileSync(file, 'utf8');
  const lines = data.split("\n")
  console.log(`\n:> Total Number of Records are ${lines.length}`)
}

const allNames = () => {
  let names = []
  fs.readFile(file, 'utf8', (err, data) => {
    if (err)
      console.error(err)

    const lines = data.split("\n")
    lines.forEach(line => {
      names.push(line.split('|')[7])
    })

    console.log(`\n:> Full Name of 432nd Record is ${names[431]}`)
    console.log(`:> Full Name of 43243rd Record is ${names[43242]}`)
  })
}

const allNames_Sync = () => {
  let names = []
  const data = fs.readFileSync(file, 'utf8');

  const lines = data.split("\n")
  lines.forEach(line => {
    names.push(line.split('|')[7])
  })

  console.log(`\n:> Full Name of 432nd Record is ${names[431]}`)
  console.log(`:> Full Name of 43243rd Record is ${names[43242]}`)
}

const donationQuery = () => {

  fs.readFile(file, 'utf8', (err, data) => {
    if (err)
      console.error(err)

    let count = []
    for (let i = 0; i < 12; i++)
      count[i] = 0


    const lines = data.split("\n")
    lines.forEach(line => {
      let date = line.split('|')[4]
      date !== undefined ? count[(new moment(date.slice(0, 8)).month())]++ : null
    })

    console.log('\nMonthly Donation:\n')
    for (let i = 0; i < 12; i++) {
      let exp = i < 9 ? `:> Month 0${i + 1}: ` : `:> Month ${i + 1}: `
      exp += `${count[i]} Donations`
      console.log(exp)
    }
  })
}

const donationQuery_Sync = () => {
  const data = fs.readFileSync(file, 'utf8');

  let count = []
  for (let i = 0; i < 12; i++)
    count[i] = 0


  const lines = data.split("\n")
  lines.forEach(line => {
    let date = line.split('|')[4]
    date !== undefined ? count[(new moment(date.slice(0, 8)).month())]++ : null
  })


  console.log('\nMonthly Donation:\n')
  for (let i = 0; i < 12; i++) {
    let exp = i < 9 ? `:> Month 0${i + 1}: ` : `:> Month ${i + 1}: `
    exp += `${count[i]} Donations`
    console.log(exp)
  }

}

const commonFirstName = () => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err)
      console.error(err)

    const names = new Map()
    const lines = data.split("\n")
    lines.forEach(line => {

      const fullname = line.split('|')[7]
      let name = fullname !== undefined ? fullname.split(',') : ""


      if (names.has(name[1])) {
        let temp = names.get(name[1])
        temp++
        names.set(name[1], temp)
      }
      else
        names.set(name[1], 1)
    })

    let commonName;
    let occurancy = 0;
    names.forEach((value, key, map) => {
      if (value > occurancy) {
        occurancy = value
        commonName = key
      }
    })

    console.log(`\n:> Common Name is ${commonName} with occurancy of ${occurancy}`)

  })
}

const commonFirstName_Sync = () => {
  const data = fs.readFileSync(file, 'utf8');

  const names = new Map()
  const lines = data.split("\n")
  lines.forEach(line => {

    const fullname = line.split('|')[7]
    let name = fullname !== undefined ? fullname.split(',') : ""


    if (names.has(name[1])) {
      let temp = names.get(name[1])
      temp++
      names.set(name[1], temp)
    }
    else
      names.set(name[1], 1)
  })

  let commonName;
  let occurancy = 0;
  names.forEach((value, key, map) => {
    if (value > occurancy) {
      occurancy = value
      commonName = key
    }
  })

  console.log(`\n:> Common Name is ${commonName} with occurancy of ${occurancy}`)

}


module.exports = (fileName) => {
  file = `./source/${fileName}`
  return {
    setFileName,
    totalLine,
    totalLine_Sync,
    allNames,
    allNames_Sync,
    donationQuery,
    donationQuery_Sync,
    commonFirstName,
    commonFirstName_Sync
  }
}