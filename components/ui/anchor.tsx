import React from 'react'
import { useSelector } from '@lib/state'

type Props = {
  id: string
}

const Anchor = ({ id }: Props) => {
  const anchor = useSelector((s) => s.data.anchors[id])

  return (
    <rect
      x={anchor.x}
      y={anchor.y}
      width="5"
      height="5"
      fill="rgba(0, 245, 196, 1)"
    />
  )
}

export default Anchor
