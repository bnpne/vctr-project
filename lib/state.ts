import { createState, createSelectorHook } from '@state-designer/react'
import { createAnchor, createShape, save } from '@lib/utils'

type DataProps = {
  anchorIds: string[]
  anchors: any
  shapes: any
  shapeIds: string[]
  tempPath: string[] // This line will only happen when the user makes a new point
}

const initialData: DataProps = {
  anchorIds: [],
  anchors: {},
  shapes: {},
  shapeIds: [],
  tempPath: [],
}

export const state = createState({
  data: initialData,
  on: {
    LOADED: 'loadData',
    RESET: { do: 'resetData', to: 'selecting' },
  },
  initial: 'selecting',
  states: {
    selecting: {
      on: {
        MOUSE_DOWN: { to: 'creatingShape' },
      },
    },
    creatingShape: {
      onEnter: ['createNewAnchor', 'createShape'],
      on: {
        MOUSE_MOVE: 'createTempPath',
        MOUSE_DOWN: 'createShapeAnchor',
      },
    },
  },
  actions: {
    loadData(d, p) {
      Object.assign(d, p)
    },
    resetData(d) {
      Object.assign(d, initialData)
    },
    createNewAnchor(d, p) {
      const anchor = createAnchor(p.clientX, p.clientY)

      // add new anchor to array of anchors
      d.anchorIds.push(anchor.id)
      d.anchors[anchor.id] = anchor

      // initialize temp path
      d.tempPath.length = 0
      const coor = [p.clientX, p.clientY].join(' ')
      d.tempPath.push(coor)
    },
    createShapeAnchor(d, p) {
      const anchor = createAnchor(p.clientX, p.clientY)

      // add new anchor to array of anchors
      d.anchorIds.push(anchor.id)
      d.anchors[anchor.id] = anchor

      // Add new anchor to latest shape anchor array
      d.shapes[d.shapeIds[d.shapeIds.length - 1]].shapeAnchors.push(anchor.id)

      // initialize temp path
      d.tempPath.length = 0
      const coor = [p.clientX, p.clientY].join(' ')
      d.tempPath.push(coor)
    },
    createShape(d) {
      // create new shape when use presses down on a blank canvas or if not editing
      const newShape = createShape(d)

      d.shapeIds.push(newShape.id)
      d.shapes[newShape.id] = newShape
    },
    createTempPath(d, p) {
      if (d.tempPath.length > 1) d.tempPath.pop()

      const coor = [p.clientX, p.clientY].join(' ')

      d.tempPath.push(coor)
    },
  },
})

export const useSelector = createSelectorHook(state)

const data = localStorage.getItem(`svg_al_data`)

if (data !== null) {
  state.send('LOADED', JSON.parse(data))
}

state.onUpdate((d) => {
  localStorage.setItem(`svg_al_data`, JSON.stringify(d.data))
})
