import React, { useCallback, useEffect, useRef } from 'react'
import { state, useSelector } from '@lib/state'
import { styled } from 'stitches.config'
import { motion, TapInfo } from 'framer-motion'
import Content from './ui/content'

const Artboard = () => {
  useEffect(() => {
    const data = localStorage.getItem(`svg_al_data`)

    if (data !== null) {
      state.send('LOADED', JSON.parse(data))
    }
  }, [])

  const handlePointerDown = useCallback((e: PointerEvent) => {
    state.send('MOUSE_DOWN', e)
    // console.log(e)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (state.isIn('selecting')) return
    state.send('MOUSE_MOVE', e)
  }, [])

  return (
    <div>
      <button onClick={() => state.send('RESET')}>Reset</button>
      <MainDiv onTapStart={handlePointerDown} onPointerMove={handlePointerMove}>
        <SVG>
          <Content />
        </SVG>
      </MainDiv>
    </div>
  )
}

export default Artboard

const MainDiv = styled(motion.div, {
  fontFamily: 'JetBrains Mono',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: '$white',
})

const SVG = styled('svg', {
  width: '100%',
  height: '100%',
  backgroundColor: '$white',
  position: 'fixed',
})
