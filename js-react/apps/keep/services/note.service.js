import { storageService } from "../../../services/storage.service.js";
import { utilService } from "../../../services/util.service.js";

const STORAGE_KEY = "notesDB";
const STORAGE_KEY_PINNED = "pinnedNotesDB"

export const notesService = {
  query,
  addNote,
  deleteNote,
  loadImageFromInput,
  editNote,
  pinNote,
  toggleTodo,
  getPinnedNotes,
};


const gNotes = storageService.loadFromStorage() || [
  {
    id: utilService.makeId(),
    type: "note-video",
    backgroundColor: "#CFDAC8",
    info: {
      url: "https://www.youtube.com/embed/DP4QDNm6f4Q",
      title: "Watch this.",
    },
  },
  {
    id: utilService.makeId(),
    type: "note-txt",
    backgroundColor: "#CFDAC8",
    info: {
      txt: "Call Bob and remind him of the party on Saturday.",
    },
  },
  {
    id: utilService.makeId(),
    type: "note-img",
    backgroundColor: "#fff",
    info: {
      url: "https://images.unsplash.com/photo-1536532184021-da5392b55da1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ymx1ZSUyMHNreXxlbnwwfHwwfHw%3D&w=1000&q=80",

      title: "2021",
      txt: "The skies during our first picnic.",
    },
  },

  {
    id: utilService.makeId(),
    type: "note-todos",
    backgroundColor: "#CCF2F4",
    info: {
      title: "What to know about JS",
      todos: [
        { txt: "You can add properties to almost everything", doneAt: null },
        { txt: "Functions are objects", doneAt: 187111111 },
        {
          txt: "For... in loops iterate over property names, not values",
          doneAt: 187111111,
        },
        { txt: "Variable scoping", doneAt: 187111111 },
        {
          txt: "Variables that aren’t explicitly declared can be global",
          doneAt: 187111111,
        },
        { txt: 'JavaScript never "sleep()s"', doneAt: 187111111 },
      ],
    },
  },
  {
    id: utilService.makeId(),
    type: "note-img",
    backgroundColor: "CCF2F4",
    info: {
      url: "https://imageio.forbes.com/specials-images/imageserve/6058b1eed388d3a4a0831d09/960x0.jpg?fit=bounds&format=jpg&width=960",
      title: "Diving in the Galapagos",
    },
  },



  {
    id: utilService.makeId(),
    type: "note-todos",
    backgroundColor: "#CCEDD2",
    info: {
      title: "Get my stuff together",
      todos: [
        { txt: "Driving liscence", doneAt: null },
        { txt: "Coding power", doneAt: 187111111 },
      ],
    },
  },
  {
    id: utilService.makeId(),
    type: "note-img",
    backgroundColor: "#D3E4CD",
    info: {
      url: "https://www.sciencenewsforstudents.org/wp-content/uploads/2020/03/1030_oceanwaves-1028x579.png",
      title: "Summer of 2019",
      txt: "Surfing in Hawaii!!!",
    },
  },
];

function query() {
  let notes = storageService.loadFromStorage(STORAGE_KEY);
  if (!notes) {
    notes = _createNotes();
    storageService.saveToStorage(STORAGE_KEY, gNotes);
  }
  return Promise.resolve(notes);
}

function addNote(note) {
  let notes = storageService.loadFromStorage(STORAGE_KEY);
  if (!notes || !notes.length) notes = [];
  const idx = notes.findIndex((savedNote) => savedNote.id === note.id);
  if (idx !== -1) return Promise.resolve();
  notes = [note, ...notes];
  storageService.saveToStorage(STORAGE_KEY, notes);
  return Promise.resolve();
}

function deleteNote(noteId) {
  let notes = storageService.loadFromStorage(STORAGE_KEY);
  notes = notes.filter((note) => note.id !== noteId);
  storageService.saveToStorage(STORAGE_KEY, notes);
  return Promise.resolve();
}

function _createNotes() {
  const notes = storageService.loadFromStorage(STORAGE_KEY);
  if (!notes || !notes.length) {
    storageService.saveToStorage(STORAGE_KEY, gNotes);
  }
}
function pinNote(noteId) {
  let notes = storageService.loadFromStorage(STORAGE_KEY);
  const idx = notes.findIndex((note) => note.id === noteId);
  const noteToPin = notes[idx];
  notes.splice(idx, 1);
  notes.unshift(noteToPin);
  storageService.saveToStorage(STORAGE_KEY, notes);
  return Promise.resolve();

  // let notes = storageService.loadFromStorage(STORAGE_KEY) || []
  // let pinnedNotes = storageService.loadFromStorage(STORAGE_KEY_PINNED) || []
  // let note = getNoteById(noteId)
  // if(pinnedNotes){
  //   const pinnedIdx = pinnedNotes.findIndex((pinnedNote) => pinnedNote.id === noteId)
  //   console.log('noteid',pinnedIdx)
  //   pinnedNotes.push(note)
  //   if(pinnedIdx !== -1){
  //     unpinNote(note.id)
  //     return
  //   }
  // }else{
  //   storageService.saveToStorage(STORAGE_KEY_PINNED, pinnedNotes)
  //   notes.splice(pinnedIdx, 1);
  //   storageService.saveToStorage(STORAGE_KEY, notes);
  //   return

  // }
  
}
function getPinnedNotes(){
  const pinnedNotes =storageService.loadFromStorage(STORAGE_KEY_PINNED) ||[]
  return pinnedNotes
}


function unpinNote(noteId){
  let notes = storageService.loadFromStorage(STORAGE_KEY);
  let pinnedNotes = storageService.loadFromStorage(STORAGE_KEY_PINNED) ||[]

  let note = getNoteByIdPinned(noteId)
  if(pinnedNotes){
    const pinnedIdx = pinnedNotes.findIndex((pinnedNote) => pinnedNote.id === noteId)
    console.log('pinned idx',pinnedIdx)
    pinnedNotes.splice(pinnedIdx, 1)
    notes.push(note)
    console.log(notes)
  }
  storageService.saveToStorage(STORAGE_KEY_PINNED, pinnedNotes)
}
function loadImageFromInput(ev, onImageReady) {
  return new Promise((resolve) => {
    var reader = new FileReader();

    reader.onload = (event) => {
      var img = new Image();
      img.src = event.target.result;
      resolve(img.src);

    };
    reader.readAsDataURL(ev.target.files[0]);
  });
}

function editNote(note) {
  let notes = storageService.loadFromStorage(STORAGE_KEY);
  const idx = notes.findIndex((savedNote) => note.id === savedNote.id);
  notes.splice(idx, 1, note);
  storageService.saveToStorage(STORAGE_KEY, notes);
  return Promise.resolve();
}


function toggleTodo(note, todoIdx){
  let notes = storageService.loadFromStorage(STORAGE_KEY);
  const idx = notes.findIndex((savedNote) => note.id === savedNote.id);
  let noteToSave = notes[idx]
  noteToSave.info.todos[todoIdx].doneAt = noteToSave.info.todos[todoIdx].doneAt ? null : Date.now()
  notes.splice(idx, 1, noteToSave);
  storageService.saveToStorage(STORAGE_KEY, notes);
  return Promise.resolve();
}

function getNoteByIdPinned(noteId) {
  let notes = storageService.loadFromStorage(STORAGE_KEY_PINNED) || []
  console.log(notes)
  const currNote = notes.find(note => note.id === noteId)
  return currNote
}
function getNoteById(noteId) {
  let notes = storageService.loadFromStorage(STORAGE_KEY) || []
  console.log(notes)
  const currNote = notes.find(note => note.id === noteId)
  return currNote
}