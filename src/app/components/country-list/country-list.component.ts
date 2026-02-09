import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
})
export class CountryListComponent implements OnInit {
  protected countries$!: Observable<Country[]>;
  protected displayedColumns: string[] = [
    'code',
    'name',
    'capital',
    'population',
  ];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.listCountries();
  }

  private listCountries(): void {
    this.countries$ = this.countryService.listCountries();
  }
}
