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
              <el-checkbox :label="item.name" :checked="(checked[item.id] || []).length === item.hotelRoomMoney.length" :key="item.id">{{item.name}}</el-checkbox>
            </div>
          </el-col>

          <el-col :span="16">
            <div class="grid-content bg-purple">
              <el-checkbox-group v-model="checked[item.id]" @change="handleChange(item.id)">
                <el-checkbox
                  v-for="money in item.hotelRoomMoney"
                  :label="money.id"
                  :key="money.id"
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
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  data() {
    return {
      dialogFormVisible: false,
      checkAll: false,
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      isIndeterminate: true,
      form: {},
      value1: "",
      roomData: [],

      checked: {
        
      }
    };
  },
  methods: {
    init(id) {
      this.dialogFormVisible = true;
      this.getRoomDatas();
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    getRoomDatas() {
      this.$http({
        url: this.$http.adornUrl(`/hotel/hotelroom/getAllRooms`),
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.roomData = data.data;
          this.roomData.map(item=>{
            this.checked[item.id] = [];
          })
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    handleChange(value, categoryId) {
      console.log(value);
      this.checked[categoryId] = value;
    }
  },
};
</script>

