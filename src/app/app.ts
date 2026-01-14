import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadBar } from './components/head-bar/head-bar';
import { SearchBar } from './components/search-bar/search-bar';
import { BookList } from './components/book-list/book-list';
import { BookDetails } from "./components/book-details/book-details";
import { Book } from './interfaces/book';
import { BookService } from './services/book-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeadBar, SearchBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('open-library-app');
  booksList: Book[] = [];
  filteredBooks: Book[] = [];
  selectedBook?: Book;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      this.booksList = data.works || [];
      this.filteredBooks = this.booksList;
    });
  }

  onTitleSearch(title: string) {
    if (!title) return (this.filteredBooks = this.booksList);
    this.filteredBooks = this.booksList.filter(book =>
      book.title?.toLowerCase().includes(title.toLowerCase())
    );
  }

  onYearSearch(year: number) {
    if (!year) return (this.filteredBooks = this.booksList);
    this.filteredBooks = this.booksList.filter(
      book => book.first_publish_year === year
    );
  }

  selectBook(book: Book) {
    this.selectedBook = book;
    // Scroll down to details
    setTimeout(() => {
      document.querySelector('.details-container')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }
}

