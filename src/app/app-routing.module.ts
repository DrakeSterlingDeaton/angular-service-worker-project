import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LessonsComponent} from "./lessons/lessons.component";


 const routes: Routes = [
    {
        path: '',
        component: LessonsComponent
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
