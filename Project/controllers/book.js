const moment = require('moment');

const Book = require('../models/book');
const Detail = require('../models/detail');
const Include = require('../models/include');
const Member = require('../models/member');
const Order = require('../models/order');
const Place = require('../models/place');

exports.getBook = async (req, res, next) => {

    let ABook;
    let Books;
    let BookCount;
    let Details;
    let DetailCount;
    let Includes;
    let IncludeCount;
    let Members;
    let MemberCount;
    let Orders;
    let OrderCount;
    let Places;
    let PlaceCount;

    try {
        const getBooks = await Book.show()
            .then(([rows]) => {
                for (let p of rows) {
                    p.date = moment(p.date).format('MMM D, YYYY');
                }
                ABook = rows;
        })
        const getBook = await Book.fetchAll()
            .then(([rows]) => {
                for (let p of rows) {
                    p.date = moment(p.date).format('MMM D, YYYY');
                }
                Books = rows;
            })

        const getBookCount = await Book.getCount()
            .then(([rows]) => {
                BookCount = rows[0].count;
            })

        const getDetail = await Detail.fetchAll()
            .then(([rows]) => {
                for (let p of rows) {
                    p.date = moment(p.date).format('MMM D, YYYY');
                }
                Details = rows;
            })
        const getDetailCount = await Detail.getCount()
            .then(([rows]) => {
                DetailCount = rows[0].count;
            })

            const getInclude = await Include.fetchAll()
            .then(([rows]) => {
                for (let p of rows) {
                    p.date = moment(p.date).format('MMM D, YYYY');
                }
                Includes = rows;
            })
        const getDIncludeCount = await Include.getCount()
            .then(([rows]) => {
                IncludeCount = rows[0].count;
            })

        const getMember = await Member.fetchAll()
            .then(([rows]) => {
                for (let p of rows) {
                    p.date = moment(p.date).format('MMM D, YYYY');
                }
                Members = rows;
            })
        const getMemberCount = await Member.getCount()
            .then(([rows]) => {
                MemberCount = rows[0].count;
            })

        const getOrder = await Order.fetchAll()
            .then(([rows]) => {
                for (let p of rows) {
                    p.date = moment(p.date).format('MMM D, YYYY');
                }
                Orders = rows;
            })
        const getVehicleLicenceCount = await Order.getCount()
            .then(([rows]) => {
                OrderCount = rows[0].count;
            })

        const getPlace = await Place.fetchAll()
            .then(([rows]) => {
                for (let p of rows) {
                    p.date = moment(p.date).format('MMM D, YYYY');
                }
                Places = rows;
            })
        const getPlaceCount = await Place.getCount()
            .then(([rows]) => {
                PlaceCount = rows[0].count;
            })

        let data = {
            ABook:ABook,
            Books: Books,
            BookCount: BookCount,
            Details: Details,
            DetailCount: DetailCount,
            Includes:Includes,
            IncludeCount:IncludeCount,
            Members: Members,
            MemberCount: MemberCount,
            Orders: Orders,
            OrderCount: OrderCount,
            Places: Places,
            PlaceCount: PlaceCount
        }

        console.log(JSON.stringify(data));
        //res.send(JSON.stringify(data));

        res.render('book', {
            title: 'Book',
            color: 'btn-primary',
            icon: 'fa-cog',
            data: ABook,
            Books:Books,
            BookCount: BookCount,
            Details: Details,
            DetailCount: DetailCount,
            Includes:Includes,
            IncludeCount:IncludeCount,
            Members: Members,
            MemberCount: MemberCount,
            Orders: Orders,
            OrderCount: OrderCount,
            Places: Places,
            PlaceCount: PlaceCount
        });
    } catch (err) {
        console.log(err);
    };

};

exports.getDeleteBook = (req, res, next) => {
    Book.deleteByBId(req.query.BId)
        .then(([rows]) => {
            res.redirect('/');
        })
        .catch();
};

exports.getEditBook = async (req, res, next) => {

    let book;
    let BId;

    const getBook = await Book.fetchAll()
        .then(([rows]) => {
            book = rows;
            //console.log('findCategories(): ', JSON.stringify(rows));
        })

    const findBookByBId = await Book.findByBId(req.query.BId)
        .then(([rows]) => {
            for (let p of rows) {
                p.date = moment(p.date).format('YYYY-MM-DD');
                console.log('p.date: ', p.date);
            }
            BId = rows;
        })
        .catch(err => console.log(err));

    res.render('editBook', {
        data: BId,
        title: 'Edit Book',
        book: book
    });
};

exports.postUpdateBook = (req, res, next) => {

    Book.updateByBId(req, res)
        .then(([rows]) => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

exports.postAddBook = (req, res, next) => {

    Book.add(req, res)
        .then(([rows]) => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
};