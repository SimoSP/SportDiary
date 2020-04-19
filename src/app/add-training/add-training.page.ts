import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TrainingService } from '../shared/training-service';
@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.page.html',
  styleUrls: ['./add-training.page.scss'],
})
export class AddTrainingPage implements OnInit {
  trainingForm: FormGroup;

  constructor(
    private trService: TrainingService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.trainingForm = this.fb.group({
      name: [''],
      date: [''],
      start: [''],
      end: [''],
      notes: ['']
    })   
  }
  formSubmit() {
    if (!this.trainingForm.valid) {
      return false;
    } else {
      this.trService.createTraining(this.trainingForm.value).then(res => {
        console.log(res)
        this.trainingForm.reset();
        this.router.navigate(['/tracking']);
      })
        .catch(error => console.log(error));
    }
  }

}
