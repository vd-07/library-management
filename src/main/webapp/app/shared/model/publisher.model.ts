import { IBook } from 'app/shared/model/book.model';
import { IAuthor } from 'app/shared/model/author.model';

export interface IPublisher {
  id?: number;
  name?: string;
  books?: IBook[] | null;
  authors?: IAuthor[] | null;
}

export const defaultValue: Readonly<IPublisher> = {};
