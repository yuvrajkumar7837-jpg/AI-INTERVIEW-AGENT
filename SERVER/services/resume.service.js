import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { chatCompletionJson } from './openRouter.service.js'

export async function extractPdfText(buffer) {
  const pdf = await getDocument({ data: new Uint8Array(buffer) }).promise
  const pages = []
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber)
    const content = await page.getTextContent()
    pages.push(content.items.map((item) => item.str).join(' '))
  }
  return pages.join('\n').trim()
}

export async function extractResumeData(text) {
  const { json } = await chatCompletionJson({
    messages: [
      { role: 'system', content: 'Extract resume data as strict JSON. Never invent information. Use [] for absent lists and null for an absent name.' },
      { role: 'user', content: `Resume text:\n${text}\n\nReturn keys: name, education, skills, experience, projects, internships, technologies, certifications.` },
    ],
  })
  const list = (value) => Array.isArray(value) ? value.filter((item) => typeof item === 'string') : []
  return {
    name: typeof json.name === 'string' ? json.name : null,
    education: list(json.education), skills: list(json.skills), experience: list(json.experience),
    projects: list(json.projects), internships: list(json.internships),
    technologies: list(json.technologies), certifications: list(json.certifications),
  }
}
