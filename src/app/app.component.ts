import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BillItem, InvoiceContents2, InvoiceContents2Display } from 'src/models/invoiceData.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private modalService: NgbModal) { }
  display = false;

  InvoiceContents2: InvoiceContents2;
  invoiceContents2Display: InvoiceContents2Display;

  formToDisplay(formGroup: FormGroup, modalContent: any) {
    // Prep the billing items
    const billingItemsFormArray = formGroup.controls['billItemsArray'] as FormArray;
    const billingItems: BillItem[] = billingItemsFormArray.value;

    // Insert
    this.invoiceContents2Display = new InvoiceContents2Display(
      formGroup.get('billingContactName')?.value || '',
      formGroup.get('billingContactPhone')?.value || '',
      formGroup.get('paymentMethod')?.value || '',
      formGroup.get('serviceType')?.value || '',
      formGroup.get('eventDate')?.value || '',
      formGroup.get('invoiceNumber')?.value || '',
      billingItems
    )
    
    // Do Math 
    this.invoiceContents2Display.doTheMath();
    
    // Display pop up
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
      PDF.save(`invoice-${this.invoiceContents2Display.invoiceNumber}`);
    });
  }
}
