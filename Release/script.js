var reg_gp = /https:\/\/plus\.google\.com(\/u\/\d+)?\/.*\/posts\/.*/;
var reg_pa = /https:\/\/plus\.google\.com(\/u\/\d+)?\/b\/.*?/;
var reg_g = /https:\/\/plus\.google\.com(\/u\/\d+)?\/(\?hl=ja)?$/;
var reg_t = /https:\/\/plus\.google\.com(\/u\/\d+)?\/(stream|hot)(\/.*)?/;
var reg_a = /https:\/\/plus\.google\.com(\/u\/\d+)?\/\d*\/posts\/?/;
var reg_s = /https:\/\/www\.google\.com(\/u\/\d+)?\/(u\/\d+\/)?settings\/?.*\/?$/;
var reg_v = /https:\/\/plus\.google\.com(\/u\/\d+)?\/\?gpinv=.*/;
var reg_n = /https:\/\/plus\.google\.com(\/u\/\d+)?\/s\/.*?/;
var reg_o = /https:\/\/plus\.google\.com(\/u\/\d+)?\/me\/posts\/?/;

//読み込み（指定したURL以外ではロードしない）
var a = location.href;
if(a.match(reg_g) || a.match(reg_gp) || a.match(reg_t) || a.match(reg_s) || a.match(reg_a) || a.match(reg_v) || a.match(reg_n) || a.match(reg_o) || a.match(reg_pa)) {

    //言語設定
    var lang = document.getElementsByTagName("html")[0].lang;
    var TextList = {
        Reply : (function() {
            switch(lang) {
                case "ja":
                    return "返信";
                default:
                    return "Reply";
            }
        })(),
        HatenaID : (function() {
            switch(lang) {
                case "ja":
                    return "はてなID：";
                default:
                    return "Hatena ID : ";
            }
        })(),
        HatenaBookmarks : (function() {
            switch(lang) {
                case "ja":
                    return "B!";
                default:
                    return "B!";
            }
        })(),
        Stream : (function() {
            switch(lang) {
                case "ja":
                    return "ストリームの各ポストに表示する";
                default:
                    return "Show this button";
            }
        })(),
        Aisatsu : (function() {
            switch(lang) {
                case "ja":
                    return "挨拶";
                default:
                    return "Hello";
            }
        })(),
        Dokoina : (function() {
            switch(lang) {
                case "ja":
                    return "どこいな";
                default:
                    return "Dokoina";
            }
        })(),
        Barusu : (function() {
            switch(lang) {
                case "ja":
                    return "バルス";
                default:
                    return "Barusu";
            }
        })(),
        Command : (function() {
            switch(lang) {
                case "ja":
                    return "コマンド";
                default:
                    return "Command";
            }
        })(),
        OpenFullSize : (function() {
            switch(lang) {
                case "ja":
                    return "開く";
                default:
                    return "Open";
            }
        })(),
        DonwloadFullSize : (function() {
            switch(lang) {
                case "ja":
                    return "保存";
                default:
                    return "Download";
            }
        })(),
        ScrollLock : (function() {
            switch(lang) {
                case "ja":
                    return "固定";
                default:
                    return "Lock";
            }
        })(),
        ReplySetting : (function() {
            switch(lang) {
                case "ja":
                    return "返答の設定";
                default:
                    return "Config";
            }
        })(),
        SettingInfo : (function() {
            switch(lang) {
                case "ja":
                    return "Google+ SNS Button で表示させるボタンを選択できます。";
                default:
                    return "You can choose a favorite SNS Button.";
            }
        })()
        /*
         :(function(){
         switch(lang){
         case "ja":
         return "";
         default:
         return "";
         }
         })(),
         */
    }

    //正規表現
    var reg1 = /\/h\d*\//;
    var reg2 = /\/w\d*\//;
    var reg3 = /\/w\d*-h\d*-p\//;
    var reg4 = /<br>/g;
    var reg5 = /<wbr>/g;
    var reg6 = /<a href="/g;
    var reg7 = /" class=".*">/g;
    var reg8 = /<\/a>/g;
    var reg9 = /<b>/g;
    var reg10 = /<\/b>/g;
    var reg11 = /<i>/g;
    var reg12 = /<\/i>/g;
    var reg13 = /<i>/g;
    var reg14 = /<\/i>/g;
    var reg15 = /<span class=".*">編集<\/span>/g;
    var reg_p = /\+/;
    var reg_i = /https:\/\/lh\d*\.googleusercontent.com\/.*\/.*\/.*\/.*\/.*\/.*[^photo.jpg]/;
    var reg_m = /gpme-.*/;
    var reg_e = /.*\.editor/;
    var reg_f = /.*\.f/;
    var reg_r = /\n/g;
    var reg_h = /https?:\/\//;
    var reg_d = /(^.*)[ ]/;
    var reg_u = /update-.*/;
    var reg_b = /\/s\/.*/;
    var reg_ri = /https:\/\/plus\.google\.com(\/u\/\d+)?\/\d+\/posts\/(.+)/;
    var reg_cm = /comment:.*/;
    var reg_bz = /buzz:.*/;
    var reg_id = /https:\/\/plus\.google\.com(\/u\/\d+)?\/(\d+)/;
    //挨拶ボタン：オブジェクト
    var Aisatsu = {
        /*オブジェクト名は頭を大文字 Stoは全て小文字 Str:タイトル Reg:正規表現 Sto:localStorageに使用するname
        :{
        Str:"",
        Reg:/()/,
        Sto:""
        },
        */
        //おはようございます
        Ohayou : {
            Str : "おはようございます",
            Reg : /(おはよう|おはです|おっは[ー〜]|オハヨー|おは(ＹＯ|YO)|あっはよお|おはよ|[起お]きた|おはお|おっはよ|おー?はー?よー?ん|おはろ|はろはろ|おーはー|目が覚めた|めがさめた|おはほむ|おはいお)/,
            Sto : "ohayou"
        },
        //こんにちは
        Konnitiwa : {
            Str : "こんにちは",
            Reg : /([こんにちは]{5})/,
            Sto : "konnitiwa"
        },
        //こんばんは
        Konbanwa : {
            Str : "こんばんは",
            Reg : /([こんばんは]{5}|ばんです|おばんです|[こんばんわ]{5})/,
            Sto : "konbanwa"
        },
        //今から帰ります
        Kaerimasu : {
            Str : "今から帰ります",
            Reg : /((帰|かえ)ります|(帰宅|帰宅)します|かえる|カエル|会社[出で]ます|(帰|かえ)ろう|(帰|かえ)る|(帰|かえ)っちゃう|(仕事|しごと)(オワタ|おわた|[終お]わった))/,
            Sto : "kaerimasu"
        },
        //ただいま帰宅しました
        Tadaima : {
            Str : "ただいま帰宅しました",
            Reg : /(ただいま|帰還|(戻|もど)りました|(帰宅|きたく)|かえりました|(帰|かえ)りました|(帰|かえ)ってきた|(帰|かえ)った|(戻|もど)った|(戻|もど)ってきた|ただい.*|(帰|かえ)ってこれた|(帰|かえ)って[来き]ました|帰社った|家着|たっだいま|(戻|もど)ってきました)/,
            Sto : "tadaima"
        },
        //おやすみなさい
        Oyasuminasai : {
            Str : "おやすみなさい",
            Reg : /([おやすみなさい]{7}|おやす|[寝ね]ます|寝|ｵﾔ.*ｽﾐ|zzz|ねまー|[ね寝]る|[ね寝]っるよ|寝|オヤスミ|お休み)/,
            Sto : "oyasuminasai"
        },
        //いただきます
        Itadakimasu : {
            Str : "いただきます",
            Reg : /(いただきま(〜|ー)?す|頂きます|いただきまーす)/,
            Sto : "itadakimasu"
        },
        //ごはん食べてきます
        Tabetekimasu : {
            Str : "ご飯食べてきます",
            Reg : /((ご飯|飯|ごはん|ディナー|朝食|昼食|ランチ|夕食)[食た]べて[き来]ます|(飯|めし)って[来く]る|(飯|めし)いてくる|(ご飯|ごはん|飯|めし)[行い]ってきます)/,
            Sto : "tabetekimasu"
        },
        //ごはん食べてきました
        Tabetekimashita : {
            Str : "ご飯食べてきました",
            Reg : /((ご飯|飯|ごはん|ディナー|朝食|昼食|ランチ|夕食)[食た]べて[き来]ました|(飯|めし)って[来き](た|ました)|(飯|めし)った)/,
            Sto : "tabetekimashita"
        },
        //うまい
        Umai : {
            Str : "おいしい",
            Reg : /(うまい|おいしい|オイシイ)/,
            Sto : "umai"
        },
        //風呂行ってきます
        FuroShower : {
            Str : "風呂行ってきます",
            Reg : /(風呂|シャワー?)/,
            Sto : "furoshower"
        },
        //あがって来ました
        Agattekimashita : {
            Str : "あがってきました",
            Reg : /([あ上]がってきました|[あ上]がった)/,
            Sto : "agattekimashita"
        },
        //行ってきます
        Ittekimasu : {
            Str : "行ってきます",
            Reg : /([行い]て[き来]..す|[行い]って..す|[行い]って[き来].す|[行い]って[く来]る|[行い]きます|いてきます|[行い]ってきまー?す)/,
            Sto : "ittekimasu"
        },
        //ほかってきます
        Hokattekimasu : {
            Str : "ほかってきます",
            Reg : /(ほかってきます|ほかってくる)/,
            Sto : "hokattekimasu"
        },
        //ほかってきました
        Hokattekimashita : {
            Str : "ほかってきました",
            Reg : /(ほかってきました|ほかった|ほかってきた)/,
            Sto : "hokattekimashita"
        },
        //誕生日の人
        Tanjyobi : {
            Str : "誕生日の人",
            Reg : /(誕生日)/,
            Sto : "tanjyoubi"
        },
        //笑った
        Waratta : {
            Str : "笑った",
            Reg : /(笑った|ワラタ|ワロス|ワロ(タ|ッシュ)|わろた|www+|ｗｗｗ+)/,
            Sto : "waratta"
        },
        //ぬるぽ
        Nurupo : {
            Str : "ぬるぽ",
            Reg : /(ぬるぽ)/,
            Sto : "nurupo"
        },
        //発想
        Hassou : {
            Str : "発想",
            Reg : /(発想|じゃね[？?!！]|だろうか[？?])/,
            Sto : "hassou"
        },
        //キター
        Kita : {
            Str : "キター",
            Reg : /(キター|キタキタ|きたきた)/,
            Sto : "kita"
        },
        //ぎゃああ
        GYAAAA : {
            Str : "ギャアアア",
            Reg : /(ぎゃあ+|うおお+|ギャア+|ぎゃぁ+|ギャァ+)/,
            Sto : "gyaaaa"
        },
        //だったんだよ！
        dattanndayo : {
            Str : "〜だったんだよ！",
            Reg : /(だったんだよ[！!?]+)/,
            Sto : "dattanndayo"
        },
        //地震？
        Jishin : {
            Str : "地震？",
            Reg : /(地震|[揺ゆ]れ(た|てい?る)|どこいな)/,
            Sto : "jishin"
        },
        //眠い
        Nemui : {
            Str : "眠い",
            Reg : /([眠ね]むい)/,
            Sto : "nemui"
        },
        //寒い
        Samui : {
            Str : "寒い",
            Reg : /([寒さ]むい)/,
            Sto : "sugoi"
        },
        //暑い
        Atsui : {
            Str : "暑い",
            Reg : /((暑|あつ)い)/,
            Sto : "atui"
        },
        //頑張ります
        Ganbarimasu : {
            Str : "頑張ります",
            Reg : /(頑張ります|がんばります|がんばる|ガンバル)/,
            Sto : "ganbarimasu"
        },
        //あけおめ
        AkeOme : {
            Str : "あけましておめでとう",
            Reg : /([明あ]けましておめでとう|あけおめ)/,
            Sto : "akeome"
        },
        //メリークリスマス
        MerryChristmas : {
            Str : "メリークリスマス",
            Reg : /(メリークリスマス|めりくり)/,
            Sto : "xmas"
        }
    };

    //挨拶ボタン：オブジェクト：返答メッセージの読み込み
    for(a in Aisatsu ) {
        var b = eval("Aisatsu." + a);
        b.Rep = localStorage.getItem("gpsb.aisatsu." + b.Sto);
    }

    var Buttonlist = {
        //あいさつ
        aisatsu : {
            name : TextList.Aisatsu,
            storagename : "aisatsu",
            class : "gpsb_aisatsu",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : true,
            defaultshowflag_s : "true",
            postshowflag : 0,
            imageshowflag : 0,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    var a = _event.target;
                    var b = 1;
                    for(c in Aisatsu ) {
                        var d = eval("Aisatsu." + c);
                        if(d.Reg.test(_bodytext)) {
                            if(d.Rep) {
                                autopost(a, d.Rep, 0);
                                b = 0;
                            }
                            break
                        }
                    }
                    if(b) {
                        alert("該当する返答メッセージが見つかりませんでした")
                    }

                }, false);
            },
            imagedata : "Aisatsu.png"
        },
        //はてなブックマーク
        HatenaBookmark : {
            name : TextList.HatenaBookmarks,
            storagename : "hatenabookmark",
            class : "gpsb_hatenabookmark",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : true,
            defaultshowflag_s : "true",
            postshowflag : 0,
            imageshowflag : 0,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    if(hatenaid == null || hatenaid == '' || hatenaid == 0) {
                        var a = 'http://b.hatena.ne.jp/entry/s/' + encodeURI(_permlink.replace(reg_h, ""));
                    } else {
                        var a = 'http://b.hatena.ne.jp/' + hatenaid + '/add.confirm?url=' + encodeURI(_permlink);
                    }
                    window.open(a, '', 'width=980,height=720,scrollbars=yes');
                }, false);
            },
            imagedata : "Hatena.png"
        },
        //Delicious
        Delicous : {
            name : "Delicous",
            storagename : "delicious",
            class : "gpsb_delicious",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : true,
            defaultshowflag_s : "true",
            postshowflag : 0,
            imageshowflag : 0,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    window.open('http://www.delicious.com/save?url=' + encodeURIComponent(_permlink) + '&title=' + encodeURIComponent(_auther) + '+-+' + encodeURIComponent('Google+ (' + _time) + '%29&notes=' + encodeURIComponent(_bodytext.substring(0, 1000)) + '&v=6&noui=1&jump=doclose', '', 'width=525,height=590,scrollbars=yes');
                }, false);
            },
            imagedata : "Delicious.png"
        },
        //Twitter
        Twitter : {
            name : "Twitter",
            storagename : "twitter",
            class : "gpsb_twitter",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : true,
            defaultshowflag_s : "true",
            postshowflag : 0,
            imageshowflag : 0,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    var a = _auther + ' - Google+ (' + _time + ') - ';
                    a = a.replace(reg_r, "");
                    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(a) + encodeURIComponent(_bodytext.substring(0, 140 - a.length - 30) + ' ') + '&url=' + encodeURIComponent(_permlink), '', 'width=600,height=340,scrollbars=yes');
                }, false);
            },
            imagedata : "Twitter.png"
        },
        //Evernote
        Evernote : {
            name : "Evernote",
            storagename : "evernote",
            class : "gpsb_evernote",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : true,
            defaultshowflag_s : "true",
            postshowflag : 0,
            imageshowflag : 0,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    try {
                        var a = _event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                    } catch( _error ) {
                    }

                    //選択範囲オブジェクト
                    var b = document.createRange();

                    //両方インストールされている
                    try {
                        if(a.firstChild.className.match(reg_m) && a.firstChild.className == "fp_buttons") {
                            b.setStart(a.firstChild.nextSibling, 0);
                            b.setEnd(a.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling, 0);
                        } else {

                            //G+ meがインストールされているかどうか調べる
                            if(a.className.match(reg_m)) {
                                b.setStart(a.firstChild, 0);
                                b.setEnd(a.firstChild.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling, 0);
                            }

                            //favoがインストールされているかどうか調べる
                            try {
                                if(a.firstChild.className == "fp_buttons") {
                                    b.setStart(a.firstChild.nextSibling, 0);
                                    b.setEnd(a.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling, 0);
                                } else {
                                    b.setStart(a.firstChild, 0);
                                    b.setEnd(a.firstChild.firstChild.nextSibling.firstChild.nextSibling, 0);
                                }
                            } catch( _error ) {
                                console.error("アップデートエレメントの取得に失敗しました(error:018 - " + _error + ")");
                            }

                        }
                    } catch( _error ) {
                        console.error("G+meとFavoの互換性が不安定になっています");
                    }

                    //選択の実行
                    var c = getSelection();
                    c.removeAllRanges();
                    c.addRange(b);

                    //クリップの実行
                    location.href = "javascript:(function()%7BEN_CLIP_HOST='http://www.evernote.com';try%7Bvar%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new%20Date().getTime()/100000);document.getElementsByTagName('head')%5B0%5D.appendChild(x);%7Dcatch(e)%7Blocation.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);%7D%7D)();";

                    //1秒後に選択を消す
                    setTimeout(function() {
                        c.removeAllRanges();
                    }, 2000);
                }, false);
            },
            imagedata : "Evernote.png"
        },
        //Facebook
        Facebook : {
            name : "Facebook",
            storagename : "facebook",
            class : "gpsb_facebook",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : true,
            defaultshowflag_s : "true",
            postshowflag : 0,
            imageshowflag : 0,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    window.open('http://www.facebook.com/sharer/sharer.php?src=bm&v=4&u=' + encodeURIComponent(_permlink) + '&t=' + encodeURIComponent(_auther) + '', '', 'width=626,height=436');
                }, false);
            },
            imagedata : "Facebook.png"
        },
        //Tumblr
        Tumblr : {
            name : "Tumblr",
            storagename : "tumblr",
            class : "gpsb_tumblr",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : true,
            defaultshowflag_s : "true",
            postshowflag : 0,
            imageshowflag : 0,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    window.open('http://www.tumblr.com/share?v=3&u=' + encodeURIComponent(_permlink) + '&t=' + encodeURIComponent(_auther) + '+-+' + encodeURIComponent('Google Plus (' + _time) + '%29&s=' + encodeURIComponent(_bodytext) + '', '', 'width=500,height=450');
                }, false);
            },
            imagedata : "Tumblr.png"
        },
        //ReadItLator
        ReadItLater : {
            name : "Read It Later",
            storagename : "readitLater",
            class : "gpsb_readitlater",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : true,
            defaultshowflag_s : "true",
            postshowflag : 0,
            imageshowflag : 0,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    var a = _event.target;
                    a.removeEventListener("click", arguments.callee);
                    if(a.className == "Read") {
                        return;
                    }
                    a.src = chrome.extension.getURL("button/RTL2.png");
                    a.className = "Read";
                    var b = document.createElement("img");
                    b.src = "http://readitlaterlist.com/v2/r.gif?v=1&h=bf6b&u=" + encodeURIComponent(_permlink) + "&t=" + encodeURIComponent(_auther) + "+-+" + encodeURIComponent("Google+ (" + _time) + "%29&rand=" + Math.random();
                    b.style.display = "none";
                }, false);
            },
            imagedata : "RIL1.png"
        },
        //RTM
        Rtm : {
            name : "Remember The Milk",
            storagename : "rtm",
            class : "gpsb_rtm",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : true,
            defaultshowflag_s : "true",
            postshowflag : 0,
            imageshowflag : 0,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    _time.match(reg_d);
                    window.open('http://www.rememberthemilk.com/services/ext/addtask.rtm?d=' + encodeURIComponent(RegExp.$1) + '&t=' + encodeURIComponent(_bodytext), '', 'width=475,height=260');
                }, false);
            },
            imagedata : "RTM.png"
        },
        //Ripples
        Ripples : {
            name : "Ripples",
            storagename : "ripples",
            class : "gpsb_ripples",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : true,
            defaultshowflag_s : "true",
            postshowflag : 0,
            imageshowflag : 0,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    _permlink.match(reg_ri);
                    window.open('https://plus.google.com/ripples/details?activityid=' + encodeURIComponent(RegExp.$2), '_blank', '');
                }, false);
            },
            imagedata : "Ripples.png"
        },
        //どこいな
        Dokoina : {
            name : TextList.Dokoina,
            storagename : "dokoina",
            class : "gpsb_dokoina",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : false,
            defaultshowflag_s : "false",
            postshowflag : 0,
            imageshowflag : 0,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    autopost(_event.target, "どこいな", 0);
                }, false);
            },
            imagedata : "Dokoina.png"
        },
        //バルス
        Barusu : {
            name : TextList.Barusu,
            storagename : "barusu",
            class : "gpsb_barusu",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : false,
            defaultshowflag_s : "false",
            postshowflag : 0,
            imageshowflag : 0,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    autopost(_event.target, "*バルス！！！！*", 0);
                }, false);
            },
            imagedata : "Barusu.png"
        },
        //コマンドを実行
        Command : {
            name : TextList.Command,
            storagename : "command",
            class : "gpsb_command",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : false,
            defaultshowflag_s : "false",
            postshowflag : 0,
            imageshowflag : 0,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    var a = prompt("コマンドを入力", "");
                    var b = _event.target;
                    try {
                        var c = _event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                        //ポスト全体
                    } catch( _error ) {
                        var c = 0;
                        console.error("ポストエレメントが見つかりませんでした(error: - " + _error + ")");
                    }
                    switch(a) {
                        case "po":
                            function GplusPost(_message) {
                                //SendIdとUserIdの取得
                                var ajax1 = new XMLHttpRequest();
                                ajax1.onreadystatechange = function() {
                                    if(ajax1.readyState == 4 && ajax1.status == 200) {
                                        if(ajax1.responseText.match(/\"(AObGSA.*:\d*)\"/)) {
                                            var sendid = RegExp.$1;
                                            //SendIdの取得
                                            ajax1.responseText.match(/OZ_initData[ ]?=[ ]?\{\"2\":\[\"(\d*)\"/);
                                            var userid = RegExp.$1;
                                            //UserIdの取得

                                            //Google+に一般投稿をする
                                            var ajax2 = new XMLHttpRequest();
                                            ajax2.onreadystatechange = function() {
                                                if(ajax2.readyState == 4 && ajax2.status == 200) {
                                                }
                                            };
                                            //重複を防ぐためのカウント
                                            var gSeq = 0;

                                            //文字列のエンコード
                                            var encStr = function(s) {
                                                return escape(s).replace(/%/g, '');
                                            }
                                            //投稿対象になるエリア
                                            var scopeData = {
                                                aclEntries : [{
                                                    scope : {
                                                        scopeType : 'anyone',
                                                        name : encStr('全員'),
                                                        id : 'anyone',
                                                        me : true,
                                                        requiresKey : false
                                                    },
                                                    role : 20
                                                }, {
                                                    scope : {
                                                        scopeType : 'anyone',
                                                        name : encStr('全員'),
                                                        id : 'anyone',
                                                        me : true,
                                                        requiresKey : false
                                                    },
                                                    role : 60
                                                }]
                                            };

                                            //投稿内容
                                            var spar = [encodeURIComponent(_message), 'oz:' + userid + '.' + new Date().getTime().toString(16) + '.' + (function() {
                                                return gSeq++
                                            })(), null, null, null, null, '[]', null, JSON.stringify(scopeData), true, [], false, false, null, [], false, false];

                                            ajax2.open('POST', "https://plus.google.com/_/sharebox/post/?spam=20&_reqid=" + (function() {
                                                //_reqidは7桁のランダム数
                                                var a = String(Math.floor(Math.random(9999999) * 1000000));
                                                while(a.length < 7) {
                                                    a = "0" + a;
                                                }
                                                return a;
                                            })() + "&rt=j", true);

                                            //投稿用ヘッダの設定
                                            ajax2.setRequestHeader('X-Same-Domain', '1');
                                            ajax2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                                            ajax2.setRequestHeader('Pragma', 'no-cache');
                                            ajax2.setRequestHeader('Cache-Control', 'no-cache');
                                            ajax2.setRequestHeader('Connection', 'keep-alive');

                                            //ポスト
                                            ajax2.send("spar=" + JSON.stringify(spar) + "&at=" + sendid);
                                        }
                                    }
                                };
                                ajax1.open('GET', "https://plus.google.com/", true);
                                ajax1.send();
                            };

                            GplusPost("投稿テスト");
                            break;
                        case "se":
                            var d = document.createRange();
                            d.setStart(c.firstChild, 0);
                            d.setEnd(c.firstChild.firstChild.nextSibling.firstChild.nextSibling, 0);
                            var e = getSelection();
                            e.removeAllRanges();
                            e.addRange(d);
                            break;
                        case "dokoina":
                            autopost(b, "どこいな", 0);
                            break;
                        case "clear":
                            var d = contentpane.getElementsByTagName("div");
                            var e = d.length;
                            for(var f = 0; f < e; f++) {
                                if(d[f].id.match(reg_u)) {
                                    d[f].removeChild(d[f].firstChild);
                                    d[f].style.display = "none";
                                }
                            }

                            break;
                        case "red":
                            c.style.backgroundColor = "red";
                            break;
                        case "black":
                            c.style.backgroundColor = "black";
                            c.style.color = "white";
                            break;
                        case "gbn":
                            document.getElementById("gb").style.display = "none";
                            break;
                        case "":
                            window.alert("見入力です。");
                            break;
                        default:
                            window.alert("無効なコマンドです。");
                            break;
                    }
                }, false);
            },
            imagedata : "Command.png"
        },
        //フルサイズ画像を開く
        OpenFullsizeImage : {
            name : TextList.OpenFullSize,
            storagename : "openfullsizeimage",
            class : "gpsb_fullopen",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : true,
            defaultshowflag_s : "true",
            postshowflag : 0,
            imageshowflag : 1,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    var a = _imageurl.length;
                    for(var b = 0; b < a; b++) {
                        window.open(_imageurl[b], '', 'width=' + (screen.width / 2) + ',height=' + (screen.width / 2.66666) + ',scrollbars=yes');
                    }
                }, false);
            },
            imagedata : "FullSizeImgOpen.png"
        },
        //フルサイズ画像をダウンロード
        DownloadFullsizeImage : {
            name : TextList.DonwloadFullSize,
            storagename : "downloadfullsizeimage",
            class : "gpsb_fulldown",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : true,
            defaultshowflag_s : "true",
            postshowflag : 0,
            imageshowflag : 1,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    var a = _imageurl_d.length;
                    for(var b = 0; b < a; b++) {
                        window.open(_imageurl_d[b], '', '');
                        window.focus();
                    }
                }, false);
            },
            imagedata : "FullSizeImgDown.png"
        },
        //スクロールを固定
        ScrollLock : {
            name : TextList.ScrollLock,
            storagename : "scrollLock",
            class : "gpsb_scrollllock",
            noconfigflag : 0,
            showflag : 0,
            defaultshowflag_i : false,
            defaultshowflag_s : "false",
            postshowflag : 0,
            imageshowflag : 0,
            event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d) {
                _element.addEventListener("click", function(_event) {
                    var gpsbimid = _event.target;
                    if(gpsbscrolllock_flag == true) {
                        pagelock.end(gpsbimid);
                    } else {
                        //イベントの登録：スクロールを固定：イベント登録
                        pagelock.start(gpsbimid);

                    }
                }, false);
            },
            imagedata : "pin1.png"
        }
        /*****************************************************************************
         {
         name : "",
         storagename : "",
         class : "gpsb_",
         noconfigflag : 0,
         showflag : 0,
         defaultshowflag_i : true,
         defaultshowflag_s : "true",
         postshowflag : 0,
         imageshowflag : 0,
         event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
         _element.addEventListener("click", function(_event){

         }, false);

         },
         imagedata : ""
         }
         ******************************************************************************/
    };
}

