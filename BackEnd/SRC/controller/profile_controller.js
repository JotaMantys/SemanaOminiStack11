const connection = require('../database/connection');

module.exports = {
    async index(request,response){
            const ong = request.headers.authorization;

            const incidents = await connection('incidents')
                .join('ongs',)
                .where('ong_id',ong)
                .select('*')

            return response.json(incidents)
    }

    }