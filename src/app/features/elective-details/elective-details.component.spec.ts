import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectiveDetailsComponent } from './elective-details.component';

describe('ElectiveDetailsComponent', () => {
  let component: ElectiveDetailsComponent;
  let fixture: ComponentFixture<ElectiveDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectiveDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectiveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
