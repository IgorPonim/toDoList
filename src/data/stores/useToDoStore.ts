import create, { State, StateCreator } from "zustand";
import { generateId } from '../helpers'
import { devtools } from 'zustand/middleware'
//используем zustand образец для подражания
// const useBearStore = create((set) => ({
//     bears: 0,
//     increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//     removeAllBears: () => set({ bears: 0 }),
//   }))

interface Task {
    id: string;
    title: string;
    createdAt: number;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}
//миддлвара для локалсторадж 

//это функция = хелпер
function isTodoStore(object: any): object is ToDoStore {
    return object.tasks //нужно проверить есть ли в локасторадж чтото, поэтому опишем функцию
}

const localstorage = <T extends State>(config: StateCreator<T>): StateCreator<T> => (set, get, api) =>
    config((nextState, ...args) => {
        if (isTodoStore(nextState)) {
            window.localStorage.setItem('tasks', JSON.stringify(nextState.tasks))
        }
        set(nextState, ...args)
    }, get, api

    );


//загружаем из локалсторадж сохраненные задачи
const geCcurrentState = () => {
    try {
        const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]'))
        return currentState
    }
    catch (err) { console.log(err) }
    return []
}


export const useToDostore = create<ToDoStore>(localstorage(devtools((set, get) => ({
    tasks: geCcurrentState(),
    //описываем создание задания
    createTask: (title) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title: title,
            createdAt: Date.now()
        }
        //метод добавления тасочки
        set({
            tasks: [newTask].concat(tasks)
        })
    },

    //метод обновления тасочки
    updateTask: (id: string, title: string) => {
        const { tasks } = get()
        set({
            tasks: tasks.map((task) => ({///обновляем тасочки через мап, возвращаем новый обьект
                ...task,
                title: task.id === id ? title : task.title
            })
            )
        })
    },
    removeTask: (id: string) => {
        const { tasks } = get()
        set({
            tasks: tasks.filter((task) =>
                task.id !== id
            )
        })

    },
}))));