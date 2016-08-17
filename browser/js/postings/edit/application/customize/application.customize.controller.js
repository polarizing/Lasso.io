app.controller('editApplicationCtrl', function(_, $scope, formlyVersion, $q, $http, sharedModal) {

    $scope.$watch(function() {
        return sharedModal.customFields;
    }, function (newVal, oldVal) {
        console.log("NEWVAL", newVal);
        $scope.model.customFields = newVal;
    }, true)
    // console.log('hi');

    // // CUSTOM FIELDS LOGIC

    // // WATCH FOR MODAL CHANGES SHARING SERVICE 
    // $scope.$watch(function() {
    //     return sharedModal.modal;
    // }, function(newCustomField, oldVal) {
    //     if (newCustomField) {
    //         // ADD IDS TO CUSTOM FIELDS
    //         newCustomField.id = $scope.lists[0].questions.length;
    //         // ADD TO FORM MODEL
    //         // $scope.model.customFields.push(newCustomField);
    //         // ADD TO VIEW (QUESTIONS-PREVIEW.HTML)
    //         $scope.lists[0].questions.push(newCustomField);
    //     }
    // })

    // $scope.dropCallback = function(event, index, item, external, type, allowedType) {
    //     $scope.logListEvent('dropped at', event, index, external, type);

    //     if (external) {
    //         if (allowedType === 'itemType' && !item.label) return false;
    //         if (allowedType === 'containerType' && !angular.isArray(item)) return false;
    //     }
    //     return item;
    // };

    // $scope.logEvent = function(message, event) {
    //     console.log(message, '(triggered by the following', event.type, 'event)');
    //     console.log(event);
    // };

    // $scope.logListEvent = function(action, event, index, external, type) {
    //     var message = external ? 'External ' : '';
    //     message += type + ' element is ' + action + ' position ' + index;
    //     $scope.logEvent(message, event);
    // };


    // $scope.lists = [{
    //     label: "Preview",
    //     questions: []
    // }];

    // var count = 0;
    // $scope.$watch('lists', function(newList, oldList) {
    //     // console.log($scope.model);
    //     // if (count % 2 !== 0) {
    //     //     $scope.stuff = $scope.lists[0].questions.map(function(question) {
    //     //         return question.field;
    //     //     })
    //     //     console.log($scope.stuff);
    //     //     console.log(count);
    //     // }
    //     // count++;
    //     // console.log($scope.stuff);
    //     // console.log($scope.stuff[0]);
    //     // console.log($scope.stuff[1]);
    //     // console.log('new', newList);
    //     // console.log('old', oldList);
    //     // console.log('should be full model', $scope.model);
    //     $scope.model.customFields = newList[0].questions;
    //     // console.log($scope.model.customFields);
    //     // console.log('lists', $scope.lists);
    //     // $scope.model.boo = "hi";
    //     // console.log($scope.model.customFields);
    //     // console.log($scope.model);
    // }, true)

    // $scope.stuff = [];

    // $scope.$watch('model', function(newModel, oldModel) {
    //     // console.log('inside model watch', $scope.model);
    //     // console.log('newModel', newModel);
    //     // console.log('oldModel', oldModel);
    //     // console.log('watch model new', newModel);
    // }, true)

    // // $scope.$watch('lists', function(lists) {
    // //     $scope.lists[0].questions.forEach(function (question, index) {
    // //         question.id = index;
    // //     })
    // //     $scope.model.customFields = lists[0].questions;
    // //     console.log($scope.model.customFields);
    // //     console.log($scope.model);
    // //     // $scope.modelAsJson = angular.toJson(lists, true);
    // // }, true)

    // $scope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
    //     sharedModal.modal = null;
    // });

    // CUSTOM QUESTIONS PREVIEW DRAGGABLE THINGY

    // FORM GENERATION 


    const vm = this;

    $scope.originalFields = angular.copy($scope.fields);

    // function definition
    function onSubmit() {

    }

    // function assignment
    $scope.onSubmit = onSubmit;

    $scope.env = {
        angularVersion: angular.version.full,
        formlyVersion: formlyVersion
    };

    $scope.model = {
        customFields: [],
    };

    $scope.options = {};

    $scope.toggleDataOption1 = [{
        label: 'mandatory',
        value: 0
    }]

    $scope.toggleDataOption2 = [{
        label: 'optional',
        value: 1
    }, {
        label: 'off',
        value: 2
    }]

    $scope.toggleDataOption3 = [{
        label: 'mandatory',
        value: 0
    }, {
        label: 'optional',
        value: 1
    }, {
        label: 'off',
        value: 2
    }]


    $scope.fields = [{
            noFormControl: true,
            className: 'col-md-12',
            template: '<h4 class="candidate-information-field-label">CANDIDATE INFORMATION</h4><hr>'
        }, {
            key: 'general.fullNameField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 0 },
            templateOptions: {
                label: 'Full Name',
                toggleData: $scope.toggleDataOption1,
                fieldData: { label: 'Full Name' }
            }
        }, {
            key: 'general.emailField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 0 },
            templateOptions: {
                label: 'Email',
                toggleData: $scope.toggleDataOption1,
                fieldData: { label: 'Email' }
            }
        }, {
            key: 'general.resumeField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 0 },
            templateOptions: {
                label: 'Resume/CV',
                toggleData: $scope.toggleDataOption3,
                fieldData: { label: 'Resume' }

            }
        }, {
            key: 'general.phoneField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Phone',
                toggleData: $scope.toggleDataOption3,
                fieldData: { label: 'Phone' }

            }
        }, {
            key: 'general.currentCompanyField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Current Company',
                toggleData: $scope.toggleDataOption3,
                fieldData: { label: 'Current Company' }
            }
        }, {
            noFormControl: false,
            className: 'col-md-12',

            template: '<h4 class="links-field-label">LINKS</h4><hr>'
        }, {
            key: 'links.linkedInLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'LinkedIn URL',
                toggleData: $scope.toggleDataOption2,
                fieldData: { label: 'LinkedIn URL' }

            }
        }, {
            key: 'links.twitterLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Twitter URL',
                toggleData: $scope.toggleDataOption2,
                fieldData: { label: 'Twitter URL' }

            }
        }, {
            key: 'links.githubLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'GitHub URL',
                toggleData: $scope.toggleDataOption2,
                fieldData: { label: 'GitHub URL' }

            }
        }, {
            key: 'links.portfolioLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Portfolio URL',
                toggleData: $scope.toggleDataOption2,
                fieldData: { label: 'Portfolio URL' }

            }
        }, {
            key: 'links.otherLinkField',
            type: 'toggleButton',
            className: 'col-md-12 toggle-field',
            defaultValue: { value: 1 },
            templateOptions: {
                label: 'Other Website',
                toggleData: $scope.toggleDataOption2,
                fieldData: { label: 'Other Website' }

            }
        }, {
            noFormControl: true,
            className: 'col-md-12',
            template: '<h4 class="custom-questions-field-label">CUSTOM QUESTIONS</h4><hr>'
        }, {
            noFormControl: true,
            className: 'col-md-12',
            templateUrl: '/js/postings/edit/application/customize/questions-preview.html',
        }, {
            noFormControl: true,
            className: 'col-md-12',
            templateUrl: '/js/postings/edit/application/modal/modal-popup.html'
        }


    ];

});
