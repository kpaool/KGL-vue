import { defineStore } from 'pinia';
import { ref, reactive } from "vue";
import VueJwtDecode from 'vue-jwt-decode'

export const useUSerStore = defineStore("user", () => {

    const user = reactive({
        fullName: "",
        email: "",
        role: "",
        token:""
    })

    function setUser(token) {
        const payload = VueJwtDecode.decode(token)
        user.fullName = payload.fullName
        user.email = payload.email
        user.role = payload.role
        user.token = token
    }

    function invalidateUser(){
        user.fullName = ""
        user.email = ""
        user.role = ""
        user.token = ""
    }

    return { user, setUser, invalidateUser }
},{
    persist:true
})