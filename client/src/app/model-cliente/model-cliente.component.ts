import { Component, OnInit,Inject } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
export interface DialogData {
  description: string;
  id: number;
}

@Component({
  selector: 'app-model-cliente',
  templateUrl: './model-cliente.component.html',
  styleUrls: ['./model-cliente.component.scss']
})
export class ModelClienteComponent implements OnInit {
  add: any;
  delete: any;
  put: any;
  nomeFantasia: string = '';
  cnpj:String='';
  razaoSocial:String='';
  startDate: Date = new Date(2022, 0, 1);
  name : string = '';
  clientes: Array<any>= [];
  htmladd: number = 0;
  search: string='';
  id: number | undefined;

  rua: string = '';
  bairro: string = '';
  cidade: string = '';
  estado: string = '';
  complemento: string = '';
  numero: number = 0;
  cep : number = 0;
  enderecos : Array<any> = [];
  endereco : string = '';
  
  constructor(public dialogRef: MatDialogRef<ModelClienteComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {id: number, nomeFantasia : string,
      cnpj : string, razaoSocial : string, clienteDesde : Date}) { }
  
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
      this.nomeFantasia = this.nomeFantasia;
    }
    async htmlAdd(){
      this.htmladd=1;
  
    }
    async clientAdd(){
      console.log("grupo adicionado");
      console.log(this.nomeFantasia);
      this.clientes = await this.httpService.post('cliente', {nomeFantasia: this.nomeFantasia,cnpj:this.cnpj,razaoSocial:this.razaoSocial, clienteDesde:this.startDate,
         address : [
          {
            cep : this.cep,
            rua : this.rua,
            bairro : this.bairro,
            cidade : this.cidade,
            estado : this.estado,
            complemento : this.complemento,
            numero : this.numero
          }
        ]});
      this.dialogRef.close();
  
    }
    deleteGroup(){
      this.htmladd= 2;
    }
    async listarGroup(){
      console.log("grupo listado");
      this.clientes= await this.httpService.get('cliente');
     
    }
    async groupDelete(){
      console.log("grupo deletado");
      this.clientes= await this.httpService.patch(`cliente`,{id : this.id});
      this.dialogRef.close();
    }
  
    public async putGrupo(){
      this.clientes= await this.httpService.put(`cliente`, {id : this.id, nomeFantasia : this.nomeFantasia,
        address : [
          {
            cep : this.cep,
            rua : this.rua,
            bairro : this.bairro,
            cidade : this.cidade,
            estado : this.estado,
            complemento : this.complemento,
            numero : this.numero
          }
        ]});
      this.dialogRef.close();
    }  
  

}
