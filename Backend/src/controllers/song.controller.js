const songModel = require('../models/song.model');
const storageService = require('../services/storage.service');
const id3 = require('node-id3');

async function uploadSong(req, res) {
    const songBuffer = req.file.buffer;
    const tags = id3.read(songBuffer);
    const { mood } = req.body;

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            fileName: tags.title + '.mp3',
            folder: '/moodify/songs'
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            fileName: tags.title + '.jpg',
            folder: '/moodify/posters'
        })
    ])

    const song = await songModel.create({
        url: songFile.url,
        posterUrl: posterFile.url,
        title: tags.title,
        artist: tags.artist,
        album: tags.album,
        year: tags.year,
        publisher: tags.publisher,
        mood: mood
    })

    res.status(201).json({
        message: "Song uploaded successfully",
        song: song
    })
}

async function getSong(req, res) {
    const { mood } = req.query;

    const songs = await songModel.aggregate([
        { $match: { mood } },
        { $sample: { size: 1 } }
    ]);
    if (songs.length === 0) {
        return res.status(404).json({ message: "No song found for the given mood" });
    }
    const randomSong = songs[0];
    res.status(200).json({
        message: "Song fetched successfully",
        song: randomSong
    });
}

module.exports = {
    uploadSong,
    getSong
};