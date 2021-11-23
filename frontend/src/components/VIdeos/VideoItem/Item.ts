import styled from 'styled-components'

export const Item = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 0.4rem 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.2rem;
  position: relative;
  &:hover {
    background-color: #0099ff3f;
    button {
      transform: translateY(0%);
      transition: background 0.4s, border-radius 0.5s;
      &:hover {
        background-color: #f44;
        border-radius: 0 0 0 55%;
      }
    }
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
  }
  button {
    transition: transform .1s ease-in-out;
    transform: translateY(-100%);
    background-color: #f55f;
    color: #fff;
    backdrop-filter: blur(5px);
    border-radius: 0 0 0 70%;
    border: none;
    padding: 0.5rem 0.8rem;
    cursor: pointer;
    position: absolute;
    right: -1px;
  }
  p {
    margin-bottom: 0.3rem;
  }
  time {
    color: #555;
    font-size: 0.8rem;
    margin: 0.3rem 0;
  }
  h3,
  p,
  time {
    padding: 0 0.5rem;
  }
  figure {
    position: relative;
    margin-bottom: 0.5rem;
    width: 100%;
    img {
      width: 100%;
      object-fit: cover;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 635px) {
    width: 100%;
  }
`

export const ItemPlaceholder = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 0.4rem 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  gap: 0.8rem;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: placeholder-glow;
  &:hover {
    background-color: #0099ff3f;
  }
  figure {
    margin: 0;
    background-color: #222222;
    width: 100%;
    opacity: .5;
    min-height: 200px;
    border-radius: 0.2rem;
  }
  .item-1,
  .item-2 {
    border-radius: 0.2rem;
    background-color: #ccc;
    height: 0.9rem;
    width: 100%;
  }
  .item-1 {
    width: 70%;
  }

  /* div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
  }
  figure {
    margin-bottom: .5rem;
    width: 100%;
    img {
      width: 100%;
      object-fit: cover;
      cursor: pointer;
    }
  } */

  @media screen and (max-width: 635px) {
    width: 100%;
  }
`