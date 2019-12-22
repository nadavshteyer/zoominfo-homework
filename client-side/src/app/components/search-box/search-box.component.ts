import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, subscribeOn } from 'rxjs/operators';

import { DbServiceService } from './../../services/db-service.service';
import { Profile } from './../../../customTypes/profile';



@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Output() searchData: EventEmitter<any> = new EventEmitter();
  
  // profiles$: Observable<Profile[]>;
  // private searchTerms = new Subject<string>();

  constructor(private dvService: DbServiceService) { }

  ngOnInit() {
    //At the begging i made the searced each time the user added a new key, later changed it to search when 
    // this.profiles$ = this.searchTerms.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap( (term: string) => this.dvService.searchData(term).toPromise().then((data):any=>this.searchData.emit(data))),      
    // )
  }

  search (term: string):any  {
    this.dvService.searchData(term).subscribe(data => this.searchData.emit(data));
    // this.searchTerms.next(term)
  }

  isEmpty (term: string) {
    //Resets data if search string is empty
    if (!term.length) this.searchData.emit('empty')
  }

}


