import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooteraboutusComponent } from './footeraboutus.component';

describe('FooteraboutusComponent', () => {
  let component: FooteraboutusComponent;
  let fixture: ComponentFixture<FooteraboutusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooteraboutusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooteraboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
