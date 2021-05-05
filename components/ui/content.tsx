import React from 'react'
import { state, useSelector } from '@lib/state'
import Anchor from './anchor'
import TempPath from './TempPath'

const Content = () => {
  const anchorIds = useSelector((s) => s.data.anchorIds)
  const tempPath = useSelector((s) => s.data.tempPath)

  return (
    <g>
      {anchorIds.map((id) => (
        <Anchor key={id} id={id} />
      ))}
      {tempPath.length == 2 ? <TempPath tempPath={tempPath} /> : null}
    </g>
  )
}

export default Content
