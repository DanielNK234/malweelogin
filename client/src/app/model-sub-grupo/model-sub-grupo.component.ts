import { Component, OnInit,Inject } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  description: string;
  id: number;
}

@Component({
  selector: 'app-model-sub-grupo',
  templateUrl: './model-sub-grupo.component.html',
  styleUrls: ['./model-sub-grupo.component.scss']
})
export class ModelSubGrupoComponent implements OnInit {

add: any;
delete: any;
put: any;
description: string = '';
selectedGroup: number = 0;
name : string = '';
subgrupos: Array<any>= [];
public grupos: Array<any>= [];
htmladd: number = 0;
search: string='';
id: number | undefined;

constructor(public dialogRef: MatDialogRef<ModelSubGrupoComponent>, private httpService : HttpService,
  @Inject(MAT_DIALOG_DATA) private data : {id: number, description : string}) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
    this.loadGrupo();
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
  async subGroupAdd(){
    console.log("Sub-grupo adicionado");
    console.log(this.description);
    this.subgrupos = await this.httpService.post('subgroup', { description: this.description, fkGrupo:this.selectedGroup});
    this.dialogRef.close();

  }
  deleteSubGroup(){
    this.htmladd= 2;
  }
  async listarSubGroup(){
    console.log("subgrupo listado");
    this.subgrupos= await this.httpService.get('subgroup');
   
  }


  async subGroupDelete(){
    this.subgrupos= await this.httpService.patch(`subgroup`,{id : this.id});
    this.dialogRef.close();
  }

  async putSubGrupo(){
    this.subgrupos= await this.httpService.put(`subgroup`, {id : this.id, description : this.description });
    this.dialogRef.close();
  }
  
  async loadGrupo(){
    this.grupos= await this.httpService.get('group');
    console.log(this.grupos)
  }
  


}
