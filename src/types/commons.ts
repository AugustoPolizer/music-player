
export type Music = {
  index : number
  uri: string
  name: string
  duration: number
}

export type Pagination = {
  endCursor: string,
  hasNextPage: boolean,
  totalCount: number
}
