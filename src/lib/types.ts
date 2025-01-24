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
export type Lawyer = {
  id: number
  first_name: string
  last_name: string
  created_at: string
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

// GET comments endpoint

export type Comment = {
  _id: string;
  Username: string;
  Comment: string;
  createdAt: string;
  updatedAt: string;
};

 
export type UseCommentsParams = {
  id?: string;
} ;


