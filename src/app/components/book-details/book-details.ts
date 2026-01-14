import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book-service';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails {
  bookId!: string;
  book!: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id')!;

    this.bookService.getBookById(this.bookId).subscribe(data => {
      this.book = data;
    });
  }
}
