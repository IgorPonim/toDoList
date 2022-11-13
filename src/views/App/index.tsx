import React, { useEffect } from "react";
import styles from './index.module.scss';
import { InputPlus } from "../../views/components/index";
import { useToDostore } from "../../data/stores/useToDoStore";
import InputTask from "../components/inputTask";

const App: React.FC = () => {
    const [task, createTask, updateTask, removeTask] = useToDostore(state => [state.tasks, state.createTask, state.updateTask, state.removeTask,])



    console.log(task)
    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do List</h1>
            <section className={styles.articleSection}>
                <InputPlus
                    onAdd={(title) => {
                        if (title) {
                            createTask(title)
                        }
                    }}
                />

            </section>
            <section className={styles.articleSection}>
                {!task.length && <p className={styles.articleText}>there is no tasks</p>}
                {task.map((task) => { return <InputTask title={task.title} id={task.id} onDone={removeTask} onRemoved={removeTask} key={task.id} /> })}
            </section>
        </ article >
    );
}

export default App;