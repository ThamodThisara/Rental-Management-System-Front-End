import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule,RouterLink,HttpClientModule,CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  constructor(private http : HttpClient){

  }

  public itemDetail: any = {
    name: "",
    rentalPerDay: 0.0,
    finePerDay: 0.0,
    availability: "",
  }

  addItem(){
    this.http.post("http://localhost:8080/item/add",this.itemDetail)
    .subscribe(data=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    })
  }
}



