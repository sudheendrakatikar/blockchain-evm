import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  candidates: any;
  message: any;
  voted_id: number = 0;

  constructor(
    private helper: HelperService,
    private router: Router
  ) { }

  ngOnInit() {
    this.helper.getCandidates()
      .subscribe(candidates => {
        this.candidates = candidates;
      });
  }
  
  voteForCandidate(candidate) {
    var sendThis = {
      candidate_id: candidate.id,
      voter_id: JSON.parse(localStorage.getItem('voter')).id
    }
    this.helper.saveVote(sendThis)
      .subscribe(message => {
        this.message = JSON.stringify(message);
        localStorage.setItem('transaction_id', JSON.parse(this.message).msg);
        setTimeout(() => {
          this.router.navigate(['final']);
        }
        ,3000);
      });
  }

  mouseDown(id) {
    this.voted_id = id;
    let audio = new Audio();
    audio.src = '../../../assets/beep.mp3';
    audio.load();
    audio.play();
  }

}