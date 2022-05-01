import { NoteEdit } from "./note-edit.jsx"
import { NotePreview } from "./note-preview.jsx"
import { utilService } from "../../../services/util.service.js"
import { notesService } from "../services/note.service.js";
import { storageService } from "../../../services/storage.service.js";

export class NoteList extends React.Component {
    state = {
        noteToEdit: {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: false,
            backgroundColor: '',
            info: {
                txt: '',
                url: '',
                title: '',
                label: '',
                todos: []       
            },
        },
        isEditShown: false
    }
    
    onEditNote = (note) => {
        this.setState({isEditShown: true, noteToEdit: note})       
    }

    onNoteUpdated = () => {
        this.props.onNoteUpdated()
    }
    
    onCloseModal = () => {
        this.setState({isEditShown: false, noteToEdit:  {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: false,
            backgroundColor: '',
            info: {
                txt: '',
                url: '',
                title: '',
                label: '',
                todos: []       
            },
        },
        isEditShown: false
        })
    }
    render() {
        console.log('hello')
        const pinnedNotes = notesService.getPinnedNotes()
        console.log(pinnedNotes)
        const {notes, onDeleteNote, onPinNote, onToggleTodo} = this.props

        return <section className="notes-list">
            <section className="pinned-notes-list">
                 {pinnedNotes.map(note=> <NotePreview onToggleTodo={onToggleTodo} onPinNote={onPinNote} note={note} key={note.id}  onDeleteNote={onDeleteNote} onEditNote={this.onEditNote}/>)}
             </section>
            <NoteEdit onCloseModal={this.onCloseModal} note={this.state.noteToEdit} isShown={this.state.isEditShown} onNoteUpdated={this.onNoteUpdated}/> 
            {notes.map(note=> <NotePreview onToggleTodo={onToggleTodo} onPinNote={onPinNote} note={note} key={note.id}  onDeleteNote={onDeleteNote} onEditNote={this.onEditNote}/>)}
        </section>
    } 
}