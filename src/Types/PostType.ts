import { CategoryType } from "./CategoryType"
import { UserType } from "./UserType"

export type PostType = {
    id: string,
    title: string,
    content: string,
    published: boolean,
    authorId: string,
    author: Array<UserType>,
    categories: Array<{
        postId: string,
        categoryId: string,
        category: CategoryType
    }>,
    createdAt: string,
    updatedAt: string,
    isRemoved: boolean
}