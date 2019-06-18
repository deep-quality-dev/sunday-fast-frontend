<template>
  <el-dialog
    title="图片库"
    :visible.sync="visible"
    :close-on-click-modal="false"
    width="840px"
    style="padding-bottom: 0;"
    :before-close="hideDialog"
  >
    <el-container>
      <el-header style="height: 35px;">
        <el-row>
          <el-dropdown>
            <el-button type="primary" size="small">移动至
              <i class="el-icon-arrow-down el-icon--right"></i>
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
            :action="actionUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :show-file-list="false"
            :file-list="fileList"
          >
            <el-button size="small" type="primary" icon="el-icon-plus">上传文件</el-button>
          </el-upload>
        </el-row>
      </el-header>
      <el-container>
        <el-aside style="width:150px">
          <ul class="nav-new">
            <li class="active">全部</li>
            <li v-for="(item, index) in dataList" :key="index">{{item.groupName}}</li>
            <li @click="addGroup">新增分组</li>
          </ul>
        </el-aside>
        <el-main>
          <div class="file-list-body">
            <ul class="file-list-item">
              <li
                v-for="(item, index) in fileData"
                :key="index"
                :data-index="index"
                @click="setListCheck(index)"
              >
                <div>
                  <div class="img-cover" :style="{backgroundImage:'url('+item.url+')'}"></div>
                  <p class="file-name">{{item.url}}</p>
                  <div class="select-mask" v-if="item.check">
                    <img :src="require('../../assets/img/chose.png')">
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-size="pageSize"
            :total="totalPage"
            small
            layout="prev, pager, next"
          ></el-pagination>
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
      chooseImgList: [],
      dataList: [],
      dataListLoading: false,
      fileData: [],
      actionUrl: this.$http.adornUrl(
        `/sys/oss/upload?token=${this.$cookie.get("token")}`
      ),
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
    };
  },
  props: {
    visible: {
      type: Boolean
    },
    type: {
      type: Number
    },
    extParams: {
      type: Number
    },
    multiple: {
      type: Boolean
    }
  },
  methods: {
    init() {
      this.getFileList();
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/admin/uploadgroup/list"),
        method: "get",
        params: this.$http.adornParams({})
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data;
        } else {
          this.dataList = [];
        }
        this.dataListLoading = false;
      });
    },
    // 获取文件数据
    getFileList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/sys/oss/list"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.fileData = data.page.list;
          this.fileData = this.fileData.map(item => {
            return {
              ...item,
              check: false
            };
          });
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    addGroup() {
      alert("添加分组");
    },
    hideDialog() {
      this.$emit("changeVisible", false);
    },
    setListCheck: function(idx) {
      var check = this.fileData[idx].check;
      if (!this.multiple) {
        this.fileData.forEach((item, index) => {
          this.fileData[index].check = false;
        });
      }
      this.fileData[idx].check = check === true ? false : true;
    },
    submit() {
      this.chooseImgList = this.fileData.filter(item => {
        return item.check === true;
      });
      this.$emit("chooseImg", this.chooseImgList, this.type, this.extParams);
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
    cursor: pointer;
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
      .select-mask {
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        text-align: center;
        border-radius: 6px;
        img {
          position: absolute;
          top: 50px;
          left: 45px;
          box-sizing: border-box;
          vertical-align: middle;
          border: 0;
        }
      }
    }
  }
}
</style>



