import { Component, OnInit,Inject } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  username: string;
  id: number;
}

@Component({
  selector: 'app-usermodel',
  templateUrl: './usermodel.component.html',
  styleUrls: ['./usermodel.component.scss']
})
export class UsermodelComponent implements OnInit {

  add: any;
delete: any;
put: any;
username: string = '';
name : string = '';
usuarios: Array<any>= [];
password: String='';
cpassword: String='';
htmladd: number = 0;
search: string='';
id: number | undefined;

constructor(public dialogRef: MatDialogRef<UsermodelComponent>, private httpService : HttpService,
  @Inject(MAT_DIALOG_DATA) private data : {id: number, username : string}) { }

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
    this.username = this.username;
  }
  async htmlAdd(){
    this.htmladd=1;

  }
  async userAdd(){
    console.log("grupo adicionado");
    console.log(this.username);
    this.usuarios = await this.httpService.post('user', {name:this.name, username: this.username,password: this.password, cpassword: this.cpassword});
    this.dialogRef.close();

  }
  deleteUser(){
    this.htmladd= 2;
  }
  async listarGroup(){
    console.log("grupo listado");
    this.usuarios= await this.httpService.get('user');
   
  }
  async userDelete(){
    console.log("grupo deletado");
    this.usuarios= await this.httpService.patch(`user`,{id : this.id});
    this.dialogRef.close();
  }

  public async putUser(){
    this.usuarios= await this.httpService.put(`user`, {id : this.id, username : this.username });
    this.dialogRef.close();
  }  

}
