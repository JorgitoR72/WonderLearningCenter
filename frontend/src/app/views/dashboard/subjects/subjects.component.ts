import { Component, SecurityContext } from '@angular/core';
import { SubjectService } from '../../../services/api/subject/subject.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {

  constructor(public subjectService: SubjectService, public sanitizer: DomSanitizer) { }

  protected file: FormGroup = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
  })

  public subjects: any[] = [];
  public openSubject: any = {
    id: 0,
    name: '',
    level: '',
    files: [],
  }
  public fileIframeUrl: any = ''

  public showBigCardFlag = false;
  public showFileBool = false;

  private user: any = window.localStorage.getItem('user')
  public role = (JSON.parse(this.user)).roles[0]

  public showFile(url: any) {
    window.open(url, '', 'width=620,height=450,toolbar=no,location=no,menubar=no,copyhistory=no,status=no,directories=no,scrollbars=yes,resizable=yes'); return false;
  }

  public showBigCard(subject: any): void {
    this.openSubject.id = subject.id
    this.openSubject.name = subject.name
    this.openSubject.level = subject.level
    this.openSubject.files = subject.files
    this.showBigCardFlag = true;
  }

  public showAllCards(): void {
    this.showBigCardFlag = false;
    this.file.reset()
  }

  public getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe((res) => {
      this.subjects = res
      console.log(this.subjects)
    })
  }

  public postNewFile(id: any) {
    let file = this.file.value;
    this.subjectService.postNewFile(id, file).subscribe((res) => {
      let newFile = {
        name: file.name,
        url: file.url,
        subject: id,
      }
      this.openSubject.files.push(newFile)
      console.log(this.openSubject.files)
    })
    this.file.reset()
  }

  ngOnInit() {
    this.getAllSubjects()
  }
}
