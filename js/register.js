$(function() {
    // tmp = $("#registerform").validate({
    //     //自定义验证规则
    //     rules: {
    //         username: {
    //             rangelength: [4, 20],
    //         },
    //         password: {
    //             rangelength: [6, 20],
    //         }
    //     },
    //     success: function(label) {//label是自动添加到input后的提示
    //         label.html("").addClass("checked");
    //     },
    //     messages: {
    //         username: {
    //             rangelength: "长度只能在4-20个字符之间"
    //         },
    //         password: {
    //             rangelength: "长度只能在6-20个字符之间"
    //         }
    //     }

    // });
    var oName = $("#username");
    var pwd = $("#password");
    var pwd2 = $("#password2");
    var name_msg = $("#nameNotice");
    var pwd_msg = $("#pwdNotice");
    var pwd2_msg = $("#pwdNotice2");
    var phone = $("#phoneN");
    var phone_msg = $("#pnNotice");
    var reg = /[^(\u4e00-\u9fa5)|^\w|^\-]/;
    var reg_d = /^\d*$/;//匹配都是数字
    var reg_t = /^a-zA-Z*$/;//匹配纯字母
    oName.focus(function() {
        name_msg.css("display", "block");
    });
    oName.keyup(function() {
        if(reg.test($(this).val())) {
            $(this).addClass('error');
            name_msg.html('<i class="i-error"></i>格式错误，仅支持汉字、字母、数字、“－”“_”的组合').css('color', '#e22');
        } else {
            $(this).removeClass('error');
            name_msg.html('<i class="i-tip"></i>支持中文、字母、数字、"－""_"的组合，4-20个字符').css('color', '#ccc');
        }
    });
    oName.blur(function() {
        if ($(this).val() == '') {
            name_msg.css("display", "none");
        //长度只能在4-20个字符之间
        } else if ($(this).val().length < 4 || $(this).val().length > 20) {
            $(this).addClass('error');
            name_msg.html('<i class="i-error"></i>长度只能在4-20个字符之间').css('color', '#e22');
        //用户名不能是纯数字
        } else if (reg_d.test($(this).val())) {
            $(this).addClass('error');
            name_msg.html('<i class="i-error"></i>用户名不能是纯数字，请重新输入！').css('color', '#e22');
        //格式错误
        } else if (reg.test($(this).val())) {
            $(this).addClass('error');
            name_msg.html('<i class="i-error"></i>格式错误，仅支持汉字、字母、数字、“－”“_”的组合').css('color', '#e22');
        } else {
            $(this).removeClass('error');
            name_msg.html('<i class="i-ok"></i>');
        }
    });
     
    pwd.focus(function() {
        if($(this).val() == '') { 
            $(this).removeClass('error');
            pwd_msg.css({
                display: 'block',
                color: '#ccc'
            }).html('<i class="i-tip"></i>建议使用字母、数字和符号两种及以上的组合，6-20个字符');
        }
    });
    pwd.keyup(function() {
        var reg = /(^[a-zA-Z]{6,10}$)|(^[0-9]{6,10}$)/;
        var reg2 = /([a-zA-Z]\d)|(\d[a-zA-Z])/;//数字与字母组合
        var reg11 = /(^[a-zA-Z]{11,20}$)|(^[0-9]{11,20}$)/;
        var reg3 = /\d/;
        var reg4 = /[a-zA-Z]/;
        var reg5 = /\W/;
        //弱：6-10位纯数字或者字母
        if(reg.test($(this).val()) ) {
            pwd_msg.html('<i class="i-ok"></i><i class="i_pwd_weak"></i>有被盗风险,建议使用字母、数字和符号两种及以上组合');
        //中：6-10位数字与字母的组合
        } else if ($(this).val().length > 5 && $(this).val().length < 11 && reg2.test($(this).val()) && !reg5.test($(this).val())) {
            pwd_msg.html('<i class="i-ok"></i><i class="i_pwd_medium"></i>安全强度适中，可以使用三种以上的组合来提高安全强度');
        } else if (reg11.test($(this).val())) {
            pwd_msg.html('<i class="i-ok"></i><i class="i_pwd_medium"></i>安全强度适中，可以使用三种以上的组合来提高安全强度');
        //强：你的密码很安全
        } else if($(this).val().length >= 11 && reg2.test($(this).val())) {
            pwd_msg.html('<i class="i-ok"></i><i class="i_pwd_strong"></i>你的密码很安全');
        } else if($(this).val().length > 6 && reg3.test($(this).val()) && reg4.test($(this).val()) && reg5.test($(this).val())) {
            pwd_msg.html('<i class="i-ok"></i><i class="i_pwd_strong"></i>你的密码很安全');
        } else {
            $(this).removeClass('error');
            pwd_msg.html('<i class="i-tip"></i>建议使用字母、数字和符号两种及以上的组合，6-20个字符').css("color", '#ccc');
        }
    });
    pwd.blur(function() {
        if($(this).val().length < 6 && $(this).val() != '') {
            $(this).addClass('error');
            pwd_msg.html('<i class="i-error"></i>长度只能在6-20个字符之间').css('color', '#e22');
        } else if($(this).val() == '') {
            $(this).removeClass('error');
            pwd_msg.css('display', 'none');
        }
    });

    pwd2.focus(function() {
        if($(this).val() == '') {
            $(this).removeClass('error');
            pwd2_msg.css({
                display: 'block',
                color: '#ccc'
            }).html('<i class="i-tip"></i>请再次输入密码');
        }  
    });
    pwd2.blur(function() {
        if($(this).val() != pwd.val()) {
            $(this).addClass('error');
            pwd2_msg.html('<i class="i-error"></i>两次密码输入不一致').css('color', '#e22');
        } else if($(this).val() == pwd.val() && $(this).val() != '') {
            $(this).removeClass('error');
            pwd2_msg.html('<i class="i-ok"></i>');
        } else {
            $(this).removeClass('error');
            pwd2_msg.css('display', 'none');
        }
    });
    phone.focus(function() {
        if($(this).val() == '') { 
            $(this).removeClass('error');
            phone_msg.css({
                display: 'block',
                color: '#ccc'
            }).html('<i class="i-tip"></i>完成验证后，你可以用该手机登录和找回密码');
        }
    });
    phone.keyup(function() {
        if($(this).val() == '') {
            $(this).removeClass('error');
            phone_msg.css({
                color: '#ccc'
            }).html('<i class="i-tip"></i>完成验证后，你可以用该手机登录和找回密码');
        }
    });
    phone.blur(function() {
        var reg_p = /1[34578]\d{9}/;
        if($(this).val() == '') {
            phone_msg.css("display", 'none');
        } else if ($(this).val().length < 11) {
            $(this).addClass('error');
            phone_msg.html('<i class="i-error"></i>格式有误').css('color', '#e22');
        } else if (reg_p.test($(this).val())) {
            $(this).removeClass('error');
            phone_msg.html('<i class="i-ok"></i>');
        }
    });
});