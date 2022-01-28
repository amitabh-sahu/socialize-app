import mongoose from 'mongoose';

const refreshTokensSchema = mongoose.Schema({
    refreshToken: {
        type: String,
        required: true,
    }
});

export default mongoose.model('RefreshTokens', refreshTokensSchema);