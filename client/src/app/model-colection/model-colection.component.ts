import { Component, OnInit,Inject } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  description: string;
  id: number;
}

@Component({
  selector: 'app-model-colection',
  templateUrl: './model-colection.component.html',
  styleUrls: ['./model-colection.component.scss']
})
export class ModelColectionComponent implements OnInit {

  add: any;
  delete: any;
  put: any;
  description: string = '';
  name : string = '';
  colections: Array<any>= [];
  htmladd: number = 0;
  search: string='';
  id: number | undefined;
  
  constructor(public dialogRef: MatDialogRef<ModelColectionComponent>, private httpService : HttpService,
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
    async colectionAdd(){
      console.log("coleção adicionada");
      console.log(this.description);
      this.colections = await this.httpService.post('colection', { description: this.description});
      this.dialogRef.close();
  
    }
    deleteColection(){
      this.htmladd= 2;
    }
    async listarColecao(){
      console.log("coleção listada");
      this.colections= await this.httpService.get('colection');
     
    }
    async colecDelete(){
      console.log("coleção deletada");
      this.colections= await this.httpService.patch(`colection`,{id : this.id});
      this.dialogRef.close();
    }
  
    public async putColection(){
      this.colections= await this.httpService.put(`colection`, {id : this.id, description : this.description });
      this.dialogRef.close();
    }  
  
}
