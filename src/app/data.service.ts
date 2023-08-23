import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ApiLead {
  leadId: string;
  leadFirstName: string;
  leadMiddleName: string;
  leadLastName: string;
  leadFullName: string;
  leadContactNumber: string;
  leadEmail: string;
  leadLoanType: string;
  leadProductType: string;
  leadAssignedTo: string;
  leadCreatedBy: string;
  leadCreatedDate: string;
  leadUpdatedBy: string;
  leadUpdatedDate: string;
  leadStatus: string;
  leadMarkedForReview: boolean;
}
export interface Lead {
  leadId: string;
  leadFullName: string;
  leadContactNumber: string;
  leadEmail: string;
  leadLoanType: string;
  leadProductType: string;
  leadAssignedTo: string;
  leadCreatedBy: string;
  leadCreatedDate: string;
  leadStatus: string;
  leadMarkedForReview: boolean;
  [key: string]: string | boolean;
}

export interface Column {
  field: string;
  title: string;
  compare: any;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  rowDataChanged = new Subject<any>();
  data: any;

  // data1 = {
  //   total: 6,
  //   limit: 10,
  //   skip: 10,
  //   data: {
  //     columns: [
  //       {
  //         title: 'Id',
  //         field: 'leadId',
  //         compare: (a: Lead, b: Lead) => a.leadId.localeCompare(b.leadId),
  //       },
  //       {
  //         title: 'Assigned To',
  //         field: 'leadAssignedTo',
  //         compare: (a: Lead, b: Lead) =>
  //           a.leadAssignedTo.localeCompare(b.leadAssignedTo),
  //       },
  //       {
  //         title: 'Contact Number',
  //         field: 'leadContactNumber',
  //         compare: (a: Lead, b: Lead) =>
  //           a.leadContactNumber.localeCompare(b.leadContactNumber),
  //       },
  //       {
  //         title: 'Created By',
  //         field: 'leadCreatedBy',
  //         compare: (a: Lead, b: Lead) =>
  //           a.leadCreatedBy.localeCompare(b.leadCreatedBy),
  //       },
  //       {
  //         title: 'Created Date',
  //         field: 'leadCreatedDate',
  //         compare: (a: Lead, b: Lead) =>
  //           a.leadCreatedDate.localeCompare(b.leadCreatedDate),
  //       },
  //       {
  //         title: 'Email',
  //         field: 'leadEmail',
  //         compare: (a: Lead, b: Lead) => a.leadEmail.localeCompare(b.leadEmail),
  //       },
  //       {
  //         title: 'Full Name',
  //         field: 'leadFullName',
  //         compare: (a: Lead, b: Lead) =>
  //           a.leadFullName.localeCompare(b.leadFullName),
  //       },
  //       {
  //         title: 'Loan Type',
  //         field: 'leadLoanType',
  //         compare: (a: Lead, b: Lead) =>
  //           a.leadLoanType.localeCompare(b.leadLoanType),
  //       },
  //       {
  //         title: 'Product Type',
  //         field: 'leadProductType',
  //         compare: (a: Lead, b: Lead) =>
  //           a.leadProductType.localeCompare(b.leadProductType),
  //       },
  //       {
  //         title: 'Status',
  //         field: 'leadStatus',
  //         compare: (a: Lead, b: Lead) =>
  //           a.leadStatus.localeCompare(b.leadStatus),
  //       },
  //     ],
  //     rows: [
  //       {
  //         leadId: 'd0d3310e-5968-4431-bd6d-7a34e79d5cb1',
  //         leadFullName: 'Akshay kumar',
  //         leadContactNumber: '1111111111',
  //         leadEmail: 'akshay@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit P',
  //         leadCreatedBy: 'Amit P',
  //         leadCreatedDate: '2023-08-01',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: 'd5015191-b902-4f5a-af46-5b375e2b149b',
  //         leadFullName: 'Ashok kumar',
  //         leadContactNumber: '1234567890',
  //         leadEmail: 'ashok@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit p',
  //         leadCreatedBy: 'Amit p',
  //         leadCreatedDate: '2023-07-31',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: '225b6469-797a-499f-9e1f-6bc0094f6de2',
  //         leadFullName: 'Rahul Shinde',
  //         leadContactNumber: '2345165789',
  //         leadEmail: 'rahul@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit p',
  //         leadCreatedBy: 'Amit p',
  //         leadCreatedDate: '2023-07-31',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: true,
  //       },
  //       {
  //         leadId: 'dd063816-93c6-4458-9473-e8c546c8d007',
  //         leadFullName: 'Sumit Kumar',
  //         leadContactNumber: '2345165789',
  //         leadEmail: 'Sumit@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit p',
  //         leadCreatedBy: 'Amit p',
  //         leadCreatedDate: '2023-07-31',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: 'e9095698-b7d6-4a16-86fc-9d65b68fa195',
  //         leadFullName: 'sumit M',
  //         leadContactNumber: '5083599253',
  //         leadEmail: 'sumit@gmail.com',
  //         leadLoanType: 'Retail',
  //         leadProductType: 'Personal',
  //         leadAssignedTo: 'Mohan P',
  //         leadCreatedBy: 'Mohan P',
  //         leadCreatedDate: '2023-08-03',
  //         leadStatus: 'HOT',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: '74fe3338-a800-40ae-8a0e-916a51ab7c4a',
  //         leadFullName: 'Sunil Jadhav',
  //         leadContactNumber: '2345165789',
  //         leadEmail: 'sunil@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit p',
  //         leadCreatedBy: 'Amit p',
  //         leadCreatedDate: '2023-07-31',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: 'd0d3310e-5968-4431-bd6d-7a34e79d5cb1',
  //         leadFullName: 'Akshay kumar',
  //         leadContactNumber: '1111111111',
  //         leadEmail: 'akshay@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit P',
  //         leadCreatedBy: 'Amit P',
  //         leadCreatedDate: '2023-08-01',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: 'd5015191-b902-4f5a-af46-5b375e2b149b',
  //         leadFullName: 'Ashok kumar',
  //         leadContactNumber: '1234567890',
  //         leadEmail: 'ashok@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit p',
  //         leadCreatedBy: 'Amit p',
  //         leadCreatedDate: '2023-07-31',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: '225b6469-797a-499f-9e1f-6bc0094f6de2',
  //         leadFullName: 'Rahul Shinde',
  //         leadContactNumber: '2345165789',
  //         leadEmail: 'rahul@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit p',
  //         leadCreatedBy: 'Amit p',
  //         leadCreatedDate: '2023-07-31',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: 'dd063816-93c6-4458-9473-e8c546c8d007',
  //         leadFullName: 'Sumit Kumar',
  //         leadContactNumber: '2345165789',
  //         leadEmail: 'Sumit@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit p',
  //         leadCreatedBy: 'Amit p',
  //         leadCreatedDate: '2023-07-31',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: 'e9095698-b7d6-4a16-86fc-9d65b68fa195',
  //         leadFullName: 'sumit M',
  //         leadContactNumber: '5083599253',
  //         leadEmail: 'sumit@gmail.com',
  //         leadLoanType: 'Retail',
  //         leadProductType: 'Personal',
  //         leadAssignedTo: 'Mohan P',
  //         leadCreatedBy: 'Mohan P',
  //         leadCreatedDate: '2023-08-03',
  //         leadStatus: 'HOT',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: '74fe3338-a800-40ae-8a0e-916a51ab7c4a',
  //         leadFullName: 'Sunil Jadhav',
  //         leadContactNumber: '2345165789',
  //         leadEmail: 'sunil@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit p',
  //         leadCreatedBy: 'Amit p',
  //         leadCreatedDate: '2023-07-31',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: 'd0d3310e-5968-4431-bd6d-7a34e79d5cb1',
  //         leadFullName: 'Akshay kumar',
  //         leadContactNumber: '1111111111',
  //         leadEmail: 'akshay@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit P',
  //         leadCreatedBy: 'Amit P',
  //         leadCreatedDate: '2023-08-01',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: 'd5015191-b902-4f5a-af46-5b375e2b149b',
  //         leadFullName: 'Ashok kumar',
  //         leadContactNumber: '1234567890',
  //         leadEmail: 'ashok@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit p',
  //         leadCreatedBy: 'Amit p',
  //         leadCreatedDate: '2023-07-31',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: '225b6469-797a-499f-9e1f-6bc0094f6de2',
  //         leadFullName: 'Rahul Shinde',
  //         leadContactNumber: '2345165789',
  //         leadEmail: 'rahul@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit p',
  //         leadCreatedBy: 'Amit p',
  //         leadCreatedDate: '2023-07-31',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: 'dd063816-93c6-4458-9473-e8c546c8d007',
  //         leadFullName: 'Sumit Kumar',
  //         leadContactNumber: '2345165789',
  //         leadEmail: 'Sumit@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit p',
  //         leadCreatedBy: 'Amit p',
  //         leadCreatedDate: '2023-07-31',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: 'e9095698-b7d6-4a16-86fc-9d65b68fa195',
  //         leadFullName: 'sumit M',
  //         leadContactNumber: '5083599253',
  //         leadEmail: 'sumit@gmail.com',
  //         leadLoanType: 'Retail',
  //         leadProductType: 'Personal',
  //         leadAssignedTo: 'Mohan P',
  //         leadCreatedBy: 'Mohan P',
  //         leadCreatedDate: '2023-08-03',
  //         leadStatus: 'HOT',
  //         leadMarkedForReview: false,
  //       },
  //       {
  //         leadId: '74fe3338-a800-40ae-8a0e-916a51ab7c4a',
  //         leadFullName: 'Sunil Jadhav',
  //         leadContactNumber: '2345165789',
  //         leadEmail: 'sunil@gmail.com',
  //         leadLoanType: 'Retail Loan',
  //         leadProductType: 'Personal Loan',
  //         leadAssignedTo: 'Amit p',
  //         leadCreatedBy: 'Amit p',
  //         leadCreatedDate: '2023-07-31',
  //         leadStatus: 'Hot',
  //         leadMarkedForReview: false,
  //       },
  //     ],
  //   },
  // };

