<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../icon/huawei_logo.png" alt="" width="180" height="40"/>
        <span> </span>
      </div>
      <el-button @click="logout">Logout</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '65px' : '200px'" style="background-color: #545c64">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
            default-active="2"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
        >
          <el-menu-item index="upload">
            <template v-slot:title>
              <i class="el-icon-upload"></i>
              <span style="color: #000000">Upload Data</span>
            </template>
          </el-menu-item>

          <el-menu-item index="collection">
            <i class="el-icon-collection"></i>
            <span>Data Collection</span>
          </el-menu-item>

          <el-menu-item index="index">
            <i class="el-icon-document-checked"></i>
            <span style="color: #000000">Data Index</span>
          </el-menu-item>

          <el-menu-item index="InDbML">
            <i class="el-icon-document"></i>
            <span style="color: #000000">In-DB ML</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div>
          <div>
            <el-button type="primary" round @click="CreateRowTable" size="mini"
            >创建行存表
            </el-button
            >
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm_raw"
                label-width="100px"
                class="demo-ruleForm"
            >
              <el-form-item label="insert次数" prop="insert">
                <el-input
                    type="password"
                    v-model="ruleForm.insert"
                    autocomplete="off"
                    style="width: 30%"
                ></el-input>
              </el-form-item>
              <el-form-item label="select次数" prop="select">
                <el-input
                    type="password"
                    v-model="ruleForm.select"
                    autocomplete="off"
                    style="width: 30%"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>

          <div>
            <el-button type="primary" round @click="CreateColTable" size="mini"
            >创建列存表
            </el-button
            >
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm_column"
                label-width="100px"
                class="demo-ruleForm"
            >
              <el-form-item label="insert次数" prop="insert">
                <el-input
                    type="password"
                    v-model="ruleForm.insert"
                    autocomplete="off"
                    style="width: 30%"
                ></el-input>
              </el-form-item>
              <el-form-item label="select次数" prop="select">
                <el-input
                    type="password"
                    v-model="ruleForm.select"
                    autocomplete="off"
                    style="width: 30%"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>

          <div>
            <el-upload
                class="upload-demo"
                ref="upload"
                action="http://localhost:10000/api/collection"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
            >
              <template v-slot:trigger>
                <el-button size="small" type="primary"
                >存储特征到文件
                </el-button
                >
              </template>
              <el-button
                  style="margin-left: 10px"
                  size="small"
                  type="info"
                  @click="submitUpload"
              >Train Model
              </el-button
              >
            </el-upload>
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
    let checkInsert = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('insert次数不能为空'))
      }
      callback()
    }

    let checkSelect = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('select次数不能为空'))
      }
      callback()
    }

    return {
      fileList: [],
      isCollapse: false,
      username: localStorage.getItem('username'),
      ruleForm: {
        insert: '',
        select: '',
      },
      rules: {
        insert: [
          {validator: checkInsert, trigger: 'blur'}
        ],
        select: [
          {validator: checkSelect, trigger: 'blur'}
        ],
      }
    }

  },
  methods: {
    CreateRowTable() {
      this.axios({
        method: 'post',
        url: 'http://127.0.0.1:10000/api/tableClass',
        data: {
          kind: 'row'
        },
      })
          .then((response) => {
            this.$message({
              message: '创建行存储成功',
              type: 'success',
              duration: 1000,
            })
            console.log(response, 'success')
          })
          .catch((error) => console.log(error, 'error'))
    },

    CreateColTable() {
      this.axios({
        method: 'post',
        url: 'http://127.0.0.1:10000/api/tableClass',
        data: {
          kind: 'col'
        },
      })
          .then((response) => {
            this.$message({
              message: '创建列存储成功',
              type: 'success',
              duration: 1000,
            })
            console.log(response, 'success')
          })
          .catch((error) => console.log(error, 'error'))
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    submitUpload() {
      this.axios({
        method: 'post',
        url: '/api/collection',
        data: {
          ruleForm: this.ruleForm
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        this.$message({
          message: "上传成功",
          type: 'success',
          duration: 1000,
        })
        this.$router.push({path: '/train'})
      })
          .catch((error) => this.$message({
            message: '上传失败',
            type: 'fail',
            duration: 1000,
          }))
    },

    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
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
  background-color: #373d41;
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
