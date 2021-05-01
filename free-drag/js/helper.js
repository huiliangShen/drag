// hepler
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