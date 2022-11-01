const Joi = require('joi');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');
const securityConsts = require('../consts/security-consts');

knl.post('cliente', async(req, resp) => {
    const schema = Joi.object({
        nomeFantasia: Joi.string().min(1).max(200).required(),
        cnpj :Joi.string().min(11).max(11).required(),
        razaoSocial:Joi.string().min(1).max(100).required(),
        clienteDesde: Joi.date().raw().required()
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
    resp.end();
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
        clienteDesde:req.body.clienteDesde,
    }, {
        where : {
        id : req.body.id
    }});
    
    resp.send(result);
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