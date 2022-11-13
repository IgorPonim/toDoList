import React, { useEffect, useState, useCallback } from "react";
import styles from './index.module.scss';



interface InputTaskProps {
    id: string;
    title: string;
    onDone: (id: string) => void;
    onRemoved: (id: string) => void;
}


const InputTask: React.FC<InputTaskProps> = ({ id, title, onDone, onRemoved }) => {

    const [checked, setChecked] = useState(false)

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input type='checkbox'
                    checked={checked}
                    className={styles.inputTaskCheckbox}
                    onChange={(ev) => {
                        setChecked(ev.target.checked)
                        if (ev.target.checked === true) { onDone(id) }
                    }}



                />
                <h3 className={styles.inputTaskTitle}>{title}</h3>
            </label>
            <button
                aria-label="Edit"
                className={styles.inputTaskEdit}
                onClick={() => { }}
            />
            <button
                aria-label="Remove"
                className={styles.inputTaskRemove}
                onClick={() => {
                    onRemoved(id)

                }}
            />
        </div>
    )
};

export default InputTask