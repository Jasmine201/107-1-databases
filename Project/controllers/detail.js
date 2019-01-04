const moment = require('moment');

const Detail = require('../models/detail');
const Order = require('../models/order');
const Place = require('../models/place');

exports.getDetail = (req, res, next) => {
    Detail.fetchAll()
        .then(([rows]) => {
            for (let p of rows) {
                p.date = moment(p.date).format('MMM D, YYYY');
            }
            //console.log(JSON.stringify(rows));
            //res.send(JSON.stringify(rows));
            res.render('detail', {
                data: rows,
                title: 'Deatil List',
            });
        })
        .catch(err => console.log(err));
};

exports.getDeleteDetail = (req, res, next) => {
    Detail.deleteByDStart(req.query.DStart)
        .then(([rows]) => {
            res.redirect('/detail');
        })
        .catch();
};

exports.getEditDetail = async (req, res, next) => {

    let detail;
    let dstart;
    let OId;
    let PId;

    const getOrderId = await Order.fetchAll()
        .then(([rows]) => {
            OId = rows;
        })

    const getPId = await Place.fetchAll()
        .then(([rows]) => {
            PId = rows;
        })

    const getDetail = await Detail.fetchAll()
        .then(([rows]) => {
            detail = rows;
            //console.log('findCategories(): ', JSON.stringify(rows));
        })

    const findDetailByDStart = await Detail.findByDStart(req.query.DStart)
        .then(([rows]) => {
            for (let p of rows) {
                p.date = moment(p.date).format('YYYY-MM-DD');
                console.log('p.date: ', p.date);
            }
            dstart = rows;
            //console.log('post[0].date: ', post[0].date);
            //console.log('findPostById(): ', JSON.stringify(rows));
        })
        .catch(err => console.log(err));

    res.render('editDetail', {
        data: dstart,
        title: 'Edit Detail',
        detail: detail,
        OId: OId,
        PId: PId
    });

};

exports.postUpdateDetail = (req, res, next) => {

    Detail.updateByDStart(req, res)
        .then(([rows]) => {
            res.redirect('/detail');
        })
        .catch(err => console.log(err));
};

exports.postAddDetail = (req, res, next) => {

    Detail.add(req, res)
        .then(([rows]) => {
            res.redirect('/detail');
        })
        .catch(err => console.log(err));
};