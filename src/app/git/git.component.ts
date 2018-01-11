import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {PaginatePipe, PaginationControlsDirective, PaginationService} from 'ng2-pagination';
import { PagerService } from '../page';
import {gitapi} from '../api';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-git',
  templateUrl: './git.component.html',
  styleUrls: ['./git.component.css']
})
export class GitComponent implements OnInit {

  constructor(private http: Http, private pagerService: PagerService,public gitapi: gitapi) { }
  
      // array of all items to be paged
      private allItems: any[];
      flaggedItems:any[] = [];
      searchItem:string = "";
      Noresult = "";
      flagged:boolean = false;
      // pager object
      pager: any = {};
  
      // paged items
      pagedItems: any[];
  
      ngOnInit() { 
        if(!localStorage.getItem('items')){
        this.gitapi.gitsearch('https://api.github.com/search/repositories?q=angular').subscribe(result => {
          
              this.allItems = result.items; // set items to json response
              this.setPage(1); // initialize to page 1
              localStorage.setItem('items', JSON.stringify(result.items));
          });
        }
              if(localStorage.getItem('items')){
                this.allItems = JSON.parse(localStorage.getItem('items'));  
                this.setPage(1); 
              }
             
             if(localStorage.getItem('flagitems')){
                this.flaggedItems =  JSON.parse(localStorage.getItem('flagitems'));
              }
                      
      }
  
      setPage(page: number) {
          if (page < 1 || page > this.pager.totalPages) {
              return;
          }
          // get pager object from service
          this.pager = this.pagerService.getPager(this.allItems.length, page); 
          // get current page of items
          this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
      }
      setPageFlag(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.flaggedItems.length, page);
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


  git() {
      if(this.searchItem){
    let a = 'https://api.github.com/search/repositories?q=' + this.searchItem;
    this.gitapi.gitsearch(a).subscribe(result => {
      if (result.items) {
        this.allItems = result.items;
        this.setPage(1);
        this.Noresult = "";
        localStorage.setItem('items', JSON.stringify(result.items));
      }
      else if(result.msg){
        this.Noresult = result.msg
      }

    })
  }
}
flag(id){
  this.flaggedItems.push(id);
}
activateflag(){
  this.flagged = true;
  this.flaggedItems = Array.from(new Set(this.flaggedItems));
  localStorage.setItem('flagitems', JSON.stringify(this.flaggedItems));
  this.flaggedItems =  JSON.parse(localStorage.getItem('flagitems'));  
  this.setPageFlag(1);
}
back(){
  this.flagged = false;
  this.allItems = JSON.parse(localStorage.getItem('items'));
  this.setPage(1);
}
}
