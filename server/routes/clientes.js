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
            rua : Joi.string().min(1).max(100).required(),
            bairro : Joi.string().min(1).max(100).required(),
            cidade : Joi.string().min(1).max(100).required(),
            estado : Joi.string().min(1).max(100).required(),
            cep : Joi.number().integer().required(),
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
        clienteDesde:req.body.clienteDesde
    });

    await user.save();

    for (const address of req.body.address){
        const result2 = knl.sequelize().models.endereco.build({
        rua : address.rua,
        bairro : address.bairro,
        cidade : address.cidade,
        estado : address.estado,
        cep : address.cep,
        numero :  address.numero,
        complemento : address.complemento,
        fkCliente : user.id
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

knl.put('cliente', async(req, resp) => {
    const result = await knl.sequelize().models.clientes.update({
        nomeFantasia: req.body.nomeFantasia,
        cnpj :req.body.cnpj,
        razãoSocial:req.body.razaoSocial,
        clienteDesde:req.body.clienteDesde
    }, {
        where : {
        id : req.body.id
    }});
    
    
    
    resp.send(result);
    resp.send(result2);
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