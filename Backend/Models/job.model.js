// import mongoose from "mongoose";

// const jobSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     requirements: [{
//         type: String
//     }],
//     salary: {
//         type: Number,
//         required: true
//     },
//     experienceLevel:{
//         type:Number,
//         required:true,
//     },
//     location: {
//         type: String,
//         required: true
//     },
//     jobType: {
//         type: String,
//         required: true
//     },
//     position: {
//         type: Number,
//         required: true
//     },
//     company: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Company',
//         required: true
//     },
//     created_by: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     applications: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Application',
//         }
//     ]
// },{timestamps:true});
// const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

// export  {Job} ;

import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    projectType: {
        type: String,
        enum: ["Film", "Digital Content", "TV Series", "Theater"],
        required: true
    },
    subProjectType: {
        type: String,
        enum: [
            "Feature Film", "Short Film", "Documentary Film",
            "TV Commercial", "Brand Promotion", "YouTube Series", "Live Streaming Events", "Online Skits & Comedy Shows",
            "Reality Shows", "Talk Shows", "Documentary Series", "Game Shows",
            "Play", "Community Theater", "Children’s Theater", "Educational & School Productions"
        ]
    },
    subGenres: [{
        type: String,
        enum: ["DRAMA", "COMEDY", "SCIENCE FICTION", "FANTASY", "HORROR", "THRILLER", "WESTERN", "MUSICAL"]
    }],    
    roleType: {
        type: String,
        enum: ["Lead Role", "Supporting Role", "Background Role"],
        required: true
    },
    roleName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female","Other"],
        required: true
    },
    age: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    height: {
        min: { type: String, required: true }, // Format: "5'6" (Feet'Inches)" 
        max: { type: String, required: true }
    },
    weight: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    skills: [{
        type: String,
        required:true
    }],
    roleDescription: {
        type: String,
        required: true
    },
    mediaRequirement: [{
        type: String,
        enum: ["Headshot", "Photo", "Video"],
        required:true
    }],
    salaryPerDay: {
        type: String,
        required: true
    },
    expectedWorkHours: {
        type: Number,
        required: true
    },
    expectedCompletionTime: {
        type: String,
        enum: ["Less than a day", "Less than a week", "Less than a month", "More than a month"],
        required: true
    },
    specialSubmissionAuditions: {
        type: String,
        enum: ["Online", "Offline"],
        required: true
    },
    auditionDetails: {
        script: { type: String }, // Uploadable audition script
        videoRequirement: { type: Boolean }, // If online, expect video
        location: { type: String }, // If offline, specify location
        date: { type: Date } // If offline, specify date
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
            required:true
        }
    ]
}, { timestamps: true });

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export { Job };