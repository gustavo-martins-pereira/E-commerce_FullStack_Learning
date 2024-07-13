import db from "../db/models/index.js";

const { Product } = db;

async function createProduct({ name, description, price, ownerId }) {
    return await Product.create({ name, description, price, ownerId });
}

async function getAllProducts() {
    return await Product.findAll();
}

async function getProductById(id) {
    return await Product.findByPk(id);
}

async function getProductByName(name) {
    return await Product.findOne({ where: { name } });
}

async function getProductsBySellerId(sellerId) {
    return await Product.findAll({
        where: {
            ownerId: sellerId
        }
    });
}

async function updateProductById(id, updatedProduct) {
    const [numberOfAffectedRows, affectedRows] = await Product.update(updatedProduct, {
        where: { id },
        returning: true,
    });

    return { numberOfAffectedRows, affectedRows };
}

export {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByName,
    getProductsBySellerId,
    updateProductById,
};
