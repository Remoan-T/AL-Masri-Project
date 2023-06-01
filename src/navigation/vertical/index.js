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
import Warehouse from './Warehouse'
// ** Merge & Export
export default [...dashboards, ...Farms, ...statment, ...slaughter_supervisor, ...Warehouse, ...cutting_supervisor, ...SellingPort, ...notes, ...order, ...driver, ...trucks, ...trips, ...forms, ...tables, ...charts, ...others]
