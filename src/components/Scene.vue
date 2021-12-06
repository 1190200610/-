<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../icon/huawei_logo.png" alt="" width="180" height="40"/>
        <span></span>
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
                    v-model="code"
                    style="height: 50vh"
                ></textarea>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-select
                    v-model="value"
                    placeholder="Select"
                    style="width: 85vh"
                >
                  <el-option
                      v-for="item in cities"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span
                        style="
                        float: right;
                        color: var(--el-text-color-secondary);
                        font-size: 14px;
                      "
                    >{{ item.value }}</span
                    >
                  </el-option>
                </el-select>
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
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="demo-image" style="text-align: center">
                <div v-for="fit in fits" :key="fit" class="block">
                  <div class="demonstration" style="font-size: 30px">
                    <strong>索引结构</strong>
                  </div>
                  <br/>
                  <el-image
                      style="width: auto; height: 60vh"
                      :src="url"
                      :fit="fit"
                  ></el-image>
                </div>
              </div
              >
            </el-col>
            <el-col :span="12"
            >
              <div
                  class="grid-content bg-purple-light"
                  style="text-align: center"
              >
                <div class="demonstration" style="font-size: 30px">
                  <strong>相关信息</strong>
                </div>
                <div style="margin: 20px 0"></div>
                <hr style="border: 0; border-top: 3px solid #cce0ff"/>
                <div style="margin: 20px 0"></div>
                <div class="demonstration" style="font-size: 20px">
                  <strong>查询时间</strong>
                </div>
                <br/>
                <el-input
                    class="showinfo"
                    v-model="querytime"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    type="textarea"
                    readonly
                    placeholder="查询时间"
                />
                <div style="margin: 20px 0"></div>
                <div class="demonstration" style="font-size: 20px">
                  <strong>内存开销</strong>
                </div>
                <br/>
                <el-input
                    class="showinfo"
                    v-model="querymemory"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    type="textarea"
                    readonly
                    placeholder="内存开销"
                />
                <div style="margin: 20px 0"></div>
                <div class="demonstration" style="font-size: 20px">
                  <strong>查询节点</strong>
                </div>
                <br/>
                <el-input
                    class="showinfo"
                    v-model="querystruct"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    type="textarea"
                    readonly
                    placeholder="查询节点"
                />
              </div
              >
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
import {ref, defineComponent, reactive, toRefs} from 'vue'

export default {
  name: 'codeMirror',
  setup() {
    const state = reactive({
      fits: ['contain'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    })

    return {
      cities: ref([
        {
          value: 'Beijing',
          label: 'Beijing',
        },
        {
          value: 'Shanghai',
          label: 'Shanghai',
        },
        {
          value: 'Nanjing',
          label: 'Nanjing',
        },
        {
          value: 'Chengdu',
          label: 'Chengdu',
        },
        {
          value: 'Shenzhen',
          label: 'Shenzhen',
        },
        {
          value: 'Guangzhou',
          label: 'Guangzhou',
        },
      ]),
      value: ref(''),
      ...toRefs(state),
    }
  },
  data() {
    return {
      editor: '',
      code: '',
      querytime: '',
      querymemory: '',
      querystruct: '',
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
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    execute() {
      this.textarea += window.editor.getValue()
      // 后续用ajax发送给后端处理
      this.axios({
        method: 'post',
        url: 'http://localhost:10000/api/learnedindex',
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
            this.querytime = response.data.querytime
            this.querymemory = response.data.querymemory
            this.querystruct = response.data.querystruct
          })
          .catch((error) => console.log(error, 'error'))
    },
    clear() {
      window.editor.setValue('')
      window.editor.focus()
    },
  },
}
</script>

<style>
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

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.showinfo {
  cursor: default;
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
