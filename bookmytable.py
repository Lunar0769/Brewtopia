from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Create database and table if not exists
def init_db():
    conn = sqlite3.connect('bookings.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS bookings (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT, email TEXT, phone TEXT,
                        date TEXT, time TEXT, guests INTEGER)''')
    conn.commit()
    conn.close()

@app.route('/book-table', methods=['POST'])
def book_table():
    data = request.json
    if not all(k in data for k in ['name', 'email', 'phone', 'date', 'time', 'guests']):
        return jsonify({'error': 'All fields are required'}), 400

    conn = sqlite3.connect('bookings.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO bookings (name, email, phone, date, time, guests) VALUES (?, ?, ?, ?, ?, ?)", 
                   (data['name'], data['email'], data['phone'], data['date'], data['time'], data['guests']))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Table booked successfully!'})

if __name__ == '__main__':
    init_db()
    app.run(debug=True)

