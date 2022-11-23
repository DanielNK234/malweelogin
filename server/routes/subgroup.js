const Joi = require('joi');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');
const securityConsts = require('../consts/security-consts');

knl.post('subgroup', async(req, resp) => {
    const schema = Joi.object({
        description : Joi.string().min(1).max(200).required(),
        fkGrupo: Joi.number().required()
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
       fkGrupo:req.body.fkGrupo,
        description : req.body.description,
        status:"1"
    });

    await user.save();
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('subgroup', async(req, resp) => {
    let result = await knl.sequelize().models.subgrupo.findAll({
        status:"1"
    });

    result = knl.objects.copy(result);

    if (!knl.objects.isEmptyArray(result)){
        for(let subGrupo of result){
            const group = await knl.sequelize().models.grupo.findAll({
                where : {
                    id : subGrupo.fkGrupo
                }
            })

            if (!knl.objects.isEmptyArray(group)){
                subGrupo.group_description = group[0].description
            }

            console.log(subGrupo.group_description)
        }
    }
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
