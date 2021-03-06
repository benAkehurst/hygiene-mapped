import { Component, OnInit } from '@angular/core';

import { DataService } from './../../../services/data.service';
import { IPlace } from '../../../interfaces/place.interface';
import { londonData } from '../../../data/london.factory';
import { ratings } from '../../../data/ratings.factory';

@Component({
  selector: 'app-selectors',
  templateUrl: './selectors.component.html',
  styleUrls: ['./selectors.component.scss']
})
export class SelectorsComponent implements OnInit {
  public isLoading = false;
  public isReceived = false;
  public authorities: any;
  public ratings: Array<number>;
  public place: IPlace;
  public loadedPlaces: IPlace[];
  public chosenRating: string;
  public chosenAuthority: string;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.authorities = londonData;
    this.ratings = ratings;
  }

  public selectAuthority(auth) {
    this.chosenAuthority = auth;
  }

  public selectRating(rating) {
    this.chosenRating = rating.toString();
  }

  public selectPlaceParams() {
    this.getSelectedPlace(this.chosenRating, this.chosenAuthority);
  }

  public getSelectedPlace(rating: string, authority: string) {
    this.isLoading = true;
    this.isReceived = false;
    this.data.getLocationData(rating, authority).subscribe(res => {
      this.loadedPlaces = res;
      if (this.loadedPlaces.length > 1) {
        this.data.selectedLocations(this.loadedPlaces);
      }
      this.isLoading = false;
      this.isReceived = true;
    });
  }
}
