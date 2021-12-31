// original code from: https://stackoverflow.com/a/21682946/6298186
export default function stringToColor(str: string) {
	var hash = 0

	for (var i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash)
		hash = hash & hash
	}

	const shortend = hash % 360

	return `hsl(${shortend}, 40%, 40%)`
}
