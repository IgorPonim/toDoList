import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import { InputPlus } from "../../views/components/index";
import { useToDostore } from "../../data/stores/useToDoStore";
import InputTask from "../components/inputTask";

interface InstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const App: React.FC = () => {
    const [task, createTask, updateTask, removeTask] = useToDostore(state => [state.tasks, state.createTask, state.updateTask, state.removeTask,])
    const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null)
    const [isInstalled, setIsInstalled] = useState(false)

    useEffect(() => {
        const onInstallPrompt = (event: Event) => {
            event.preventDefault()
            setInstallPrompt(event as InstallPromptEvent)
        }
        const onInstalled = () => {
            setIsInstalled(true)
            setInstallPrompt(null)
        }
        const standalone = window.matchMedia('(display-mode: standalone)').matches
            || (navigator as Navigator & { standalone?: boolean }).standalone === true
        setIsInstalled(standalone)
        window.addEventListener('beforeinstallprompt', onInstallPrompt)
        window.addEventListener('appinstalled', onInstalled)
        return () => {
            window.removeEventListener('beforeinstallprompt', onInstallPrompt)
            window.removeEventListener('appinstalled', onInstalled)
        }
    }, [])

    const installApp = async () => {
        if (!installPrompt) return
        await installPrompt.prompt()
        const result = await installPrompt.userChoice
        if (result.outcome === 'accepted') setIsInstalled(true)
        setInstallPrompt(null)
    }

    return (
        <article className={styles.article}>
            {!isInstalled && <div className={styles.installBanner}>
                {installPrompt ? <>
                    <span>Добавьте список на главный экран — он будет работать без интернета.</span>
                    <button className={styles.installButton} onClick={installApp}>Установить приложение</button>
                </> : <span>Чтобы установить: откройте меню браузера и выберите «Добавить на главный экран».</span>}
            </div>}
            <h1 className={styles.articleTitle}>Список дел/покупок</h1>
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
                {!task.length && <p className={styles.articleText}>Больше нет задач..</p>}
                {task.map((task) => { return <InputTask title={task.title} id={task.id} onDone={removeTask} onRemoved={removeTask} key={task.id} onEdited={updateTask} /> })}
            </section>
        </ article >
    );
}

export default App;