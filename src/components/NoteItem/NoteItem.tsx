import { FC } from 'react';
import styles from './NoteItem.module.css'
import { Note } from '../../interfaces/Note.interface';

interface NoteItemProps {
  note: Note;
}

const NoteItem: FC<NoteItemProps> = ({ note }) => {
  return (
    <div className={styles.item}>
      <h3>{note.title}</h3>
      <p>{note.text}</p>
    </div>
  );
}

export default NoteItem;