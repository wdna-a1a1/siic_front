<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    :width="dialogWidthCal"
    top="5vh"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" @keyup.enter.native="dataFormSubmit()">
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="客户姓名:" prop="customerName">
            <el-input v-model="dataForm.customerName" :readonly="readOnly" class="el-input-short" placeholder=""/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="flex-wrap: wrap;display: flex">
        <el-col :span="10">
          <el-form-item label="年龄:" prop="customerAge">
            <el-input v-model="dataForm.customerAge" :readonly="readOnly" class="el-input-short" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别:" prop="customerSex">
            <el-select v-model="dataForm.customerSex" :readonly="readOnly" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="flex-wrap: wrap;display: flex">
        <el-col :span="14">
          <el-form-item label="身份证号:" prop="idcard">
            <el-input v-model="dataForm.idcard" :readonly="readOnly" placeholder="" style="width: 80%"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="所属楼房:" prop="buildingId">
            <el-select v-model="dataForm.buildingId" :readonly="readOnly" placeholder="请选择">
              <el-option
                v-for="item in buildingOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="flex-wrap: wrap;display: flex">

        <el-col :span="12">
          <el-form-item label="房间号:" prop="roomNumber">
            <el-select v-model="dataForm.roomNumber"
                       :disabled="readOnly"
                       :loading="loading"
                       filterable placeholder="请选择"
                       @visible-change="getBedOptions"
            >
              <el-option
                v-for="item in roomOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="床位号:" prop="buildingId">
            <el-select v-model="dataForm.bedId" :disabled="readOnly" :loading="loading" placeholder="请选择">
              <el-option
                v-for="item in bedOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15" style="flex-wrap: wrap;display: flex">
        <el-col :span="12">
          <el-form-item label="档案号:" prop="recordId">
            <el-input v-model="dataForm.recordId" :readonly="readOnly" placeholder="" style="width: 80%"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="老人类型:" prop="elderType">
            <el-select v-model="dataForm.elderType" :disabled="readOnly" placeholder="请选择">
              <el-option
                v-for="item in elderTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="flex-wrap: wrap;display: flex">
        <el-col :span="10">
          <el-form-item label="入住时间:" prop="checkinDate">
            <template slot-scope="scope">
              <el-date-picker v-model="dataForm.checkinDate"
                              :readonly="readOnly"
                              placeholder="选择日期"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
              />
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同到期时间:" prop="expirationDate">
            <template slot-scope="scope">
              <el-date-picker v-model="dataForm.expirationDate"
                              :readonly="readOnly"
                              placeholder="选择日期"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
              />
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="flex-wrap: wrap;display: flex">
        <el-col :span="12">
          <el-form-item label="联系电话:" prop="contactTel">
            <el-input v-model="dataForm.contactTel" :readonly="readOnly" placeholder="" style="width: 70%"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="护理等级" prop="nurseLevel">
            <el-select
              v-model="dataForm.nurseLevel" :disabled="readOnly"
              :loading="loading"
              placeholder="请选择" filterable
            >
              <el-option
                v-for="item in nurseLevelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="flex-wrap: wrap;display: flex">
        <el-col :span="12">
          <el-form-item label="饮食注意事项:" prop="foodAttention">
            <el-input v-model="dataForm.foodAttention" :readonly="readOnly" placeholder="" type="textarea"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注意事项:" prop="attention">
            <el-input v-model="dataForm.attention" :readonly="readOnly" placeholder="" type="textarea"/>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button :disabled="hid" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      hid: false,
      dialogWidth: '50%',
      loading: false,
      visible: false,
      readOnly: false,
      sexOptions: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
      roomOptions: [],
      buildingOptions: [],
      bedOptions: [],
      nurseLevelOptions: [],
      elderTypeOption: [
        { label: '活力老人', value: '活力老人' },
        { label: '自理老人', value: '自理老人' },
        { label: '护理老人', value: '护理老人' }],
      dataForm: {
        id: 0,
        isDeleted: '',
        customerName: '',
        customerAge: '',
        customerSex: '',
        idcard: '',
        roomNumber: '',
        buildingId: '1',
        recordId: '',
        elderType: '',
        checkinDate: '',
        expirationDate: '',
        contactTel: '',
        bedId: '',
        nurseLevel: '',
        doctorId: '',
        nurseId: '',
        nursingWorkersId: '',
        psychosomaticState: '',
        attention: '',
        foodAttention: '',
        birthday: '',
        height: '',
        maritalStatus: '',
        weight: '',
        bloodType: '',
        filepath: ''
      },
      dataRule: {
        isDeleted: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        customerName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        customerAge: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        customerSex: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        idcard: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        roomNumber: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        buildingId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        recordId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        elderType: [
          { required: true, message: '活力老人不能为空', trigger: 'blur' }
        ],
        checkinDate: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        expirationDate: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        contactTel: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        bedId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        psychosomaticState: [
          { required: true, message: '精神状况不能为空', trigger: 'blur' }
        ],
        foodAttention: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        attention: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        height: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        maritalStatus: [
          { required: true, message: '婚姻状况不能为空', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        bloodType: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filepath: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  }, computed: {
    dialogWidthCal () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dialogWidth = (1 - this.$store.state.innerWH.innerWidth / 1920) * 70 + 50 + '%'
      return this.dialogWidth
    }
  }, watch: {
    /* 'dataForm.roomNumber': function (newValue, oldValue) {
      let self = this
      setTimeout(() => {
        self.getBedOptions()
      }, 500);

    }*/
  },
  mounted () {
    this.getRoomOptions()
    this.getNurseLevel()
  },
  methods: {
    init(info, edit) {
      if (edit == false) {
        this.readOnly = true;
        this.hid = true;
      }
      this.dataForm.id = info !== undefined ? info.id : ''
      this.bedOptions = info !== undefined ? [{label: info.bedIdName, value: info.bedId}] : []
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$axios.post('/customer/get-by-id', {id: this.dataForm.id}).then(({data}) => {
            if (data) {
              this.dataForm.isDeleted = data.customer.isDeleted
              this.dataForm.customerName = data.customer.customerName
              this.dataForm.customerAge = data.customer.customerAge
              this.dataForm.customerSex = data.customer.customerSex
              this.dataForm.idcard = data.customer.idcard
              this.dataForm.roomNumber = data.customer.roomNumber
              this.dataForm.buildingId = data.customer.buildingId
              this.dataForm.recordId = data.customer.recordId
              this.dataForm.elderType = data.customer.elderType
              this.dataForm.checkinDate = data.customer.checkinDate
              this.dataForm.expirationDate = data.customer.expirationDate
              this.dataForm.contactTel = data.customer.contactTel
              this.dataForm.bedId = data.customer.bedId
              this.dataForm.nurseLevel = data.customer.nurseLevel
              this.dataForm.doctorId = data.customer.doctorId
              this.dataForm.nurseId = data.customer.nurseId
              this.dataForm.nursingWorkersId = data.customer.nursingWorkersId
              this.dataForm.psychosomaticState = data.customer.psychosomaticState
              this.dataForm.attention = data.customer.attention
              this.dataForm.foodAttention = data.customer.foodAttention
              this.dataForm.birthday = data.customer.birthday
              this.dataForm.height = data.customer.height
              this.dataForm.maritalStatus = data.customer.maritalStatus
              this.dataForm.weight = data.customer.weight
              this.dataForm.bloodType = data.customer.bloodType
              this.dataForm.filepath = data.customer.filepath
            }
          })
        } else {
          this.getRecordId()
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$axios.post(`/customer/${!this.dataForm.id ? 'add' : 'update'}`,
            {
              'id': this.dataForm.id || undefined,
              'isDeleted': this.dataForm.isDeleted,
              'customerName': this.dataForm.customerName,
              'customerAge': this.dataForm.customerAge,
              'customerSex': this.dataForm.customerSex,
              'idcard': this.dataForm.idcard,
              'roomNumber': this.dataForm.roomNumber,
              'buildingId': this.dataForm.buildingId,
              'recordId': this.dataForm.recordId,
              'elderType': this.dataForm.elderType,
              'checkinDate': this.dataForm.checkinDate,
              'expirationDate': this.dataForm.expirationDate,
              'contactTel': this.dataForm.contactTel,
              'bedId': this.dataForm.bedId,
              'nurseLevel': this.dataForm.nurseLevel,
              'doctorId': this.dataForm.doctorId,
              'nurseId': this.dataForm.nurseId,
              'nursingWorkersId': this.dataForm.nursingWorkersId,
              'psychosomaticState': this.dataForm.psychosomaticState,
              'attention': this.dataForm.attention,
              'foodAttention': this.dataForm.foodAttention,
              'birthday': this.dataForm.birthday,
              'height': this.dataForm.height,
              'maritalStatus': this.dataForm.maritalStatus,
              'weight': this.dataForm.weight,
              'bloodType': this.dataForm.bloodType,
              'filepath': this.dataForm.filepath
            }).then(({ data }) => {
            if (data === true) {
              this.$message.success({
                message: '操作成功',
                duration: 500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error('操作失败')
            }
          })
        }
      })
    },
    getNurseLevel () {
      if (!this.dataForm.id) {
        this.$axios.post('/nurse-level/get-nurse-level').then(res => {
          this.nurseLevelOptions = res.data
        }).catch()
      }
    }, getRecordId () {
      if (!this.dataForm.id) {
        this.$axios.post('/customer/get-record-id').then(res => {
          this.dataForm.recordId = res.data
        }).catch()
      }
    },
    getRoomOptions () {
      if (!this.roomOptions.length > 0) {
        this.loading = true
        this.$axios.post('/bed/get-room-number', '', { headers: { 'showLoading': false, 'noRetry': false } }).then(
          res => {
            this.loading = false
            this.roomOptions = res.data
          }
          // eslint-disable-next-line handle-callback-err
        ).catch(err => {

        })
      }
    },
    getBedOptions () {
      if (this.dataForm.roomNumber > 0) {
        this.loading = true
        this.$axios.post('/bed/get-bed-number', { roomNumber: this.dataForm.roomNumber }, {
          headers: {
            'showLoading': false,
            'noRetry': false
          }
        }).then(
          res => {
            this.loading = false
            this.bedOptions = res.data
          }
          // eslint-disable-next-line handle-callback-err
        ).catch(err => {

        })
      }
    }
  }
}
</script>
<style scoped="scoped">
@import "../../../styles/mix.scss";

#app {
}
</style>
