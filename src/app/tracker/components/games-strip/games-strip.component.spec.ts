import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesStripComponent } from './games-strip.component';

describe('GamesStripComponent', () => {
  let component: GamesStripComponent;
  let fixture: ComponentFixture<GamesStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesStripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
