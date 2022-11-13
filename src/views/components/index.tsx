import React, { useEffect, useState, useCallback } from "react";
import styles from './index.module.scss';

import { useToDostore } from "../../data/stores/useToDoStore";

interface InputPlusProps {
    onAdd: (title: string) => void;

}


export const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {

    const [inputvalue, setInputValue] = useState('')


    const addTask = useCallback(() => {
        onAdd(inputvalue)
        setInputValue('')
    }, [inputvalue])


    return (
        <div className={styles.inputPlus}>
            <input type='text'
                className={styles.inputPlusValue}
                value={inputvalue}
                onChange={(ev) => setInputValue(ev.target.value)}
                onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                        addTask()
                    }
                }}
                placeholder="Введи тасочку"
            />
            <button
                onClick={() => { addTask() }}
                aria-label={'Add '}
                className={styles.inputPlusButton}

            />
        </div>
    )
};