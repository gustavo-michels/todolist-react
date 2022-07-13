import styles from './Header.module.css'

import logoTodo from '../assets/logo-todo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logoTodo} alt="Logotipo do ToDo" />
    </header>
  )
}