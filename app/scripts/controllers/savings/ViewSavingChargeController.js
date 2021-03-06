(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewSavingChargeController: function (scope, resourceFactory, routeParams, location, $modal) {

            scope.savingId = routeParams.savingId;
            scope.chargeId = routeParams.id;
            if (routeParams.status == 'Submitted and pending approval') {
                scope.showEditButtons = true;
            }
            if (routeParams.status == 'Active') {
                scope.showWaiveButton = true;
            }
            resourceFactory.savingsResource.get({ resourceType: 'charges', accountId: scope.savingId, chargeId: scope.chargeId}, function (data) {
                scope.charge = data;
            });
            scope.deleteCharge = function () {
                $modal.open({
                    templateUrl: 'deletecharge.html',
                    controller: ChargeDeleteCtrl
                });
            };
            var ChargeDeleteCtrl = function ($scope, $modalInstance) {
                $scope.delete = function () {
                    resourceFactory.savingsResource.delete({ resourceType: 'charges', accountId: scope.savingId, chargeId: scope.chargeId}, {}, function (data) {
                        $modalInstance.close('delete');
                        location.path('/viewsavingaccount/' + scope.savingId);
                    });
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
            scope.waiveCharge = function () {
                resourceFactory.savingsResource.save({ resourceType: 'charges', accountId: scope.savingId, chargeId: scope.chargeId}, {}, function (data) {
                    location.path('/viewsavingaccount/' + scope.savingId);
                });
            };

        }
    });
    mifosX.ng.application.controller('ViewSavingChargeController', ['$scope', 'ResourceFactory', '$routeParams', '$location', '$modal', mifosX.controllers.ViewSavingChargeController]).run(function ($log) {
        $log.info("ViewSavingChargeController initialized");
    });
}(mifosX.controllers || {}));
