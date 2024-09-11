<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Weather/Home');
})->name('home');

Route::get('/statistic', function () {
    return Inertia::render('Weather/Statistic');
})->name('statistic');
