import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorraCreateComponent } from './porra-create.component';

describe('PorraCreateComponent', () => {
  let component: PorraCreateComponent;
  let fixture: ComponentFixture<PorraCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorraCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorraCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
