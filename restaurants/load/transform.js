/**
 * Data loading routine that takes the restaurant/review data
 * and formats it for dynamodb
 * https://docs.aws.amazon.com/cli/latest/reference/dynamodb/batch-write-item.html
 */

const fs = require('fs');
const util = require('util');
const uuidv4 = require('uuid/v4');


function setData(d, type) {
    if (!type) {
        type = "S";
    }
    const ret = {};
    ret[type] = "" + d;
    return ret;
}


function writeOut(data, type) {
    const limit = 25;
    cc = 1;
    let max = data.length;
    let newData = [];
    for (let j = 0; j < max; j++) {
        if (j % limit === 0 && j > 0) {
            let d = {};
            d[type] = newData;

            fs.writeFileSync(`./out/${type}Load_${cc}.json`, JSON.stringify(d, null, 1));
            newData = [];
            cc++;
        } else {
            // console.log(data[j]);
            newData.push(data[j]);
            // console.log(newData)
        }

    }
    if (newData.length > 0) {

        let d = {};
        d[type] = newData;
        fs.writeFileSync(`./out/${type}Load_${cc}.json`, JSON.stringify(d, null, 1));
    }

}


// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

async function loadData() {
    const outputRest = { "Restaurants": [], "Reviews": [] };

    try {
        const st = await readFile("odata.json", "utf8");
        const data = JSON.parse(st);

        data.forEach(r => {
            const newRestaurant = { "PutRequest": { "Item": {} } }
            const uIdRest = uuidv4();
            newRestaurant.PutRequest.Item = { "name": setData(r.name), "zipCode": setData(r.zipCode), "city": setData(r.city), "state": setData(r.state), "version": setData(1, "N"), id: setData(uIdRest) }
            outputRest.Restaurants.push(newRestaurant);
            r.reviewDTOs.forEach(rev => {
                const newReview = { "PutRequest": { "Item": {} } }
                const uIdRev = uuidv4();
                newReview.PutRequest.Item = { "starRating": setData(rev.starRating, "N"), "reviewListing": setData(rev.reviewListing), "stampDate": setData("" + rev.stampDate), "id": setData(uIdRev), "restaurantId": setData(uIdRest) };
                outputRest.Reviews.push(newReview);
            })

        })
        return outputRest
    } catch (e) {
        console.log(e);
        throw e;
    }

}
async function main() {
    const mainData = await loadData();
    //  const restaurantData = { "Restaurants": mainData.Restaurants };
    //  const reviewData = { "Reviews": mainData.Reviews };
    try {

        writeOut(mainData.Restaurants, "Restaurants");
        writeOut(mainData.Reviews, "Reviews");



    } catch (err) {
        // An error occurred
        console.error(err);
    }


}

main();