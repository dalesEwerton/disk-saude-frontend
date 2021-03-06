app.config(function ($routeProvider) {
    $routeProvider.when("/",{
        templateUrl: "view/search.html"
    }).when("/login", {
        templateUrl:"view/admLogin.html",
        controller: "admLoginCtrl"
    }).when("/complaint_report", {
        templateUrl: "view/complaintReport.html",
        controller: "reportComplaintCtrl"
    }).when("/loginSucess", {
        templateUrl:"view/areaRestrita.html",
        controller: "areaRestritaCtrl"
    }).when("/complaint/register", {
        templateUrl: "view/registerComplaint.html",
        controller : "registerComplaintCtrl",
    }).when("/complaint/registerAnimal", {
        templateUrl: "view/registerAnimalComplaint.html",
        controller: "registerAnimalComplaintCtrl"
    }).when("/searchcomplaint", {
        templateUrl : "view/search_complaint.html",
        controller: "searchComplaintCtrl"
    }).when("/search_health_unit", {
        templateUrl: "view/searchHealthUnit.html",
        controller : "searchHealthUnitCtrl",
    }).when("/searchaverage",{
        templateUrl : "view/search_average_per_patient.html",
        controller: "searchAverangeCtrl"
    }).when("/createdcomplaint/:id", {
        templateUrl : "view/successPage.html",
        controller : "messageCreatedComplaintCtrl"
    }).when("/generalSituationComplaints", {
        templateUrl : "view/generalSituationComplaints.html",
        controller : "generalSituationComplaintsCtrl"
    }).otherwise({
        redirectTo: '/'
    });
});
