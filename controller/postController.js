const express = require('express')
const router = express.Router()
const Post = require('../model/PostModel')
const cloudinary = require("cloudinary")



exports.addPost = (async (req, res) => {
    try {
        console.log(req.body)
        const { title, description, image } = req.body
        const imageUrl = await cloudinary.uploader.upload(image, {
            folder: 'blog_images'
        });
        console.log(req.body, imageUrl)
        const post = await Post.create({
            title: title, description: description, imageUrl: imageUrl.url
        })
        if (post) {
            res.status(200).json({ success: true, message: "post added successfully", post: post })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

})

exports.getPost = (async (req, res) => {
    try {
        console.log(req.body)
        const post = await Post.find()
        res.status(200).json({
            success: true,
            post: post
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
})

exports.updatePost = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        let updateData = { title, description };

        if (image) {
            const imageUrl = await cloudinary.uploader.upload(image, {
                folder: 'blog_images'
            });
            updateData.imageUrl = imageUrl.url;
        }

        await Post.updateOne({ _id: req.params.id }, updateData);

        res.status(200).json({
            success: true,
            message: "post updated successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.deletePost = (async (req, res) => {
    try {
        const post = await Post.deleteOne({ _id: req.params.id })
        console.log(post)
        if (post.deletedCount) {
            res.status(200).json({
                success: true,
                message: "post deleted successfully"
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }

})