const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

module.exports('User', userSchema);