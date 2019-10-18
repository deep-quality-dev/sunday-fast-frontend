<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="pid">
        <el-select style="width: 100%" v-model="dataForm.pid" placeholder="请选择上级菜单">
          <el-option :key="0" label="一级菜单" :value="0"></el-option>
          <el-option v-for="item in selectData" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="dataForm.pid >0" label="内容" prop="content">
        <quill-editor
          style="height:200px"
          class="editor"
          v-model="dataForm.content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike", "link", "image", "align"],
            ["blockquote", "code-block"]
          ]
        }
      },
      visible: false,
      selectData: [],
      dataForm: {
        id: 0,
        name: "",
        pid: "",
        content: "",
        createtime: ""
      },
      dataRule: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        pid: [{ required: true, message: "上级菜单不能为空", trigger: "blur" }],
        content: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init(id) {
      this.loadSelectData();
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/hotel/hotelhelepmenu/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.hotelHelepMenu.name;
              this.dataForm.pid = data.hotelHelepMenu.pid;
              this.dataForm.content = data.hotelHelepMenu.content;
              this.dataForm.createtime = data.hotelHelepMenu.createtime;
            }
          });
        }
      });
    },
    //select data
    loadSelectData() {
      this.$http({
        url: this.$http.adornUrl(`/hotel/hotelhelepmenu/select`),
        method: "GET"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.selectData = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    onEditorBlur() {},
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },

    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/hotel/hotelhelepmenu/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              name: this.dataForm.name,
              pid: this.dataForm.pid,
              content: this.dataForm.content,
              createtime: this.dataForm.createtime
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    }
  }
};
</script>
