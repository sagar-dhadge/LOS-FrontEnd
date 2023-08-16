import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent {
  clickedItem: number = -1;
  first = 'Lead Table 1';
  second = 'Lead Table 2';
  isCollapsed = true;
  isSelected = false;

  constructor(private dataService: DataService) {}

  dataRows = this.dataService.getRowdata1();
  dataColumns = this.dataService.data1.data.columns;

  dataRows2 = this.dataService.getRowdata2();
  dataColumns2 = this.dataService.data2.data.columns;

  showData(clickedItem: number) {
    this.isSelected = true;
    this.clickedItem = clickedItem;
  }
}
