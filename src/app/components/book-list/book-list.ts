import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book-service';
import { Book } from '../../interfaces/book';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, SearchBar],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css'],
})
export class BookList implements OnInit {
  booksList: Book[] = [];      
  filteredBooks: Book[] = [];   

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      this.booksList = data.works || [];
      this.filteredBooks = this.booksList;
    });
  }

  goToDetails(id: string | undefined) {
    if (!id) return;
    this.router.navigate(['/book', id]);
  }

  onTitleSearch(title: string) {
    // Protect against undefined
    if (!title) {
      this.filteredBooks = this.booksList;
      return;
    }

    this.filteredBooks = this.booksList.filter(book =>
      book.title?.toLowerCase().includes(title.toLowerCase())
    );
  }

  onYearSearch(year: number) {
    if (!year) {
      this.filteredBooks = this.booksList;
      return;
    }

    this.filteredBooks = this.booksList.filter(
      book => book.first_publish_year === year
    );
  }
}
