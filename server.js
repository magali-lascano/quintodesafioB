import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import productsRouter from './routes/products.js';
import  cartsRouter from './routes/cart.js';
import viewRouter from "./routes/view.router.js";
import { Server } from "socket.io";
import ProductManager from "./dao/mongomanagers/productManagerM.js";
import MessagesManager from "./dao/mongomanagers/messageManagerM.js";
import { __dirname} from './utils.js';
import "./dao/dbconf.js";

//const ProductManager = new ProductManager(__dirname + "./public/json/product.json");
const app = express();
//port
const PORT = 8080
const MONGOOSE_URL = 'mongodb+srv://lascanoaylenmagali:<magaMONGO>@cluster0.elopmfb.mongodb.net/?retryWrites=true&w=majority'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use("/", viewRouter);

// socket server
const pmanagersocket = new ProductManager();
const messagesManager = new MessagesManager();
const httpServer = app.listen(8080,() => {console.log("Listening on PORT: 8080");});
const socketServer = new Server(httpServer);
socketServer.on("Coneccion", (socket) => {
    console.log(`Cliente connectado: ${socket.id}`);
    socket.on(`Desconectar`, () => {
        console.log(`Cliente desconectado: ${socket.id}`); // log para cuando se cae la comunicación
    });
    socket.on("newproduct", (newProduct) => {
        console.log(`Producto agregado: ${newProduct}`);
        ProductManager.addProduct({...newProduct });
    });
    socket.on("deleteProduct", (productId) => {
        console.log(`Producto borrado ${productId}`);
        ProductManager.deleteProductById(productId);
    });
    socket.on("message", async (info) => {
        console.log(info)
        await messagesManager.createMessage(info);
        socketServer.emit("chat", await messagesManager.getMessages());
    });
});
