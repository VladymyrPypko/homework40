import NoteList from './components/NoteList/NoteList';
import NoteItem from './components/NoteItem/NoteItem';
import styles from './App.module.css';
import { addNote, resetNotes, useAppDispatch, useAppSelector } from './store';
import { useFormik } from 'formik';
import { noteValidationSchema } from './validationSchema';
import { Note } from './interfaces/Note.interface';


const App = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(state => state.notes.notes);

  const formik = useFormik({
    initialValues: { title: '', text: '' },
    validationSchema: noteValidationSchema,
    onSubmit: (values, { resetForm }) => {
      const newNote: Note = {
        id: Date.now(),
        title: values.title,
        text: values.text
      }
      dispatch(addNote(newNote));
      resetForm();
    }
  })

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div>
          <input
            className={styles.input}
            type="text"
            name='title'
            placeholder='Введите заголовок заметки'
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.title && formik.errors.title ? (
            <div className={styles.error}>{formik.errors.title}</div>
          ) : null}
        </div>

        <div>
          <textarea
            className={styles.input}
            name='text'
            placeholder='Введите текст заметки'
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.text && formik.errors.text ? (
            <div className={styles.error}>{formik.errors.text}</div>
          ) : null}
        </div>

        <button className={styles.btnSubmit} type='submit'>Добавить</button>
      </form>

      {notes.length ? (
        <>
          <NoteList title="Заметки: 123">
            {notes.map((note) => (
              <NoteItem key={note.id} note={note}></NoteItem>
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