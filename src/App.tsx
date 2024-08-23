import { useEffect, useRef, useState } from 'react';
import NoteList from './components/NoteList/NoteList';
import NoteItem from './components/NoteItem/NoteItem';
import styles from './App.module.css';

const App = () => {
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes');

        return savedNotes ? JSON.parse(savedNotes) : [];
    });

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newNote = inputRef.current.value.trim();
        if (newNote.length) {
            setNotes((prev) => [...prev, newNote]);
            inputRef.current.value = ''; // text field reset
        }
    };

    const deleteNote = (index) => {
        setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
    };

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/1`);
                if(!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const userData = await response.json();
                setUser(userData);
            } catch(error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [])


    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                className={styles.input}
                type="text"
                name="noteInput"
                placeholder="Введите текст"
                ref={inputRef}
                />
                <button className={styles.btnSubmit} type="submit">Добавить</button>
            </form>

            {loading ? (
                <p className={styles.userLoading}>Загрузка...</p>
            ) : error ? (
                <p className={styles.userError}>Что-то пошло не так</p>
            ) : (
                user && <p className={styles.userName}>Привет, {user.name}!</p>
            )}

            {notes.length === 0 ? (
                <p>Заметок нет</p>
            ) : (
                <NoteList title='Note list 123'>
                    {notes.map((note, index) => (
                        <NoteItem key={index} note={note} index={index} deleteNote={deleteNote} />
                    ))}
                </NoteList>
            )}
        </div>
    );
};

export default App;