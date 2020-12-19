const state = {
    name:localStorage.getItem('name')||'',
    isAdmin:localStorage.getItem('isAdmin')||false,
    userPortrait:'',
   

};
const mutations = {
    //方法的名字尽量用大写
    USER_NAME(state, payload){
        state.name= payload.name
        state.isAdmin= payload.isAdmin
        state.userPortrait= payload.userPortrait
    }
};
const actions = {

};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
}