const connection = require('../database/connection');

module.exports = {
    async index(request,response){
            const ong = request.headers.authorization;

            const incidents = await connection('incidents')
                .join('ongs', 'ongs.id' ,'=','incidents.ong_id')
                .where('ong_id',ong)
                .select(['incidents.*' 
                , 'ongs.name'
                , 'ongs.email'
                , 'ongs.whatsapp'
                , 'ongs.city'
                , 'ongs.uf'])

            return response.json(incidents)
    }

    }