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
        </el-menu>
      </el-aside>
      <el-main>
        <div>
          <el-tag style="color: #4a5064">Train</el-tag>
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
                  type="text"
                  v-model="ruleForm.insert"
                  autocomplete="off"
                  style="width: 30%"
              ></el-input>
            </el-form-item>
            <el-form-item label="select次数" prop="select">
              <el-input
                  type="text"
                  v-model="ruleForm.select"
                  autocomplete="off"
                  style="width: 30%"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div>
          <el-button type="primary" @click="show">确定</el-button>
          <el-dialog
              :model-value="dialogVisible"
              title="提示"
              v-model:visible.sync="this.dialogVisible"
              width="30%"
              :before-close="handleClose"
          >
            <span id>{{
                "为您任务推荐的存储结构为" + this.save_format + "," + "请点击保存"
              }}</span>
            <br/>
            <br/>
            <span slot="footer" class="dialog-footer">
              <el-button @click="this.dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="save">保存</el-button>
            </span>
          </el-dialog>
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
    }

    let checkSelect = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('select次数不能为空'))
      }
    }

    return {
      save_format: "行存储",    // 后台传过来的格式，这里我默认是行存储了
      isCollapse: false,
      dialogVisible: false,
      username: localStorage.getItem('username'),
      ruleForm: {
        num: '',
        weight: '',
      },
      rules: {
        insert: [
          {validator: checkInsert, trigger: 'blur'}
        ],
        select: [
          {validator: checkSelect, trigger: 'blur'}
        ],
      },
      predict: ''
    }

  },
  methods: {

    async response() {
      await this.$router.push({path: '/response'})
    },

    show() {
      this.dialogVisible = true
      this.axios({
        method: 'post',
        url: '/api/train',
        data: {
          ruleForm: this.ruleForm
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        debugger
        this.predict = JSON.parse(response.request.response).predict
        if (this.predict === '0')
          this.save_format = '行存储'
        else
          this.save_format = '列存储'
        this.$message({
          message: "上传成功",
          type: 'success',
          duration: 1000,
        })
      })
          .catch((error) => this.$message({
            message: '上传失败',
            type: 'fail',
            duration: 1000,
          }))
    },

    save() {
      this.axios({
        method: 'post',
        url: '/res/response',
        data: {
          execute: this.predict
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        this.$message({
          message: "保存成功",
          type: 'success',
          duration: 1000,
        })
        this.$router.push({path: '/collection'})
      })
          .catch((error) => this.$message({
            message: '保存失败',
            type: 'fail',
            duration: 1000,
          }))
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
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
