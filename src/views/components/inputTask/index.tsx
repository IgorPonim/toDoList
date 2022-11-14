import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from './index.module.scss';



interface InputTaskProps {
    id: string;
    title: string;
    onDone: (id: string) => void;
    onRemoved: (id: string) => void;
    onEdited: <T>(id: string, title: string) => void;
}


const InputTask: React.FC<InputTaskProps> = ({ id, title, onDone, onRemoved, onEdited }) => {

    const [checked, setChecked] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(title)


    // хук для установления ссылки 
    const editTitleInputRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
        if (editMode) {
            editTitleInputRef?.current?.focus()
        }
    }, [editMode])

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input type='checkbox'
                    checked={checked}
                    className={styles.inputTaskCheckbox}
                    onChange={(ev) => {
                        setChecked(ev.target.checked)
                        if (ev.target.checked === true) {
                            setTimeout(() => {
                                onDone(id)
                            }, 300);
                        }
                    }}

                />

                {editMode ? (
                    <input
                        ref={editTitleInputRef}
                        value={value}
                        onChange={(ev) => setValue(ev.target.value)}
                        className={styles.InputTaskTitleEdit}
                        onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                onEdited(id, value)
                                setEditMode(false)
                            }
                        }}
                    />
                ) : <h3 className={styles.inputTaskTitle}>{title}</h3>
                }

            </label>

            {editMode ? (
                <button
                    aria-label="Save"
                    className={styles.inputTaskSave}
                    onClick={() => {
                        onEdited(id, value)
                        setEditMode(false)
                    }}
                />
            ) : (<button
                aria-label="Edit"
                className={styles.inputTaskEdit}
                onClick={() => { setEditMode(true) }}
            />)}
            {!editMode && < button
                aria-label="Remove"
                className={styles.inputTaskRemove}
                onClick={() => {
                    if (confirm('Уверены?'))
                        onRemoved(id)

                }} />}

        </div>
    )
};

export default InputTask