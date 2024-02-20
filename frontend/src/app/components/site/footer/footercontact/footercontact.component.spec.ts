import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootercontactComponent } from './footercontact.component';

describe('FootercontactComponent', () => {
  let component: FootercontactComponent;
  let fixture: ComponentFixture<FootercontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootercontactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FootercontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
