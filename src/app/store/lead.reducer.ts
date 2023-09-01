import { Action } from '@ngrx/store';
import * as LeadAction from './lead.action';

export interface State {
  dataColumns: any[];
  dataRows: any[];
}

const initialState: State = { dataColumns: [], dataRows: [] };

export function leadReducer(
  state: State = initialState,
  action: LeadAction.LeadAction
) {
  switch (action.type) {
    case LeadAction.GET_DATA:
      return {
        ...state,
        dataColumns: [...action.payload.dataColumns],
        dataRows: [...action.payload.dataRows],
      };

    case LeadAction.UPDATE_DATA:
      const row = state.dataRows[action.payload.index];
      const updatedRow = {
        ...row,
        ...action.payload.updatedRow,
      };
      const updatedRowData = [...state.dataRows];
      updatedRowData[action.payload.index] = updatedRow;
      return {
        ...state,
        dataRows: updatedRowData,
      };

    case LeadAction.DELETE_ROW:
      return {
        ...state,
        dataRows: state.dataRows.filter((item, index) => {
          return index !== action.payload;
        }),
      };

    case LeadAction.MARK_FOR_REVIEW:
      const editRow = state.dataRows[action.payload.index];
      const marked = {
        ...editRow,
        ...action.payload.row,
      };
      const markedRow = [...state.dataRows];
      markedRow[action.payload.index] = marked;

      return {
        ...state,
        dataRows: markedRow,
      };

    case LeadAction.SET:
      return {
        ...state,
        dataColumns: action.payload.dataColumns,
        dataRows: action.payload.dataRows,
      };

    default:
      return state;
  }
}
