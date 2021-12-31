import { VercelRequestQuery } from '@vercel/node'

const IMAGE_TYPE = ['jpeg', 'png'] as const

export default function parseQuery(query: VercelRequestQuery) {
	const parsedQuery = {
		width: query.width ? +query.width : undefined,
		height: query.height ? +query.height : undefined,
		type: IMAGE_TYPE.includes(query.type as any) ? (query.type as string) : 'jpeg',
	}

	return parsedQuery
}
