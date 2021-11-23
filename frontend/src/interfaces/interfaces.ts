export interface Video {
  updatedAt?: string | Date
  createdAt?: string | Date
  _id?: string
  url: string
  title: string
  description: string
}

export interface VideoState {
  videos: Video[]
  loading: boolean
}