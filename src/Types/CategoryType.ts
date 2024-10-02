import { PostType } from "./PostType"

export type CategoryType = {
    id: string,
    name: string,
    posts: Array<{
        postId: string,
        categoryId: string,
        post: PostType
    }>,
    createdAt: string,
    updatedAt: string,
    isRemoved: boolean
}