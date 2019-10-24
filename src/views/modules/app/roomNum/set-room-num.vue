<template>
  <el-dialog
    title="批量设置房态"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    :lock-scroll="true"
  >
    <el-form label-width="auto" v-loading="dataListLoading">
      <el-form-item label="房型名称">
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-row :gutter="20" v-for="item in roomData" :key="item.id">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-checkbox
                :label="item.name"
                :key="item.id"
                v-model="item.selected"
                @change="handleRoomCheckChange(item, $event)"
              ></el-checkbox>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <el-checkbox-group v-model="item.selectedIds">
                <el-checkbox
                  v-for="money in item.hotelRoomMoney"
                  :key="money.id"
                  :label="money.id"
                  @change="handleMoneyCheckChange(item)"
                >{{ money.name }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="选择日期">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="房态状态">
        <el-radio-group v-model="status">
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
import _ from "lodash";

export default {
  data() {
    return {
      dialogFormVisible: false,
      roomData: [],
      checkAll: false,
      date: "",
      status: 3,
      dataListLoading: false
    };
  },
  methods: {
    init() {
      this.dialogFormVisible = true;
      this.getRooms();
    },
    getRooms() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl(`/hotel/hotelroom/getAllRooms`),
        method: "get"
      }).then(({ data }) => {
        this.dataListLoading = false;
        if (data && data.code === 0) {
          this.roomData = (data.data || []).map(item => ({
            ...item,
            selectedIds: [],
            selected: false
          }));
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    handleSubmit() {
      this.checkAll = false;
      this.dialogFormVisible = false;
      const roomIds = this.roomData
        .filter(item => {
          return item.selectedIds.length > 0;
        })
        .map(item => item.id);
      const moneyIds = _.flatten(this.roomData.map(item => item.selectedIds));
      console.log(roomIds);
      console.log(moneyIds);
    },
    handleCheckAllChange(check) {
      this.roomData = this.roomData.map(item => {
        return {
          ...item,
          selected: check,
          selectedIds: check ? item.hotelRoomMoney.map(value => value.id) : []
        };
      });
    },
    handleRoomCheckChange(item, check) {
      item.selectedIds = check
        ? item.hotelRoomMoney.map(value => value.id)
        : [];
      this.roomData = this.roomData.map(values => {
        if (values.id !== item.id) {
          return values;
        }
        return item;
      });
      this.checkAll = this.roomData.every(values => values.selected);
    },
    handleMoneyCheckChange(item) {
      item.selected = item.selectedIds.length === item.hotelRoomMoney.length;
      this.roomData = this.roomData.map(values => {
        if (values.id !== item.id) {
          return values;
        }
        return item;
      });
      this.checkAll = this.roomData.every(values => values.selected);
    }
  }
};
</script>

