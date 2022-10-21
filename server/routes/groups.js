const Joi = require('joi');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');
const securityConsts = require('../consts/security-consts');

knl.post('group', async(req, resp) => {
    const schema = Joi.object({
        description : Joi.string().min(1).max(200).required(),
       
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.grupo.findAll({
        where : {
           
            description : req.body.description
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));
  

    const user = knl.sequelize().models.grupo.build({
        status : "1",
        description : req.body.description
    });

    await user.save();
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('group', async(req, resp) => {
    const result = await knl.sequelize().models.grupo.findAll({
    status:req.body.status
    });
    resp.send(result)
});

knl.put('group', async(req, resp) => {
    const result = await knl.sequelize().models.grupo.update({
        descrição:req.body.description,
    }, {
        where : {
        id : req.body.id
    }});
    
    resp.send(result);
});

knl.delete('group', async(req, resp) => {
        const result = await knl.sequelize().models.grupo.destroy({
            where : {
                id : req.body.id
            }
        });
        req.send(result);
});

knl.patch('group', async(req, resp) => {
    const result = await knl.sequelize().models.grupo.update({
    status:"0"
    },{
         where : {
            id : req.body.id,
            
        }
    });
    resp.send("result")
});
