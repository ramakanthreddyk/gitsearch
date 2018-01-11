import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {PaginationService,PaginatePipe, PaginationControlsDirective} from 'ng2-pagination';
import { PagerService } from './page';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import {gitapi} from './api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GitComponent } from './git/git.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginatePipe,
    PaginationControlsDirective,
    GitComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
    
  ],
  providers: [PaginationService,PagerService,gitapi],
  bootstrap: [AppComponent]
})
export class AppModule { }
