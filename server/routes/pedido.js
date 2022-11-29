const Joi = require('joi');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');
const { Op } = require("sequelize")
const securityConsts = require('../consts/security-consts');

knl.post('pedido', async(req, resp) => {
    const schema = Joi.object({
        dtEntrega : Joi.date().raw().required(),
        dtEmissao : Joi.date().raw().required(),
        
    poPedido        : Joi.array().items(Joi.object({
        description : Joi.string().min(1).max().required(),
        quantidade  : Joi.number().min(1).max().required(),
        acrescimo   : Joi.number().min(1).max().required()
            
        }))
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.pedido.findAll({
        where : {
            dtEmissao : req.body.dtEmissao,
            dtEntrega : req.body.dtEntrega
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));
  ;

    const user = knl.sequelize().models.pedido.build({
        dtEmissao : req.body.dtEmissao,
        dtEntrega : req.body.dtEntrega
    });

    await user.save();

    for (const proPedido of req.body.proPedido){
        const result2 = knl.sequelize().models.proPedido.build({
        description : proPedido.description,
        quantidade  : proPedido.quantidade,
        acrescimo   : proPedido.acrescimo,
        fkCliente   : user.pedido
        })
      await result2.save();     
    }
    
    resp.end()  
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('pedido', async(req, resp) => {
    let result = await knl.sequelize().models.pedido.findAll({
        where : {
            id:{
                [Op.ne]:0

                }
            }
    });
    
    result = knl.objects.copy(result);

    if (!knl.objects.isEmptyArray(result)){
        for(let propedidos of result){
            const client = await knl.sequelize().models.cliente.findAll({
                where : {
                    id : propedidos.fkCliente
                }
            })

            if (!knl.objects.isEmptyArray(client)){
                propedidos.cliente_nomeFantasia = client[0].nomeFantasia
            }

            console.log( propedidos.cliente_nomeFantasia)
        }
    }
    resp.send(result)
    resp.send(result)

});
knl.get('pedido/:id', async(req, resp) => {
    const user = await knl.sequelize().models.proPedido.findAll({
        where: {
            fkCliente: req.params.id,
            where : {
                id:{
                    [Op.ne]:0
                    }
                }
        }
    });
    resp.send(user);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.put('pedido', async(req, resp) => {
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

knl.patch('cliente', async(req, resp) => {
    const result = await knl.sequelize().models.pedido.update({
    id:0
    },{
         where : {
            id : req.body.id,
        }
    });
    resp.send("result")
});

knl.patch('clientes', async(req, resp) => {
    const results = await knl.sequelize().models.proPedido.update({
    id:0
    },{
         where : {
            id : req.body.id,
        }
    });
    resp.send("results")
});