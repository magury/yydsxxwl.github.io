//取消事件
function offAction(key, action, child, target) {
    $(key).find(child).off(action);
}
var that = null;

function tabChange(key) {
    $(key).each((index, item) => {
        $(item).on('click', function () {
            $('#tab').children('li').eq(index).show().siblings('li').hide()
        })
    })
}



function alterText(key, action, child, target) {
    let flat = true;
    $(key).find(child).on(action, function () {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        if (flat) {
            flat = false;
            let str = $(this).html().replace(/\s*/g, "");
            let that = this;
            if (target === 'text') { $(this).html('').prepend($('<input type="text"/>')); }
            if (target === 'textarea') { $(this).empty().append($('<textarea>' + str + '</textarea>')); }
            this.children[0].value = str;
            this.children[0].select();
            let lab = $(this).parent().prev()
            console.log(this);
            this.children[0].onblur = function () {
                console.log(1);
                this.value.trim() == '' ? $(that).html(str) : $(that).html(this.value);
                if (lab.parent().parent().index() <= 1) { lab.html(lab.next().find('h4').html()) }

                flat = true;

            };
            this.children[0].onkeyup = function (e) {
                if (e.keyCode === 13) {
                    console.log(1);
                    this.blur();
                }
            }
            this.children[0].oncopy = () => {
                return false;
            }
            this.children[0].onpaste = () => {
                return false
            }
            return false;
        }
    })
}
function alterTextarea(key, action, child) {
    let flat = true;
    $(key).find(child).on(action, function () {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        if (flat) {
            flat = false;
            let str = $(this).html().replace(/\s*/g, "");
            $(this).empty().append($('<textarea>' + str + '</textarea>'));
            this.children[0].value = str;
            this.children[0].select();
            this.children[0].onblur = function () {
                this.value.trim() == '' ? $(this).parent().html(str) : $(this).parent().html(this.value);
                flat = true;
            };
            this.children[0].onkeyup = function (e) {
                e.preventDefault();
                let str = this.value;
                if (e.keyCode === 13) {
                    this.blur();
                }
            }
            this.children[0].oncopy = () => {
                return false;
            }
            this.children[0].onpaste = () => {
                return false
            }
            return false;
        }
    })
}
var cleanfloat = '<ul class="cleanfloat"> <li>&#9733;</li><li>&#9733;</li> <li>&#9733;</li><li>&#9733;</li><li>&#9733;</li>  </ul>';
function option_slide() {
    $('.option_video').eq(($(this).index())).fadeIn('slow').siblings('.option_video').hide();
}
function addAngle(key, num, child) {
    $(key).eq(num).find(child).each((index, item) => {
        let ul = $(cleanfloat);
        let str = $(item).html().split(':');
        str[0] = str[0] + ':';
        let span = $('<span>' + str[0] + '</span>');
        $(item).html('');
        $(item).prepend(span);
        $(item).append(ul);
        let Starlength = str[1].replace(/\s*/g, "").length;
        let LIlength = $(item).children('ul').find('li').length;
        // for (var i = 0; i < 5 - Starlength; i++) {
        //     if (Starlength !== LIlength) { $(item).children('ul').find('li').eq(0).remove(); }
        // }

    })
}
function Remark(key, action, number, child) {
    if (child) {

        $(key).on(action, child, function () {
            let start_number = $(this).find('.cs').length;
            let span = $(this).children('span');
            let BeforeClickStarAmount = $(this).find('.cs').length;
            $(this).html(cleanfloat);
            $(this).children(0).addClass('change');
            $(this).find('li').css('font-size', '30px');
            $(this).find('li').css('line-height', '30px');
            //默认五角星被点击的状态
            $(this).find('.cleanfloat').find('li').eq(BeforeClickStarAmount === 5 ? BeforeClickStarAmount - 1 : BeforeClickStarAmount).prevAll('li').addClass('cs');
            BeforeClickStarAmount === 5 && $(this).find('.cleanfloat').find('li').eq(BeforeClickStarAmount - 1).addClass('cs');
            $(this).find('li').click(function () {
                $(this).addClass('cs');
                $(this).prevAll().addClass('cs');
                $(this).nextAll().removeClass('cs');
            });
            $(this).find('li').hover(function () {
                $(this).addClass('hs');
                $(this).prevAll().addClass('hs');
            }, function () {
                $(this).removeClass('hs');
                $(this).prevAll().removeClass('hs');
            });
            $(document).on('mousedown', function (e) {
                if (!(($(e.target).is('.cleanfloat') && $(e.target).prop("nodeName") === "UL") || ($(e.target).is('.hs') && $(e.target).prop("nodeName") === "LI"))) {
                    if (number === 3) { $(this).css('transform', 'translate(-10%, -5%)'); }//文字多咯、不匹配
                    $(document).off('mousedown');
                    $(this).before(span);
                    $(this).children('li').unbind('mouseenter').unbind('mouseleave');
                    offAction(this, 'click', 'li');
                    $(this).find('li').prop('style', '');
                    $(this).removeClass('change');
                    that = this;
                    let end_number = $(this).find('.cs').length;
                    if (start_number == end_number) {
                        return;
                    }
                    SlideCard($(that).parent().parent().parent());
                    //    setTimeout(function(){
                    //     $(that).parent().parent().parent().fadeIn('slow');
                    //    },800)
                }
                return false;
            }.bind(this.children[0]))
        })
    }
}
function randomStar(key, status, child) {
    switch (status) {
        case 1: $(key).eq(status).find(child).each((index, item) => {
            let number = Math.floor(Math.random() * (3 - 1 + 1) + 1);
            $(item).find('li').eq(number).addClass('cs');
            $(item).attr('data_index', ++number).find('li').eq((number)).prevAll('li').addClass('cs');

        });
            Sort(key, status, '.pic')
            break;
        case 3:
            $(key).eq(status).find(child).each((index, item) => {
                let number = Math.floor(Math.random() * (3 - 1 + 1) + 2);
                $(item).find('li').eq(number).addClass('cs');
                $(item).find('li').eq((number)).prevAll('li').addClass('cs');
                $(item).attr('data_index', ++number)
            });
            Sort(key, status, '.pic')
            break;
        case 5:
            $(key).eq(status).find(child).each((index, item) => {
                let number = 4;
                $(item).find('li').eq(number).addClass('cs');
                $(item).find('li').eq((number)).prevAll('li').addClass('cs');
                $(item).attr('data_index', ++number)
            });
            Sort(key, status, '.pic')
            break;
    }
}
function Sort(key, number, find) {
    let pics = $(key).eq(number).find(find);
    $(key).eq(number).find(find).detach()
    pics.sort(function (a, b) {
        let n1 = parseInt($(a).find('.intro').find('.cleanfloat').find('.cs').length);
        let n2 = parseInt($(b).find('.intro').find('.cleanfloat').find('.cs').length);
        return n1 - n2;
    })
    pics.detach().appendTo('#tab>li:eq(' + number + ')>section');
}
function SlideCard(that) {
    // that是pic
    // console.log($(that).index());
    // $(that).fadeOut('slow');
    if ($(that).index() == 0 && $(that).find('.cs').length <= $(that).next().find('.cs').length) {

        return;
    }
    if ($(that).index() == 8 && $(that).find('.cs').length >= $(that).prev().find('.cs').length) {
        return;
    }
    //能执行到这儿 说明不是0 不是8

    //1.检测需不需要移动

    if ($(that).find('.cs').length <= $(that).next().find('.cs').length && $(that).find('.cs').length >= $(that).prev().find('.cs').length) {
        // console.log(1);
        return;
    }
    //2.排除完不需要移动的情况后。现在写移动的方法
    //如果最大 直接跳过到第九个
    if ($(that).find('.cs').length >= $(that).parent().children('.pic').eq(8).find('.cs').length) {
        // console.log(1);
        return $(that).parent().append($(that).remove());

    }
    //如果最小 直接跳过到第一个
    if ($(that).find('.cs').length <= $(that).parent().children('.pic').eq(0).find('.cs').length) {
        // console.log(2);
        return $(that).parent().prepend($(that).remove());
    }
    //剩下的都是有范围的
    var arr = Array.from($(that).parent().children('.pic')).filter(function (value, index) {
        return $(value).find('.cs').length > $(that).find('.cs').length;
    })
    // console.log($(arr[0]).index());
    $(that).parent().children('.pic').eq($(arr[0]).index()).before($(that).remove());
    //    $(arr[0]).before($("<a>jfladsijfkldsfjkldsjfkladsf</a>"));
    /* let father = $(that).parent().parent().parent();
    let section = $(that).parent().parent().parent().parent()
    $(father).hide('slow', function () {
           let cl=    $(father).remove();
        console.log($(that).parent().parent().parent().parent());
        section.prepend($(cl));
        $(father).parent().children('.pic').eq(0).show('slow')
        let arr = $(father).parent().children('.pic').eq(0).siblings('.pic');
        if ($(arr.eq(0).prev()[0]).find('.cs').length <= $(arr.eq(0)[0]).find('.cs').length) {
            return;
        }
        for (var i = 0; i < 8; i++) {
            if ($(arr.eq(0).prev()[0]).find('.cs').length > $(arr.eq(i)[0]).find('.cs').length) {
                console.log($(father).html());
                $(father).hide('fast', function () {
                    $(arr.eq(i)[0]).after($(father).remove());
                   section.children('.pic').show();
                })
            }
            else { break; };
            $(father).hide('slow', function () {
                $(arr.eq(i)[0]).after($(father).remove());
               section.children('.pic').show('slow');
 
            })
        }
    }) */
}

