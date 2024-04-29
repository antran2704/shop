interface Banner {
    _id: string;
    title: string;
    meta_title: string;
    image: string;
    path: string | null;
    isPublic: boolean;
    createdAt?: string;
    updateAt?: string;
}

export type { Banner };
