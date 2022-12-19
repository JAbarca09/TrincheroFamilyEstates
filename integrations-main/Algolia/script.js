//first we need to get all the data and save it to a variable
//the fetching needs to keep happening with the new cursor from every fetch until no cursor is provided. Around 900 times


async function getProducts() {
    let AllProducts = [];

    var myHeaders = new Headers();
    myHeaders.append("tenant", "one-stop-wine-shop");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Key");


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let res = await fetch("https://api.commerce7.com/v1/product?cursor=start", requestOptions);
    let product = await res.json();

    //save the cursor
    let cursor = product.cursor;

    // while(while cursor is inside the fetch keep going){
    //     //fetch data
    //     //push data into all products: formatting etc
    //     //save the new cursor
    // }

    //now we need all the wines that have vendrors

    for (let i = 0; i <= product.products.length - 1; i++) {
        let productObj = {};
        //Check if the product is Wine and that it is available
        if (product.products[i].type === "Wine" && product.products[i].webStatus == "Available") {
            //Does the wine have a vendor.title?
            if ("vendor" in product.products[i]) {
                if (product.products[i].vendor == null || product.products[i].metaData.algoliabadgeurl != "") {
                    let dietaryPreference1 = formatDietaryPreference(product.products[i].metaData.winecategory);
                    let badgeSlug1;
                    //check the value of badge, if it has a badge place it otherwise set it to null

                    if (product.products[i].metaData.algoliabadgeurl == null || product.products[i].metaData.algoliabadgeurl == "") {
                        badgeSlug1 = null;
                    } else {
                        badgeSlug1 = `https://www.onestopwineshop.com/wp-content/themes/onestop/assets/images/badges/${product.products[i].metaData.algoliabadgeurl}`;
                    }

                    productObj = {
                        "objectID": product.products[i].id,
                        "title": product.products[i].title,
                        "image": product.products[i].image,
                        "type": product.products[i].type,
                        "webStatus": product.products[i].webStatus,
                        "slug": `https://www.onestopwineshop.com/product/${product.products[i].slug}`,
                        "createdAt": product.products[i].createdAt,
                        "vendor": null,
                        "dietaryPreference": {
                            "lvl0": dietaryPreference1
                        },
                        "badge": product.products[i].metaData.badge,
                        "winetype": product.products[i].wine.type,
                        "wineVarietal": product.products[i].wine.varietal,
                        "countrycode": product.products[i].wine.countryCode,
                        "Price": product.products[i].variants[0].price / 100,
                        "appellation": product.products[i].wine.appellation,
                        "region": product.products[i].wine.region,
                        "bottlesize": product.products[i].variants[0].title,
                        "algoliaSearchKeywords": product.products[i].metaData.algoliasearchkeywords,
                        "wineScore": product.products[i].metaData.algoliawinescore,
                        "badgeSlug": badgeSlug1
                    }
                    console.log(product.products[i].metaData.winecategory);
                    AllProducts.push(productObj);
                } else {
                    let dietaryPreference2 = formatDietaryPreference(product.products[i].metaData.winecategory);

                    let badgeSlug2;
                    //check the value of badge, if it has a badge place it otherwise set it to null

                    if (product.products[i].metaData.algoliabadgeurl == null || product.products[i].metaData.algoliabadgeurl == "") {
                        badgeSlug2 = null;
                    } else {
                        badgeSlug2 = `https://www.onestopwineshop.com/wp-content/themes/onestop/assets/images/badges/${product.products[i].metaData.algoliabadgeurl}`;
                    }
                    productObj = {
                        "objectID": product.products[i].id,
                        "title": product.products[i].title,
                        "image": product.products[i].image,
                        "type": product.products[i].type,
                        "webStatus": product.products[i].webStatus,
                        "slug": `https://www.onestopwineshop.com/product/${product.products[i].slug}`,
                        "createdAt": product.products[i].createdAt,
                        "vendor": product.products[i].vendor.title,
                        "dietaryPreference": {
                            "lvl0": dietaryPreference2
                        },
                        "badge": product.products[i].metaData.badge,
                        "winetype": product.products[i].wine.type,
                        "wineVarietal": product.products[i].wine.varietal,
                        "countrycode": product.products[i].wine.countryCode,
                        "Price": product.products[i].variants[0].price / 100,
                        "appellation": product.products[i].wine.appellation,
                        "region": product.products[i].wine.region,
                        "bottlesize": product.products[i].variants[0].title,
                        "algoliaSearchKeywords": product.products[i].metaData.algoliasearchkeywords,
                        "wineScore": product.products[i].metaData.algoliawinescore,
                        "badgeSlug": badgeSlug2

                    }
                    AllProducts.push(productObj);
                }
            }
        }

        //push data into  AllProducts array
        //dietaryPreference, badge, appellation, region, algoliasearchkeywords check for key exist, if not ignore
        console.log(product.products[i])
    }


    do {
        res = await fetch(`https://api.commerce7.com/v1/product?cursor=${cursor}`, requestOptions);
        product = await res.json();
        for (let j = 0; j <= product.products.length - 1; j++) {
            let productObj2 = {};
            if (product.products[j].type === "Wine" && product.products[j].webStatus == "Available") {
                if ("vendor" in product.products[j]) {
                    if (product.products[j].vendor == null) {
                        let dietaryPreference3 = formatDietaryPreference(product.products[j].metaData.winecategory);

                        let badgeSlug3;
                        //check the value of badge, if it has a badge place it otherwise set it to null

                        if (product.products[j].metaData.algoliabadgeurl == null || product.products[j].metaData.algoliabadgeurl == "") {
                            badgeSlug3 = null;

                        } else {
                            badgeSlug3 = `https://www.onestopwineshop.com/wp-content/themes/onestop/assets/images/badges/${product.products[j].metaData.algoliabadgeurl}`;
                        }

                        productObj2 = {
                            "objectID": product.products[j].id,
                            "title": product.products[j].title,
                            "image": product.products[j].image,
                            "type": product.products[j].type,
                            "webStatus": product.products[j].webStatus,
                            "slug": `https://www.onestopwineshop.com/product/${product.products[j].slug}`,
                            "createdAt": product.products[j].createdAt,
                            "vendor": null,
                            "dietaryPreference": {
                                "lvl0": dietaryPreference3
                            },
                            "badge": product.products[j].metaData.badge,
                            "winetype": product.products[j].wine.type,
                            "wineVarietal": product.products[j].wine.varietal,
                            "countrycode": product.products[j].wine.countryCode,
                            "Price": product.products[j].variants[0].price / 100,
                            "appellation": product.products[j].wine.appellation,
                            "region": product.products[j].wine.region,
                            "bottlesize": product.products[j].variants[0].title,
                            "algoliaSearchKeywords": product.products[j].metaData.algoliasearchkeywords,
                            "wineScore": product.products[j].metaData.algoliawinescore,
                            "badgeSlug": badgeSlug3

                        }
                        AllProducts.push(productObj2);
                    } else {
                        let dietaryPreference4 = formatDietaryPreference(product.products[j].metaData.winecategory);

                        let badgeSlug4;
                        //check the value of badge, if it has a badge place it otherwise set it to null

                        if (product.products[j].metaData.algoliabadgeurl == null || product.products[j].metaData.algoliabadgeurl == "") {
                            badgeSlug4 = null;
                        } else {
                            badgeSlug4 = `https://www.onestopwineshop.com/wp-content/themes/onestop/assets/images/badges/${product.products[j].metaData.algoliabadgeurl}`;
                        }

                        productObj2 = {
                            "objectID": product.products[j].id,
                            "title": product.products[j].title,
                            "image": product.products[j].image,
                            "type": product.products[j].type,
                            "webStatus": product.products[j].webStatus,
                            "slug": `https://www.onestopwineshop.com/product/${product.products[j].slug}`,
                            "createdAt": product.products[j].createdAt,
                            "vendor": product.products[j].vendor.title,
                            "dietaryPreference": {
                                "lvl0": dietaryPreference4
                            },
                            "badge": product.products[j].metaData.badge,
                            "winetype": product.products[j].wine.type,
                            "wineVarietal": product.products[j].wine.varietal,
                            "countrycode": product.products[j].wine.countryCode,
                            "Price": product.products[j].variants[0].price / 100,
                            "appellation": product.products[j].wine.appellation,
                            "region": product.products[j].wine.region,
                            "bottlesize": product.products[j].variants[0].title,
                            "algoliaSearchKeywords": product.products[j].metaData.algoliasearchkeywords,
                            "wineScore": product.products[j].metaData.algoliawinescore,
                            "badgeSlug": badgeSlug4

                        }
                        AllProducts.push(productObj2);
                    }
                }

            }
            //push data into  AllProducts array
            //dietaryPreference, badge, appellation, region, algoliasearchkeywords check for key exist, if not ignore
        }

        //redefine the cursor
        if ("cursor" in product) {
            cursor = product.cursor;
        }
    } while ("cursor" in product)
    // Write cars object to file..
    //get array to be written in json File!

    console.log(AllProducts)
    let injection = document.getElementById('injection');
    injection.innerHTML = JSON.stringify(AllProducts);

}

getProducts();

//usually its a string separated by commas, or its null!
function formatDietaryPreference(str) {
    //check if the string is null
    let DietaryPreferenceArr;
    if (str != null) {
        DietaryPreferenceArr = str.split(",");
    } else {
        DietaryPreferenceArr = null;
    }
    return DietaryPreferenceArr
}

// test1 = "vegan-wines,eco-minded,gluten-free";
// test2 = null;
// result = formatDietaryPreference(test2)
// console.log(result);