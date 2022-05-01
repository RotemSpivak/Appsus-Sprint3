import { notesService } from "../services/note.service.js";

const { NavLink, withRouter } = ReactRouterDOM;
export function NotePreview({ note, onDeleteNote, onEditNote, onPinNote, onToggleTodo }) {

  const onDeleteNotePreview = (event) => {
    event.stopPropagation();
    notesService.deleteNote(note.id).then(() => {
      onDeleteNote();
    });
  };
  const onPinNotePreview = (event) => {
    event.stopPropagation();
    notesService.pinNote(note.id).then(() => {
      onPinNote();
    });
  };
 const onToggleTodoPreview = (event, todoIdx) => {
   event.stopPropagation()
    notesService.toggleTodo(note, todoIdx).then(() => {
      onToggleTodo();
    })
 }
  const selectNote = () => {
    onEditNote(note);
  };

  if (note.type === "note-txt") {
    return (
      <div
        onClick={selectNote}
        className="note"
        key={note.id}
        style={{ backgroundColor: note.backgroundColor }}
      >
        
        <div className="note-title">{note.info.title}</div>
        <div className="note-txt">{note.info.txt}</div>
        <div className="note-btn-container">
        <div className="thumbtack-btn-container">
          <button
            onClick={onPinNotePreview}
            style={{ backgroundColor: note.backgroundColor }}
          >
            <i
              style={{ backgroundColor: note.backgroundColor }}
              className="fa-solid fa-thumbtack"
            ></i>
          </button>
        </div>
          <div
            style={{ backgroundColor: note.backgroundColor }}
            onClick={(ev) => {
              ev.stopPropagation();
            }}
          >
            <NavLink
              to={`/maill/:?noteTitle=${note.info.txt}`}
              className="fa-solid fa-paper-plane"
            ></NavLink>
          </div>
          <button
            style={{ backgroundColor: note.backgroundColor }}
            onClick={onDeleteNotePreview}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    );
  }
  if (note.type === "note-img") {
    return (
      <div onClick={selectNote} className="note" key={note.id} style={{ backgroundColor: note.backgroundColor }}>
        <img className="note-preview-img" src={note.info.url} alt="" />
        <div className="note-title">{note.info.title}</div>
        <div className="note-txt">{note.info.txt}</div>
        <div className="note-btn-container">
        <div className="thumbtack-btn-container">
          <button style={{ backgroundColor: note.backgroundColor }} onClick={onPinNotePreview}>
            <i className="fa-solid fa-thumbtack" style={{ backgroundColor: note.backgroundColor }}></i>
          </button>
        </div>
          <div
            style={{ backgroundColor: note.backgroundColor }}
            onClick={(ev) => {
              ev.stopPropagation();
            }}
          >
            <NavLink
              to={`/mail/:?noteTitle=${note.info.txt}`}
              className="fa-solid fa-paper-plane"
            ></NavLink>
          </div>
          <button onClick={onDeleteNotePreview} style={{ backgroundColor: note.backgroundColor }}>
            <i className="fa-solid fa-trash" style={{ backgroundColor: note.backgroundColor }}></i>
          </button>
        </div>
      </div>
    );
  }
  if (note.type === "note-video") {
    return (
      <div
        onClick={selectNote}
        className="note"
        key={note.id}
        style={{ backgroundColor: note.backgroundColor }}
      >
        <iframe width="260" height="200" src={note.info.url}></iframe>
        <div className="note-title">{note.info.title}</div>
        <div className="note-btn-container">
        <div className="thumbtack-btn-container">
          <button style={{ backgroundColor: note.backgroundColor }} onClick={onPinNotePreview}>
            <i
              style={{ backgroundColor: note.backgroundColor }}
              className="fa-solid fa-thumbtack"
            ></i>
          </button>
        </div>
          <div
            style={{ backgroundColor: note.backgroundColor }}
            onClick={(ev) => {
              ev.stopPropagation();
            }}
          >
            <NavLink
              to={`/mail/:?noteTitle=${note.info.txt}`}
              className="fa-solid fa-paper-plane"
            ></NavLink>
          </div>
          <button
            onClick={onDeleteNotePreview}
            style={{ backgroundColor: note.backgroundColor }}
          >
            <i
              className="fa-solid fa-trash"
              style={{ backgroundColor: note.backgroundColor }}
            ></i>
          </button>
        </div>
      </div>
    );
  }
  if (note.type === "note-todos") {
    const todos = note.info.todos;
    return (
      <div onClick={selectNote} className="note" key={note.id} style={{ backgroundColor: note.backgroundColor }}>
        <div className="note-title">{note.info.title}</div>
        <ul >
        {todos.map((todo, todoIdx) => {
          return (
              <li key={todoIdx} onClick={(event) => onToggleTodoPreview(event, todoIdx)} className={`note-todo-txt ${todo.doneAt ? 'todo-done' : ''}`}>{todo.txt} </li>
          );
        })}
        </ul>
        <div className="note-btn-container" style={{ backgroundColor: note.backgroundColor }}>
        <div className="thumbtack-btn-container">
          <button style={{ backgroundColor: note.backgroundColor }} onClick={onPinNotePreview}>
            <i className="fa-solid fa-thumbtack" style={{ backgroundColor: note.backgroundColor }}></i>
          </button>
        </div>
          <div
            className="send-email-btn-container"
            style={{ backgroundColor: note.backgroundColor }}
            onClick={(ev) => {
              ev.stopPropagation();
            }}
          >
            <NavLink
              to={`/mail/:?noteTitle=${note.info.txt}`}
              className="fa-solid fa-paper-plane"
            ></NavLink>
          </div>
          <button onClick={onDeleteNotePreview} style={{ backgroundColor: note.backgroundColor }}>
            <i className="fa-solid fa-trash" style={{ backgroundColor: note.backgroundColor }}></i>
          </button>
        </div>
      </div>
    );
  }
}
