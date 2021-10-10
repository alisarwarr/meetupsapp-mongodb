//MONGODB
import { MongoClient } from 'mongodb';


//     *******.com/api/new-meetup



/* not define react component because not returning it */
/* define functions which contains serverside code */



/* whenever hits on *******.com/api/new-meetup url, then will trigger a function, which we will have to define */
async function handler(req, res) {
//  'req' object contains data about incoming request.
//  'res' object will be needed to send back the response.

    if(req.method === 'POST') {
        const data = req.body;   /* getting data */

        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.xn3pr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
        );

        const db = client.db();
        const meetupsCollection = db.collection('meetups');

        try {
            await meetupsCollection.insertOne(data);
            res.status(201).json({ message: "Meetup Inserted!" });
        }
        catch(err) {
            console.log(err);
        }

        client.close();
    }
}

export default handler;