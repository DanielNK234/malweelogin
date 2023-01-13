const Joi = require('joi');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');
const securityConsts = require('../consts/security-consts');

knl.post('cliente', async(req, resp) => {
    const schema = Joi.object({
        nomeFantasia: Joi.string().min(1).max(200).required(),
        cnpj :Joi.string().min(11).max(11).required(),
        razaoSocial:Joi.string().min(1).max(100).required(),
        clienteDesde: Joi.date().raw().required(),
        
        address : Joi.array().items(Joi.object({
            logradouro : Joi.string().min(1).max(100).required(),
            bairro : Joi.string().min(1).max(100).required(),
            localidade : Joi.string().min(1).max(100).required(),
            uf : Joi.string().min(1).max(100).required(),
            cep : Joi.string().required(),
            numero: Joi.number().integer().required(),
            complemento : Joi.string().min(1).max(100).required()
        }))
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.clientes.findAll({
        where : {
            cnpj :req.body.cnpj
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));
  ;

    const user = knl.sequelize().models.clientes.build({
        status : "1",
        nomeFantasia: req.body.nomeFantasia,
        cnpj :req.body.cnpj,
        razaoSocial:req.body.razaoSocial,
        clienteDesde:req.body.clienteDesde,
    });

    await user.save();

    for (const address of req.body.address){
        const result2 = knl.sequelize().models.endereco.build({
        logradouro  : address.logradouro,
        bairro      : address.bairro,
        localidade  : address.localidade,
        uf          : address.uf,
        cep         : address.cep,
        numero      : address.numero,
        complemento : address.complemento,
        fkCliente   : user.id,
        status      : "1"
        })
      await result2.save();     
    }
    
    resp.end()  
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('cliente', async(req, resp) => {
    const result = await knl.sequelize().models.clientes.findAll({
        where : {
            status : 1,
        }
    });
    resp.send(result)
});
knl.get('cliente/:id', async(req, resp) => {
    const user = await knl.sequelize().models.endereco.findAll({
        where: {
            fkCliente: req.params.id,
            status:1
        }
    });
    resp.send(user);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.put('cliente', async(req, resp) => {
    const result = await knl.sequelize().models.clientes.update({
        nomeFantasia: req.body.nomeFantasia,
        cnpj :req.body.cnpj,
        razãoSocial:req.body.razaoSocial,
        clienteDesde:req.body.clienteDesde
    }, {
        where : {
        id : req.body.id
        }      
    });
    for (const address of req.body.address){
        const result2 = knl.sequelize().models.endereco.update({
            logradouro  : address.logradouro,
            bairro      : address.bairro,
            localidade  : address.localidade,
            uf          : address.uf,
            cep         : address.cep,
            complemento : address.complemento,
            numero      : address.numero
        },{
            where : {
                id: address.id
            }
        })
    }
    
    resp.end();
});

knl.delete('cliente', async(req, resp) => {
        const result = await knl.sequelize().models.clientes.destroy({
            where : {
                id : req.body.id
            }
        });
        resp.send(result);
});

knl.patch('cliente', async(req, resp) => {
    const result = await knl.sequelize().models.clientes.update({
    status:"0"
    },{
         where : {
            id : req.body.id,
        }
    });
    resp.send("result")
});

knl.patch('clientes', async(req, resp) => {
    const results = await knl.sequelize().models.endereco.update({
    status:"0"
    },{
         where : {
            id : req.body.id,
        }
    });
    resp.send("results")
});