<script setup>
    import {useUSerStore} from "../stores/userStore"
    import {watchEffect} from "vue"
    import {useRouter} from "vue-router"

    const userStore = useUSerStore()
    const router = useRouter()

    watchEffect(()=>{
        if(!userStore.user.token){
            router.push("/login")
        }
    })

</script>

<template>
    <div class="bg-slate-50 text-slate-900">

        <div class="flex min-h-screen">
            <aside class="w-64 bg-slate-900 text-white flex-shrink-0 hidden lg:flex flex-col">
                <div class="p-6">
                    <h2 class="text-xl font-bold tracking-tight text-emerald-400">KGL Groceries</h2>
                    <p class="text-xs text-slate-400 uppercase tracking-widest mt-1">Wholesale Produce</p>
                </div>
                
                <nav class="flex-1 px-4 space-y-1 mt-4">
                    <p class="px-4 text-xs font-semibold text-slate-500 uppercase mb-2">Main Menu</p>
                    <a href="#" class="flex items-center gap-3 bg-emerald-600 text-white px-4 py-3 rounded-xl">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        <span>Dashboard</span>
                    </a>
                    <a href="#" class="flex items-center gap-3 text-slate-400 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-xl transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>Procure Produce</span>
                    </a>
                    <a href="#" class="flex items-center gap-3 text-slate-400 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-xl transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                        <span>Inventory (Cereals)</span>
                    </a>
                    <a href="#" class="flex items-center gap-3 text-slate-400 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-xl transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        <span>Credit Sales</span>
                    </a>
                </nav>

                <div class="p-4 border-t border-slate-800">
                    <div class="flex items-center gap-3 px-2">
                        <div class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900">M</div>
                        <div>
                            <p class="text-sm font-semibold">Branch Manager</p>
                            <p class="text-xs text-slate-400">KGL Branch A</p>
                        </div>
                    </div>
                </div>
            </aside>

            <RouterView />
        </div>

    </div>

</template>

