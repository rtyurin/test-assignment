export interface IUser {
  id: string
  name: string
  icon: string
}

export interface IMessage {
  id: number
  message: string
  createdTimestamp: number
  author: IUser
}
