import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService } from 'src/services/HttpService';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelComponent } from '../model/model.component';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { UsermodelComponent } from '../usermodel/usermodel.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  add: any;
  delete: any;
  put: any;
  name : string = '';
  username: string = '';
  Usuarios: Array<any>= [];
  htmladd: number = 0;
  search: string='';
  id: number | undefined;
  
  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.get();
  }
  
  openPutModal(Usuarios : any): void {
    const ref = this.dialog.open(UsermodelComponent, {
      width: '550px',
      data: Usuarios
    });
  
    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }
  
  openPostModal(): void {
    const ref = this.dialog.open(UsermodelComponent, {
      width: '550px',
    });
    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }
  
  async get(){
    this.Usuarios = await this.httpService.get('user');
  }
  
  }

