const moment = require('moment');

const Order = require('../models/order');
const Member = require('../models/member');

exports.getOrder = (req, res, next) => {
    Order.fetchAll()
        .then(([rows]) => {
            for (let p of rows) {
                p.date = moment(p.date).format('MMM D, YYYY');
            }
            //console.log(JSON.stringify(rows));
            //res.send(JSON.stringify(rows));
            res.render('order', {
                data: rows,
                title: 'Order List',
            });
        })
        .catch(err => console.log(err));
};

exports.getDeleteOrder = (req, res, next) => {
    Order.deleteByOId(req.query.OId)
        .then(([rows]) => {
            res.redirect('/order');
        })
        .catch();
};

exports.getEditOwner = async (req, res, next) => {

    let order;
    let OId;
    let MId;

    const getOrder = await Order.fetchAll()
        .then(([rows]) => {
            order = rows;
            //console.log('findCategories(): ', JSON.stringify(rows));
        })

    const getMId = await Member.fetchAll()
        .then(([rows]) => {
            MId = rows;
        })

    const findOrderByOId = await Order.findByOId(req.query.OId)
        .then(([rows]) => {
            for (let p of rows) {
                p.date = moment(p.date).format('YYYY-MM-DD');
                console.log('p.date: ', p.date);
            }
            OId = rows;
            //console.log('post[0].date: ', post[0].date);
            //console.log('findPostById(): ', JSON.stringify(OwnerId));
        })
        .catch(err => console.log(err));

    res.render('editOrder', {
        data: OId,
        title: 'Edit Order',
        order: order,
        MId: MId
    });

};

exports.postUpdateOrder = (req, res, next) => {

    Order.updateByOId(req, res)
        .then(([rows]) => {
            res.redirect('/order');
        })
        .catch(err => console.log(err));
};

exports.postAddOrder = (req, res, next) => {

    Order.add(req, res)
        .then(([rows]) => {
            res.redirect('/order');
        })
        .catch(err => console.log(err));
};