  data2 = {
    total: 6,
    limit: 10,
    skip: 10,
    data: {
      columns: [
        {
          title: 'Id',
          field: 'leadId',
          compare: (a: Lead, b: Lead) => a.leadId.localeCompare(b.leadId),
        },
        {
          title: 'Assigned To',
          field: 'leadAssignedTo',
          compare: (a: Lead, b: Lead) =>
            a.leadAssignedTo.localeCompare(b.leadAssignedTo),
        },
        {
          title: 'Contact Number',
          field: 'leadContactNumber',
          compare: (a: Lead, b: Lead) =>
            a.leadContactNumber.localeCompare(b.leadContactNumber),
        },
        {
          title: 'Created By',
          field: 'leadCreatedBy',
          compare: (a: Lead, b: Lead) =>
            a.leadCreatedBy.localeCompare(b.leadCreatedBy),
        },
        {
          title: 'Created Date',
          field: 'leadCreatedDate',
          compare: (a: Lead, b: Lead) =>
            a.leadCreatedDate.localeCompare(b.leadCreatedDate),
        },
        {
          title: 'Email',
          field: 'leadEmail',
          compare: (a: Lead, b: Lead) => a.leadEmail.localeCompare(b.leadEmail),
        },
        {
          title: 'Full Name',
          field: 'leadFullName',
          compare: (a: Lead, b: Lead) =>
            a.leadFullName.localeCompare(b.leadFullName),
        },
        {
          title: 'Loan Type',
          field: 'leadLoanType',
          compare: (a: Lead, b: Lead) =>
            a.leadLoanType.localeCompare(b.leadLoanType),
        },
        {
          title: 'Product Type',
          field: 'leadProductType',
          compare: (a: Lead, b: Lead) =>
            a.leadProductType.localeCompare(b.leadProductType),
        },
        {
          title: 'Status',
          field: 'leadStatus',
          compare: (a: Lead, b: Lead) =>
            a.leadStatus.localeCompare(b.leadStatus),
        },
      ],
      rows: [
        {
          leadId: 'd0d3310e-5968-4431-bd6d-7a34e79d5cb1',
          leadFullName: 'Akshay kumar',
          leadContactNumber: '7648967469',
          leadEmail: 'akshay@gmail.com',
          leadLoanType: 'Retail Loan',
          leadProductType: 'Personal Loan',
          leadAssignedTo: 'Amit P',
          leadCreatedBy: 'Amit P',
          leadCreatedDate: '2023-08-01',
          leadStatus: 'Hot',
          leadMarkedForReview: true,
        },
        {
          leadId: 'd5015191-b902-4f5a-af46-5b375e2b149b',
          leadFullName: 'Ashok kumar',
          leadContactNumber: '1234567890',
          leadEmail: 'ashok@gmail.com',
          leadLoanType: 'Retail Loan',
          leadProductType: 'Personal Loan',
          leadAssignedTo: 'Amit p',
          leadCreatedBy: 'Amit p',
          leadCreatedDate: '2023-07-31',
          leadStatus: 'Hot',
          leadMarkedForReview: true,
        },
        {
          leadId: '225b6469-797a-499f-9e1f-6bc0094f6de2',
          leadFullName: 'Rahul Shinde',
          leadContactNumber: '2345165789',
          leadEmail: 'rahul@gmail.com',
          leadLoanType: 'Retail Loan',
          leadProductType: 'Personal Loan',
          leadAssignedTo: 'Amit p',
          leadCreatedBy: 'Amit p',
          leadCreatedDate: '2023-07-31',
          leadStatus: 'Hot',
          leadMarkedForReview: false,
        },
        {
          leadId: 'dd063816-93c6-4458-9473-e8c546c8d007',
          leadFullName: 'Sumit Kumar',
          leadContactNumber: '2345165789',
          leadEmail: 'Sumit@gmail.com',
          leadLoanType: 'Retail Loan',
          leadProductType: 'Personal Loan',
          leadAssignedTo: 'Amit p',
          leadCreatedBy: 'Amit p',
          leadCreatedDate: '2023-07-31',
          leadStatus: 'Hot',
          leadMarkedForReview: false,
        },
        {
          leadId: '74fe3338-a800-40ae-8a0e-916a51ab7c4a',
          leadFullName: 'Sunil Jadhav',
          leadContactNumber: '2345165789',
          leadEmail: 'sunil@gmail.com',
          leadLoanType: 'Retail Loan',
          leadProductType: 'Personal Loan',
          leadAssignedTo: 'Amit p',
          leadCreatedBy: 'Amit p',
          leadCreatedDate: '2023-07-31',
          leadStatus: 'Hot',
          leadMarkedForReview: false,
        },
      ],
    },
  };

