import { Routes } from '@angular/router';
import { NavComponent } from './common/nav/nav.component';
import { ManageCustomerComponent } from './page/manage-customer/manage-customer.component';
import { AddCustomerComponent } from './page/add-customer/add-customer.component';
import { ManageItemComponent } from './page/manage-item/manage-item.component';
import { AddItemComponent } from './page/add-item/add-item.component';
import { ManageRentalComponent } from './page/manage-rental/manage-rental.component';
import { AddRentalComponent } from './page/add-rental/add-rental.component';

export const routes: Routes = [
    {
        path : "manage-customer",
        component : ManageCustomerComponent,
    },
    {
        path : "manage-customer",
        children : [
            {
                path : "add-customer",
                component : AddCustomerComponent
            }
        ]
    },
    {
        path : "manage-item",
        component : ManageItemComponent,  
    },
    {
        path : "manage-item",
        children : [
            {
                path : "add-item",
                component : AddItemComponent
            }
        ]
    },
    {
        path : "manage-rental",
        component : ManageRentalComponent
    },
    {
        path : "manage-rental",
        children : [
            {
                path : "add-rental",
                component : AddRentalComponent
            }
        ]
    }
];
