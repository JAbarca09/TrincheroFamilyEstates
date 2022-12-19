exports.handler = (event) => {
    const c7payload = JSON.parse(event.body);
    const algoliasearch = require("algoliasearch");
    const client = algoliasearch("key", "key");
    const index = client.initIndex("C7 Product Feed");
    console.log(c7payload);

    console.log(c7payload.payload.type);
    console.log(c7payload.payload.webStatus);

    //check if the product type is wine and the status is available
    if (c7payload.payload.type === "Wine" && c7payload.payload.webStatus === "Available") {
        const objs = [{
            //information that will be passed through a single object
            title: c7payload.payload.title,
            image: c7payload.payload.image,
            type: c7payload.payload.type,
            webStatus: c7payload.payload.webStatus,
            slug: `https://www.onestopwineshop.com/product/${c7payload.payload.slug}`,
            createdAt: new Date(c7payload.payload.department.createdAt).getTime(),
            vendor: c7payload.payload.vendor.title,
            dietaryPreference: c7payload.payload.metaData.winecategory,
            badgeSlug: `https://www.onestopwineshop.com/wp-content/themes/onestop/assets/images/badges/${c7payload.payload.metaData.algoliabadgeurl}`,
            wineScore: c7payload.payload.metaData.algoliawinescore,
            winetype: c7payload.payload.wine.type,
            wineVarietal: c7payload.payload.wine.varietal,
            countrycode: c7payload.payload.wine.countryCode,
            Price: c7payload.payload.variants[0].price / 100,
            appellation: c7payload.payload.wine.appellation,
            region: c7payload.payload.wine.region,
            bottlesize: c7payload.payload.metaData.algoliabottlesize,
            algoliaSearchKeywords: c7payload.payload.metaData.algoliasearchkeywords,
            objectID: c7payload.payload.id
        }];

        index.saveObjects(objs).then(({ objectIDs }) => {
        console.log(objectIDs);
    });
    console.log(objs[0]);
    }
};
