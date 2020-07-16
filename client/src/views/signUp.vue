<template>
  <div class="signUp">
    <navbar />
    <div class="formStyle">
      <el-card class="loginCard">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="Name" prop="name">
            <el-input v-model.trim="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model.trim="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="Password Check" prop="passwordCheck">
            <el-input type="password" v-model="form.passwordCheck"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="button--logIn"
              @click="submitLogInForm"
              :disabled="isRegistering"
              >Register 註冊
            </el-button>
            <router-link to="/">
              <el-button type="info">Homepage 回首頁</el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Toast } from "./../utils/mixin";
import navbar from "./../components/navbar";

export default {
  name: "SignUp",
  components: { navbar },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        passwordCheck: ""
      }
    };
  },
  computed: {
    ...mapGetters(["isRegistering", "currentUser"])
  },
  methods: {
    ...mapMutations(["revokeAuthentication"]),
    ...mapActions(["signUp"]),
    async validation() {
      const emailRule = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim;

      if (
        !this.form.name ||
        !this.form.email ||
        !this.form.password ||
        !this.form.passwordCheck
      ) {
        Toast.fire({
          icon: "warning",
          title: "Please enter each field."
        });
        return false;
      }

      if (!this.form.email.match(emailRule)) {
        Toast.fire({
          icon: "warning",
          title: "Please check your email format."
        });
        return false;
      }

      if (this.form.password !== this.form.passwordCheck) {
        Toast.fire({
          icon: "warning",
          title: "Please check your both password fields."
        });
        return false;
      }

      return true;
    },
    async submitLogInForm() {
      try {
        let validationFormResult = await this.validation();

        if (validationFormResult) {
          let fetchingStatus = await this.signUp(this.form);

          if (fetchingStatus) {
            Toast.fire({
              icon: "success",
              title: "Register Successfully! Please log in again."
            });
            this.revokeAuthentication();
            this.$router.push({ name: "homePage" });
          } else {
            Toast.fire({
              icon: "warning",
              title: "Email or Password is not correct!"
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped src="./../styles/signUp.scss"></style>
