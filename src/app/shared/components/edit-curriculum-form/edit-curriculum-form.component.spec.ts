import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCurriculumFormComponent } from './edit-curriculum-form.component';

describe('EditCurriculumFormComponent', () => {
  let component: EditCurriculumFormComponent;
  let fixture: ComponentFixture<EditCurriculumFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCurriculumFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCurriculumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
