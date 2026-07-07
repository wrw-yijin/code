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
    var newName = prompt("请输入姓名:", nameCell.innerHTML);
    if (newName != null) {
        nameCell.innerHTML = newName;
    }
    var newAge = prompt("请输入年龄:", ageCell.innerHTML);
    if (newAge != null) {
        ageCell.innerHTML = newAge;
    }
    var newSex = prompt("请输入性别:", sexCell.innerHTML);
    if (newSex != null) {
        sexCell.innerHTML = newSex;
    }
    var newPhone = prompt("请输入手机号:", phoneCell.innerHTML);
    if (newPhone != null) {
        phoneCell.innerHTML = newPhone;
    }
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
function submitForm(button) {
    //再次确认提交表单
    // if (!confirm("确认提交表单吗？")) {
    //     return;
    // }
    // //将表单数据提交入数据库的代码。。。。
    // // 提交表单数据到服务器
    // 这里可以使用 AJAX 或 fetch 等技术
    // 例如：
    var tab = button.parentNode.children[2];
    console.log(tab);
    const data = [];
    for (let i = 1; i < tab.rows.length; i++) {
        const row = tab.rows[i];
        const rowData = {
            name: row.cells[0] ? row.cells[0].textContent.trim() : '',
            age: row.cells[1] ? row.cells[1].textContent.trim() : '',
            sex: row.cells[2] ? row.cells[2].textContent.trim() : '',
            phone: row.cells[3] ? row.cells[3].textContent.trim() : ''
        };
        data.push(rowData);
    }

    // 逐行发送：每条记录单独 POST，服务器接收单条对象 (name, age, ...)
    const requests = data.map(rowObj => {
        return fetch('http://127.0.0.1:5000/api/json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rowObj)
        })
        .then(res => res.json())
        .catch(err => ({ error: err.message }));
    });

    Promise.all(requests)
        .then(results => {
            console.log('逐行提交结果：', results);
            alert('全部行已提交，查看控制台响应。');
        })
        .catch(err => {
            console.error('提交出错：', err);
            alert('提交过程中发生错误，请查看控制台。');
        });
}
