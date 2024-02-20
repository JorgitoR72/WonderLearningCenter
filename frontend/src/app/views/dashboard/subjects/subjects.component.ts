import { Component } from '@angular/core';
import { SubjectService } from '../../../services/api/subject/subject.service';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {

  constructor(public subjectService: SubjectService) { }

  public subjects: any[] = [];

  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe((res) => {
      this.subjects = res
      console.log(this.subjects)
    })
  }

  ngOnInit() {
    this.getAllSubjects()
  }
}
