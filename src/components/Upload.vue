<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../icon/huawei_logo.png" alt="" width="180" height="40">
        <span>

        </span>
      </div>
      <el-button @click="logout">Logout</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '65px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse"> |||
        </div>
        <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened :collapse="isCollapse"
            :collapse-transition = false
            :router="true"
        >

          <el-menu-item index="upload">
            <template v-slot:title>
              <i class="el-icon-upload"></i>
              <span>Upload Data</span>
            </template>
          </el-menu-item>

          <el-menu-item index="collection">
            <i class="el-icon-collection"></i>
            <span>Data Collection</span>
          </el-menu-item>

          <el-menu-item index="index">
            <i class="el-icon-document-checked"></i>
            <span>Data Index</span>
          </el-menu-item>

        </el-menu>

      </el-aside>
      <el-main>
      <div>

        <div>
          <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">上传（自定义格式）文件，且不超过（自定义大小）</div>
          </el-upload>
        </div>

       <div>
         <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="分区数" prop="num">
             <el-input type="password" v-model="ruleForm.num" autocomplete="off" style="width: 30%"></el-input>
           </el-form-item>
           <el-form-item label="加权因子" prop="weight">
             <el-input type="password" v-model="ruleForm.weight" autocomplete="off" style="width: 30%"></el-input>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
           </el-form-item>
         </el-form>
       </div>

      </div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    let checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('分区数不能为空'));
      }
    };

    let checkWeight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('权重因子不能为空'));
      }
    };

    return {
      isCollapse: false,
      username: localStorage.getItem('username'),
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      ruleForm: {
        num: '',
        weight: '',
      },
      rules: {
        num: [
          { validator: checkNum, trigger: 'blur' }
        ],
        weight: [
          { validator: checkWeight, trigger: 'blur' }
        ],
      }
    };

  },
  methods: {

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }


  }

}


</script>

<style scoped>

.home-container {
  height: 100vh;
}

.el-header {
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
> div {
  display: flex;
  align-items: center;
span {
  margin-left: 15px;
}
}
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;

}


</style>
