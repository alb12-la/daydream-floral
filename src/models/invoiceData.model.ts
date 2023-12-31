import { DecimalPipe, formatNumber } from '@angular/common';
export class InvoiceModel {
  driverName: string;
  driverNumber: string;
  billingContactName: string;
  billingContactPhone: string;
  invoiceNumber: string;
  paymentMethod: string;
  serviceType: string;
  passengerName: string;
  passengerPhone: string;
  numberOfPassengers: number;
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffLocation: string;
  vehicleType: string;

  constructor(
    driverName: string,
    driverNumber: string,
    billingContactName: string,
    billingContactPhone: string,
    invoiceNumber: string,
    paymentMethod: string,
    serviceType: string,
    passengerName: string,
    passengerPhone: string,
    numberOfPassengers: number,
    pickupLocation: string,
    pickupDate: string,
    pickupTime: string,
    dropoffLocation: string,
  ) {
    this.driverName = driverName;
    this.driverNumber = driverNumber
    this.billingContactName = billingContactName;
    this.billingContactPhone = billingContactPhone;
    this.invoiceNumber = invoiceNumber;
    this.paymentMethod = paymentMethod;
    this.serviceType = serviceType;
    this.passengerName = passengerName;
    this.passengerPhone = passengerPhone;
    this.numberOfPassengers = numberOfPassengers;
    this.pickupLocation = pickupLocation;
    this.pickupDate = pickupDate;
    this.pickupTime = pickupTime;
    this.dropoffLocation = dropoffLocation;
    this.vehicleType = 'SUV'
  }
}

export interface InvoiceContents {
  driverName: string
  driverNumber: string;
  billingContactName: string;
  billingContactPhone: string;
  invoiceNumber: string;
  paymentMethod: string;
  serviceType: string;
  passengerName: string;
  passengerPhone: string;
  numberOfPassengers: number;
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffLocation: string;
  billingItems: BillItem[];
  totalCost: number;
}

export interface BillItem {
  description: string,
  cost?: number,
  discount?: number
}


export class InvoiceContents2 {
  constructor(
    public billingContactName: string,
    public billingContactPhone: string,
    public paymentMethod: string,
    public serviceType: string,
    public eventDate: string,
    public invoiceNumber: string,
    public billingItems: BillingItem2[],
  ) { }
}

export class InvoiceContents2Display extends InvoiceContents2 {
  totalCost: number;
  

  doTheMath() {
    // Figure out price per row. 
    this.billingItems.forEach((item) => {
        item.subtotal = item.cost * item.quantity
      })

    // Add up all the costs
    const billingSum = this.billingItems.filter((item) => item.subtotal).reduce((a, b) => a + b.subtotal, 0);

    // Remove discounts
    const discount = this.billingItems.filter((item) => item.discount).reduce((a, b) => a + b.discount, 0);
    let totalDiscount = (discount / 100) * billingSum

    // Total
    this.totalCost = billingSum - totalDiscount
  }
}

export interface BillingItem2 {
  description: string,
  cost?: number,
  quantity?: number,
  subtotal?: number,
  discount?: number
}

