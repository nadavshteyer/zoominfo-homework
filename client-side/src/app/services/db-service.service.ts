import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { Profile } from './../../customTypes/profile';



@Injectable({
  providedIn: 'root'
})


export class DbServiceService {

  constructor( private http: HttpClient ) { }

  private apiUrl: string = `/data`

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);  
      return of(result as T);
    };
  }

  getData (): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Profile[]>('getData', []))
      );
  }

  searchData(term: string): Observable<Profile[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Profile[]>(`${this.apiUrl}?searchTerm=${term}`).pipe(
        catchError(this.handleError<Profile[]>('searchData', []))
      );
  }
}
