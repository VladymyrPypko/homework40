import styles from './NoteItem.module.css'

const NoteItem = ({ note, index, deleteNote }) => {
  return (
    <div className={styles.item}>
      <p className={styles.itemText}>{note}</p>
      <button className={styles.itemButton} onClick={() => deleteNote(index)}>
        <span/>
      </button>
    </div>
  );
}

export default NoteItem;