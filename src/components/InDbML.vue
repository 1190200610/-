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
            <span style="color: #000000">Data Collection</span>
          </el-menu-item>

          <el-menu-item index="index">
            <i class="el-icon-document-checked"></i>
            <span>Data Index</span>
          </el-menu-item>

          <el-menu-item index="InDbML">
            <i class="el-icon-document"></i>
            <span style="color: #000000">In-DB ML</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content">
                <textarea
                    ref="mycode"
                    class="codesql"
                    style="height: 50vh"
                ></textarea>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-table :data="fileHistory" style="width: 100%">
                  <el-table-column
                      fixed="left"
                      prop="filename"
                      label="文件名"
                      width="150"
                  >
                  </el-table-column>
                  <el-table-column label="操作" slot-scope="scope">
                    <template #default="scope">
                      <el-button
                          size="mini"
                          @click="leadin(scope.$index, scope.row)"
                      >导入
                      </el-button>
                      <el-button
                          size="mini"
                          type="danger"
                          @click="deleteRow(scope.$index, scope.row)"
                      >删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10" id="btn">
            <el-col :span="6">
              <el-button size="medium" type="primary" @click="execute()">
                执行
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button size="medium" type="primary" @click="clear()">
                清空
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-upload
                  ref="upload"
                  class="upload-demo"
                  action="http://localhost:10000/api/sqlfiles"
                  accept=".sql,.txt"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-upload="beforeUpload"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                  :on-success="showSql"
              >
                <el-button size="small" type="primary"
                >选择预定义算子文件
                </el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传sql或txt文件
                </div>
              </el-upload>
            </el-col>
            <el-col :span="6">
              <el-upload
                  ref="upload"
                  class="upload-demo"
                  action="http://localhost:10000/api/sqlfiles"
                  accept=".sql,.txt"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-upload="beforeUpload"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                  :on-success="showSql"
              >
                <el-button size="small" type="primary"
                >选择测试语句文件
                </el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传sql或txt文件
                </div>
              </el-upload>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import 'codemirror/theme/ambiance.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'

let CodeMirror = require('codemirror/lib/codemirror')
require('codemirror/addon/edit/matchbrackets')
require('codemirror/addon/selection/active-line')
require('codemirror/mode/sql/sql')
require('codemirror/addon/hint/show-hint')
require('codemirror/addon/hint/sql-hint')
export default {
  name: "Home",
  data() {
    return {
      isCollapse: false,
      username: localStorage.getItem('username'),
      fileHistory: [
        // {
        //   filename: '测试文件1',
        //   data: 'Alter table tablename add primary key(col)',
        // },

        // {
        //   filename: '测试文件2',
        //   data: 'select * from *',
        // }

      ],
      fileList: [
        // {
        //   name: 'test.jpeg',
        //   url:
        //     'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        // },
        // {
        //   name: 'food2.jpeg',
        //   url:
        //     'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        // },
      ],
      editor: '',
      textarea: '',
    }
  },
  mounted() {
    let mime = 'text/x-mariadb'
    // let theme = 'twilight'//设置主题，不设置的会使用默认主题
    let editor = CodeMirror.fromTextArea(this.$refs.mycode, {
      mode: mime, //选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      // theme: theme,
      autofocus: true,
      autoClearEmptyLines: true,
      extraKeys: {'Tab': 'autocomplete'}, //自定义快捷键
      hintOptions: {
        //自定义提示选项
        completeSingle: false,
        tables: {
          users: ['name', 'score', 'birthDate'],
          countries: ['name', 'population', 'size'],
        },
      },
    })
    //代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
    editor.on('cursorActivity', function () {
      editor.showHint()
    })
    editor.setSize('auto', 'auto')
    window.editor = editor
    // 向后端请求数据
    this.axios({
      method: 'post',
      url: 'http://127.0.0.1:10000/api/fileList',
      data: {
        title: "这是一个历史文件请求"
      },
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    }).then((res) => {
      // this.textarea = JSON.parse(res.request.responseText).content
      this.fileHistory = res.data.FileList
      // 放到fileHistory里面就行
    })
  },
  methods: {
    showSql(response, file, fileList) {
      // debugger
      window.editor.setValue(response.content)
      this.fileHistory.push({filename: file.name, data: response.content})
      // console.log(JSON.parse(response.request).content)
    },

    logout() {
      window.sessionStorage.clear()
      this.$router.push('/')
    },

    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    execute() {
      this.textarea += window.editor.getValue()
      // 后续用axios发送给后端处理
      this.axios({
        method: 'post',
        url: 'http://localhost:10000/api/sql',
        Headers: 'Content - Type: application/ json; charset = UTF - 8',
        data: {'data': window.editor.getValue()},
      })
          .then((response) => {
            this.$message({
              message: '发送成功',
              type: 'success',
              duration: 1000,
            })
            debugger
            console.log(response, 'success')
            window.editor.setValue(response.data.result)
          })
          .catch((error) => console.log(error, 'error'))
    },

    clear() {
      window.editor.setValue('')
      window.editor.focus()
    },

    handleRemove(file, fileList) {
      console.log(file, fileList)
    },

    handlePreview(file) {
      console.log(file)
    },

    handleExceed(files, fileList) {
      this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
          } 个文件`,
      )
    },

    beforeUpload(file) {
      console.log(file)
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'txt'
      const extension2 = testmsg === 'sql'
      // const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 sql、txt格式!',
          type: 'warning',
        })
        this.$refs.upload.abort()
      }
      // if(!isLt2M) {
      //     this.$message({
      //         message: '上传文件大小不能超过 10MB!',
      //         type: 'warning'
      //     });
      // }
      // return (extension || extension2) && isLt2M
      return extension || extension2
    },

    deleteRow(index, rows) {
      console.log(index)
      console.log(rows)
      this.fileHistory.splice(index, 1)
    },

    leadin(index, row) {
      console.log(this.fileHistory[index].data)
      console.log(this)
      window.editor.setValue(this.fileHistory[index].data)
    },

    beforeRemove(file, fileList) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (testmsg != 'txt' || testmsg != 'sql')
        return
          // for (let i in fileList) {
          // let item = fileList[i]
          // if (item.uid === file.uid)
          // fileList.splice(i, 1)
      // }
      else
        return this.$confirm(`确定移除 ${file.name}？`)
    },
  },
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

.el-row {
  margin-bottom: 20px;

&
:last-child {
  margin-bottom: 0;
}

}

.el-col {
  border-radius: 4px;
}

#btn {
  text-align: center;
}

.bg-purple {
  background: #495664;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 30px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.CodeMirror {
  font-size: 18px;
  line-height: 150%;
  font-family: Arial, monospace;
}

/* .codesql {
  font-size: 15px;
  /* line-height: 150%; */
/* font-family: Arial, monospace; */
/* } */
</style>
