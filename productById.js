const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const sendProdutById = async (req,res) =>{

  const {id} = req.params;
try{  
  const product  = await prisma.$queryRaw`
  SELECT p.id, p.korean_name, english_name, caffein, fat, sugar,sodium, JSON_ARRAYAGG(a.name) as allergy FROM products as p JOIN nutritions as nu ON p.id=nu.product_id LEFT JOIN products_allergies as pa ON p.id=pa.product_id LEFT JOIN allergies as a ON pa.allergy_id=a.id WHERE p.id=${id} GROUP BY p.id, caffein, fat, sugar,sodium;
  `;
  
  return res.status(200).json(product)
}
catch(err){
  console.log(err);
  return res.status(404).end("NOT FOUND")
}


}

module.exports = { sendProdutById } 


// SELECT products.id, korean_name, english_name, caffein, fat, sugar,sodium, allergies.name FROM products LEFT JOIN products_allergies ON products.id=product_id LEFT JOIN allergies ON allergies.id=allergy_id JOIN nutritions ON products.id=nutritions.product_id  
