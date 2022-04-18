import { IBook } from 'app/shared/model/book.model';
import { IPublisher } from 'app/shared/model/publisher.model';

export interface IAuthor {
  id?: number;
  name?: string;
  books?: IBook[] | null;
  publisher?: IPublisher | null;
}

export const defaultValue: Readonly<IAuthor> = {};
