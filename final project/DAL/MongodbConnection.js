const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect('mongodb+srv://sara:430@cluster.evmrj.mongodb.net/matchmaking_container?retryWrites=true&w=majority&appName=cluster');
        console.log('✅ Connected to MongoDB Atlas!');
    } catch (err) {
        console.error('❌ Connection error:', err.message);
    }
}
main();

module.exports = mongoose;