import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/service/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  public id: number;
  property = new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.housingService.getProperty(this.id).subscribe((data: Property) => {
        this.property = data;
      });
    });

    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        thumbnailsColumns: 5,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/image/4zxm0.jpg',
        medium: 'assets/image/4zxm0.jpg',
        big: 'assets/image/4zxm0.jpg',
      },
      {
        small: 'assets/image/4zxm6.jpg',
        medium: 'assets/image/4zxm6.jpg',
        big: 'assets/image/4zxm6.jpg',
      },
      {
        small: 'assets/image/4zxm2.jpg',
        medium: 'assets/image/4zxm2.jpg',
        big: 'assets/image/4zxm2.jpg',
      },
      {
        small: 'assets/image/4zxm3.jpg',
        medium: 'assets/image/4zxm3.jpg',
        big: 'assets/image/4zxm3.jpg',
      },
      {
        small: 'assets/image/4zxma.jpg',
        medium: 'assets/image/4zxma.jpg',
        big: 'assets/image/4zxma.jpg',
      },
    ];
  }
}
