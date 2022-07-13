import { v4 as uuidv4 } from 'uuid'

import { PlusCircle } from 'phosphor-react'
import { Header } from './components/Header'

import clipboardImg from './assets/clipboard.svg'
import './global.css'
import styles from './App.module.css'
import { Task } from './components/Task'
import { ChangeEvent, FormEvent, useState } from 'react'

interface TaskItemProps {
  id: string;
  isDone: boolean;
  content: string;
}

export function App() {

  const [todoList, setTodoList] = useState<TaskItemProps[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [counterDone, setCounterDone] = useState(0)

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value)
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    let newTask = {
      id: uuidv4(),
      isDone: false,
      content: newTaskText
    }

    setTodoList([...todoList, newTask])
    setNewTaskText('')
  }

  function completeTask(id: string) {
    let newTodoList = todoList.map(task => {
      if (task.id === id) {
        task.isDone = !task.isDone
        return task
      } else {
        return task
      }
    })
    setCounterDone(
      newTodoList.filter(task => {
        return task.isDone
      }).length
    )
    setTodoList(newTodoList)
  }

  function deleteTask(id: string) {
    let newTodoList = todoList.filter(task => {
      return task.id !== id
    })
    setTodoList(newTodoList)
  }

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <form className={styles.todoForm} onSubmit={handleCreateNewTask}>
            <input type="text" onChange={handleNewTaskChange} value={newTaskText} placeholder='Adicione uma nova tarefa' />
            <button type="submit">Criar <PlusCircle size={20} /> </button>
          </form>
        </div>

        <div className={styles.headerList}>
          <p>Tarefas criadas<span>{todoList.length}</span></p>
          <p>Concluídas<span>{counterDone} de {todoList.length}</span></p>
        </div>
        
        <div className={styles.listTodo}>
          { todoList.length > 0 
            ?
            <ul>
              { todoList.map(task => {
                return <Task 
                  key={task.id} 
                  id={task.id}
                  isDone={task.isDone}
                  content={task.content} 
                  onCompleteTask={completeTask} 
                  onDeleteTask={deleteTask} 
                />
              }) }
            </ul>
            :
            <div className={styles.messageNoTask}>
              <img src={clipboardImg} alt="Clipboard Icon" />
              <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div> 
          }
        </div>
      </main>
    </div>
  )
}
