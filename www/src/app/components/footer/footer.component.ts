import { Component, OnInit } from '@angular/core';

import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faGithubSquare = faGithubSquare;
  faLinkedin = faLinkedin;

  constructor() { }

  ngOnInit() {
  }

}
