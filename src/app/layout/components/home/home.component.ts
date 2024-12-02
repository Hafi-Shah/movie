import { Component } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { GetMoviesBySearchResDTO } from '../../../core/models/response/get-movies-by-search-res-dto';
import { HttpParams } from '@angular/common/http';

import { api_key } from '../../../core/constant/api-key';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    // Fade-in and translate animation
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100px)' }), // Start off-screen to the top
        animate(
          '500ms 200ms',
          style({ opacity: 1, transform: 'translateY(0)' })
        ), // Fade-in and move to original position
      ]),
    ]),

    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100px)' }), // Start off-screen to the top
        animate(
          '500ms 200ms',
          style({ opacity: 1, transform: 'translateY(-100)' })
        ), // Fade-in and move to original position
      ]),
    ]),

    // Scale-in animation
    trigger('drop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }), // Start smaller
        animate('500ms 300ms', style({ opacity: 1, transform: 'scale(1)' })), // Scale up to original size
      ]),
    ]),
  ],
})
export class HomeComponent {
  search_text: string = '';
  movie_link: string = 'https://www.imdb.com/title/';
  movie_data: GetMoviesBySearchResDTO[] | null = null;
  data_loaded: boolean = false;

  constructor(private http: HttpService) {}

  on_search() {
    if (this.search_text.length > 0) {
      this.http
        .get<{ Search: GetMoviesBySearchResDTO[] }>(
          '',
          new HttpParams()
            .set(api_key.url_key, api_key.url_key_value)
            .set(api_key.search_key, this.search_text)
        )
        .subscribe({
          next: (res: any) => {
            if (Array.isArray(res.Search)) {
              this.movie_data = this.limitData(res.Search); // Limit the data using the new method
              console.log(this.movie_data);
              this.data_loaded = true;
              this.search_text = '';
            } else {
              console.warn('Search is not an array:', res.Search);
            }
          },
          error: (err: any) => {
            console.warn('data not retrieved:', err);
          },
          complete: () => {
            console.log('successful');
          },
        });
    } else {
      alert('please enter movie name');
    }
  }

  // limit the data to the first 3 items
  limitData(data: GetMoviesBySearchResDTO[]): GetMoviesBySearchResDTO[] {
    return data.slice(0, 3);
  }
}
