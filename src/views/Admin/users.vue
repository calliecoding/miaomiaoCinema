<template>
  <div>
    <el-table :data="nowTableDate" border style="width: 100%">
      <el-table-column prop="userPortrait" label="头像"> 
            <template slot-scope="scope">
                <img class="userPortrait" v-lazy="scope.row.userPortrait" alt="">
            </template>
      </el-table-column>
      <el-table-column prop="date" label="注册日期"> </el-table-column>
      <el-table-column prop="username" label="用户姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="用户邮箱"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleToFreeze(scope.$index, scope.row)"
          >
            {{ scope.row.isFreeze ? "已冻结" : "未冻结" }}
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleToDelete(scope.$index, scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 2,
    };
  },

  mounted() {
    this.axios.get("/api/admin/usersList").then((res) => {
      //   console.log(res.data);
      var status = res.data.status;
      if (status === 0) {
        this.tableData = res.data.usersList;
      }
    });
  },
  computed: {
    nowTableDate() {
      return (
        this.tableData.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        ) || []
      );
    },
  },

  methods: {
    handleToFreeze(index, row) {
      this.axios
        .post("/api/admin/updateFreeze", {
          email: row.email,
          isFreeze: !row.isFreeze,
        })
        .then((res) => {
          var status = res.data.status;

          if (status === 0) {
            this.$alert(res.data.msg, "信息", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.tableData[index].isFreeze = !row.isFreeze;
              },
            });
          } else {
            this.$alert("冻结失败", "信息", {
              confirmButtonText: "确定",
              callback: (action) => {},
            });
          }
        });
    },

    handleToDelete(index, row) {
      this.axios
        .post("/api/admin/deleteUser", {
          email: row.email,
        })
        .then((res) => {
          console.log();
          var status = res.data.status;
          if (status === 0) {
            this.$alert(res.data.msg, "信息", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.tableData.splice(index, 1);
              },
            });
          } else {
            this.$alert("删除失败", "信息", {
              confirmButtonText: "确定",
              callback: (action) => {},
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.page {
  margin-top: 20px;
}
.userPortrait{
    overflow: hidden;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #ccc;
}
</style>