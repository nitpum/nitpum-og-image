import fs from 'fs'
import path from 'path'

export default function getFont(fontName: string) {
	const font = fs.readFileSync(path.join(__dirname, '../../fonts/', `${fontName}.ttf`))

	return font.toString('base64')
}
