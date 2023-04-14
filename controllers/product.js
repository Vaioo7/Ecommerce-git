const myproduct = require('../src/models/myproduct');
const ApiFeatures = require('../utils/apifeatures');

module.exports.viewPage = (req, res) => {
    res.render("index");
}


module.exports.product = async (req, res) => {
    // res.render("product");

    const resultPerPage = 8;
    //   const productsCount = await myproduct.countDocuments();

    const apiFeature = new ApiFeatures(myproduct.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    try {
        let data = await apiFeature.query;
        if (data) {
            return res.render('product', {
                'record': data
            });
        }
        else {
            console.log("record not found");
            return res.redirect('/');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/');
    }
}

module.exports.insertproduct = async (req, res) => {
    let data = await myproduct.create(req.body)

    res.status(201).json({
        success: true,
        data,
    });

    if (data) {
        return res.redirect('/');
    }
}


module.exports.getByCategory = async (req, res) => {
    let category = req.params.category;
    let data = await myproduct.find({ category: category });
    // console.log(data);

    return res.render('product', {
        'record': data
    });
}