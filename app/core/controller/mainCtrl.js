app.controller("areaRestritaCtrl", function ($scope, $http, toastr) {

    $scope.addNovaEspecialidade = function (especialidadeNova) {

        $http.post("http://localhost:5000/SpringBootRestApi/api/especialidade/", JSON.stringify(especialidadeNova))
            .then(function success(response) {
                toastr.success("Especialidade adicionada com sucesso. Código: " + response.data.codigo);
                console.log(response)
            }, function error(error) {
                console.log(error);
                console.log("Problemas ao tentar adicionar especialidade.");
                alert("Erro ao tentar criar especialidade")
            });

    }

    $scope.addUnidadeSaude = function (unidadeNova) {

        $http.post("http://localhost:5000/SpringBootRestApi/api/unidade/", JSON.stringify(unidadeNova))
            .then(function success(response) {
                toastr.success("Unidade de Saúde adicionada com sucesso. Código: " +response.data.codigo);
            }, function error(error) {
                console.log(error);
                console.log("Problemas ao tentar adicionar unidade.");
                alert("Erro ao tentar criar Unidade de Saúde")
            });

    }

    $scope.addUnidadeAEspecialidade = function (unidade, especialide) {

        url = "http://localhost:5000/SpringBootRestApi/api//unidade/" + unidade.id + "/especialidade/" + especialide.codigo

        $http.put(url)
            .then(function success(response) {
                console.log(response)
                toastr.success("Especialidade adicionada á Unidade de Saúde com sucesso");
            }, function error(error) {
                console.log(error);
                console.log("Problemas ao tentar adicionar especialidade à unidade.");
                alert("Problemas ao tentar adicionar especialidade à unidade.")
            });
    }

    $scope.modificaQueixa = function (queixa) {

        url = "http://localhost:5000/SpringBootRestApi/api//queixa/modificacao/" + queixa.comentario +"/" + queixa.status + "/" + queixa.id

        $http.put(url)
            .then(function success(response) {
                console.log(response)
                toastr.success("Queixa alterada com sucesso");
            }, function error(error) {
                console.log(error);
                console.log("Problemas ao tentar modificar a queixa");
                alert("Problemas ao tentar modificar a queixa.")
            });

    }

})

app.controller("admLoginCtrl", function ($scope) {

    $scope.login  = function (adm) {

        user = "admin"
        password = "admin"

        if(adm.user == "admin") {
            if(adm.password == "admin") {
                alert("Login Realizado com Sucesso!")
                window.location.href = "#!/loginSucess"
            }
        }
    }
})

app.controller("registerComplaintCtrl", function ($scope, $http, toastr, $location) {

    $scope.registerComplaint = function (complaint) {
        $http.post("http://localhost:5000/SpringBootRestApi/api/queixa/", JSON.stringify(complaint))
            .then(function success(response) {
                toastr.success("Queixa adicionada com sucesso!");
                $location.path('/createdcomplaint/' + response.data.id);
            }, function error(error) {
                console.log(error);
                console.log("Problemas ao tentar adicionar queixa.");
            });
    }
});

app.controller("registerAnimalComplaintCtrl", function ($scope, $http, toastr, $location) {

    $scope.registerComplaint = function (complaint) {
        $http.post("http://localhost:5000/SpringBootRestApi/api/queixa/animal/", JSON.stringify(complaint))
            .then(function success(response) {
                toastr.success("Queixa adicionada com sucesso!");
                $location.path('/createdcomplaint/' + response.data.id);
            }, function error(error) {
                console.log(error);
                console.log("Problemas ao tentar adicionar queixa.");
            });
    }
});

app.controller("searchAverangeCtrl", function ($scope, $http) {

    $scope.average = null;

    $scope.searchAveragePerPatient = function (id) {
        $http.get("http://localhost:5000/SpringBootRestApi/api/geral/medicos/" + id).then(function successCallback(response) {
            $scope.average = response.data.obj;
        }, function errorCallback(error) {
            console.log("Unidade Não Encontrada");
        });
    }
});

app.controller("searchComplaintCtrl", function ($scope, $http) {
    $scope.complaint;

    $scope.searchComplaint = function (id) {
        $http.get("http://localhost:5000/SpringBootRestApi/api/queixa/" + id).then(function successCallback(response) {
            console.log(JSON.stringify(response.data));
            $scope.complaint = response.data;
        }, function errorCallback(error) {
            $scope.complaint = null;
            console.log(error);
        });
    }
});

app.controller("searchHealthUnitCtrl", function ($scope, $http) {

    $scope.units = [];

    $scope.searchHU = function (neighborhood) {

        url = "http://localhost:5000/SpringBootRestApi/api/unidade/busca/" + neighborhood

        $http.get(url)
            .then(function success(response) {
                $scope.units = [];
                $scope.units.push(response.data);
                console.log("Foram encontradas Unidades de saúde");
                console.log(response.data);
            }, function failed(error) {
                console.log("Erro na busca de unidades");
                console.log(error.data.errorMessage);
            });
    }
});

app.controller("generalSituationComplaintsCtrl", function ($scope, $http) {

    $scope.situation = "";

    var getGeneralSituationComplaints = function (neighborhood) {
        $http.get("http://localhost:5000/SpringBootRestApi/api/geral/situacao")
            .then(function success(response) {
                console.log(response.data.obj);

                if(response.data.obj == 0){
                    $scope.situation = {
                        status: "RUIM",
                        color: "label-danger"
                    };

                } else if(response.data.obj == 1){

                    $scope.situation = {
                        status: "REGULAR",
                        color: "label-primary"
                    };
                } else {
                    $scope.situation = "";
                    $scope.situation = {
                        status: "BOM",
                        color: "label-success"
                    };
                    
                }
            }, function failed(error) {
                console.log("Erro na busca de unidades");
                console.log(error.data.errorMessage);
            });
    }

    getGeneralSituationComplaints();
});

app.controller("messageCreatedComplaintCtrl", function ($scope, $routeParams) {
    $scope.responseComplaintId = "";
    var showMessage = function () {
        $scope.responseComplaintId = $routeParams.id;
    }

    showMessage();
});
