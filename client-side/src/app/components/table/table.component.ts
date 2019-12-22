import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


import { Profile } from './../../../customTypes/profile';
import { DbServiceService } from './../../services/db-service.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, OnChanges {
  @Input() searchData: Profile[] | any ;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dbService: DbServiceService) {}
  

  displayedColumns: string[] = ['_id', 'name', 'jobTitle', 'companyLocation', 'companyName', 'hqPhone', 'lastUpdated'];
  dataSource = new MatTableDataSource();
  inittalData: Profile[];
  resultsReturned: boolean = true;

  ngOnChanges () {

    //checks if data was returned from the search - if not, shows the messege
    if(this.searchData && !this.searchData.length) {
      this.dataSource = new MatTableDataSource([])
      this.resultsReturned = false;
      return;
    }
    //checks if the user has returned to the inital state - so he can see the data
    //with out another fetch
    if (this.searchData && this.searchData === 'empty') {
      this.dataSource = new MatTableDataSource(this.inittalData)
      this.dataSource.sort = this.sort;
      this.resultsReturned = true;
      return;
    }

    //sets the data from the search
    if (this.searchData && this.searchData.length) {
      this.dataSource = new MatTableDataSource(this.searchData)
      this.dataSource.sort = this.sort;
      this.resultsReturned = true;

    }

  }

  ngOnInit() {
    this.getData()
  }

  getData():void {
    this.dbService.getData().subscribe(data => {
      this.inittalData = data;
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item: any, property) => {
        switch (property) {
            case 'lastUpdated':
                return new Date(item.lastUpdated).getTime()

            default:
                return item[property]
        }
      }
      
    })
  }

}