function tabanimate1(obj, target, that, callback) {
    $(that).addClass('current')
    callback = function () {
        // console.log(1);
        that.angle = -180;
        that.timer = setInterval(function () {
            let step = (0 - that.angle) / 8;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (that.angle == 0) {
                clearInterval(that.timer);
            }
            that.angle = that.angle + step;
            that.style.transform = 'rotateX(' + that.angle + 'deg)';
        }, 50)
    }
    //obj current   target -90
    $(obj).removeClass('current')
    clearInterval(obj.timer);
    obj.angle = 0;
    obj.timer = setInterval(() => {
        let step = (target - obj.angle) / 5;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.angle == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.angle = obj.angle + step;
        obj.style.transform = 'rotateX(' + obj.angle + 'deg)';
    }, 5);
}

function rotate(obj, startangle, targetangle, callback) {
    clearInterval(obj.timer);
    obj.angle = startangle;
    obj.timer = setInterval(function () {
        let step = (targetangle - obj.angle) / 2;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.angle == targetangle) {
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.angle = obj.angle + step
        obj.style.transform = 'translate(82px) rotate(' + obj.angle + 'deg)';
    }, 50)
}
function move(obj, startangle, targetangle, callback) {
    callback = function () { return Math.ceil(obj.step / 1.1) }
    clearInterval(obj.timer);
    obj.step = 0;
    obj.angle = startangle;
    obj.timer = setInterval(function () {
        let step = (targetangle - obj.angle) / 5;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.angle == targetangle) {
            clearInterval(obj.timer);

            callback && callback();

        }
        obj.angle = obj.angle + step
        obj.step = obj.step + Math.abs(step)
        console.log(obj.step);
        obj.style.transform = 'translate(' + Math.ceil(obj.step / 1.1) + 'px' + ') rotate(' + obj.angle + 'deg)';
    }, 40)

}
//获取某年某月第一天是星期几
function dayStart(month, year) {
    var tmpDate = new Date(year, month, 1);
    return (tmpDate.getDay());
}
//计算某年是不是闰年，通过求年份除以4的余数即可
function daysMonth(month, year) {
    let month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        return (month_olympic[month]);
    } else {
        return (month_normal[month]);
    }
}
//刷新日历
function refreshDate(month, year) {
    //日期
    let firstday = dayStart(month, year);
    let daycount = daysMonth(month);
    $('  td[colspan="7"] span').eq(0).text(year).attr('data_year', year);//thead
    $('  td[colspan="7"] span').eq(1).text(month + 1).attr('data_month', month + 1);//thead
    //填充日期
    for (var i = firstday; i < daycount + firstday; i++) {
        $('td[data_date=' + i + ']').text(i - firstday + 1).css('color', 'rgb(78, 84, 84)');
    }
    //填充其他日期
    nextMonth(month, year, i);
    prevmonth(month, year);
    position_current_date();
}
function nextMonth(month, year, daycount) {
    var number = 1;
    $('tbody td').each((index, item) => {
        if (index >= daycount) {
            $(item).text(number++)
        }
    })

}
//填充上一个月的日期残余
function prevmonth(month, year) {
    var timer = prev_next_info(month, year, 'em');
    var last_day_amount = daysMonth(timer.last_month, timer.last_year);
    var current_day_id = dayStart(month, year);
    for (var i = current_day_id - 1; i >= 0; i--) {
        $('td[data_date=' + i + ']').text(last_day_amount--);
    }
}
function prev_next_info(month, year, status) {
    var last_month = month;
    var last_year = year;
    if (status == 'em') {
        if (month === 0) {
            last_year--;
            last_month = 11;
        }
        else {
            last_month--;
        }
    }
    if (status == 'i') {
        if (month === 11) {
            last_year++;
            last_month = 0;
        }
        else {
            last_month++;
        }
    }

    return {
        last_year, last_month
    };
};
function position_current_date() {
    var date = new Date();
    // console.log(date.getDate());
    $('tbody td').css('background', 'none');
    for (var i = 0; i <= 41; i++) {
        // console.log($('tbody td').eq(i).text());
        if ($('tbody td').eq(i).text() == date.getDate() && $('thead span').eq(0).attr('data_year') == date.getFullYear() && $('thead span').eq(1).attr('data_month') == date.getMonth() + 1) {
            $('tbody td').eq(i).css('background', 'red');
            $('tbody td').eq(i).css('color', 'white');
            break;
        }

    }
}
const star1 = '★';
const star3 = '★★★';
const star5 = '★★★★★★';
const sp = $('<span>烂片指数:</span>');



