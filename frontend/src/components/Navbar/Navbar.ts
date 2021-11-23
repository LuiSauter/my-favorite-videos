import styled from 'styled-components'

const NavBar = styled.nav`
  position: sticky;
  top: 0;
  background-color: #ffffffdd;
  backdrop-filter: blur(10px);
  will-change: scroll-position;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .7rem  1rem;
  margin-bottom: 1rem;
  height: 54px;
  z-index: 10;
  header a {
    color: #000000;
    border-bottom: 2px solid transparent;
    transition: border-bottom .2s linear;
    padding-bottom: 2px;
    &:hover {
      border-bottom: 2px solid #000;
    }
  }
  ul {
    display: flex;
    flex-direction: row;
    li {
      margin-left: 1rem;
      height: 100%;
      a {
        padding: .4rem .7rem;
        border: 1px solid #ccc;
        color: #000000;
        &:hover {
          background-color: #0099ff;
          color: #fff;
          border: 1px solid transparent;
        }
      }
    }
  }
`

export default NavBar
