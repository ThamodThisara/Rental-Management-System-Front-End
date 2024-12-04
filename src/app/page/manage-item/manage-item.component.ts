import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-item',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterLink, ManageItemComponent],
  templateUrl: './manage-item.component.html',
  styleUrl: './manage-item.component.css'
})
export class ManageItemComponent {
  public itemList: any = [];
  public findItem: number | undefined;
  constructor(private http: HttpClient) {
    this.loadTabel();
  }

  public loadTabel() {
    this.http.get("http://localhost:8080/item/view-all")
      .subscribe(data => {
        this.itemList = data;
      });
  }

  deleteItem(id: any) {
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
        this.http.delete(`http://localhost:8080/item/delete/${id}`)
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

  public selectedItem: any = {};

  editItem(item: any) {
    this.selectedItem = item;
  }

  updateItem() {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.put("http://localhost:8080/item/update", this.selectedItem)
          .subscribe(data => {
            Swal.fire("Saved!", "", "success");
          })
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  searchItem() {
    this.http.get(`http://localhost:8080/item/get-by-id/${this.findItem}`)
      .subscribe(data => {
        if (data) {
          console.log(data);
          this.itemList = [data];
        } else{
          alert("No item found with the given ID!");
        }
      });
  }
}
