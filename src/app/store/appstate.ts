import * as fromLeadReducer from './lead.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const rootReducer = {};

export interface appState {
  lead: fromLeadReducer.State;
}

export const reducers: ActionReducerMap<appState, any> = {
  lead: fromLeadReducer.leadReducer,
};
