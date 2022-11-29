import { Component, OnInit,Inject } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-model-pedido',
  templateUrl: './model-pedido.component.html',
  styleUrls: ['./model-pedido.component.scss']
})
export class ModelPedidoComponent implements OnInit {

  add: any;
  delete: any;
  put: any;
  description: string = '';
  precoVenda: String = '';
  selectedClient: number = 0;
  selectedSubEndereco: number = 0;
  name : string = '';
  produtos : Array<any>=[];
  public Client: Array<any>= [];
  public Endereco: Array<any>= [];
  htmladd: number = 0;
  search: string='';
  id: number | undefined;
  
  constructor(public dialogRef: MatDialogRef<ModelPedidoComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {id: number, description : string}) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    async ngOnInit(){
     await this.loadEndereco(),
     await this.loadClient(),
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
    async ProdutoAdd(){
      console.log("Sub-grupo adicionado");
      console.log(this.description);
      this.produtos = await this.httpService.post('produto', { description: this.description,precoVenda: this.precoVenda });
      this.dialogRef.close();
  
    }
    deleteProduto(){
      this.htmladd= 2;
    }
    async listarProduto(){
      console.log("subgrupo listado");
      this.produtos= await this.httpService.get('produto');
     
    }
  
  
    async ProdutoDelete(){
      this.produtos= await this.httpService.patch(`produto`,{id : this.id});
      this.dialogRef.close();
    }
  
    async putProduto(){
      this.produtos= await this.httpService.put(`produto`, {id : this.id, description : this.description,precoVenda: this.precoVenda });
      this.dialogRef.close();
    }
    
    async loadEndereco(){
      this.Endereco= await this.httpService.get('cliente/:id');
      console.log(this.Endereco)
    }
    async loadClient(){
      this.Client= await this.httpService.get('cliente');
      console.log(this.Client)
    }
}
