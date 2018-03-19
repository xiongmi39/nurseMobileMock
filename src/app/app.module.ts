import { NgModule, ErrorHandler, ModuleWithProviders } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {HttpModule, JsonpModule} from '@angular/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { ImageUploadModule } from 'angular2-image-upload';
import {Md5} from "ts-md5/dist/md5";

import { MyApp } from './app.component';

import { SafeUrl } from '../pipes/safe-url';
import { Todate } from '../pipes/todate';

import { CoursePage } from '../pages/course/course';
import { CourseListPage } from '../pages/course/courseList/courseList';
import { CourseDetailPage } from '../pages/course/courseDetail/courseDetail';
import { CourseLearnPage } from '../pages/course/courseLearn/courseLearn';
import { ModalAddPage } from '../pages/course/courseLearn/modalAddPage/modalAddPage';
import { ModalQPage } from '../pages/course/courseLearn/modalQPage/modalQPage';
import { MyCenterPage } from '../pages/myCenter/myCenter';
import { QuestionlistPage } from '../pages/questionlist/questionlist';
import { LogInPage } from '../pages/myCenter/logIn/logIn';
import { SetUpPage } from '../pages/myCenter/setUp/setUp';
import { HistoryPage } from '../pages/myCenter/history/history';
import { UserNotesPage } from '../pages/myCenter/user-notes/user-notes';
import { SchedulePage } from '../pages/myCenter/schedule/schedule';
import { ScorePage } from '../pages/myCenter/score/score';
import { ForgetpwdPage } from '../pages/myCenter/forgetpwd/forgetpwd';
import { PlanCourseListPage } from '../pages/myCenter/schedule/plan-course-list/plan-course-list';
import { MyDetailPagePage } from '../pages/myCenter/my-detail-page/my-detail-page';
import { CertificatePage } from '../pages/myCenter/certificate/certificate';
import { CollectionPage } from '../pages/myCenter/collection/collection';
import { RegisterPage } from '../pages/myCenter/register/register';
import { HomePage } from '../pages/home/home';
import { MessagePage } from '../pages/message/message';
import { MsgdetailPage } from '../pages/message/msgdetail/msgdetail';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';


import { HeaderbarComponent } from '../pages/headbar/HeaderbarComponent';
import { VideoComponent } from '../components/video-component/video-component';
import { CourseListComponent } from '../components/course-list-component/course-list-component';

import { CommonService } from '../providers/common/CommonService';
import { Localstorage } from '../providers/common/LocalStorage';
import { CourseService } from '../providers/course/CourseService';
import { CommonCheck } from '../providers/common/CommonCheck';
import { HomeService } from '../providers/home/HomeService';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { VideoPlayer } from '@ionic-native/video-player';


let rootRouterModule: ModuleWithProviders = RouterModule.forRoot(rootRouterConfig, {useHash: true});
@NgModule({
  declarations: [
    MyApp,
    CoursePage,
    CourseListPage,
    CourseDetailPage,
    CourseLearnPage,
    ModalAddPage,
    ModalQPage,
    VideoComponent,
    CourseListComponent,
    MyCenterPage,
    QuestionlistPage,
    LogInPage,
    SetUpPage,
    HistoryPage,
    UserNotesPage,
    SchedulePage,
    ScorePage,
    ForgetpwdPage,
    PlanCourseListPage,
    MyDetailPagePage,
    CertificatePage,
    CollectionPage,
    RegisterPage,
    HomePage,
    MessagePage,
    MsgdetailPage,
    TabsPage,
    SearchPage,
    HeaderbarComponent,
    SafeUrl,
    Todate
  ],
  imports: [
    // IonicModule.forRoot(MyApp,{
    //   tabsHideOnSubPages: 'true'         //隐藏全部子页面tabs
    // }),
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp,{  
    backButtonText: '返回',  
  }),
    ImageUploadModule.forRoot(),
    rootRouterModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CoursePage,
    CourseListPage,
    CourseDetailPage,
    CourseLearnPage,
    ModalAddPage,
    ModalQPage,
    VideoComponent,
    CourseListComponent,
    MyCenterPage,
    QuestionlistPage,
    LogInPage,
    SetUpPage,
    HistoryPage,
    UserNotesPage,
    SchedulePage,
    ScorePage,
    ForgetpwdPage,
    PlanCourseListPage,
    MyDetailPagePage,
    CertificatePage,
    CollectionPage,
    RegisterPage,
    HomePage,
    MessagePage,
    MsgdetailPage,
    TabsPage,
    HeaderbarComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    VideoPlayer,
    CommonService,
    Localstorage,
    CourseService,
    CommonCheck,
    HomeService,
    JsonpModule,
    ImageUploadModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
