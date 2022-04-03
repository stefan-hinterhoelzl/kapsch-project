import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
// @ts-ignore
import Typewriter from 't-writer.js';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public q?: string;
  constructor(private router: Router) {}

  ngOnInit(): void {

    const target = document.querySelector('.tw')
    const target2 = document.querySelector('.tw2')

    const writer = new Typewriter(target, {
      loop: false,
      typeSpeed: 50,
      deleteSpeed: 80,
      typeColor: '#cccccc',
      cursorColor: '#cccccc',
    })

    const writer2 = new Typewriter(target2, {
      loop: true,
      typeSpeed:80,
      deleteSpeed: 80,
      typeColor: "#3F51B5",
      cursorColor: "#3F51B5",
    })

    writer
      .type('Erfahren Sie die neuesten Live-Highlights zu Ihren Lieblingsthemen!')
      .rest(500)
      .then(writer2.start.bind(writer2))
      .start();

    writer2
      .type("Bitcoin")
      .rest(500)
      .remove(7)
      .type("Tesla")
      .rest(500)
      .remove(5)
      .type("Formel 1")
      .rest(500)
      .remove(8)
      .type("und vieles mehr!")
      .rest(500)
      .clear()
      .changeOps({typeSpeed: 50, deleteSpeed: 30})
      .type("Jetzt in der Menüleiste Ihren Suchbegriff eingeben!")
      .rest(3000)
      .clear()
      .changeOps({typeSpeed: 80, deleteSpeed: 80})

  }
  search() {
    if (this.q != undefined) {
        this.router.navigate(['results/'+this.q])
    }
  }




}
