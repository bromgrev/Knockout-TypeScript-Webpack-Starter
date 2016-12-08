﻿require("expose?window.jQuery!jquery");
//require('jquery.redirect');
import ko = require("knockout");
import validation = require("knockout.validation");
import { FormStepsManager } from "App/FormSteps/FormStepsManager";
import { FormStepBase } from "App/FormSteps/FormStepBase";
import { BookingDataService } from "App/Services/BookingDataService";
import { BookingData } from "App/Models/BookingData";


export class NavigationViewModel {          

    currentStep: KnockoutObservable<FormStepBase>;

    constructor(params) {
        this.currentStep = FormStepsManager.currentStep;
    }

    doSubmit() {

        const result = ko.validation.group(FormStepsManager.currentStep().validationModel, { deep: true });

        if (result().length > 0) {
            result.showAllMessages(true);
            return;
        }

        // Perform some action with the data you have gathered here.
        console.log("Send some data back to the server at this point.");
        
        FormStepsManager.goToNextStep();
    }

    goToNextStep() {        
        FormStepsManager.goToNextStep();
    }

    goToPreviousStep() {
        FormStepsManager.goToPreviousStep();  
    }

    isFirstStep(): boolean {

        if (FormStepsManager.currentStep === undefined || FormStepsManager.currentStep === null) {
            return true;
        }

        if (FormStepsManager.currentStep().order === 0) {
            return true;
        } else {
            return false;
        }
    }

    isSubmitStep(): boolean {

        if (FormStepsManager.currentStep === undefined || FormStepsManager.currentStep === null) {
            return true;
        }

        if (FormStepsManager.currentStep().order === FormStepsManager.formSteps.length - 2) {
            return true;
        } else {
            return false;
        }
    }

    isLastStep(): boolean {

        if (FormStepsManager.currentStep === undefined || FormStepsManager.currentStep === null) {
            return true;
        }

        if (FormStepsManager.currentStep().order === FormStepsManager.formSteps.length - 1) {
            return true;
        } else {
            return false;
        }
    }
}

export class NavigationComponent {

    constructor() {

        return {
            viewModel: NavigationViewModel,
            template: require("text!./NavigationView.html")
        }
    }
}