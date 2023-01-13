import { Component, OnInit,Inject } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormControl} from '@angular/forms';
import { ModelClienteComponent } from '../model-cliente/model-cliente.component';

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
  public pedidos : Array<any>=[];
  public Client: Array<any>= [];
  public Endereco: Array<any>= [];
  htmladd: number = 0;
  search: string='';
  id: number | undefined;
  startDate: Date = new Date(2022, 0, 1);
  lastDate: Date = new Date(2022, 0, 1);
  nomeFantasia: string ='';
  logradouro: string='';
  dialog: any;
  clientes: Array<any>= [];
  clientes2: Array<any>= [];
  fkClientes:number | undefined;
  fkEndereco:number | undefined;
  proPedidos:Array<any>= [];
  fkPedido:number | undefined;
  fkProduto:number | undefined;
  quantidade:number = 0;
  vlUnitario:number =0;
  description:string='';
  acrescimo:number =0;
  selectedProduto: number = 0;
  produto : Array<any>=[];
  fkCliente:number | undefined;
  prod:string='';
  produto2:Array<any>=[];
  ghostNumber:number=0;
  desconto:number=0;
  total:number=0;
  total2:number=0;
  produto3 : Array<any>=[];
  prodPedidos:Array<any>=[];
  
  constructor(public dialogRef: MatDialogRef<ModelPedidoComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {id: number, description : string}) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    async ngOnInit(){
      await this.loadProduto(),
      await this.listaEndereco(),
      await this.listaClientes(),
     await this.loadEndereco(),
     await this.loadClient(),
     await this.listarProPedido()
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
      this.pedidos = await this.httpService.post('pedido', {dtEmissao: this.startDate, dtEntrega: this.lastDate,proPedidos: this.proPedidos, fkCliente:this.fkCliente,
      fkEndereco: this.fkEndereco});
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
      this.pedidos = await this.httpService.patch(`pedido`,{id : this.id});
      this.dialogRef.close();
    }
  
    async putPedido(){
      this.produto3.push({"quantidade" : this.quantidade, "valorUnitario" : this.vlUnitario, "descricao" : this.description,
    "acrescimo" : this.acrescimo, "desconto" : this.desconto, "total" : this.total, "fkPedido" : this.selectedProduto})

    this.pedidos = await this.httpService.put('pedido',{dtEmissao : this.startDate, dtEntrega : this.lastDate, 
      proPedido : this.produto3, id : this.data.id})
      this.onNoClick();
    }
    
    async loadEndereco(){
      this.Endereco= await this.httpService.get(`cliente/${this.data.id}`);
      console.log(this.Endereco)
    }
    async loadClient(){
      this.Client= await this.httpService.get('cliente');
      console.log(this.Client)
    }
    async loadProduto(){
      this.produto= await this.httpService.get('produto');
      console.log(this.produto)
    }



    public addNomeFantasia(name: string, id: number){
      console.log(id)
      this.nomeFantasia=name;
      this.fkCliente=id;
      console.log(this.fkCliente);
      this.listaEndereco();
      this.clientes2.push({"nome" : this.nomeFantasia, "dtEmissao" : this.startDate, "dtEntrega":this.lastDate})
    }
async listaClientes(){
  this.clientes= await this.httpService.get('cliente');
  console.log(this.clientes);


}
async listaEndereco(){
  this.Endereco= await this.httpService.get(`cliente/${this.fkCliente}`);
  console.log(this.Endereco);


}

async listarProPedido(){
  this.prodPedidos = await this.httpService.get(`pedido/${this.data.id}`);

}

public addEndereco(logradouro: string, id: number){
  this.logradouro= logradouro;
  this.fkEndereco=id;
}

async listaProduto(){
  this.produto = await this.httpService.get(`producto/${this.ghostNumber}`);
  console.log(this.produto); 
  }
  
  addPreco(vlUnitario : number, description : string,total:number){
    this.vlUnitario = vlUnitario;
    this.description = description;
    this.total = total
    console.log(vlUnitario);
  }
  async addProduto(description: string ,id: number,precoVenda: number ){
    this.prod = description;
    this.id = id;
    this.vlUnitario = precoVenda;
    this.produto2 = await this.httpService.get(`producto/${id}`);
  }
addbutto(){

}
  calculaTotal(){
    let descontoFinal = this.desconto/100 * this.vlUnitario;
    let aumentoFinal = this.acrescimo/100 * this.vlUnitario;
    let valorUnitarioL = this.vlUnitario - descontoFinal + aumentoFinal;
    this.total = valorUnitarioL * this.quantidade;
  }

  adicionarArrayDePedidos(){
    this.total2 += this.total;
    console.log(this.quantidade)
    this.produto3.push({"description" : this.prod, "vlUnitario" : this.vlUnitario, "acrescimo" : this.acrescimo,
    "desconto" : this.desconto, "fkProduto" : this.id, "quantidade" : this.quantidade, "total" : this.total})
    console.log(this.produto3);
    this.resetModels();
  }
  resetModels(){
    this.vlUnitario = 0;
    this.acrescimo = 1;
    this.desconto = 1;
    this.quantidade = 0
    this.total = 0
  }

  async addPedido(){
    this.pedidos = await this.httpService.post('pedido',{dtEmissao: this.startDate, dtEntrega : this.lastDate,
    fkEndereco :this.fkEndereco, fkCliente :this.fkCliente, total :this.total, proPedido : this.produto3,
  })
  }
  



}
