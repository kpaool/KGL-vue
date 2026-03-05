
<script setup>

    import { reactive,ref } from 'vue';
    import axios from "../utils/axios";
    import { toast } from 'vue3-toastify';
    import { useUSerStore } from "../stores/userStore";
    import { useRouter } from 'vue-router';

    const userStore = useUSerStore()
    const router = useRouter()

    const form = reactive({
        email: "",
        password: "",
    })
    const isLoading = ref(false)

    async function login(){
        try {
            isLoading.value = true
             const response = await axios.post("/auth/login",{
                email:form.email,
                password:form.password
            })

            if(response.status === 200){
                userStore.setUser(response.data.token)
                toast.success("Login successful",{
                    autoClose:1000
                });
                switch (userStore.user.role) {
                    case "manager": 
                        router.push("/manager")
                        break;
                    case "director": 
                        router.push("/director")
                        break;
                    case "salesagent": 
                        router.push("/sales")
                        break;
                    default:
                        router.push("/")
                        break;
                }


            }else{
                toast.error("Invalid credentials");
            }
        } catch (error) {
            console.log(error?.response?.data ?? error)
            toast.error("Invalid credentials");
        }finally{
            isLoading.value = false
        }

       
        
    }

</script>



<template>
    

<main class="bg-gradient-to-br from-slate-50 to-slate-200 min-h-screen flex items-center justify-center p-6">

    <div class="w-full max-w-md">
        <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10">
            
            <div class="text-center mb-10">
                <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
                <p class="text-slate-500 mt-2">Enter your credentials to access your account</p>
            </div>

            <!-- <button class="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 mb-6">
                <img src="https://www.svgrepo.com/show/355037/google.svg" class="w-5 h-5" alt="Google">
                <span>Sign in with Google</span>
            </button> -->

            <!-- <div class="relative flex items-center mb-8">
                <div class="flex-grow border-t border-slate-200"></div>
                <span class="flex-shrink mx-4 text-slate-400 text-sm uppercase tracking-widest">or</span>
                <div class="flex-grow border-t border-slate-200"></div>
            </div> -->

            <form action="#" class="space-y-5" @submit.prevent="login">
                <div>
                    <label for="email" class="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
                    <input type="email" id="email" v-model="form.email" 
                        class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400" 
                        placeholder="you@example.com" required>
                </div>

                <div>
                    <div class="flex justify-between mb-2">
                        <label for="password" class="text-sm font-semibold text-slate-700">Password</label>
                        <a href="#" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                    <input type="password" id="password"  v-model="form.password"
                        class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400" 
                        placeholder="••••••••" required>
                </div>

                <div class="flex items-center">
                    <input type="checkbox" id="remember" class="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500">
                    <label for="remember" class="ml-2 text-sm text-slate-600">Remember me for 30 days</label>
                </div>

                <button type="submit" :disabled="isLoading"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
                    {{ isLoading ? "Loading..." : "Sign in to account" }}
                </button>
            </form>

            <p class="text-center text-slate-600 mt-8 text-sm">
                Don't have an account? 
                <a href="#" class="font-bold text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline">Create one for free</a>
            </p>
        </div>

        <div class="flex justify-center gap-6 mt-8 text-sm text-slate-400 font-medium">
            <a href="#" class="hover:text-slate-600">Privacy Policy</a>
            <a href="#" class="hover:text-slate-600">Terms of Service</a>
        </div>
    </div>

</main>


</template>