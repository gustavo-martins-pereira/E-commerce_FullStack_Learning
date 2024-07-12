import db from "../db/models/index.js";

const { Product } = db;

async function createProduct({ name, description, price, ownerId }) {
    return await Product.create({ name, description, price, ownerId });
}

async function getProductByName(name) {
    return await Product.findOne({ where: { name } });
}

export {
    createProduct,
    getProductByName,
};
