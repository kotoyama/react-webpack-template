import React from 'react'

import { Counter } from '~/features/counter'
import logo from '~/shared/ui/icons/logo.svg'

import styles from './Home.module.css'

export const HomePage = () => (
  <main className={styles.page}>
    <section className={styles.hero}>
      <img src={logo} className={styles.logo} alt="logo" />
      <Counter />
      <p>
        Edit <code>src/app.tsx</code> and save to reload.
      </p>
      <a
        className={styles.link}
        href="https://effector.now.sh/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Effector
      </a>
    </section>
  </main>
)
