import {getCustomers} from './routes.js'

const customerRoutes = (app)=>{
    app.get("/customer", getCustomers);
}

export default customerRoutes;