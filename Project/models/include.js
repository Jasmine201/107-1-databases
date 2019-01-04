const db = require('../util/database');

module.exports = class include {
    constructor(PId, OId, BId) {
        this.PId = PId;
        this.OId = OId;
        this.BId = BId;
    }

    // READ
    static fetchAll() {
        return db.execute('SELECT * FROM include');
    }

    static findByPId(PId, OId, BId) {
        console.log('model include: ','1',PId,'2',OId,'3',BId);
        return db.execute('SELECT * FROM include where PId=? ', [PId]);
    }

    static deleteByPId(PId) {
        return db.execute(
            'DELETE FROM include WHERE PId = ?', [PId]
        );
    }

    static getCount() {
        return db.execute('SELECT COUNT(*) as count FROM include');
    }

    static add(req, res) {
        //console.log('add():', req.body.name, req.body.price);
        return db.execute(
            'INSERT INTO include (PId, OId, BId) VALUES (?, ?, ?)',
            [req.body.PId, req.body.OId, req.body.BId]
        );
    }

    // UPDATE
    static updateByPId(req, res) {
        const PId = req.body.PId;
        const PId1 = req.body.PId1;
        const OId = req.body.OId;
        const BId = req.body.BId;
        console.log(PId,PId1,OId,BId);
        return db.execute(
            'UPDATE include SET PId=?, OId=?, BId=? WHERE PId = ?', [PId1, OId, BId, PId]
        );
    }

}