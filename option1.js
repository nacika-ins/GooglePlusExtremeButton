//=======================================================================================================================
// メソッド一覧
//=======================================================================================================================

//言語取得
function lang() {
    try {
        return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0, 2)
    }
    catch(e) {
        return undefined;
    }
}

//サイズ取得
function gws(_xory) {
    if(_xory == 0) {
        return document.body.offsetWidth();
    }
    else {
        return document.body.offsetHeight();
    }
}

//ウィンドウサイズ変更イベントを送信
function changewindow() {
    //ウィンドウサイズ変更イベントを送信
    var e = document.createEvent("Event");
    e.initEvent("resize", true, false);
    window.dispatchEvent(e);
}

//canvas描画
function can() {
    var canvas = document.getElementsByTagName("canvas");
    for(var i = 0; i < canvas.length; i++) {
        var c = canvas[i];
        var w = parseInt(c.getAttribute("width"));
        var h = parseInt(c.getAttribute("height"));
        var s = c.getAttribute("start");
        var e = c.getAttribute("end");

        var ctx = c.getContext("2d");
        ctx.beginPath();
        var grd = ctx.createLinearGradient(0, 0, 0, h);
        grd.addColorStop(0, s);
        grd.addColorStop(1, e);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
        ctx.fill();
    }
}

//=======================================================================================================================
// ローカルストレージ
//=======================================================================================================================
function _Storage() {
};


_Storage.prototype.get = function(_key, _callback) {
    chrome.extension.sendRequest({
        action : "get",
        key : _key
    }, _callback);

};


_Storage.prototype.set = function(_key, _value) {
    chrome.extension.sendRequest({
        action : "set",
        key : _key,
        value : _value
    });
};

_Storage.prototype.del = function(_key) {
    chrome.extension.sendRequest({
        action : "del",
        key : _key
    });
};


_Storage.prototype.aisatsu = function(_callback) {
    chrome.extension.sendRequest({
        action : "aisatsu"
    }, _callback);
};


_Storage.prototype.buttonlist = function(_callback) {
    chrome.extension.sendRequest({
        action : "buttonlist"
    }, _callback);
};


_Storage.prototype.settings = function(_callback) {
    chrome.extension.sendRequest({
        action : "settings"
    }, _callback);

};

//=======================================================================================================================
// ローカルストレージを読み込む
//=======================================================================================================================
function GetStorage(storage) {
    var t = this;
    //機能の読み込み
    storage.get("GooglePlusExtremeButton.settings", function(_response) {

        var settingsstr = _response

        //あった場合
        if(settingsstr) {

            //読み込む
            try {
                t.settings = JSON.parse(settingsstr);
            }
            catch (_error) {

                //うまく読み込めなかった場合
                alert("Google+ Extreme Button の 設定の読み込みに失敗しました");

                //スクリプト実行を終了する
                return;
            }

        }
        //定義されていなかった場合
        else {
            storage.settings(function(_response) {
                t.settings = _response;
                storage.set("GooglePlusExtremeButton.settings", JSON.stringify(t.settings));
            });

        }

    });

    //ボタンデータの読み込み
    storage.get("GooglePlusExtremeButton.buttonlist", function(_response) {
        var buttonliststr = _response;

        //ボタンがあった場合
        if(buttonliststr) {

            //読み込む
            try {
                t.buttonlist = JSON.parse(buttonliststr);
            }
            catch (_error) {

                //うまく読み込めなかった場合
                alert("Google+ Extreme Button の ボタンの読み込みに失敗しました");

                //スクリプト実行を終了する
                return;
            }

        }
        //定義されていなかった場合
        else {

            // ボタンリスト
            storage.buttonlist(function(_response) {
                t.buttonlist = _response;

                //ローカルストレージに保存する
                storage.set("GooglePlusExtremeButton.buttonlist", JSON.stringify(t.buttonlist));
            });

        }

    });

    //挨拶の読み込み
    storage.get("GooglePlusExtremeButton.aisatsu", function(_response) {
        var aisatsustr = _response;

        if(aisatsustr) {

            //読み込む
            try {
                t.aisatsu = JSON.parse(aisatsustr);
            }
            catch (_error) {

                //うまく読み込めなかった場合
                alert("Google+ Extreme Button の 挨拶データの読み込みに失敗しました");

                //スクリプト実行を終了する
                return;
            }

        }
        //定義されていなかった場合
        else {

            storage.aisatsu(function(_response) {
                t.aisatsu = _response;

                //ローカルストレージに保存する
                storage.set("GooglePlusExtremeButton.aisatsu", JSON.stringify(t.aisatsu));
            });

        }

    });

};

//=======================================================================================================================
// データの保存
//=======================================================================================================================
function datasave(_storage, _gs) {
    _storage.set("GooglePlusExtremeButton.settings", JSON.stringify(_gs.settings));
    _storage.set("GooglePlusExtremeButton.buttonlist", JSON.stringify(_gs.buttonlist));
    _storage.set("GooglePlusExtremeButton.aisatsu", JSON.stringify(_gs.aisatsu));

}

//=======================================================================================================================
// ページ管理
//=======================================================================================================================
function PageManager(_getstorage, _storage) {
    this.gs = _getstorage;
    this.st = _storage;
};

