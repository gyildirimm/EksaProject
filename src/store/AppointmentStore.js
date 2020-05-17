import { observable, configure, action, runInAction, autorun } from 'mobx';
import axios from 'axios';
import { AsyncStorage } from 'react-native'
import { observer } from 'mobx-react';
configure({ enforceActions: "observed" });
class AppointmentStore {

    @observable hospitalsData = [];
    @observable sectionsData = [];
    @observable historyData = [];
    @observable doctorData = [];
    @observable appointmentTimes = [];
    @observable dataState // "pending" / "done" / "error"
    @observable selectedHospital = null;
    @observable selectedHospitalId = null;
    @observable selectedSection = null;
    @observable selectedSectionId = null;
    @observable selectedDate = null;
    @observable selectedHourStirng = null;
    @observable selectedDoctorId = null;
    @observable selectedDoctorName = null;
    @observable selectedDoctorTimeId = null;
    @observable swipeAppoinment = false;
    @observable nextStepValue = 'disable';
    @observable nextStepValueTwo = 'disable';

    constructor() {
        autorun(() => {
            this.start()
        });
    }

    start = async () => {
        this.cleanAll();
        this.date();
        this.dataState = true
        this.hospitals();
        console.log('Autorun');
    }
    hospitals = async () => {
        try {
            let response = await fetch('https://www.matmaca.com/api/appointment/getHospital');
            let json = await response.json();
            this.changeHospitalData(json);
            this.sections();
        } catch (error) {
            console.error(error);
        }
    }

    sections = async () => {

        try {
            let response = await fetch("https://www.matmaca.com/api/appointment/getSection");
            let json = await response.json();
            this.changeSectionData(json);
            this.appointmentHistory();
        } catch (error) {
            console.error(error);
        }
    }

    appointmentHistory = async () => {
        try {
            let response = await fetch("https://www.matmaca.com/api/appointment/GetAppointmentHistory?id=160313043")
            let json = await response.json();
            this.changeHistoryData(json);
            this.changeState();
        } catch (error) {
            console.error(error);
        }
    }
    doctors = async () => {
        try {
            let response = await fetch("https://www.matmaca.com/api/appointment/GetDoctors?id=" + this.selectedHospitalId)
            let json = await response.json();

            console.log("https://www.matmaca.com/api/appointment/GetDoctors?id=" + this.selectedHospitalId);

            this.changeDoctorData(json);
        } catch (error) {
            console.error(error);
        }
    }

    getAppointmentTime = async () => {
        var url = "https://www.matmaca.com/api/appointment/getDoctorTimes?id=" + this.selectedDoctorId + "&date=" + this.selectedDate;
        console.log('URL : ' + url);
        try {
            let response = await fetch(url)
            let json = await response.json();
            this.changeAppoitmentTimesDate(json);
        } catch (error) {
            console.error(error);
        }
    }
    date = () => {
        var date = new Date();
        var month = date.getUTCMonth() + 1;
        var timezone = date.getUTCFullYear() + '-' + month + '-' + date.getDate();
        this.changeDate(timezone);
    }

    @action cleanAll = async () => {
        runInAction(() => {
                this.doctorData = [];
                this.appointmentTimes = [];
                this.dataState = null,
                this.selectedHospital = null,
                this.selectedHospitalId = null,
                this.selectedSection = null,
                this.selectedSectionId = null,
                this.selectedDoctorId = null,
                this.swipeAppoinment = false,
                this.nextStepValue = 'disable';
                this.nextStepValueTwo = 'disable';
        });
    }
    @action changeState = () => {
        runInAction(() => { this.dataState = false });
    }
    @action changeStateTrue = () => {
        runInAction(() => { this.dataState = true });
    }
    @action changeSwipeAppointment = () => {
        runInAction(() => { this.swipeAppoinment = true });
    }
    @action changeDate = (date) => {
        runInAction(() => { this.selectedDate = date });
    }
    @action changeHospitalName = (hospital, id) => {
        runInAction(() => { this.selectedHospital = hospital, this.selectedHospitalId = id, this.nextStepValueTwo = 'none' });
        this.doctors();
    }
    @action changeSectionName = (section, id) => {
        runInAction(() => { this.selectedSection = section, this.selectedSectionId = id });
    }
    @action changeDoctorId = (id, name) => {
        runInAction(() => { this.selectedDoctorId = id, this.selectedDoctorName = name });
    }
    @action changeSelectedDoctorTimes = (id, name) => {
        runInAction(() => { this.selectedDoctorTimeId = id, this.selectedHourStirng = name, this.nextStepValueTwo = null });
    }
    @action changeDoctorData = (data) => {
        runInAction(() => { this.doctorData = data });
    }
    @action changeHospitalData = (data) => {
        runInAction(() => { this.hospitalsData = data });
    }
    @action changeHistoryData = (data) => {
        runInAction(() => { this.historyData = data });
    }
    @action changeSectionData = (data) => {
        runInAction(() => { this.sectionsData = data });
    }
    @action changeAppoitmentTimesDate = (data) => {
        runInAction(() => { this.appointmentTimes = data });
    }
    @action controlNextStep = () => {
        if (this.selectedSectionId != null && this.selectedHospitalId != null && this.doctorData != []) {
            runInAction(() => { this.nextStepValue = null });
        }
        else {
            console.log('Dolu' + this.selectedSectionId)
            console.log('Dolu' + this.selectedHospitalId)
        }
    }
    @action getSwipeAppointment = async () => {
        try {
            this.selectedDoctorTimeId = this.selectedDoctorTimeId == null ? 0 : this.selectedDoctorTimeId;
            this.changeStateTrue();
            let response = await fetch("https://www.matmaca.com/api/appointment/postappointment?date=" + this.selectedDate + "&DoctorId=" + this.selectedDoctorId + "&HastaneId=" + this.selectedHospitalId + "&SectionId=" + this.selectedSectionId + "&complaint=denemeMobil&userIdentityNumber=160313043&timeId="+ this.selectedDoctorTimeId)
            let json = await response.json();

            console.log("https://www.matmaca.com/api/appointment/postappointment?date=" + this.selectedDate + "&DoctorId=" + this.selectedDoctorId + "&HastaneId=" + this.selectedHospitalId + "&SectionId=" + this.selectedSectionId + "&complaint=denemeMobil&userIdentityNumber=160313043&timeId="+ this.selectedDoctorTimeId);
            console.log(json);

            if (json == false) {
                alert('Başarısız !');
            }
            else {
                alert('Başarılı !');
                this.start();
            }
        } catch (error) {
            console.error(error);
        }
    }

}
export default new AppointmentStore()