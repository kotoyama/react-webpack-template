import React from 'react'

import { Counter } from '~/features/counter'
import logo from '~/ui/icons/logo.svg'

import './index.css'

export const Home: React.FC = () => (
  <main className="page page--home">
    <section className="hero">
      <img src={logo} className="hero__logo" alt="logo" />
      <Counter />
      <p>
        Edit <code>src/app.tsx</code> and save to reload.
      </p>
      <a
        className="hero__link"
        href="https://effector.now.sh/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Effector
      </a>
    </section>
  </main>
)
