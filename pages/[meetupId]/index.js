//COMPONENTS
import { MeetupDetails } from '../../components';
//MONGODB
import { MongoClient, ObjectId } from 'mongodb';


export default function({ meetups }) {
    return (
        <MeetupDetails
            title={meetups.title}
            image={meetups.image}
            address={meetups.address}
            description={meetups.description}
        />
    )
}


/*
    ( 'getStaticPaths' used as combination of 'getStaticProps' )
*/
//  --  NEXTJS, looks for function which named as 'getStaticPaths'
//  --  NEXTJS, first of call this function instead of calling component function
//  --  NEXTJS, waits for untill promise is to be resolved incase of asynchronous function
export async function getStaticPaths() {
//  --  NEXTJS, this function supports 'getStaticProps' function,
//      because of 'getStaticProps' function executes during build-process


    /* fetch data from an API */
    /* code inside 'getStaticPaths' function will never show on client so its hide forever */
//****************************************************************************************************************/
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.xn3pr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
 
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
 
    try {                                             /* only get id */
        var result = await meetupsCollection.find({}, { _id: 1 }).toArray();
        console.log(result);
    }
    catch(err) {
        console.log(err);
    }
 
    client.close();
//****************************************************************************************************************/


    /* for convert _id of MONGODB to JS Id, also destructure as for NEXTJS' 'getStaticPaths' */
    const modifiedData = result.map(item => {
        return {
            params: {
                meetupId: item._id.toString()
            }
        };
    });


    return {
        paths: modifiedData,    /* always need to return an array here, array have properties as objects */
                                /* contains all possible values for 'paths' for [meetupId] */
        fallback: 'blocking'    /* if 'fallback' is false then means all possible values for 'paths' have mentioned
                                   then if any user enters url besides them, then 404 page will render to them
                                */
      
                                /* if 'fallback' is true OR 'blocking' then means some possible values for 'paths' have mentioned
                                   then if any user enters url besides them, then no 404 page will render to them
                                */
                                /* ( true       -- then it would immediately return an empty page and then pull down the dymanically generated content once then done ) */
                                /* ( 'blocking' -- then user will not see anything, untill the page was pre-generated so the finished page will be served ) */
                                
                                /*
                                  ( 'fallback' is generally true because we define some paths instead of all paths )
                                  ( ex. those pages are visited most frequently, we want only them to pre-render )
                                */
    }
}


//  --  NEXTJS, looks for function which named as 'getStaticProps'
//  --  NEXTJS, first of call this function instead of calling component function
//  --  NEXTJS, waits for untill promise is to be resolved incase of asynchronous function
//  --  NEXTJS, will execute this function during build-process, or execute nor show on client-side
//  --  NEXTJS, you can use for connect database or connect server
export async function getStaticProps(context) {
//  --  NEXTJS, will deploy this function while build command


    const meetupId = context.params.meetupId;


    /* fetch data from an API */
    /* code inside 'getStaticProps' function will never show on client so its hide forever */
//****************************************************************************************************************/
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.xn3pr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
 
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
 
    try {
        var result = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
        console.log(result);
    }
    catch(err) {
        console.log(err);
    }
 
    client.close();
//****************************************************************************************************************/


    /* for convert _id of MONGODB to JS Id */
    let id = result._id.toString();
    delete result._id;
    const modifiedData = { id, ...result };


    return {
        props:   /* always need to return an object here, object have property named as 'props' */
        {        /* 'props' represents props of component function */
            meetups: modifiedData
        }
    };
}