export interface InvoiceResource {
  id: number;
  dni: string;
  name: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: string;
}

export interface CreateInvoiceRequest {
  amount: number;
  currency: string;
  dueDate: string;
}
