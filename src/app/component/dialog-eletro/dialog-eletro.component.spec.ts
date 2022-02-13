import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEletroComponent } from './dialog-eletro.component';

describe('DialogEletroComponent', () => {
  let component: DialogEletroComponent;
  let fixture: ComponentFixture<DialogEletroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEletroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEletroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