//bodyエレメントへのアクセス
PageManager.prototype.body = function() {
    return document.getElementById("contentbody");
};

//機能
PageManager.prototype.func = function() {

    //チェックボックスの状態を取得する関数
    var t = this;
    var check = function(_num) {
        try {
            if(t.gs.settings[_num]) {
                return "checked";
            }
            else {
                return "";
            }
        }
        catch (_error) {
            return "checked";
        }

    };

    //HTML
    if (lang() == "ja") {
        this.body().innerHTML = "<h2>機能</h2>";
    }
    else {
        this.body().innerHTML = "<h2>Function</h2>";
    }
    this.body().innerHTML += '<div id="settings"></div>';
    elm = document.getElementById("settings");
    if (lang() == "ja") {
        elm.innerHTML += '<div><label><div><input type="checkbox" id="settings0" ' + check(0) + ' /></div><div>ポストに返信ボタンを表示する</div></label></div>';
        elm.innerHTML += '<div><label><div><input type="checkbox" id="settings1" ' + check(1) + ' /></div><div>コメントに返信ボタンを表示する</div></label></div>';
        elm.innerHTML += '<div><label><div><input type="checkbox" id="settings2" ' + check(2) + ' /></div><div>各ポストから「この投稿のアクティビティ」を非表示にする</div></label></div>';
        elm.innerHTML += '<div><label><div><input type="checkbox" id="settings3" ' + check(3) + ' /></div><div>「Shift+Enter」による投稿を有効にする</div></label></div>';
        elm.innerHTML += '<div><label><div><input type="checkbox" id="settings4" ' + check(4) + ' /></div><div>「Tabキー」による投稿ボタンへのフォーカスを有効にする</div></label></div>';
        elm.innerHTML += '<div><label><div><input type="checkbox" id="settings5" ' + check(5) + ' /></div><div>古いポストを自動的に非表示にする</div></label></div>';
    }
    else {
        elm.innerHTML += '<div><label><div><input type="checkbox" id="settings0" ' + check(0) + ' /></div><div>A reply button is displayed on a mailbox. </div></label></div>';
        elm.innerHTML += '<div><label><div><input type="checkbox" id="settings1" ' + check(1) + ' /></div><div>A reply button is displayed on a comment. </div></label></div>';
        elm.innerHTML += '<div><label><div><input type="checkbox" id="settings2" ' + check(2) + ' /></div><div>It makes it undisplayed "activity" from posts. </div></label></div>';
        elm.innerHTML += '<div><label><div><input type="checkbox" id="settings3" ' + check(3) + ' /></div><div>The contribution by "Shift+Enter" is validated. </div></label></div>';
        elm.innerHTML += '<div><label><div><input type="checkbox" id="settings4" ' + check(4) + ' /></div><div>The focus to the contribution button by a "Tab key" is validated.</div></label></div>';
        elm.innerHTML += '<div><label><div><input type="checkbox" id="settings5" ' + check(5) + ' /></div><div>An old post is automatically made undisplayed.</div></label></div>';
    }
    
    //イベント
    elm.addEventListener("click", function(_event) {

        //id数値
        _event.target.id.match(/(\d+)/);
        var num = RegExp.$1;

        //チェックボックスの状態
        var chk = document.getElementById("settings" + num).checked;
        t.gs.settings[parseInt(num)] = chk;

    }, false);

    changewindow();

}

