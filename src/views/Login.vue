<template>
	<div class="login_container">
		<div class="login_box">
			<!--头像-->
			<div class="avatar_box">
				<img src="/img/avatar.jpg" alt="">
			</div>
			<!--登录表单-->
			<el-form ref="loginFormRef" :model="loginForm" class="login_form">
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" prefix-icon="el-icon-lock" show-password @keyup.native.enter="login" placeholder="密码"></el-input>
				</el-form-item>
				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="primary" @click="register">注册</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {login} from "@/api/login";

	export default {
		name: "Login",
		data() {
			return {
				loginForm: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
      register() {
        this.$router.push("/register")
      },
			login() {
        if (this.loginForm.username === '') {
          this.$message({ type: "error", message: "用户名不能为空" });
          return false;
        }
        if (this.loginForm.password === '') {
          this.$message({ type: "error", message: "密码不能为空" });
          return false;
        }
				this.$refs.loginFormRef.validate(valid => {
					if (valid) {
						login(this.loginForm).then(res => {
							if (res.code === 200) {
								this.msgSuccess(res.msg)
								window.localStorage.setItem('adminToken', res.data.token)
								this.$router.push('/home')
							} else {
								this.msgError(res.msg)
							}
						}).catch(() => {
							this.msgError("请求失败")
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.login_container {
		box-sizing: unset !important;
		height: 100%;
		background-color: #2b4b6b;
	}

	.login_box {
		width: 450px;
		height: 300px;
		background-color: #fff;
		border-radius: 3px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.login_box .avatar_box {
		height: 130px;
		width: 130px;
		border: 1px solid #eee;
		border-radius: 50%;
		padding: 10px;
		box-shadow: 0 0 10px #ddd;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
	}

	.login_box .avatar_box img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #eee;
	}

	.login_form {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
	}

	.btns {
		display: flex;
		justify-content: space-between;
	}
</style>