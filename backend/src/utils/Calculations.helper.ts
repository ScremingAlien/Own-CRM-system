import { Prisma } from "@/generated/index.js"
import { CalculatedInvoice, CalculatedInvoiceItem, CreateInvoiceItemInput, InvoiceItemDTO } from "@/modules/invoice/invoice.types.js"
import { QuotationItemDTO } from "@/modules/qnc/qnc.types.js"


export const percentToPrice = (Amount: Prisma.Decimal, percent: number) => {
     return Amount.mul(percent).div(100)
}

export function calculateInvoice(
     items: CreateInvoiceItemInput[],
     sgst: number,
     cgst: number,
     igst: number
): CalculatedInvoice {

     let taxableAmount = new Prisma.Decimal(0)

     const processedItems: CalculatedInvoiceItem[] = items.map((item) => {

          const amount = new Prisma.Decimal(item.rate).mul(item.quantity)

          taxableAmount = taxableAmount.plus(amount)

          return {
               description: item.description,
               subdescription: item.subdescription ?? [],
               hsnCode: item.hsnCode ?? null,
               unit: item.unit ?? null,
               quantity: item.quantity,
               rate: item.rate,
               amount
          }
     })

     const sgstAmount = percentToPrice(taxableAmount, sgst)
     const cgstAmount = percentToPrice(taxableAmount, cgst)
     const igstAmount = percentToPrice(taxableAmount, igst)

     const totalBeforeRound =
          taxableAmount.plus(sgstAmount).plus(cgstAmount).plus(igstAmount)

     const totalRounded = totalBeforeRound.toDecimalPlaces(0)

     const roundOff = totalRounded.minus(totalBeforeRound)

     return {
          items: processedItems,
          taxableAmount,
          sgst,
          cgst,
          igst,
          roundOff,
          totalAmount: totalRounded
     }
}



export function calculateQuotation(items:
     {
          description: string;
          quantity: number;
          rate: number;
          subdescription?: string[] | undefined;
          hsnCode?: string | undefined;
          unit?: string | undefined;
     }[], sgst: number, cgst: number, igst: number) {

     let taxableAmount = new Prisma.Decimal(0);

     const processedItems = items.map((item) => {
          const quantity = new Prisma.Decimal(item.quantity);
          const rate = new Prisma.Decimal(item.rate);

          const amount = quantity.mul(rate);

          taxableAmount = taxableAmount.add(amount);

          return {
               ...item,
               amount
          };
     });

     const sgstAmount = taxableAmount.mul(sgst).div(100);
     const cgstAmount = taxableAmount.mul(cgst).div(100);
     const igstAmount = taxableAmount.mul(igst).div(100);

     const totalAmount = taxableAmount
          .add(sgstAmount)
          .add(cgstAmount)
          .add(igstAmount);


     const totalBeforeRound =
          taxableAmount.plus(sgstAmount).plus(cgstAmount).plus(igstAmount)

     const totalRounded = totalBeforeRound.toDecimalPlaces(0)

     const roundOff = totalRounded.minus(totalBeforeRound)
     return {
          items: processedItems,
          taxableAmount,
          totalAmount,
          roundOff
     };
}