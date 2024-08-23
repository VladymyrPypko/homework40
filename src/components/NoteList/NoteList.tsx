import React, { Component } from 'react';
import styles from './NoteList.module.css';

class NoteList extends Component {
    #title = '';

    constructor(props) {
        super(props);
        this.title = props.title;
    }

    get title() {
        return `***${this.#title}***`;
    }

    set title(title) {
        this.#title = title?.replace(/[0-9\s]/g, '');
    }

    render() {
        return (
            <div className={styles.notesContainer}>
                <h2>{this.title}</h2>
                <ul className={styles.notesList}>
                    {React.Children.map(this.props.children, (child, index) => (<li key={index}>{child}</li>))}
                </ul>
            </div>
        );
    }
}

export default NoteList;
