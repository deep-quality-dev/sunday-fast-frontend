<template>
  <div>
    <el-image
      style="width: 100px; height: 100px"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    ></el-image>
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="200px"
    >
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">基本信息</div>
      </div>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="cidOne">
        <el-select v-model="dataForm.cidOne" placeholder="请选择商品分类">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片" prop="img">
        <el-button type="primary">
          上传
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
        <!-- <el-input v-model="dataForm.img" placeholder="商品图片"></el-input> -->
      </el-form-item>
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">规格/库存</div>
      </div>
      <el-form-item label="商品规格" prop="specType">
        <el-radio-group v-model="dataForm.specType">
          <el-radio label="单规格"></el-radio>
          <el-radio label="多规格"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div class="specification">
          <div class="title">产品规格设置</div>
          <ul class="spec-list">
            <li class="item" v-for="(item, index) in specification" :key="index">
              <div class="name">
                <el-input size="small" v-model="item.name" placeholder="输入产品规格"></el-input>
                <i class="icon el-icon-circle-close" @click="delSpec(index)"></i>
              </div>
              <div class="values">
                <span class="el-tag" v-for="(tag, num) in item.value" :key="tag">
                  <span class="el-select__tags-text">{{tag}}</span>
                  <i class="el-tag__close el-icon-close" @click="delSpecTag(index, num)"></i>
                </span>
                <div class="add-attr">
                  <el-input
                    size="small"
                    v-model="addValues[index]"
                    placeholder="多个产品属性以空格隔开"
                    icon="plus"
                    @click="addSpecTag(index)"
                    @keyup.native.enter="addSpecTag(index)"
                  ></el-input>
                </div>
              </div>
            </li>
          </ul>
          <div class="add-spec">
            <el-button
              size="small"
              type="info"
              :disabled="specification.length >= 5"
              @click="addSpec"
            >添加规格项目</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="库存数量" prop="store">
        <el-input v-model="dataForm.store" placeholder="库存数量"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="dataForm.price" placeholder="价格"></el-input>
      </el-form-item>
      <el-form-item label="重量(kg)" prop="weight">
        <el-input v-model="dataForm.weight" placeholder="重量(kg)"></el-input>
      </el-form-item>
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">基本信息</div>
      </div>
      <el-form-item label="商品描述" prop="content">
        <el-input v-model="dataForm.content" placeholder="商品描述"></el-input>
      </el-form-item>
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">其他设置</div>
      </div>
      <el-form-item label="商品排序" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="商品排序"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: "",
        price: "",
        weight: "",
        specType: "",
        content: "",
        img: "",
        sort: ""
      },
      dataRule: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" }
        ],
        price: [{ required: true, message: "价格不能为空", trigger: "blur" }],
        weight: [
          { required: true, message: "重量(kg)不能为空", trigger: "blur" }
        ],
        specType: [
          {
            required: true,
            message: "商品规格",
            trigger: "blur"
          }
        ],
        content: [
          { required: true, message: "商品描述不能为空", trigger: "blur" }
        ],
        img: [{ required: true, message: "商品图片不能为空", trigger: "blur" }],
        sort: [{ required: true, message: "商品排序不能为空", trigger: "blur" }]
      },
      specification: [
        {
          name: "颜色",
          value: ["黑色", "白色", "蓝色"]
        }
      ],
      // 子规格
      childProductArray: [
        {
          childProductId: 0,
          childProductSpec: { 颜色: "黑色" },
          childProductNo: "PRODUCTNO_0",
          childProductStock: 0,
          childProductPrice: 0,
          childProductCost: 0,
          isUse: true
        },
        {
          childProductId: 0,
          childProductSpec: { 颜色: "白色" },
          childProductNo: "PRODUCTNO_1",
          childProductStock: 0,
          childProductPrice: 0,
          childProductCost: 0,
          isUse: true
        },
        {
          childProductId: 0,
          childProductSpec: { 颜色: "蓝色" },
          childProductNo: "PRODUCTNO_2",
          childProductStock: 0,
          childProductPrice: 0,
          childProductCost: 0,
          isUse: true
        }
      ],
      // 用来存储要添加的规格属性
      addValues: [],
      // 默认商品编号
      defaultProductNo: "PRODUCTNO_",
      // 批量设置相关
      isSetListShow: true,
      batchValue: "", // 批量设置所绑定的值
      currentType: "" // 要批量设置的类型
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/app/goods/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.goods.name;
              this.dataForm.price = data.goods.price;
              this.dataForm.weight = data.goods.weight;
              this.dataForm.specType = data.goods.specType;
              this.dataForm.content = data.goods.content;
              this.dataForm.img = data.goods.img;
              this.dataForm.sort = data.goods.sort;
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/app/goods/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              name: this.dataForm.name,
              price: this.dataForm.price,
              weight: this.dataForm.weight,
              specType: this.dataForm.specType,
              content: this.dataForm.content,
              img: this.dataForm.img,
              sort: this.dataForm.sort
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
    },
    // 添加规格项目
    addSpec() {
      if (this.specification.length < 5) {
        this.specification.push({
          name: "",
          value: []
        });
      }
    },

    // 删除规格项目
    delSpec(index) {
      this.specification.splice(index, 1);

      this.handleSpecChange("del");
    },

    // 添加规格属性
    addSpecTag(index) {
      let str = this.addValues[index] || "";
      if (!str.trim()) return; // 判空
      str = str.trim();
      let arr = str.split(/\s+/); // 使用空格分割成数组

      let newArr = this.specification[index].value.concat(arr);
      newArr = Array.from(new Set(newArr)); // 去重
      this.$set(this.specification[index], "value", newArr);

      this.clearAddValues(index);

      this.handleSpecChange("add");
    },

    // 删除规格属性
    delSpecTag(index, num) {
      this.specification[index].value.splice(num, 1);

      this.handleSpecChange("del");
    },

    // 清空 addValues
    clearAddValues(index) {
      this.$set(this.addValues, index, "");
    },

    /*
      根据传入的属性值，拿到相应规格的属性
      @params
        specIndex 规格项目在 advancedSpecification 中的序号
        index 所有属性在遍历时的序号
    */
    getSpecAttr(specIndex, index) {
      // 获取当前规格项目下的属性值
      const currentValues = this.specification[specIndex].value;
      let indexCopy;

      // 判断是否是最后一个规格项目
      if (
        this.specification[specIndex + 1] &&
        this.specification[specIndex + 1].value.length
      ) {
        indexCopy = index / this.countSum(specIndex + 1);
      } else {
        indexCopy = index;
      }

      const i = Math.floor(indexCopy % currentValues.length);

      if (i.toString() !== "NaN") {
        return currentValues[i];
      } else {
        return "";
      }
    },

    /*
      计算属性的乘积
      @params
        specIndex 规格项目在 advancedSpecification 中的序号
    */
    countSum(specIndex) {
      let num = 1;
      this.specification.forEach((item, index) => {
        if (index >= specIndex && item.value.length) {
          num *= item.value.length;
        }
      });
      return num;
    },

    // 根据传入的条件，来判断是否显示该td
    showTd(specIndex, index) {
      // 如果当前项目下没有属性，则不显示
      if (!this.specification[specIndex]) {
        return false;

        // 自己悟一下吧
      } else if (index % this.countSum(specIndex + 1) === 0) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * [handleSpecChange 监听标签的变化,当添加标签时；求出每一行的hash id，再动态变更库存信息；当删除标签时，先清空已有库存信息，然后将原有库存信息暂存到stockCopy中，方便后面调用]
     * @param  {[string]} option ['add'|'del' 操作类型，添加或删除]
     * @return {[type]}        [description]
     */
    handleSpecChange(option) {
      const stockCopy = JSON.parse(JSON.stringify(this.childProductArray));
      if (option === "del") {
        this.childProductArray = [];
      }

      for (let i = 0; i < this.countSum(0); i++) {
        this.changeStock(option, i, stockCopy);
      }
    },

    /**
     * [根据规格，动态改变库存相关信息]
     * @param  {[string]} option    ['add'|'del' 操作类型，添加或删除]
     * @param  {[array]} stockCopy [库存信息的拷贝]
     * @return {[type]}           [description]
     */
    changeStock(option, index, stockCopy) {
      let childProduct = {
        childProductId: 0,
        childProductSpec: this.getChildProductSpec(index),
        childProductNo: this.defaultProductNo + index,
        childProductStock: 0,
        childProductPrice: 0,
        childProductCost: 0,
        isUse: true
      };

      const spec = childProduct.childProductSpec;
      if (option === "add") {
        // 如果此id不存在，说明为新增属性，则向 childProductArray 中添加一条数据
        if (this.stockSpecArr.findIndex(item => objEquals(spec, item)) === -1) {
          this.$set(this.childProductArray, index, childProduct);
        }
      } else if (option === "del") {
        // 因为是删除操作，理论上所有数据都能从stockCopy中获取到
        let origin = "";
        stockCopy.forEach(item => {
          if (objEquals(spec, item.childProductSpec)) {
            origin = item;
            return false;
          }
        });
        this.childProductArray.push(origin || childProduct);
      }
    },

    // 获取childProductArray的childProductSpec属性
    getChildProductSpec(index) {
      let obj = {};
      this.specification.forEach((item, specIndex) => {
        obj[item.name] = this.getSpecAttr(specIndex, index);
      });
      return obj;
    },

    // 监听规格启用操作
    handleUserChange(index, value) {
      // 启用规格时，生成不重复的商品编号；关闭规格时，清空商品编号
      if (value) {
        let No = this.makeProductNoNotRepet(index);
        this.$set(this.childProductArray[index], "childProductNo", No);
      } else {
        this.$set(this.childProductArray[index], "childProductNo", "");
      }
    },

    // 监听商品编号的blur事件
    handleNo(index, attr) {
      // 1.当用户输入完商品编号时，判断是否重复，如有重复，则提示客户并自动修改为不重复的商品编号
      const value = this.childProductArray[index].childProductNo;
      let isRepet;

      this.childProductArray.forEach((item, i) => {
        if (item.childProductNo === value && i !== index) {
          isRepet = true;
        }
      });

      if (isRepet) {
        this.$message({
          type: "warning",
          message: "不允许输入重复的商品编号"
        });
        this.$set(
          this.childProductArray[index],
          "childProductNo",
          this.makeProductNoNotRepet(index)
        );
      }
    },

    // 生成不重复的商品编号
    makeProductNoNotRepet(index) {
      let No;
      let i = index;
      let isRepet = true;
      while (isRepet) {
        No = this.defaultProductNo + i;
        isRepet = this.isProductNoRepet(No);
        i++;
      }
      return No;
    },

    // 商品编号判重
    isProductNoRepet(No) {
      const result = this.childProductArray.findIndex(item => {
        return item.childProductNo === No;
      });
      return result > -1;
    },

    // 打开设置框
    openBatch(type) {
      this.currentType = type;
      this.isSetListShow = false;
    },

    // 批量设置
    setBatch() {
      if (typeof this.batchValue === "string") {
        this.$message({
          type: "warning",
          message: "请输入正确的值"
        });
        return;
      }
      this.childProductArray.forEach(item => {
        if (item.isUse) {
          item[this.currentType] = this.batchValue;
        }
      });

      this.cancelBatch();
    },

    // 取消批量设置
    cancelBatch() {
      this.batchValue = "";
      this.currentType = "";
      this.isSetListShow = true;
    }
  }
};
</script>


