import {observable , configure} from 'mobx';
configure({enforceActions:"observed"});
class LoginStore
{
    @observable login = false;
}
export default new LoginStore()