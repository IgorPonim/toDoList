import React, { useEffect, useState } from "react";
import styles from './index.module.scss';

import { useToDostore } from "../../data/stores/useToDoStore";

interface InputPlusProps {
    onAdd: (title: string) => void;

}


export const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {

    const [inputvalue, setInputValue] = useState('')
    console.log(inputvalue)
    return (
        <div className={styles.inputPlus}>asdasdsa
            <input type='text'
                className={styles.inputPlusValue}
                value={inputvalue}
                onChange={(ev) => setInputValue(ev.target.value)}
                onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                        // onAdd()
                    }
                }}
            />
            <button
                onClick={() => { }}
                aria-label={styles.inputPlusButton}
                className={ }

            />
        </div>
    )
};