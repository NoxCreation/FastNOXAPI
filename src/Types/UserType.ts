import { PostType } from "./PostType"

export type UserType = {
    id: string,
    username: string,
    password: string,
    email: string,
    name: string,
    posts: Array<PostType>,
    createdAt: string,
    updatedAt: string,
    isRemoved: boolean
}