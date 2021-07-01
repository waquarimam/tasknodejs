
import Customer, { STANDARD_ROLE } from "./customer.model";


import request from "request";
import moment from "moment/moment";
import { getConfig } from "../../../config/config";

const config = getConfig(process.env.NODE_ENV);
import axios from "axios";

import {ObjectsToCsv} from 'objects-to-csv';



export default {
  async task(req, res) {
try{
 var startDate=req.body.startDate;
var endDate=req.body.endDate;

let customerListcount = await Customer.count({
  $and: [
    {
     
      created_at: {
        $gte: startDate,
        $lt: endDate,
      },
    },
  ],
});
const customerList = await Customer.find({
  $and: [
    {
      
      createdAt: {
        $gte: startdate,
        $lt: endDated,
      },
    },
  ],
}).sort({ createdAt: -1 });
console.log(customerList);
const csv = new ObjectsToCsv(customerList);
await csv.toDisk('./list.csv', { append: true })
consol.log(csv);
var filePath = "/my/file/path/..."; 
res.download(filePath, fileName);
//return res.status(200).json(response.success(cdata, 200));
} catch (err) {
console.error(err);
return res.status(500).json(response.error("SERVER_ERROR", err, 500));
}
  },
};
