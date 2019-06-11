<template>
  <div>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="200px">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">基本信息</div>
      </div>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="cateName">
        <el-popover ref="cateListPopover" placement="bottom-start" trigger="click">
          <el-tree
            :data="cateList"
            :props="cateListTreeProps"
            node-key="id"
            ref="cateListTree"
            @current-change="cateListTreeCurrentChangeHandle"
            :default-expand-all="true"
            :highlight-current="true"
            :expand-on-click-node="false"
          ></el-tree>
        </el-popover>
        <el-input
          v-model="dataForm.cateName"
          v-popover:cateListPopover
          :readonly="true"
          placeholder="点击选择商品分类"
          class="menu-list__input"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="img">
        <el-button type="primary" @click="showUploadModal(true)">
          上传
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
        <div class="uploader-list am-cf">
          <div
            v-for="(item, index) in goodsImages"
            :key="index"
            :data-index="index"
            class="file-item"
            @mouseover="showDelImg(index)"
            @mouseout="hiddDelImg(index)"
          >
            <img :src="item.url">
            <i class="icon el-icon-circle-close file-item-delete" v-show="item.showDel" @click="delGoodsImg(index)"></i>
          </div>
        </div>
        <!-- <el-input v-model="dataForm.img" placeholder="商品图片"></el-input> -->
      </el-form-item>
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">规格/库存</div>
      </div>
      <el-form-item label="商品规格" prop="specType">
        <el-radio-group v-model="dataForm.specType">
          <el-radio :label=1>单规格</el-radio>
          <el-radio :label=2>多规格</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="dataForm.specType === 2">
        <div class="specification">
          <div class="spec-list">
            <ul>
              <li class="item" v-for="(item, index) in specification" :key="index">
                <div class="name">
                  <el-input size="small" v-model="item.name" placeholder="输入产品规格"></el-input>
                  <i class="icon el-icon-circle-close" @click="delSpec(index)"></i>
                </div>
                <div class="values">
                  <span class="el-tag" v-for="(specItem, num) in item.value" :key="specItem.id">
                    <span class="el-select__tags-text">{{specItem.name}}</span>
                    <i class="el-tag__close el-icon-close" @click="delSpecTag(index, num)"></i>
                  </span>
                  <div class="add-attr">
                    <el-input placeholder="输入属性值" v-model="addValues[index]">
                      <template slot="append" v-if="item.value.length>0||item.id">
                        <el-button type="primary" @click="addSpecTag(index)" size="small">添加</el-button>
                      </template>
                    </el-input>
                    <!-- <el-input
                      size="small"
                      v-model="addValues[index]"
                      placeholder="输入属性值"
                      icon="plus"
                      @click="addSpecTag(index)"
                      @keyup.native.enter="addSpecTag(index)"
                    ></el-input>-->
                  </div>
                </div>
              </li>
              <li class="item" v-if="addSpecVisible">
                <div class="name">
                  <el-input size="small" v-model="addSpecTemp.name" placeholder="输入产品规格"></el-input>
                </div>
                <div class="values">
                  <div class="add-attr">
                    <el-input v-model="addSpecTemp.value[0]" placeholder="输入属性值"></el-input>
                    <!-- <el-input
                      size="small"
                      v-model="addValues[index]"
                      placeholder="输入属性值"
                      icon="plus"
                      @click="addSpecTag(index)"
                      @keyup.native.enter="addSpecTag(index)"
                    ></el-input>-->
                  </div>
                </div>
              </li>
            </ul>
            <div class="add-spec">
              <el-button
                v-if="!addSpecVisible"
                size="small"
                type="info"
                :disabled="specification.length >= 5"
                @click="showAddBtn(true)"
              >添加规格</el-button>
              <el-button v-if="addSpecVisible" type="primary" @click="saveSpec()" size="small">确定</el-button>
              <el-button
                v-if="addSpecVisible"
                type="danger"
                @click="showAddBtn(false)"
                size="small"
              >取消</el-button>
            </div>
          </div>
          <table class="stock-table" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th v-for="(item, index) in specification" :key="index">{{item.name}}</th>
                <th>规格图片</th>
                <th>规格编码</th>
                <th>成本价（元）</th>
                <th>库存</th>
                <th>销售价（元）</th>
              </tr>
            </thead>
            <tbody v-if="specification[0] && specification[0].value.length">
              <tr :key="index" v-for="(item, index) in countSum(0)">
                <td
                  style="text-align: center;"
                  v-for="(n, specIndex) in specification.length"
                  v-if="showTd(specIndex, index)"
                  :key="n"
                  :rowspan="countSum(n)"
                >{{getSpecAttr(specIndex, index).name}}</td>
                <td class="sku-img-warp">
                  <div tabindex="0" class="el-upload el-upload--picture-card" @click="selectSkuImng(true,index)">
                    <i v-if="!childProductArray[index].skuImg" class="el-icon-plus"></i>
                    <img class="skuImg" v-else :src="$http.adornUrl('/file/')+childProductArray[index].skuImg">
                  </div>
                  <el-input
                    style="display: none;"
                    type="hidden"
                    v-model="childProductArray[index].skuImg"
                  ></el-input>
                </td>
                <td>
                  <el-input
                    size="small"
                    type="text"
                    v-model="childProductArray[index].goodsNo"
                    @blur="handleNo(index)"
                    placeholder="输入商品规格编号"
                  ></el-input>
                </td>
                <td>
                  <el-input
                    size="small"
                    type="text"
                    v-model.number="childProductArray[index].linePrice"
                    placeholder="输入成本价"
                  ></el-input>
                </td>
                <td>
                  <el-input
                    size="small"
                    type="text"
                    v-model.number="childProductArray[index].stock"
                    placeholder="输入库存"
                  ></el-input>
                </td>
                <td>
                  <el-input
                    size="small"
                    type="text"
                    v-model.number="childProductArray[index].sellPrice"
                    placeholder="输入销售价"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td colspan="8" class="wh-foot">
                  <span class="label">批量设置：</span>
                  <ul class="set-list" v-if="isSetListShow">
                    <li class="set-item" @click="openBatch('linePrice')">成本价</li>
                    <li class="set-item" @click="openBatch('stock')">库存</li>
                    <li class="set-item" @click="openBatch('sellPrice')">销售价</li>
                  </ul>
                  <div class="set-form" v-else>
                    <el-input size="mini" v-model.number="batchValue" placeholder="输入要设置的数量"></el-input>
                    <i class="set-btn blue el-icon-check" @click="setBatch"></i>
                    <i class="set-btn red el-icon-close" @click="cancelBatch"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
      <el-form-item label="商品描述">
        <div>
          <quill-editor
            v-model="dataForm.content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </div>
      </el-form-item>
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">其他设置</div>
      </div>
      <el-form-item label="上架状态" prop="goodsStatus">
        <el-radio-group v-model="dataForm.goodsStatus">
          <el-radio :label=10>上架</el-radio>
          <el-radio :label=20>下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品排序" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="商品排序"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    <UploadModal
      :type="uploadCallbackType"
      :visible="uploadVisible"
      :extParams="uploadExtParams"
      :multiple="uploadMultiple"
      ref="uploadModal"
      @changeVisible="showUploadModal"
      @chooseImg="chooseImg"
    />
  </div>
