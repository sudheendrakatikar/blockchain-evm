import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { Router } from '@angular/router';
import { HelperService } from '../../helper.service';
 
@Component({
    selector: 'app-root',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    
    status: any;
    voter_id: any;
    transaction_id: any;

    constructor(
        private router: Router,
        private helper: HelperService
    ) {}

    @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;
    
    ngOnInit() {
        
        this.qrScannerComponent.getMediaDevices().then(devices => {
            console.log(devices);
            const videoDevices: MediaDeviceInfo[] = [];
            for (const device of devices) {
                if (device.kind.toString() === 'videoinput') {
                    videoDevices.push(device);
                }
            }
            if (videoDevices.length > 0){
                let choosenDev;
                for (const dev of videoDevices){
                    if (dev.label.includes('front')){
                        choosenDev = dev;
                        break;
                    }
                }
                if (choosenDev) {
                    this.qrScannerComponent.chooseCamera.next(choosenDev);
                } else {
                    this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
                }
            }
        });
 
        this.qrScannerComponent.capturedQr.subscribe(result => {
            this.voter_id = JSON.parse(result).id;
            this.helper.checkVoter({"voter_id": this.voter_id})
                .subscribe(status => {
                    if (status == false) {
                        localStorage.setItem('voter', result);
                        this.router.navigate(['/vote']);
                    }
                    else {
                        console.log(status);
                        this.transaction_id = status;
                        localStorage.setItem('transaction_id', this.transaction_id.transaction_id);
                        this.router.navigate(['/final']);
                    }
                });
        });
    }

}