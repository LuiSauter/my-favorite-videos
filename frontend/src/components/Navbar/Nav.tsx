import React from 'react'
import { Link, useRoute } from 'wouter'
import NavBar from './Navbar'

export default function Navbar(): JSX.Element {
  const [match] = useRoute('/new-video')
  return (
    <NavBar>
      <header>
        <Link to='/'>My Favorite Videos</Link>
      </header>
      <ul>
        {
          !match && <li>
            <Link to='/new-video'>Create new video</Link>
          </li>
        }
      </ul>
    </NavBar>
  )
}
