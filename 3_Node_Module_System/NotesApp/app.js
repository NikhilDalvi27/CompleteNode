const validator = require('validator');
const notes = require('./notes');
//todo chalk is for terminal styling
const chalk = require('chalk');
const yargs = require('yargs');


yargs.version('1.1.0');



//todo Create add command
// the object passed to command method is called Options
// using the options object we can customize how the command method should work
// the handler property specifies what should happen when the command property of option object
// is matched

//todo add
// Note that the builder property specifies the addtional options
// used while parsing

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe: 'Note title',
             demandOption:true,
             type :'string'
        },
        body:{
            describe:'Note Body',
            demandOption:true,
            type: 'string'
        }

    },
    handler: function (argv) {  
       notes.addNote(argv.title,argv.body);
        // console.log('Title ',argv.title);
        // console.log('Body ',argv.body);
    }
})


yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler: function (argv) {
        notes.removeNotes(argv.title);
    }
})


yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function () {
        notes.listNotes();
    }
})


yargs.command({
    command:'read',
    describe:'Read a note',
    builder:{
        title:{
            describe:'Reading a Note',
            demandOption:true,
            type : 'string'
        }
    },
    handler:function (argv) {
        notes.readNote(argv.title);
    }
})

//todo Note this is Important
// This is actually making yargs to parse the command line argument
// and the above code won't work without this
yargs.parse();


// const msg = getNotes();
// console.log(msg);
// console.log(validator.isEmail('s@example.com'));
// console.log(chalk.bold.blue.inverse('Success'));
