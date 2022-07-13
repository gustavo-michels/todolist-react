import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps {
  isDone?: boolean;
  id: string;
  content: string;
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Task({isDone = false, id, content, onCompleteTask, onDeleteTask}:TaskProps) {
  function handleCompleteTask() {
    onCompleteTask(id)
  }

  function handleDeleteTask() {
    onDeleteTask(id)
  }

  return (
    <li className={styles.task}>
      <button 
        className={isDone ? styles.checked : ''}
        onClick={handleCompleteTask}
      >
          {isDone ? <CheckCircle size={20} /> : <Circle size={20}/>}
      </button>
      <p className={isDone ? styles.done : ''}>{content}</p>
      <button onClick={handleDeleteTask}><Trash size={20}/></button>  
    </li>
  )
}