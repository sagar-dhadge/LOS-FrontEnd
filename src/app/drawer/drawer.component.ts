import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Store } from '@ngrx/store';
import { appState } from '../store/appstate';
import * as LeadActions from '../store/lead.action';

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
  dataRows2: any;
  dataColumns2: any;
  constructor(
    private dataService: DataService,
    private store: Store<appState>,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.firstData();
    this.dataService.getRowdata2();
    if (localStorage.key(0)) {
      const editedData = JSON.parse(localStorage.getItem('dataEdited') || '{}');
      this.store.dispatch(
        new LeadActions.Set({
          dataColumns: editedData.dataColumns,
          dataRows: editedData.dataRows,
        })
      );
      this.dataColumns2 = editedData.dataColumns;
      this.dataRows2 = editedData.dataRows;
      this.cdr.detectChanges();
    } else {
      this.store.select('lead').subscribe((resState) => {
        this.dataColumns2 = resState.dataColumns;
        this.dataRows2 = resState.dataRows;
      });
      this.cdr.detectChanges();
    }
  }
  firstData() {
    this.dataService.getData().subscribe((response) => {
      this.data = response;

      this.dataRows = this.data.data.rows;
      this.dataColumns = this.data.data.columns;
    });
  }

  showData(clickedItem: number) {
    this.isSelected = true;
    this.clickedItem = clickedItem;
  }
}
