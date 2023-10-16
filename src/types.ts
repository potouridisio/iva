export type Message = {
  content: string
  role: 'assistant' | 'system' | 'user'
}

type Education = {
  degreeName: string
  endMonthYear: string
  fieldOfStudyName: string
  schoolName: string
  startMonthYear: string
}

type Position = {
  companyName: string
  description: string
  endMonthYear: string
  startMonthYear: string
  title: string
}

type Skill = {
  name: string
}

export type Profile = {
  educations: Education[]
  firstName: string
  headline: string
  lastName: string
  positions: Position[]
  skills: Skill[]
  summary: string
}
