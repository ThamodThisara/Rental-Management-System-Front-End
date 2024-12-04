import { Routes } from '@angular/router';
import { NavComponent } from './common/nav/nav.component';
import { ManageCustomerComponent } from './page/manage-customer/manage-customer.component';
import { AddCustomerComponent } from './page/add-customer/add-customer.component';

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
    }
];
