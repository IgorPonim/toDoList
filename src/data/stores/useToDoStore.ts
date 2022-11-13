import create from "zustand";
import { generateId } from '../helpers'
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

export const useToDostore = create<ToDoStore>((set, get) => ({
    tasks: [],
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
            tasks: tasks.filter((task) => {
                task.id !== id
            })
        })

    },
}));