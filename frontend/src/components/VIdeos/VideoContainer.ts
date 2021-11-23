import styled from 'styled-components'

export const VideoContainer = styled.section`
  width: 97%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  margin: 1rem auto;
  flex-wrap: wrap;
  gap: 1rem;
  /* max-width: 500px; */
  @media screen and (max-width:635px) {
    width: 100%;
  }
`