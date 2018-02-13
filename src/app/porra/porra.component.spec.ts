import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorraComponent } from './porra.component';

describe('PorraComponent', () => {
  let component: PorraComponent;
  let fixture: ComponentFixture<PorraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
