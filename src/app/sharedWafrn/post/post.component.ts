import { Component, Input, OnInit } from '@angular/core';
import { ProcessedPost } from 'src/app/interfaces/processed-post';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: ProcessedPost[];
  ready = false;

  mediaBaseUrl = environment.baseMediaUrl;



  constructor() { }

  ngOnInit(): void {
    this.ready = true;
  }

}
