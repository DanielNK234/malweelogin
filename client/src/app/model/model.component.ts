import { Component, OnInit,Inject } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  description: string;
  id: number;
}

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
add: any;
delete: any;
put: any;
description: string = '';
name : string = '';
grupos: Array<any>= [];
htmladd: number = 0;
search: string='';
id: number | undefined;

constructor(public dialogRef: MatDialogRef<ModelComponent>, private httpService : HttpService,
  @Inject(MAT_DIALOG_DATA) private data : {id: number, description : string}) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
    console.log(this.data);
    if(this.data.id == null){
      this.htmladd = 2
    }else{
      this.htmladd = 1
    }
    if (!this.data){
      return;
    }
    this.id = this.data.id,
    this.description = this.description;
  }
  async htmlAdd(){
    this.htmladd=1;

  }
  async groupAdd(){
    console.log("grupo adicionado");
    console.log(this.description);
    this.grupos = await this.httpService.post('group', { description: this.description});

  }
  deleteGroup(){
    this.htmladd= 2;
  }
  async listarGroup(){
    console.log("grupo listado");
    this.grupos= await this.httpService.get('group');
  }
  async groupDelete(){
    console.log("grupo deletado");
    this.grupos= await this.httpService.patch(`group`,{id : this.id});
  }

  async putGrupo(){
    this.grupos= await this.httpService.put(`group`, {id : this.id, description : this.description });
  }  

}