import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private subjectUrl = 'https://openlibrary.org/subjects/computers.json';
  private workUrl = 'https://openlibrary.org/works';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<{ works: Book[] }> {
  return this.http.get<{ works: Book[] }>(this.subjectUrl);
}

getBookById(id: string): Observable<Book> {
  return this.http.get<Book>(`${this.workUrl}/${id}.json`);
}

  searchByTitle(title: string): Observable<any> {
    return this.http.get<any>(
      `https://openlibrary.org/search.json?title=${title}`
    );
  }

  searchByYear(year: number): Observable<any> {
    return this.http.get<any>(
      `https://openlibrary.org/search.json?first_publish_year=${year}`
    );
  }
}
