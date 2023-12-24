import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycledItemDetailModalComponent } from './recycled-item-detail-modal.component';

describe('RecycledItemDetailModalComponent', () => {
  let component: RecycledItemDetailModalComponent;
  let fixture: ComponentFixture<RecycledItemDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecycledItemDetailModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecycledItemDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
