import { Component, Input } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Book } from '../../interfaces/book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  @Output() titleSearch = new EventEmitter<string>();
  @Output() yearSearch = new EventEmitter<number>();

  year: number | null = null;
  title: string = '';

  onTitleChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.titleSearch.emit(value);
  }
  onYearChange(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.yearSearch.emit(value);
  }

  onSearch() {
    this.titleSearch.emit(this.title);
    this.yearSearch.emit(this.year as number);
  }
}
