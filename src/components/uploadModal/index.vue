<template>
    <el-dialog
        title="图片库"
        :visible.sync="visible"
        :close-on-click-modal="false"
        width="840px"
        style="padding-bottom: 0;"
        :before-close="hideDialog">
        <el-container>
          <el-header style="height: 35px;">
              <el-row>
                <el-dropdown>
                  <el-button type="primary" size="small">
                    移动至<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item>双皮奶</el-dropdown-item>
                    <el-dropdown-item>蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button type="danger" size="small" icon="el-icon-delete" plain>删除</el-button>
                <el-upload
                  style="float: right;"
                  class="upload-demo"
                  :action='this.$http.adornUrl("/file/upload")'
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :show-file-list="false"
                  :file-list="fileList">
                  <el-button size="small" type="primary" icon="el-icon-plus">上传文件</el-button>
                </el-upload>
              </el-row>
          </el-header>
          <el-container>
            <el-aside style="width:150px">
              <ul class="nav-new">
                <li>全部</li>
                <li class="active">未分组</li>
                <li>分组1</li>
                <li>新增分组</li>
              </ul>
            </el-aside>
            <el-main>
              <div class="file-list-body">
                <ul class="file-list-item">
                  <li>
                    <div>
                      <div class="img-cover" style="background-image: url('http://static.yoshop.xany6.com/20180928170741995264498.png')"></div>
                      <p class="file-name">20180928170102df8a59578.png</p> 
                    </div>
                  </li>
                  <li>
                    <div>
                      <div class="img-cover" style="background-image: url('http://static.yoshop.xany6.com/20180928170741995264498.png')"></div>
                      <p class="file-name">20180928170102df8a59578.png</p> 
                    </div>
                  </li>
                  <li>
                    <div>
                      <div class="img-cover" style="background-image: url('http://static.yoshop.xany6.com/20180928170741995264498.png')"></div>
                      <p class="file-name">20180928170102df8a59578.png</p> 
                    </div>
                  </li>
                  <li>
                    <div>
                      <div class="img-cover" style="background-image: url('http://static.yoshop.xany6.com/20180928170741995264498.png')"></div>
                      <p class="file-name">20180928170102df8a59578.png</p> 
                    </div>
                  </li>
                  <li>
                    <div>
                      <div class="img-cover" style="background-image: url('http://static.yoshop.xany6.com/20180928170741995264498.png')"></div>
                      <p class="file-name">20180928170102df8a59578.png</p> 
                    </div>
                  </li>
                  <li>
                    <div>
                      <div class="img-cover" style="background-image: url('http://static.yoshop.xany6.com/20180928170741995264498.png')"></div>
                      <p class="file-name">20180928170102df8a59578.png</p> 
                    </div>
                  </li>
                </ul>
              </div>
              <el-pagination
                small
                layout="prev, pager, next"
                :total="50">
              </el-pagination>
            </el-main>
          </el-container>
        </el-container>
        <span slot="footer" class="dialog-footer">
            <el-button @click="hideDialog">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  name: "upload-modal",
  data() {
    return {
      fileList: [],
      chooseImgList: ["111"]
    };
  },
  props: {
    visible: {
      type: Boolean
    }
  },
  methods: {
    hideDialog() {
      this.$emit("changeVisible", false);
    },

    submit() {
      this.$emit("chooseImg", this.chooseImgList);
      this.hideDialog();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>
<style lang="less">
.nav-new {
  overflow-y: auto;
  max-height: 340px;
  li {
    position: relative;
    margin: 0.3rem 0;
    padding: 0.8rem 2.3rem;
  }
  li.active {
    background: rgba(48, 145, 242, 0.1);
    border-radius: 6px;
    color: #0e90d2;
  }
}
.file-list-body {
  width: 630px;
  .file-list-item {
    overflow-y: auto;
    height: 380px;
    li {
      position: relative;
      cursor: pointer;
      border-radius: 6px;
      padding: 10px;
      border: 1px solid rgba(0, 0, 0, 0.05);
      float: left;
      margin: 7px;
      .img-cover {
        width: 120px;
        height: 120px;
        background: no-repeat center center / 100%;
      }
      p.file-name {
        margin: 5px 0 0 0;
        width: 120px;
        text-align: center !important;
        word-wrap: normal;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>



