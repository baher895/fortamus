'use strict'

const readline = require('readline-sync')

const fortamus = require('./lib/fortamus')
const myFile = fortamus('source.txt')

const runMenu = () => {
  let choice
  while (choice != 7) {
    console.log(`
...        ....        *** MENU ***        ....         ...
-----------------------------------------------------------

    [1] Print Total Lines Of  File
    [2] Print Full Name For 432nd And 43243rd Records
    [3] Print Donation Occurred In Each Month
    [4] Print Most Common First Name And Its Occurrence
    [5] Set File Name in Source Folder
    [6] Run All Options Asynchronously And Exit
    [7] Exit
      `)
    choice = readline.keyIn(`Please Select The Number You Want to Execute : `)

    while (choice < 1 || choice > 7)
      choice = readline.keyIn(`Please Select The Number You Want to Execute : `)

    switch (choice) {
      case `1`:
        myFile.totalLine_Sync()
        break
      case `2`:
        myFile.allNames_Sync()
        break
      case `3`:
        myFile.donationQuery_Sync()
        break
      case `4`:
        myFile.commonFirstName_Sync()
        break
      case `5`:
        var fileName = readline.question(`What Is The New File Name? `);
        myFile.setFileName(fileName)
        break
      case '6':
        myFile.totalLine()
        myFile.allNames()
        myFile.donationQuery()
        myFile.commonFirstName()
        break
      case `7`:
        console.log(`Thank You For Using Our Small, Smart, Fun Application :)
                  See You Soon`)
        break
    }
  }
}


runMenu()