<template>
  <span>
    <span @click="visible = true">
      <slot></slot>
    </span>

    <el-dialog
      title="接单设置"
      :visible.sync="visible"
      width="700px"
    >
      <el-form>
        <el-form-item label="自动接单">
          <el-radio-group v-model="isAuto">
            <el-radio :label="1">开通</el-radio>
            <el-radio :label="2">关闭</el-radio>
          </el-radio-group>
          <span class="tips">开通自动接单，能实时确认入住订单，提升服务分哦</span>
        </el-form-item>

        <el-form-item label="设置类型">
          <div>
            <el-radio v-model="type" :label="1">快捷设置</el-radio>
            <span class="tips">快捷设置快捷设置快捷设置快捷设置快捷设置</span>
          </div>
          <div>
            <el-radio v-model="type" :label="2">自定义设置</el-radio>
            <span class="tips">自定义设置自定义设置自定义设置自定义设置</span>
          </div>
        </el-form-item>

        <el-form-item label="不适用入住日期">
          <div class="tips">如特定节日，容易满房期间的日期</div>
        </el-form-item>

        <template v-if="type === 2">
          <el-form-item label="适用时间">
          <el-checkbox-group v-model="days">
            <el-checkbox label="1">周一</el-checkbox>
            <el-checkbox label="2">周二</el-checkbox>
            <el-checkbox label="3">周三</el-checkbox>
            <el-checkbox label="4">周四</el-checkbox>
            <el-checkbox label="5">周五</el-checkbox>
            <el-checkbox label="6">周六</el-checkbox>
            <el-checkbox label="7">周日</el-checkbox>
          </el-checkbox-group>
          <div>
            <el-time-picker size="mini" v-model="timeRange" is-range></el-time-picker>
          </div>
        </el-form-item>

        <el-form-item label="适用房型">
          <el-row type="flex" v-for="room in rooms" :key="room.id">
            <el-col>
              <el-checkbox :checked="room.selected" @change="onRoomCheck(room, $event)">{{ room.name }}</el-checkbox>
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
  </span>
</template>

<script>
    export default {
      name: "setting",
      data() {
        return {
          visible: false,
          isAuto: 2,
          type: 2,
          days: [],
          timeRange: '',
          rooms: []
        }
      },
      created() {
        this.getRooms();
      },
      methods: {
        onOk() {
          console.log(this.isAuto)
          console.log(this.type)
          console.log(this.days)
          console.log(this.timeRange)
          console.log(this.rooms.map(({ selected, roomMaxCount }) => ({ selected, roomMaxCount })))
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
                roomMaxCount: ''
              }));
            } else {
              this.$message.error(data.msg);
            }
          });
        },
      }
    }
</script>

<style scoped>
  .tips {
    margin-left: 20px;
    font-size: 12px;
    color: #999;
  }
</style>
