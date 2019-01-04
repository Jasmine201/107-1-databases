const db = require('../util/database');

module.exports = class book {
    constructor(BId, BName, BKeyword, PAddress, OStatus, DEnd) {
        this.BId = BId;
        this.BName = BName;
        this.BKeyword = BKeyword;
        this.PAddress = PAddress;
        this.OStatus = OStatus;
        this.DEnd = DEnd;
    }

    // READ
    static fetchAll(){
        return db.execute('SELECT * FROM book');
    }
    static show() {
        return db.execute('SELECT pb.BId, pb.BName, pb.BKeyword, pp.PAddress, po.OStatus, pd.DEnd FROM project.book pb, project.detail pd, project.include pi, project.member pm, project.order po, project.place pp where pm.MId = po.MId and po.OId = pd.OId and pi.OId = po.OId and pd.PId = pp.PId and pi.PId = pp.PId and pb.BId = pi.BId;');
    }

    static findByBId(BId) {
        return db.execute('SELECT * FROM book where BId = ?', [BId]);
    }

    static deleteByBId(BId) {
        return db.execute(
            'DELETE FROM book WHERE BId = ?', [BId]
        );
    }

    static getCount() {
        return db.execute('SELECT COUNT(*) as count FROM book');
    }

    static add(req, res) {
        //console.log('add():', req.body.name, req.body.price);
        return db.execute(
            'INSERT INTO book (BName, BKeyword) VALUES (?, ?)',
            [req.body.BName, req.body.BKeyword]
        );
    }

    // UPDATE
    static updateByBId(req, res) {
        const BId = req.body.BId;
        const BName = req.body.BName;
        const BKeyword = req.body.BKeyword;
        return db.execute(
            'UPDATE book SET BId=?, BName=?, BKeyword=? WHERE BId = ?', [BId, BName, BKeyword, BId]
        );
    }

}