const db = require('../util/database');

module.exports = class Manufactwer {
    constructor(PId, PAddress, PName) {
        this.PId = PId;
        this.PAddress = PAddress;
        this.PName = PName;
    }

    // READ
    static fetchAll() {
        return db.execute('SELECT * FROM place');
    }

    static findByPId(PId) {
        return db.execute('SELECT * FROM place where PId = ?', [PId]);
    }

    static deleteByPId(PId) {
        return db.execute(
            'DELETE FROM place WHERE PId = ?', [PId]
        );
    }

    static getCount() {
        return db.execute('SELECT COUNT(*) as count FROM place');
    }

    static add(req, res) {
        //console.log('add():', req.body.name, req.body.price);
        return db.execute('INSERT INTO place (PAddress, PName) VALUES (?, ?)', [req.body.PAddress, req.body.PName]);
    }

    // UPDATE
    static updateByPId(req, res) {
        const PId = req.body.PId;
        const PAddress = req.body.PAddress;
        const PName = req.body.PName;
        //const date = new Date();
        console.log('model:updateByPId()', PId)
        return db.execute(
            'UPDATE place SET PAddress = ?, PName=? WHERE PId = ?', [PAddress, PName, PId]
        );
    }

}