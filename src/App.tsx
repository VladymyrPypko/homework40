import { useRef } from 'react';
import NoteList from './components/NoteList/NoteList';
import NoteItem from './components/NoteItem/NoteItem';
import styles from './App.module.css';
import { addNote, resetNotes, useAppDispatch, useAppSelector } from './store';


const App = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const notes = useAppSelector(state => state.notes.notes);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if(inputRef.current) {
      const noteContent = inputRef.current.value.trim();
      if(noteContent) {
        const newNote = {
          id: Date.now(),
          content: noteContent,
        };
        dispatch(addNote(newNote));
        inputRef.current.value = '';
      }
    }

  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder='Введите текст'
          ref={inputRef}
        />
        <button className={styles.btnSubmit}>Добавить</button>
      </form>

      {notes.length ? (
        <>
          <NoteList title="Заметки: 123">
            {notes.map((note) => (
              <NoteItem key={note.id} note={note.content}></NoteItem>
            ))}
          </NoteList>
          <button className={styles.btnReset} onClick={() => dispatch(resetNotes())}>Очистить заметки</button>
        </>
      ) : (
        <p className={styles.emptyList}>Список пуст</p>
      )}
    </div>
  );
};

export default App;