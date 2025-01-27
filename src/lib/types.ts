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

export type Post = {
  id: string;
 user: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: Comment[];
};
export type Comment = {
  _id: string;
  ownerId: string;
  parentId: string;
  content: string;
  tags: Array<string>;
};

export type UseCommentsParams = {
  id?: string;
} ;

export type Question = {
  question_id: string;
  owner_id: string;
  content: string;
  tags: Array<string>;
};