//Google+ストリーム：Google+が開かれたとき実行
var a = location.href;
if(a.match(reg_g) || a.match(reg_gp) || a.match(reg_t) || a.match(reg_a) || a.match(reg_v) || a.match(reg_n) || a.match(reg_o) || a.match(reg_pa)) {

    //変数の初期化
    var scrolllockstop = 0;

    function tabfocus() {
        //ストリーム投稿時にTABキー一回だけで投稿できるようにする
        var si = setInterval(function() {
            try {
                contentpane = document.getElementById("contentPane");
                elm = contentpane.firstChild.firstChild.nextSibling.firstChild.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild.firstChild.firstChild
                elm.addEventListener("keydown", function(a) {
                    if(a.keyCode == 9) {
                        setTimeout(function() {
                            try {
                                contentpane.firstChild.firstChild.nextSibling.firstChild.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling.firstChild.firstChild.firstChild.firstChild.focus();
                            } catch(_e) {
                                contentpane.firstChild.firstChild.firstChild.nextSibling.firstChild.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling.firstChild.firstChild.firstChild.firstChild.focus();
                            }
                        }, 50);
                    }
                }, false);
                clearInterval(si);
            } catch(_e) {
            }
        }, 100);
    }

    //新規ページの全てのポストにボタンを追加
    function pageopen() {
        setTimeout(function() {

            //TAB
            tabfocus();

            //全てのポストにSNSボタンを挿入
            var a = contentpane.getElementsByTagName("div");
            var b = a.length;
            for(var c = 0; c < b; c++) {
                if(a[c].id.match(reg_u)) {
                    sbminsert(a[c]);
                    //挿入
                }
            }

            //全てのコメントに返信ボタンを挿入
            try {
                var a = document.getElementsByTagName("button");
                var b = a.length;
                for(var c = 0; c < b; c++) {
                    try {
                        if(a[c].getAttribute("g:entity").match(reg_cm)) {//コメントの+1があるかどうか調べる
                            replyinsert(a[c]);
                            //コメントの+1の親に返信ボタンを挿入する
                        }
                    } catch(_error) {
                    }
                }
            } catch(_error) {
            }
        }, timeout);
    }

    //ページが切り替わったことを通知し、ボタンを表示する
    var PushEnter = {
        Flag : 0,
        Button : function() {
            if(Buttonlist.ScrollLock.showflag) {
                try {
                    pagelock.end(gpsbscrolllock_element);
                } catch( _error ) {
                }
            }
            PushEnter.Flag = 1;
            setTimeout(function() {
                if(PushEnter.Flag) {
                    PushEnter.Flag == 0;
                    pageopen();
                }
            }, 1500);
        },
        Draw : function(_event) {
            if(PushEnter.Flag) {
                if(_event.tagName == "A") {
                    if(_event.href.match(reg_gp)) {
                        PushEnter.Flag = 0;
                        pageopen();
                    }
                } else {
                    try {
                        var a = _event.getElementsByTagName("div");
                        var b = a.length;
                        for(var c = 0; c < b; c++) {
                            if(a[c].id.match(reg_u)) {
                                pageopen();
                                break;
                            }
                        }
                    } catch(_e) {
                    }
                }
            }
        }
    };

    //自動ポスト（ボタン一覧でのみ使用可能）
    function autopost(_element, _text, _flag) {
        scrolllockstop = 1;
        try {
            if(_flag == 0) {
                //通常の実行
                try {
                    //google+snsbutton
                    var a = _element.parentNode.parentNode;
                    var b = _element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                    //ポスト全体
                } catch(_error) {
                    console.error("Google+ SNS Button - Error : ストリームへの返信に失敗しました");
                }
            } else {
                //返信の実行
                try {
                    var b = _element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                    //ポスト全体

                    //google+snsbutton
                    var a = (function(_element) {
                        //対策
                        var a = _element.getElementsByTagName("Button");
                        //
                        var b = a.length;
                        for(var c = 0; c < b; c++) {
                            if(a[c].getAttribute("g:entity").match(reg_bz)) {
                                return a[c];
                            }
                        }
                    })(b);

                } catch(_error) {
                    console.error("Google+ SNS Button - Error : お知らせウィンドウへの返信に失敗しました");
                }

                //返信IDの取得
                var reply = (function(_element) {
                    _element.parentNode.parentNode.previousSibling.firstChild.href.match(reg_id);
                    return RegExp.$2;
                })(_element);

                //返信するユーザー名の取得
                var username = (function(_element) {
                    return _element.parentNode.parentNode.previousSibling.firstChild.innerHTML;
                })(_element);
            }

            //「.editor」要素があるか調べる
            var d = b.getElementsByTagName("div");
            var e = d.length;
            var f = 0;
            for(var g = 0; g < e; g++) {
                if(d[g].id.match(reg_e)) {
                    f = 1;
                }
            }

            if(f == 0) {
                //投稿ボタンが見つかるまで実行
                a = a.parentNode.firstChild;
                while(1) {
                    try {
                        a = a.nextSibling;
                    } catch(_error) {
                        //見つからなかった場合ループを抜ける
                        break;
                    }
                    try {
                        //コメントリンクボタンが見つかるまで繰り返す
                        if(a.getAttribute("role") == "button") {

                            //コメントリンクボタンをクリックする
                            var c = document.createEvent("MouseEvents");
                            c.initEvent("click", true, false);
                            a.dispatchEvent(c);
                            break;
                        }
                    } catch( _error ) {
                    }
                }
            }

            //遅延させる
            setTimeout(function() {

                //「.editor」エレメントを探す
                var d = b.getElementsByTagName("div");
                var e = d.length;
                for(var f = 0; f < e; f++) {

                    //.editorが見つかった
                    if(d[f].id.match(reg_e)) {
                        try {

                            //.editorをクリックする
                            (function(_elm) {
                                var a = document.createEvent("MouseEvents");
                                a.initEvent("click", true, false);
                                _elm.dispatchEvent(a);
                            })(d[f].firstChild);

                        } catch(_error) {
                            console.error("Google+ SNS Button - Error : .editorのフォーカスの取得に失敗しました");
                        }

                        try {
                            if(_flag) {
                                //Firefoxの場合
                                if(navigator.userAgent.indexOf("Firefox") > -1) {
                                    //テキストを入力する(Firefox)
                                    try {
                                        d[f].firstChild.firstChild.firstChild.contentDocument.body.innerHTML = "+" + reply + " <br>";

                                        //入力エリアのアクティベート
                                        var g = document.createEvent("KeyboardEvent");
                                        g.initKeyEvent("keypress", true, true, window, false, false, false, false, 0, 13);
                                        d[f].firstChild.firstChild.firstChild.contentDocument.body.dispatchEvent(g);

                                    } catch(_error) {
                                        console.error("Google+ SNS Button - Error : 返信時の操作に失敗しました");
                                    }
                                    //Chromeの場合
                                } else {
                                    //スペースを挿入
                                    (function() {
                                        var a = document.createTextNode(" ");
                                        d[f].firstChild.firstChild.insertBefore(a, d[f].firstChild.firstChild.firstChild);
                                    })(d[f]); (function() {
                                        var a = document.createElement("button");
                                        a.setAttribute("tabindex", "-1");
                                        a.setAttribute("id", "btnplus" + reply);
                                        a.setAttribute("contenteditable", "false");
                                        a.innerHTML = "+<span style=\"display:none\">" + reply + "</span><style>button#btnplus" + reply + " { white-space: nowrap; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(238, 238, 238); border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(221, 221, 221); border-right-color: rgb(221, 221, 221); border-bottom-color: rgb(221, 221, 221); border-left-color: rgb(221, 221, 221); border-top-left-radius: 2px 2px; border-top-right-radius: 2px 2px; border-bottom-right-radius: 2px 2px; border-bottom-left-radius: 2px 2px; display: inline-block; font: normal normal normal 13px/1.4 Arial, sans-serif; margin-top: 0px; margin-right: 1px; margin-bottom: 0px; margin-left: 1px; padding-top: 0px; padding-right: 1px; padding-bottom: 0px; padding-left: 1px; vertical-align: baseline; color: rgb(51, 102, 204); background-position: initial initial; background-repeat: initial initial; } button#btnplus" + reply + ":after { content:\"" + username + "\" }</style>";
                                        d[f].firstChild.firstChild.insertBefore(a, d[f].firstChild.firstChild.firstChild);
                                    })();
                                }
                            } else {
                                if(navigator.userAgent.indexOf("Firefox") > -1) {
                                    //テキストを入力する(Firefox)
                                    try {
                                        d[f].firstChild.firstChild.firstChild.contentDocument.body.innerHTML = _text + "<br>";

                                        //入力エリアのアクティベート
                                        var g = document.createEvent("KeyboardEvent");
                                        g.initKeyEvent("keypress", true, true, window, false, false, false, false, 0, 13);
                                        d[f].firstChild.firstChild.firstChild.contentDocument.body.dispatchEvent(g);

                                    } catch(_error) {
                                        console.error("Google+ SNS Button - Error : 自動ポストに失敗しました");
                                    }

                                } else {
                                    //テキストを入力する(Chrome)
                                    try {
                                        var g = document.createEvent("TextEvent");
                                        g.initTextEvent('textInput', true, true, null, (function() {
                                            return _text;
                                        })());
                                        d[f].firstChild.firstChild.dispatchEvent(g);

                                        //入力エリアのアクティベート
                                        var g = document.createEvent("KeyboardEvent");
                                        g.initKeyboardEvent("keypress", true, false, window, 13, false, false, false, "", false);
                                        d[f].firstChild.firstChild.dispatchEvent(g);
                                    } catch(_error) {
                                        console.error("Google+ SNS Button - Error : テキストの入力に失敗しました");
                                    }
                                }
                            }
                        } catch( _error ) {
                            console.error("Google+ SNS Button - Error : 自動ポスト中に例外エラーが発生しました");
                        }

                        //投稿ボタンを押す
                        if(_flag == 0) {
                            var c = document.createEvent("MouseEvents");
                            c.initEvent("mousedown", true, true);
                            d[f].nextSibling.dispatchEvent(c);

                            var c = document.createEvent("MouseEvents");
                            c.initEvent("mouseup", true, true);
                            d[f].nextSibling.dispatchEvent(c);
                        }
                        break;
                    }
                }
            }, 150);
            return;
        } catch( _error ) {
            console.error("Google+ SNS Button - Error : 自動ポストで原因不明のエラーが発生しました");
        }
    }

    //スクロール固定
    var pagelock = new Object();

    pagelock.getposty = function() {
        var a = 0;

        //上部バー
        if(window.innerHeight < 523) {
            try {
                a += document.getElementById("gb").parentNode.clientHeight;
            } catch( _error ) {
                console.error("Googleバーの縦サイズの取得に失敗しました(error:007)");
            }
        }

        //検索バー
        if(window.innerHeight < 800) {
            try {
                a += document.getElementById("gb").parentNode.nextSibling.nextSibling.clientHeight;
            } catch( _error ) {
                console.error("検索バーの縦サイズの取得に失敗しました(error:008)");
            }
        }

        //ストリームバー
        try {
            a += (function() {
                var a = contentpane.firstChild.firstChild.clientHeight + 16;
                if(a > 100) {
                    return contentpane.firstChild.firstChild.firstChild.clientHeight + 16;
                } else {
                    return a;
                }
            })();
        } catch( _error ) {
            console.error("ストリームバーの縦サイズの取得に失敗しました(error:009)");
        }

        //共有バー
        try {
            a += contentpane.firstChild.firstChild.nextSibling.clientHeight + 10;

        } catch( _error ) {
            a += contentpane.firstChild.firstChild.firstChild.nextSibling.clientHeight + 10;

        }

        //フォロー追加バー
        try {
            if(contentpane.firstChild.firstChild.nextSibling.nextSibling.firstChild.getAttribute("role") == "button") {
                a += contentpane.firstChild.firstChild.nextSibling.nextSibling.clientHeight + 10;
            }
        } catch( _error ) {
            console.error("フォロー追加バーの縦サイズの取得に失敗しました(error:0017)");
        }

        //全てのサイズ取得
        try {
            return gpsbscrolllock_element.offsetParent.offsetParent.offsetTop + a;
        } catch( _error ) {
            console.error("ストリーム全体の縦の長さを取得できませんでした(error:018 - " + _error + ")");
        }
        return 0;
    }
    //ページロック設定
    pagelock.run = function(_event) {
        var b = _event.target;
        var d = pagelock.getposty();
        //固定要素が指定のオフセットの位置にあるかどうか
        if(window.pageYOffset < d) {
            setTimeout(function() {
                try {
                    if(gpsbscrolllock_count < gpsbscrolllock_length) {
                        if(window.pageYOffset + gpsbscrolllock_smooth[gpsbscrolllock_count] < d) {
                            window.scrollBy(0, gpsbscrolllock_smooth[gpsbscrolllock_count]);
                            gpsbscrolllock_count++;

                            //最終チェック
                            setTimeout(function() {
                                var e = pagelock.getposty();
                                if(window.pageYOffset > e) {
                                    window.scroll(0, e);
                                    gpsbscrolllock_count = 0;
                                }
                            }, 200);
                        } else {
                            window.scroll(0, d);
                            //固定する
                            gpsbscrolllock_count = 0;
                        }
                    } else {
                        if(window.pageYOffset + 5 < d) {
                            window.scrollBy(0, 5);
                            gpsbscrolllock_count++;

                            //最終チェック
                            setTimeout(function() {
                                var e = pagelock.getposty();
                                if(window.pageYOffset > e) {
                                    window.scroll(0, e);
                                    gpsbscrolllock_count = 0;
                                }
                            }, 200);
                        } else {
                            window.scroll(0, d);
                            //固定する
                            gpsbscrolllock_count = 0;
                        }
                    }
                } catch( _error ) {
                    if(window.pageYOffset + 5 < d) {
                        window.scrollBy(0, 5);
                        gpsbscrolllock_count++;

                        //最終チェック
                        setTimeout(function() {
                            var e = pagelock.getposty();
                            if(window.pageYOffset > e) {
                                window.scroll(0, e);
                                gpsbscrolllock_count = 0;
                            }
                        }, 200);
                    } else {
                        window.scroll(0, d);
                        //固定する
                        gpsbscrolllock_count = 0;
                    }
                }
            }, 0);
        }

    }
    //イベント関数
    pagelock.event = function() {
    }

    pagelock.event.scroll = function() {
        pagelock.run(element_pin);
    }

    pagelock.event.dom = function() {
        pagelock.run(element_pin);
    }
    //ページをロックする
    pagelock.start = function(_element) {

        //ページをロックする：イベント読み込み
        element_pin = _element;
        contentpane.addEventListener('DOMNodeInserted', pagelock.event.dom, false);
        window.addEventListener('scroll', pagelock.event.scroll, false);
        gpsbscrolllock_flag = true;
        _element.src = chrome.extension.getURL("button/pin2.png");
        _element.classList.add('gpsbtoggle');
        gpsbscrolllock_element = _element;
        pagelock.run(_element);
    }
    //ページのロックを解除する
    pagelock.end = function(_element) {
        element_pin = 0;
        gpsbscrolllock_flag = false;
        gpsbscrolllock_element = 0;
        gpsbscrolllock_count = 0;
        var gpsbi = document.getElementsByTagName('img');
        var gpsbl = gpsbi.length;
        for(var gpsbc = 0; gpsbc < gpsbl; gpsbc++) {
            if(gpsbi[gpsbc].classList.contains('gpsbtoggle')) {
                gpsbi[gpsbc].src = chrome.extension.getURL("button/pin1.png");
                gpsbi[gpsbc].classList.remove('gpsbtoggle');
            }
        }
        _element.src = '' + chrome.extension.getURL("button/pin1.png") + '';

        //イベントの登録：スクロールを固定：イベント読み込みを解除
        contentpane.removeEventListener('DOMNodeInserted', pagelock.event.dom);
        window.removeEventListener('scroll', pagelock.event.scroll);
    }
    //コメントリプライボタンの挿入
    function replyinsert(_commentplusone) {
        var a = _commentplusone.parentNode;
        var b = a.getElementsByTagName("span");
        var c = b.length;
        for(var d = 0; d < c; d++) {
            if(b[d].className == "gpsb_reply") {
                return;
            }
        }
        var d = document.createElement("span");
        d.className = "gpsb_reply";
        d.innerHTML = "&nbsp;&nbsp;-&nbsp;&nbsp;<a>" + TextList.Reply + "</a>";
        a.appendChild(d);
        d.getElementsByTagName("a")[0].addEventListener("click", function(e) {
            autopost(_commentplusone, "test", 1);
        }, false);
    }

    //返信ボタンの挿入(通知ボタン)
    function replyinsert_notify(_widget) {
        try {
            //実行
            var a = _widget;
            var b = a.getElementsByTagName("button");
            var c = b.length;
            for(var d = 0; d < c; d++) {
                try {
                    if(b[d].getAttribute("g:entity").match(reg_cm)) {//コメントの+1があるかどうか調べる
                        replyinsert(b[d]);
                        //コメントの+1の親に返信ボタンを挿入する
                    }
                } catch(_error) {
                }
            }
        } catch(_error) {
            console.error("Google+ SNS Button - Error : 返信ボタンの要素が見つかりませんでした");
        }
    }

    //SNSボタンの挿入
    function sbminsert(_post) {

        var element_update = _post.firstChild;

        //G+meがインストールされているかどうか調べる
        try {

            if(_post.firstChild.className.match(reg_m)) {
                var element_update = _post.firstChild.nextSibling.firstChild.nextSibling.nextSibling;
            }
        } catch( _error ) {
            console.error("アップデートエレメントの取得に失敗しました(error:017 - " + _error + ")");
        }

        //favoがインストールされているかどうか調べる
        try {
            if(_post.firstChild.className == "fp_buttons") {
                var element_update = _post.firstChild.nextSibling;
            }
        } catch( _error ) {
            console.error("アップデートエレメントの取得に失敗しました(error:017 - " + _error + ")");
        }

        //両方インストールされている
        try {
            if(_post.firstChild.nextSibling.className.match(reg_m) && _post.firstChild.className == "fp_buttons") {
                var element_update = _post.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling;
            }
        } catch( _error ) {
        }

        //すでにボタンが追加されているかどうか調べる
        var d = element_update.getElementsByTagName("span");
        //spanタグを探す
        var e = d.length;
        for(var f = 0; f < e; f++) {
            //GooglePlusSNSButtonがすでに存在していた場合はBreak
            if(d[f].classList.contains("googleplussnsbutton")) {
                return;
            }
        }

        //投稿時間の取得
        try {
            var time = element_update.firstChild.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling.firstChild.title;
        } catch( _error ) {
            var time = "";
            console.error("投稿時間を取得することが出来ませんでした。“_post”が正しくない可能性があります。(error:005 - " + _error + ")");
        }

        //パーマリンクの取得
        try {
            var permlink = element_update.firstChild.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling.firstChild.href;
        } catch( _error ) {
            var permlink = "";
            console.error("パーマリンクを取得することが出来ませんでした。“_post”が正しくない可能性があります。(error:006)");
        }

        //投稿者名の取得
        try {
            var auther = element_update.firstChild.firstChild.nextSibling.nextSibling.nextSibling.firstChild.firstChild.innerHTML;
        } catch( _error ) {
            var auther = "";
            console.error("投稿者名を取得することが出来ませんでした。“_post”が正しくない可能性があります。(error:003)");
        }

        //本文の取得
        try {
            var bodytext = element_update.firstChild.nextSibling.firstChild.firstChild.firstChild.innerHTML;
            bodytext = bodytext.replace(reg4, "\n");
            bodytext = bodytext.replace(reg5, "");
            bodytext = bodytext.replace(reg6, "");
            bodytext = bodytext.replace(reg7, "");
            bodytext = bodytext.replace(reg8, "");
            bodytext = bodytext.replace(reg9, "");
            bodytext = bodytext.replace(reg10, "");
            bodytext = bodytext.replace(reg11, "");
            bodytext = bodytext.replace(reg12, "");
            bodytext = bodytext.replace(reg13, "");
            bodytext = bodytext.replace(reg14, "");
            bodytext = bodytext.replace(reg15, "");
        } catch( _error ) {
            var bodytext = "";
        }

        //SNSボタンの挿入
        var imgstyle = 'style="padding-left:2px;margin-top:0px;cursor: pointer;display: inline;overflow: hidden;vertical-align: top;"';

        //フルサイズ画像URLの取得
        var a = _post.getElementsByTagName("img");
        //img要素の取得
        var b = a.length;

        //フルサイズ画像URLの取得：変数の初期化
        var c = 0;
        var imageurl = new Array();
        var imageurl_d = new Array();
        imageurl[0] = 0;
        for(var e = 0; e < b; e++) {

            //フルサイズ画像URLの取得：URLの取得
            if(a[e].src.match(reg_i)) {
                imageurl[c] = a[e].src;
                imageurl_d[c] = imageurl[c].replace(reg1, "/d/");
                imageurl_d[c] = imageurl_d[c].replace(reg2, "/d/");
                imageurl_d[c] = imageurl_d[c].replace(reg3, "/d/");
                imageurl[c] = imageurl[c].replace(reg1, "/");
                imageurl[c] = imageurl[c].replace(reg2, "/");
                imageurl[c] = imageurl[c].replace(reg3, "/");
                c++;
            }
        }

        //+1ボタンが含まれているエレメント
        var a = element_update.firstChild.nextSibling.firstChild.nextSibling;
        a.style.whiteSpace = "nowrap";
        var d = document.createElement("span");
        //ボタンエレメントの作成
        d.className = "googleplussnsbutton";

        try {
            //+1ボタンのエレメント
            var c = element_update.firstChild.nextSibling.firstChild.nextSibling.firstChild;
        } catch( _error ) {
            console.error("+1ボタンの取得に失敗しました(error:016)");
        }
        try {
            //+1ボタンの配置の設定（.nextSibling）
            if(c.nextSibling.match(reg_p)) {
                //a.appendChild(d);
                a.insertBefore(d, c.nextSibling.nextSibling.nextSibling);
            } else {
                a.appendChild(d);
                //a.insertBefore(d, c.nextSibling.nextSibling);
            }
        } catch(h) {
            try {
                a.appendChild(d);
                //a.insertBefore(d, c.nextSibling.nextSibling);
            } catch( _error ) {
                console.error("+1ボタンの挿入に失敗しました(error:015)");
            }
        }

        //ボタンの追加：★

        //オブジェクト
        (function(_d, _imgstyle) {
            var a = 0;
            for(b in Buttonlist ) {
                var c = eval("Buttonlist." + b);
                if(c.showflag) {
                    if(c.postshowflag == 1) {
                        if(imageurl != 0) {
                            continue;
                        }
                    }
                    if(c.imageshowflag == 1) {
                        if(imageurl == 0) {
                            continue;
                        }
                    }

                    //画像ボタンの挿入
                    /*
                    _d.innerHTML+='<a class="'+c.class+'"><img src="'+chrome.extension.getURL('button/'+c.imagedata)+'" title="'+c.name+'" '+_imgstyle+' /></a>';
                    */

                    //セパレータ
                    _d.innerHTML += '&nbsp;&nbsp;-&nbsp;&nbsp;';

                    _d.innerHTML += '<a class="' + c.class + '"><span>' + c.name + '</span></a>';
                    a = 1;

                }
            }
            //セパレータ
            if(a == 1) {
                //d.innerHTML +='&nbsp;&nbsp;-&nbsp;&nbsp;';
            }
        })(d, imgstyle);

        //イベントの登録★
        var j = d.getElementsByTagName("a");
        var k = j.length;
        for(var l = 0; l < k; l++) {
            //イベントの登録：オブジェクト
            (function() {
                for(a in Buttonlist ) {
                    var b = eval("Buttonlist." + a);
                    if(j[l].classList.contains(b.class)) {
                        b.event(j[l], bodytext, permlink, auther, time, imageurl, imageurl_d);
                    }
                }
            })();
        }
        return;
    }

    //設定を取得(showservices_**)★
    if(localStorage.getItem("gpsb.initialization") == "true") {
        var hatenaid = localStorage.getItem("gpsb.hatenaid"); (function() {
            for(a in Buttonlist ) {
                var b = eval("Buttonlist." + a);
                b.showflag = localStorage.getItem("gpsb.button." + b.storagename) == "true";
            }
        })();

    } else {
        //初めての使用★
        localStorage.setItem("gpsb.initialization", "true");
        var hatenaid = ""; (function() {
            for(a in Buttonlist ) {
                var b = eval("Buttonlist." + a);
                if(b.noconfigflag == 0) {
                    b.showflag = b.defaultshowflag_i;
                }
            }
        })();
        localStorage.setItem("gpsb.hatenaid", "");

        //オブジェクト
        (function() {
            for(a in Buttonlist ) {
                var b = eval("Buttonlist." + a);
                if(b.noconfigflag == 0) {
                    localStorage.setItem("gpsb.button." + b.storagename, b.defaultshowflag_s);
                }
            }
        })();
        alert("Google+ SNS Button をインストール頂きありがとうございます。\nアカウント設定画面にてボタンの表示非表示を切り替えることができます。");
    }

    //変数の定義
    var contentpane = document.getElementById("contentPane");
    var notify = document.getElementById("notify-widget-pane");
    var timeout = 0;
    var gpsbscrolllock_element = 0;
    var gpsbscrolllock_flag = false;
    var gpsbscrolllock_count = 0;
    var gpsbscrolllock_smooth = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5];
    var gpsbscrolllock_length = gpsbscrolllock_smooth.length;
    var element_pin;
    var oldyoffset;

    //個別ページではない場合
    if(!location.href.match(reg_gp)) {

        try {
            //Google+検索が行われた場合実行
            document.getElementById("searchBox").addEventListener('keydown', function(a) {
                if(a.keyCode == 13) {
                    if(Buttonlist.ScrollLock.showflag) {
                        try {
                            pagelock.end(gpsbscrolllock_element);
                        } catch( _error ) {
                        }
                    }
                    PushEnter.Button();
                    setTimeout(function() {
                        if(PushEnter.Flag) {
                            PushEnter.Flag == 0;
                            pageopen();
                        }
                    }, 1500);
                }
            }, false);
        } catch(_error) {
            console.error("Google+ SNS Button - Error : 検索フォームが見つかりません");
        }

        //ボタンがクリックされたら再描画する
        document.addEventListener("click", function(a) {
            var b = a.target;
            if(b.tagName == "A") {
                if(b.href.match(reg_b)) {
                    PushEnter.Button();
                } else if(b.getAttribute("aria-label")) {
                    PushEnter.Button();
                } else if(b.href.match(reg_t)) {
                    PushEnter.Button();
                }
            } else if(b.tagName == "SPAN") {
                if(b.getAttribute("data-tooltip")) {
                    PushEnter.Button();
                }
            } else if(b.tagName == "IMG") {
                if(b.getAttribute("alt") == "google.com") {
                    PushEnter.Button();
                }
            }
        }, false);
        /*
        notify.nextSibling.firstChild.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling
        */
        //通知ウィンドウがクリックされたとき実行
        try {
            var a = notify.nextSibling.firstChild.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.firstChild.firstChild.nextSibling//通知ボタン

            //一度だけ実行
            a.addEventListener("mouseover", function(b) {

                //イベント削除
                a.removeEventListener("mouseover", arguments.callee);

                //遅延させる
                setTimeout(function() {
                    try {

                        //wigetiframeを探す
                        var c = notify.nextSibling.firstChild.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild.firstChild;
                        //iframe
                        var d = c.contentDocument;
                        var widget = d.getElementById("widget");

                        //一度だけイベントを登録する(DOM)
                        widget.addEventListener("DOMNodeInserted", function(_target) {
                            //通知ウィンドウが更新されたとき実行
                            replyinsert_notify(widget);
                        }, false);
                    } catch(_error) {
                        console.error("Google+ SNS Button - Error : 通知ウィンドウのフレーム位置が不正です");
                    }
                }, 4000);
            }, false);
        } catch(_error) {
            console.error("Google+ SNS Button - Error : 通知ボタンの位置が不正です");
        }

        //新しいポストがされたとき通知(DOMNodeInserted)
        contentpane.addEventListener('DOMNodeInserted', function(a) {
            var b = a.target;

            //個別ページではない場合
            if(!location.href.match(reg_gp)) {

                //ボタンが押されているフラグが発生している場合実行しボタンを描画
                PushEnter.Draw(b);

                //スクロール固定ボタンが表示されている場合実行
                if(Buttonlist.ScrollLock.showflag) {
                    if(scrolllockstop == 0) {
                        //コメント入力ボックスが開かれた
                        try {
                            if(b.firstChild.id.match(reg_e)) {
                                var c = b.parentNode.previousSibling.firstChild.nextSibling;
                                //+1ボタンのあるエレメント
                                var d = c.getElementsByTagName("a");
                                //span探す
                                var e = d.length;
                                for(var f = 0; f < e; f++) {
                                    if(d[f].classList.contains("gpsb_scroll")) {
                                        pagelock.start(d[f].firstChild);
                                        //ページロック開始
                                        b.firstChild.nextSibling.addEventListener("mouseup", function() {
                                            pagelock.end(d[f].firstChild);
                                            b.firstChild.nextSibling.removeEventListener("mouseup", arguments.callee);
                                        }, false);
                                        b.firstChild.nextSibling.addEventListener("keydown", function(_key) {
                                            if(_key.keyCode == 13 || _key.keyCode == 32) {
                                                pagelock.end(d[f].firstChild);
                                                b.firstChild.nextSibling.removeEventListener("keydown", arguments.callee);
                                            }
                                        }, false);
                                        b.firstChild.nextSibling.nextSibling.addEventListener("mouseup", function() {
                                            pagelock.end(d[f].firstChild);
                                            b.firstChild.nextSibling.nextSibling.removeEventListener("mouseup", arguments.callee);
                                        }, false);
                                        b.firstChild.nextSibling.nextSibling.addEventListener("keydown", function(_key) {
                                            if(_key.keyCode == 13 || _key.keyCode == 32) {
                                                pagelock.end(d[f].firstChild);
                                                b.firstChild.nextSibling.removeEventListener("keydown", arguments.callee);
                                            }
                                        }, false);
                                        break;
                                    }
                                }
                            }
                        } catch( _error ) {
                        }
                    } else {
                        scrolllockstop = 0;
                    }
                }

                //ストリームが更新されたら挿入 (Be zj)
                try {
                    if(b.id.match(reg_u)) {
                        setTimeout(function() {
                            sbminsert(b);
                            //SNSボタンを挿入
                        }, timeout);
                    }
                } catch( _error ) {
                }

                //新しいコメントが追加されたら挿入
                setTimeout(function() {
                    try {
                        var c = b.getElementsByTagName("button");
                        var d = c.length;
                        for(var e = 0; e < d; e++) {
                            try {
                                if(c[e].getAttribute("g:entity").match(reg_cm)) {//コメントの+1があるかどうか調べる
                                    replyinsert(c[e]);
                                    //コメントの+1の親に返信ボタンを挿入する
                                }
                            } catch(_error) {
                            }
                        }
                    } catch(_error) {
                    }
                }, timeout);
            } else {
                //個別ページ
                setTimeout(function() {
                    try {
                        if(contentpane.firstChild.firstChild.className == b.className) {
                            sbminsert(b.firstChild);
                            //SNSボタンを挿入
                        }
                    } catch( _error ) {
                        console.error("ポストページが見つかりません(error:001)");
                    }
                }, 500);
            }
        }, false);
    }
    pageopen();
    //全ての項目にボタンを追加

    //設定ページを開いたとき実行
} else if(location.href.match(reg_s)) {

    //サービスの追加
    function addservices(_title, _servicesname, _imagedata) {
        var a = '<li style="border-top: 1px solid #CCC;height: 60px;padding: 5px 10px;width: 750px;">' + '<div style="display: inline;float: left;height: 30px;margin: 5px 20px 5px 0;overflow: hidden;white-space: nowrap;width: 200px;">' + '<div style="margin-top: 5px;white-space: nowrap;list-style-type: none;">' + '<img src="' + chrome.extension.getURL('button/' + _imagedata) + '" width="15" height="15" class="a-zb-if" alt=""> ' + _title + '</div>' + '</div>' + '<div style="display: inline;float: left;height: 40px;margin-right: 20px;margin-top: 10px;overflow: hidden;padding: 0 5px 5px 1px;width: 310px;list-style-type: none;">' + '<label>' + '<input type="checkbox" checked="checked" name="' + _servicesname + '"> ' + TextList.Stream + '</label>';
        if(_servicesname == "hatenabookmark") {
            a += '<br>' + TextList.HatenaID + '<input type="text" name="hatenaid">';
        } else if(_servicesname == "aisatsu") {
            a += '<br><button id="gpsb_settingaisatsu">' + TextList.ReplySetting + '</button>';
        }
        a += '</div></li>';
        return a;
    }

    //正規表現
    var reg_f = /-da$/;
    //Google+SNSButton新規に追加されるGoogle + SNS Button の項目（仕様が変更された場合は、他の項目からコピーする。IDは必ずつける）

    try {
        var a = document.body.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild;
        //メニューのエレメント

    } catch( _error ) {
        console.error("メニューエレメントの取得に失敗しました(error:010)");
    }
    //クローンエレメントを作成
    if(a.firstChild.className.match(reg_f)) {
        try {
            var b = a.firstChild.nextSibling.cloneNode(true);
        } catch( _error ) {
            console.error("クローンエレメントの作成に失敗しました(error:011)");
        }
    } else {
        try {
            var b = a.firstChild.cloneNode(true);
        } catch( _error ) {
            console.error("クローンエレメントの作成に失敗しました(error:012)");
        }

    }

    b.firstChild.removeAttribute("href");
    b.firstChild.id = "gpsbsettings";
    b.firstChild.firstChild.style.background = "url(" + chrome.extension.getURL("button/icon.png") + ")  no-repeat 0 0";
    b.firstChild.firstChild.nextSibling.innerHTML = "Google+ SNS Button";

    //クローンエレメントを代入
    a.appendChild(b);

    //項目がクリックされたときのイベント
    b.addEventListener("click", function() {

        //
        var a = document.getElementById("gpsbsettings");

        //フォーカスだった項目を元に戻す
        try {
            var b = document.body.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild.firstChild;
            //メニューのエレメント
        } catch( _error ) {
            console.error("項目がクリックされたときのイベントで本文のエレメントの取得に失敗しました(error:013)");
        }
        var c = b.getElementsByTagName("div");
        var d = c.length;

        //フォーカス項目判定
        for(var e = 0; e < d; e++) {

            //フォーカス項目判定：フォーカス項目のStyleを変更
            if(c[e].className.match(reg_f)) {

                a.style.display = "none";

                //Google+ SNS Button設定項目を選択されたものに置換え
                var b = a.parentNode;
                b.innerHTML = c[e].innerHTML;

                //Google＋ SNS Buttonをフォーカスに設定
                b.firstChild.firstChild.nextSibling.nextSibling.innerHTML = "Google+ SNS Button";
                b.firstChild.firstChild.style.background = "url(" + chrome.extension.getURL("button/icon.png") + ")  no-repeat 0 0";
                b.firstChild.style.color = "white";
                b.firstChild.style.fontWeight = "bold";
                b.firstChild.removeAttribute("href");
                b.firstChild.id = "gpsbsettings";
                b.firstChild.firstChild.nextSibling.style.display = "inherit";
                b.style.backgroundColor = "#36F";
                b.style.display = "inherit";

                //フォーカスだった項目からフォーカスを解除
                c[e].style.backgroundColor = "white";
                c[e].firstChild.style.color = "#36C";
                c[e].firstChild.style.fontWeight = "normal";
                c[e].firstChild.firstChild.nextSibling.style.display = "none";

                break;
            }
        }

        //本文の挿入
        try {
            var f = document.body.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild.nextSibling.firstChild;
        } catch( _error ) {
            console.error("本文のエレメントの取得に失敗しました(error:014)");
        }
        f.innerHTML = '' + '<div>' + '<div style="margin-bottom: 25px;">' + '<div style="float: left;height: 17px;margin: 5px 0 5px 3px;width: 17px;background-position: 0 -102px;background-image: url(' + chrome.extension.getURL('button/icon.png') + ');"></div>' + '<span style="font-size: 17pt;margin-left: 8px;">Google+ SNS Button</span>' + '</div>' + '<div style="margin-top: 10px;">' + '<span style="font-weight: bold;">' + TextList.SettingInfo + '</span>' + '</div>' + '<div>' + '<div style="margin-top: 15px;">' + '<ul id="gpsb_servicesstatus" style="list-style-type: none;padding: 0;">' +
        //設定項目の追加★
        (function() {
            var a = "";
            for(b in Buttonlist ) {
                var c = eval("Buttonlist." + b);
                if(c.noconfigflag == 0) {
                    a += addservices(c.name, c.storagename, c.imagedata);
                }
            }
            return a;
        })() + '</ul>' + '</div>' + '</div>' + '</div>';

        var g = f.getElementsByTagName("input");
        var h = g.length;
        for(var i = 0; i < h; i++) {
            //クリック
            g[i].addEventListener("click", function(j) {
                var k = j.target;
                if(k.type == "checkbox") {
                    if(k.checked == true) {
                        localStorage.setItem("gpsb.button." + k.name, "true");
                    } else {
                        localStorage.setItem("gpsb.button." + k.name, "false");
                    }
                }
            }, false);
            //キー入力
            g[i].addEventListener("keyup", function(j) {
                var k = j.target;
                if(k.type == "text") {
                    if(k.checked == true) {
                        localStorage.setItem("gpsb." + k.name, k.value);
                    } else {
                        localStorage.setItem("gpsb." + k.name, k.value);
                    }
                }
            }, false);
            //データの読み込み
            if(g[i].type == "checkbox") {
                g[i].checked = localStorage.getItem("gpsb.button." + g[i].name) == "true";
            } else if(g[i].type == "text") {
                g[i].value = localStorage.getItem("gpsb." + g[i].name);
            }
        }
        //挨拶ボタンの設定
        document.getElementById("gpsb_settingaisatsu").addEventListener("click", function(e) {
            if(document.getElementById("gpsb_settingaisatuwindow")) {
                var a = document.getElementById("gpsb_settingaisatuwindow");
                a.style.display = "block";
            } else {
                var a = document.createElement("div");
                a.id = "gpsb_settingaisatuwindow";
                a.style.width = "40%";
                a.style.height = "70%";
                a.style.position = 'fixed';
                a.style.top = "20%";
                a.style.left = "30%";
                a.style.backgroundColor = "white";
                a.style.border = "1px solid gray";
                document.body.appendChild(a);
            }
            a.innerHTML = '<div style="background-color:black;width:100%;height:30px;color:white;font-size:12px;"><div style="padding-left:6px;padding-top:6px;"><div style="float:left;">返答の設定</div><div style="float:right;"><button id="gpsb_aisatsusettingcansel" style="height:20px;margin-right:5px">キャンセル</button><button id="gpsb_aisatsusettingsave" style="height:20px;margin-right:5px">保存</button></div>';
            a.innerHTML += (function() {
                var a = '<div style="width:100%;height:90%;overflow: auto">';
                for(b in Aisatsu ) {
                    var c = eval("Aisatsu." + b);
                    a += '<div style="padding:10px;border-bottom:1px solid gray;">「' + c.Str + '」に対する返答：<br><textarea cols="50" rows="3" style="margin-left:10px;" type="text" name="' + c.Sto + '">' + (function() {
                        var a = localStorage.getItem("gpsb.aisatsu." + c.Sto);
                        if(a) {
                            return a;
                        } else {
                            return "";
                        }
                    })() + '</textarea></div>';
                }
                a += "</div>";
                return a;
            })();
            a.innerHTML += '</div>';
            document.getElementById("gpsb_aisatsusettingsave").addEventListener("click", function(e) {
                a.style.display = "none";
                var b = a.getElementsByTagName("textarea");
                var c = b.length;
                for(var d = 0; d < c; d++) {
                    localStorage.setItem("gpsb.aisatsu." + b[d].name, b[d].value);
                }
                for(e in Aisatsu ) {
                    var f = eval("Aisatsu." + e);
                    f.Rep = localStorage.getItem("gpsb.aisatsu." + f.Sto);
                }
            }, false);
            document.getElementById("gpsb_aisatsusettingcansel").addEventListener("click", function(e) {
                a.style.display = "none";

            }, false);
        }, false);
    }, false);
}
