const Joi = require('joi');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');
const securityConsts = require('../consts/security-consts');

knl.post('coleção', async(req, resp) => {
    const schema = Joi.object({
        descrição : Joi.string().min(10).max(200).required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.coleção.findAll({
        where : {
            tipoproduto : req.body.produto
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));
  ;

    const user = knl.sequelize().models.coleção.build({
        tipoproduto : req.body.produto
    });

    await user.save();
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('coleção', async(req, resp) => {
    const result = await knl.sequelize().models.coleção.findAll({
    });
    resp.send(result)
});

knl.put('coleção', async(req, resp) => {
    const result = await knl.sequelize().models.coleção.update({
        tipoproduto:req.body.tipoproduto,
    }, {
        where : {
        id : req.body.id
    }});
    
    resp.send(result);
});

knl.delete('coleção', async(req, resp) => {
        const result = await knl.sequelize().models.coleção.destroy({
            where : {
                id : req.body.id
            }
        });
        req.send(user);
});
