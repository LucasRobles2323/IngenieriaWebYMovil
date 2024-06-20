import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlRobotPage } from './control-robot.page';

describe('ControlRobotPage', () => {
  let component: ControlRobotPage;
  let fixture: ComponentFixture<ControlRobotPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlRobotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
