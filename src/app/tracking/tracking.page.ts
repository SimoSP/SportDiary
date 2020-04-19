import { Component, OnInit } from '@angular/core';
import { Training } from '../shared/Training';
import { TrainingService } from './../shared/training-service';


@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {
  Trainings = [];
  constructor(private trService: TrainingService) { }

  ngOnInit() {
    this.fetchTraining();
    let bookingRes = this.trService.getTrainingList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Trainings = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Trainings.push(a as Training);
      });
    });
  }
  fetchTraining() {
    this.trService.getTrainingList().valueChanges().subscribe(res => {
      console.log(res);
    });
  }

  deleteTraining(id) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.trService.deleteTraining(id);
    }
  }
}
