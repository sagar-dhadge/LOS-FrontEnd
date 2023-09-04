import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Store } from '@ngrx/store';
import * as LeadActions from '../store/lead.action';

@Component({
  selector: 'app-edit-row',
  templateUrl: './edit-row.component.html',
  styleUrls: ['./edit-row.component.css'],
})
export class EditRowComponent implements OnInit {
  editForm: FormGroup;
  rowIndex: number;

  rowData: any;
  dataColumns = this.data.InputData.columnData;

  constructor(
    private dataService: DataService,
    @Inject(NZ_MODAL_DATA) public data: any,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.rowData = this.data.InputData.rowData;
    this.initForm();
  }

  private initForm() {
    this.rowIndex = this.rowData.indexOf(this.data.InputData.row);
    let row = this.rowData[this.rowIndex];

    if (this.data.InputData.selectedTable === 1) {
      this.editForm = new FormGroup({
        leadId: new FormControl(row.leadId, Validators.required),
        leadFirstName: new FormControl(row.leadFirstName, Validators.required),
        leadMiddleName: new FormControl(
          row.leadMiddleName,
          Validators.required
        ),
        leadLastName: new FormControl(row.leadLastName, Validators.required),

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
        leadAssignedTo: new FormControl(
          row.leadAssignedTo,
          Validators.required
        ),
        leadCreatedBy: new FormControl(row.leadCreatedBy, Validators.required),
        leadCreatedDate: new FormControl(
          row.leadCreatedDate,
          Validators.required
        ),
        leadUpdatedBy: new FormControl(row.leadUpdatedBy),
        leadUpdatedDate: new FormControl(row.leadUpdatedDate),
        leadStatus: new FormControl(row.leadStatus, Validators.required),
      });
    } else if (
      this.data.InputData.selectedTable === 2 ||
      this.data.InputData.selectedTable === 3
    ) {
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
        leadAssignedTo: new FormControl(
          row.leadAssignedTo,
          Validators.required
        ),
        leadCreatedBy: new FormControl(row.leadCreatedBy, Validators.required),
        leadCreatedDate: new FormControl(
          row.leadCreatedDate,
          Validators.required
        ),
        leadStatus: new FormControl(row.leadStatus, Validators.required),
      });
    }
  }

  handleSave(): void {
    this.rowIndex = this.rowData.indexOf(this.data.InputData.row);

    if (this.data.InputData.selectedTable === 1) {
      this.dataService
        .updateData1(this.editForm.value.leadId, this.editForm.value)
        .subscribe();
    } else if (
      this.data.InputData.selectedTable === 2 ||
      this.data.InputData.selectedTable === 3
    ) {
      // this.dataService.updateData2(this.rowIndex, this.editForm.value);
      this.store.dispatch(
        new LeadActions.UpdateData({
          index: this.rowIndex,
          updatedRow: this.editForm.value,
        })
      );
    }

    this.modalRef.close();

    this.message.create('success', 'Data saved successfully');
  }

  handleCancel() {
    this.modalRef.close();
  }
}
