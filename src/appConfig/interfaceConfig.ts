//内网
// export const base:string = 'http://192.168.0.100:9400/';
//外网正式
// export const base:string = 'http://bl.buzzlysoft.com/';
//外网测试
// export const base:string = 'http://test.buzzlysoft.com/';
//本地测试
// export const base:string = 'http://localhost:50575/';
//MOCK
export const base:string = 'http://rap2api.taobao.org/app/mock/7189/GET/';
// export const base:string ='https://www.easy-mock.com/mock/5aa67a9492ef6c53856096a5/example';
// adminUsers

		// export const GET_COURSE_LIST:string = base +  '/Aers.svc/CourseFindOrderBySortField#!method=get';
		export const GET_COURSE_LIST:string = base +  '/Aers.svc/CourseFindOrderBySortField';
		export const GET_ALL_COURSE:string = base +  '/Aers.svc/CourseFindAll';
		export const COURSE_FIND_PAGING:string = base +  '/Aers.svc/CourseFindPaging';
		export const GET_COURSE_SECTION:string = base +  '/Aers.svc/CourseSectionFindByCourseID';
		export const GET_COURSE_DETAILS:string = base +  '/Aers.svc/CourseFindByCourseID';

		export const LOGIN:string = base +  '/Aers.svc/login';
		export const REGIST:string = base +  '/Aers.svc/Registeruser';
		export const UPDATEPWD:string = base +  '/Aers.svc/UpdatePwd';
		export const FORGETPWD:string = base +  '/Aers.svc/ForgetPwd';
		export const GET_STAFF:string = base +  '/Aers.svc/StaffFindAllByGrade';
		export const GET_CATEGORY:string = base +  '/Aers.svc/CourseCatalog_FindByCourseID';
		export const GET_QUESTION:string = base +  '/Aers.svc/Questions_FindByChapterID';
		export const ADD_ANSWERLIST:string = base +  '/Aers.svc/AddAnswerList';
		export const GET_ANSWER_BY_USERCOURSEID:string = base +  '/Aers.svc/GetAnswerByUserCourseID';
		export const GET_NOTES:string = base +  '/Aers.svc/NotesFindByCourseID';
		export const GET_NOTES_USERID:string = base +  '/Aers.svc/NotesFindByCourseIDUserID';
		export const GET_DISCUSS:string = base +  '/Aers.svc/ProblemFindByCourseID';
		export const ADD_DISCUSS:string = base +  '/Aers.svc/AddProblem';
		export const ADD_NOTE:string = base +  '/Aers.svc/AddNotes';
		export const DEL_NOTE:string = base +  '/Aers.svc/DeleteNote';
		export const GIVE_AGREE:string = base +  '/Aers.svc/AddFavor';
		export const GET_FAVOUR:string = base +  '/Aers.svc/GetFavour';
		export const GET_HOSPITAL:string = base +  '/Aers.svc/Gethospital';
		export const COLLECT_COURSE:string = base +  '/Aers.svc/AddCourseUser';
		export const SAVE_HISTORY_COURSE:string = base +  '/Aers.svc/SaveHistoryCourse';
		export const GET_USER_COURSE:string = base +  '/Aers.svc/CourseFindByUserID';
		export const GET_USER_HISCOURSE:string = base +  '/Aers.svc/CourseHistoryFindByUserID';
		export const GET_PLAYTIME_BY_COURSEIDUSERID:string = base +  '/Aers.svc/GetPlayTimeByCourseIdUserId';
		export const DELETE_COLLECTION:string = base +  '/Aers.svc/DeleteCourseUser';
		//个人信息
		export const FIND_BY_RUID:string = base + '/Aers.svc/FindByRUid';

		export const COURSE_FIND_ORDERBY_COURSETYPE:string = base + '/Aers.svc/CourseFindOrderByCourseType';
		export const BASICS_DEP_FINDALL:string = base + '/Aers.svc/BasicsdepFindAll';
		export const GET_HOSPITAL_UNION:string = base + '/Aers.svc/GethospitalUnion';
		export const GET_HOSPDEP_BY_HOSPID:string = base + '/Aers.svc/hospdepFindByHospId';
		export const COURSE_FIND_ORDERBY_HOSPID:string = base + '/Aers.svc/CourseFindOrderByHospId';
		export const STUDYSCHEDULE_FINDBY_HOSPDEPID:string = base + '/Aers.svc/StudyScheduleFindByHospdepId';
		export const PLANCONTENTS_FINDBY_HOSPDEPID:string = base + '/Aers.svc/PlancontentsFindByHospdepId';
		export const PLANCONTENTS_FINDBY_PLANID:string = base + '/Aers.svc/PlancontentsFindByPlanID';
		export const STATE_CODE:string = base + '/Aers.svc/statecode';

		export const CHECK_HAS_COLLECT:string = base + '/Aers.svc/CheckHasCollect';
		export const DELETE_NOTE:string = base + '/Aers.svc/DeleteNote';
		export const CANCEL_FAVOR:string = base + '/Aers.svc/CancelFavor';
		export const AUTHENTICATION_INFO:string = base + '/Aers.svc/AuthenticationInfo';
		export const GET_AUDITSTATUS:string = base + '/Aers.svc/GetAuditStatus';
		export const MESSAGE_FIND:string = base + '/Aers.svc/MessageFind';
		export const SMS_CODESEND:string = base + '/Aers.svc/SMSCodeSend';
		export const SMS_VERIFICATION:string = base + '/Aers.svc/SMSVerification';
		export const NEW_COURSE_DISTRIBUTE:string = base + '/Aers.svc/NewCourseDistribute';
		export const GET_NOTES_BY_REGUSEERID:string = base + '/Aers.svc/GetNotes';
		export const UPDATE_USER:string = base + '/Aers.svc/UpdateUser';
		export const IMG_HANDLER:string = base + '/ImgHandler.ashx';

		export const INTEGRAL_TOTAL_FINDBY_USERID:string = base + '/Aers.svc/IntegralTotalFindByUserID';
		export const INTEGRAL_FINDBY_USERID:string = base + '/Aers.svc/IntegralFindByUserID';
		export const CREDITRECORD_FINDBY_USERID:string = base + '/Aers.svc/CreditRecordFindByUserID';
		export const CREDITRECORD_TOTAL_BY_USERID:string = base + '/Aers.svc/CreditRecordTotalByUserID';

