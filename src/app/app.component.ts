import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm = false;

  polls = [{
    question: 'Do you like dogs or cats?',
    image: 'https://images.pexels.com/photos/1909802/pexels-photo-1909802.jpeg',
    votes: [0, 5, 7],
    voted: true
  },
  {
    question: 'Best month for summer holidays?',
    image: 'https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg',
    votes: [1, 6, 4],
    voted: false
  }
  ];
}
