import { Component, OnInit,Inject } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  description: string;
  id: number;
}

@Component({
  selector: 'app-model-produto',
  templateUrl: './model-produto.component.html',
  styleUrls: ['./model-produto.component.scss']
})
export class ModelProdutoComponent implements OnInit {

  add: any;
  delete: any;
  put: any;
  description: string = '';
  precoVenda: String = '';
  selectedGroup: number = 0;
  selectedColection: number = 0;
  selectedSubGroup: number = 0;
  name : string = '';
  produtos : Array<any>=[];
  public subgrupos: Array<any>= [];
  public grupos: Array<any>= [];
  public colections: Array<any>= [];
  htmladd: number = 0;
  search: string='';
  id: number | undefined;
  
  constructor(public dialogRef: MatDialogRef<ModelProdutoComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {id: number, description : string}) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    ngOnInit(): void {
      this.loadGrupo(),
      this.loadSubGrupo(),
      this.loadcolection()
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
    
    async loadGrupo(){
      this.grupos= await this.httpService.get('group');
      console.log(this.grupos)
    }
    async loadSubGrupo(){
      this.subgrupos= await this.httpService.get('subgroup');
      console.log(this.subgrupos)
    }
    async loadcolection(){
      this.colections= await this.httpService.get('colection');
      console.log(this.colections)
    }

}
