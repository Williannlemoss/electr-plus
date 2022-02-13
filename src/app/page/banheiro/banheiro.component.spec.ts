import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanheiroComponent } from './banheiro.component';

describe('BanheiroComponent', () => {
  let component: BanheiroComponent;
  let fixture: ComponentFixture<BanheiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanheiroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanheiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
