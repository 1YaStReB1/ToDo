import { create } from 'zustand'

import { generateId } from './helpers';
import { devtools } from 'zustand/middleware';

interface Task {
  id: string;
  title: string;
  createdAt: number;
}

interface ToDoStore {
  tasks: Task[],
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>()(devtools((set, get) =>({
  tasks: [
    
  ],
  createTask: (title: string) =>{
    const {tasks} = get();
    const newTask = {
        id: generateId(),
        title,
        createdAt: Date.now()
    }
    
   
    set({
      tasks: [newTask].concat(tasks)
    })

  },
  updateTask: (id: string, title: string) =>{
      const {tasks} = get();

      set({
        tasks: tasks.map((task) =>({
        ...task, title: task.id === id ? title: task.title
        }))
      })

  },
  removeTask: (id: String) =>{
    const {tasks} = get();

    set({
      tasks: tasks.filter((task) =>task.id !== id 
      )})
  },
})))