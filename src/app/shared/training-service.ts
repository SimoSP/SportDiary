import { Injectable } from '@angular/core';
import { Training } from '../shared/Training';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class TrainingService {
  trainingListRef: AngularFireList<any>;
  trainingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Creating single training
  createTraining(tr: Training) {
    return this.trainingListRef.push({
      name: tr.name,
      date: tr.date,
      start: tr.start,
      end: tr.end,
      notes: tr.notes
    })
  }

  // Get Single training
  getTraining(id: string) {
    this.trainingRef = this.db.object('/training/' + id);
    return this.trainingRef;
  }

  // Get training list from database
  getTrainingList() {
    this.trainingListRef = this.db.list('/training');
    return this.trainingListRef;
  }

  // Update training
  updateTraining(id, tr: Training) {
    return this.trainingRef.update({
        name: tr.name,
        date: tr.date,
        start: tr.start,
        end: tr.end,
        notes: tr.notes
    })
  }

  // Delete single training
  deleteTraining(id: string) {
    this.trainingRef = this.db.object('/training/' + id);
    this.trainingRef.remove();
  }
}