import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFondedComponent } from './not-fonded.component';

describe('NotFondedComponent', () => {
  let component: NotFondedComponent;
  let fixture: ComponentFixture<NotFondedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFondedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotFondedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
