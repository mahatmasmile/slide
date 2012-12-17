/*jquery-slide-generate-plugin Author:Michael_AS https://github.com/wsy07280012/MAS.GitHub */
$.fn.slide = function(data) {
    var left = 0,
    pn = 2,
    target = '_self',
    width, height, pc, si, signW, signH, fontSize, interval;

    width = data.width;
    height = data.height;
    pc = data.pc;
    interval = data.second * 1000;
    signW = width / pc;
    signH = height / 13;
    fontSize = height / 37;
    if (signH < 12) signH = 12;
    if (data.target != null && data.target != "") target = '_' + data.target;
    //generate code start
    //generate style
    var slideboxstyle = 'margin:0 auto;width:' + width + 'px;height:' + height + 'px;overflow:hidden;position:relative;'; //overflow:hidden;
    var picboxstyle = 'list-style:none;padding:0;margin:0;width:' + width * pc + 'px;height:' + height + 'px;position:relative;float:left;';
    var picboxlistyle = 'list-style:none;padding:0;margin:0;float:left;display:inline-block;width:' + width + 'px;height:' + height + 'px;';
    var picboxastyle = 'width:' + width + 'px;height:' + height + 'px;';
    var signboxstyle = 'list-style:none;padding:0;margin:0;float:left;position:relative;top:-' + signH + 'px;width:' + width + 'px;height:' + signH + 'px';
    var signboxlistyle = 'list-style:none;padding:0;margin:0;float:left;width:' + signW + 'px;height:' + signH + 'px;line-height:' + signH + 'px;text-align:center;';
    var astyle = 'width:' + signW + 'px;height:' + signH + 'px;position:relative;top:0;display:block;color:white;font-size:' + fontSize + 'px;text-decoration:none;filter:alpha(Opacity=70);-moz-opacity:0.7;opacity:0.7;background-color:#000;';
    var ahoverstyle = 'background-color:#600;filter:alpha(Opacity=70);-moz-opacity:0.7;opacity:0.7;width:' + signW + 'px;height:' + signH + 'px;position:relative;top:0px;display:block;color:white;font-size:' + fontSize + 'px;text-decoration:none;';

    //generate pic
    $(this).attr({
        'style': slideboxstyle
    });
    $(this).append($('<ul></ul>').attr({
        'id': $(this).attr('id') + '_pic_box',
        'style': picboxstyle
    }));
    for (var i = 1; i <= pc; i++) {
        var url = data.urls['u' + i];
        var picurl = data.picurls['p' + i];
        var picbox = $('#' + $(this).attr('id') + '_pic_box');
        picbox.append($('<li></li>').attr({
            'style': picboxlistyle
        }).html($('<a></a>').attr({
            'href': url,
            'target': target
        }).html($('<img />').attr({
            'width': width,
            'height': height,
            'src': picurl,
            'style': picboxastyle
        }))));
    }
    $(this).append($('<ul></ul>').attr({
        'id': $(this).attr('id') + 'sign_box',
        'style': signboxstyle
    }));

    //generate bottom
    for (var i = 1; i <= pc; i++) {
        var url = data.urls['u' + i];
        var label = data.labels['l' + i];
        var signbox = $('#' + $(this).attr('id') + 'sign_box');
        signbox.append($('<li></li>').attr({
            'style': signboxlistyle
        }).html($('<a></a>').html(label).attr({
            'tmpid': i,
            'href': url,
            'target': target,
            'style': astyle
        })));

    }

    //generate code end
    signbox.find('li').find('a').bind('mouseover',
    function() {
        $(this).attr({
            'style': ahoverstyle
        });
        clearInterval(si);
        pn = $(this).attr('tmpid');
        left = -(width * (pn - 1));
        picbox.animate({
            'left': left
        }); //slide turn
        signbox.find('li').find('a').css({
            'backgroundColor': '#000'
        });
        signbox.find('li:eq(' + (pn - 1) + ')').find('a').css({
            'backgroundColor': '#600'
        });
        if (pn >= pc) pn = 1;
        else pn++;
        si = setInterval(function() {
            left = -(width * (pn - 1));
            picbox.animate({
                'left': left
            }); //slide turn
            signbox.find('li').find('a').css({
                'backgroundColor': '#000'
            });
            signbox.find('li:eq(' + (pn - 1) + ')').find('a').css({
                'backgroundColor': '#600'
            });
            if (pn >= pc) pn = 1;
            else pn++;
        },
        interval);
    });
    signbox.find('li:eq(0)').find('a').css({
        'backgroundColor': '#600'
    });
    si = setInterval(function() {
        left = -(width * (pn - 1));
        picbox.animate({
            'left': left
        }); //slide turn
        signbox.find('li').find('a').css({
            'backgroundColor': '#000'
        });
        signbox.find('li:eq(' + (pn - 1) + ')').find('a').css({
            'backgroundColor': '#600'
        });
        if (pn >= pc) pn = 1;
        else pn++;
    },
    interval);
};