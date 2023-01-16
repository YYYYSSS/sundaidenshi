"use strict";

document.addEventListener("DOMContentLoaded",
    function(){
        //1.localStorageが使えるか確認
        if(typeof localStorage === "undefined"){
            window.alert("このプラウザはLocal Storageされていません。");
            return;
        }else {
            viewStorage();
            savelocalStorage();//2.LocalStorageへの保存
            delLocalStorage();
            allClearLocalStorage();
            selectTable();
        }
    },false
);

//2.localStorageへの保存
function savelocalStorage(){
    const save = document.getElementById("save");
    save.addEventListener("click",
        function(e){
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            if (key == "" && value == "" ){
                Swal.fire({
                    title :"Memo app"
                    ,html :"Key.Memoはいずれも必須です。"
                    ,type :"error"
                    ,allowOutsideClick :false
                });
                //window.alert("Key,Memoはいずれも必須です。")
                return;
            }else{
                let w_msg = "LocalStorageに\n [" + key + " " + value + "] \nを保存(save)しますか？";
                Swal.fire({
                    title :"Memo app"
                    ,html :w_msg
                    ,type :"question"
                    ,showCancelButton : true
                }).then(function(result){
                    if(result.value === true){
                        localStorage.setItem(key,value);
                        viewStorage();
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存(save)しました。";
                        Swal.fire({
                            title : "Memo app"
                            ,html : w_msg
                            ,type : "success"
                            ,allowOutsideClick : false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
                //let w_confirm=window.confirm("LocalStorageに" + key + "  " + value + "を保存(save)しますか?");
                //if(w_confirm === true){
                //    localStorage.setItem(key,value);
                // viewStorage();
                //    let w_msg = "LocalStorageに" + key + "  " + value + "を保存しました。";
                //    window.alert(w_msg);
                //    document.getElementById("textKey").value = "";
                //    document.getElementById("textMemo").value = "";
            }//version-up1 add  
        },false
    );
};

//3.localStorageへの消除
function delLocalStorage(){
    const del = document.getElementById("del");
    del.addEventListener("click",
        function(e){
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");

            let w_cnt = 0;
            w_cnt = selectCheckBox("del");//w_sel = selectRadioBtn();

            if(w_cnt >= 1){
                // const key = document.getElementById("textKey").value;
                // const value = document.getElementById("textMemo").value;
                let w_msg="LocalStorageから選択されている" + w_cnt + "件を削除(delete)しますか?";
                Swal.fire({
                    title :"Memo app",
                    html :w_msg,
                    type :"question",
                    showCancelButton : true
                }).then(function(result){
                        if(result.value === true){
                            for(let i =0; i<chkbox1.length; i++){
                                if(chkbox1[i].checked){
                                    localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                                }
                            }
                            viewStorage();
                            let w_msg = "LocalStorageから" + w_cnt + "件を削除(delete)しました。";
                            Swal.fire({
                                title : "Memo app"
                                ,html : w_msg
                                ,type : "success"
                                ,allowOutsideClick : false
                            });
                    
                            document.getElementById("textKey").value = "";
                            document.getElementById("textMemo").value = "";
                        }   
                    }
                )
            };
        },false
    )
    // version-up5 add-str
        const table1 = document.getElementById("table1");
        table1.addEventListener("click",(e) =>{
            if(e.target.classList.contains("trash") === true){
                let tr = e.target.parentNode.parentNode;
                localStorage.removeItem(table1.rows[tr.sectionRowIndex+1].cells[1].firstChild.data);
                tr.parentNode.deleteRow(tr.sectionRowIndex);
            }
        })
    // version-up5 add-end
}

//4.localStorage全て消除
function allClearLocalStorage(){
    const allclear = document.getElementById("allClear");
    allclear.addEventListener("click",
        function(e){
            e.preventDefault();
            let w_msg = "LocalStorageのデータをすべて削除(all clear)します。\nよろしいですか?";
            //if(w_confirm == true){
            //    localStorage.clear();
            Swal.fire({
                title:"Memo app",
                html:w_msg,
                type:"question",
                showCancelButton:true
            }).then(function(result){
                    if(result.value===true){
                        localStorage.clear();
                        viewStorage();
                        let w_msg="LocalStorageのデータを全て削除(all clear)しました。"
                        Swal.fire({
                            title:"Memo app",
                            html:w_msg,
                            type:"success",
                            allowOutsideClick:false
                        });
                        //viewStorage();
                        //let w_msg = "LocalStorageのデータをすべて削除(all clear))しました。";
                        //window.alert(w_msg);
                        document.getElementById("textKey").value="";
                        document.getElementById("textMemo").value="";
                    }
                }
            )
        }
    )
};

//5.
function selectTable(){
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e){
            e.preventDefault();
            selectCheckBox("select");//selectRadioBtn();
        },false
    );
}


function selectCheckBox(mode){  //selectRadioBtn()
    // let w_sel = "0";
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");//radio1
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo= "";

    for(let i = 0;i < chkbox1.length;i++){  //radio1
        if(chkbox1[i].checked){
            if(w_cnt === 0){
                w_textKey = table1.rows[i+1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
            }
            // document.getElementById("textKey").value = table1.rows[i+1].cells[1].firstChild.data;
            // document.getElementById("textMemo").value = table1.rows[i+1].cells[2].firstChild.data;
            // return w_sel = "1";
            w_cnt++;
        }
    }
    document.getElementById('textKey').value = w_textKey;
    document.getElementById('textMemo').value = w_textMemo;

        if(w_cnt === 1){
            return w_cnt;
        }
        else if( mode === "del" && w_cnt >= 1){
            return w_cnt;
        }else{
            Swal.fire({
                title:"Memo app",
                html:"一つ選択してください。",
                type:"error",
                allowOutsideClick:false
            });
            //window.alert("1つ選択(select)してください。")
        }
}    



function viewStorage(){
    const list = document.getElementById("list");
    while(list.rows[0]) list.deleteRow(0);
    for (let i = 0; i < localStorage.length; i++){
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name = 'chkbox1' type = 'checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
    }

    $("#table1").tablesorter({           //tablesort  add
        sortList:[[1, 0]]                //tablesort  add
    });                                  //tablesort  add

    $("#table1").trigger("update");      //tablesort  add
}