</template>

<script>
import { treeDataTranslate } from "@/utils";
import UploadModal from "@/components/uploadModal";

// 为Object添加一个原型方法，判断两个对象是否相等
function objEquals(object1, object2) {
  // For the first loop, we only check for types
  for (let propName in object1) {
    // Check for inherited methods and properties - like .equals itself
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
    // Return false if the return value is different
    if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
      return false;
      // Check instance type
    } else if (typeof object1[propName] !== typeof object2[propName]) {
      // Different types => not equal
      return false;
    }
  }
  // Now a deeper check using other objects property names
  for (let propName in object2) {
    // We must check instances anyway, there may be a property that only exists in object2
    // I wonder, if remembering the checked values from the first loop would be faster or not
    if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
      return false;
    } else if (typeof object1[propName] !== typeof object2[propName]) {
      return false;
    }
    // If the property is inherited, do not check any more (it must be equa if both objects inherit it)
    if (!object1.hasOwnProperty(propName)) {
      continue;
    }
    // Now the detail check and recursion
    // This returns the script back to the array comparing
    /** REQUIRES Array.equals**/
    if (
      object1[propName] instanceof Array &&
      object2[propName] instanceof Array
    ) {
      // recurse into the nested arrays
      if (objEquals(!object1[propName], object2[propName])) {
        return false;
      }
    } else if (
      object1[propName] instanceof Object &&
      object2[propName] instanceof Object
    ) {
      // recurse into another objects
      // console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
      if (objEquals(!object1[propName], object2[propName])) {
        return false;
      }
      // Normal value comparison for strings and numbers
    } else if (object1[propName] !== object2[propName]) {
      return false;
    }
  }
  // If everything passed, let's say YES
  return true;
}
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],

  ["link", "image", "video"]
];

