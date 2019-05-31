import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/helper.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  candidates: any;
  transaction_id: any;
  candidate_id: any;

  status: any;
  modal_heading: any;
  modal_body: any;

  constructor(private helper: HelperService) { }

  ngOnInit() {
    this.helper.getCandidates()
      .subscribe(candidates => {
        this.candidates = candidates;
      });
  }

  verifyVote() {
    var sendThis = {
      transaction_id: this.transaction_id,
      candidate_id: this.candidate_id
    }
    this.helper.verifyVote(sendThis)
    .subscribe(message => {
      this.status = message;
      if (this.status == true) {
        this.modal_heading = 'Yes!';
        this.modal_body = 'Your vote was registered successfully.';
      }
      else {
        this.modal_heading = 'Oops..';
        this.modal_body = 'Your vote has not been registered.';
      }
    });
  }

}