//ボタン
PageManager.prototype.button = function() {

    //チェックボックスの状態を取得する関数
    var t = this;
    var check = function(_bool) {
        try {
            if(_bool) {
                return "checked";
            }
            else {
                return "";
            }
        }
        catch (_error) {
            return "checked";
        }

    };


    if (lang() == "ja") {
        this.body().innerHTML = "<h2>ボタン</h2>";
    }
    else {
        this.body().innerHTML = "<h2>Button</h2>";
    }
    if (lang() == "ja") {
        this.body().innerHTML += '<div id="newbutton"><button type="button" id="addbutton">新しいボタンを追加する</button></div>';
    }
    else {
        this.body().innerHTML += '<div id="newbutton"><button type="button" id="addbutton">Adds new button.</button></div>';
    }
    
    this.body().innerHTML += '<div id="buttonlist"></div>';

    var elm = document.getElementById("buttonlist");
    for(var i = 0; i < this.gs.buttonlist.length; i++) {
        var data = this.gs.buttonlist[i];
        if(lang() == "ja") {
            var name = data[0][0][0]
            var desc = data[0][0][1]
        }
        else {
            var name = data[0][1][0]
            var desc = data[0][1][1]
        }

        //アイコン画像
        if(data[2][0] == "") {
            var icon = '<span style="width: 15px;display:block;"></span>';
        }
        else {
            var icon = '<img src="' + chrome.extension.getURL("button/" + data[2][0]) + '" />';
        }
        if (lang() == "ja") {
            elm.innerHTML += '<div><div>' + icon + '</div><div><div>' + name + '</div><div><div>' + desc + '</div><div><label><input type="checkbox" id="button' + String(i) + '" ' + check(data[1]) + ' />このボタンを有効にする</label></div></div></div><div id="close' + String(i) + '">×</div></div>';
        }
        else {
            elm.innerHTML += '<div><div>' + icon + '</div><div><div>' + name + '</div><div><div>' + desc + '</div><div><label><input type="checkbox" id="button' + String(i) + '" ' + check(data[1]) + ' />This button is validated.</label></div></div></div><div id="close' + String(i) + '">×</div></div>';
        }
        
    }

    //イベントの登録
    elm.addEventListener("click", function(_event) {
        var elm = _event.target;
        if(elm.id.indexOf("button") == 0) {
            elm.id.match(/button(\d+)/)
            var num = RegExp.$1;
            var chk = document.getElementById("button" + num).checked;
            t.gs.buttonlist[parseInt(num)][1] = chk;
        }
        else if(elm.id.indexOf("close") == 0) {
            elm.id.match(/close(\d+)/)
            var num = RegExp.$1;
            var name = document.getElementById("button" + num).parentNode.parentNode.parentNode.parentNode.firstChild.innerHTML;
            if(confirm("\"" + name + "\"を削除してもよろしいですか？ この操作は取り消すことが出来ません。")) {
                t.gs.buttonlist.splice(parseInt(num), 1);
                t.button();

            }

        }
    }, false);


    elm.addEventListener("mouseover", function(_event) {
        var elm = _event.target;
        if(elm.id.indexOf("close") == 0) {
            elm.style.cursor = "hand";
        }
    }, false);

    //新規ボタンの追加
    document.getElementById("addbutton").addEventListener("click", function(_event) {
        var elm = document.createElement("div");
        elm.id = "wall";
        elm.style.background = "black";
        elm.style.opacity = "0.7";
        elm.style.width = "0";
        elm.style.height = "0";
        elm.style.position = "absolute";
        elm.style.top = "0px";
        elm.style.left = "0px";
        elm.style.zIndex = "1000";
        document.body.appendChild(elm);

        var elm2 = document.createElement("div");
        elm2.id = "addnewbuttonwindow";
        elm2.style.background = "white";
        elm2.style.border = "2px solid black";
        elm2.style.width = "500";
        elm2.style.opacity = "1";
        elm2.style.height = "430";
        elm2.style.zIndex = "2000";
        elm2.style.position = "absolute";
        elm2.style.padding = "20px";
        if (lang() == "ja") {
            elm2.innerHTML = '<div>新しいボタンを追加します</div><div><div><div>ボタンの名前 </div><div><input id="buttonname" type="input" /></div></div><div><div>ボタンのタイプ </div><div><div><label><input id="buttontypeauto" type="radio" name="buttontype" checked />自動投稿</label></div><div><label><input id="buttontypeurl" type="radio" name="buttontype" />URL</label></div></div></div><div><div>内容 </div><div><input id="buttondesc" type="input" /></div></div></div> <div><button id="addbuttoninput" type="button">登録</button> <button id="addbuttoncansel" type="button">キャンセル</button> </div> <div>内容には自動投稿の場合は投稿したい文章を、URLの場合はポストのパーマリンクを開きたいURLを入力してください。<br>URLで開く場合は、下記書式を使用することができます。 </div><div>&lt;URL&gt; = ポストのパーマリンクが入ります<br>&lt;BODY&gt; = ポストの本文が入ります<br>&lt;NAME&gt; = 投稿者名が入ります<br>&lt;USERID&gt; = ユーザーIDが入ります<br>&lt;TIME&gt; = ポストの投稿時間が入ります<br>&lt;TIME2&gt; = ポストの投稿日が入ります<br>&lt;ACTIVITY&gt; = アクティビティIDが入ります<br>&lt;IMG&gt; = 最初のフルサイズ画像パスが入ります</div>';
        }
        else {
            elm2.innerHTML = '<div>A new button is added. </div><div><div><div>button name </div><div><input id="buttonname" type="input" /></div></div><div><div>button type </div><div><div><label><input id="buttontypeauto" type="radio" name="buttontype" checked />Automatic contribution</label></div><div><label><input id="buttontypeurl" type="radio" name="buttontype" />URL</label></div></div></div><div><div>Contents </div><div><input id="buttondesc" type="input" /></div></div></div> <div><button id="addbuttoninput" type="button">Regist</button> <button id="addbuttoncansel" type="button">Cansel</button> </div> <div>Please input into the contents URL which wants, as for the case of URL, to open the permalink of a mailbox for the text which wants to contribute in automatic contribution.<br>The following form can be used when opening by URL. </div><div>&lt;URL&gt; = The permalink of a post enters.<br>&lt;BODY&gt; = The text of a post enters. <br>&lt;NAME&gt; = A contributor name enters. <br>&lt;USERID&gt; = User ID enters.&lt;TIME&gt; = The contribution time of a post enters. <br>&lt;TIME2&gt; = The contribution day of a post enters. <br>&lt;ACTIVITY&gt; = Activity ID enters.<br>&lt;IMG&gt; = The first full-size picture path enters. </div>';
        }
        
        document.body.appendChild(elm2);

        elm2.addEventListener("click", function(_event) {
            var elm3 = _event.target;
            switch(elm3.id) {
                case "addbuttoninput":

                    var buttonname = document.getElementById("buttonname").value;
                    var buttondesc = document.getElementById("buttondesc").value;

                    if(document.getElementById("buttontypeauto").checked) {
                        //自動ポスト
                        t.gs.buttonlist.push([[[buttonname, buttondesc + "を投稿します"], [buttonname, "Adds " + buttondesc]], true, ["", ""], 0, ["", buttondesc, ["", 0, 0]]]);
                    }
                    else if(document.getElementById("buttontypeurl").checked) {
                        //URL投稿
                        t.gs.buttonlist.push([[[buttonname, buttonname + "で個別ポストを開きます。"], [buttonname, ""]], true, ["", ""], 0, ["", "", [buttondesc, 925, 640]]]);

                    }

                    alert("登録しました。");
                    t.button();
                    elm.parentNode.removeChild(elm);
                    elm2.parentNode.removeChild(elm2);
                    break;

                case "addbuttoncansel":
                    elm.parentNode.removeChild(elm);
                    elm2.parentNode.removeChild(elm2);
                    break;
            };
        }, false);

        changewindow();
    }, false);

    changewindow();
}

