import { FC } from 'react';
import styles from './NoteItem.module.css'

interface NoteItemProps {
  note: string
}

const NoteItem: FC<NoteItemProps> = ({ note }) => {
  return (
    <div className={styles.item}>
      <p>{note}</p>
    </div>
  );
}

export default NoteItem;