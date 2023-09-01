import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as LeadActions from '../app/store/lead.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'zorro-assign';

  ngOnInit(): void {
    this.store.dispatch(new LeadActions.InIt());
  }
  constructor(private store: Store) {}
}
