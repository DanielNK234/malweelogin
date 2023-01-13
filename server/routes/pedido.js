const Joi = require('joi');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');
const { Op } = require("sequelize")
const securityConsts = require('../consts/security-consts');
const { json } = require('sequelize');

knl.post('pedido', async(req, resp) => {
    const schema = Joi.object({
        dtEntrega : Joi.date().raw().required(),
        dtEmissao : Joi.date().raw().required(),
        total     : Joi.number().required(),
        fkCliente : Joi.number().required(),
        fkEndereco: Joi.number().required(),
        
    proPedido       : Joi.array().items(Joi.object({
        description : Joi.string().required(),
        quantidade  : Joi.number().required(),
        acrescimo   : Joi.number().required(),
        vlUnitario  :  Joi.number().required(),
        fkProduto   : Joi.number().required(),
        total       :Joi.number().required(),
        desconto    : Joi.number().required()
            
        }))
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.pedido.findAll({

    });

//     knl.createException('0006', '', !knl.objects.isEmptyArray(result));
//   ;

    const user = knl.sequelize().models.pedido.build({
        dtEmissao : req.body.dtEmissao,
        dtEntrega : req.body.dtEntrega,
        fkCliente : req.body.fkCliente,
        fkEndereco: req.body.fkEndereco,
        total     : req.body.total,
        status    : 1
    });



    await user.save();

    for (const proPedido of req.body.proPedido){
        const result2 = knl.sequelize().models.proPedido.build({
        fkProduto   : proPedido.fkProduto,  
        vlUnitario  : proPedido.vlUnitario,
        quantidade  : proPedido.quantidade,
        acrescimo   : proPedido.acrescimo,
        description : proPedido.description,
        fkPedido    : user.id,
        total       : proPedido.total,
        desconto    : proPedido.desconto,
        status      : 1
    })
      await result2.save();     
    }

    
    resp.end()  
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('pedido', async(req, resp) => {
    let result = await knl.sequelize().models.pedido.findAll({
        where : {
            status:1
            },
    });

    result = knl.objects.copy(result);

    if (!knl.objects.isEmptyArray(result)){
        for(const pedido of result){
            const proPedido = await knl.sequelize().models.proPedido.findAll({
                where : {
                    fkPedido: pedido.id
                }
            })
            if (!knl.objects.isEmptyArray(proPedido)){
                pedido.proPedido_description = proPedido[0].description
            }
            console.log(pedido.proPedido_description)

            const cliente = await knl.sequelize().models.clientes.findAll({
                where : {
                    id: pedido.fkCliente
                }
            })
            if (!knl.objects.isEmptyArray(cliente)){
                pedido.cliente_description = cliente[0].nomeFantasia
            }
            console.log(pedido.cliente_description)
    }
    
    resp.send(result);
    resp.end();


}}, securityConsts.USER_TYPE_PUBLIC);


knl.get('pedido/:id', async(req, resp) => {
    const user = await knl.sequelize().models.proPedido.findAll({
        where: {
            fkPedido: req.params.id
        }
    });
    resp.send(user);
    resp.end();
});

knl.put('pedido', async(req,resp)=>{

    const result = await knl.sequelize().models.pedido.update({
        
        dtEntrega : req.body.dtEntrega,
        dtEmissao : req.body.dtEmissao,
        
    },{
        where : {
            id: req.body.id
        }
    })    

    for (const proPedido of req.body.proPedido){
        const result = knl.sequelize().models.proPedido.update({
            quantidade    : proPedido.quantidade,
            valorUnitario : proPedido.valorUnitario,
            descricao     : proPedido.descricao,
            acrescimo     : proPedido.acrescimo,
            desconto      : proPedido.desconto,
            total         : proPedido.total
        },{
            where : {
                id: proPedido.fkPedido
            }
        }); 
    }
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)

knl.put('pedido/:id', async(req, resp) => {
    const result = await knl.sequelize().models.pedido.update({
        dtEmissao : req.body.dtEmissao,
        dtEntrega : req.body.dtEntrega
    }, {
        where : {
        id : req.body.id
        }      
    });
    for (const pedi of req.body.pedi){
        const result2 = knl.sequelize().models.proPedido.update({
            description : proPedido.description,
            quantidade  : proPedido.quantidade,
            acrescimo   : proPedido.acrescimo,
            desconto    : proPedido.desconto
        },{
            where : {
                id: pedi.id
            }
        })
    
    }
    
    resp.end();
});

knl.delete('pedido', async(req, resp) => {
        const result = await knl.sequelize().models.pedido.destroy({
            where : {
                id : req.body.id
            }
        });
        resp.send(result);
});

knl.patch('pedido', async(req, resp) => {
    const result = await knl.sequelize().models.pedido.update({
    status:0
    },{
         where : {
            id : req.body.id,
        }
    });
    resp.send("result")
});

knl.get('producto/:id', async(req, resp) => {
        if(req.params.id != 0){
            const user = await knl.sequelize().models.produto.findAll({
                where:{
                id : req.params.id
                }
            });
            resp.send(user);
            resp.end();
        }else{
            const user = await knl.sequelize().models.produto.findAll({
                where:{
                    fkGrupo: {
                        [Op.ne]: 0
                      }
                }
            });
            resp.send(user);
            resp.end();
        }
        
    });
    

    knl.get('producto', async(req, resp) => {
        
        let user = await knl.sequelize().models.produto.findAll();
        user = knl.objects.copy(user);

        if(!knl.objects.isEmptyArray(user)){
            for(let produto of user){
                const subGroup = await knl.sequelize().models.subgrupo.findAll({
                    where : {
                        id: produto.fksubGrupo
                    }
                })
                if (!knl.objects.isEmptyArray(subGroup)){
                    produto.subgroup_description = subGroup[0].description
                }
        }

          console.log(produto.subgroup_description)

          
          const group = await knl.sequelize().models.grupo.findAll({
            where : {
                id : produto.fkGrupo
            }
        })

        if (!knl.objects.isEmptyArray(group)){
            produto.group_description = group[0].description
        }
        
        console.log(produto.group_description)

        const colecao = await knl.sequelize().models.colection.findAll({
            where : {
                id : produto.fkColecao
            }
        })

        if (!knl.objects.isEmptyArray(colecao)){
            produto.coleção_description = colecao[0].description
        }
        
        console.log(produto.celeção_description)

    }
    resp.send(user);
    resp.end();
})

