import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
  DELETE_ROW,
  MARK_FOR_REVIEW,
  UPDATE_DATA,
  INIT,
  SET,
  Set,
} from './lead.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { appState } from './appstate';
import { DataService } from '../data.service';

@Injectable()
export class LeadEffect {
  loadData = createEffect(() =>
    this.actions$.pipe(
      ofType(INIT),
      switchMap(() => {
        const data = JSON.parse(localStorage.getItem('dataEdited') || '{}');

        // console.log(data.dataColumns);
        // console.log(data.dataRows);
        if (data) {
          return of(
            new Set({ dataColumns: data.dataColumns, dataRows: data.dataRows })
          );
        }
        return of(new Set({ dataColumns: [], dataRows: [] }));
      })
    )
  );

  saveData = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UPDATE_DATA, DELETE_ROW, MARK_FOR_REVIEW),
        withLatestFrom(this.store.select('lead')),
        tap(([action, data]) => {
          //   console.log(action);
          //   console.log(data);

          localStorage.setItem('dataEdited', JSON.stringify(data));
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<appState>,
    private dataService: DataService
  ) {}
}

// else if (!data) {
//   this.dataService.getRowdata2();
//   this.store.select('lead').subscribe((resState) => {
//     const dataColumns2 = resState.dataColumns;
//     const dataRows2 = resState.dataRows;
//     return of(
//       new Set({ dataColumns: dataColumns2, dataRows: dataRows2 })
//     );
//   });
// }
