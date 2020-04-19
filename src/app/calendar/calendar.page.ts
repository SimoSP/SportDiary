import { Component, OnInit } from '@angular/core';
import { Training } from '../shared/Training';
import { TrainingService } from './../shared/training-service';
import { ModalController } from '@ionic/angular';
import { CalendarModal, CalendarModalOptions, CalendarComponentOptions } from 'ion2-calendar';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  type: 'string';
  Trainings = [];
  date: {
    from: string
    to: string
    name: string
  } = {
    from: '2020-04-19',
    to: '2020-04-23',
    name: '2020-04-26'
  };
  options: CalendarComponentOptions = {
    from: new Date(2000, 0, 1),
    pickMode: 'range'
  };
  

  constructor(
    private trService: TrainingService,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController
    ) { }
  
  async _toastWrap(Bookings: string, payload: {}) {
    let toast = await this.toastCtrl.create({
      message: `${Bookings}: ${JSON.stringify(payload, null, 2)}`,
      duration: 2000,
    });
    toast.present()
  }
  
  onChange(event) {
    console.log("onchange event called");
  }
  onSelect() {
    const options: CalendarModalOptions = {
      title: 'BASIC',
    };
 
  }
  
  
  ngOnInit() {
    this.fetchTrainings();
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
  fetchTrainings() {
    this.trService.getTrainingList().valueChanges().subscribe(res => {
      console.log(res);
    });
  }
  

}
