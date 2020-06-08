const appModules = ['ngRoute', 'ngAnimate']
const employeeManagerApp = angular.module('employeeManagerApp', appModules)

const API_URL = 'https://employee-eipiai.herokuapp.com'

employeeManagerApp.config([
	'$routeProvider',
	'$locationProvider',
	($routeProvider, $locationProvider) => {
		$locationProvider.html5Mode(true)
		$routeProvider
			.when('/', {
				templateUrl: 'component/list.html',
				controller: 'employeeController'
			})
			.when('/add', {
				templateUrl: 'component/form.html',
				controller: 'employeeController'
			})
			.when('/edit/:employeeId', {
				templateUrl: 'component/form.html',
				controller: 'employeeController'
			})
			.when('/not-found', { templateUrl: 'component/not-found.html' })
			.otherwise({ redirectTo: '/not-found' })
	}
])

employeeManagerApp.controller('employeeController', [
	'$scope',
	'$http',
	'$location',
	'$routeParams',
	function ($scope, $http, $location, $routeParams) {
		$scope.order = 'name'
		$scope.ordersList = ['name', 'phoneNumber', 'age']

		function getEmployees() {
			$http.get(`${API_URL}/employees`)
			.then(({ data }) => ($scope.employees = data))
		}

		$scope.getEmployees = getEmployees
		getEmployees()

		$scope.removeEmployee = employee => {
			$http.delete(`${API_URL}/employees/${employee._id}`)
			.then(() => getEmployees())
		}

		function addEmployee() {
			$scope.isLoading = true
			$http.post(`${API_URL}/employees`, $scope.oneEmployee)
			.then(() => {
				$scope.isLoading = false
				$location.path('/')
			})
		}

		function editEmployee() {
			$scope.isLoading = true
			const { employeeId } = $routeParams
			$http.put(`${API_URL}/employees/${employeeId}`, $scope.oneEmployee)
				.then(() => {
					$scope.isLoading = false
					$location.path('/')
				})
		}

		$scope.loadEmployee = () => {
			const { employeeId = false } = $routeParams
			if (employeeId) $http.get(`${API_URL}/employees/${employeeId}`)
				.then(({ data }) => ($scope.oneEmployee = data))
		}

		$scope.handleSubmit = () => {
			const { employeeId = false } = $routeParams
			if (employeeId) return editEmployee()
			addEmployee()
		}
	}
])
