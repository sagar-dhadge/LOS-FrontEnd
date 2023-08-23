import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DataService, Lead } from '../data.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditRowComponent } from '../edit-row/edit-row.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() dataRows: Lead[] = [];
  @Input() dataColumns: any = {};
  @Input() selectedTable: number;
  // isSaved = false;

  constructor(
    private modalService: NzModalService,
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    private message: NzMessageService
  ) {}
  rowData: any;

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataColumns, event.previousIndex, event.currentIndex);
  }

  onEditRow(row: any) {
    const modal = this.modalService.create({
      nzContent: EditRowComponent,
      nzStyle: { width: '45%' },
      nzData: {
        InputData: { row: row, selectedTable: this.selectedTable },
      },
      nzFooter: null,
    });

    modal.afterClose.subscribe((result: any) => {
      if (this.selectedTable === 1) {
        const newData = this.dataService.getRowdata1();
        this.dataRows = newData;
      } else {
        const newData = this.dataService.getRowdata2();
        this.dataRows = newData;
      }
      // this.isSaved = true;
      // console.log(this.dataRows);
    });
  }

  onDelete(index: number) {
    console.log(index);

    if (this.selectedTable === 1) {
      this.dataService.deleteRow1(index);
      this.dataRows = this.dataService.getRowdata1();

      // this.cdr.detectChanges();
    } else {
      this.dataService.deleteRow2(index);
      this.dataRows = this.dataService.getRowdata2();

      this.cdr.detectChanges();
    }
    this.message.create('error', `Row deleted successfully`);
  }

  onMarkForReview(row: any) {
    row.leadMarkedForReview = true;
    this.message.create('warning', `Row marked successfully`);

    // console.log(row);
  }
}
