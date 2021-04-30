/**
 * 自由移动实现代码
 */
// hepler
function addListener(dom, event, cb) {
  if (!dom) return false
  dom.addEventListener(event, cb)
}

function removeListener(dom, event, cb) {
  if (!dom) return false
  dom.removeEventListener(event, cb)
}
// end helper

const targetDom = {
  width: 100,
  height: 100,
  left: 0,
  top: 0,
}
const containerDom = {
  width: 0,
  height: 0,
}
const maxMove = {
  width: 0,
  height: 0,
}

const moveObj = {
  isMove: false,
  x: 0,
  y: 0,
}

const onMouseDown = (e) => {
  const { pageX, pageY } = e
  moveObj.isMove = true
  moveObj.x = pageX
  moveObj.y = pageY
  // console.log('down', moveObj.x, moveObj.y)
  addListener(document, 'mousemove', onMouseMove)
  addListener(document, 'mouseup', onMouseUp)
}
const onMouseMove = (e) => {
  if (!moveObj.isMove) return false
  const { pageX, pageY } = e
  const moveBox = document.getElementById('moveBox')
  const target = window.getComputedStyle(moveBox) || {}

  let left = (target.left && parseFloat(target.left)) || 0
  let top = (target.top && parseFloat(target.top)) || 0

  const deltaX = pageX - moveObj.x
  const deltaY = pageY - moveObj.y

  left += deltaX
  top += deltaY

  moveBox.style.left = `${left}px`
  moveBox.style.top = `${top}px`
  moveObj.x = pageX
  moveObj.y = pageY
}
const onMouseUp = (e) => {
  if (moveObj.isMove) {
    moveObj.isMove = true
    moveObj.x = 0
    moveObj.y = 0

    removeListener(document, 'mousemove', onMouseMove)
    removeListener(document, 'mouseup', onMouseUp)
  }
}

function init() {
  initDomData()
  initMouseEvent()
}

function initDomData() {
  const moveBox = document.getElementById('moveBox')
  const moveArea = document.getElementById('moveArea')

  const target = window.getComputedStyle(moveBox) || {}
  const container = window.getComputedStyle(moveArea) || {}
  // 获取元素大小
  targetDom.width = (target.width && parseFloat(target.width)) || 100
  targetDom.height = (target.height && parseFloat(target.height)) || 100
  // 获取父元素大小
  containerDom.width = (container.width && parseFloat(container.width)) || 100
  containerDom.height = (container.height && parseFloat(container.height)) || 100
}

function initMouseEvent() {
  addListener(moveBox, 'mousedown', onMouseDown)
}

function removeMouseEvent() {
  removeListener(moveBox, 'mousedown', onMouseDown)
}

window.onload = () => {
  console.log(111)
  init()
}

window.unload = () => {
  removeMouseEvent()
}
