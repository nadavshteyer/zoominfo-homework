import { Profile } from './../customTypes/profile';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchData: Profile[];
  searchDataEvent(e) {
    this.searchData = e;
  }
}
