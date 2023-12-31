import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  @Output() finishedForm: EventEmitter<FormGroup> = new EventEmitter();
  invoiceForm: FormGroup;
  constructor(private fb: FormBuilder) { }
  pickUpTime = {};
  eventDateModel = {};
  showModal = false;
  displayDriverForm = false;
  displayMoreBillingOptions = false;
  hasDiscount = false;

  // Billing Item form
  /** Should reflect a class from invoice data.model.ts */

  newInvoiceFormObject() {
    return {
      billingContactName: new FormControl(''),
      billingContactPhone: new FormControl(''),
      invoiceNumber: new FormControl('', Validators.required),
      paymentMethod: new FormControl(''),
      serviceType: new FormControl(''),
      eventDate: new FormControl(''),
      billItemsArray: new FormArray([]),
    }
  }

  newBillingFormObject() {
    return {
      description: new FormControl(''),
      cost: new FormControl(''),
      quantity: new FormControl(''),
      subtotal: new FormControl(''),
    }
  }


  ngOnInit(): void {
    this.invoiceForm = this.fb.group(this.newInvoiceFormObject());
    // Initialize with one bill item
    this.addBillItem();
  }

  addBillItem() {
    this.billItemsArray.push(
      this.fb.group(this.newBillingFormObject())
    )
  }

  addDiscount() {
    this.hasDiscount = true;
    this.billItemsArray.push(
      this.fb.group(
        {
          description: new FormControl('Discount'),
          discount: new FormControl('')
        }
      )
    )
  }

  removeBillItem(indexOfBillToRemove: number) {
    // Detect if we're deleting a discount
    if (this.billItemsArray.controls[indexOfBillToRemove].get('discount')) {
      this.hasDiscount = false
    }

    this.billItemsArray.removeAt(indexOfBillToRemove);
  }


  exportToPdf() {
    // Transform and insert any dateModels into form
    this.invoiceForm.controls['eventDate'].setValue(
      this.convertDateStructToString(this.eventDateModel)
    )
    // Send up
    this.finishedForm.emit(this.invoiceForm);
  }

  /**
   * Getters
   */
  get billItemsArray(): FormArray {
    return this.invoiceForm.controls['billItemsArray'] as FormArray;
  }

  /**
   * Probably optional
   */
  toggleMoreBillingOptions() {
    this.displayMoreBillingOptions = !this.displayMoreBillingOptions;
  }

  onDriverFormToggle() {
    this.displayDriverForm = !this.displayDriverForm;

    if (this.displayDriverForm) {
      // Add the controls
      this.invoiceForm.addControl('driverName', new FormControl(''));
      this.invoiceForm.addControl('driverNumber', new FormControl(''));
    } else {
      // Remove the controls
      this.invoiceForm.removeControl('driverName');
      this.invoiceForm.removeControl('driverNumber');
    }
  }

  /**
   *  Helper functions
   */
  convertDateStructToString(obj: any): string {
    return `${obj.month}/${obj.day}/${obj.year}`
  }

  convertTimeStructToString(obj: any): string {
    return `${obj.hour}:${obj.minute}`
  }
}
