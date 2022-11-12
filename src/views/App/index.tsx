import React, { useEffect } from "react";
import styles from './index.module.scss';

import { useToDostore } from "../../data/stores/useToDoStore";

const App: React.FC = () => {
    const [
        task, createTask, updateTask, removeTask
    ] =

        useToDostore(state => [
            state.tasks,
            state.createTask,
            state.updateTask,
            state.removeTask,
        ])




    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do List</h1>
            <section className={styles.articleSection}>


            </section>
            <section className={styles.articleSection}>


            </section>
        </ article >
    );
}

export default App;