// document.addEventListener('contextmenu', function (e) { e.preventDefault(); });//禁用右键
// document.addEventListener('selectstart', function (e) { e.preventDefault(); });//禁止选中
//tab切换
tabChange('#exchange li');
var a = 1;
$('.sort_son li').each(function (index, item) {
    $(item).attr('index', index);
    $(item).on('click', option_slide)
});
$('.pic').on('click', function (e) {
    return false;
});
$('.header span').on({
    mouseenter: function () {
        $('em').eq(0).stop().css('transform', 'rotate(90deg)');
        $('.sort_son').fadeIn();
    }
}
);
$('.sort').on('mouseleave', function () {
    $('em').eq(0).stop().css('transform', 'rotate(0deg)');
    $('.sort_son').fadeOut();
})
//修改成text
alterText('.intro', 'dblclick', 'h4', 'text');
//修改成textarea
alterTextarea('#tab .intro', 'dblclick', 'p', 'textarea');
//取消双击事件
offAction('#tab li:eq(1)', 'dblclick', 'h4');
offAction('#tab li:eq(3)', 'dblclick', 'h4');
offAction('#tab li:eq(4)', 'dblclick', 'h4');
offAction('#tab li:eq(5)', 'dblclick', 'h4');
//增加五角星
addAngle('#tab>li', 5, 'h4');
addAngle('#tab>li', 1, 'h4');
addAngle('#tab>li', 3, 'h4');
//评分
Remark('#tab>li:eq(1)', 'dblclick', 1, 'h4');
Remark('#tab>li:eq(3)', 'dblclick', 3, 'h4');
Remark('#tab>li:eq(5)', 'dblclick', 5, 'h4');
$('#tab>li').eq(3).find('span').width('146px');
$('#tab>li').eq(3).find('span').next().css('transform', 'translate(-10%, -5%)');
randomStar('#tab>li', 1, 'ul');
randomStar('#tab>li', 3, 'ul');
randomStar('#tab>li', 5, 'ul');
let s = 0;
//更新排序
setInterval(function () {
    $('#tab>li').eq(3).find('.pic').each(function (index, item) {
        let x = $(item).index() + 1;
        $(item).find('span').html('Top 0' + x + ' | 推荐指数:')
    })
}, 1000)
$('.cloud').off();
var stilcloud = $('.cloud');
var cloud = document.querySelector('.cloud');
var c_nav = document.querySelector('#option_video');
var lis = c_nav.querySelectorAll('li');
// 2. 给所有的小li绑定事件 
// 这个current 做为筋斗云的起始位置
var current = 0;
for (var i = 0; i < lis.length; i++) {
    // (1) 鼠标经过把当前小li 的位置做为目标值
    lis[i].addEventListener('mouseenter', function () {
        //    $(this.parentNode).siblings().children('li').css('background','rgb(224, 217, 217)')
        // $(this).siblings('li').css('background', 'red')
        animate(cloud, this.offsetLeft);
    });
    // (2) 鼠标离开就回到起始的位置 
    lis[i].addEventListener('mouseleave', function () {
        $(this.parentNode).siblings().children('li').css('background', 'none')
        animate(cloud, current);
    });
    // (3) 当我们鼠标点击，就把当前位置做为目标值
    lis[i].addEventListener('click', function () {
        current = this.offsetLeft;
        animate(stilcloud.get(1), current, this);
        $(this).css('color', '#0dff1d').siblings('li').css('color', 'none');

    });
}
{
    // 警告
    $('#feedback').on('click', function () {
        $.sendWarningToTop('暂未开通', 3000, function () {
            console.log('sendWarningToTop closed');
        });
    });
    //页面滚动事件
    $(window).on('scroll', function (e) {
        // console.log(parseFloat(window.pageYOffset));
        if (parseFloat(window.pageYOffset) >= parseFloat($('#app').height())) {

            $('.header').css({
                'position': 'fixed',
                'left': '0',
                'top': '0'
            });
            $('#option_video').css({
                'position': 'fixed',
                // 'left':'0',
                'top': '25px'
            });
            $('.colorbox').css({
                'position': 'fixed',
                'top': '5px',
            });
            $('.ladder_shaped').css({
                'position': 'fixed',
                'top': '20px'
            });
            $('.flexible').css({
                'position': 'fixed',
                'top': '23px'
            })
        }
        else {
            $('.header').css({
                position: 'absolute',
                left: '0',
                top: '610px'
            });
            $('#option_video').css({
                position: 'relative',
                // left:'0',
                top: '0px'
            });
            $('.colorbox').css({
                position: 'relative',

            });
            $('.ladder_shaped').css({
                'position': 'relative',
                'top': '0px'
            });
            $('.flexible').css({
                'position': 'relative',
                'top': '3px'
            })
        }
    });

}
{
    //第二个切换tab的动画
    //ANIMATE
    {
        $('.ladder_shaped>li').on({
            mouseenter: function () {
                $(this).stop().animate({
                    width: 110
                })
            },
            click: function () {
                $(this).addClass('currentladder').siblings('li').stop().animate({
                    width: 60
                }).removeClass('currentladder')
            },
            mouseleave: function () {
                $('.ladder_shaped>li[class="currentladder"]').siblings('li').stop().animate({
                    width: 60
                })
            }
        }

        )
    }
    //change contents
    {
        $('.ladder_shaped>li').on('click', function () {
            let size = $('#tab2>li').width();
            $('#tab2').css({
                top: -200,
                left: -1000
            })
            // let size = parseFloat((document.defaultView.getComputedStyle(document.querySelector('#tab')).width).replace('px', ''))
            // animate(document.querySelector('#tab2'),-$(this).index()*(size+5))
            $('#tab2').animate({
                left: -size * $(this).index(),
                top: 0
            })
        })
    }
}
{
    //最后第二个tab
    $('.flexible').on({
        mouseenter: function () {

            $(this).children('em').stop().animate({
                width: 110
            }, 600, function () {
                $('.flexible>li>em').css({
                    'border-top-left-radius': '6px',
                    'border-top-right-radius': '6px'
                })
            });
            $(this).children('label').stop().animate({
                height: 40
            }, 600, function () {
                $('label').css({
                    'border-top-left-radius': '6px',
                    'border-top-right-radius': '6px'
                })
            }
            )
        },
        mouseleave: function () {
            if ($(this).is('.currentflexible')) { return -1; }

            $(this).children('em').stop().animate({
                width: 0
            });
            $('.flexible label,.flexible em').css({
                'border-top-left-radius': '0px',
                'border-top-right-radius': '0px'
            }, 600)
            $(this).children('label').stop().animate({
                height: 0
            }, 600)
        },
        click: function () {
            $(this).addClass('currentflexible').siblings('li').removeClass('currentflexible').mouseleave();
            $(this).mouseenter();
            if (!$('#tab3>li').eq($(this).index()).is('.current')) { tabanimate1($('#tab3').find('.current')[0], -90, $('#tab3>li').eq($(this).index())[0]) }
            
        }
    }, 'li');
$('.currentflexible').click()
}
{
    //最后一个tab
    $('.strand').on({
        mouseenter: function () {
            $(this).children('.mask').stop().animate({
                height: $(this).height()
            }, 200);
            setInterval(function () {
                if ($(this).children('.mask').height() >= 20) {
                    $(this).css('color', 'white')
                }
            }.bind(this), 0)
            // $(this).css('color','white')
        },
        mouseleave: function () {
            if ($(this).attr('flat') == 'false') { return; }
            $(this).children('.mask').stop().animate({
                height: 0
            }, 400);
            setInterval(function () {
                if ($(this).children('.mask').height() <= 20) {
                    $(this).css('color', 'rgb(155 92 193)')
                }
            }.bind(this))
            // $(this).css('color','rgb(149, 108, 174)')
        },
        click: function () {
            $(this).children('.mask').css('height', $(this).height());
            $(this).attr('flat', 'false').siblings('li').attr('flat', 'yes').mouseleave();
            $('#tab4>li').eq($(this).index()).siblings('li').fadeOut(function () {
                $('#tab4>li').eq($(this).index()).siblings('li').css('display', 'none')
            }.bind(this))
            $('#tab4>li').eq($(this).index()).css({
                width: 0,
                height: 0,
                display: 'block'
            }).animate({
                width: 926,
                height: 500

            }, 1000)
            //    this.flat='false';
        }
    }, 'li');
    $('.strand>li').eq(0).click().mouseenter();
    $('#tab4 .intro').on('dblclick', 'p',function () {
        console.log(1);
        let str = $(this).text().replace(/\s*/g, "");
        let that = $(this).parent()[0];
        $(this).parent().empty().html('<textarea>' + str + '</textarea>');
        that.children[0].select();
        $('#tab4 textarea').on('blur', function () {
            this.value.trim() == '' ? $(this).parent().html('<p>'+str+'</p>') : $(this).parent().html('<p>'+this.value+'</p>');
            
        });
        $('#tab4 textarea').oncopy = () => {
            return false;
        };
        $('#tab4 textarea').onpaste = () => {
            return false
        };
        $('#tab4 textarea').on('keyup',function(e){
            // console.log(this.value);
            e.preventDefault();
            if (e.keyCode === 13) {
                this.blur();
            }
        })
        return false;

    })
}
//轮播图……………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………
{
    console.clear();

    const elPrevButton = document.querySelector('#prev');
    const elNextButton = document.querySelector('#next');
    const flipping = new Flipping();

    const elImages = Array.from(document.querySelectorAll('.ui-big-image'));
    const elThumbnails = Array.from(document.querySelectorAll('.ui-thumbnail'));

    let state = {
        photo: 0
    };

    function send(event) {
        // read cuticle positions
        flipping.read();

        const elActives = document.querySelectorAll('[data-active]');

        Array.from(elActives)
            .forEach(el => el.removeAttribute('data-active'));

        switch (event) {
            case 'PREV':
                state.photo--;
                // Math.max(state.photo - 1, 0);
                break;
            case 'NEXT':
                state.photo++;
                // Math.min(state.photo + 1, elImages.length - 1);
                break;
            default:
                state.photo = +event;
                break;
        }

        var len = elImages.length;
        // Loop Around
        //state.photo = ( ( state.photo % len) + len ) % len;
        state.photo = Math.max(0, Math.min(state.photo, len - 1));

        Array.from(document.querySelectorAll(`[data-key="${state.photo}"]`))
            .forEach(el => {
                el.setAttribute('data-active', true);
            });

        // execute the FLIP animation
        flipping.flip();
    }

    elThumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            send(thumb.dataset.key);
        });
    });

    elPrevButton.addEventListener('click', () => {
        send('PREV');
    });

    elNextButton.addEventListener('click', () => {
        send('NEXT');
    });

    send(0);
}
// 返回主页
$('#backmain').on('click', function () {
    location.assign('index.html');
});
$('.ba p').css('display','none');
$('.ba').on('mouseenter',function(){
    $('.ba p').css('display','none');
   $(this).find('p').css('display','block');
});
$('.ba').on('mouseleave',function(){
    $('.ba p').css('display','none');
   
})