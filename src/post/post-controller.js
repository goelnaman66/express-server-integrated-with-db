import { crudControllers } from "../util/crud";
import { Post } from "./post-model";

export default crudControllers(Post);


// controller will basically import functionalities from crudOperations util files and passes theb Post model as argument 