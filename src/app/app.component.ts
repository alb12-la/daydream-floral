import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BillItem, InvoiceContents } from 'src/models/invoiceData.model';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private modalService: NgbModal) { }
  display = true;

  invoiceContents: InvoiceContents;

  formToDisplay(formGroup: FormGroup, modalContent: any) {
    this.invoiceContents = {
      driverName: '',
      driverNumber: '',
      billingContactName: formGroup.get('billingContactName')?.value || '',
      billingContactPhone: '',
      invoiceNumber: '',
      paymentMethod: '',
      serviceType: '',
      passengerName: '',
      passengerPhone: '',
      numberOfPassengers: 0,
      pickupLocation: '',
      pickupDate: '',
      pickupTime: '',
      dropoffLocation: '',
      totalCost: 0,
      billingItems: [],
    }

    // Get Values
    this.invoiceContents.driverName = formGroup.get('driverName')?.value;
    this.invoiceContents.driverNumber = formGroup.get('driverNumber')?.value;
    this.invoiceContents.billingContactName = formGroup.get('billingContactName')?.value;
    this.invoiceContents.billingContactPhone = formGroup.controls['billingContactPhone'].value;
    this.invoiceContents.invoiceNumber = formGroup.controls['invoiceNumber'].value;
    this.invoiceContents.paymentMethod = formGroup.controls['paymentMethod'].value;
    this.invoiceContents.serviceType = formGroup.controls['serviceType'].value;
    this.invoiceContents.passengerName = formGroup.controls['passengerName'].value;
    this.invoiceContents.passengerPhone = formGroup.controls['passengerPhone'].value;
    this.invoiceContents.numberOfPassengers = formGroup.controls['numberOfPassengers'].value;
    this.invoiceContents.pickupLocation = formGroup.controls['pickupLocation'].value;
    this.invoiceContents.pickupDate = formGroup.controls['pickupDate'].value;
    this.invoiceContents.pickupTime = formGroup.controls['pickupTime'].value;
    this.invoiceContents.dropoffLocation = formGroup.controls['dropoffLocation'].value;

    // Calculate total
    const billingItemsFormArray = formGroup.controls['billItemsArray'] as FormArray;
    const billingItems: BillItem[] = billingItemsFormArray.value;
    // Add up all the costs
    const billingSum = billingItems.filter((item) => item.cost).reduce((a, b) => a + b.cost, 0);
    // Remove discounts
    const discount = billingItems.filter((item) => item.discount).reduce((a, b) => a + b.discount, 0);
    let totalDiscount = (discount / 100) * billingSum
    const totalCost = billingSum - totalDiscount


    this.invoiceContents.totalCost = totalCost;
    this.invoiceContents.billingItems = billingItems;
    this.modalService.open(modalContent, { fullscreen: true })
  }

  download() {
    let DATA: any = document.getElementById('invoice-display');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4', true);
      let position = 10;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`invoice-${this.invoiceContents.invoiceNumber}`);
    });
  }
}
