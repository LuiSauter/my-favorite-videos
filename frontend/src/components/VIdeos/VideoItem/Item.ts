import styled from 'styled-components'

const Item = styled.article`
  /* background-color: #aaaaaa; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 .4rem 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: .2rem;
  &:hover {
    background-color: #0099ff3f;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
  }

  p {
    margin-bottom: .3rem;
  }

  time {
    color: #555;
    font-size: .8rem;
    margin: .3rem 0;
  }
  h3, p, time {
    padding: 0 .5rem;
  }
  figure {
    margin-bottom: .5rem;
    width: 100%;
    img {
      width: 100%;
      object-fit: cover;
      cursor: pointer;
    }
  }

  @media screen and (max-width:635px) {
    width: 100%;
  }

`
export default Item