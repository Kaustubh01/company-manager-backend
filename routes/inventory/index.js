import {getInventory} from './routes.js'

const inventoryRoutes = (app)=>{
    app.get("/inventory", getInventory);
}

export default inventoryRoutes;