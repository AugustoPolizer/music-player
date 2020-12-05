export type Music = {
  uri: string
  name: string
  duration: number
}

export type Pagination = {
  endCursor: string,
  hasNextPage: boolean,
  totalCount: number
}
