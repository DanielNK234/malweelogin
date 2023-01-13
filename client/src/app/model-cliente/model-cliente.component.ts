import { Component, OnInit,Inject } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ConsultaCepService } from './consulta-cep.service';
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
  selectedGroup: number = 0;
  all: Array<any> = [];
  logradouro : string = '';
  bairro: string = '';
  localidade: string = '';
  uf: string = '';
  complemento: string = '';
  numero: number = 0;
  cep : string = '';
  public enderecos : Array<any> = [];
  endereco : string = '';
  
  constructor(public dialogRef: MatDialogRef<ModelClienteComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {id: number, nomeFantasia : string,
      cnpj : string, razaoSocial : string, clienteDesde : Date},
      private cepService: ConsultaCepService) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    ngOnInit(): void {
      this.deleteAll()
      this.loadendereco()
      console.log(this.data);
      if(this.data.id == null){
        this.htmladd = 1
      }else{
        this.htmladd = 2
      }
      if (!this.data){
        return;
      }
      this.id = this.data.id,
      this.nomeFantasia = this.nomeFantasia;
    }
    // ____________________________________________________________________________________________________________________________
    consultaCep(){
      this.cepService.buscar(this.cep).subscribe((dados) => this.populaForm(dados));
    }
  
    populaForm(dados : any){
     this.cep = dados.cep,
     this.logradouro  = dados.logradouro ,
     this.bairro = dados.bairro,
     this.localidade = dados.localidade,
     this.uf = dados.uf
    }
    // ____________________________________________________________________________________________________________________________
    async htmlAdd(){
      this.htmladd=1;
  
    }

    async getAddress(){
      this.enderecos = await this.httpService.get(`cliente/${this.data.id}`);
    }
//------------------------------
    async clientAdd(){
      console.log("grupo adicionado");
      console.log(this.nomeFantasia);
      this.clientes = await this.httpService.post('cliente', {nomeFantasia: this.nomeFantasia,
        cnpj:this.cnpj,razaoSocial:this.razaoSocial, clienteDesde:this.startDate,address: this.enderecos});
      this.dialogRef.close();
  
    }
    async addEndereco(){ 
      this.enderecos.push({'logradouro' :this.logradouro , 'bairro' :this.bairro, 'localidade' :this.localidade, 'uf':this.uf,
        'cep' :this.cep, 'numero' :this.numero, 'complemento' :this.complemento})
        console.log(this.enderecos);
        this.reset();
    }
    //----------------------------

    async listarCliente(){
      console.log("grupo listado");
      this.clientes= await this.httpService.get('cliente');
     
    }

       deleteClient(){
      this.htmladd= 2;
    } 
    // -----------------------------
    async deleteAll(){
      this.clienteDelete()
      this.enderecoDelete()
    }
    
    async clienteDelete(){
      console.log("Cliente deletado");
      this.clientes= await this.httpService.patch(`cliente`,{id : this.id});
      this.dialogRef.close();
    }
    async enderecoDelete(){
      console.log("endereço deletado");
      this.enderecos= await this.httpService.patch(`clientes`,{id : this.selectedGroup});
      this.dialogRef.close();
    }



    // <------------------>
    async putCliente(){
      this.clientes = await this.httpService.put('cliente',{nomeFantasia : this.nomeFantasia, razaoSocial : this.razaoSocial,
      id: this.data.id})
      if(this.nomeFantasia == ''){
        this.nomeFantasia = this.data.nomeFantasia;
      }
  
      if(this.razaoSocial == ''){
        this.razaoSocial = this.data.razaoSocial;
      }
  
    }
    async putClient(){
      this.putAddress();
  
      if(this.nomeFantasia == ''){
        this.nomeFantasia = this.data.nomeFantasia;
      }
  
      if(this.razaoSocial == ''){
        this.razaoSocial = this.data.razaoSocial;
      }
  
      this.clientes = await this.httpService.put('cliente',{nomeFantasia : this.nomeFantasia, razaoSocial : this.razaoSocial,
        address: this.enderecos, id: this.data.id})
  
      this.onNoClick();
    }
  
    async putAddress(){
      this.enderecos.push({logradouro  :this.logradouro , bairro :this.bairro, localidade :this.localidade,
        uf :this.uf, cep :this.cep, numero :this.numero, complemento :this.complemento, id : this.selectedGroup})
    }
    //-----------------------
    reset(){
      this.logradouro           = '';
      this.bairro       = '';
      this.localidade       = '';
      this.uf       = '';
      this.complemento  = '';
      this.numero       = 0;
      this.cep          = '';
    }

    async loadendereco(){
      this.enderecos = await this.httpService.get(`cliente/${this.data.id}`);
    }


}
