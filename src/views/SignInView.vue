<template>
    <div>
        <nav-bar-view></nav-bar-view>
        <div class="row justify-content-center">
            <div class="col-4">
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1">
                    </div>
                    <div class="mb-3">
                        Don't have an account? Click here to <router-link to="/signup">Sign up</router-link>
                    </div>
                    <button :type="submit" class="btn btn-primary">Sign in</button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import NavBarView from '@/components/NavBarView.vue'

export default {
    components: {NavBarView},

}

</script>

<style></style>