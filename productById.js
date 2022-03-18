const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const sendProdutById = async (req,res) =>{

  const {id} = req.params;
try{  
  const product  = await prisma.$queryRaw`
SELECT products.id, korean_name, english_name, caffein, fat, sugar,sodium, allergies.name FROM products LEFT JOIN products_allergies ON products.id=product_id LEFT JOIN allergies ON allergies.id=allergy_id JOIN nutritions ON products.id=nutritions.product_id WHERE products.id=${id};
  `;

  const fixname =  (product) =>{
    product.map(i=> {i.allergy_name= i.name; delete i.name;})
    return fixOverlap(product);
  };

  // 나중에 알러지 모으기 
  const fixOverlap = (product) =>{
    let allergies = product.map(i=>i.allergy_name).join();
    product[0].allergies = allergies;

   return product[0]
  }

  return res.status(200).json(fixname(product))
}
catch(err){
  console.log(err);
  return res.status(404).end("NOT FOUND")
}


}

module.exports = { sendProdutById } 


// SELECT products.id, korean_name, english_name, caffein, fat, sugar,sodium, allergies.name FROM products LEFT JOIN products_allergies ON products.id=product_id LEFT JOIN allergies ON allergies.id=allergy_id JOIN nutritions ON products.id=nutritions.product_id  
