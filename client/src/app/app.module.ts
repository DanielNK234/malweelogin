import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BlockUIModule } from 'ng-block-ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DashComponent } from './dash/dash.component';
import { RoutesModule } from './routes.module';
import { GroupComponent } from './group/group.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModelComponent } from './model/model.component';
import { ModelSubGrupoComponent } from './model-sub-grupo/model-sub-grupo.component';
import { SubGrupoComponent } from './sub-grupo/sub-grupo.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ColectionComponent } from './colection/colection.component';
import { ProdutoComponent } from './produto/produto.component';
import { DrpdownComponent } from './drpdown/drpdown.component';
import { ModelColectionComponent } from './model-colection/model-colection.component';
import { UsermodelComponent } from './usermodel/usermodel.component';
import { ModelClienteComponent } from './model-cliente/model-cliente.component';
import { ModelProdutoComponent } from './model-produto/model-produto.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ModelPedidoComponent } from './model-pedido/model-pedido.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    DashComponent,
    GroupComponent,
    UserComponent,
    ModelComponent,
    ModelSubGrupoComponent,
    SubGrupoComponent,
    ClienteComponent,
    ColectionComponent,
    ProdutoComponent,
    DrpdownComponent,
    ModelColectionComponent,
    UsermodelComponent,
    ModelClienteComponent,
    ModelProdutoComponent,
    PedidoComponent,
    ModelPedidoComponent
  ],
  imports: [
    RoutesModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  exports : [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
