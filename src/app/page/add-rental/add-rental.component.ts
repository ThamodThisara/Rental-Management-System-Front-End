import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-rental',
  standalone: true,
  imports: [FormsModule,RouterLink,HttpClientModule,CommonModule],
  templateUrl: './add-rental.component.html',
  styleUrl: './add-rental.component.css'
})
export class AddRentalComponent {
  constructor(private http : HttpClient){

  }

  public rentalDetail: any = {
    rentalDate: "",
    returnDate: "",
    dueDate: "",
    totalCost: 0.0
  }

  addRental(){
    this.http.post("http://localhost:8080/rental/add",this.rentalDetail)
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
