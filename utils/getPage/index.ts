let page

export default async function getPage(browser: any) {
	if (page) {
		return page
	}

	page = await browser.newPage()

	return page
}
