const ProductController = require('../controllers/product.controller');

module.exports = app => {
    app.get("/api/products/all", ProductController.findAll);
    app.post("/api/products/create", ProductController.createProduct)
    app.get("/api/products/:_id", ProductController.findOne)
    app.delete("/api/products/:_id", ProductController.deleteOne)
    app.put("/api/products/:_id", ProductController.updateOne)
}
