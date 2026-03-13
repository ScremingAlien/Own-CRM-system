import { Prisma } from "@/generated/index.js";


export const qutationSelect = Prisma.validator<Prisma.QuotationSelect>()({
     id: true,
     partyId: true,
     issueDate: true,
     items: true,
     taxableAmount: true,
     sgst: true,
     cgst: true,
     month: true,
     year: true,
     igst: true,
     roundOff: true,
     totalAmount: true,
     status: true,
     createdAt: true
});

export type QuotationDTO = Prisma.QuotationGetPayload<{
     select: typeof qutationSelect;
}>;

export const QuotationItemSelect = Prisma.validator<Prisma.QuotationItemSelect>()({
     id: true,
     quotationId: true,
     description: true,
     subdescription: true,
     hsnCode: true,
     unit: true,
     quantity: true,
     rate: true,
     amount: true,
});

export type QuotationItemDTO = Prisma.QuotationItemGetPayload<{
     select: typeof QuotationItemSelect;
}>;




export const chalanSelect = Prisma.validator<Prisma.ChalanSelect>()({
     id: true,
     month: true,
     year: true,
     invoiceId: true,
     partyId: true,
     shipToId: true,
     chNo: true,
     vehicleNo: true,
     issueDate: true,
     status: true,
     items: true
       
});

export type ChalanDTO = Prisma.ChalanGetPayload<{
     select: typeof chalanSelect;
}>;



export const ChalanItemSelect = Prisma.validator<Prisma.ChalanItemSelect>()({
     id: true,
     chalanId: true,
     description: true,
     subdescription: true,
     hsnCode: true,
     unit: true,
     quantity: true,
     weight: true,
});

export type ChalanItemDTO = Prisma.ChalanItemGetPayload<{
     select: typeof ChalanItemSelect;
}>;