//挨拶
PageManager.prototype.aisatsu = function() {
    var t = this;
    if (lang() == "ja") {
        this.body().innerHTML = "<h2>挨拶</h2>";
    }
    else {
        this.body().innerHTML = "<h2>Greeting</h2>";
    }
    this.body().innerHTML += '<div id="aisatsu"></div>';
    var elm = document.getElementById("aisatsu");
    for(var i=0;i<this.gs.aisatsu.length;i++){
        
        elm.innerHTML += '<div><div>'+this.gs.aisatsu[i][0]+'</div><div> <textarea type="input" id="aisatsuinput'+String(i)+'">'+this.gs.aisatsu[i][2]+'</textarea></div></div>';    
    }
    
    elm.addEventListener("change", function(_event) {
        var elm2 = _event.target;
        if (elm2.tagName == "TEXTAREA") {
            elm2.id.match(/aisatsuinput(\d+)/);
            t.gs.aisatsu[parseInt(RegExp.$1)][2] = elm2.value;
        }
    }, false);
    
    
    changewindow();
}

//初期化
PageManager.prototype.init = function() {
    var t = this;
    if (lang() == "ja") {
        this.body().innerHTML = "<h2>初期化</h2>";
    }
    else {
        this.body().innerHTML = "<h2>Initialization</h2>";
    }
    if (lang() == "ja") {
        this.body().innerHTML += '<div id="reset"><div><button id="resetsettings">機能を初期化する</button></div><div><button id="resetbutton">ボタンを初期化する</button></div><div><button id="resetaisatsu">挨拶を初期化する</button></div></div>';
    }
    else {
        this.body().innerHTML += '<div id="reset"><div><button id="resetsettings">A function is initialized.</button></div><div><button id="resetbutton">A button is initialized.</button></div><div><button id="resetaisatsu">A greeting is initialized.</button></div></div>';
    }
    document.getElementById("reset").addEventListener("click", function(_event) {
        var elm = _event.target;
        switch(elm.id) {
            case "resetsettings":
                if (confirm("機能を初期化してもよろしいですか？この操作は取り消すことが出来ません。")) { 
                    t.st.settings(function(_response){
                        t.gs.settings = _response;
                        t.st.set("GooglePlusExtremeButton.settings", JSON.stringify(_response));
                        alert("初期化が完了しました");
                    });
                }
                break;
            
            case "resetbutton":
                if (confirm("ボタンを初期化してもよろしいですか？この操作は取り消すことが出来ません。")) { 
                    t.st.buttonlist(function(_response){
                        t.gs.buttonlist = _response;
                        t.st.set("GooglePlusExtremeButton.buttonlist", JSON.stringify(_response));
                        alert("初期化が完了しました");
                    });
                }
                break;
            case "resetaisatsu":
                if (confirm("挨拶を初期化してもよろしいですか？この操作は取り消すことが出来ません。")) { 
                    t.st.aisatsu(function(_response){
                        t.gs.aisatsu = _response;
                        t.st.set("GooglePlusExtremeButton.aisatsu", JSON.stringify(_response));
                        alert("初期化が完了しました");
                    });
                }
                break;
        }
    }, false);
    changewindow();
}

