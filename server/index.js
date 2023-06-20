const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

//Image handling
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/includes/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

//Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'farm-market'
})

app.post("/product/insert", upload.single('image'), (req, res) => {
    const name = req.body.name;
    const ptype = req.body.ptype;
    const qty = req.body.qty;
    const price = req.body.price;
    const expiry = req.body.expiry;
    const categoryId = req.body.categoryId;
    const image = req.file.filename;
    const qry = "INSERT INTO products (Prod_name,Prod_type,Prod_qty,Prod_price,Prod_image1,Prod_expiry,Prod_cat_id) VALUES(?,?,?,?,?,?,?);"
    db.query(qry, [name, ptype, qty, price, image, expiry, categoryId], (err, result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send({ msg: "Order placed Successfully" })
        }
    })
})

app.get("/product/getall", (req, res) => {
    const qry1 = "SELECT * FROM products;"
    db.query(qry1, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})

app.get("/product/get/:id", (req, res) => {
    const id = req.params.id;
    let qry2 = `SELECT * FROM products WHERE Prod_id=${id}`;
    db.query(qry2, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.get("/product/getallcategory", (req, res) => {
    const qry1 = "SELECT * FROM categories;"
    db.query(qry1, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})

app.get("/product/getcategory/:id", (req, res) => {
    const id=req.params.id;
    const qry2 = `SELECT * FROM categories WHERE Category_id=${id};`
    db.query(qry2, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})

app.put("/product/update",upload.single(), (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const ptype = req.body.ptype;
    const qty = req.body.qty;
    const price = req.body.price;
    const expiry = req.body.expiry;
    const categoryId = req.body.categoryId;
    let sql = `UPDATE products SET Prod_name='${name}',Prod_type='${ptype}',Prod_price='${price}',Prod_qty='${qty}',Prod_expiry='${expiry}',Prod_cat_id='${categoryId}' WHERE Prod_id=${id}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({ msg: "Order updated Successfully" })
        }
    })
})

app.delete("/product/delete/:id", (req, res) => {
    const id = req.params.id;
    let qry2 = `DELETE FROM products WHERE Prod_id=${id}`;
    db.query(qry2, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({msg:"Order deleted successfully"})
        }
    })
})



app.listen(8000, () => {
    console.log("Running on port 8000")
})