  // getRowdata1() {
  //   return this.data1.data.rows.slice();
  // }

  getRowdata2() {
    return this.data2.data.rows.slice();
  }

  updateData1(id: string, value: any) {
    this.http
      .put('https://localhost:7058/api/LeadList/' + id, value)
      .subscribe();

    // this.data1.data.rows[index] = value;
    // this.rowDataChanged.next(this.data1.data.rows.slice());
  }

  // deleteRow1(index: number) {
  //   const newData = this.data1.data.rows.splice(index, 1);
  //   this.rowDataChanged.next(this.data1.data.rows.slice());
  // }

  updateData2(index: number, value: any) {
    this.data2.data.rows[index] = value;
    this.rowDataChanged.next(this.data2.data.rows.slice());
  }

  deleteRow2(index: number) {
    const newData = this.data2.data.rows.splice(index, 1);
    this.rowDataChanged.next(this.data2.data.rows.slice());
  }

  postData() {
    const postData = {
      leadLastName: 'dhakane',
      leadFirstName: 'aditya',
      leadMiddleName: 'sanjay',
      leadContactNumber: '9876541235',
      leadEmail: 'adi@example.com',
      leadLoanType: 'retail',
      leadProductType: 'personal',
      leadAssignedTo: 'suresh s',
      leadCreatedBy: 'string',
      leadCreatedDate: '2023-08-21T05:05:41.579Z',
      leadStatus: 'hot',
      leadMarkedForReview: true,
    };
    return this.http
      .post('https://localhost:7058/api/LeadList', postData)
      .subscribe();
  }

  getData() {
    return this.http.get(
      'https://localhost:7058/api/LeadList?sortBy=LeadFirstName&pageNumber=1&pageSize=10'
    );
  }
  getData1() {
    return this.http
      .get(
        'https://localhost:7058/api/LeadList?sortBy=LeadFirstName&pageNumber=1&pageSize=10'
      )
      .subscribe((res) => {
        this.data = res;
        this.rowDataChanged = this.data.data;
      });
  }

  deleteData(id: string) {
    return this.http.delete('https://localhost:7058/api/LeadList/' + id);
  }

  markForReview(id: string, row: any) {
    return this.http
      .put('https://localhost:7058/api/LeadList/' + id, row)
      .subscribe();
  }
}
