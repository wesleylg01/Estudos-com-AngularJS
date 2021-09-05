angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $filter, $http){
               $scope.app = "Lista Telefonica";

                // $scope.contatos = [
                //     {nome: $filter('uppercase')("Pablo"), telefone: "98989898988", data: new Date(), cor: "red", operadora:{nome:"Oi", codigo:14, categpria: "Celular"}},
                //     {nome: "Vitor Bueno", telefone: "235689956989", data: new Date(), cor: "green", operadora:{nome:"TIM", codigo:14, categpria: "Celular"}},
                //     {nome: "Igor Vinicius", telefone: "98989898988", data: new Date(), cor: "blue", operadora:{nome:"Algar", codigo:14, categpria: "Celular"}}
                // ];
                $scope.contatos = [];

                // $scope.operadoras = [
                //     {nome:"Oi", codigo:14, categpria: "Celular", preco:15},
                //     {nome:"Tim", codigo:15, categpria: "Celular", preco:18},
                //     {nome:"Claro", codigo:16, categpria: "Celular", preco:11},
                //     {nome:"Vivo", codigo:17, categpria: "Fixo", preco:10}
                // ];
                $scope.operadoras = [];

                var carregaContatos = function(){
                    $http.get("http://localhost:3412/contatos").sucess(function (data){
                        $scope.contato = data;    
                    });
                };
                
                var carregaOperadoras = function(){
                    $http.get("http://localhost:3412/operadoras").sucess(function (data){
                        $scope.operadoras = data;    
                    });
                };

                $scope.adcionarContato = function(contato){
                    contato.data = new Date();
                    $http.post("http://localhost:3412/contatos",contato).sucess(function (data){
                        delete $scope.contato;
                        $scope.contatoform.$setPristine();
                        carregaContatos();
                    });
                };

                $scope.ExcluirContato = function(contatos){
                    $scope.contatos =  contatos.filter(function (contato){
                        if (!contato.selecionado) return contato;
                    });

                };

                $scope.isContatoSelecionado = function(contatos){
                    return contatos.some(function(contato){
                        return contato.selecionado;
                    });
                };
                $scope.ordernarPor = function(campo){
                    $scope.criterioDeOrdencao = campo;
                    $scope.direcao = !$scope.direcao;
                };

                // cerrgarContatos();
                // carregaOperadoras();
			});