import styled from 'styled-components'

const CardForm = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  justify-content: center;
  height: 100%;
  width: 80%;
  margin: 0 auto;
  figure {
    display: grid;
    place-content: center;
    place-items: center;
    img {
      width: 100%;
      min-height: 200px;
      max-height: 250px;
      user-select: none;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    width: 100%;
    label {
      margin-bottom: 1rem;
    }
    input, textarea, button {
      margin-top: .2rem;
      resize: none;
      display: block;
      width: 100%;
      border: 1px solid #ccc;
      outline: none;
      padding: 0.5rem;
      font-size: 1rem;
      border-radius: .2rem;
      &:focus {
        border: 1px solid #0099ff;
      }
    }
    span {
      color: #0099ff;
    }
    button {
      background-color: #0099ff;
      border: none;
      padding: 0.7rem 0;
      color: #fff;
      &:hover {
        background-color: #0099ffcc;
      }
      &:active {
        background-color: #0099ffdd;
      }
    }
    button[disabled] {
      pointer-events: none;
      opacity: .7;
      color: #000;
    }
  }

  @media screen and (max-width:535px) {
    width: 100%;
    figure {
      margin: 0 1.2rem;
    }
  }
`

export default CardForm
