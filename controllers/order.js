const myorder = require('../src/models/myorder');
const myproduct = require('../src/models/myproduct');
const myuser = require('../src/models/myuser');
const jwt = require("jsonwebtoken");


module.exports.addproduct = async (req, res) => {
    let data = await myproduct.findById(req.params.id);
    // console.log(req.params.id);
    return res.render('product_detail', {
        record: data
    });

}

module.exports.addtocart = async (req, res) => {
    setTimeout(async function () {
        try {
            if (req.body && req.body.id) {
                const id = req.body.id;
                // console.log(id);

                const { token } = req.cookies;

                const decodedData = jwt.verify(token, process.env.JWT_SECRET);
                // console.log(decodedData);
                req.user = await myuser.findById(decodedData.id);
                // console.log(req.user);


                const product = await myproduct.findById(id);
                if (!product) {
                    throw new Error('Product not found');
                }

                let price = product.price;
                let allquantity = req.body.quantity;

                let totalprice = price * allquantity;

                // console.log(totalprice);

                const { size, color, quantity } = req.body;

                const order = await myorder.create({
                    user: req.user,
                    product: product,
                    size,
                    color,
                    quantity,
                    totalprice
                });

                if (!order) {
                    throw new Error('Failed to create order');
                }

                return res.redirect('/shopingcart');
            }
            return res.redirect('/');

        } catch (err) {
            console.log(err);
            console.error("err");
            return res.redirect('/');
        }
    }, 1000);
};

module.exports.vieworder = async function (req, res) {
    try {
        
        const { token } = req.cookies;

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedData);
        req.user = await myuser.findById(decodedData.id);

        let array = []

        let data = await myorder.find({user : req.user._id }).populate('user').populate('product').exec();

        // console.log(data);
        // console.log(data.product.price);
        let userId;
        data.forEach((order) => {
            // console.log(order.product.price); // access the product information
            // console.log(order.quantity); // access the quantity information
            // let price = order.product.price;
            let totalprice = order.totalprice;
            userId = order.user.id;

            array.push(totalprice);
        });
        // console.log(array);
        // console.log(userId);
        let sum = array.reduce((total, current) => {
            return total + current;
        }, 0);

        // console.log(sum);

        // let str = "123.45678";
        let decimalPart = sum.toFixed(2).split(".")[1];
        let result = parseFloat(sum.toFixed(2));
        // console.log(result);

        let total = result * (18 / 100)

        let maintotal = result + total;
        let grandtotal = parseFloat(maintotal.toFixed(2));

        // console.log(grandtotal);

        // console.log(result);

        if(req.user.id == userId){
            return res.render('shoping_cart', {
                cart: data,
                totalprice: result,
                total: grandtotal
            });
        } else {
            return res.redirect('/product');
        }

        

    } catch (error) {
        console.log(error);
        console.log("err");
        return res.redirect('/');
    }
}

module.exports.address = async (req, res) => {

    let data = await myorder.findById(req.params.id).populate('product').exec();
    // console.log(data);
    // console.log(data);
    // console.log(data.product.price);
    // console.log(data.totalprice);
    let price = data.totalprice;
    // console.log(price);
    let total = price * (18 / 100)
    // console.log(total);
    let maintotal = price + total;
    let grandtotal = parseFloat(maintotal.toFixed(2));

    // console.log(grandtotal);

    // console.log(result);
    // console.log(req.params.id);
    return res.render('address', {
        record: data,
        total: grandtotal
    });

}


module.exports.addresspost = async (req, res) => {
    try {
        const Id = req.body.id;

        let data = await myorder.findById(Id).populate('product').exec();
        // console.log(data);
        // console.log(data.totalprice);

        const { country, state, postcode } = req.body
        // console.log(data);
        let price = data.totalprice;
        // console.log(price);
        let gst = price * (18 / 100)
        // console.log(total);
        let maintotal = price + gst;
        let total = parseFloat(maintotal.toFixed(2));
        // console.log(total);

        let id = req.body.id;

        await myorder.findByIdAndUpdate(id, {
            total, country, state, postcode
        })

        return res.redirect('/');

    } catch (error) {
        console.log("err");
        return res.redirect('back');
    }
}

module.exports.deleteRecord = async (req, res) => {
    const id = req.params.id;
    // console.log(id);

    try {
        let data = await myorder.findByIdAndDelete(id);

        if (data) {
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
};