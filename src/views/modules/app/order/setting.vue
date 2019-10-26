<template>
  <el-dialog title="接单设置" :visible.sync="dialogVisible" width="700px" :close-on-click-modal="false">
    <el-form label-width="auto" v-loading="dataListLoading">
      <el-form-item label="自动接单">
        <el-radio-group v-model="isAuto">
          <el-radio :label="1">开通</el-radio>
          <el-radio :label="2">关闭</el-radio>
        </el-radio-group>
        <span class="tips">开通自动接单，能实时确认入住订单，提升服务分哦</span>
      </el-form-item>
      <el-form-item label="设置类型">
        <el-radio v-model="type" :label="1">快捷设置</el-radio>
        <el-radio v-model="type" :label="2">自定义设置</el-radio>
        <span class="tips">个性化选择自动接单的时间，房型，房量</span>
      </el-form-item>
      <el-form-item label="不适用入住日期">
        <el-date-picker
          v-model="value1"
          value-format="yyyy-MM-dd"
          @change="dateOnSelect()"
          size="mini"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
        <span class="tips">如特定节日，容易满房期间的日期</span>
        <div>
          <el-tag
            style="margin-right:2px;"
            v-for="tag in dates"
            @close="handleClose(tag)"
            :key="tag.date"
            closable
          >{{tag.date}}</el-tag>
        </div>
      </el-form-item>
      <template v-if="type === 2">
        <el-form-item label="适用时间">
          <div>
            <el-checkbox-group v-model="days">
              <el-checkbox label="1">周一</el-checkbox>
              <el-checkbox label="2">周二</el-checkbox>
              <el-checkbox label="3">周三</el-checkbox>
              <el-checkbox label="4">周四</el-checkbox>
              <el-checkbox label="5">周五</el-checkbox>
              <el-checkbox label="6">周六</el-checkbox>
              <el-checkbox label="7">周日</el-checkbox>
            </el-checkbox-group>
            <el-time-picker size="mini" value-format="HH:mm" v-model="timeRange" is-range></el-time-picker>
          </div>
        </el-form-item>
        <el-form-item label="适用房型">
          <el-row type="flex" v-for="room in rooms" :key="room.id">
            <el-col>
              <el-checkbox
                :checked="room.selected"
                @change="onRoomCheck(room, $event)"
              >{{ room.name }}</el-checkbox>
            </el-col>
            <el-col class="tips">每日自动接单数</el-col>
            <el-col>
              <el-input :value="room.roomMaxCount" @input="onRoomInput(room, $event)" size="mini"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </template>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "setting",
  data() {
    return {
      dataForm: {
        id: 0
      },
      value1: "",
      dialogVisible: false,
      isAuto: 2,
      type: 2,
      days: [],
      timeRange: ["14:00", "15:00"],
      rooms: [],
      dataListLoading: false,
      dates: []
    };
  },
  methods: {
    init() {
      this.days = [];
      this.timeRange = [];
      this.isAuto = 1;
      this.type = 1;
      this.dates = [];
      this.dialogVisible = true;
      this.getRooms();
    },
    getSetInfo() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl(`/hotel/hotelordersetting/info`),
        method: "get",
        params: this.$http.adornParams()
      }).then(({ data }) => {
        this.dataListLoading = false;
        if (data && data.code === 0) {
          this.dataForm.id = data.hotelOrderSetting.id || 0;
          const { hotelOrderSetting } = data;
          this.isAuto = hotelOrderSetting.autoOrder;
          this.type = hotelOrderSetting.custSetting;
          if (hotelOrderSetting.days) {
            hotelOrderSetting.days.map(item => {
              if (item.type === 2) {
                this.days.push(item.date);
              }
              if (item.type === 1) {
                this.dates.push({
                  type: 1,
                  date: item.date
                });
              }
              if (item.type === 3) {
                console.log(item.date.split("-"));
                this.timeRange = item.date.split("-");
              }
            });
          }
          if (hotelOrderSetting.rooms) {
            this.rooms.map(item => {
              hotelOrderSetting.rooms.map(room => {
                if (room.roomId === item.id) {
                  item.selected = true;
                  item.roomMaxCount = room.num;
                }
              });
            });
          }
        }
      });
    },
    dateOnSelect(value) {
      this.dates.push({
        date: this.value1,
        type: 1
      });
      this.value1 = "";
    },
    handleClose(tag) {
      this.dates.splice(this.dates.indexOf(tag), 1);
    },
    onOk() {
      //处理日期数据
      let submitDates = [];
      this.dates.map(item => {
        submitDates.push({
          ...item
        });
      });
      submitDates.push({
        type: 3,
        date: this.timeRange.join("-").replace('"')
      });
      this.days.map(item => {
        submitDates.push({
          type: 2,
          date: item
        });
      });
      let submitRooms = this.rooms.filter(item => item.selected == true);
      this.$http({
        url: this.$http.adornUrl(
          `/hotel/hotelordersetting/${!this.dataForm.id ? "save" : "update"}`
        ),
        method: "post",
        data: this.$http.adornData({
          id: this.dataForm.id,
          autoOrder: this.isAuto,
          custSetting: this.type,
          days: submitDates,
          rooms: submitRooms.map(({ id, roomMaxCount }) => ({
            roomId: id,
            num: roomMaxCount
          }))
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.dialogVisible = false;
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    onRoomCheck(room, check) {
      room.selected = check;
    },
    onRoomInput(room, value) {
      room.roomMaxCount = value;
      this.rooms = this.rooms.map(item => {
        if (item.id === room.id) {
          return room;
        }
        return item;
      });
    },
    getRooms() {
      this.$http({
        url: this.$http.adornUrl(`/hotel/hotelroom/getAllRooms`),
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.rooms = data.data.map(item => ({
            ...item,
            selected: false,
            roomMaxCount: ""
          }));
          this.getSetInfo();
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
.tips {
  margin-left: 20px;
  font-size: 12px;
  color: #999;
}
</style>
