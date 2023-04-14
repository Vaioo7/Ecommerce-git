const myorder = require('../src/models/myorder');
const myproduct = require('../src/models/myproduct');
const cloudinary = require("cloudinary");

module.exports.home = async (req, res) => {
    res.render("desh_index")
}

module.exports.createproductpage = async (req, res) => {
    res.render("desh_createproduct")
}

module.exports.createproduct = async (req, res) => {

    try {

        const { name, price, category } = req.body;

        req.body.user = req.user.id;
        // console.log(req.body.user);

        const file = req.files.avatar
        console.log(file);

        const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: "product",
        });


        let avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
        console.log(avatar);

        const product = await myproduct.create({
            name, price, category, avatar
        });

        console.log(product);
        return res.redirect('/home')


    } catch (error) {
        console.log(error);
        console.log('error');
        return res.redirect('back');
    }

}

module.exports.allproduct = async (req, res) => {
    try {

        let data = await myorder.find({}).populate('user').populate('product').exec();

        if (data) {
            return res.render('desh_allproduct', {
                'record': data,
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

module.exports.editproduct = async (req, res) => {
    try {
        id = req.params.id;
        let data = await myorder.findById(id).populate('product').exec();
        // console.log(data);
        if (data) {
            return res.render('desh_updateorder_shipping', {
                record: data
            })
        }
    } catch (error) {
        console.log("error");
    }
}


module.exports.Shipping = async (req, res) => {

    try {
        const id = req.body.id;
        // console.log(id);

        const query = { status: 'Pending' };
        const newValues = { $set: { status: 'Shipping' } };

        const data = await myorder.findById(id);
        if (data) {

            const data = await myorder.updateOne(query, newValues)
            return res.redirect('back');
        }
        return res.redirect('/');

    } catch (err) {
        console.error("err");
        return res.redirect('/');
    }
}

module.exports.editproductDelivered = async (req, res) => {
    try {
        id = req.params.id;
        let data = await myorder.findById(id).populate('product').exec();
        // console.log(data);
        if (data) {
            return res.render('desh_updateorder_delivered', {
                record: data
            })
        }
    } catch (error) {
        console.log("error");
    }
}


module.exports.Delivered = async (req, res) => {

    try {
        const id = req.body.id;
        // console.log(id);

        const query = { status: 'Shipping' };
        const newValues = { $set: { status: 'Delivered' } };

        const data = await myorder.findById(id);
        if (data) {

            const data = await myorder.updateOne(query, newValues)
            return res.redirect('/All_product');
        }
        return res.redirect('back');

    } catch (err) {
        console.error("err");
        return res.redirect('/');
    }
}