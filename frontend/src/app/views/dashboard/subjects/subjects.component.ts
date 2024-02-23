import { Component, SecurityContext } from '@angular/core';
import { SubjectService } from '../../../services/api/subject/subject.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {

  constructor(public subjectService: SubjectService, public sanitizer: DomSanitizer) { }

  public subjects: any[] = [];
  public openSubject: any = {
    name: '',
    level: '',
    files: [],
  }
  public fileIframeUrl: any = ''

  public showBigCardFlag = false;
  public showFileBool = false;


  public showFile(url: any) {
    window.open(url, '', 'width=620,height=450,toolbar=no,location=no,menubar=no,copyhistory=no,status=no,directories=no,scrollbars=yes,resizable=yes'); return false;
  }

  public showBigCard(subject: any): void {
    this.openSubject.name = subject.name
    this.openSubject.level = subject.level
    this.openSubject.files = subject.files
    this.showBigCardFlag = true;
  }

  public showAllCards(): void {
    this.showBigCardFlag = false;
  }

  public getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe((res) => {
      this.subjects = res
      console.log(this.subjects)
    })
  }

  ngOnInit() {
    this.getAllSubjects()
  }
}
