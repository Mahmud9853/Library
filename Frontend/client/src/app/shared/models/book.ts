import { Author } from "./author";
import { Category } from "./category";
import { Type } from "./type";

export interface PaginatedResponse<T> {
    Book: any[];
    totalRecords: number;
  }
  
export interface Book {
    id: number;
    title: string;
    description: string;
    createBook: string;
    photo: string;
    document: string;
    typeId: number | null;
    bookType?: any;
    authorId: number | null;
    bookAuthor?: any;
    categoryId: number | null;
    bookCategory?: any;
    courseId: number | null;
    bookCourse?: any;
}








