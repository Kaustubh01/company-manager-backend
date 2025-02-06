import {createBusiness} from './routes.js'

const businessRoutes = (app)=>{
    app.post("/business/create", createBusiness);
}

export default businessRoutes;