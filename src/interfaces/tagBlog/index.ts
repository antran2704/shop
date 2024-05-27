interface ITagBlog {
    _id: string;
    title: string;
    thumbnail: string;
    slug: string;
    public: boolean;
    updatedAt?: string;
}

export type { ITagBlog };
