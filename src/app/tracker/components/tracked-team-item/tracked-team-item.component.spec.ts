import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackedTeamItemComponent } from './tracked-team-item.component';

describe('TrackedTeamItemComponent', () => {
  let component: TrackedTeamItemComponent;
  let fixture: ComponentFixture<TrackedTeamItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackedTeamItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackedTeamItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