export default {
  components: {
    UploadModal
  },
  data() {
    return {
      uploadVisible: false, // 上传文件弹窗
      addSpecVisible: false,
      cateList: [],
      goodsImages: [],
      cateListTreeProps: {
        label: "name",
        children: "children"
      },
      addSpecTemp: {
        name: "",
        value: [""]
      },
      visible: false,
      dataForm: {
        id: 0,
        name: "",
        price: "",
        weight: "",
        specType: 1,
        categoryId: 0,
        goodsStatus:10,
        goodsSkus:[],
        specs:[],
        cateName: "",
        content: "",
        imgs: [],
        store:0,
        sort: ""
      },
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: value => {
                if (value) {
                  this.selectGoodsDetailImg(true,3)
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      dataRule: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" }
        ],
        price: [{ required: true, message: "价格不能为空", trigger: "blur" }],
      },
      specification: [
        {
          id: 1,
          name: "颜色",
          value: [{ id: 1, name: "黑色" }]
        }
      ],
      // 子规格
      childProductArray: [
        {
          goodsId: 0,
          goodsSkuValue: { 颜色: "黑色" },
          goodsSkuKey:{},
          goodsNo: "",
          skuImg: "",
          stock: 0,
          sellPrice: 0,
          linePrice: 0
        }
      ],
      // 用来存储要添加的规格属性
      addValues: [],
      // 默认商品编号
      defaultProductNo: "",
      // 批量设置相关
      isSetListShow: true,
      batchValue: "", // 批量设置所绑定的值
      currentType: "", // 要批量设置的类型
      uploadCallbackType: 1,
      uploadExtParams:0,
      uploadMultiple:true
    };
  },
  activated() {
    this.init(this.$route.query.id);
  },
  computed: {
    // 所有sku的id
    stockSpecArr() {
      return this.childProductArray.map(item => item.goodsSkuValue);
    },
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    async init(id) {
      await this.loadCategory();
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/admin/goods/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              console.log(data.data.goodsSkus)
              this.childProductArray=data.data.goodsSkus.map(item=>{
                return {
                  ...item,
                  goodsSkuKey:item.goodsSkuKey,
                  goodsSkuValue:JSON.parse(item.goodsSkuValue),
                }
              })
              // 初始化规格
              this.specification = data.data.specs.map(item=>{
                return {
                  id:item.id,
                  name:item.name,
                  value:item.specItems.map(sitem=>{
                    return {
                      id:sitem.id,
                      name:sitem.item,
                    }
                  })
                }
              });
              this.dataForm.name = data.data.name;
              this.dataForm.price = data.data.price;
              this.dataForm.weight = data.data.weight;
              this.dataForm.categoryId = data.data.categoryId;
              this.dataForm.specType = data.data.specType;
              this.dataForm.content = data.data.content;
              this.dataForm.imgs = data.data.imgs;
              this.dataForm.goodsStatus = data.data.goodsStatus;
              this.dataForm.sort = data.data.sort;
              this.dataForm.store = data.data.store;
              this.cateListTreeSetCurrentNode();
              console.log(this.specification)
              // this.childProductArray=data.da.goodsSkus;
            }
          });
        }
      });
    },
    //显示图片删除
    showDelImg(index) {
      var showDel = this.goodsImages[index].showDel;
      this.goodsImages[index].showDel = showDel === true ? false : true;
    },
    //隐藏图片删除
    hiddDelImg(index) {
      var showDel = this.goodsImages[index].showDel;
      this.goodsImages[index].showDel = showDel === true ? false : true;
    },
    //删除商品图片
    delGoodsImg(index){
      this.goodsImages.splice(index,1);
    },
    //保存规格
    saveSpec() {
      this.$http({
        url: this.$http.adornUrl(`/admin/spec/save`),
        method: "post",
        data: this.$http.adornData({
          ...this.addSpecTemp,
          specItems: this.addSpecTemp.value.map(item => {
            return {
              item: item
            };
          })
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.specification.push({
            id: data.data.id,
            name: data.data.name,
            value: data.data.specItems.map(item => {
              return {
                id: item.id,
                name: item.item
              };
            })
          });
          this.addSpecVisible = false;
          this.handleSpecChange("add");
        }
      });
    },
    //显示隐藏添加规格按钮
    showAddBtn(visible) {
      this.addSpecVisible = visible;
      this.addSpecTemp = {
        name: "",
        value: [""]
      };
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    saveHtml: function(event) {
      alert(this.content);
    },
    //选择商品图片
    showUploadModal(visible) {
      if (visible) {
        this.$nextTick(() => {
          this.$refs.uploadModal.init();
        });
      }
      this.uploadVisible = !!visible;
      this.uploadCallbackType = 1;
      this.uploadMultiple = true;
    },
    //  选择sku图片
    selectSkuImng(visible,index) {
      if (visible) {
        this.$nextTick(() => {
          this.$refs.uploadModal.init();
        });
      }
      this.uploadVisible = !!visible;
      this.uploadCallbackType = 2;
      this.uploadExtParams = index;
      this.uploadMultiple = false;
    },
    //详情图片选择
    selectGoodsDetailImg(visible){
       if (visible) {
        this.$nextTick(() => {
          this.$refs.uploadModal.init();
        });
      }
      this.uploadVisible = !!visible;
      this.uploadCallbackType = 3;
      this.uploadMultiple = true;
    },
    //图片选择回调
    chooseImg(data, type,uploadExtParams) {
      if (data.length > 0) {
        if(type === 1){
          this.goodsImages = data.map(item => {
            return {
              url: this.$http.adornUrl("/file/") + item.fileName,
              name:item.fileName,
              showDel: false
            };
          });
        }
        if(type === 2){
          this.childProductArray[uploadExtParams].skuImg = data[0].fileName
        }
        if(type === 3){
          let quill = this.$refs.myQuillEditor.quill;
          console.log(quill.selection)
          // 获取光标所在位置
          // let length = quill.getSelection().index;
          // 插入图片  res.url为服务器返回的图片地址
          data.forEach(item=>{
            quill.insertEmbed(0, 'image', this.$http.adornUrl("/file/") + item.fileName)
          })
          // 调整光标到最后
          // quill.setSelection(length + 1);
        }
      }
    },

    // 分类树选中
    cateListTreeCurrentChangeHandle(data, node) {
      this.dataForm.categoryId = data.id;
      this.dataForm.cateName = data.name;
    },
    // 分类输设置当前选中节点
    cateListTreeSetCurrentNode() {
      this.$refs.cateListTree.setCurrentKey(this.dataForm.categoryId);

      // eslint-disable-next-line
      this.dataForm.cateName = (this.$refs.cateListTree.getCurrentNode() || {})[
        "name"
      ];
    },
    //加载商品分类
    async loadCategory() {
      this.$http({
        url: this.$http.adornUrl(`/admin/category/list`),
        method: "get",
        params: this.$http.adornParams()
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.cateList = treeDataTranslate(data.data, "id", "pid");
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      console.log(JSON.stringify(this.childProductArray));
      console.log("-------------------------------------------------------");
      console.log(JSON.stringify(this.specification));
      console.log("-------------------------------------------------------");
      console.log(JSON.stringify(this.dataForm));
      if(this.dataForm.specType == 2){
        this.dataForm.goodsSkus = this.childProductArray.map(item => {
          return {
            ...item,
            goodsSkuKey:item.goodsSkuKey,
            goodsSkuValue:JSON.stringify(item.goodsSkuValue),
          }
        });
        this.dataForm.specs = this.specification.map(item=>{
          return {
            ...item,
            specItems:item.value.map(vitem =>{
              return {
                id:vitem.id,
                item:vitem.name,
                specId:item.id
              }
            })
          }
        })
      }
      console.log(JSON.stringify(this.dataForm));
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/admin/goods/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              name: this.dataForm.name,
              price: this.dataForm.price,
              weight: this.dataForm.weight,
              goodsSkus:this.dataForm.goodsSkus,
              specs:this.dataForm.specs,
              specType: this.dataForm.specType,
              goodsStatus:this.dataForm.goodsStatus,
              content: this.dataForm.content,
              imgs: this.goodsImages.map(item=>{
                return item.name;
              }),
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
      this.addSpecVisible = false;
      // if (this.specification.length < 5) {
      //   this.specification.push({
      //     name: "",
      //     value: []
      //   });
      // }
    },

    // 删除规格项目
    delSpec(index) {
      this.addSpecVisible = false;
      this.specification.splice(index, 1);
      this.handleSpecChange("del");
    },

    // 添加规格属性
    addSpecTag(index) {
      let newSpec = this.specification[index].value.filter(item => {
        return item.name === this.addValues[index];
      });
      console.log(newSpec);
      if (newSpec.length > 0) {
        this.$message({
          type: "error",
          message: "规格值已存在"
        });
        return;
      }
      this.$http({
        url: this.$http.adornUrl(`/admin/specitem/save`),
        method: "post",
        data: this.$http.adornData({
          specId: this.specification[index].id,
          item: this.addValues[index]
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.specification[index].value.push({
            id: data.data.id,
            name: data.data.item
          });
          this.clearAddValues(index);
          this.handleSpecChange("add");
        }
      });
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
        goodsId: 0,
        goodsSkuValue: this.getChildProductSpec(index),
        goodsSkuKey:this.getChildProductSpecKey(index),
        goodsNo: this.defaultProductNo,
        stock: 0,
        sellPrice: 0,
        linePrice: 0,
        skuImg: ""
      };

      const spec = childProduct.goodsSkuValue;
      if (option === "add") {
        // 如果此id不存在，说明为新增属性，则向 childProductArray 中添加一条数据
        if (this.stockSpecArr.findIndex(item => objEquals(spec, item)) === -1) {
          this.$set(this.childProductArray, index, childProduct);
        }
      } else if (option === "del") {
        // 因为是删除操作，理论上所有数据都能从stockCopy中获取到
        let origin = "";
        stockCopy.forEach(item => {
          if (objEquals(spec, item.goodsSkuValue)) {
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
        obj[item.name] = this.getSpecAttr(specIndex, index).name;
      });
      return obj;
    },
    //获取spec key
    getChildProductSpecKey(index) {
      let specKey=[];
      this.specification.forEach((item, specIndex) => {
        specKey.push(this.getSpecAttr(specIndex, index).id);
      });
      //获取value 值，以 ‘-’ 从小到大拼接
      specKey.sort(function(a,b){ return a-b})
      return specKey.join("-")
      ;
    },
    // 监听规格启用操作
    handleUserChange(index, value) {
      // 启用规格时，生成不重复的商品编号；关闭规格时，清空商品编号
      if (value) {
        let No = this.makeProductNoNotRepet(index);
        this.$set(this.childProductArray[index], "goodsNo", No);
      } else {
        this.$set(this.childProductArray[index], "goodsNo", "");
      }
    },

    // 监听商品编号的blur事件
    handleNo(index, attr) {
      // 1.当用户输入完商品编号时，判断是否重复，如有重复，则提示客户并自动修改为不重复的商品编号
      const value = this.childProductArray[index].goodsNo;
      let isRepet;

      this.childProductArray.forEach((item, i) => {
        if (item.goodsNo === value && i !== index) {
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
          "goodsNo",
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
        return item.goodsNo === No;
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
.uploader-list {
  .file-item {
    float: left;
    min-width: 110px;
    position: relative;
    margin: 20px 25px 0 0;
    padding: 4px;
    border: 1px solid #ddd;
    background: #fff;
    img {
      width: 110px;
      height: 100px;
    }
    .file-item-delete {
      position: absolute;
      top: -10px;
      right: -10px;
      cursor: pointer;
      height: 22px;
      width: 22px;
      line-height: 22px;
      background: rgba(153, 153, 153, 0.7);
      border-radius: 50%;
      text-align: center;
      color: #fff !important;
    }
  }
}
.ql-container {
  height: 500px;
}
* {
  list-style: none;
  padding: 0;
  border: 0;
}
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
  width: 100%;
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
        padding: 2px 8px;
        text-align: right;
        overflow: hidden;
        width: 200px;
        .el-input {
          float: left;
          width: 150px;
        }
        .icon {
          color: #929292;
          cursor: pointer;
          &:hover {
            color: #e54346;
          }
        }
        &:hover {
          .icon {
            display: inline-block;
          }
        }
      }
      .values {
        padding: 2px 3px;
        overflow: hidden;
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
            input {
              height: 32px;
            }
          }
        }
      }
    }
    .add-spec {
      font-size: 13px;
      margin-left: 10px;
    }
  }
}
.stock-table {
  margin-top: 20px;
  width: 100%;
  padding: 0;
  border-collapse: separate;
  border-color: #dfe6ec;
  border-style: solid;
  border-width: 1px 0 0 1px;
  background-color: #fff;
  .sku-img-warp {
    text-align: center;
    .skuImg{
      width: 100%;
      height: 100%;
    }
    div {
      height: 40px;
      width: 40px;
      line-height: 40px;
      font-size: 15px;
      i {
        font-size: 15px;
      }
    }
  }
  td,
  th {
    padding: 4px 10px;
    border-bottom: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
  }
  th {
    line-height: 30px;
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