import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MTerminosPrivacidadComponent } from './m-terminos-privacidad.component';

describe('MTerminosPrivacidadComponent', () => {
  let component: MTerminosPrivacidadComponent;
  let fixture: ComponentFixture<MTerminosPrivacidadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MTerminosPrivacidadComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MTerminosPrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
