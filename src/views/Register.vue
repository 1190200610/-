<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
      <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model.number="ruleForm.checkPass"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  <SHTTPClient ref="shttp_client" negotiateURL="http://localhost:8899"/>
</template>

<script>
import SHTTPClient from "../components/SHTTPClient.vue";
export default {
  data() {
    let checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      callback();
    };
    let validatePass = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.pass !== '') {
          this.$refs.ruleForm.validateField('pass');
          callback();
        }
      }
      callback()
    };
    let validatePass2 = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请再次输入密码'));
      } else if (value == this.ruleForm.pass) {
        console.log(value == this.ruleForm.pass)
        callback()
      } else {
        callback(new Error('两次输入密码不一致!'));

      }
    };
    return {
      ruleForm: {
        username: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        username: [
          {validator: checkUsername, trigger: 'blur'}
        ]
      }
    };
  },
  components: {
    SHTTPClient,
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log(this.ruleForm.username);
          console.log(this.ruleForm.pass);
          const client = this.$refs.shttp_client;
          let res = await client.post(
              "http://localhost:8899/register",
              JSON.stringify({
                data: {
                  username: this.ruleForm.username,
                  password: this.ruleForm.pass,
                },
              })
          )
          let result = JSON.parse(res.data);
          console.log(result);
          if (result.code == 200) {
            alert("注册成功");
          } else {
            alert("注册失败，该用户名已经存在")
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
