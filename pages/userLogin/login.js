const app = getApp()

Page({
  data: {
  },
  doLogin: function(e){
    var formObjiect = e.detail.value;
    var username = formObjiect.username;
    var password = formObjiect.password;

    if(username.length == 0 || password.length == 0){
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'none',
        duration: 3000
      })
    }else{
      var serverUrl = app.serverUrl;
      wx.showLoading({
        title: '请等待.....',
      });
      //调用后端
      wx.request({
        url: serverUrl + '/login',
        method: "POST",
        data: {
          username: username,
          password: password
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res){
          console.log(res.data);
          wx.hideLoading();
          var status=res.data.status;
          if(status == 200){
            wx.showToast({
              title: "登录成功",
              icon: 'none',
              duration: 3000
            }),
              app.userInfo = res.data.data;
              //TODO 页面跳转
          } else if (status == 500) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000
            })
          }
        }
      })
    }
  },
  goRegistPage: function(){
    wx.navigateTo({
      url: '../userRegist/regist',
    })
  }
  
})