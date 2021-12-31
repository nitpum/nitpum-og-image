import fs from 'fs'
import getFont from '../getFont'
import stringToColor from '../stringToColor'
import templateVariable from '../templateVariable'
import geopattern from 'geopattern'

export default function generateTemplate(path: string, variables?: Record<string, string>) {
	let html = fs.readFileSync(path, { encoding: 'utf8' })

	const fontKanit = getFont('Kanit-Bold')

	const colorStart = variables.colorStart || stringToColor(variables.title)
	const colorEnd = variables.colorEnd || stringToColor(variables.title.split('').reverse().join(''))

	// var hash = 0

	// for (var i = 0; i < variables.title.length; i++) {
	// 	hash = variables.title.charCodeAt(i) + ((hash << 5) - hash)
	// 	hash = hash & hash
	// }

	// const shortend = hash % 360

	// const colorEnd = `hsl(${(shortend + 50) % 360}, 40%, 40%)`

	const pattern = geopattern.generate(variables.title).toDataUrl()

	html = templateVariable(html, { ...variables, colorStart, colorEnd, fontKanit })

	return html
}
