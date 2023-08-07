import { Component, Input, OnInit } from '@angular/core';
import { InvoiceContents } from 'src/models/invoiceData.model';

@Component({
  selector: 'app-invoice-display',
  templateUrl: './invoice-display.component.html',
  styleUrls: ['./invoice-display.component.scss']
})
export class InvoiceDisplayComponent implements OnInit {
  @Input() invoiceContents: InvoiceContents;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('incoming', this.invoiceContents)
  }
}
