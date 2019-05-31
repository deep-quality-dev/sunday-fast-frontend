<template>
    <el-dialog
        title="提示"
        :visible.sync="visible"
        :close-on-click-modal="false"
        width="30%"
        :before-close="hideDialog">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="hideDialog">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'upload-modal',
    data() {
      return {
        chooseImgList: ['111'],
      };
    },
    props: {
      visible: {
        type: Boolean,
      },
    },
    methods: {
      hideDialog() {
        this.$emit('changeVisible', false);
      },

      submit() {
        this.$emit('chooseImg', this.chooseImgList);
        this.hideDialog();
      },
    }
}
</script>


