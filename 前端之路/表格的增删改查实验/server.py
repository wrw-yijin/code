from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

print("=" * 50)
print("  Flask 服务器已启动")
print("=" * 50)
print("  服务地址: http://127.0.0.1:5000")
print("  前端请求接口: POST /api/json")
print("=" * 50)

@app.route('/api/json', methods=['POST'])
def receive_json():
    try:
        data = request.get_json()
        
        if not data:
            print("❌ 错误: 收到空数据")
            return jsonify({"success": False, "error": "数据为空"}), 400
        
        name = data.get('name', '').strip()
        age = data.get('age', '')
        sex = data.get('sex', '').strip()
        phone = data.get('phone', '').strip()
        
        if not name:
            print("❌ 错误: 姓名不能为空")
            return jsonify({"success": False, "error": "姓名不能为空"}), 400
        
        print("✅ 成功接收数据:")
        print(f"   姓名: {name}")
        print(f"   年龄: {age}")
        print(f"   性别: {sex}")
        print(f"   联系方式: {phone}")
        print("-" * 50)
        
        return jsonify({"success": True, "message": "数据接收成功"})
    
    except Exception as e:
        print(f"❌ 异常: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
