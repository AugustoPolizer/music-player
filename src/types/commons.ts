
export type Music = {
  index : number
  uri: string
  name: string
  album : any
  duration: number
}

export type Pagination = {
  endCursor: string,
  hasNextPage: boolean,
  totalCount: number
}
