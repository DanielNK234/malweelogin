const Joi = require('joi');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');
const securityConsts = require('../consts/security-consts');

knl.post('subgroup', async(req, resp) => {
    const schema = Joi.object({
        description : Joi.string().min(1).max(200).required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.subgrupo.findAll({
        where : {
            description : req.body.description
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));
  ;

    const user = knl.sequelize().models.subgrupo.build({
        fkGrupo : "1",
        description : req.body.description
    });

    await user.save();
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('subgroup', async(req, resp) => {
    const result = await knl.sequelize().models.subgrupo.findAll({
    });
    resp.send(result)
});

knl.put('subgroup', async(req, resp) => {
    const result = await knl.sequelize().models.subgrupo.update({
        description : req.body.description,
    }, {
        where : {
        id : req.body.id
    }});
    
    resp.send(result);
});

knl.delete('subgroup', async(req, resp) => {
        const result = await knl.sequelize().models.subgrupo.destroy({
            where : {
                id : req.body.id
            }
        });
        req.send(user);
});

knl.patch('subgroup', async(req, resp) => {
    const result = await knl.sequelize().models.subgrupo.update({
    fkGrupo:"0"
    },
    {
         where : {
            id : req.body.id,
            
        }
    });
    resp.send("result")
});
