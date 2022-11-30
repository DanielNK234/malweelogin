import { Component, OnInit,Inject } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-model-pedido',
  templateUrl: './model-pedido.component.html',
  styleUrls: ['./model-pedido.component.scss']
})
export class ModelPedidoComponent implements OnInit {

  add: any;
  delete: any;
  put: any;
  dtEntrega: string = '';
  dtEmissao: String = '';
  selectedClient: number = 0;
  selectedEndereco: number = 0;
  name : string = '';
  pedidos : Array<any>=[];
  public Client: Array<any>= [];
  public Endereco: Array<any>= [];
  htmladd: number = 0;
  search: string='';
  id: number | undefined;
  startDate: Date = new Date(2022, 0, 1);
  lastDate: Date = new Date(2050, 0, 1);


  
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
      this.dtEntrega = this.dtEntrega;
    }
    async htmlAdd(){
      this.htmladd=1;
  
    }
    async PedidoAdd(){
      console.log("Sub-grupo adicionado");
      console.log(this.dtEntrega);
      this.pedidos = await this.httpService.post('pedido', {dtEmissao: this.startDate, dtEntrega: this.lastDate });
      this.dialogRef.close();
  
    }
    deletePedido(){
      this.htmladd= 2;
    }
    async listarPedido(){
      console.log("subgrupo listado");
      this.pedidos= await this.httpService.get('pedido');
     
    }
  
  
    async PedidoDelete(){
      this.pedidos= await this.httpService.patch(`pedido`,{id : this.id});
      this.dialogRef.close();
    }
  
    async putPedido(){
      this.pedidos= await this.httpService.put(`pedido`, {id : this.id, dtEntrega : this.dtEntrega,dtEmissao: this.dtEmissao });
      this.dialogRef.close();
    }
    
    async loadEndereco(){
      this.Endereco= await this.httpService.get(`cliente/${this.data.id}`);
      console.log(this.Endereco)
    }
    async loadClient(){
      this.Client= await this.httpService.get('cliente');
      console.log(this.Client)
    }
}
