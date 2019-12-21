import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuotationComponent } from './new-quotation.component';

describe('NewQuotationComponent', () => {
  let component: NewQuotationComponent;
  let fixture: ComponentFixture<NewQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
