
let AllProducts = [];
async function getProducts() {
    const { default: fetch } = await import('node-fetch');

    var requestOptions = {
        method: 'GET',
        headers: { "tenant": "one-stop-wine-shop", "Content-Type": "application/json", "Authorization": "Key" },
        redirect: 'follow'
    };

    let res = await fetch("https://api.commerce7.com/v1/product?cursor=start", requestOptions);
    let product = await res.json();

    //save the cursor
    let cursor = product.cursor;

    console.log(product);
    for (let i = 0; i <= product.products.length - 1; i++) {
        let productObj = {};
        //Check if the product is Wine and that it is available, and the brand is not null
        if (product.products[i].type === "Wine" && product.products[i].webStatus == "Available" && product.products[i].vendor != null) {
            productObj = {
                "id": product.products[i].id,
                "title": product.products[i].title,
                "description": product.products[i].teaser,
                "link": `https://www.onestopwineshop.com/product/${product.products[i].slug}`,
                "image_link": product.products[i].image,
                "availability": product.products[i].webStatus,
                "price": ISOprice(product.products[i].variants[0].price),
                "brand": product.products[i].vendor.title,
                "mpn": product.products[i].variants[0].sku,
                "gtin": product.products[i].variants[0].upcCode,
                "google_product_category": "Food, Beverages & Tobacco > Beverages > Alcoholic Beverages",
                "product_type": "Food, Beverages & Tobacco > Beverages > Alcoholic Beverages"

            }
            AllProducts.push(productObj);
        }
    }


    do {
        res = await fetch(`https://api.commerce7.com/v1/product?cursor=${cursor}`, requestOptions);
        product = await res.json();
        for (let j = 0; j <= product.products.length - 1; j++) {
            let productObj2 = {};
            if (product.products[j].type === "Wine" && product.products[j].webStatus == "Available" && product.products[j].vendor != null) {
                productObj2 = {
                    "id": product.products[j].id,
                    "title": product.products[j].title,
                    "description": product.products[j].teaser,
                    "link": `https://www.onestopwineshop.com/product/${product.products[j].slug}`,
                    "image_link": product.products[j].image,
                    "availability": product.products[j].webStatus,
                    "price": ISOprice(product.products[j].variants[0].price),
                    "brand": product.products[j].vendor.title,
                    "mpn": product.products[j].variants[0].sku,
                    "gtin": product.products[j].variants[0].upcCode,
                    "google_product_category": "Food, Beverages & Tobacco > Beverages > Alcoholic Beverages",
                    "product_type": "Food, Beverages & Tobacco > Beverages > Alcoholic Beverages"

                }
                AllProducts.push(productObj2);
            }
        }

        //redefine the cursor
        if ("cursor" in product) {
            cursor = product.cursor;
        }
    } while ("cursor" in product)

    console.log(AllProducts);

    const txt = jsonToTxt(AllProducts);
    console.log(txt);

    // Import the filesystem module
    const fs = require('fs');

    fs.writeFile("rakuten-catalog.txt", txt, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log(fs.readFileSync("rakuten-catalog.txt", "utf8"));
        }
    });

}

getProducts();


function ISOprice(Price) {
    dividedPrice = Price / 100
    return `${dividedPrice.toFixed(2)} USD`;
}


function jsonToTxt(items) {
    const header = Object.keys(items[0]);
    const headerString = header.join('\t');
    const replacer = (key, value) => value ?? '';
    const rowItems = items.map((row) =>
        header
            .map((fieldName) => JSON.stringify(row[fieldName], replacer))
            .join('\t')
    );
    // join header and body, and break into separate lines
    const csv = [headerString, ...rowItems].join('\r\n');
    return csv;
}














