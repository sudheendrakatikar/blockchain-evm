import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  host: string = `${window.location.host}`;
  client_port = +this.host.substring(10);
  server_port = this.client_port-2;

  constructor(private http: HttpClient) { }

  baseUrl: String = 'http://127.0.0.1:'+this.server_port;

  startElection() {
    
  }

  checkVoter(voter_id) {
    return this.http.post(this.baseUrl+'/candidate/checkVoter', voter_id);
  }

  getCandidates() {
    return this.http.get(this.baseUrl+'/candidate/getCandidates');
  }

  saveVote(vote) {
    return this.http.post(this.baseUrl+'/vote/saveVote', vote);
  }

  getResults() {
    return this.http.get(this.baseUrl+'/vote/getResults');
  }

  verifyVote(candidate) {
    return this.http.post(this.baseUrl+'/blockchain/verifyVote', candidate);
  }
  
}