//情報
PageManager.prototype.information = function() {
    if (lang() == "ja") {
        this.body().innerHTML = "<h2>情報</h2>";
    }
    else {
        this.body().innerHTML = "<h2>Information</h2>";
    }
    var history = 'ver.1.0 公開\nver.1.1 Twitterリンク、Deliciousリンクの追加\nver.1.2 Evernoteリンクの追加\nver.1.3 bugfix\nver.1.4 bugfix\nver.1.5 bugfix\nver.1.6 他の拡張機能と競合して正常に表示できなかった問題を修正しました。\nver.1.7 bugfix\nver.1.8 bugfix\nver.1.9 ボタンを全て画像に変更。小窓で開くように修正。Facebook共有機能の追加。\nver.1.10 他の拡張と競合を起こして二重に表示されてしまう問題を修正しました\nver.1.11 サークルを切り替えたときにうまく表示できなかった問題を修正しました\nver.1.12 フルサイズ画像リンク機能を追加しました。画像が含まれる投稿にのみ出現するボタンです。これをクリックすると、フルサイズ画像が直リンクで開きます\nver.1.13 他の拡張との互換性を調整しました。/1.14 画像を開いたときに4:3で表示するように修正\nver.1.15 はてなブックマーク時にすぐに登録画面に移行するようにしました\nver.1.16 安定性の向上\nver.1.17 画像一括ダイレクトダウンロードボタン追加\nver.1.18 ボタンの表示非表示に対応しました。Google+の仕様変更で正常に表示できなかったバグを修正しました\nver.1.20 スクロール固定ボタンを追加しました。/ ver .1.21 bugfix\nver.1.22 Tumblrボタンの追加\nver.1.23 設定画面でTumblrボタンがFavebookボタンになっていた問題を修正\nver.1.24 編集されたポストでボタンが正常に動作しなかった問題を修正しました\nver.1.25 Tumblrで画像を共有するときに本文が空白の場合出典のみを表示するようにしました\nVer.1.26 設定画面が正常に開かないバグを修正しました\nver. 1.26 スクロール固定の挙動を変更しました\nVer.1.27 スクロール固定の挙動を変更しました\nver.1.28 bugfix\nver.1.29 bugfix\nVer.1.30 正常に表示できなかった問題を修正しました。Facebookで画像が表示されなかった問題を修正しました\nVer.1.31 正常に表示できなかった問題を修正しました。はてなブックマークが正常に使用できなかった問題を修正しました。スクロール固定ボタンが正常に使用できなかった問題を修正しました。\nver.1.32 bugfix\nver.1.33 u/0/でボタンが表示されるように修正しました\n';
    history += 'ver 1.34 bugfix. Firefox for GreaseMonkey を更新しました\nVer.1.35 G+me拡張と競合する問題を修正 Google+SNSButton設定項目が表示されなかった問題を修正\nver.1.36 スクロール固定が正常に表示できていなかった問題を修正\nver.1.37 重複して表示される問題を修正しました\nver1.38 bugfix\nver 1.39 bugfix\nVer.1.40 Deliciousでノートに本文を挿入するように変更しました\nVer.1.41 onclickからEventListenerを使用する方式に変更。スクロール固定の挙動を変更しました。Twitterに本文を含ませるように修正しました。\nver.1.42 bugfix\nVer.1.43 スクロール固定ボタンの挙動を従来のものに戻しました。コメント欄を表示した際にじどうてきにボタンが押されるように修正しました。\nver 1.44 キーボードでコメントの投稿時にうまくスクロール固定が解除されなかった問題を修正\nVer.1.45 スクロール固定ボタンの挙動の安定化を行いました。コマンドボタンを実装しました。\nVer.1.46 スクロール固定ボタンの挙動の安定化を行いました。コマンドボタン機能「clear」を実装しました。\nVer.1.47 スクロール固定ボタンの挙動の最終的な安定化を行いました。殆ど問題なく使用することが可能です。\nVer.1.48 サークルを切り替えたときにスクロール固定ボタンの挙動がおかしくなる問題を修正しました\nver.1.49 スクリプトをクラスとして扱うように全面的に修正。Remember The Milkボタン,Read It Laterボタン,どこいなボタン,を追加しました\nver.1.50 ボタンの配置を修正\nver1.51 ボタンの表示非表示切り替えが効かなくなっていた問題を修正\nver1.52 あいさつボタンを実装しました\nver1.53 スクロール固定ボタンを非推奨に設定しました。あいさつボタンの拡張を行いました。\nver 1.54 bugfix\nver.1.55 bugfix\nver1.56 Google+検索、プロフィールにボタンが表示されるように修正しました\nver1.57 Evernoteボタンを改良しました\nver1.58 Deliciousボタンを新しい仕様に変更しました\nver1.59 ボタンが表示されない場合がある問題を修正しました\nver 1.60 bigfix\nver1.61 マルチアカウント環境において設定画面が表示できていなかった問題を修正しました\nver1.62 Google+ Hot に対応しました。Google+Ripplesボタンを追加しました。設定画面から表示できます。\n';
    history += 'ver.1.63 bugfix\nver.1.64 bugfix\nver.1.65 bugfix\nver.1.66 bugfix\nver1.67 コメントへ返信ボタンを実装しました\nver.1.68 通知画面にも返信ボタンを表示させるようにしました\nver. 1.69 bugfix\nver.1.70 bugfix\nver. 1.71 bugfix\nver. 1.72 bugfix\nver. 1.73 bugfix\nver. 1.74 bugfix\nver. 1.75 ver1.75 G+meがインストールされている環境でもEvernoteボタンが正常に動くように修正しました\nver. 1.76 Tumblrボタンで画像の共有が使用できなくなっていた問題を修正しました。(Google側の仕様変更により画像共有できなくなりました)\nver1.77 Google+ ページに対応しました\nver1.78 コメント通知ボタンに返信ボタンが表示されくなくなっていた問題を修正しました。コメント通知ボタンで返信ボタンが連続して使用できなかった問題を修正しました\nver1.79 お知らせ画面で返信ボタンが表示されない場合があるのを修正しました。返信時IDではなく名前で表示するように修正しました。\nver.1.80 bugfix\n';
    history += 'ver.1.81 Google+の仕様変更に伴い拡張に画像が使用できなくなったため、一時的に画像を使用しない旧Google+ SNS buttonの仕様に変更しました。ボタンはテキストリンクとして表示されます。\nver 1.82 Evernoteボタン、挨拶ボタンが使用できなくなっていた問題を修正\nver 1.84 ボタンの配置を変更し、コメントと共有が一番手前になるように修正しました。\nver 1.85 挨拶ボタンがうまく機能しなくなっていた問題を修正。\nver 1.86 bugfix\nver 1.87 bugfix\nver 1.88 バルス ボタンを追加しました\nver 1.89 「 バルス！！！！ 」に修正しました。\nver 1.91 通知ウィンドウ上で返信ボタンがうまく動作していなかった問題を修正しました\nver 1.92 設定画面でボタンの変更ができなくなっていた問題を修正しました\nver 1.93 ボタンが重複して表示されていたバグを修正しました。\nver 1.94 ポスト投稿時にTABキーを押すと共有ボタンにフォーカスが当たるようになるおまけ機能を追加しました。\nver 1.95 サークルページにて共有ボタンへのフォーカスが動いでいなかった問題を修正\nver 2.0 ソースコードを全面的に書き換えました。\n';
    history += 'ver.2.1 再共有時にもShift+Enterによる投稿やTABのスマートフォーカスに対応しました\nver.2.2 拡張の設定画面からオプションに飛べるように修正しました\nver.2.3 仕切りを付けるかどうかの選択肢を追加しました\nver.2.4 挨拶ボタンの設定画面がうまく動作していなかった問題を修正しました\nver.2.5 挨拶ボタンの設定画面がうまく動作していなかった問題を修正しました\nver.2.6 ボタン作成時に自動投稿ボタンが正常な動作をしていなかった問題を修正しました\nver.2.7 古いポストを自動的に非表示にするポスト数を51以上に変更しました\nver.2.8 ポストの返信ボタンを非表示にするとボタンが押せなくなる問題を修正しました。ポストを投稿するボタンからTABキーを押した場合、また投稿入力画面に戻るように修正しました。(ストリーム投稿画面のみ)\nver.2.9 新規ボタン作成時に&lt;USERID&gt;が使用できるようになりました。新たにCircleCountボタンを追加しました。\nver.2.10 返信ボタンの表示切り替えが正常に行われていなかった問題を修正しました\nver.2.11 Shift+Enter投稿時に改行されてしまう問題を修正しました。返信ボタンを押した場合そのまま投稿ボタンが押せるように修正しました。Ctrl+Enterでも投稿できるように修正しました。\nver.2.12 返信ボタンの表示切り替えが正常に行われない問題を修正しました\nver.2.13 Evernoteボタンの挙動を変更しました\nver.2.14 返信ボタンがうまく動作しない場合がある問題を修正しました\nver.2.15 非アクティブ時にも古いポストを自動的に非表示にするように修正しました\nver.2.16 Shift+Enterによる投稿がうまく動作しない場合がある問題を修正しました\nver.2.17 Shift+Enterによる投稿がうまく動作しない場合がある問題を修正しました\n';
    history += 'ver.2.18 ボタンが正しくない場所に挿入されてしまう問題を修正しました\nver.2.19 アイコンを修正しました。ページ画面で通知画面の返信ボタンが二重に表示されてしまうバグを修正しました\nver.2.20 Pinterestボタンを追加しました。表示されてない場合はボタンの初期化にて表示させることが出来ます\nver.2.21 Pinterestボタンの小窓のサイズを調整しました\nver.2.22 Tumblrボタンで画像を直接共有することができるようになりました。この機能を有効にするには一度ボタンを初期化する必要があります\nver.2.23 Tumblrボタンのデフォルト設定を変更しました\nver.2.24 バグの修正\nver.2.25 Tumblrボタンの挙動を修正しました\nver.2.26 Evernoteボタン実行時に選択が解除されるとボタンが復活するように修正しました\nver.2.27 DownloadSupport for Google+と競合してしまう問題を修正しました。検索画面でもボタンが表示できるようになりました。\nver.2.28 古いポストを自動的に非表示にする機能がうまく動作していなかった問題を修正しました\nver 2.29 ストリーム全体を取得する一部仕様を変更しました\nver.2.30 ボタンが正しく表示されない問題を修正しました\nver.2.31 返信ボタンがうまく表示されていなかった問題を修正しました\nver.2.32 過去ログを表示しようとした場合コメントに返信ボタンが表示されなくなる問題、本文が取得できなくなっていた問題を修正しました\nver.2.33 ハングアウトが重くなる問題と個別のポストページで返信ボタンが使えなくなる問題を修正しました\nver.2.34 返信ボタンがうまく機能していなかった問題を修正しました\n';
    history += 'ver.2.35 Shift+Enterによる投稿が正常に動作していなかった問題を修正しました\nver.2.36 バグ修正\nver.2.37 ボタンの色調を変更しました\nver.2.38 Shift+Enterでの投稿時に前に投稿した自分のコメントが削除される問題を修正しました\nver.2.39 コメント入力時にTABキーを押すとキャンセルにフォーカスが合ってしまう問題と、リンクを共有時にShift+Enterで投稿しようとするとサムネイルが消えてしまう問題を修正しました\nver.2.40 コメント編集時においてTABキーのフォーカスがうまくいかなかった問題とGoogle+ページ時にエラーを吐く問題を修正しました\nver.2.41 暫定的に新UIでも使えるようにしました。\nver.2.42 Google+ 新UIに対応しました。ハングアウトの非表示機能を廃止し、各ポストのアクティビティの表示を非表示にする機能を追加しました。\nver.2.43 フルサイズ画像表示機能&DL機能がうまく機能していない問題を修正しました。ハングアウト通知でボタンの位置がずれる問題を修正しました\nver.2.44 フルサイズ画像表示機能で画像が二重に開かれる問題を修正しました\nver.2.45 中国圏で返信ボタンを「回信」と表示するように変更しました\nver.2.46 古いポストを自動的に非表示にする機能がうまく機能していなかった問題を修正しました\nver.2.47 アニメーションアイコン拡張を入れていた場合、フルサイズ画像を開く時にアイコン画像も表示されてしまう問題を修正しました\nver.2.48 +Customの画像ダウンロードボタンが下の段落にずれ込む問題を修正しました\nver.2.49 +Customと競合する問題を修正しました\nver.2.50 各ポストから「この投稿のアクティビティ」を非表示にする機能を解除した場合、うまくアクティビティが表示されない問題を修正しました\nver.2.51 中国語での返信ボタン表記のローカライズに対応しました。\nver.2.52 Replyのみボタンを表示している場合位置がずれる問題を修正しました\nver.2.53 Shift+Enterでの投稿時リンク共有が失敗する問題を修正しました。\nver.2.54 Shift+Enterでの投稿が機能しない場合がある問題を修正しました\n';
    history += 'ver.2.66 正常にボタンが機能していなかった問題の修正・マニフェストバージョン2に対応・アクティビティの非表示をデフォルトで表示するように修正';
    this.body().innerHTML += '<div id="information"><img src="'+chrome.extension.getURL("icon.png")+'" /><br>Google+ Extreme Button '+
    '2.66'+
    '<br><textarea>'+history+'</textarea></div>';
    changewindow();
}

