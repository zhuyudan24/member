<template>
  <div
    class="loginwrap"
    :style="{height: imgHeight + 'px',background: 'url(' + require('./login_bg.jpg') + ') no-repeat center center'}"
  >
    <div style="position: absolute;left: 0;height: 0;width: 100%;">
      <canvas
        id="loginwrap"
        :width="imgWidth"
        :height="imgHeight"
      ></canvas>
    </div>
    <div class="logintop">
      <div class="fl loginlogo">
        <a
          class="fr logo"
          href="#"
        >login_logo.png</a>
      </div>
      <a
        class="home-link fr"
        href="http://www.demogic.com/"
      >返回首页</a>
    </div>
    <div class="login_contetnt">
      <h3 class="login-top">让信息连接一切</h3>
      <h4 class="login-bottom">GIC商户后台</h4>
      <div class="formlogin">
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          label-width=""
        >
          <el-form-item prop="loginName">
            <el-input
              class="forminput"
              v-model.trim="form.loginName"
              @blur="searchOption"
              placeholder="账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="密码"
              @keyup.enter.native="submitLogin('form')"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="eid"
            v-if="options.length > 1"
          >
            <el-select
              style="width: 100%;"
              v-model="eid"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.enterpriseId"
                :label="item.brandName"
                :value="item.enterpriseId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <button
              class="submit"
              @click.prevent="submitLogin('form')"
            >立即登录</button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
