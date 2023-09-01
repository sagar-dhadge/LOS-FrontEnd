import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { en_US } from 'ng-zorro-antd/i18n';
import { NZ_I18N } from 'ng-zorro-antd/i18n';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { EditRowComponent } from './edit-row/edit-row.component';
import { AppComponent } from './app.component';
import { DrawerComponent } from './drawer/drawer.component';
import { TableComponent } from './table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { leadReducer } from './store/lead.reducer';
import { reducers } from './store/appstate';
import { LeadEffect } from './store/lead.effects';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DrawerComponent,
    EditRowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzTableModule,
    NzDividerModule,
    DragDropModule,
    NzCardModule,
    NzLayoutModule,
    NzMenuModule,
    NzCollapseModule,
    NzIconModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzModalModule,
    ScrollingModule,
    NzAlertModule,
    NzMessageModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([LeadEffect]),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
