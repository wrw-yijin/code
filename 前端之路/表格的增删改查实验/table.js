console.log("table.js载入成功");
function addRow() {
    var table = document.getElementById("table");
    // console.log(table);
    // console.log(table.rows.length);
    let length = table.rows.length;
    var row = table.insertRow(length);
    var nameCell = row.insertCell(0);
    var ageCell = row.insertCell(1);
    var sexCell = row.insertCell(2);
    var phoneCell = row.insertCell(3);
    var operationCell = row.insertCell(4);//操作列
    console.log(row);
    //插入
    nameCell.innerHTML = "请输入姓名";
    ageCell.innerHTML = "请输入年龄";
    sexCell.innerHTML = "请输入性别";
    phoneCell.innerHTML = "请输入手机号";
    operationCell.innerHTML = "<button onclick='editRow(this)'>编辑</button><button onclick='deleteRow(this)'>删除</button>";
}
function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
function editRow(btn) {
    var row = btn.parentNode.parentNode;
    console.log(row);
    var nameCell = row.cells[0];
    var ageCell = row.cells[1];
    var sexCell = row.cells[2];
    var phoneCell = row.cells[3];
    var operationCell = row.cells[4];
//第一种方法
    nameCell.innerHTML = prompt("请输入姓名:", nameCell.innerHTML);
    ageCell.innerHTML = prompt("请输入年龄:", ageCell.innerHTML);
    sexCell.innerHTML = prompt("请输入性别:", sexCell.innerHTML);
    phoneCell.innerHTML = prompt("请输入手机号:", phoneCell.innerHTML); 
    //将修改后的数据传入数据库的代码。。。。
//第二种方法
    // nameCell.innerHTML = "<input type='text' value='" + nameCell.innerHTML + "'>";
    // ageCell.innerHTML = "<input type='text' value='" + ageCell.innerHTML + "'>";
    // sexCell.innerHTML = "<input type='text' value='" + sexCell.innerHTML + "'>";
    // phoneCell.innerHTML = "<input type='text' value='" + phoneCell.innerHTML + "'>";
    // operationCell.innerHTML = "<button onclick='saveRow(this)'>保存</button>";
    
}
function saveRow(btn) {
    
    // 将这行的可编辑状态推出
    var row = btn.parentNode.parentNode;
    row.cells[0].innerHTML = row.cells[0].querySelector('input').value;
    row.cells[1].innerHTML = row.cells[1].querySelector('input').value;
    row.cells[2].innerHTML = row.cells[2].querySelector('input').value;
    row.cells[3].innerHTML = row.cells[3].querySelector('input').value;
    // 将数据传回数据库的代码。。。。
    // 恢复按钮状态的代码
    row.cells[4].innerHTML = "<button onclick='editRow(this)'>编辑</button><button onclick='deleteRow(this)'>删除</button>";
}