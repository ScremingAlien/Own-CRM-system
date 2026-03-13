import { statusCode } from "../constants/statusCode.js";

export class ErrorService {

     /*------------------------------------
     Chalan
     --------------------------------------*/
     static ChalanNotFound() {
          throw new Error("Chalan Not Found", { cause: statusCode.BAD_REQUEST });
     }
     static ChalanAlreadyExists() {
          throw new Error("Chalan Number Already Exists", { cause: statusCode.BAD_REQUEST });
     }

     /*------------------------------------
     Invoice
     --------------------------------------*/
     static InvoiceNotFound() {
          throw new Error("Invoice Not Found", { cause: statusCode.NOT_FOUND });
     }
     static InvoiceAlreadyExists() {
          throw new Error("Invoice Already Exists", { cause: statusCode.BAD_REQUEST });
     }
     static ShipmentNotFound() {
          throw new Error("Shipment Not Found", { cause: statusCode.NOT_FOUND });
     }
     
     /*------------------------------------
     Party
     --------------------------------------*/
     static PartyAlreadyExists() {
          throw new Error("Party Already Exists", { cause: statusCode.BAD_REQUEST });
     }
     static PartyNotFound() {
          throw new Error("Party Not Found", { cause: statusCode.NOT_FOUND });
     }


}
