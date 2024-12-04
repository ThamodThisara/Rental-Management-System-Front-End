import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-customer',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterLink, ManageCustomerComponent],
  templateUrl: './manage-customer.component.html',
  styleUrl: './manage-customer.component.css'
})
export class ManageCustomerComponent {
  public customerList: any = [];
  public findCustomer: String = "";
  constructor(private http: HttpClient) {
    this.loadTabel();
  }

  public loadTabel() {
    this.http.get("http://localhost:8080/customer/view-all")
      .subscribe(data => {
        this.customerList = data;
      });
  }

  deleteCustomer(id: any) {
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
        this.http.delete(`http://localhost:8080/customer/delete/${id}`)
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

  public selectedCustomer: any = {};

  editCustomer(customer: any) {
    this.selectedCustomer = customer;
  }

  updateCustomer() {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.http.put("http://localhost:8080/customer/update", this.selectedCustomer)
          .subscribe(data => {
            Swal.fire("Saved!", "", "success");
          })
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  searchCustomer() {
    this.http.get(`http://localhost:8080/customer/get-by-name/${this.findCustomer}`)
      .subscribe(data => {
        if (data!=null) {
          this.customerList = data;
        } else{
          alert("No customers found with the given name!");
        }
      });
  }
}
