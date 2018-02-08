import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelloService } from '../hello.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  private exactPath: string;
  private optionalMessage: string;
  public resultString: string;

  constructor(private route: ActivatedRoute, private helloService: HelloService) {
    this.route.params.subscribe((result) => {
      this.optionalMessage = result.msg;
    });
    this.exactPath = this.route.snapshot.data[0]['specificPath'];
  }

  ngOnInit() {
    switch (this.exactPath) {
      case 'api/hello/object':
        this.helloService.getHelloObject().subscribe((aHello) => {
          this.resultString = JSON.stringify(aHello);
        });
        break;
      case 'api/hello/select/all':
        this.helloService.getAllHellos().subscribe((hellos) => {
          this.resultString = hellos;
        });
        break;
      case 'api/hello/insert':
        if (this.optionalMessage) {
          this.helloService
          .insertCustomHello(this.optionalMessage).subscribe((stringified) => {
            this.resultString = stringified;
          });
        } else {
          this.helloService.insertHello().subscribe((stringified) => {
            this.resultString = stringified;
          });
        }
        break;
      case 'api/hello/string':
        this.helloService.getHelloString().subscribe((aHello) => {
          this.resultString = JSON.stringify(aHello);
        });
        this.resultString = 'Hello Onaje Baxley!';
        break;
    }
  }

}
