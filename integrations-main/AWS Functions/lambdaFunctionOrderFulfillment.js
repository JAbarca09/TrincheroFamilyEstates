/* 
Notes:
Line items and fulfillments need to match
*/

exports.handler = async (event) => {
    const c7payload = JSON.parse(event.body);
    console.log(c7payload);
    console.log(c7payload.payload["fulfillmentStatus"]);
    const { default: fetch } = await import('node-fetch');
    

    let options = {};
    if (c7payload.payload["fulfillmentStatus"] === "Fulfilled" && c7payload.payload["billTo"]["firstName"] !== "Marketing") {
        let user_accepts_email_marketing;
        let fulfilled_items_arr = [];
        let line_items_arr = [];

        //check if the user subscribed to the email marketing
        user_accepts_email_marketing = (c7payload.payload["customer"]["emailMarketingStatus"] === "Subscribed") ? true : false;

        //logic for the fulfilled items
        for (let i = 0; i < c7payload.payload["items"].length; i++) {
            //put id and quantity in an object and push it into the array
            let obj = {
                external_product_id: c7payload.payload["items"][i]["productId"],
                quantity: c7payload.payload["items"][i]["quantityFulfilled"]
            };
            fulfilled_items_arr.push(obj);
        }

        //logic for the line_items
        for (let j = 0; j < c7payload.payload["items"].length; j++) {
            //put id and quantity in an object and push it into the array
            let obj2 = {
                quantity: c7payload.payload["items"][j]["quantityFulfilled"],
                external_product_id: c7payload.payload["items"][j]["productId"]
            };
            line_items_arr.push(obj2);
        }

        //data
        options = {
            statusCode: 200,
            method: 'POST',
            headers: { Accept: 'application/json', 'X-Yotpo-Token': 'Key', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                order: {
                    external_id: c7payload.payload["id"],
                    order_date: c7payload.payload["orderFulfilledDate"],
                    customer: {
                        external_id: c7payload.payload["customerId"],
                        email: c7payload.payload["customer"]["emails"][0]["email"],
                        first_name: c7payload.payload["customer"]["firstName"],
                        last_name: c7payload.payload["customer"]["lastName"],
                        accepts_sms_marketing: false,
                        accepts_email_marketing: user_accepts_email_marketing
                    },
                    line_items: line_items_arr,
                    fulfillments: [
                        {
                            fulfillment_date: c7payload.payload["fulfillments"][0]["fulfillmentDate"],
                            external_id: c7payload.payload["fulfillments"][0]["id"],
                            status: 'success',
                            fulfilled_items: fulfilled_items_arr
                        }
                    ]
                }
            })
        };

        //sending the object over to Yotpo

        await fetch('https://api.yotpo.com/core/v3/stores/storeID/orders', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

    } else {
        options = {
            statusCode: 200,
            "message": "Order not fulfilled!"
        };
    }
    return options;
};
