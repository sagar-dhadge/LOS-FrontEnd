import { Action } from '@ngrx/store';

export const GET_DATA = '[lead] get data';
export const UPDATE_DATA = '[lead] update data';
export const DELETE_ROW = '[lead] delete row';
export const MARK_FOR_REVIEW = '[lead] mark for review';
export const INIT = '[lead] init';
export const SET = '[lead] set';

export class InIt implements Action {
  readonly type = INIT;
}

export class Set implements Action {
  readonly type = SET;
  constructor(public payload: { dataColumns: any[]; dataRows: any[] }) {}
}

export class GetData implements Action {
  readonly type = GET_DATA;

  constructor(public payload: { dataColumns: any[]; dataRows: any[] }) {}
}

export class UpdateData implements Action {
  readonly type = UPDATE_DATA;
  constructor(public payload: { index: number; updatedRow: any }) {}
}

export class DeleteRow implements Action {
  readonly type = DELETE_ROW;
  constructor(public payload: number) {}
}

export class MarkForReview implements Action {
  readonly type = MARK_FOR_REVIEW;
  constructor(public payload: { index: number; row: any }) {}
}

export type LeadAction =
  | GetData
  | UpdateData
  | DeleteRow
  | MarkForReview
  | Set
  | InIt;
