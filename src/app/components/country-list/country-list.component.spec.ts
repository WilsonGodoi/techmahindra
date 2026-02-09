import { ComponentFixture, TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';

import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';
import { CountryListComponent } from './country-list.component';

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;

  let countryService: jasmine.SpyObj<CountryService>;

  const mockCountries: Country[] = [
    { name: 'Portugal', code: 'PT', capital: 'Lisbon', population: 10300000 },
    { name: 'Spain', code: 'ES', capital: 'Madrid', population: 47400000 },
  ];

  beforeEach(async () => {
    countryService = jasmine.createSpyObj<CountryService>('CountryService', [
      'listCountries',
    ]);
    countryService.listCountries.and.returnValue(of(mockCountries));

    await TestBed.configureTestingModule({
      imports: [CountryListComponent],
      providers: [{ provide: CountryService, useValue: countryService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load countries on init', () => {
    expect(countryService.listCountries).toHaveBeenCalledTimes(1);
  });

  it('should expose countries$ stream', async () => {
    const result = await firstValueFrom((component as any).countries$);
    expect(result).toEqual(mockCountries);
  });
});
