import React from 'react'
import { Link, useRoute } from 'wouter'
import NavBar from './Navbar'

export default function Navbar(): JSX.Element {
  const [match] = useRoute('/new-video')
  return (
    <NavBar>
      <header>
        <Link to='/'>Mis Videos Favoritos</Link>
      </header>
      <ul>
        {
          !match && <li>
            <Link to='/new-video'>Crear</Link>
          </li>
        }
      </ul>
    </NavBar>
  )
}
