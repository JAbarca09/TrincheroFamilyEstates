exports.handler = async (event) => {
    // TODO implement
    const c7payload = JSON.parse(event.body); //c7payload.payload to get to the information provided on Commerce7
    const { default: fetch } = await import('node-fetch'); //defining fetch for later use

    var options = {};

    //still need to do is_blocklisted it is on c7 updates but not on creates
    //price = price / 100 because prices are in the thousands ex: 2500 / 100 = $25
    //brand: c7payload.payload.vendor.title is needed for updating product it is null when a product is created
    console.log(c7payload);

    //verify the token
    const generateUToken = {
        method: 'POST',
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: 'Key' })
    };


    await fetch('https://api.yotpo.com/core/v3/stores/storeID/access_tokens', generateUToken)
        .then(response => response.json())
        .then(UTokenData => {
            console.log(UTokenData.access_token);

            options = {
                statusCode: 200,
                method: 'PATCH',
                headers: { accept: 'application/json', 'X-Yotpo-Token': UTokenData.access_token, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product: {
                        external_id: c7payload.payload.id,
                        name: c7payload.payload.title,
                        description: c7payload.payload.teaser,
                        url: `https://www.onestopwineshop.com/product/${c7payload.payload.slug}`,
                        image_url: c7payload.payload.image,
                        price: c7payload.payload.variants[0].price / 100,
                        currency: "USD",
                        sku: c7payload.payload.variants[0].sku,
                        mpn: null,
                        custom_properties: {
                            is_blocklisted: false,
                            review_form_tag: null
                        }
                    }
                })
            };

            let retrieveProduct = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'X-Yotpo-Token': UTokenData.access_token,
                    'Content-Type': 'application/json'
                }
            };

            let yotpoProduct;
            //fetch for retriving Yotpo-Id
            fetch(`https://api.yotpo.com/core/v3/stores/storeID/products?external_ids=${c7payload.payload.id}`, retrieveProduct)
                .then(response => response.json())
                .then(data => {
                    yotpoProduct = data;
                    console.log(yotpoProduct.products[0].yotpo_id);
                    YotpoFetch(yotpoProduct.products[0].yotpo_id, options);
                })
                .catch(err => console.error(err));

            //update the YotpoProduct on Yotpo's end via YotpoId
            function YotpoFetch(yotpoId, fetchParameters) {
                fetch(`https://api.yotpo.com/core/v3/stores/storeID/products/${yotpoId}`, fetchParameters)
                    .then(response => response.json())
                    .then(response => console.log(response))
                    .catch(err => console.error(err));
            }
        })
        .catch(err => console.error(err));


    //send data over to commerce7
    let commerce7UpdateProductHeader = {
        statusCode: 200,
        method: "PUT",
        headers: {
            tenant: "one-stop-wine-shop",
            "Content-Type": "application/json",
            Authorization: "Key",
        },
        body: JSON.stringify({
            metaData: {
                "yotpo-star-rating": `<div class=\"yotpo bottomLine\" data-yotpo-product-id=\"${c7payload.payload.variants[0].sku}\"></div>`,
                "yotpo-review-widget": `<div class=\"yotpo yotpo-main-widget\" data-product-id=\"${c7payload.payload.variants[0].sku
                    }\" data-price=\"${c7payload.payload.variants[0].price / 100
                    }\" data-currency=\"USD\" data-name=\"${c7payload.payload.title
                    }\" data-url=\"https://onestopwineshop.com/product/${c7payload.payload.slug
                    }\" data-image-url=\"${c7payload.payload.image}\"></div>`,
            },
        }),
    };

    //commerce7 fetch to update yotpo
    await fetch(
        `https://api.commerce7.com/v1/product/${c7payload.payload.id}`,
        commerce7UpdateProductHeader
    )
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));

    return options;
};
