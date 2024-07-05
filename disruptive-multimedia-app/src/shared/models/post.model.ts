export interface Post{
    _id: string;
    title: string;
    content: string;
    content_type: string;
    credits: string;
    user?: string;
    category?: string;
    createdAt?: Date;    
    updatedAt?: Date;
}
