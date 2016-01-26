'use strict';

angular.module('imageEditorApp')
    .controller('MainCtrl', function ($scope) {

        $scope.setImageFile = function (element) {
            var reader = new FileReader();
            reader.onload = function (e) {
                //set image src 
                $scope.image.src = e.target.result;
            };
            reader.readAsDataURL(element.files[0]);
            $scope.image.onload = $scope.resetImage;
        };

        $scope.init = function () {
            $scope.brightness = 0;
            $scope.contrast = 1;
            $scope.strength = 1;
            $scope.color = {
                red: 255,
                green: 189,
                blue: 0
            };
            $scope.autocontrast = false;
            $scope.vignette = false;
            $scope.canvas = angular.element('#myCanvas')[0];
            $scope.ctx = $scope.canvas.getContext("2d");
            $scope.image = new Image();

            $scope.vignImage = new Image();
        };

        $scope.init();

        $scope.resetImage = function () {
            $scope.ctx.drawImage($scope.image, 0, 0, $scope.canvas.width = $scope.image.width, $scope.canvas.height = $scope.image.height);

            $scope.vignImage.src = 'images/vignette.jpg';
        };

        $scope.adjustBrightness = function () {
            //$scope.resetImage();
            var value = parseInt($scope.brightness);
            var imageData = $scope.ctx.getImageData(0, 0, $scope.image.width, $scope.image.height);
            for (var i = 0; i < imageData.data.length; i += 4) {
                imageData.data[i] += value; // Red
                imageData.data[i + 1] += value; // Green
                imageData.data[i + 2] += value; // Blue
            }
            $scope.ctx.clearRect(0, 0, $scope.image.width, $scope.image.height);
            $scope.ctx.putImageData(imageData, 0, 0);
        };

        $scope.adjustContrast = function () {
            //$scope.resetImage();
            var value2 = parseFloat($scope.contrast);
            var imageData = $scope.ctx.getImageData(0, 0, $scope.image.width, $scope.image.height);
            for (var i = 0; i < imageData.data.length; i += 4) {
                imageData.data[i] = (imageData.data[i] - 128) * value2 + 128; // Red
                imageData.data[i + 1] = (imageData.data[i + 1] - 128) * value2 + 128; // Green
                imageData.data[i + 2] = (imageData.data[i + 2] - 128) * value2 + 128; // Blue
            }
            $scope.ctx.clearRect(0, 0, $scope.image.width, $scope.image.height);
            $scope.ctx.putImageData(imageData, 0, 0);
        };

        $scope.tint = function () {
            //$scope.resetImage();
            var value3 = parseInt($scope.strength);
            var imageData = $scope.ctx.getImageData(0, 0, $scope.image.width, $scope.image.height);
            for (var i = 0; i < imageData.data.length; i += 4) {
                imageData.data[i] = imageData.data[i] + ($scope.color.red * value3 / 100); // Red
                imageData.data[i + 1] = imageData.data[i + 1] + ($scope.color.green * value3 / 100); // Green
                imageData.data[i + 2] = imageData.data[i + 2] + ($scope.color.blue * value3 / 100); // Blue
            }
            $scope.ctx.clearRect(0, 0, $scope.image.width, $scope.image.height);
            $scope.ctx.putImageData(imageData, 0, 0);
        };
    
        $scope.applyFilters = function () {
            $scope.resetImage();
            $scope.tint();
            $scope.adjustBrightness();
            $scope.adjustContrast();
            $scope.setVignette();
            
        };

        var resetVign = function () {
            var cn = document.createElement('canvas');
            var ctx = $scope.cn.getContext("2d");
            ctx.drawImage($scope.vignImage, 0, 0, $scope.vignImage.width, $scope.vignImage.height, 0, 0, cn.width, cn.height);

            $scope.vignData = ctx.getImageData(0, 0, cn.width, cn.height);
            $scope.vignPixels = scope.vignData.data;
        };

        $scope.setVignette = function () {
                Po = Pi * Pv / 255;
            };
        var saveImg = function () {
            var imgDataAsUrl = $scope.canvas.toDataUrl('image/png');
            $scope.url = imgDataAsUrl;
        };
    })





    .config(function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|coui|data):/);
        
    });