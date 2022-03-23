const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const allProducts = async () => {
  return await prisma.$queryRaw`
    SELECT korean_name AS ko_name, english_name AS en_name FROM products;
    `;
};
const productById = async (id) => {
  const product = await prisma.$queryRaw`
    SELECT p.id, p.korean_name, english_name, caffein, fat, sugar,sodium, JSON_ARRAYAGG(a.name) as allergy FROM products as p JOIN nutritions as nu ON p.id=nu.product_id LEFT JOIN products_allergies as pa ON p.id=pa.product_id LEFT JOIN allergies as a ON pa.allergy_id=a.id WHERE p.id=${id} GROUP BY p.id, caffein, fat, sugar,sodium;
    `;

  return product;
};

const productLike = async (userId, productId) => {
  await prisma.$queryRaw` 
  INSERT product_like (product_id, user_id) VALUES (${productId}, ${userId})
    `;
};

const productDislike = async (userId, productId) => {
  await prisma.$queryRaw`
  DELETE FROM product_like WHERE user_id=${userId} AND product_id=${productId};
  `;
};

module.exports = { allProducts, productById, productLike, productDislike };
