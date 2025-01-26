<template>
    <div>
        <nav-bar-view></nav-bar-view>
        <div class="row justify-content-center">
            <div class="col-4">
                <form method="post" action="/api/auth/login">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email<span class="text-danger">*</span></label>
                        <input type="email" class="form-control" id="email" name="email">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password<span class="text-danger">*</span></label>
                        <input type="password" class="form-control" id="password" name="password">
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