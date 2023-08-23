import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent implements OnInit {
  clickedItem: number = -1;
  first = 'Lead Table 1';
  second = 'Lead Table 2';
  isCollapsed = true;
  isSelected = false;
  data: any;
  dataRows: any;
  dataColumns: any;

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.firstData();
  }

  firstData() {
    this.dataService.getData().subscribe((response) => {
      // console.log(response);

      this.data = response;
      // console.log(this.data.data);

      this.dataRows = this.data.data.rows;
      this.dataColumns = this.data.data.columns;
    });
  }

  dataRows2 = this.dataService.getRowdata2();
  dataColumns2 = this.dataService.data2.data.columns;

  showData(clickedItem: number) {
    this.isSelected = true;
    this.clickedItem = clickedItem;
  }
}
