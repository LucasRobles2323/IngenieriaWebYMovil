import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaberintoResueltoPage } from './laberinto-resuelto.page';

describe('LaberintoResueltoPage', () => {
  let component: LaberintoResueltoPage;
  let fixture: ComponentFixture<LaberintoResueltoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LaberintoResueltoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
