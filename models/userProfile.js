const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'user'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    followers: [
        {
            name: String
        }
    ],
    following: [
        {
            name: String
        }
    ],
    status: {
        type: String
    },
    skills: {
        type: [String],
        enum: ["Web development", "Backend development", "Quality Assurance"]
    },
    image: {
        type: String
    },
    phone: {
        type: Number
    },
    bio: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String,
            },
            from: {
                type: String,
                required: true
            },
            to: {
                type: String
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: String,
                required: true
            },
            to: {
                type: String
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema)
