import { state, useSelector } from '@lib/state'
import React from 'react'

export const createAnchor = (x: number, y: number) => {
  const id = 'anchor_' + Math.random() * Date.now()

  return { id, x, y }
}

export const createShape = (data: any) => {
  const id = 'shape_' + Math.random() * Date.now()
  const shapeAnchors: string[] = []
  const anchorIds: string[] = data.anchorIds

  // push latest anchor made because that is the first point in the shape
  shapeAnchors.push(data.anchorIds[anchorIds.length - 1])

  const pathStr: string = `M ${data.anchors[shapeAnchors[0]].x} ${
    data.anchors[shapeAnchors[0]].y
  }`

  return { id, shapeAnchors, pathStr }
}

export const save = (data: any) => {
  localStorage.setItem(`svg_al_data`, JSON.stringify(data))
}
