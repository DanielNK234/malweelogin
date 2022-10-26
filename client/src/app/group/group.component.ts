import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
add: any;
delete: any;
name : string = '';
description: string = '';
grupos: Array<any>= [];
htmladd: number = 0;
search: string='';
id: number | undefined;

  constructor(private router : Router, private httpService: HttpService) { }

  ngOnInit(): void {
    this.listarGroup();
    this.htmladd=1;
  }
  async htmlAdd(){
    this.htmladd=2;

  }
  async groupAdd(){
    console.log("grupo adicionado");
    console.log(this.description);
    this.grupos = await this.httpService.post('group', { description: this.description});

  }
  deleteGroup(){
    this.htmladd= 4;
  }
  async listarGroup(){
    console.log("grupo listado");
    this.grupos= await this.httpService.get('group');
  }
  async groupDelete(){
    console.log(this.id);
    console.log("grupo deletado");
    this.grupos= await this.httpService.patch(`group`,{id : this.id});
  }

}