import { loremIpsum } from "lorem-ipsum";

export class Insurance {

    constructor(insuredId, startDate, endDate, premiumAmount, coverageDetails = loremIpsum({
        count: 2, format: "plain", units: "paragraphs", sentenceUpperBound: 10
    })) {
        this._insuredId = insuredId;
        this._policyNumber = 'POL' + Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        this._startDate = startDate;
        this._endDate = endDate;
        this._premiumAmount = premiumAmount;
        this._coverageDetails = coverageDetails;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get insuredId() {
        return this._insuredId;
    }

    set insuredId(value) {
        this._insuredId = value;
    }

    get policyNumber() {
        return this._policyNumber;
    }

    set policyNumber(value) {
        this._policyNumber = value;
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(value) {
        this._startDate = value;
    }

    get endDate() {
        return this._endDate;
    }

    set endDate(value) {
        this._endDate = value;
    }

    get premiumAmount() {
        return this._premiumAmount;
    }

    set premiumAmount(value) {
        this._premiumAmount = value;
    }

    get coverageDetails() {
        return this._coverageDetails;
    }

    set coverageDetails(value) {
        this._coverageDetails = value;
    }
}