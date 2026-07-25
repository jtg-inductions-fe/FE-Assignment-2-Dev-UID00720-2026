import { Component, Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AddRestaurant, Restaurants } from '@src/app/models/restaurant.model';
import { RestaurantService } from '@src/app/core/services/restaurant/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss'],
})
export class RestaurantFormComponent implements OnInit {
  @Input() action = '';
  @Input() restaurant: Restaurants | null = null;

  restaurantForm: FormGroup;

  // Chip Configuration
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router
  ) {
    this.restaurantForm = this.fb.group({
      restaurantName: ['', Validators.required],
      address: ['', Validators.required],
      ownerEmails: this.fb.array<string>([]), // FormArray to hold email strings
    });
  }

  ngOnInit(): void {
    if (this.action === 'SAVE CHANGES') {
      this.restaurantForm
        .get('restaurantName')
        ?.setValue(this.restaurant?.name);
      this.restaurantForm.get('address')?.setValue(this.restaurant?.address);
      this.restaurantForm
        .get('ownerEmails')
        ?.setValue(this.convertToFormArray(this.restaurant?.ownersEmail));
    }
  }

  // Getter to access the FormArray easily
  get ownerEmails(): FormArray {
    return this.restaurantForm.get('ownerEmails') as FormArray;
  }

  // Add Email Chip
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value && emailRegex.test(value)) {
      // Check for duplicates in the FormArray
      const currentEmails = this.ownerEmails.value;
      if (!currentEmails.includes(value)) {
        this.ownerEmails.push(this.fb.control(value));
      }
    }

    // To clear input after user enter email
    if (event.input) {
      event.input.value = '';
    }
  }

  // Remove Email Chip by Index
  remove(index: number): void {
    this.ownerEmails.removeAt(index);
  }

  getEmailsArray(formArray: FormArray): string[] {
    return formArray.controls.map(control => control.value);
  }

  convertToFormArray(emails: string[] | undefined): FormArray {
    if (!emails) return this.fb.array<string>([]);
    return this.fb.array(emails.map(email => this.fb.control(email)));
  }

  // Submit Handler
  onSubmit() {
    if (this.restaurantForm.valid) {
      const emails: string[] = this.getEmailsArray(
        this.restaurantForm.get('ownerEmails') as FormArray
      );
      if (this.action === 'CREATE RESTAURANT') {
        const restaurantDetails: AddRestaurant = {
          name: this.restaurantForm.value.restaurantName,
          address: this.restaurantForm.value.address,
          owners: emails,
        };
        this.restaurantService.addRestaurant(restaurantDetails);
        this.router.navigate(['/restaurant']);
      }
    }
  }
}
