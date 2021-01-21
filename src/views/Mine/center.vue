<template>
  <div id="userCenter">
    <div class="userInfor">
      <div>
        <img class="userPortrait" v-lazy="$store.state.user.userPortrait" />
        <label for="file">
          <input
            type="file"
            name="file"
            id="file"
            value="上传头像"
            @change="handleToUpload"
          
          />
        </label>
        

      </div>
      <div class="userType">
        <p>当前用户：{{ $store.state.user.name }}</p>
        <div v-if="$store.state.user.isAdmin">
          <p>用户身份：管理员</p>
          <a href="/admin" target="_blank">进入管理后台</a>
        </div>
        <div v-else>用户身份：普通会员</div>
         <a href="javascript:;" @touchend="handleToLogout">退出账户</a>
      </div>
    </div>
    <ul class="myCard">
        <li>
            <img src="/1.png" alt="">
            <p>电影订单</p>
        </li>
        <li>
            <img src="/2.png" alt="">
            <p>商品订单</p>
        </li>
    </ul>
    

    <!-- <div>
      当前用户：{{ $store.state.user.name }}
      <a href="javascript:;" @touchend="handleToLogout">退出</a>
      <div v-if="$store.state.user.isAdmin">
        用户身份：管理员 <a href="/admin" target="_blank">进入管理后台</a>
      </div>
      <div v-else>用户身份：普通会员</div>
      <div>
        <input
          type="file"
          name="file"
          id=""
          value="上传头像"
          @change="handleToUpload"
        />
        <img class="userPortrait" v-lazy="$store.state.user.userPortrait" />
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import { messageBox } from "@/components/JS";

export default {
  name: "Center",
  methods: {
    handleToLogout() {
      console.log(1);
      //退出账户的接口
      this.axios.get("/api/users/logout").then((res) => {
        if (res.data.status === 0) {
          //登出账户的时候，name设置为空  isAdmin设为false
          this.$store.commit("user/USER_NAME", {
            name: "",
            isAdmin: false, //退出账户，设置成“不是管理员”
            userPortrait: "",
          });
          this.$router.push("/mine/login");

          //退出账户的时候，把本地的数据清除
          localStorage.removeItem("name");
          localStorage.removeItem("isAdmin");
        }
      });
    },
    handleToUpload(ev) {
      var file = ev.target.files[0]; //获取文件信息
      var parma = new FormData(); //  FormData能把文件转成二进制数据，传递给后台

      parma.append("file", file, file.name); //把文件转成二进制

      var config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      //发起ajax请求，传给后台
      this.axios
        .post("/api/users/updateUserPortrait", parma, config)
        .then((res) => {
          var status = res.data.status;
          var This = this;
          if (status === 0) {
            console.log(res.data);

            messageBox({
              title: "信息",
              content: "上传头像成功",
              ok: "确定",
              handleOk() {
                This.$store.commit("user/USER_NAME", {
                  name: This.$store.state.user.name,
                  isAdmin: This.$store.state.user.isAdmin,
                  //更新vuex 里的 头像信息
                  userPortrait:
                    res.data.data.userPortrait + "?" + Math.random(),
                });
              },
            });
          } else {
            messageBox({
              title: "信息",
              content: "上传头像失败",
              ok: "确定",
            });
          }
        });
    },
  },
  //beforeRouteEnter
  beforeRouteEnter(to, from, next) {
    /*  async function getUser(){
        try{
            var res = await axios.get("/api/users/getUser12")
            console.log(res.data);
            if (res.data.status === 0) {//判断用户是否是登陆状态
                // console.log(res.data.data);
                next((vm) => {
                //通过vuex进行管理
                vm.$store.commit("user/USER_NAME", {
                    name: res.data.data.username,
                    isAdmin: res.data.data.isAdmin,
                    userPortrait: res.data.data.userPortrait,
                });

                //登陆账户的时候，把vuex 存到本地
                localStorage.setItem("name", res.data.data.username);
                localStorage.setItem("isAdmin", res.data.data.isAdmin);
                });
        } else {
            //没有登陆，调整到登陆页面
           next("/mine/login");
        }

        }catch(e){
            //数据请求失败
            console.log(e);
             next("/mine/login");
        }  
    }

    let result = getUser(); */

    //从服务器中，获取用户的登陆状态
    axios
      .get("/api/users/getUser")
      .then((res) => {
        var status = res.data.status;
        if (status === 0) {
          //判断用户是否是登陆状态
          // console.log(res.data.data);
          next((vm) => {
            //通过vuex进行管理
            vm.$store.commit("user/USER_NAME", {
              name: res.data.data.username,
              isAdmin: res.data.data.isAdmin,
              userPortrait: res.data.data.userPortrait,
            });

            //登陆账户的时候，把vuex 存到本地
            localStorage.setItem("name", res.data.data.username);
            localStorage.setItem("isAdmin", res.data.data.isAdmin);
          });
        } else {
          //没有登陆，调整到登陆页面
          next("/mine/login");
        }
      })
      .catch((err) => {
        console.log(err);
        next("/mine/login");
      });
  },
};
</script>

<style scoped>
#userCenter{
    background-color: #f4f4f4;
    height: 100%;
}
.userInfor {
  height: 150px;
  background-color: rgb(229, 153, 134);
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}


/* 美化控件 */
label input{
    display: none;
}
label::after {
  content: "更换头像";
  display: block;
  margin:10px 0;
  line-height: 30px;
  text-align: center;
  background-color: #518cf7;
  border-radius: 10px;

}


.userInfor > div:nth-child(2) {
  /* border: 1px solid; */
  width: 200px;
  flex-shrink: 0;
}
.userType {
  line-height: 30px;
}
.userPortrait {
  overflow: hidden;
  /* margin-top: 20px; */
  width: 100px;
  height: 100px;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 50%;
}

.myCard{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding:20px 10px;
    /* border: 1px solid ; */
    text-align: center;
    background-color: #fff;
}
.myCard li{
    color: #777;
}
.myCard img{
    margin:0 auto;
    width: 30px;
}

</style>