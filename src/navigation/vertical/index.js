// ** Navigation imports
import forms from './forms'
import tables from './tables'
import others from './others'
import charts from './charts'
import dashboards from './dashboards'
import Farms from './Farms'
import SellingPort from './SellingPort'
import notes from './Notes'
import order from './order'
import driver from './driver'
import trucks from './trucks'
import trips from './trips'
import statment from './Statments'
import slaughter_supervisor from "./slaughter_supervisor"
import cutting_supervisor from './cutting_supervisor'
import Manufacturing_Supervisor from './Manufacturing_Supervisor'
import CEO from './ceo'
import Warehouse from './Warehouse'
import friges from './friges'
import uStore from './ultimate store'
import production from './production'


// ** Merge & Export
export default [...dashboards, ...Farms, ...statment, ...slaughter_supervisor, ...production, ...Warehouse, ...uStore, ...friges, ...cutting_supervisor, ...SellingPort, ...notes, ...order, ...driver, ...trucks, ...trips, ...forms, ...tables, ...charts, ...others, ...Manufacturing_Supervisor, ...CEO]
