import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColourathalfdepthPage } from './colourathalfdepth.page';

describe('ColourathalfdepthPage', () => {
  let component: ColourathalfdepthPage;
  let fixture: ComponentFixture<ColourathalfdepthPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ColourathalfdepthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColourathalfdepthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
