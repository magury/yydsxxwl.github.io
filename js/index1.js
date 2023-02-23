document.addEventListener('contextmenu', function (e) { e.preventDefault(); });//禁用右键
document.addEventListener('selectstart', function (e) { e.preventDefault(); });//禁止选中
{
    let text = 'search your require';
    let str = ''
    //点击搜索框 放大镜
    $('.search').on({
        click: function () {

            if ($('.topborad ul input[id="text"]').width() > 0)
                return;
            $('input').val(str == '' ? text : str)
            $('.topborad li,.topborad i:last').hide();
            $('.search').css({
                'border-radius': '20px',
                'background-color': 'whitesmoke',
                // 'left': '130px',
                'transform': 'translate(-50px) rotateY(0deg)'
            }).animate({
                left: 340
            }, 500, function () {
                setTimeout(function () {
                    $('.search i').show().removeClass('exit_in').addClass('exit_out')
                    //移动—旋转`         
                }, 500)
            });
            $('.topborad ul input').css('padding-left', '20px').stop().animate({ width: 200 }, 500, function () {
                if (!str == '') {
                    $('.expand').show();
                }
            })
        }
    })
    //收回搜索框
    $('.search i').on('click', function () {
        $('.expand').hide(1);
        $('.search i').removeClass('exit_out').addClass('exit_in');
        setTimeout(function () {
            $('.topborad ul input').val('').css('padding-left', '0').animate({ width: 0 });
            $('.search').animate({ left: 140 }, function () {
                $('.search').css({
                    'border-radius': '2px',
                    'transform': 'translate(-50px) rotateY(180deg)',
                    'background-color': 'transparent'
                });
                $('.search i').css('display', 'none');
                $('.topborad li').fadeIn();

            })
        }.bind(this), 1000);
    })
    //放大文字
    $('input').on({
        blur: function () {
            str == '' ? this.value = text : this.value = str;
            $('.expand').hide();
        },
        focus: function () {

            str == '' ? this.value = '' : this.value = str;
            document.addEventListener('mousedown', function (e) {
                if (e.target !== 'input') {
                    this.blur()
                }//手动焦点 canvas阻止了焦点事件
            }.bind(this))
        },
        keyup: function () {
            str = this.value.trim()
            $('.expand').text(str);
            if (this.value.trim().length > 0) {
                $('.expand').show(1);
            }
            if (this.value.trim().length == 0) {
                $('.expand').hide(1);
            }
        }
    }

    )
}
$('.lookup input').off();
{
    //把td加编号 好赋值
    $('tbody td').each((index, item) => {
        $(item).attr('data_date', index)
    })
    //定义默认的日期，不在刷新里面设置是方便点击事件
    let nowdate = new Date();
    let year = nowdate.getFullYear();
    let month = nowdate.getMonth();
    let month_name = ["January", "Febrary", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"];
    var timer = {
        last_month: month,
        last_year: year
    };
    refreshDate(month, year);
    $('thead td[colspan="7"] em').on('click', function () {

        timer = prev_next_info(timer.last_month, timer.last_year, 'em');
        refreshDate(timer.last_month, timer.last_year);
    });
    $('thead td[colspan="7"] i').on('click', function (e) {
      //  console.log(e.target);
      //  console.log(timer.last_month, timer.last_year);
        timer = prev_next_info(timer.last_month, timer.last_year, 'i');
     //   console.log(timer.last_month, timer.last_year);
        refreshDate(timer.last_month, timer.last_year);
    });
// $('tbody').on('click',function(e){
//    let date=new Date($('thead span').eq(0).attr('data_year'),$('thead span').eq(1).attr('data_month')-1,$(e.target).text());
//   let current_date=new Date();
//   let timer={};
//   timer.mss=date-current_date;
//   timer.days = timer.mss / (1000 * 60 * 60 * 24);
//   timer.hours = (timer.mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
//   timer.minutes = (timer.mss % (1000 * 60 * 60)) / (1000 * 60);
//   timer.seconds = (timer.mss % (1000 * 60)) / 1000;
//   console.log(Math.round(timer.days));
//   $('tbody span').eq(2).text('('+timer.days+'天后)')
// })
}
