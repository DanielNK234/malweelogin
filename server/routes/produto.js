const Joi = require('joi');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');
const securityConsts = require('../consts/security-consts');

knl.post('produto', async(req, resp) => {
    const schema = Joi.object({
        description : Joi.string().min(1).max(200).required(),
        precoVenda : Joi.string().min(1).max().required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.produto.findAll({
        where : {
            description : req.body.description,
            precoVenda : req.body.precoVenda
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));
  ;

    const user = knl.sequelize().models.produto.build({
        description : req.body.description,
        precoVenda: req.body.precoVenda,
        fkGrupo : 1,
        fksubGrupo : 1,
        fkColecao : 1
    });

    await user.save();
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('produto', async(req, resp) => {
    const result = await knl.sequelize().models.produto.findAll({

    });
    resp.send(result)
});

knl.put('produto', async(req, resp) => {
    const result = await knl.sequelize().models.produto.update({
        description : req.body.description,
        precoVenda : req.body.precoVenda
    }, {
        where : {
        id : req.body.id
    }});
    
    resp.send(result);
});

knl.delete('produto', async(req, resp) => {
        const result = await knl.sequelize().models.produto.destroy({
            where : {
                id : req.body.id
            }
        });
        req.send(user);
});

knl.patch('produto', async(req, resp) => {
    const result = await knl.sequelize().models.produto.update({
    fkGrupo:"0"
    },
    {
         where : {
            id : req.body.id,
            
        }
    });
    resp.send("result")
});
