const {json} = require('express');
const fs = require('fs');
const chalk = require('chalk');

function getNotes() {
    return "Your Notes";
}


function addNote(title, body) {
    const notes = loadNotes();
    const duplicateNote = notes.find(function (note) {
        return note.title === title;
    })

    debugger;

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log("New Note Added");
    } else {
        console.log("Note title taken");
    }


}

const saveNotes =  (notes)=> {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}

const loadNotes =  ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}


function removeNotes(title) {
    const notes = loadNotes();
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })

    if (notesToKeep.length < notes.length) {
        const msg = "Note Deleted";
        console.log(chalk.green.inverse(msg));

        saveNotes(notesToKeep);
    } else {
        const msg = "Title doesn't exists";
        console.log(chalk.red.inverse(msg));
    }
}

function listNotes(){
    const notes = loadNotes();
    console.log(chalk.blue.inverse("Notes Title"));

    notes.forEach(note=>{
        const msg = note.title;
        console.log(chalk.blue(msg));
    })
}

function readNote(title){
    const notes = loadNotes();
    const reqNote=  notes.find(note=>{
        return note.title===title
    })

    if(reqNote)
    {
        const msg = 'Here the Rquired Note';
        console.log(chalk.blue.inverse(msg));

        console.log(reqNote.title);
        console.log(reqNote.body);
    }else{
        const msg = 'No note with that title';
        console.log(chalk.red.inverse(msg));
    }

}



//todo Important Note that we need to export the stuff that
// we will use when notes files is required

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes:listNotes,
    readNote:readNote
} 
