/**
 * 自由移动实现代码
 */
// import {addListener, removeListener, strictBoundary} from './helper'

export function addListener(dom, event, cb) {
	if (!dom) return false
	dom.addEventListener(event, cb)
}

export function removeListener(dom, event, cb) {
	if (!dom) return false
	dom.removeEventListener(event, cb)
}

export function strictBoundary(value, min, max) {
    if (min && value < min) {
        return min
    }

    if (max && value > max) {
        return max
    }

    return value
}

const targetDom = {
	width: 100,
	height: 100,
	left: 0,
	top: 0
}
// 父层元素信息
const containerDom = {
	width: 0,
	height: 0,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0
}
// 最大可移动距离
const boundary = {
	minLeft: 0,
	minTop: 0,
	maxLeft: 0,
	maxTop: 0
}
// 拖动所需
const moveObj = {
	isMove: false,
	x: 0,
	y: 0,
  left: 0,
  top: 0
}

const onMouseDown = (e) => {
  const moveBox = document.getElementById("moveBox")
	const target = window.getComputedStyle(moveBox) || {}

	let left = (target.left && parseFloat(target.left)) || 0
	let top = (target.top && parseFloat(target.top)) || 0

	const { pageX, pageY } = e
	moveObj.isMove = true
	moveObj.x = pageX
	moveObj.y = pageY
  moveObj.left = left
  moveObj.top = top
	// console.log('down', moveObj.x, moveObj.y)
	addListener(document, "mousemove", onMouseMove)
	addListener(document, "mouseup", onMouseUp)
}

const onMouseMove = (e) => {
	if (!moveObj.isMove) return false
	const { pageX, pageY } = e
	

	const deltaX = pageX - moveObj.x
	const deltaY = pageY - moveObj.y

  let left = moveObj.left + deltaX
  let top = moveObj.top + deltaY
	// left += deltaX
	if (left < boundary.minLeft) {
    left = boundary.minLeft
	} else if (left > boundary.maxLeft) {
    left = boundary.maxLeft
  }

	// top += deltaY
  if (top < boundary.minTop) {
    top = boundary.minTop
  } else if (top > boundary.maxTop) {
    top = boundary.maxTop
  }

	moveBox.style.left = `${left}px`
	moveBox.style.top = `${top}px`
	// moveObj.x = pageX
	// moveObj.y = pageY
}

const onMouseUp = () => {
	if (moveObj.isMove) {
		moveObj.isMove = true
		moveObj.x = 0
		moveObj.y = 0

		removeListener(document, "mousemove", onMouseMove)
		removeListener(document, "mouseup", onMouseUp)
	}
}

function init() {
	// 获取移动元素的相关信息
	initDomData()
	// 初始化移动事件
	initMouseEvent()
}

function initDomData() {
	const moveBox = document.getElementById("moveBox")
	const moveArea = document.getElementById("moveArea")

	const target = moveBox.getBoundingClientRect() || {}
	const container = moveArea.getBoundingClientRect() || {}
	// 获取元素大小
	targetDom.width = target.width || 100
	targetDom.height = target.height || 100

	// 获取父元素大小和在屏幕的绝对位置
	containerDom.width = container.width || 100
	containerDom.height = container.height || 100
	containerDom.left = container.left || 0
	containerDom.top = container.top || 0
	containerDom.right = container.right || 0
	containerDom.bottom = container.bottom || 0

	// 获取和设置拖动边界值
	boundary.maxLeft = Math.floor(containerDom.width - targetDom.width)
	boundary.maxTop = Math.floor(containerDom.height - targetDom.height)
}

function initMouseEvent() {
	addListener(moveBox, "mousedown", onMouseDown)
}

function removeMouseEvent() {
	removeListener(moveBox, "mousedown", onMouseDown)
}

window.onload = () => {
	console.log(111)
	init()
}

window.unload = () => {
	removeMouseEvent()
}
