// response types from the api endpoints

export type PaginationParams = {
  page: number
  count: number
}

export type Pagination = {
  count: number
  items: number
  offset: number
  page: number
  prev: number | null
  next: number | null
  last: number
}

export type PaginatedResponse<T> = {
  items: T[]
  pagy: Pagination
}

// domain data

// GET /lawyers Pagic
export interface Lawyer {
  created_at: string
  employment: {
    current_employer_id: number
    current_employer_name: string
    employed_from: string | null
    employed_until: string | null
    office_id: number
  }
  first_name: string
  id: number
  last_name: string
  status: string | null
  tag_ids: number[]
  tags: {
    id: number
    name: string
  }[]
  updated_at: string
}

export type Employer = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export type JobPosting = {
  id: number
  title: string
  description: string
  status: string
  created_at: string
  updated_at: string
}

export type JobOffer = {
  id: number
  lawyer_id: number
  job_posting_id: number
  created_at: string
  updated_at: string
}

export type Post = {
  id: string
  user: string
  date: string
  title: string
  content: string
  tags: string[]
  likes: number
  comments: Comment[]
}

export type Comment = {
  _id?: string
  ownerId: string
  createdOn: string
  userName: string
  parentId: string
  content: string
  tags: Array<string>
  profilePicture: string
}

export type Question = {
  _id?: string
  QuestionId: string
  ownerId: string
  userName: string
  profilePicture: string
  createdOn: string
  content: string
  tags: Array<string>
}

export type Tag = {
  id: number
  name: string
  kind: string
  description: string
}

export type City = {
  id: number
  city: string
  province_id: string
  province_name: string
  timezone: string
  lat: number
  lng: number
}

export type Firm = {
  _id: string
  firm_name: string
  city: string
  province: string
}

export interface QuestionVote {
  _id: string
  questionId: string
  votes: Vote[]
  totalVotes?: number
}

export type Vote = {
  totalUps: number
  totalDowns: number
  userVoted: boolean
  voteDirection: 'up' | 'down'
}

export interface SuggestedQuestions {
  question1: string
  question2: string
  question3: string
}
