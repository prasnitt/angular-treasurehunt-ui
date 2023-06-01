import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  template: `
    <h1>Error Page</h1>
    <div *ngIf="imageUrl">
      <img [src]="imageUrl" alt="Error Image">
    </div>
  `
})
export class ErrorPageComponent implements OnInit {
  imageUrl: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const value = params.get('value');
      const redirectUrl = params.get('redirectUrl');

      // Define the image URLs based on the value
      const imageUrls = {
        value1: '/assets/star.png',
        value2: 'path/to/image2.jpg',
        value3: 'path/to/image3.jpg',
        // Add more values and corresponding image URLs as needed
      };

      // Set the imageUrl based on the value
      this.imageUrl = value !== null ? (imageUrls as {[key: string]: string})[value] || null : null;

      // Check if redirectUrl is present and redirect after 5 seconds
      if (redirectUrl) {
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 5000);
      }
    });
  }
}
