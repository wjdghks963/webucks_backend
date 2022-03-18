-- insert categories data

INSERT INTO categories(name)
VALUES ("콜드 브루 커피"),("브루드 커피"), ("에스프레소"), ("프라푸치노"),("불랜디드");

-- insert products data

INSERT INTO products(korean_name, english_name, category_id)
VALUES("나이트로 콜르 브루","Nitro Cold Brew",1), ("돌체 콜드 브루","Dolce Cold Brew",1), ("아이스 커피","Iced Coffee",2), ("오늘의 커피","Brewed Coffee",2), ("에스프레소 콘 파나","Espresso Con Panna",3), ("모카 프라푸치노","Mocha Frappuccino",4), ("딸기 딜라이트 요거트 블렌디드","Strawberry Delight Yogurt Blended",5);
