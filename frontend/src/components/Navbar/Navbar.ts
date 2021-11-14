import styled from 'styled-components'

const NavBar = styled.nav`
  position: sticky;
  top: 0;
  background-color: #fff;
  will-change: scroll-position;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .7rem  1rem;
  margin-bottom: 1rem;
  height: 54px;
  a {
    /* color: #0099ff; */
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
