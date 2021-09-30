import { useState, memo, useEffect } from 'react'
import styled from 'styled-components'


const Button = styled.button`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 80px;
  right: 40px;
  z-index: 999;
`


function ScrollButton() {
  const [visible, setVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    window.removeEventListener('scroll', toggleVisible)
  }

  const toggleVisible = () => {
    window.pageYOffset > window.innerHeight ? setVisible(true) : setVisible(false)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener('scroll', toggleVisible)
    }
  }, [])
   
  

  return (
    <Button 
      className={`btn btn-info shadow ${visible ? 'visible' : 'invisible'}`}
      onClick={scrollToTop}
      disabled={!visible}
    >
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-up" className="svg-inline--fa fa-chevron-up fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="currentColor" d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path>
      </svg>
    </Button>
  )
}


export default memo(ScrollButton)