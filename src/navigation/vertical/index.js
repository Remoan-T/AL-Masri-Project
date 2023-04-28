// ** Navigation imports
import apps from './apps'
import pages from './pages'
import forms from './forms'
import tables from './tables'
import others from './others'
import charts from './charts'
import dashboards from './dashboards'
import uiElements from './ui-elements'
import Farms from './Farms'
import SellingPort from './SellingPort'
import notes from'./Notes'
import order from './order'
// ** Merge & Export
export default [...dashboards, ...Farms, ...SellingPort,...notes,...order, ...apps, ...pages, ...uiElements, ...forms, ...tables, ...charts, ...others]
