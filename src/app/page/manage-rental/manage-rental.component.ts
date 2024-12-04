import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-rental',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterLink, ManageRentalComponent],
  templateUrl: './manage-rental.component.html',
  styleUrl: './manage-rental.component.css'
})
export class ManageRentalComponent {
  public rentalList: any = [];
  public findRental: number | undefined;
  constructor(private http: HttpClient) {
    this.loadTabel();
  }

  public loadTabel() {
    this.http.get("http://localhost:8080/rental/view-all")
      .subscribe(data => {
        this.rentalList = data;
      });
  }

  deleteRental(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8080/rental/delete/${id}`)
          .subscribe(data => {
            this.loadTabel();
          })
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  public selectedRental: any = {};

  editRental(rental: any) {
    this.selectedRental = rental;
  }

  updateRental() {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.put("http://localhost:8080/rental/update", this.selectedRental)
          .subscribe(data => {
            Swal.fire("Saved!", "", "success");
          })
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  searchRental() {
    this.http.get(`http://localhost:8080/rental/get-by-id/${this.findRental}`)
      .subscribe(data => {
        if (data) {
          console.log(data);
          this.rentalList = [data];
        } else{
          alert("No item found with the given ID!");
        }
      });
  }
}
