<template>
    <el-dialog
        title="批量设置房态"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        :lock-scroll="true"
    >
        <el-form :model="form" label-width="auto">
            <el-form-item label="房型名称">
                <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                >全选</el-checkbox>
                <el-row :gutter="20" v-for="item in roomData" :key="item.id">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-checkbox
                                :label="item.name"
                                :checked="item.hotelRoomMoney.filter(item=>item.checked==true).length == item.hotelRoomMoney.length"
                                :key="item.id"
                            >{{item.name}},{{item.hotelRoomMoney.filter(item=>item.checked==true)}}</el-checkbox>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="grid-content bg-purple">
                            <el-checkbox-group
                                v-model="checked[item.id]"
                                @change="handleChange(item.id)"
                            >
                                <el-checkbox
                                    v-for="money in item.hotelRoomMoney"
                                    :key="money.id"
                                    :label="money.id"
                                >{{money.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="选择日期">
                <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="房态状态">
                <el-radio-group v-model="radio">
                    <el-radio :label="3">不做改变</el-radio>
                    <el-radio :label="6">房间开放</el-radio>
                    <el-radio :label="9">房间关闭</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      checkAll: false,
      isIndeterminate: true,
      form: {},
      value1: "",
      roomData: [
        {
          checked: false,
          hotelRoomMoney: [
            {
              checked: false
            }
          ]
        }
      ],
      radio: [3],
      checked: {},
      propsOptions: {
        label: (data, node) => {
          console.log(node);
          return data.name;
        },
        children: "hotelRoomMoney"
      }
    };
  },
  methods: {
    init(id) {
      this.dialogFormVisible = true;
      this.getRoomDatas();
    },
    handleCheckAllChange() {
      if (this.checkAll) {
        this.$refs.roomTree.setCheckedNodes(this.roomData);
        this.isIndeterminate = false;
      } else {
        this.$refs.roomTree.setCheckedKeys([]);
        this.isIndeterminate = true;
      }
    },
    getRoomDatas() {
      this.$http({
        url: this.$http.adornUrl(`/hotel/hotelroom/getAllRooms`),
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.roomData = data.data;
          this.roomData.map(item => {
            item.checked = false;
            this.checked[item.id] = [];
            item.hotelRoomMoney.map(money => {
              this.checked[item.id].push(money.id);
              money.checked = false;
            });
          });
          console.log(this.checked);
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    handleSubmit() {
      this.dialogFormVisible = false;
      const roomId = this.$refs.roomTree
        .getHalfCheckedKeys()
        .concat(this.$refs.roomTree.getCheckedKeys());
      console.log(roomId);
    },
    checkChange(item, check, isChildCheck) {
      //  console.log(item)
    },
    currentChecked(data, check) {
      //  console.log(data, check)
    },
    handleChange(value, categoryId) {
      console.log(value);
      this.checked[categoryId] = value;
    }
  }
};
</script>