<style lang="less">
.widget-head {
  width: 100%;
  padding: 12px 20px;
  border-bottom: 1px solid #eef1f5;
  margin-top: 10px;
  margin-bottom: 20px;
}
.widget-title {
  position: relative;
}
.widget-title::before {
  content: "";
  position: absolute;
  width: 4px;
  height: 14px;
  background: #00aeff;
  top: 1px;
  left: -12px;
}

.title {
  padding: 0 12px;
  line-height: 1;
  font-size: 18px;
  border-left: 4px solid #50bfff;
  color: #666;
  margin: 0 0 16px 0;
  font-weight: 400;
}
.example {
  margin-top: 50px;
  .code-area {
    width: 740px;
    height: 300px;
    box-sizing: border-box;
    padding: 20px;
    border: 2px dashed #c00;
    font-size: 14px;
    line-height: 1.6;
  }
}
.specification {
  display: inline-block;
  vertical-align: top;
  width: 480px;
  .spec-list {
    background-color: #fff;
    border: 1px solid #d8d8d8;
    padding: 10px;
    .item {
      margin-top: 5px;
      &:first-child {
        margin-top: 0;
      }
      .name {
        background: #f3f6fb;
        padding: 2px 8px;
        text-align: right;
        overflow: hidden;
        .el-input {
          float: left;
          width: 150px;
        }
        .icon {
          display: none;
          color: #929292;
          cursor: pointer;
          &:hover {
            color: #880000;
          }
        }
        &:hover {
          .icon {
            display: inline-block;
          }
        }
      }
      .values {
        .el-tag {
          margin: 8px 0 0 8px;
        }
        .add-attr {
          display: inline-block;
          vertical-align: top;
          margin-top: 4px;
          .el-input {
            width: 200px;
            margin: 2px 0 0 4px;
          }
        }
      }
    }
    .add-spec {
      font-size: 13px;
    }
  }
}
.stock-table {
  width: 740px;
  padding: 0;
  border-collapse: separate;
  border-color: #dfe6ec;
  border-style: solid;
  border-width: 1px 0 0 1px;
  background-color: #fff;
  td,
  th {
    padding: 4px 10px;
    border-bottom: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
  }
  th {
    line-height: 30px;
    background-color: #eef1f6;
  }
  .link {
    cursor: pointer;
    color: #0088ee;
    font-size: 13px;
    margin-left: 6px;
  }
  .wh-foot {
    line-height: 30px;
    .label {
      display: inline-block;
      vertical-align: top;
    }
    .set-list {
      display: inline-block;
      vertical-align: top;
      font-size: 0;
      .set-item {
        display: inline-block;
        vertical-align: top;
        margin-left: 15px;
        font-size: 13px;
        cursor: pointer;
        color: #0088ee;
      }
    }
    .set-form {
      display: inline-block;
      margin-left: 10px;
      .el-input {
        display: inline-block;
        width: 120px;
      }
      .set-btn {
        display: inline-block;
        padding: 0 2px;
        font-size: 15px;
        cursor: pointer;
        &.blue {
          color: #0088ee;
        }
        &.red {
          color: #cc0000;
        }
      }
    }
    .right {
      float: right;
    }
    .text {
      font-size: 13px;
    }
  }
}
</style>