//連絡
PageManager.prototype.contact = function() {
    if (lang() == "ja") {
        this.body().innerHTML = "<h2>連絡</h2>";
    }
    else {
        this.body().innerHTML = "<h2>Contact</h2>";
    }
    if (lang() == "ja") {
        this.body().innerHTML += '<div class="contact">Google+ Extreme Button: <br><span><a href="https://plus.google.com/108852287952841384832/">https://plus.google.com/108852287952841384832/</a></span><br><br>作者: <br><span><a href="https://plus.google.com/107690626854317593303/">https://plus.google.com/107690626854317593303/</a> (<a href="http://d.hatena.ne.jp/As_hsp/">Akicansoft</a>)</span><br><br>アイコン提供: <br><span><a href="https://plus.google.com/118048954584019766148/posts">https://plus.google.com/118048954584019766148/posts</a>';
        this.body().innerHTML += "<h2>バグ報告・連絡等</h2>";
    }
    else {
        this.body().innerHTML += '<div class="contact">Google+ Extreme Button: <br><span><a href="https://plus.google.com/108852287952841384832/">https://plus.google.com/108852287952841384832/</a></span><br><br>Author: <br><span><a href="https://plus.google.com/107690626854317593303/">https://plus.google.com/107690626854317593303/</a> (<a href="http://d.hatena.ne.jp/As_hsp/">Akicansoft</a>)<span></div>';
        this.body().innerHTML += "<h2>A bug report, connection, etc. </h2>";
    }
    
    this.body().innerHTML += '<div class="contact"><a href="mailto:nacika.inscatolare+gpeb@gmail.com">nacika.inscatolare+gpeb@gmail.com</a></div>';
    changewindow();
}

