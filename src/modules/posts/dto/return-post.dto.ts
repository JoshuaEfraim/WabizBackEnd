export class ReturnPostDto {
    id: number;
    title: string;
    body: string;
    contentID: number;
    category: number;
    tags?: string[];
    language: string;
}
