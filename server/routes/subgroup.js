const Joi = require('joi');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');
const securityConsts = require('../consts/security-consts');

knl.post('subgroup', async(req, resp) => {
    const schema = Joi.object({
        produto : Joi.string().min(1).max(50).required(),
        descrição : Joi.string().min(10).max(200).required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.subgrupo.findAll({
        where : {
            tipoproduto : req.body.produto
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));
  ;

    const user = knl.sequelize().models.subgrupo.build({
        tipoproduto : req.body.produto
    });

    await user.save();
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('subgroup', async(req, resp) => {
    const result = await knl.sequelize().models.grupo.findAll({
    });
    resp.send(result)
});

knl.put('subgroup', async(req, resp) => {
    const result = await knl.sequelize().models.subgrupo.update({
        tipoproduto:req.body.tipoproduto,
    }, {
        where : {
        id : req.body.id
    }});
    
    resp.send(result);
});

knl.delete('group', async(req, resp) => {
        const result = await knl.sequelize().models.subgrupo.destroy({
            where : {
                id : req.body.id
            }
        });
        req.send(user);
});
