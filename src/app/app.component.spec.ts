import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'saletax-assignment'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('saletax-assignment');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.toolbar span').textContent).toContain('Sales Tax Calculator');
  });

  it('ngOnIt() should initilize the values', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    spyOn(app, 'calculateTotal').and.returnValue({});
    expect(app.inputArr.length).toBe(3);
    expect(app.excemptedList).toEqual(['book', 'food', 'medicine']);
  });


  it('calculateTotal() should return the totals', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement;
    const input = [
      {
        "type": "book",
        "name": "book",
        "quantity": 1,
        "price": "12.49",
        "imported": false
      }
    ];

    const output = app.calculateTotal(input);
    expect(output.total).toEqual('12.49');
    expect(output.totalSalesTax).toEqual('0.00');
    expect(compiled.querySelector('.content span').textContent).toContain('1 book : 12.49');
  });

  it('calculateTotal() should return the totals for multi quantity and calculate import tax too', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement;
    const input = [
      {
        "type": "book",
        "name": "book",
        "quantity": 2,
        "price": "12.49",
        "imported": false
      },
      {
        "type": "perfume",
        "name": "bottle of perfume",
        "quantity": 1,
        "price": "27.99",
        "imported": true
      }
    ];

    const output = app.calculateTotal(input);
    expect(output.total).toEqual('57.17');
    expect(output.totalSalesTax).toEqual('4.20');
    expect(output.items[0]).toEqual('2 book : 24.98');
  });

  it('calculateTax() should return the tax', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    let input =
    {
      "type": "book",
      "name": "book",
      "quantity": 1,
      "price": "12.49",
      "imported": false
    }
    let tax = app.calculateTax(input);
    expect(tax).toEqual(0.00);

    input =
    {
      "type": "book",
      "name": "book",
      "quantity": 1,
      "price": "12.49",
      "imported": true
    }
    tax = app.calculateTax(input);
    expect(tax).toEqual(0.65);

    input =
    {
      "type": "perfume",
      "name": "bottle of perfume",
      "quantity": 1,
      "price": "27.99",
      "imported": true
    };
    tax = app.calculateTax(input);
    expect(tax).toEqual(4.20);
  })


  it('roundAmount() should return the amount ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    let roundedAmount = app.roundAmount(4.125);
    expect(roundedAmount).toEqual(4.15);

    roundedAmount = app.roundAmount(1.75);
    expect(roundedAmount).toEqual(1.75);

    roundedAmount = app.roundAmount(2.753);
    expect(roundedAmount).toEqual(2.80);

    roundedAmount = app.roundAmount(2.7);
    expect(roundedAmount).toEqual(2.7);

    roundedAmount = app.roundAmount(0.122);
    expect(roundedAmount).toEqual(0.15);

    roundedAmount = app.roundAmount(0);
    expect(roundedAmount).toEqual(0.00);
  });

  it('addTwoFloatNumbers() should return a float number ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    let sum = app.addTwoFloatNumbers(4.12, 4.34);
    expect(sum).toEqual(8.46);

    sum = app.addTwoFloatNumbers(4.124, 4.347);
    expect(sum).toEqual(8.47)
  });

  it('getFinalItemLabel() should return a formatted label ', () => {

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    let input =
    {
      "type": "book",
      "name": "book",
      "quantity": 1,
      "imported": true
    }

    let label = app.getFinalItemLabel(input, 6.69)
    expect(label).toEqual('1 imported book : 6.69');

    input =
    {
      "type": "book",
      "name": "book",
      "quantity": 1,
      "imported": false
    }

    label = app.getFinalItemLabel(input, 6.69)
    expect(label).toEqual('1 book : 6.69');
  });

});
