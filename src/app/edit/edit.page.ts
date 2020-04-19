import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TrainingService } from './../shared/training-service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  updateTrainingForm: FormGroup;
  id: any;
  constructor(
    private trService: TrainingService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.trService.getTraining(this.id).valueChanges().subscribe(res => {
      this.updateTrainingForm.setValue(res);
    });
   }

  ngOnInit() {
    this.updateTrainingForm = this.fb.group({
      name: [''],
      date: [''],
      start: [''],
      end: [''],
      notes: ['']
    })
    console.log(this.updateTrainingForm.value)
  }
updateForm() {
  this.trService.updateTraining(this.id, this.updateTrainingForm.value)
    .then(() => {
      this.router.navigate(['/home']);
    })
    .catch(error => console.log(error));
}
}
