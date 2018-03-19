import { Routes } from '@angular/router';
import { SearchPage } from '../pages/search/search';
import { CoursePage } from '../pages/course/course';
import { HomePage } from '../pages/home/home';


export const rootRouterConfig: Routes = [
    {
        path: '',
        redirectTo: 'page-home',
        pathMatch: 'full'
    },
    {
        path: 'search',
        component: SearchPage
    },
    {
        path: 'course',
        component: CoursePage
    }
];