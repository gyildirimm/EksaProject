export default class User 
{
    constructor( id ,isActivity , userBirthDate , userEmail , userIdentityNumber , userImageSource , userPersonalName , userPersonalSurname , userPhoneNumber , userRol)
    {
        this.id = id;
        this.isActivity  =isActivity;
        this.userBirthDate = userBirthDate;
        this.userEmail = userEmail;
        this.userIdentityNumber = userIdentityNumber;
        this.userImageSource = userImageSource;
        this.userPersonalName = userPersonalName;
        this.userPersonalSurname = userPersonalSurname;
        this.userPhoneNumber = userPhoneNumber;
        this.userRol = userRol;
    }

    getid = () =>
    {
        return this.id;
    }
    getisActivity = () =>
    {
        return this.isActivity;
    }
    getuserBirthDate = () =>
    {
        return this.userBirthDate;
    }
    getuserEmail = () =>
    {
        return this.userEmail;
    }
    getuserIdentityNumber = () =>
    {
        return this.userIdentityNumber;
    }
    getuserImageSource = () =>
    {
        return this.userImageSource;
    }
    getuserPersonalName = () =>
    {
        return this.userPersonalName;
    }
    getuserPersonalSurname = () =>
    {
        return this.userPersonalSurname;
    }
    getuserPhoneNumber = () =>
    {
        return this.userPhoneNumber;
    }
    getuserRol = () =>
    {
        return this.userRol;
    }
    getfullName = () =>
    {
        return ( this.userPersonalName + " " + this.userPersonalSurname)
    }
}
