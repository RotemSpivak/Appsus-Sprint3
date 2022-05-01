import { notesService } from "../services/note.service.js";
import { NoteList } from "../cmps/note-list.jsx";
import { NotesDetails } from "./note-details.jsx";

export class NotesApp extends React.Component {
  state = {
    notes: [],
    emailSentFrom: "",
    emailBody: "",
    mailSubject: "",
  };

  componentDidMount() {
    let emailData = new URLSearchParams(this.props.location.search);
    let emailSentFrom = emailData.get("mailFrom");
    let emailBody = emailData.get("emailBody");
    let mailSubject = emailData.get("mailSubject");
    this.setState({ emailSentFrom, mailSubject, emailBody }, () => {
      this.loadNotes();
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      if (!this.props.searchTerm) {
        notesService.query().then((notes) => {
          this.setState({ notes });
          return;
        });
      }
      const regex = new RegExp(this.props.searchTerm, "ig");
      const filteredNotes = this.state.notes.filter((note) => {
        if (note.info.title) {
          const matchTitle = !!note.info.title.match(regex);
          if (matchTitle) return matchTitle;
        }
        if (note.info.txt) {
          return !!note.info.txt.match(regex);
        }
        if (note.type === "note-todos") {
          return note.info.todos.reduce((acc, todo) => {
            if (!!todo.txt.match(regex)) acc = true;
            return acc;
          }, false);
        }
      });
      this.setState({ notes: filteredNotes });
    }
  }

  onToggleTodo = () => {
    this.loadNotes();
  };
  loadNotes = () => {
    notesService.query(this.state.notes).then((notes) => {
      this.setState({ notes });
    });
  };

  onAddNote = (note) => {
      notesService.addNote().then(() => {
          this.loadNotes();
      })
  };
  onPinNote = () => {
    this.loadNotes();
  };
  onDeleteNote = () => {
    this.loadNotes();
  };

  onNoteUpdated = () => {
    this.loadNotes();
  };

  render() {
    const notes = this.state.notes;
    const { emailBody, emailSentFrom, emailSubject } = this.state;

    return (
      <div key="note" className="notes-app">
        <NotesDetails
          onAddNote={this.onAddNote}
          emailData={{ emailBody, emailSentFrom, emailSubject }}
        />
        <NoteList
          onToggleTodo={this.onToggleTodo}
          onPinNote={this.onPinNote}
          notes={notes}
          onDeleteNote={this.onDeleteNote}
          onNoteUpdated={this.onNoteUpdated}
        />
      </div>
    );
  }
}
