import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaberintoEndPage } from './laberinto-end.page';

describe('LaberintoEndPage', () => {
  let component: LaberintoEndPage;
  let fixture: ComponentFixture<LaberintoEndPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LaberintoEndPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
