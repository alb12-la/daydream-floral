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
    private billingContactName: string,
    private billingContactPhone: string,
    private invoiceNumber: string,
    private paymentMethod: string,
    private serviceType: string,
    private eventDate: string,
    private billingItems: BillingItem2[]
  ) { }
}

export interface BillingItem2 {
  description: string,
  cost?: number,
  quantity?: number,
  discount?: number
}