let qs = require("qs");
import * as types from "../../store/types";
import {
  checkSuccess,
  checkFalse,
  checkStatus
} from "../../../static/js/checkStatus";
import url from "../../components/axios/url";
import { doFetch } from "../../components/axios/api";
export default {
  name: "login",
  data() {
    return {
      redirect: this.$route.query.redirect,
      token: "",
      form: {
        loginName: "",
        password: ""
      },
      loginbg: require("./login_bg.jpg"),
      rules: {},
      options: [],
      eid: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    if (window.location.pathname.slice(-1) !== "/") {
      window.location = window.location.pathname + "#/";
    }
    next();
  },
  computed: {
    imgHeight() {
      return (
        document.body.clientHeight || document.documentElement.clientHeight
      );
    },
    imgWidth() {
      return document.body.clientWidth || document.documentElement.clientWidth;
    }
  },
  methods: {
    searchOption() {
      if (this.form.loginName) {
        this.axios
          .get("http://gicdev.demogic.com/api-auth/list-login-enterprise", {
            params: {
              loginName: this.form.loginName
            }
          })
          .then(res => {
            this.options = res.data.result;
            if (res.data.result.length > 0) {
              this.eid = res.data.result[0].enterpriseId;
            }
          })
          .catch(err => {
            checkStatus(err);
          });
      } else {
        checkFalse("请输入用户名");
        return false;
      }
    },
    loginAnimate() {
      let animate = new LoginAnimate(loginwrap, {
        length: 90,
        LineWeight: 0.1,
        clicked: true,
        moveon: true
      });
      animate.Run();
    },
    getLoginEnterprise() {
      if (this.options.length > 0) {
        if (this.eid) {
          this.axios
            .post(
              "http://gicdev.demogic.com/api-auth/do-login",
              qs.stringify({
                loginName: this.form.loginName,
                password: this.form.password,
                eid: this.eid
              })
            )
            .then(res => {
              if (res.data.errorCode == 0) {
                this.options.forEach(item => {
                  if (item.enterpriseId == this.eid) {
                    window.localStorage.setItem("brandName", item.brandName);
                  }
                });
                checkSuccess(res.data.message);
                let redirect = "/wechatmembers";
                this.$router.push({
                  path: redirect
                });
              } else {
                checkFalse(res.data.message);
                return false;
              }
            })
            .catch(err => {
              checkStatus(err);
            });
        } else {
          checkFalse("关联集团不能为空");
        }
      } else {
        this.axios
          .get("http://gicdev.demogic.com/api-auth/list-login-enterprise", {
            params: {
              loginName: this.form.loginName
            }
          })
          .then(res => {
            if (res.data.errorCode === 0) {
              this.options = res.data.result;
              if (res.data.result.length > 0) {
                this.eid = res.data.result[0].enterpriseId;
              }
              if (this.eid) {
                this.axios
                  .post(
                    "/api-auth/do-login",
                    qs.stringify({
                      loginName: this.form.loginName,
                      password: this.form.password,
                      eid: this.eid
                    })
                  )
                  .then(res => {
                    if (res.data.errorCode == 0) {
                      this.options.forEach(item => {
                        if (item.enterpriseId == this.eid) {
                          window.localStorage.setItem(
                            "brandName",
                            item.brandName
                          );
                        }
                      });
                      checkSuccess(res.data.message);
                      //                        let redirect = decodeURIComponent(this.$route.query.redirect || '/index');
                      let redirect = "/wechatmembers";
                      this.$router.push({
                        path: redirect
                      });
                    } else {
                      checkFalse(res.data.message);
                      return false;
                    }
                  })
                  .catch(err => {
                    checkStatus(err);
                  });
              } else {
                checkFalse(res.data.message);
              }
            } else {
              checkFalse();
            }
          })
          .catch(err => {
            checkStatus(err);
          });
      }
    },
    submitLogin(formName) {
      if (!this.form.loginName) {
        checkFalse("用户名不能为空");
        return false;
      }
      if (!this.form.password) {
        checkFalse("密码不能为空");
        return false;
      }
      this.getLoginEnterprise();
    }
  },
  mounted() {
    this.$store.commit(
      types.TITLE,
      "达摩网络GIC——连锁零售商业互联网+，终极解决方案！"
    );
    document.title = this.$store.state.title;
    // this.loginAnimate();
  }
};
</script>

<style lang="stylus">
.loginwrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  text-align: center;

  .logo {
    display: block;
    float: left;
    margin-left: 100px;
    width: 150px;
    height: 80px;
    background: url('./login_logo.png') no-repeat left center;
    text-indent: -999px;
  }

  .logintop {
    width: 100%;
    height: 80px;
    position: relative;
    z-index: 2;
  }

  .home-link {
    width: 80px;
    height: 32px;
    margin-top: 23px;
    margin-right: 135px;
    border-radius: 0;
    text-align: center;
    font-size: 14px;
    line-height: 32px;
    color: rgba(255, 255, 255, 0.6);
    border: 1px solid #fede29;
    background: 0 0;
  }

  .login_contetnt {
    width: 350px;
    margin: 0 auto;
  }

  .login-top {
    position: relative;
    z-index: 1;
    font-size: 24px;
    font-weight: normal;
    color: #FFFFFF;
    margin: 70px 0 20px;
  }

  .login-bottom {
    position: relative;
    z-index: 1;
    font-size: 16px;
    font-weight: normal;
    color: #fede29;
    margin-bottom: 40px;
  }

  .login-bottom {
    position: relative;
    z-index: 1;
    font-size: 16px;
    font-weight: normal;
    color: #fede29;
    margin-bottom: 40px;
  }

  .formlogin {
    position: relative;
    z-index: 3;
    width: 350px;
    margin: 0 auto;
  }

  .el-input__inner {
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: 100;
    width: 100%;
    height: 46px;
    line-height: 14px;
    text-indent: 15px;
    border-radius: 0;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid transparent;
    color: #fff;
    background-image: none;

    &:focus {
      border: 1px solid #fede29;
    }
  }

  .submit {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    margin-top: 30px;
    margin-bottom: 36px;
    color: #000;
    outline: 0;
    border: 0;
    background-color: #fede29;
    cursor: pointer;

    &:hover {
      background-color: #fcd916;
    }
  }
}
</style>
