import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService } from 'src/services/HttpService';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelComponent } from '../model/model.component';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ModelSubGrupoComponent } from '../model-sub-grupo/model-sub-grupo.component';
import { ModelPedidoComponent } from '../model-pedido/model-pedido.component';
import * as moment from 'moment';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {
  pedidos: Array<any>= [];
  search: string='';
  
  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.get();
  }
  
  openPutModal(pedidos : any): void {
    const ref = this.dialog.open(ModelPedidoComponent, {
      width: '550px',
      data: pedidos
    });
  
    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }
  
  openPostModal(): void {
    const ref = this.dialog.open(ModelPedidoComponent, {
      width: '550px',
    });
    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }
  
  async get(){
    this.pedidos = await this.httpService.get('pedido');
    this.pedidos.forEach(element=>{
      console.log(element);
      element.dtEmissao = moment(element.dtEmissao).format('DD/MM/YYYY');
      element.dtEntrega = moment(element.dtEntrega).format('DD/MM/YYYY');

    })
  }
  
  
  

}