//=======================================================================================================================
// main
//=======================================================================================================================

//ページの読み込みが完了した
window.addEventListener("load", function(_event) {

    if(_event.target == document) {

        //Storage
        var storage = new _Storage();

        //localStorageを読み込み
        var gs = new GetStorage(storage);
        (function() {
            var tid = setInterval(function() {
                if(gs.buttonlist && gs.aisatsu && gs.settings) {
                    clearInterval(tid);

                    //ページを読み込む
                    var page = new PageManager(gs, storage);

                    //サイズ変更イベントを送信する
                    changewindow();

                    //メニューにイベントを登録する
                    var elm = document.getElementById("menu").childNodes;
                    for(var i = 0; i < elm.length; i++) {
                        elm[i].addEventListener("click", function(_event) {

                            if(_event.target.innerHTML.indexOf("機能") != -1) {
                                page.func();
                            }
                            else if(_event.target.innerHTML.indexOf("ボタン") != -1) {
                                page.button();
                            }
                            else if(_event.target.innerHTML.indexOf("挨拶") != -1) {
                                page.aisatsu();
                            }
                            else if(_event.target.innerHTML.indexOf("初期化") != -1) {
                                page.init();
                            }
                            else if(_event.target.innerHTML.indexOf("情報") != -1) {
                                page.information();
                            }
                            else if(_event.target.innerHTML.indexOf("連絡") != -1) {
                                page.contact();
                            }
                            else if(_event.target.innerHTML.indexOf("Function") != -1) {
                                page.func();
                            }
                            else if(_event.target.innerHTML.indexOf("Button") != -1) {
                                page.button();
                            }
                            else if(_event.target.innerHTML.indexOf("Greeting") != -1) {
                                page.aisatsu();
                            }
                            else if(_event.target.innerHTML.indexOf("Initialization") != -1) {
                                page.init();
                            }
                            else if(_event.target.innerHTML.indexOf("Information") != -1) {
                                page.information();
                            }
                            else if(_event.target.innerHTML.indexOf("Contact") != -1) {
                                page.contact();
                            }

                            var t = document.getElementById("contentbody").firstChild.innerHTML;

                            var elm = document.getElementById("menu").getElementsByTagName("div");
                            for(var i = 0; i < elm.length; i++) {
                                if(elm[i].innerHTML.indexOf(t) == -1)
                                    elm[i].style.background = "none";
                                else
                                    elm[i].style.background = "#CCCCCC";
                            }

                        }, false);

                        //メニューにマウスが重なった
                        elm[i].addEventListener("mouseover", function(_event) {
                            var t = document.getElementById("contentbody").firstChild.innerHTML;
                            if(_event.target.innerHTML.indexOf(t) == -1)
                                _event.target.style.background = "#e1e1e1";
                            _event.target.style.cursor = "hand";

                        }, false);

                        //メニューにマウスが外れた
                        elm[i].addEventListener("mouseout", function(_event) {
                            var t = document.getElementById("contentbody").firstChild.innerHTML;

                            var elm = document.getElementById("menu").getElementsByTagName("div");
                            for(var i = 0; i < elm.length; i++) {
                                if(elm[i].innerHTML.indexOf(t) == -1)
                                    elm[i].style.background = "none";
                                else
                                    elm[i].style.background = "#CCCCCC";
                            }

                        }, false);

                        //contentbodyに機能を読みこませる
                        try {
                            if(elm[i].innerHTML.indexOf("機能") != -1 || elm[i].innerHTML.indexOf("Function") != -1) {
                                page.func();
                                elm[i].style.background = "#CCCCCC";
                            }
                        }
                        catch (_error) {
                        }

                    }

                    //保存ボタンのイベント
                    document.getElementById("save").addEventListener("click", function(_event) {
                        datasave(storage, gs);
                        window.close();
                    }, false);

                    //キャンセルボタンのイベント
                    document.getElementById("cansel").addEventListener("click", function(_event) {
                        window.close();
                    }, false);

                }
            }, 100);

        })();

    }

}, false);

