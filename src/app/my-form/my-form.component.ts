import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {
  form: FormGroup;
  posts: any[];

  @Input()
  convert: string;


  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.form = this.fb.group({
      thb: [''],
      usd: [''],

    });
  }

  ngOnInit(): void {
    this.httpClient
      .get('https://api.exchangeratesapi.io/latest?base=THB')
      .subscribe(result => {
        this.posts = result as any[];
      })
  }

  submitForm() {
    // alert(JSON.stringify(this.form.value))
    console.log(this.posts["rates"].USD)
    console.log(this.form.value.thb)

    this.convert = ((this.posts["rates"].USD
      *
      Number(this.form.value.thb)).toFixed(2))

  }

}
