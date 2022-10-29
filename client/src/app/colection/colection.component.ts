 import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService } from 'src/services/HttpService';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelComponent } from '../model/model.component';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ModelColectionComponent } from '../model-colection/model-colection.component';

@Component({
  selector: 'app-colection',
  templateUrl: './colection.component.html',
  styleUrls: ['./colection.component.scss']
})
export class ColectionComponent implements OnInit {

  add: any;
  delete: any;
  put: any;
  name : string = '';
  description: string = '';
  colections: Array<any>= [];
  htmladd: number = 0;
  search: string='';
  id: number | undefined;
  
  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.get();
  }
  
  openPutModal(colections : any): void {
    const ref = this.dialog.open(ModelColectionComponent, {
      width: '550px',
      data: colections
    });
  
    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }
  
  openPostModal(): void {
    const ref = this.dialog.open(ModelColectionComponent, {
      width: '550px',
    });
    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }
  
  async get(){
    this.colections = await this.httpService.get('colection');
  }
  

}
