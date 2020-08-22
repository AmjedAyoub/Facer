/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FacersComponent } from './facers.component';

describe('FacersComponent', () => {
  let component: FacersComponent;
  let fixture: ComponentFixture<FacersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
