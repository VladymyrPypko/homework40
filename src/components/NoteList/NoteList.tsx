import React, { Component, ReactNode } from 'react';
import styles from './NoteList.module.css';

interface NoteListProps {
  title: string
  children: ReactNode
}

class NoteList extends Component<NoteListProps>{
    #title = '';

    constructor(props: NoteListProps) {
        super(props);
        this.title = props.title;
    }

    get title() {
        return `***${this.#title}***`;
    }

    set title(title: string) {
        this.#title = title?.replace(/[0-9\s]/g, '');
    }

    render() {
        return (
            <div className={styles.notesContainer}>
                <h2 className={styles.title}>{this.title}</h2>
                <ul className={styles.notesList}>
                    {React.Children.map(this.props.children, (child, index) => (<li key={index}>{child}</li>))}
                </ul>
            </div>
        );
    }
}

export default NoteList;
