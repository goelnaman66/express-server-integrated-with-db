//importing different libraries and functionalities
import express from "express";
import morgan from "morgan";
import { json, urlencoded } from "body-parser";
import postRouter from "./post/post-router";
import userRouter from "./user/user-router";
import { connect } from "./util/database";
import cors from "cors";



//setting up the express server
const app = express();

//setting up express routing
const router = express.Router();


//Bind application-level middleware to an instance of the app object by using the app.use()
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({extended:true}));      


//setting up custom middleware
const customLogger = (req, res, next) => {
    console.log("Logger incoming");
    console.log(req.body);
    next();
}


//with the help of router object, it redirects different URLs/requests accordingly 
app.use('/api/post',postRouter);       //if we get any URL like this, we will be redirected to /post/post-router
app.use('/api/user',userRouter);       //if we get any URL like this, we will be redirected to /user/user-router



//demo get and post methods
app.get('/', customLogger, (req, res) => {
    console.log(req.body);
    res.send({message: "OK"});
});
app.post('/', customLogger, (req, res) => {
    console.log(req.body);
    res.send({message: "OK POST"});
});

// router
//     .route('/post')
//     .get( (req, res)=>{
//         res.send("ok get");
//     })
//     .post( (req, res)=>{
//         res.send("ok post");
//     });

// router
//     .route('/post/:id')
//     .put( (req, res)=>{
//         console.log(req.params);
//         res.send("ok put");
//     })
//     .patch( (req, res)=>{
//         res.send("ok patch");
//     })
//     .delete( (req, res)=>{
//         res.send("ok delete");
//     });



//setting up express server
export const start = async () => {
        await connect();                                 // connect is a promise, so we use async function. 
                                                         // Connect is a function in utils/database file, where connection is initiated
                                                         // by taking the database URL from config/development file
        app.listen(3000, () => {
            console.log("Server started at 3000");
        });
}