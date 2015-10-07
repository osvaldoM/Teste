'use strict';

// Ajudas controller
angular.module('ajudas').controller('AjudasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ajudas','Pergunta',
	function($scope, $stateParams, $location, Authentication, Ajudas,Pergunta) {
		$scope.authentication = Authentication;

		// Create new Ajuda
		$scope.create = function() {
			// Create new Ajuda object
			var ajuda = new Ajudas ({
				tipo: this.tipo,
				titulo: this.titulo,
				pergunta: pergunta_id
			});

			// Redirect after save
			ajuda.$save(function(response) {
				$location.path('ajudas/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Ajuda
		$scope.remove = function(ajuda) {
			if ( ajuda ) { 
				ajuda.$remove();

				for (var i in $scope.ajudas) {
					if ($scope.ajudas [i] === ajuda) {
						$scope.ajudas.splice(i, 1);
					}
				}
			} else {
				$scope.ajuda.$remove(function() {
					$location.path('ajudas');
				});
			}
		};

		// Update existing Ajuda
		$scope.update = function() {
			var ajuda = $scope.ajuda;

			ajuda.$update(function() {
				$location.path('ajudas/' + ajuda._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Ajudas
		$scope.find = function() {
			$scope.ajudas = Ajudas.query();
		};

		// Find existing Ajuda
		$scope.findOne = function() {
			$scope.ajuda = Ajudas.get({ 
				ajudaId: $stateParams.ajudaId
			});
		};
	}
]);