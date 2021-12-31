export default function templateVariable(html: string, variables: Record<string, string>) {
	Object.keys(variables).forEach((key) => {
		html = html.replace(new RegExp(`{{ ${key} }}`), variables[key])
	})

  return html
}
