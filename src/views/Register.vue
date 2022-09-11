<template>
  <div class="main">
    <div class="box">
      <!--注册表单-->
      <el-form ref="registerFormRef" :model="registerForm">
        <el-form-item>
          <el-input v-model="registerForm.username" prefix-icon="el-icon-user-solid" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerForm.nickname" prefix-icon="el-icon-user-solid" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerForm.email" prefix-icon="el-icon-user-solid" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" show-password placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item class="confim">
          <el-input v-model="confim_password" prefix-icon="el-icon-lock" show-password placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item class="select">
          <el-select v-model="registerForm.role" placeholder="用户角色">
            <el-option label="管理员" value="ROLE_admin"></el-option>
            <el-option label="普通用户" value="ROLE_common"></el-option>
            <el-option label="游客" value="ROLE_visitor"></el-option>
          </el-select>
        </el-form-item>
        <el-upload
            class="avatar-uploader"
            action="http://localhost:8090/upload"
            name="pic"
            :multiple="true"
            :auto-upload="true"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
          <img v-if="registerForm.avatar" :src="registerForm.avatar" class="avatar" alt="">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="block">
          <el-date-picker
              v-model="registerForm.createTime"
              type="datetime"
              placeholder="选择创建时间">
          </el-date-picker>
        </div>
        <div class="block">
          <el-date-picker
              v-model="registerForm.updateTime"
              type="datetime"
              placeholder="选择修改时间">
          </el-date-picker>
        </div>
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {register} from "@/api/register";

export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        nickname:'',
        avatar:'',
        email:'',
        createTime:'',
        updateTime:'',
        role: ''
      },
      confim_password:'',
    }
  },
  methods: {
    register() {
      const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.registerForm.username === '') {
        this.$message({ type: "error", message: "用户名不能为空" });
        return false;
      }
      if (this.registerForm.nickname === '') {
        this.$message({ type: "error", message: "昵称不能为空" });
        return false;
      }
      if (this.registerForm.password === '') {
        this.$message({ type: "error", message: "密码不能为空" });
        return false;
      }
      if (this.confim_password === '') {
        this.$message({ type: "error", message: "确认密码不能为空" });
        return false;
      }
      if (this.registerForm.email === '') {
        this.$message({ type: "error", message: "邮箱不能为空" });
        return false;
      }
      if (!reg.test(this.registerForm.email)) {
        this.$message({ type: "error", message: "邮箱格式不正确" });
        return false;
      }
      if (this.registerForm.password.trim().length < 6) {
        this.$message({ type: "error", message: "密码不能少于6位" });
        return false;
      }
      if (this.registerForm.password !== this.confim_password) {
        this.$message({ type: "error", message: "两次输入密码不一致，请重新输入！" });
        return false;
      }
      this.$refs.registerFormRef.validate(valid => {
        if (valid) {
          const User = this.registerForm
          register(User).then(res => {
            if (res.code === 200) {
              this.msgSuccess(res.msg)
              this.$router.push('/login')
            }
            if (res.code === 500) {
              this.msgError(res.msg)
            }
          })
        }
      })
    },
    handleAvatarSuccess(res) {
      this.registerForm.avatar = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>
<style scoped>
  .main {
    background-color: #2b4b6b;
  }
  .box {
    margin: 0 auto;
    padding: 20px;
    width: 400px;
    height: auto;
    background-color: white;
    border-radius: 20px;
    box-shadow: 10px 10px 5px #888888;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    margin-bottom: 20px;
    width: 178px;
    height: 178px;
    display: block;
  }

  .block {
    margin-bottom: 20px;
  }

  .confim {
    margin-bottom: 30px;
  }
</style>