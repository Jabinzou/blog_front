<template>
  <div class="login-body">
    <div class="login-header">
      <img
        src="@asset/img/logo.png"
        alt="logo">
      <span>Jabin</span>
      <p class="normal-tip">A traveller through silver sky</p>
    </div>
    <div class="login-form--wrap">
      <div class="login-form">
        <h1>Log in trust</h1>
        <p class="text-center normal-tip">Don’t  have any account? emm...ok</p>
        <div class="login-form--data">
          <mu-text-field
            v-model="form.account"
            label="Account"
            prefix=""
            label-float />
          <mu-text-field
            v-model="form.password"
            label="Password"
            :action-icon="visibility ? 'visibility_off' : 'visibility'"
            :action-click="() => (visibility = !visibility)"
            :type="visibility ? 'text' : 'password'"/>
        </div>
        <div class="form-btn text-center">
          <mu-button
            round
            @click="validUser"
            color="success">Log In
            <mu-icon
              right
              size="20px"
              value="send"/></mu-button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { encryptString } from '../../utils/verify';
import { uuid } from '../../utils/normal';
import { validateUser } from '@api/';
export default {
  data () {
    return {
      visibility: false,
      form: {
        account: '',
        password: ''
      }
    };
  },
  methods: {
    async validUser () {
      const key = uuid(16);
      const iv = uuid(16);
      const param = {
        userName: encryptString(this.form.account, key, iv),
        passWord: encryptString(this.form.password, key, iv),
        key,
        iv
      };
      const res = await validateUser(param);
      console.log(res);
    }
  }
};
</script>
<style lang="scss">
@import '@asset/css/common.scss';
.login-body{
  min-height: 100%;
  background-color: #f9fafb;
  color: #1A1938;
  .normal-tip {
    font-size: 12px;
    color: #a5b7cc;
    text-align: center;
    line-height: 20px;
    margin-top: 5px;
  }
  .login-form--data {
    padding: 20px;
    text-align: center;
  }
  .login-header {
    background-image: none;
    background-color: transparent;
    padding: 80px 0 25px;
    text-align: center;
    span {
      font-size: 24px;
    }
  }
  img {
    vertical-align: text-bottom;
  }
  .login-form--wrap {
    padding-bottom: 100px;
    .login-form{
      max-width: 500px;
      margin: 0 auto;
      border: 1px solid #dee0e3;
      background-color: #FFF;
      border-radius: 3px;
      padding: 20px;
      box-sizing: border-box;
    }
    h1 {
      text-align: center;
    }
  }
}
</style>
