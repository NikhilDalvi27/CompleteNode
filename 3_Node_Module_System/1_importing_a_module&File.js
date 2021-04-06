const fs = require('fs');
const util = require('./NotesApp/util');


//todo  REQUIRE loads the specified module (the string inside require needs to be perfectly matched)
// then that value is stored inside a variable


//todo If the file exists then the content will be overwritten
fs.writeFileSync('dummy.txt','This was created using Node.js')

//todo To add something use this
fs.appendFileSync('dummy.txt','This was appended')