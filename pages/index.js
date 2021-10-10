//COMPONENTS
import { MeetupList } from '../components';
//MONGODB
import { MongoClient } from 'mongodb';


export default function({ meetups }) {
    return (
        <MeetupList
            meetups={meetups}
        />
    )
}


//  --  NEXTJS, looks for function which named as 'getStaticProps'
//  --  NEXTJS, first of call this function instead of calling component function
//  --  NEXTJS, waits for untill promise is to be resolved incase of asynchronous function
//  --  NEXTJS, will execute this function during build-process, or execute nor show on client-side
//  --  NEXTJS, you can use for connect database or connect server
export async function getStaticProps() {
//  --  NEXTJS, will deploy this function while build command


    /* fetch data from an API */
    /* code inside 'getStaticProps' function will never show on client so its hide forever */
//****************************************************************************************************************/
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.xn3pr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
 
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    try {
        var result = await meetupsCollection.find().toArray();
        console.log(result);
    }
    catch(err) {
        console.log(err);
    }

    client.close();
//****************************************************************************************************************/


    /* for convert _id of MONGODB to JS Id */
    const modifiedData = result.map(item => {
        let id = item._id.toString();
        delete item._id;
        return { id, ...item };
    });


    return {
        props:   /* always need to return an object here, object have property named as 'props' */
        {        /* 'props' represents props of component function */
            meetups: modifiedData
        },
        revalidate: 1
    };
}