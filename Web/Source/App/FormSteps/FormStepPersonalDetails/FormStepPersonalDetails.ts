﻿require(["jquery"]);
import ko = require("knockout");
import { FormStepBase, FormStepEnum } from "App/FormSteps/FormStepBase";
import { BookingDataService } from "App/Services/BookingDataService";
import { BookingData } from "App/Models/BookingData";

export class FormStepPersonalDetailsViewModel extends FormStepBase {
    
    doInit: () => void;
    isLoaded: KnockoutObservable<boolean>;
    bookingData: BookingData;
    
    constructor(params) {

        super(params);

        let self = this;

        this.bookingData = BookingDataService.getBookingData();
        this.visible = ko.observable(false);
        this.active = ko.observable(true);
        this.isLoaded = ko.observable(false);

        this.formStep = FormStepEnum.FormStepPersonalDetails;
        
    }
}


export class FormStepPersonalDetailsComponent {

    constructor() {

        return {
            viewModel: FormStepPersonalDetailsViewModel,
            template: require("text!./FormStepPersonalDetailsView.html")
        }
    }
}