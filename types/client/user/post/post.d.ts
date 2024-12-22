interface PostCommentsInterface {
    userId: number;
    username: string;
    comment: string;
    image: string;
}

interface PostInterface {
    id: number;
    name: string;
    likes: Array<number>;
    comments: Array<PostCommentsInterface>;
    caption: string;
    date: string;
    image: string;
}