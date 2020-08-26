import * as inputData from './../assets/data/input-data-all.json'

import { Component, OnInit } from '@angular/core';

import { Item } from './model/item';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'saletax-assignment';
  inputArr: any[];
  output: any[] = [];
  excemptedList: string[];
  ngOnInit() {
    this.inputArr = inputData['default'];
    this.excemptedList = environment.exempted.split(',');
    this.inputArr.forEach(input => {
      this.output.push(this.calculateTotal(input));
    });
  }

  calculateTotal(input: Item[]) {
    const output: any = {};
    output.items = [];
    let totalSalesTax = 0;
    let itemTotalWithoutTax = 0;
    let total = 0;
    input.forEach(item => {
      const itemTotal = parseFloat(item.price) * item.quantity;
      const tax = this.calculateTax(item);
      const itemTotalWithTax = this.addTwoFloatNumbers(itemTotal, tax);
      output.items.push(this.getFinalItemLabel(item, itemTotalWithTax));

      total = this.addTwoFloatNumbers(total, itemTotalWithTax);
      itemTotalWithoutTax = this.addTwoFloatNumbers(itemTotalWithoutTax, itemTotal);
      totalSalesTax = this.addTwoFloatNumbers(totalSalesTax, tax);
    });

    output.total = total.toFixed(2);
    output.totalSalesTax = totalSalesTax.toFixed(2);

    console.log(output);
    return output;

  }

  calculateTax(item) {
    let tax = environment.salesTax;

    if (this.excemptedList.includes(item.type)) {
      tax = 0.00;
    }

    if (item.imported) {
      tax = this.addTwoFloatNumbers(tax, environment.importTax);
    }

    let totalTax = (parseFloat(item.price) * tax) * item.quantity;
    const roundedTax = (Math.ceil(totalTax * 20 - 0.05) / 20).toFixed(2);
    return parseFloat(roundedTax);
  }


  addTwoFloatNumbers(n1, n2) {
    let result = parseFloat(n1) + parseFloat(n2);
    return parseFloat(result.toFixed(2));
  }

  roundAmount(amount) {
    return parseFloat((Math.ceil(amount * 20 - 0.05) / 20).toFixed(2));
  }

  getFinalItemLabel(item: any, finalPrice) {
    const imported = item.imported ? ' imported' : '';
    return `${item.quantity}${imported} ${item.name} : ${finalPrice.toFixed(2)}`
  }

}
