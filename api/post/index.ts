import path from 'path'
import sharp from 'sharp'

import { VercelRequest, VercelResponse } from '@vercel/node'
import generateTemplate from '../../utils/generateTemplate'
import getBrowser from '../../utils/getBrowser'
import parseQuery from '../../utils/parseQuery'
import getPage from '../../utils/getPage'

export default async function (req: VercelRequest, res: VercelResponse) {
	const templatePath = path.join(__dirname, '_template.html')
	const parsedQuery = parseQuery(req.query)
	const { width, height, type } = parsedQuery
	const html = generateTemplate(templatePath, req.query as Record<string, string>)

	const browser = await getBrowser()
	const page = await getPage(browser)

	await page.setContent(html)
	await page.setViewportSize({
		width: 2048,
		height: 848,
	})

	let image = await page.screenshot({ type })

	if (width || height) {
		image = await sharp(image)
			.resize({
				width,
				height,
				fit: 'cover',
			})
			.toBuffer()
	}

	res.statusCode = 200
	// res.setHeader(
	// 	'Cache-Control',
	// 	`public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
	// )
	res.setHeader('Content-type', `image/${type}`)
	res.send(image)
}
