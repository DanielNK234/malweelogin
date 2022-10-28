import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService } from 'src/services/HttpService';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelComponent } from '../model/model.component';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ModelSubGrupoComponent } from '../model-sub-grupo/model-sub-grupo.component';


@Component({
  selector: 'app-sub-grupo',
  templateUrl: './sub-grupo.component.html',
  styleUrls: ['./sub-grupo.component.scss']
})
export class SubGrupoComponent implements OnInit {
  add: any;
  delete: any;
  put: any;
  name : string = '';
  description: string = '';
  subgrupos: Array<any>= [];
  htmladd: number = 0;
  search: string='';
  id: number | undefined;
  
  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.get();
  }
  
  openPutModal(grupos : any): void {
    const ref = this.dialog.open(ModelSubGrupoComponent, {
      width: '550px',
      data: grupos
    });
  
    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }
  
  openPostModal(): void {
    const ref = this.dialog.open(ModelSubGrupoComponent, {
      width: '550px',
    });
    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }
  
  async get(){
    this.subgrupos = await this.httpService.get('subgroup');
  }
  
  
  
  }
