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
            <input type='ckeckbox'
                checked={checked}
                className={styles.inputTaskCheckbox}
                onChange={(ev) => {
                    setChecked(ev.target.checked)
                    if (ev.target.checked === true) { onDone(id) }
                }}



            />

            {title}</div>
    )
};

export default InputTask