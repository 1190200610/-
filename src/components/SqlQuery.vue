<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content">
          <textarea
            ref="mycode"
            class="codesql"
            v-model="code"
            style="height: 50vh"
          ></textarea>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-input
            type="textarea"
            :rows="28"
            placeholder="历史操作"
            v-model="textarea"
            style="height: 600px; weight: auto"
          ></el-input>
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
          action="https://jsonplaceholder.typicode.com/posts/"
          accept=".sql,.txt"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">选择预定义算子文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传sql或txt文件</div>
        </el-upload>
      </el-col>
      <el-col :span="6">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          accept=".sql,.txt"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">选择测试语句文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传sql或txt文件</div>
        </el-upload>
      </el-col>
    </el-row>
  </div>
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
  name: 'codeMirror',
  data () {
    return {
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
      code: '',
      textarea: '',
    }
  },
  mounted () {
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
      extraKeys: { 'Tab': 'autocomplete' }, //自定义快捷键
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
  },
  methods: {
    execute () {
      this.textarea += window.editor.getValue()
      // 后续用ajax发送给后端处理
    },
    clear () {
      window.editor.setValue('')
      window.editor.focus()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
        } 个文件`,
      )
    },
    beforeUpload (file) {
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
    beforeRemove (file, fileList) {
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

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
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
