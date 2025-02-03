import {getSales} from './routes.js'

const salesRoutes = (app)=>{
    app.get("/sales", getSales);
}

export default salesRoutes;