import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit-row',
  templateUrl: './edit-row.component.html',
  styleUrls: ['./edit-row.component.css'],
})
export class EditRowComponent implements OnInit {
  editForm: FormGroup;
  rowIndex: number;

  constructor(
    private dataService: DataService,
    @Inject(NZ_MODAL_DATA) public data: any,
    private modalRef: NzModalRef,
    private message: NzMessageService
  ) {}

  dataColumns = this.dataService.data1.data.columns;

  rowData: any;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    if (this.data.InputData.selectedTable === 1) {
      this.rowData = this.dataService.data1.data.rows;
    } else {
      this.rowData = this.dataService.data2.data.rows;
    }

    this.rowIndex = this.rowData.indexOf(this.data.InputData.row);

    let row = this.rowData[this.rowIndex];

    this.editForm = new FormGroup({
      leadId: new FormControl(row.leadId, Validators.required),
      leadFullName: new FormControl(row.leadFullName, Validators.required),
      leadContactNumber: new FormControl(
        row.leadContactNumber,
        Validators.required
      ),
      leadEmail: new FormControl(row.leadEmail, Validators.required),
      leadLoanType: new FormControl(row.leadLoanType, Validators.required),
      leadProductType: new FormControl(
        row.leadProductType,
        Validators.required
      ),
      leadAssignedTo: new FormControl(row.leadAssignedTo, Validators.required),
      leadCreatedBy: new FormControl(row.leadCreatedBy, Validators.required),
      leadCreatedDate: new FormControl(
        row.leadCreatedDate,
        Validators.required
      ),
      leadStatus: new FormControl(row.leadStatus, Validators.required),
    });
  }

  handleSave(type: string): void {
    this.rowIndex = this.rowData.indexOf(this.data.InputData.row);

    if (this.data.InputData.selectedTable === 1) {
      this.dataService.updateData1(this.rowIndex, this.editForm.value);
    } else {
      this.dataService.updateData2(this.rowIndex, this.editForm.value);
    }

    this.modalRef.close();
    this.message.create(type, 'Data saved successfully');
  }

  handleCancel() {
    this.modalRef.close();
  }
}
