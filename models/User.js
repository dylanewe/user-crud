import mongoose from 'mongoose';

// Delete the model if it exists to prevent OverwriteModelError
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be at least 1'],
    max: [120, 'Age must be less than 120']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['Admin', 'User', 'Manager'],
    default: 'User'
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
UserSchema.index({ name: 1 });

const User = mongoose.model('User', UserSchema);

export default User;