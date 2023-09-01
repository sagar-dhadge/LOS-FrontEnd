import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DataService, Lead } from '../data.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditRowComponent } from '../edit-row/edit-row.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Store } from '@ngrx/store';
import { appState } from '../store/appstate';
import * as LeadActions from '../store/lead.action';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() dataRows: Lead[] = [];
  @Input() dataColumns: any = {};
  @Input() selectedTable: number;

  data: any;

  constructor(
    private modalService: NzModalService,
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    private message: NzMessageService,
    private store: Store<appState>
  ) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataColumns, event.previousIndex, event.currentIndex);
  }

  onEditRow(row: any) {
    const modal = this.modalService.create({
      nzContent: EditRowComponent,
      nzStyle: { width: '50%' },
      nzData: {
        InputData: {
          row: row,
          rowData: this.dataRows,
          columnData: this.dataColumns,
          selectedTable: this.selectedTable,
        },
      },

      nzFooter: null,
      nzClosable: false,
    });

    modal.afterClose.subscribe((result) => {
      if (this.selectedTable === 1) {
        this.dataService.getData().subscribe((res) => {
          this.data = res;
          this.dataRows = this.data.data.rows;
        });
        this.cdr.detectChanges();
      } else if (this.selectedTable === 2) {
        this.store.select('lead').subscribe((resState) => {
          this.dataRows = resState.dataRows;
        });
      }
    });
  }

  onDelete(row: any) {
    if (this.selectedTable === 1) {
      const id = row.leadId;
      console.log(id);

      this.dataService.deleteData(id).subscribe(() => {
        this.dataRows = this.dataRows.filter((item) => item.leadId !== id);
        this.cdr.detectChanges();
      });
    } else {
      const index = this.dataRows.indexOf(row);
      this.store.dispatch(new LeadActions.DeleteRow(index));

      this.cdr.detectChanges();
    }
    this.message.create('error', `Row deleted successfully`);
  }

  onMarkForReview(row: any) {
    if (this.selectedTable === 1) {
      row.leadMarkedForReview = true;
      this.dataService.markForReview(row.leadId, row);
      this.message.create('warning', `Row marked successfully`);
    } else {
      const rowIndex = this.dataRows.indexOf(row);
      const updatedRow = { ...row, leadMarkedForReview: true };
      this.store.dispatch(
        new LeadActions.MarkForReview({ index: rowIndex, row: updatedRow })
      );
      this.message.create('warning', `Row marked successfully`);
    }
  }
}
