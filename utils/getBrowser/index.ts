import chrome from 'chrome-aws-lambda'
import playwright from 'playwright-core'

let browser

export default async function getBrowser() {
	if (browser) return browser

	browser = await playwright.chromium.launch({
		args: [],
		executablePath: '/usr/bin/google-chrome',
		headless: true,
	})

	return browser
}
