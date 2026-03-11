import { Prisma } from "@/generated/index.js"
import { CalculatedInvoice, CalculatedInvoiceItem, CreateInvoiceItemInput, InvoiceItemDTO } from "@/modules/invoice/invoice.types.js"


export const percentToPrice = (Amount: Prisma.Decimal, percent: number) => {
     return Amount.mul(percent).div(100)
}

export function calculateInvoice(
     items: CreateInvoiceItemInput[],
     sgst: number,
     cgst: number,
     igst: number
): CalculatedInvoice{

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