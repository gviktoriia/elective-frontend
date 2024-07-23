import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectiveFormComponent } from './elective-form.component';

describe('ElectiveFormComponent', () => {
  let component: ElectiveFormComponent;
  let fixture: ComponentFixture<ElectiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectiveFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
