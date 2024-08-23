import styles from './NoteItem.module.css'

const NoteItem = ({ note }) => {
  return (
    <div className={styles.item}>
      <p>{note}</p>
    </div>
  );
}

export default NoteItem;