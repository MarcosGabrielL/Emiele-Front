import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-destaque-hoje',
  templateUrl: './home-destaque-hoje.component.html',
  styleUrls: ['./home-destaque-hoje.component.css']
})
export class HomeDestaqueHojeComponent implements OnInit {

       hour: any;
        minute: any;
         second: any;
 
  constructor() { }

  ngOnInit(): void {
    //this.startTimer();
    this.startTime(25000);
  }

        
expirationCounter: string="";
startTime(secsToStart:number): void {
    var start: number = secsToStart;
    var h: number;
    var m: number;
    var s: number;
    var temp: number;
    var timer: any = setInterval(() =>
    {
        h = Math.floor(start / 60 / 60)
        // remove the hours
        temp = start - h * 60 * 60;
        m = Math.floor(temp / 60);
        // remove the minuets
        temp = temp - m * 60;
        // what left is the seconds
        s = temp;

        // add leading zeros for aesthetics
        this.hour = h < 10 ? "0" + h : h;
        this.minute = m < 10 ? "0" + m : m;
        this.second = s < 10 ? "0" + s : s;

        this.expirationCounter = this.hour + ":" + this.minute + ":" + this.second;
        
        if (start <= 0) {
            // Time elapsed
            clearInterval(timer);
            this.expirationCounter = "Expired";
            // Make here changes in gui when time elapsed
            //....
        }
        start--;
    }, 1000)
}




}
