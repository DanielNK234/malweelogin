const Joi = require('joi');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');
const securityConsts = require('../consts/security-consts');

knl.post('colection', async(req, resp) => {
    const schema = Joi.object({
        description : Joi.string().min(10).max(200).required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.colection.findAll({
        where : {
            description : req.body.description
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));
  ;

    const user = knl.sequelize().models.colection.build({
        status : "1",
        description : req.body.description
    });

    await user.save();
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('colection', async(req, resp) => {
    const result = await knl.sequelize().models.colection.findAll({
        where: {
            status:1
    }   
    });
    resp.send(result)
});

knl.put('colection', async(req, resp) => {
    const result = await knl.sequelize().models.colection.update({
        description : req.body.description,
    }, {
        where : {
        id : req.body.id
    }});
    
    resp.send(result);
});

knl.delete('colection', async(req, resp) => {
        const result = await knl.sequelize().models.colection.destroy({
            where : {
                id : req.body.id
            }
        });
        req.send(user);
});

knl.patch('colection', async(req, resp) => {
    const result = await knl.sequelize().models.colection.update({
        status:0
    },
    {
         where : {
            id : req.body.id,
            
        }
    });
    resp.send("result")
});

