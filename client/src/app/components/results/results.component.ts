import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/helper.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  candidates: any;
  results: any;
  final: any = [];

  constructor(private helper: HelperService) { }

  ngOnInit() {

    this.helper.getCandidates()
    .subscribe(candidates => {
      this.candidates = candidates;
      console.log(this.candidates);

      this.helper.getResults()
      .subscribe(results => {
        this.results = results;
        console.log(this.results);

        for (var i=0 ; i<this.candidates.length ; i++) {
          if (this.results[i] == undefined) {
            
          }
          else {
            var temp = {
              id: this.candidates[i].id,
              name: this.candidates[i].name,
              party: this.candidates[i].party,
              symbol: this.candidates[i].symbol,
              votes: this.results[i].count
            }
            this.final.push(temp);
          }
        }
      });

    });

  }

  clicker() {
    console.log(this.final);
  }

}
