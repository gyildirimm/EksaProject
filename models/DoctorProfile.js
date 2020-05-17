export default class DoctorProfile 
{
    constructor( identityNumber ,name , surname , title , section , hospital , adresse , district , province)
    {
        this.identityNumber = identityNumber;
        this.name  =name;
        this.surname = surname;
        this.title = title;
        this.section = section;
        this.hospital = hospital;
        this.adresse = adresse;
        this.district = district;
        this.province = province;
    }

    getIdentityNumber = () =>
    {
        return this.identityNumber;
    }
    getName = () =>
    {
        return this.name;
    }
    getSurname = () =>
    {
        return this.surname;
    }
    getTitle = () =>
    {
        return this.title;
    }
    getSection = () =>
    {
        return this.section;
    }
    getHospital = () =>
    {
        return this.hospital;
    }
    getAdresse = () =>
    {
        return this.adresse;
    }
    getDistrict = () =>
    {
        return this.district;
    }
    getProvince = () =>
    {
        return this.province;
    }
}
