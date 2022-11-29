import { ClienteComponent } from "./cliente/cliente.component";
import { ColectionComponent } from "./colection/colection.component";
import { GroupComponent } from "./group/group.component";
import { ProdutoComponent } from "./produto/produto.component";
import { SubGrupoComponent } from "./sub-grupo/sub-grupo.component";
import { UserComponent } from "./user/user.component";
import { PedidoComponent } from "./pedido/pedido.component";

export const MenuItens = [
    {
        path: 'group',
        caption : 'Grupos',
        icon : 'assessment',
        component: GroupComponent,
    },
    {
        path: 'sub-grupo',
        caption : 'Sub-Grupo',
        icon : 'equalizer',
        component: SubGrupoComponent,
    },
    {
        path: 'colection',
     caption : 'coleção',
     icon : 'view_list',
     component: ColectionComponent, 
     }, 
     {
        path: 'produto',
     caption : 'produto',
     icon : 'shop',
     component: ProdutoComponent, 
     },   {
        path: 'cliente',
     caption : 'cliente',
     icon : 'person',
     component: ClienteComponent, 
     },
    
    {
        path: 'user',
        caption : 'Usuário',
        icon : 'person',
        component: UserComponent,
    },
    {
        path: 'pedido',
        caption : 'Pedido',
        icon : 'add_shopping_cart',
        component: PedidoComponent,
    }
    
]
 