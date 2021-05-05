import React from 'react'

type TempPathProps = {
  tempPath: string[]
}

const TempPath = ({ tempPath }: TempPathProps) => {
  const pathStr = ['M', tempPath[0], 'L', tempPath[1]].join(' ')

  // console.log(pathStr)

  return (
    <path
      d={pathStr}
      fill="none"
      stroke="rgba(0, 245, 196, 1)"
      strokeWidth="1"
    />
  )
}

export default TempPath
