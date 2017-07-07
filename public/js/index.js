$(function () {
	var $loginBox = $("#login")
  var $registerBox = $("#register")
  var $userInfoBox = $("#userInfoBox")
  var loginSubmitBtn = $loginBox.find('.login-btn')
  var registerSubmitBtn = $registerBox.find('.register-btn')

  //注册
  registerSubmitBtn.on('click', function () {
    $.ajax({
      type: 'post',
      dataType: 'json',
      url: '/api/user/register',
      data: {
        username: $registerBox.find('[name="username"]').val(),
        password: $registerBox.find('[name="password"]').val(),
        repassword: $registerBox.find('[name="repassword"]').val()
      },
      success: function (res) {
        if (res.code === 0) {
          alert('注册成功,请登录!')

          $registerBox.hide()
          $loginBox.show()
        } else {
          $registerBox.find('.warning').html(res.message)
        }
      },
      fail: function () {
        console.log('fail')
      }
    })
  })

  //登录
  loginSubmitBtn.on('click', function () {
    $.ajax({
      type: 'post',
      url: '/api/user/login',
      dataType: 'json',
      data: {
        username: $loginBox.find('[name="username"]').val(),
        password: $loginBox.find('[name="password"]').val()
      },
      success: function (res) {
        if (res.code === 0) {
          alert('登录成功')
          $loginBox.hide()
          $userInfoBox.find('.blue-text').html(res.userInfo.username)
          $userInfoBox.show()
        } else {
          $registerBox.find('.warning').html(res.message)
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  })


})