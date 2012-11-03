chrome.browserAction.onClicked.addListener(function() {(function() {
        var w = 800;
        var h = 600;
        var x = Number((window.screen.width - w) / 2);
        var y = Number((window.screen.height - h) / 2);
        window.open('option.html', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y + ',scrollbars=no');
    })();
});

//localStorage操作用

//初期化
function requestinit() {
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        switch (request.action) {
            case "get":
                sendResponse(getstorage(request.key));
                break;

            case "set":
                setstorage(request.key, request.value);
                break;

            case "del":
                delstorage(request.key);
                break;

            case "aisatsu":
                sendResponse([
                //
                ["おはようございます", "/(おはよう|おはです|おっは[ー〜]|オハヨー|おは(ＹＯ|YO)|あっはよお|おはよ|[起お]きた|おはお|おっはよ|おー?はー?よー?ん|おはろ|はろはろ|おーはー|目が覚めた|めがさめた|おはほむ|おはいお)/", "おはようございます"],
                //
                ["こんにちは", "/([こんにちは][5])/", "こんにちは"],
                //
                ["こんばんは", "/([こんばんは][5]|ばんです|おばんです|[こんばんわ][5])/", "こんばんは"],
                //
                ["今から帰ります", "/((帰|かえ)ります|(帰宅|帰宅)します|かえる|カエル|会社[出で]ます|(帰|かえ)ろう|(帰|かえ)る|(帰|かえ)っちゃう|(仕事|しごと)(オワタ|おわた|[終お]わった))/", "おかえりなさい"],
                //
                ["ただいま帰宅しました", "/(ただいま|帰還|(戻|もど)りました|(帰宅|きたく)|かえりました|(帰|かえ)りました|(帰|かえ)ってきた|(帰|かえ)った|(戻|もど)った|(戻|もど)ってきた|ただい.*|(帰|かえ)ってこれた|(帰|かえ)って[来き]ました|帰社った|家着|たっだいま|(戻|もど)ってきました)/", "おかえりなさい"],
                //
                ["おやすみなさい", "/([おやすみなさい][7]|おやす|[寝ね]ます|寝|ｵﾔ.*ｽﾐ|zzz|ねまー|[ね寝]る|[ね寝]っるよ|寝|オヤスミ|お休み)/", "おやすみなさい"],
                //
                ["いただきます", "/(いただきま(〜|ー)?す|頂きます|いただきまーす)/", "おいしそう"],
                //
                ["ご飯食べてきます", "/((ご飯|飯|ごはん|ディナー|朝食|昼食|ランチ|夕食)[食た]べて[き来]ます|(飯|めし)って[来く]る|(飯|めし)いてくる|(ご飯|ごはん|飯|めし)[行い]ってきます)/", "行ってらっしゃい"],
                //
                ["ご飯食べてきました", "/((ご飯|飯|ごはん|ディナー|朝食|昼食|ランチ|夕食)[食た]べて[き来]ました|(飯|めし)って[来き](た|ました)|(飯|めし)った)/", "おかえりなさい"],
                //
                ["おいしい", "/(うまい|おいしい|オイシイ)/", "おいしそう"],
                //
                ["風呂行ってきます", "/(風呂|シャワー?)/", "行ってらっしゃい"],
                //
                ["あがってきました", "/([あ上]がってきました|[あ上]がった)/", "ほかえりー"],
                //
                ["行ってきます", "/([行い]て[き来]..す|[行い]って..す|[行い]って[き来].す|[行い]って[く来]る|[行い]きます|いてきます|[行い]ってきまー?す)/", "行ってらっしゃい"],
                //
                ["ほかってきます", "/(ほかってきます|ほかってくる)/", "ほかてらー"],
                //
                ["ほかってきました", "/(ほかってきました|ほかった|ほかってきた)/", "ほかえりー"],
                //
                ["誕生日の人", "/(誕生日)/", "おめでとう！"],
                //
                ["笑った", /(笑った|ワラタ|ワロス|ワロ(タ|ッシュ)|わろた|www+|ｗｗｗ+)/, "ｗｗｗ"],
                //
                ["ぬるぽ", "/(ぬるぽ)/", "ｶﾞｯ"],
                //
                ["発想", "/(発想|じゃね[？?!！]|だろうか[？?])/", "その発想はなかった"],
                //
                ["キター", "/(キター|キタキタ|きたきた)/", "ｷﾀ━━━━(ﾟ∀ﾟ)━━━━!!"],
                //
                ["ギャアアア", "/(ぎゃあ+|うおお+|ギャア+|ぎゃぁ+|ギャァ+)/", "ぎゃああああああ"],
                //
                ["〜だったんだよ！", "/(だったんだよ[！!?]+)/", "な、なんだってー！！"],
                //
                ["地震？", "/(地震|[揺ゆ]れ(た|てい?る)|どこいな)/", "どこいな"],
                //
                ["眠い", /([眠ね]むい)/, "おやすみ"],
                //
                ["寒い", "/([寒さ]むい)/", "寒いね"],
                //
                ["暑い", "/((暑|あつ)い)/", "あついねー"],
                //
                ["頑張ります", "/(頑張ります|がんばります|がんばる|ガンバル)/", "ファイトー！"],
                //
                ["あけましておめでとう", "/([明あ]けましておめでとう|あけおめ)/", "あけましておめでとうございます！"],
                //
                ["メリークリスマス", "/(メリークリスマス|めりくり)/", "メリークリスマス！"]]);
                break;

            case "buttonlist":
                sendResponse([[[
                //
                ["はてなブックマーク", "はてなブックマークへ登録します"], ["HatenaBookmark", ""]], true, ["Hatena.png", ""], 0, ["", "", ["http://b.hatena.ne.jp/add?mode=confirm&is_bm=1&title=<NAME>%20%2d%20Google%2b%20%28<TIME>%29%20%2d%20<BODY>&url=<URL>", 520, 600]]],
                //
                [[["Twitter", "Twitterへの共有画面を開きます"], ["Twitter", ""]], true, ["Twitter.png", ""], 0, ["", "", ["https://twitter.com/intent/tweet?text=<BODY>&url=<URL>", 600, 340]]],
                //
                [[["Delicious", "Deliciousへの共有画面を開きます"], ["Delicious", ""]], true, ["Delicious.png", ""], 0, ["", "", ["http://www.delicious.com/save?url=<URL>&title=<NAME>%20%2d%20Google%2b%20%28<TIME>%29&notes=<BODY>&v=6&noui=1&jump=doclose", 710, 571]]],
                //
                [[["Evernote", "Evernoteに保存できるようポストを選択します"], ["Evernote", ""]], true, ["Evernote.png", ""], 0, ["evernote", "", ["", 0, 0]]],
                //
                [[["Facebook", "Facebookで共有します"], ["Facebook", ""]], true, ["Facebook.png", ""], 0, ["", "", ["http://www.facebook.com/sharer/sharer.php?src=bm&v=4&u=<URL>&t=<NAME>%20%2d%20Google%2b%20%28<TIME>%29", 660, 520]]],
                //
                [[["Tumblr", "Tumblrで共有します"], ["Tumblr", ""]], true, ["Tumblr.png", ""], 0, ["tumblr", "", ["", 0, 0]]],
                //
                [[["Pinterest", "Pinterestで画像を共有します"], ["Pinterest", ""]], true, ["Pinterest.png", ""], 1, ["", "", ["http://pinterest.com/pin/create/bookmarklet/?media=<IMG>&url=<URL>&alt=alt&title=<NAME>%20%2d%20Google%2b%20%28<TIME>%29&is_video=false&", 632, 295]]],
                //
                [[["Read It Later", "Read It Laterに登録します"], ["Read It Later", ""]], true, ["RIL1.png", ""], 0, ["readitlater", "", ["", 0, 0]]], [[["Remember The Milk", "RTMにスケジュールを登録します"], ["Remember The Milk", ""]], true, ["rtm.png", ""], 0, ["", "", ["http://www.rememberthemilk.com/services/ext/addtask.rtm?d=<TIME2>&t=<BODY>", 475, 260]]],
                //
                [[["CircleCount", "CircleCountを開きます"], ["CircleCount", ""]], true, ["CircleCount.png", ""], 0, ["", "", ["http://www.circlecount.com/p/<USERID>", 925, 640]]],
                //
                [[["リップル", "拡散マップを表示します"], ["Ripples", ""]], true, ["Ripples.png", ""], 0, ["", "", ["https://plus.google.com/ripple/details?activityid=<ACTIVITY>&context=<ACTIVITY>", 0, 0]]],
                //
                [[["挨拶", "挨拶を自動で返答します"], ["hello", "hello"]], false, ["Aisatsu.png", ""], 0, ["aisatsu", "", ["", 0, 0]]],
                //
                [[["フルサイズ画像を開く", "フルサイズ画像を新しいウィンドウに開きます"], ["Open Fullsize Images", ""]], true, ["FullSizeImgOpen.png", ""], 1, ["OpenFullsizeImage", "", ["", 0, 0]]],
                //
                [[["フルサイズ画像をダウンロード", "フルサイズ画像をダウンロードします"], ["Download Fullsize Images", ""]], true, ["FullSizeImgDown.png", ""], 1, ["FullsizeDownload", "", ["", 0, 0]]],
                //
                [[["ミュート", "ポストをミュートにします"], ["ミュート", ""]], true, ["mute.png", ""], 0, ["mute", "", ["", 0, 0]]],
                //
                [[["どこいな", "どこいなを投稿します"], ["Dokoina", ""]], false, ["Dokoina.png", ""], 0, ["", "どこいな", ["", 0, 0]]],
                //
                [[["ぐぬぬ", "ぐぬぬを投稿します"], ["Gununu", ""]], false, ["gununu.png", ""], 0, ["", "ぐぬぬ", ["", 0, 0]]],
                //
                [[["ふぅ...", "ふぅ...を投稿します"], ["Dokoina", ""]], false, ["fuu.png", ""], 0, ["", "ふぅ...", ["", 0, 0]]], [[["oh...", "oh...を投稿します"], ["oh...", ""]], false, ["oh.png", ""], 0, ["", "oh...", ["", 0, 0]]]]);
                break;

            case "settings":
                sendResponse([
                //ポストに返信ボタンを表示する
                true,
                //コメントに返信ボタンを表示する
                true,
                //ハングアウトに参加を非表示にする
                false,
                //Shift+Enterによる投稿を有効にする
                true,
                //Tabキーによる投稿ボタンへのフォーカスを有効にする
                true,
                //古いポストを自動的に非表示にする
                true]);
                break;

        }
    });

}

//localStorageを取得する
function getstorage(_key) {
    return localStorage[_key];
}

//localStorageにセットする
function setstorage(_key, _value) {
    localStorage[_key] = _value;
}

//localstorageを削除する
function delstorage(_key) {
    localStorage.removeItem(_key);
}


window.addEventListener("load", function() {
    requestinit();
}, false);