'use strict';

require('../app.js');
require('../planet/planetDataService.js');
require('../fleet/fleetDataService.js');
require('../game/gameConfigService.js');

angular.module('spacegame')
    .controller('MainController', ['$scope', 'planetData', 'fleetData', 'gameConfig', function ($scope, planetData, fleetData, gameConfig) {
        $scope.planets = planetData;
        $scope.fleets = fleetData;
        $scope.gameConfig = gameConfig;
        $scope.selection = {
            current: null,
            prev: null,
            fleet: null,
            planet: null
        };

        $scope.mousecoords = {
            x: 0,
            y: 0
        };

        $scope.mode = 'std';

        $scope.setMode = function (mode) {
            $scope.mode = mode;
        };

        //@todo: put this in a general game config for both fleet and planet
        $scope.planetsOrderOptions = [
            {name: "ID", value: "id"},
            {name: "Alphabetical", value: "name"},
            {name: "Population", value: "colony.pop"}
        ];

        $scope.planetsOrder = $scope.planetsOrderOptions[0].value;

        $scope.fleetsOrderOptions = [
            {name: "ID", value: "id"},
            {name: "Alphabetical", value: "name"}
        ];

        $scope.fleetsOrder = $scope.fleetsOrderOptions[0].value;

        $scope.selectPlanet = function (planet) {
            if ($scope.mode != "addWaypoint") {
                planet.planet = true; // hack to let object know what it is
                $scope.selection.planet = planet;
                $scope.selection.prev = $scope.selection.current;
                $scope.selection.current = planet;
            }
        };

        $scope.selectFleet = function (fleet) {
            if ($scope.mode != 'addWaypoint') {
                fleet.fleet = true; // hack to let object know what it is
                $scope.selection.fleet = fleet;
                $scope.selection.prev = $scope.selection.current;
                $scope.selection.current = fleet;
            }
        };

        $scope.selectFleetAndWaypoint = function (fleet, wp) {

            if ($scope.mode != 'addWaypoint') {
                //Select the fleet if it is not selected.
                if (!$scope.selection.fleet === fleet) {
                    $scope.selectFleet(fleet);
                }

                fleet.waypoints.forEach(function (waypoint) {
                        waypoint.isSelected = false;
                    }
                );

                wp.isSelected = true;
            }
        };

        $scope.addWaypoint = function (coords) {
            if ($scope.mode == "addWaypoint" && $scope.selection.current.fleet) {
                if ($scope.selection.current.waypoints === null || $scope.selection.current.waypoints === undefined) {
                    $scope.selection.current.waypoints = []
                }

                $scope.selection.current.waypoints.push({
                    x: coords.x,
                    y: coords.y,
                    speed: 5
                });
            }
        };

        $scope.removeWaypoint = function (waypoint) {
            var index = $scope.selection.current.waypoints.indexOf(waypoint);
            $scope.selection.current.waypoints.splice(index, 1);
        };

        $scope.editWaypoint = function (waypoint) {
            $scope.selection.current.waypoints
        };
    }]);