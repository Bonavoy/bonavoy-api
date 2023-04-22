import fs from 'fs'

export const readTemplate = (
  template: string,
  args: {
    [key: string]: any
  },
) => {
  const emailTemplate = fs.readFileSync(`src/mail/templates/${template}`, 'utf8')

  let emailTemplateString = emailTemplate
  for (const key in args) {
    emailTemplateString = emailTemplateString.replace(`{{${key}}}`, args[key])
  }

  return emailTemplateString
}