//その他ボタンにイベントを設定する

//=======================================================================================================================
// ウィンドウサイズが変更された
//=======================================================================================================================
window.addEventListener('resize', function(_event) {

    var canvas = document.getElementsByTagName("canvas");
    for(var i = 0; i < canvas.length; i++) {
        canvas[i].width = document.body.offsetWidth;
        can();
    }

    document.getElementById("under1").style.top = document.body.offsetHeight - 22;
    document.getElementById("under2").style.top = document.body.offsetHeight - 20;

    document.getElementById("save").style.top = document.body.offsetHeight - 22 - 40 - 10;
    document.getElementById("cansel").style.top = document.body.offsetHeight - 20 - 42 - 10;
    document.getElementById("save").style.left = document.body.offsetWidth - 120 - 20;
    document.getElementById("cansel").style.left = document.body.offsetWidth - 200 - 20;

    try {
        document.getElementById("wall").style.width = document.body.offsetWidth;
        document.getElementById("wall").style.height = document.body.offsetHeight;
        document.getElementById("wall").style.top = "0px";
        document.getElementById("wall").style.left = "0px";
    }
    catch (_error) {
    }

    try {
        document.getElementById("addnewbuttonwindow").style.top = (document.body.offsetHeight - 460) / 2
        document.getElementById("addnewbuttonwindow").style.left = (document.body.offsetWidth - 500) / 2
    }
    catch (_error) {
    }

    //h2
    setTimeout(function() {
        try {
            var h2 = document.getElementsByTagName("h2");
            for(var i = 0; i < h2.length; i++) {
                h2[i].style.width = String(document.body.offsetWidth - 185);
            };
        }
        catch (_error) {
        }

    }, 0);

    try {
        document.getElementById("buttonlist").style.width = document.body.offsetWidth - 186;
        document.getElementById("buttonlist").style.height = document.body.offsetHeight - 215 - 50;
    }
    catch (_error) {
    }
    
    try {
        document.getElementById("aisatsu").style.width = document.body.offsetWidth - 186;
        document.getElementById("aisatsu").style.height = document.body.offsetHeight - 215;
    }
    catch (_error) {
    }

}, false);

//=======================================================================================================================
// ここまで
//=======================================================================================================================
