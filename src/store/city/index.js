const state = {
    nm:localStorage.getItem("nm") ? decodeURIComponent(localStorage.getItem("nm")) : '北京',
    id: localStorage.getItem("id")||110100,
    

};
const mutations = {
    //方法的名字尽量用大写
    CITY_INFO(state, payload){
        state.nm = payload.nm
        state.id = payload.id
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