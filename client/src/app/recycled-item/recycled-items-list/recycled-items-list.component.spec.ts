import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycledItemsListComponent } from './recycled-items-list.component';

describe('RecycledItemsListComponent', () => {
  let component: RecycledItemsListComponent;
  let fixture: ComponentFixture<RecycledItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecycledItemsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecycledItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
