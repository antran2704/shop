import { IUserInfor } from "../user";

type AuthorBlog = Pick<IUserInfor, "_id" | "name">;
type TagBlog = {
    tag: {
      _id: string;
      title: string;
      slug: string;
    };
    slug: string;
  };

interface IBlog {
    _id: string;
    author: AuthorBlog | null;
    title: string;
    description: string;
    meta_title?: string;
    meta_description?: string;
    content: string;
    thumbnail: string;
    slug: string;
    tags: TagBlog[];
    public: boolean;
    updatedAt?: string;
}

type IHomeBlog = Omit<IBlog, "content">;

interface IFilterBlog {
    search: string | null;
    tag: string | null;
    page: number;
    limit: number;
}

export type { IBlog, AuthorBlog, TagBlog, IHomeBlog, IFilterBlog };
